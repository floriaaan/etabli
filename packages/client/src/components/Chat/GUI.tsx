import { RefObject } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import { ChatMessage, SystemMessage } from "./Message";

export const ChatGUI = ({ inputRef }: { inputRef: RefObject<HTMLInputElement> }) => {
  const { chat } = useGameContext();
  return (
    <div className="absolute h-screen w-screen bg-neutral-800 bg-opacity-40 top-0 left-0 flex flex-col justify-end p-2 gap-2">
      <div className="flex flex-col gap-1 p-2 bg-neutral-800 rounded-md min-h-[32px]">
        {chat.map((message, index) =>
          message.type === "chat" ? (
            <ChatMessage key={index} {...message} />
          ) : (
            <SystemMessage key={index} {...message} />
          )
        )}
      </div>
      <input
        autoFocus
        className="bg-neutral-800 text-white rounded-md px-2 py-1"
        type="text"
        ref={inputRef}
      />
    </div>
  );
};
