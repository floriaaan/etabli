import { Block } from "@etabli/classes/items/Block";
import { Item } from "@etabli/classes/items/Item";

import items from "@etabli/resources/items";

const DEFAULT_INVENTORY_SIZE = 4 * 9;
const DEFAULT_ARMOR_INVENTORY_SIZE = 4;

type InventorySlot = (Item | Block) & {
  amount: number;
};

type ArmorSlot = Item;

export class Inventory {
  public slots: InventorySlot[] = Array(DEFAULT_INVENTORY_SIZE).fill(null);
  public armorSlots: ArmorSlot[] = Array(DEFAULT_ARMOR_INVENTORY_SIZE).fill(
    null
  );
  public selectedSlot: number = 0;

  constructor() {}

  public isSlotEmpty(): boolean {
    return this.slots[this.selectedSlot] === null;
  }
  public isSlotFull(): boolean {
    return (
      this.slots[this.selectedSlot].amount ===
      this.slots[this.selectedSlot].maxAmount
    );
  }

  public isEmpty(): boolean {
    return this.slots.every((slot) => slot === null);
  }

  public isFull(): boolean {
    return this.slots.every((slot) => slot !== null);
  }

  public isNotEmpty(): boolean {
    return this.slots.some((slot) => slot !== null);
  }

  public add(item: Item["key"], amount: number) {
    const slot = this.getFirstOccurenceSlot(item);
    if (slot === -1) {
      const isBlock = items.blocks[item] !== undefined;

      // TODO: fix
      // @ts-ignore
      this.slots[this.selectedSlot] = {
        ...(isBlock ? new Block(item) : new Item(item)),
        amount,
      };
    } else {
      this.slots[slot].amount += amount;
    }
  }
  public remove(item: Item | Block, amount: number) {}

  public clearSlot(slot: number) {
    this.slots[slot] = null;
  }

  public setFirstEmptySlot() {
    this.selectedSlot = this.slots.findIndex((slot) => slot === null);
  }
  public setFirstOccupiedSlot() {
    this.selectedSlot = this.slots.findIndex((slot) => slot !== null);
  }

  public getFirstOccurenceSlot(item: Item["key"]): number {
    return this.slots.findIndex((slot) => slot?.key === item);
  }

  // TODO: gamerule keepInventory ?
  public explode() {
    // drop items

    // remove all items
    this.armorSlots = this.armorSlots.map((i) =>
      i.hasEnchant("soulbound") ? i : null
    );
    this.slots = this.slots.map((i) => (i.hasEnchant("soulbound") ? i : null));
  }
}
