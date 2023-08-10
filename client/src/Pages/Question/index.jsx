import { Button, MenuItem, Select, Snackbar, TextField } from "@mui/material"
import { ComponentTypes } from "../../enums/ComponentTypes"
import MCQ from "../../Components/MCQ"
import Categorize from "../../Components/Categorize"
import { useDispatch, useSelector } from "react-redux"
import { SWITCH_TYPE, UPDATE_QUESTION } from "../../store/reducers/questionSlice"
import useQuestion from "../../hooks/useQuestion"

const Question = ({ isViewOnly = false, viewOnlyPayload = {} }) => {

    const questionService = useQuestion();

    const handleChange = (event) => {
        const value = event.target.value;

        dispatch(SWITCH_TYPE(value))
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
                    {!isViewOnly ? <Select
                        labelId="Choose Question Type"
                        value={state.questionType}
                        label="Question Type"
                        defaultValue={state.questionType}
                        onChange={handleChange}
                    >
                        {Object.values(ComponentTypes).map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}

                    </Select> : null}
                </div>
                <div style={{ marginTop: 10, marginBottom: 20 }}>
                    <TextField style={{ width: '100%' }} id="outlined-basic" label="Question" value={isViewOnly ? viewOnlyPayload.question : state.question} onChange={(event) => !isViewOnly && dispatch(UPDATE_QUESTION(event.target.value))} variant="outlined" />
                </div>
                {isViewOnly ?
                    viewOnlyPayload.questionType == ComponentTypes.MCQ ? <MCQ isViewOnly={isViewOnly} viewOnlyPayload={viewOnlyPayload} /> : viewOnlyPayload.questionType == ComponentTypes.CATEGORIZE ? <Categorize isViewOnly={isViewOnly} viewOnlyPayload={viewOnlyPayload} /> : null
                    :
                    state.questionType == ComponentTypes.MCQ ? <MCQ isViewOnly={isViewOnly} /> : state.questionType == ComponentTypes.CATEGORIZE ? <Categorize /> : null
                }

            </div>
            {!isViewOnly ? <div style={{ justifyContent: 'center', display: 'flex', marginTop: 10 }}>
                <Button variant="contained" onClick={() => questionService.addQuestion()}>Add Question</Button>
            </div> : null}
        </div>)
}

export default Question