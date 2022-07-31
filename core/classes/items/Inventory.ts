import { Block } from "@etabli/classes/items/Block";
import { Item } from "@etabli/classes/items/Item";

const DEFAULT_INVENTORY_SIZE = 4 * 9;

export class Inventory {
  private slots: (Item | Block)[] = Array(DEFAULT_INVENTORY_SIZE).fill(null);
  private selectedSlot: number = 0;

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

  public add(item: Item | Block, amount: number) {}
  public remove(item: Item | Block, amount: number) {}

  public getSelectedSlot(): Item | Block {
    return this.slots[this.selectedSlot];
  }
  public setSelectedSlot(slot: number) {
    this.selectedSlot = slot;
  }
  public clearSlot(slot: number) {
    this.slots[slot] = null;
  }

  public setFirstEmptySlot() {
    this.selectedSlot = this.slots.findIndex((slot) => slot === null);
  }
  public setFirstOccupiedSlot() {
    this.selectedSlot = this.slots.findIndex((slot) => slot !== null);
  }

  public getFirstOccurenceSlot(item: Item | Block): number {
    return this.slots.findIndex((slot) => slot.key === item.key);
  }
}
