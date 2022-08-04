import { useState, useEffect } from "preact/hooks";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export function App() {
  return (
    <>
      <div className="p-5  flex flex-col gap-4 h-screen">
        <h1 className="text-3xl">Hello Etabli</h1>
        <Test />
      </div>
    </>
  );
}

const Test = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("webapp:get_players");

    socket.on("webapp:players", (data) => {
      setPlayers(data);
    });
   

    return () => {
      socket.off("webapp:players");
    };
  }, []);

  return <pre className="text-xs">{JSON.stringify(players, undefined, 2)}</pre>;
};
