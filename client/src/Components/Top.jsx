import { MenuItem, Select, TextField } from "@mui/material"
import { ComponentTypes } from "../enums/ComponentTypes"
import { useReducer, useState } from "react"
import MCQ from "./MCQ"

const Top = () => {

    const handleChange = (event) => {
        const value = event.target.value;

        dispatch({ type: "SWITCH_TYPE", payload: value })
    }

    function reducer(state, action) {
        switch (action.type) {
            case "SWITCH_TYPE": {
                const type = action.payload;
                return { ...state, questionType: type }
            }
            case "UPDATE_QUESTION": {
                const question = action.payload;
                return { ...state, question }
            }

        }
    }
    const [state, dispatch] = useReducer(reducer, {
        questionType: Object.values(ComponentTypes)[0],
        question: ""
    })

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.questionType}
                label="Question Type"
                defaultValue={state.questionType}
                onChange={handleChange}
            >
                {Object.keys(ComponentTypes).map(key => {
                    const value = ComponentTypes[key]
                    return <MenuItem key={value} value={value}>{value}</MenuItem>
                })}
            </Select>
        </div>
        <div>
            <TextField style={{ width: '100%' }} id="outlined-basic" label="Question" value={state.question} onChange={(event) => dispatch({ type: "UPDATE_QUESTION", payload: event.target.value })} variant="outlined" />
        </div>
        {state.questionType == ComponentTypes.MCQ ? <MCQ /> : null}
    </>
}

export default Top