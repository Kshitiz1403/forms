import React from "react";
import { Button, IconButton, Radio, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { ADD_OPTION, EDIT_OPTION, REMOVE_OPTION, SELECT_CORRECT_OPTION } from "../store/reducers/mcqSlice";


const Option = ({ index, dispatch, state }) => {
  return <div style={{ display: 'flex', marginTop: 10 }} key={index}>
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

const MCQ = () => {

  const state = useSelector(state => state.mcq)
  const options = useSelector(state => state.mcq.options)
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {options.map((e, index) => <Option key={index} index={index} dispatch={dispatch} state={state} />)}
      <Button style={{ alignSelf: 'center', width: 'fit-content' }} variant="outlined" onClick={() => dispatch(ADD_OPTION())}>Add Option</Button>
    </div>
  );
};

export default MCQ;
