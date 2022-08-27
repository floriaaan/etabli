import { useGameContext } from "../hooks/useGameContext";

export const PlayerHUD = () => {
  const { player } = useGameContext();
  return (
    <>
      <div className="fixed top-0 left-0 m-1 rounded-lg p-2 bg-black bg-opacity-25 inline-flex gap-2">
        <img
          src="./assets/Head.png"
          className="h-16 w-16 aspect-square shrink-0 object-cover"
        ></img>
        <div className="flex flex-col">
          <div className="text-white text-sm font-semibold">{player.name}</div>
          <div className="inline-flex items-center mt-1 gap-x-0.5">
            {Array.from(Array(player.health).keys()).map(
              (h: number) =>
                h % 2 === 0 && (
                  <img
                    key={"heart" + h}
                    src="./assets/Heart.png"
                    className="w-4 h-4 aspect-square shrink-0 object-cover"
                  ></img>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
