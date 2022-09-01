import { ChatMessage as ChatMessageType } from "../../hooks/useGameContext";

export const SystemMessage = ({ message }: ChatMessageType) => {
  return (
    <div className="inline-flex items-center gap-1">
      <span className="text-amber-500 text-sm font-bold">{message}</span>
    </div>
  );
};

export const ChatMessage = ({ message, playerName }: ChatMessageType) => {
  return (
    <div className="inline-flex items-center gap-1">
      <span className="text-blue-500 text-sm font-bold">{playerName}</span>
      <span className="text-neutral-200 text-xs">{message}</span>
    </div>
  );
};
