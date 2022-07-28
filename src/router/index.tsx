import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from "../container/index"
const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter
