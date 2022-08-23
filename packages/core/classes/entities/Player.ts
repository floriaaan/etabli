import { Entity } from "@etabli/classes/entities/Entity";

class Player extends Entity {
  public socketId: string | undefined;

  constructor(name: string) {
    super("player", name);
  }

  public xp: number = 0;
}

export { Player };
