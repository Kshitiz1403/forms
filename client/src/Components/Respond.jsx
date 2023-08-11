import React, { useEffect, useReducer, useState } from 'react'
import { Button, IconButton, Radio, TextField } from '@mui/material';
import { MovableComponent } from './MovableComponent';
import { ComponentTypes } from '../enums/ComponentTypes';
import { useDispatch } from 'react-redux';
import { SYNC_MCQ_STATE } from '../store/reducers/respondSlice';

const MCQ = ({ options, questionId }) => {
    const reduxDispatch = useDispatch();

    function reducer(state, action) {
        switch (action.type) {
            case "CHECK": {
                const index = action.payload
                return { ...state, chosenIndex: index }
            }
        }
    }
    const [state, dispatch] = useReducer(reducer, {
        chosenIndex: null
    })

    useEffect(() => {
        reduxDispatch(SYNC_MCQ_STATE({ questionId, ...state }))
    }, [state])

    return <div style={{ display: 'flex', marginTop: 10, flexDirection: 'column' }} >
        {options.map((option, indx) => {
            return <div key={indx} style={{ display: 'flex', alignItems: 'center' }}>
                <Radio checked={state.chosenIndex == indx} onChange={e => {
                    const checked = e.target.checked;
                    checked && dispatch({ type: "CHECK", payload: indx })
                }} />
                <div>
                    {option}
                </div>
            </div>
        })
        }
    </div>
}


const Respond = ({ type, onNext, onPrevious, questionId, question, categoriesPayload, mcqPayload }) => {

    return (
        <div style={{ height: '100%', borderWidth: 0.1, borderColor: 'rgba(0, 0, 0, 0.125)', borderStyle: 'solid', borderRadius: 10, boxShadow: 10, display: 'flex', justifyContent: 'space-between', }}>
            <Button variant='contained' onClick={onPrevious}>Previous</Button>
            <div>
                <div style={{ textAlign: 'center' }}>{question}</div>
                {type == ComponentTypes.CATEGORIZE ?
                    <MovableComponent questionId={questionId} categories={categoriesPayload.categories} categoryItems={categoriesPayload.items} />
                    : null
                }
                {type == ComponentTypes.MCQ ? <MCQ options={mcqPayload.options} questionId={questionId} /> : null}
            </div>

            <Button variant='contained' onClick={onNext}>Next</Button>

        </div>
    )
}

export default Respond