import { Entity } from "@etabli/classes/entities/Entity";
import { entities } from "@etabli/resources/entities";
import { Coordinates } from "@etabli/types/Coordinates";

class Player extends Entity {
  public socketId: string | undefined;


  public spawnPoint: Coordinates = [0, 0, 0];

  public xp: number = 0;

  constructor(name: string) {
    super("player", name);
  }

  public respawn() {
    this.health = entities.player.health;
    this.position = this.spawnPoint;
  }
}

export { Player };
