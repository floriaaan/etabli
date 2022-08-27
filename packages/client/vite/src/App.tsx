import { Login } from "./components/Helpers/Login";
import { PlayerHUD } from "./components/PlayerHUD";
import { useGameContext } from "./hooks/useGameContext";
import { useSocket } from "./hooks/useSocket";

function App() {
  const { player, players, world } = useGameContext();
  const { socket, connected } = useSocket();

  return (
    <>
      {player && connected ? (
        <>
          <PlayerHUD />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
