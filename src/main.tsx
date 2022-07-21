import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './container/index'
import 'antd/dist/antd.css';
import './assets/css/reset.css'
import { store } from './store'
import { Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
)
