import React, { useEffect } from 'react'
import MCQ from '../../Components/MCQ'
import Question from '../Question'
import useForm from '../../hooks/useForm'
import { useParams } from 'react-router-dom'
import Respond from '../../Components/Respond'
import { useDispatch, useSelector } from 'react-redux'
import { ANSWER_NEXT, ANSWER_PREVIOUS, SAVE_RESPONSE } from '../../store/reducers/respondSlice'
import { ComponentTypes } from '../../enums/ComponentTypes'

const Preview = () => {

    const formService = useForm();
    const params = useParams();
    const dispatch = useDispatch();
    const components = useSelector(state => state.form.components)
    const answeringIndex = useSelector(state => state.respond.answeringIndex)



    useEffect(() => {
        (async () => {
            const formId = params.id;

            const form = await formService.getForm(formId);
        })();
    }, [])

    const getCurrentComponent = () => {
        if (!components || components.length == 0) return null;
        const component = components[answeringIndex];
        return { component, type: component.type };
    }
    const onNext = () => {

        const currentType = getCurrentComponent().type;
        // Start saving process
        dispatch(SAVE_RESPONSE({ type: currentType }))

        const length = components.length;
        if (answeringIndex < length - 1) dispatch(ANSWER_NEXT())
    }
    const onPrevious = () => {

        const currentType = getCurrentComponent().type;
        // Start saving process
        dispatch(SAVE_RESPONSE({ type: currentType }))

        if (answeringIndex > 0) dispatch(ANSWER_PREVIOUS())
    }

    const CurrentRespondingComponent = () => {
        if (!components || components.length == 0) return
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
        return <Respond type={type} onNext={onNext} onPrevious={onPrevious} questionId={questionId} question={component.question} categoriesPayload={categoriesPayload} mcqPayload={mcqPayload} />
    }

    return (
        <>
            <CurrentRespondingComponent />
        </>
    )
}

export default Preview