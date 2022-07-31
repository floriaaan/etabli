import { Entity } from "@etabli/classes/entities/Entity";

class Player extends Entity {
  constructor(name: string) {
    super("player");
    this.name = name;
  }

  public name: string;
  public xp: number = 0;
}

export { Player };
