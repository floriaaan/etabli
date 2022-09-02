import { Fragment } from "react";
import { useGameContext } from "../../hooks/useGameContext";

type InventorySlot = { key: string; maxAmount: number; amount: number };

export const InventoryGUI = () => {
  const { player } = useGameContext();
  const {
    armorSlots,
    slots,
  }: {
    armorSlots: [InventorySlot, InventorySlot, InventorySlot, InventorySlot];
    slots: InventorySlot[];
  } = player?.inventory;
  return (
    <div className="absolute h-screen w-screen bg-neutral-800 bg-opacity-40 top-0 left-0 flex flex-col items-center justify-center">
      <div className="grid grid-cols-9 gap-2 p-3 bg-neutral-800 text-white rounded-md max-w-fit w-full">
        <>
          <ArmorSlots slots={armorSlots} />
          <div className="col-span-3 row-span-4 bg-black flex items-center justify-center">
            player
          </div>
          <div className="row-start-4 col-start-5">
            <Slot key={""} maxAmount={0} amount={undefined} />
          </div>
          <div className="col-start-6 col-span-4 row-span-4 ">
            <p className="select-none">Crafting</p>
            <div className="inline-flex items-center w-full justify-between">
              <div className="grid grid-cols-2 gap-1 w-fit">
                <Slot crafting/>
                <Slot crafting/>
                <Slot crafting/>
                <Slot crafting/>
              </div>
              <span>-&gt;</span>
              <Slot craftResult />
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

const ArmorSlots = ({
  slots,
}: {
  slots: [InventorySlot, InventorySlot, InventorySlot, InventorySlot];
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center row-span-4">
      {slots.map((slot) => (
        <Slot {...slot} />
      ))}
    </div>
  );
};

const Slot = ({
  amount,
  maxAmount,
  key,

  crafting = false,
  craftResult = false,
}: {
  amount?: InventorySlot["amount"];
  maxAmount?: InventorySlot["maxAmount"];
  key?: InventorySlot["key"];

  crafting?: boolean;
  craftResult?: boolean;
}) => {
  return (
    <div className="w-8 h-8 relative select-none shrink-0 flex items-center justify-center text-xs p-1 bg-neutral-700 border-neutral-600">
      <div className="absolute right-0 bottom-0">{amount}</div>
    </div>
  );
};
