import { Inventory } from "@etabli/classes/items/Inventory";

export class Entity {
  public key: string;
  public inventory: Inventory = new Inventory();
  public health: number;

  constructor(key: string) {
    this.key = key;
    // todo: import from entity.json
    this.health = key === "player" ? 20 : 10;
  }
}
