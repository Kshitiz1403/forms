import { Button, MenuItem, Select, Snackbar, TextField } from "@mui/material"
import { ComponentTypes } from "../../enums/ComponentTypes"
import MCQ from "../../Components/MCQ"
import Categorize from "../../Components/Categorize"
import { useDispatch, useSelector } from "react-redux"
import { SWITCH_TYPE, UPDATE_QUESTION } from "../../store/reducers/questionSlice"
import useQuestion from "../../hooks/useQuestion"

const Question = () => {

    const questionService = useQuestion();

    const handleChange = (event) => {
        const value = event.target.value;

        dispatch(SWITCH_TYPE(value))
    }

    const handleQuestionInput = (event) => {
        dispatch(UPDATE_QUESTION(event.target.value))
    }

    const handleAddQuestion = () => {
        questionService.addQuestion()
    }

    const state = useSelector(state => state.question)
    const dispatch = useDispatch();

    return (
        <div style={{ minWidth: '50%', maxidth: '90%' }}>
            <div style={{
                height: '100%', borderWidth: 0.1, borderColor: 'rgba(0, 0, 0, 0.125)', borderStyle: 'solid', borderRadius: 10, padding: 20, boxShadow: 10,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
            }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <Select
                        labelId="Choose Question Type"
                        value={state.questionType}
                        label="Question Type"
                        defaultValue={state.questionType}
                        onChange={handleChange}
                    >
                        {Object.values(ComponentTypes).map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                    </Select>
                </div>
                <div style={{ marginTop: 10, marginBottom: 20 }}>
                    <TextField style={{ width: '100%' }} id="outlined-basic" label="Question" value={state.question} onChange={handleQuestionInput} variant="outlined" />
                </div>
                {state.questionType == ComponentTypes.MCQ ? <MCQ /> : state.questionType == ComponentTypes.CATEGORIZE ? <Categorize /> : null}

            </div>
            <div style={{ justifyContent: 'center', display: 'flex', marginTop: 10 }}>
                <Button variant="contained" onClick={handleAddQuestion}>Add Question</Button>
            </div>
        </div>)
}

export default Question