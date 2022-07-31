import { Inventory } from "@etabli/classes/items/Inventory";
import { v5 as uuid } from "uuid";

export class Entity {
  public key: string;
  public name: string;
  public inventory: Inventory = new Inventory();
  public health: number;

  public uuid: string;

  constructor(key: string, name: string) {
    this.uuid = uuid(`${key}:${name}`, "630eb68f-e0fa-5ecc-887a-7c7a62614681");

    this.key = key;
    this.name = name;
    // todo: import from entity.json
    this.health = key === "player" ? 20 : 10;
  }
}
