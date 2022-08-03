import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from "../container/index"
import ContactList from "@/modules/FuncBar/ContactList/ContactList"
import ConversationList from "@/modules/FuncBar/ConversationList/ConversationList";
const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="contact" element={<ContactList />} />
                <Route path="conversation" element={<ConversationList />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter
