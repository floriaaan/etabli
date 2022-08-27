import { useSocket } from "../../hooks/useSocket";

export const Loader = () => {
  const { connected, reconnect } = useSocket();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="px-6 py-4 flex flex-col items-center gap-2 rounded-xl bg-gray-50 w-full max-w-md">
        <h2 className="font-bold text-gray-700 text-2xl">Etabli Client</h2>

        <button
          onClick={reconnect}
          className="px-3 py-1.5 rounded-lg text-white bg-green-500 hover:bg-green-700 duration-150"
        >
          Connect
        </button>
      </div>
    </div>
  );
};
