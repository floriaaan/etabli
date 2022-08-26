import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { version } from "../package.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <div className="absolute bottom-0 right-0 text-xs items-end p-2 m-1 rounded-md bg-black bg-opacity-25 text-white flex flex-col-reverse">
      <span>version: <span className="font-bold">{version}</span></span>
      <span>date: <span className="font-bold">{new Date().toISOString()}</span></span>

    </div>
  </React.StrictMode>
);
