import React, { useReducer } from 'react'
import { IconButton, TextField, Button, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const Category = ({ index, dispatch, state }) => {
    return <div style={{ display: 'flex', marginTop: 10 }} key={index}>
        <TextField label={`Category ${index + 1}`} value={state.categories[index]} onChange={e => {
            const value = e.target.value;
            dispatch({ type: "EDIT_CATEGORY", payload: { index, content: value } })
        }} />
        <IconButton onClick={() => dispatch({ type: "REMOVE_CATEGORY", payload: index })}>
            <DeleteIcon />
        </IconButton>
    </div>
}

const Item = ({ index, dispatch, state }) => {
    const handleMappingChange = (event) => {
        const category = event.target.value;
        dispatch({ type: "MAP_BELONGING", payload: { index, category } })
    }

    return <div style={{ display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
            <TextField label={`Item ${index + 1}`} value={state.items[index].item} onChange={e => {
                const value = e.target.value;
                dispatch({ type: "EDIT_ITEM", payload: { index, content: value } })
            }} />
            <IconButton onClick={() => dispatch({ type: "REMOVE_ITEM", payload: index })}>
                <DeleteIcon />
            </IconButton>
        </div>
        <div>
            <Select
                labelId="Choose Category"
                value={state.items[index].belongsTo}
                label="Choose Category"
                defaultValue={""}
                onChange={handleMappingChange}
            >
                {state.categories.map(category => {
                    return <MenuItem key={category} value={category}>{category}</MenuItem>
                })}
            </Select>
        </div>

    </div>
}

const Categorize = () => {
    function reducer(state, action) {
        switch (action.type) {
            case "ADD_CATEGORY": {
                const categories = [...state.categories, ""];
                return { ...state, categories }
            }
            case "REMOVE_CATEGORY": {
                const index = action.payload;
                const categories = [...state.categories];
                categories.splice(index, 1)
                return { ...state, categories }
            }
            case "EDIT_CATEGORY": {
                const { index, content } = action.payload;
                const categories = [...state.categories];
                categories[index] = content
                return { ...state, categories }
            }
            case "ADD_ITEM": {
                const item = { item: "", belongsTo: "" }
                const items = [...state.items, item];

                return { ...state, items }
            }
            case "EDIT_ITEM": {
                const { content, index } = action.payload
                const items = structuredClone(state.items);

                const mapping = items[index]
                mapping.item = content;
                items[index] = mapping

                return { ...state, items }
            }
            case "REMOVE_ITEM": {
                const index = action.payload
                const items = [...state.items];
                items.splice(index, 1)
                return { ...state, items }
            }
            case "MAP_BELONGING": {
                const { index, category } = action.payload
                const items = structuredClone(state.items);
                const mapping = items[index];
                mapping.belongsTo = category

                return { ...state, items }
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        categories: [],
        items: []
    })

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>Categories</div>
            {state.categories.map((el, index) => <Category dispatch={dispatch} index={index} state={state} key={index} />)}
            <Button style={{width:'fit-content', alignSelf:'center'}} variant="outlined" onClick={() => dispatch({ type: "ADD_CATEGORY" })}>Add Category</Button>
            <div style={{ marginRight: 25 }}>

                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <div>Items</div>
                    <div>Belongs To</div>
                </div>
                {state.items.map((el, index) => <Item index={index} dispatch={dispatch} state={state} key={index} />)}
            </div>

            <Button style={{width:'fit-content', alignSelf:'center'}} variant="outlined" onClick={() => dispatch({ type: "ADD_ITEM" })}>Add Item</Button>

        </div>
    )
}

export default Categorize