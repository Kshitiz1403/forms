import { BrowserRouter, Route, Routes } from "react-router-dom"
import Question from "../Question"
import Home from "../Home"
import Form from "../Form"
import Preview from "../Preview"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<Form />} />
                <Route path="/form/preview" element={<Preview isSubmit={false} />} />
                <Route path="/form/submit" element={<Preview isSubmit={true} />} />
                <Route path='/form/question' element={<>
                    <div style={{ minHeight: '100vh', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                        <Question />
                    </div>
                </>} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes