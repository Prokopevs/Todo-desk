import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./scss/app.scss"
import { Provider } from "react-redux"
import { store } from "./Store/store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    // <React.StrictMode>

    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

    // </React.StrictMode>
)
