import { useEffect, useRef, useState } from "react";
import { defaultKeybinds, Keybind } from "../../constants/defaultKeybinds";
import { useGameContext } from "../../hooks/useGameContext";
import { useSocket } from "../../hooks/useSocket";

export const KeyboardListener = () => {
  const [component, setComponent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      let component = <HandleKeyDown event={event} />;
      setComponent(component);
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return component;
};

const getAssignedKey = (code: string): Keybind | null => {
  const keybinds = JSON.parse(localStorage.getItem("keybinds") || "{}");
  const keybind = keybinds[code] || defaultKeybinds[code];

  return keybind;
};

export const HandleKeyDown = ({
  event,
}: {
  event: KeyboardEvent;
}): JSX.Element => {
  const { socket } = useSocket();
  const keybind = getAssignedKey(event.code);
  const [message, setMessage] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [component, setComponent] = useState<JSX.Element>(<></>);
  const inputRef = useRef<HTMLInputElement>(null);

  const { chat, player } = useGameContext();

  useEffect(() => {
    (async () => {
      if (isChatOpen) {
        if (event.code === "Enter") {
          let message = inputRef.current?.value || "";
          if (message.trim()) socket?.emit("chat_message", message);
          setIsChatOpen(false);
          setComponent(<></>);
        } else if (event.code === "Escape") {
          setIsChatOpen(false);
          setComponent(<></>);
        }

        return;
      } else {
        switch (keybind?.action) {
          case "open_chat":
            setIsChatOpen(true);
            setComponent(
              <div className="absolute h-screen w-screen bg-gray-800 bg-opacity-40 top-0 left-0 flex flex-col justify-end p-2 gap-2">
                <div className="flex flex-col gap-1 p-2 bg-gray-800 rounded-md min-h-[32px]">
                  {chat.map((message, index) =>
                    message.type === "chat" ? (
                      <div
                        key={index}
                        className="inline-flex items-center gap-1"
                      >
                        <span className="text-blue-500 text-sm font-bold">
                          {message.playerName}
                        </span>
                        <span className="text-gray-200 text-xs">
                          {message.message}
                        </span>
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="inline-flex items-center gap-1"
                      >
                        <span className="text-amber-500 text-sm font-bold">
                          {message.message}
                        </span>
                      </div>
                    )
                  )}
                </div>
                <input
                  autoFocus
                  className="bg-gray-800 text-white rounded-md px-2 py-1"
                  type="text"
                  ref={inputRef}
                />
              </div>
            );
            break;
          case "open_inventory":
            console.log("open_inventory");
            break;
          default:
            console.log("default", event.code);
            break;
        }
      }
    })();
  }, [event]);

  // useEffect(() => {
  //   if (inputRef.current) inputRef.current.value = message;
  // }, [message]);

  return component;
};
