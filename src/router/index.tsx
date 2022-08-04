import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import App from "../container/index"
import ContactList from "@/views/FuncBar/ContactList/ContactList"
import ConversationList from "@/views/FuncBar/ConversationList/ConversationList";
const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="" element={<Navigate to="conversation"/>} />

                <Route path="contact" element={<ContactList />} />
                <Route path="conversation" element={<ConversationList />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
)

export default BaseRouter
