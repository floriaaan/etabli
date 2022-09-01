import { useEffect, useRef, useState } from "react";
import { defaultKeybinds, Keybind } from "../../constants/defaultKeybinds";
import { useSocket } from "../../hooks/useSocket";
import { ChatGUI } from "../Chat/GUI";
import { InventoryGUI } from "../Inventory/GUI";

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
  const [component, setComponent] = useState<JSX.Element>(<></>);

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
            setComponent(<ChatGUI inputRef={inputRef} />);
            break;
          case "open_inventory":
            console.log("open_inventory");
            setComponent(<InventoryGUI />);
            break;
          default:
            if (event.code === "Escape") setComponent(<></>);
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
