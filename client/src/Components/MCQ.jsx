import React, { useReducer } from "react";
import { Button, IconButton, Radio, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const Option = ({ index, dispatch, state }) => {
  return <div style={{ display: 'flex', marginTop: 10 }} key={index}>
    <Radio checked={state.correctIndex == index} onChange={(e) => {
      const checked = e.target.checked;
      checked && dispatch({ type: "SELECT_CORRECT_OPTION", payload: index })
    }} />
    <TextField label={`Option ${index + 1}`} value={state.options[index]} onChange={e => {
      const value = e.target.value;
      dispatch({ type: "EDIT_OPTION", payload: { index, content: value } })
    }} />
    <IconButton onClick={() => dispatch({ type: "REMOVE_OPTION", payload: index })}>
      <DeleteIcon />
    </IconButton>
  </div>
}

const MCQ = () => {
  function reducer(state, action) {
    switch (action.type) {
      case "ADD_OPTION": {
        const options = [...state.options, ""];
        return { ...state, options };
      }
      case "EDIT_OPTION": {
        const { index, content } = action.payload;
        const options = [...state.options];
        options[index] = content

        return { ...state, options }
      }
      case "REMOVE_OPTION": {
        const index = action.payload;
        const options = [...state.options];
        options.splice(index, 1);

        if (state.correctIndex == index) {
          return { ...state, correctIndex: null, options };
        }
        return { ...state, options };
      }
      case "SELECT_CORRECT_OPTION": {
        const index = action.payload;
        return { ...state, correctIndex: index };
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    options: [],
    correctIndex: null,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {state.options.map((e, index) => <Option key={index} index={index} dispatch={dispatch} state={state} />)}
      <Button style={{ alignSelf: 'center', width: 'fit-content' }} variant="outlined" onClick={() => dispatch({ type: "ADD_OPTION" })}>Add Option</Button>
    </div>
  );
};

export default MCQ;
