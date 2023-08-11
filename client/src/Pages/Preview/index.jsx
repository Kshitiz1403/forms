import React, { useEffect } from 'react'
import MCQ from '../../Components/MCQ'
import Question from '../Question'
import useForm from '../../hooks/useForm'
import { useParams } from 'react-router-dom'
import Respond from '../../Components/Respond'

const Preview = () => {

    const formService = useForm();
    const params = useParams();
    useEffect(() => {
        (async () => {
            const formId = params.id;

            const form = await formService.getForm(formId);
        })();
    }, [])

    return (
        <>
            {/* <div>Preview</div> */}
            <Respond/>
        </>
    )
}

export default Preview