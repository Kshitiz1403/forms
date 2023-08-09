import React from 'react'
import { IconButton, TextField, Button, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CATEGORY, ADD_ITEM, EDIT_CATEGORY, EDIT_ITEM, MAP_BELONGING, REMOVE_CATEGORY, REMOVE_ITEM } from '../store/reducers/categorizeSlice';

const Category = ({ index, dispatch, state }) => {
    return <div style={{ display: 'flex', marginTop: 10 }} key={index}>
        <TextField label={`Category ${index + 1}`} value={state.categories[index]} onChange={e => {
            const value = e.target.value;
            dispatch(EDIT_CATEGORY({ index, content: value }))
        }} />

        <IconButton onClick={() => dispatch(REMOVE_CATEGORY(index))}>
            <DeleteIcon />
        </IconButton>
    </div >
}

const Item = ({ index, dispatch, state }) => {
    const handleMappingChange = (event) => {
        const category = event.target.value;
        dispatch(MAP_BELONGING({ index, category }))
    }

    return <div style={{ display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
            <TextField label={`Item ${index + 1}`} value={state.items[index].item} onChange={e => {
                const value = e.target.value;
                dispatch(EDIT_ITEM({ index, content: value }))
            }} />
            <IconButton onClick={() => dispatch(REMOVE_ITEM(index))}>
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
    const state = useSelector(state => state.categorize);
    const dispatch = useDispatch();

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
                <div>Categories</div>
                {state.categories.map((el, index) => <Category dispatch={dispatch} index={index} state={state} key={index} />)}
                <Button style={{ width: 'fit-content', marginTop: 10 }} variant="outlined" onClick={() => dispatch(ADD_CATEGORY())}>Add Category</Button>
            </div>

            <div style={{ marginRight: 25, marginTop: 20 }}>
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <div>Items</div>
                    <div>Belongs To</div>
                </div>
                {state.items.map((el, index) => <Item index={index} dispatch={dispatch} state={state} key={index} />)}
                <Button style={{ width: 'fit-content', marginTop: 10 }} variant="outlined" onClick={() => dispatch(ADD_ITEM())}>Add Item</Button>
            </div>
        </div>
    )
}

export default Categorize