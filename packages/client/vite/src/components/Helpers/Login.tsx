import { exit } from "@tauri-apps/api/process";
import { FormEvent, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { Loader } from "./Loader";

export const Login = () => {
  const [playerName, setPlayerName] = useState("");
  const { socket, connected } = useSocket();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("name_entered", { name: playerName });
  };

  return connected ? (
    <div className="h-full w-full flex items-center justify-center">
      <div className="px-6 py-4 flex flex-col rounded-xl bg-gray-50 w-fit gap-6">
        <h2 className="font-bold text-gray-700 text-center text-2xl">
          Etabli Client
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
          <div className="w-full flex flex-col">
            <label
              htmlFor="playerName"
              className="text-sm font-semibold text-gray-700"
            >
              Enter your player name 🤓
            </label>
            <div className="inline-flex items-center gap-4">
              <input
                type="text"
                id="playerName"
                placeholder="floriaaan"
                className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-150"
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg text-white bg-blue-500 hover:bg-blue-700 duration-150"
              >
                Play
              </button>
            </div>
          </div>
        </form>
        <button
          type="button"
          onClick={() => exit()}
          className="px-3 py-1.5 rounded-lg text-white bg-red-500 hover:bg-red-700 duration-150"
        >
          Exit
        </button>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
