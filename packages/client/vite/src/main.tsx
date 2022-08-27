import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Disconnect } from "./components/Helpers/Disconnect";
import { VersionDisplayer } from "./components/Helpers/Version";
import { GameProvider } from "./hooks/useGameContext";
import { SocketProvider } from "./hooks/useSocket";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <>
      <SocketProvider>
        <GameProvider>
          <App />
          <Disconnect />
        </GameProvider>
      </SocketProvider>
      <VersionDisplayer />
    </>
  </React.StrictMode>
);
