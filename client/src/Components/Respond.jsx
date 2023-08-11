import React, { useEffect, useReducer, useState } from 'react'
import { Button, Radio, TextField } from '@mui/material';
import { MovableComponent } from './MovableComponent';
import { ComponentTypes } from '../enums/ComponentTypes';
import { useDispatch } from 'react-redux';
import { SYNC_ESSAY_STATE, SYNC_MCQ_STATE, SYNC_SHORT_STATE } from '../store/reducers/respondSlice';

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
        reduxDispatch(SYNC_MCQ_STATE({ questionId, ...state, type: ComponentTypes.MCQ }))
    }, [state])

    return <div style={{ display: 'flex', marginTop: 10, flexDirection: 'column' }} >
        {options.map((option, indx) => {
            return <div key={indx} style={{ display: 'flex', alignItems: 'center' }} onClick={() => dispatch({ type: "CHECK", payload: indx })}>
                <Radio checked={state.chosenIndex == indx} onChange={e => dispatch({ type: "CHECK", payload: indx })} />
                <div>
                    {option}
                </div>
            </div>
        })
        }
    </div>
}

const TextResponse = ({ questionId, type }) => {
    const reduxDispath = useDispatch();
    const [text, setText] = useState("");
    useEffect(() => {
        if (type == ComponentTypes.SHORT_ANSWER) reduxDispath(SYNC_SHORT_STATE({ questionId, type, textResponse: text }))
        else if (type == ComponentTypes.ESSAY) reduxDispath(SYNC_ESSAY_STATE({ questionId, type, textResponse: text }))
    }, [text])


    return <div style={{ display: 'flex', justifyContent: 'center', }}>
        <TextField style={{ width: '100%', marginTop: 20 }} multiline label="Text" value={text} onChange={e => setText(e.target.value)} />

    </div>
}


const Respond = ({ type, onNext, onPrevious, questionId, question, categoriesPayload, mcqPayload, previousButton, nextButton }) => {

    return (
        <div style={{ height: '100%', borderWidth: 0.1, borderColor: 'rgba(0, 0, 0, 0.125)', borderStyle: 'solid', borderRadius: 10, boxShadow: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20, paddingLeft: 20, }}>
            <Button variant='contained' onClick={onPrevious}>Previous</Button>
            <div style={{ flex: 0.75 }}>
                <div style={{ textAlign: 'center' }}>{question}</div>
                {type == ComponentTypes.CATEGORIZE ?
                    <MovableComponent questionId={questionId} categories={categoriesPayload.categories} categoryItems={categoriesPayload.items} />
                    :
                    type == ComponentTypes.MCQ ? <MCQ options={mcqPayload.options} questionId={questionId} /> :
                        (type == ComponentTypes.SHORT_ANSWER || type == ComponentTypes.ESSAY) ? <TextResponse questionId={questionId} type={type} /> :
                            null
                }
            </div>

            <Button variant='contained' onClick={onNext}>{nextButton}</Button>

        </div>
    )
}

export default Respond