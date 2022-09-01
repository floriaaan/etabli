import { exit } from "@tauri-apps/api/process";
import classNames from "classnames";
import { useSocket } from "../../hooks/useSocket";
import { Logo } from "../Logo";

export const MainTitle = () => {
  const { connected, reconnect } = useSocket();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <img
        src="/assets/panorama.png"
        className="absolute h-full w-full object-cover inset-0"
      ></img>
      <div className="z-[1] p-6  flex flex-col items-center gap-6 rounded-xl bg-black bg-opacity-20 w-full max-w-xl">
        <Logo />

        <div className="grid grid-cols-2 gap-2 max-w-sm w-full">
          <button
            onClick={() => alert("Coming soon!")}
            disabled
            className="px-3 py-1.5 col-span-2 rounded-lg text-white bg-green-500 hover:bg-green-700 duration-150 disabled:opacity-50"
          >
            Singleplayer
          </button>
          <button
            onClick={reconnect}
            className="px-3 py-1.5 col-span-2 rounded-lg text-white bg-green-500 hover:bg-green-700 duration-150"
          >
            Multiplayer
          </button>

          <button
            disabled
            className={classNames(
              "px-3 py-1.5 rounded-lg text-neutral-700 bg-neutral-200 hover:bg-neutral-300 duration-150 disabled:opacity-50",
              {
                "col-span-2": !window.__TAURI__,
              }
            )}
          >
            Options
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
  );
};
