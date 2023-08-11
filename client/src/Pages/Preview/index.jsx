import React, { useEffect, useState } from 'react'
import MCQ from '../../Components/MCQ'
import Question from '../Question'
import useForm from '../../hooks/useForm'
import { useParams } from 'react-router-dom'
import Respond from '../../Components/Respond'
import { useDispatch, useSelector } from 'react-redux'
import { ANSWER_NEXT, ANSWER_PREVIOUS, SAVE_RESPONSE } from '../../store/reducers/respondSlice'
import { ComponentTypes } from '../../enums/ComponentTypes'
import useRespond from '../../hooks/useRespond'
import store from '../../store'

const Preview = () => {

    const formService = useForm();
    const respondService = useRespond();
    const params = useParams();
    const dispatch = useDispatch();
    const components = useSelector(state => state.form.components)
    const answeringIndex = useSelector(state => state.respond.answeringIndex)
    const componentsLength = components.length;

    const [nextButtonText, setNextButtonText] = useState("Next")


    useEffect(() => {
        (async () => {
            const formId = params.id;
            const form = await formService.getForm(formId);
        })();
    }, [])

    useEffect(() => {
        if (components && Array.isArray(components) && answeringIndex == components.length - 1) {
            return setNextButtonText("Submit")
        }
        return setNextButtonText("Next")

    }, [answeringIndex])


    const getCurrentComponent = () => {
        if (!components || components.length == 0) return null;
        const component = components[answeringIndex];
        return { component, type: component.type };
    }

    const onNext = async () => {

        const currentType = getCurrentComponent().type;
        // Start saving process
        dispatch(SAVE_RESPONSE({ type: currentType }))

        if (answeringIndex == componentsLength - 1) submit(currentType)
        else if (answeringIndex < componentsLength - 1) dispatch(ANSWER_NEXT())
    }
    const onPrevious = () => {

        const currentType = getCurrentComponent().type;
        // Start saving process
        dispatch(SAVE_RESPONSE({ type: currentType }))

        if (answeringIndex > 0) dispatch(ANSWER_PREVIOUS())
    }

    const submit = (currentType) => {
        const newResponses = [...store.getState().respond.responses];
        switch (currentType) {
            case ComponentTypes.CATEGORIZE:
                newResponses[answeringIndex] = store.getState().respond.CATEGORIZE;
                break
            case ComponentTypes.MCQ:
                newResponses[answeringIndex] = store.getState().respond.MCQ;
                break
            case ComponentTypes.SHORT_ANSWER:
                newResponses[answeringIndex] = store.getState().respond.SHORT_ANSWER;
                break
            case ComponentTypes.ESSAY:
                newResponses[answeringIndex] = store.getState().respond.ESSAY;
                break
        }
        respondService.respond(newResponses)
    }

    const CurrentRespondingComponent = () => {
        if (!components || components.length == 0) return<></>
        const component = components[answeringIndex]
        const type = component.type
        const questionId = component._id;
        const categoriesPayload = {};
        if (type == ComponentTypes.CATEGORIZE) {
            const items = component.items;
            const categories = component.categories;
            const categorizePayload = categories.map((cat, indx) => {
                return ({ id: indx, name: cat, column: "CATEGORIES" })
            })
            categoriesPayload['items'] = items;
            categoriesPayload['categories'] = categorizePayload
        }

        const mcqPayload = {};
        if (type == ComponentTypes.MCQ) {
            const options = component.options
            mcqPayload['options'] = options
        }
        return <Respond type={type} onNext={onNext} onPrevious={onPrevious} questionId={questionId} question={component.question} categoriesPayload={categoriesPayload} mcqPayload={mcqPayload} nextButton={nextButtonText} />
    }

    return (
        <div style={{ height: '100vh' }}>
            <CurrentRespondingComponent />
        </div>
    )
}

export default Preview