import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.css';
import './assets/css/reset.css'
import { store } from './store'
import { Provider} from "react-redux";
import Router from "./router";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Router />
    </Provider>
)
