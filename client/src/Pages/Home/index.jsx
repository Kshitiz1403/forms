import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'

const Home = () => {
    const formService = useForm();
    // const crea
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h3>Create a form?</h3>
            <Button style={{ marginTop: 25 }} variant='outlined' onClick={() => formService.createForm()}>Let's Go!</Button>
        </div>
    )
}

export default Home