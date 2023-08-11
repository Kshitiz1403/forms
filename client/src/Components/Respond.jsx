import React, { useReducer, useState } from 'react'
import { Button, IconButton, Radio, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MovableComponent } from './MovableComponent';

const MCQ = () => {
    return <div style={{ display: 'flex', marginTop: 10 }} >
        <Radio checked={state.correctIndex == index} onChange={(e) => {
            const checked = e.target.checked;
            checked && dispatch(SELECT_CORRECT_OPTION(index))
        }} />
        <TextField label={`Option ${index + 1}`} value={state.options[index]} onChange={e => {
            const value = e.target.value;
            dispatch(EDIT_OPTION({ index, content: value }))
        }} />
        <IconButton onClick={() => dispatch(REMOVE_OPTION(index))}>
            <DeleteIcon />
        </IconButton>
    </div>
}

const ItemInCategorize = ({ category }) => {
    return <div style={{ display: 'flex', padding: 10, backgroundColor: 'yellow', borderRadius: 5, height: 25, aspectRatio: 2, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>{category}</div>
}

const Categorize = () => {
    return <DndProvider backend={HTML5Backend} >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {[1, 2, 3].map(cat => <ItemInCategorize category={cat} />)}
            </div>
            <div>

            </div>
        </div>
    </DndProvider>
}
const Respond = (payload = {}) => {




    function reducer(state, action) {
        switch (action.type) {
            case "SELECT_OPTION_MCQ": {
                const selectedIndex = action.payload;
                return { ...state, selectedIndex }
            }
            // case  
        }
    }

    const [state, dispatch] = useReducer(reducer, payload)

    return (
        <div style={{ height: '100%', borderWidth: 0.1, borderColor: 'rgba(0, 0, 0, 0.125)', borderStyle: 'solid', borderRadius: 10, padding: 20, boxShadow: 10, }}>
            <div style={{ textAlign: 'center' }}>Question</div>
            <div style={{ textAlign: 'center' }}>Question</div>
            <MovableComponent tasks={[
                { id: 1, name: 'Item 1', column: "CATEGORIES" },
                { id: 2, name: 'Item 2', column: "CATEGORIES" },
                { id: 3, name: 'Item 3', column: "CATEGORIES" },
                { id: 4, name: 'Item 4', column: "CATEGORIES" },
            ]} myItems={[
                "OPTION1",
                "OPTION2",
                "OPTION3",
                "OPTION4",

            ]}/>

        </div>
    )
}

export default Respond