import { BrowserRouter, Route, Routes } from "react-router-dom"
import Question from "../Question"
import Home from "../Home"
import Form from "../Form"
import Preview from "../Preview"
import Report from "../Report"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<Form />} />
                <Route path="/form/preview" element={<Preview isSubmit={false} />} />
                <Route path="/form/submit" element={<Preview isSubmit={true} />} />
                <Route path='/form/question' element={<Question />} />
                <Route path="/report" element={<Report />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes