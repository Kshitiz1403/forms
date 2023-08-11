import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_FORM } from '../../store/reducers/formSlice';

const Form = () => {
    const formService = useForm();
    const params = useParams();
    const navigate = useNavigate();
    const formId = useSelector(state => state.form.formId)
    const dispatch = useDispatch()

    useEffect(() => {
        const formId = params.id
        dispatch(LOAD_FORM({ formId }))
    }, [])

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Button style={{ marginTop: 25 }} variant='contained' onClick={() => navigate(`/form/${formId}/question`)}>Add Question</Button>
            <Button style={{ marginTop: 25 }} variant='contained' color='success' onClick={() => navigate(`/form/${formId}/preview`)}>Preview the Form</Button>
            <Button style={{ marginTop: 25 }} color='error' variant='contained' onClick={() => formService.publish(formId)}>Publish!</Button>
        </div>
    )
}

export default Form