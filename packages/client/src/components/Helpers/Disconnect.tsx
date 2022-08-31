import { useGameContext } from "../../hooks/useGameContext";
import { useSocket } from "../../hooks/useSocket";

export const Disconnect = () => {
  const { connected, disconnect } = useSocket();
  const { player } = useGameContext();

  return (
    <>
      {player && connected && (
        <div className="fixed top-0 right-0 z-50 text-xs items-end  m-1 rounded-md bg-red-500 bg-opacity-25 text-white flex flex-col-reverse">
          <button
            className="px-2 py-1 text-xs font-semibold text-red-700"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </div>
      )}
    </>
  );
};
