import { Inventory } from "core/classes/Inventory";

class Player {
  public name: string;
  public inventory: Inventory = new Inventory();

  constructor(name: string) {
    this.name = name;
  }
}

export { Player };
