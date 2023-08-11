import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import { useParams } from 'react-router-dom'
import Respond from '../../Components/Respond'
import { useDispatch, useSelector } from 'react-redux'
import { ANSWER_NEXT, ANSWER_PREVIOUS, RESET_RESPOND_STATE, SAVE_RESPONSE } from '../../store/reducers/respondSlice'
import { ComponentTypes } from '../../enums/ComponentTypes'
import useRespond from '../../hooks/useRespond'
import store from '../../store'
import useQuery from '../../hooks/useQuery'

const Preview = ({ isSubmit }) => {

    const formService = useForm();
    const respondService = useRespond();
    const query = useQuery();
    const dispatch = useDispatch();
    const components = useSelector(state => state.form.components)
    const answeringIndex = useSelector(state => state.respond.answeringIndex)
    const componentsLength = components.length;

    const [nextButton, setNextButton] = useState({ text: "Next", isDisabled: false })


    useEffect(() => {
        (async () => {
            const formId = query.get('id')

            if (isSubmit) {
                const form = await formService.getForm(formId)
            } else {
                const form = await formService.previewForm(formId)
            }
        })();
        dispatch(RESET_RESPOND_STATE())
    }, [])

    useEffect(() => {
        if (components && Array.isArray(components) && answeringIndex == components.length - 1) {
            if (isSubmit) return setNextButton({ text: "Submit", isDisabled: false })
            return setNextButton({ text: "Submit", isDisabled: true })

        }
        return setNextButton({ text: "Next", isDisabled: false })

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
        // if (!isSubmit)
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
        if (!components || components.length == 0) return <></>
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
        return <Respond type={type} onNext={onNext} onPrevious={onPrevious} questionId={questionId} question={component.question} categoriesPayload={categoriesPayload} mcqPayload={mcqPayload} nextButton={nextButton} />
    }

    return (
        <div style={{ height: '100vh' }}>
            <CurrentRespondingComponent />
        </div>
    )
}

export default Preview