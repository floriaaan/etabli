import { Block } from "core/classes/Block";
import { Item } from "core/classes/Item";

export class Inventory {
  public items: Item | Block[] = [];

  constructor() {}
}
