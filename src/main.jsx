import React from "react";
import reactDom from "react-dom";
import App from "./containers/App";
import "./assets/styles.css";

reactDom.render(
    <React.Fragment>
        <App />
    </React.Fragment>,
    document.getElementById("root")
);
