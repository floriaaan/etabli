import { exit } from "@tauri-apps/api/process";
import classNames from "classnames";
import { FormEvent, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { Logo } from "../Logo";
import { MainTitle } from "./MainTitle";

export const Login = () => {
  const [playerName, setPlayerName] = useState("");
  const { socket, connected, disconnect } = useSocket();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("name_entered", { name: playerName });
  };

  return connected ? (
    <div className="h-full w-full flex items-center justify-center">
      <img
        src="/assets/panorama.png"
        className="absolute h-full w-full object-cover inset-0"
      ></img>
      <div className="z-[1] p-6  flex flex-col justify-center items-center gap-6 rounded-xl bg-black bg-opacity-20 w-full max-w-xl">
        <Logo />
        <div className="grid grid-cols-2 gap-2 max-w-sm w-full">
          <form
            onSubmit={handleSubmit}
            className="inline-flex gap-2 w-full col-span-2"
          >
            <input
              type="text"
              id="playerName"
              placeholder="floriaaan"
              className="px-3 py-1.5 rounded-lg grow bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 duration-150"
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg text-white bg-blue-500 hover:bg-blue-700 duration-150"
            >
              Play
            </button>
          </form>
          <button
            type="button"
            onClick={() => disconnect()}
            className={classNames(
              "px-3 py-1.5 rounded-lg text-white bg-neutral-500 hover:bg-neutral-700 duration-150",
              { "col-span-2": !window.__TAURI__ }
            )}
          >
            Disconnect
          </button>
          {window.__TAURI__ && (
            <button
              type="button"
              onClick={() => exit()}
              className="px-3 py-1.5 rounded-lg text-white bg-red-500 hover:bg-red-700 duration-150"
            >
              Exit
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <MainTitle />
  );
};
