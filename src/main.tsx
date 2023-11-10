import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {Provider} from "react-redux";
import {gameState} from "./game-state/gameState.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <Provider store={gameState}>
        <App />
    </Provider>
    // </React.StrictMode>,
);
