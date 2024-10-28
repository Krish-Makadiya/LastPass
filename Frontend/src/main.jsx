import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import React from "react";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <Toaster position="top-center" reverseOrder={false} />
        </BrowserRouter>
    </Provider>
);
