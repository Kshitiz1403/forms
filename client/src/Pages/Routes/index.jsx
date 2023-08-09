import { BrowserRouter, Route, Routes } from "react-router-dom"
import Question from "../../Components/Question"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/form/:id' element={<>
                    <div style={{ minHeight: '100vh', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                        <Question />
                    </div>
                </>} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes