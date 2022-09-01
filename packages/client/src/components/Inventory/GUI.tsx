import { Fragment } from "react";
import { useGameContext } from "../../hooks/useGameContext";

export const InventoryGUI = () => {
  const { player } = useGameContext();
  const {
    armorSlots,
    slots,
  }: { armorSlots: [any, any, any, any]; slots: any[] } = player?.inventory;
  return (
    <div className="absolute h-screen w-screen bg-neutral-800 bg-opacity-40 top-0 left-0 flex flex-col items-center justify-center">
      <div className="grid grid-cols-9 gap-2 p-3 bg-neutral-800 text-white rounded-md max-w-fit w-full">
        <>
          <ArmorSlots slots={armorSlots} />
          <div className="col-span-3 row-span-4 bg-black flex items-center justify-center">
            player
          </div>
          <div className="row-start-4 col-start-5">
            <Slot />
          </div>
          <div className="col-start-6 col-span-4 row-span-4 ">
            <p className="">Crafting</p>
            <div className="inline-flex items-center w-full justify-between">
              <div className="grid grid-cols-2 gap-1 w-fit">
                <Slot />
                <Slot />
                <Slot />
                <Slot />
              </div>
              <span>-&gt;</span>
              <Slot />
            </div>
          </div>
        </>
        <hr className="col-span-9 my-0.5 border-neutral-700" />
        <>
          {slots.map((slot, index) => (
            <Fragment key={index}>
              {Math.floor(index / 9) === 3 && index % 9 === 0 && (
                <hr className="col-span-9 my-0.5 border-neutral-700" />
              )}
              <Slot {...slot} />
            </Fragment>
          ))}
        </>
      </div>
    </div>
  );
};

const ArmorSlots = ({ slots }: { slots: [any, any, any, any] }) => {
  return (
    <div className="flex flex-col gap-2 justify-center row-span-4">
      {slots.map((slot, index) => (
        <Slot key={index} {...slot} />
      ))}
    </div>
  );
};

const Slot = (props: any) => {
  return (
    <div className="w-8 h-8 shrink-0 flex items-center justify-center p-1 bg-neutral-300 border-neutral-400">
      item
    </div>
  );
};
