import { Entity } from "@etabli/classes/entities/Entity";

class Player extends Entity {
  constructor(name: string) {
    super();
    this.name = name;
  }

  public name: string;
  // public inventory: Inventory = new Inventory();
}

export { Player };
