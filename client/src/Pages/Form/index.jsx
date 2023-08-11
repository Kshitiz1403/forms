import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_FORM } from '../../store/reducers/formSlice';
import useQuery from '../../hooks/useQuery';

const Form = () => {
    const formService = useForm();
    const navigate = useNavigate();
    const formId = useSelector(state => state.form.formId)
    const dispatch = useDispatch()
    const query = useQuery()


    useEffect(() => {
        const formId = query.get('id')
        dispatch(LOAD_FORM({ formId }))
    }, [])

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Button style={{ marginTop: 25 }} variant='contained' onClick={() => navigate(`/form/question?id=${formId}`)}>Start adding questions</Button>
            <div>
                <Button style={{ marginTop: 25 }} variant='contained' color='success' onClick={() => navigate(`/form/preview?id=${formId}`)}>Preview the Form</Button>
                <Button style={{ marginTop: 25, marginLeft: 10 }} variant='contained' color='success' onClick={() => navigate(`/form/submit?id=${formId}`)}>Submit the form</Button>
            </div>
            <Button style={{ marginTop: 25 }} variant='contained' onClick={() => formService.publish(formId)}>Publish!</Button>
            <Button style={{ marginTop: 25 }} color='error' variant='contained' onClick={() => formService.unpublish(formId)}>Unpublish!</Button>
        </div>
    )
}

export default Form