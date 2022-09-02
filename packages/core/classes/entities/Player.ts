import { Entity } from "@etabli/classes/entities/Entity";
import { getPlayerSave } from "@etabli/core/saver";
import { entities } from "@etabli/resources/entities";
import { Coordinates } from "@etabli/types/Coordinates";
import { pack, unpack } from "msgpackr";

class Player extends Entity {
  public socketId: string | undefined;

  public spawnPoint: Coordinates = [0, 0, 0];

  public xp: number = 0;

  constructor(name: string) {
    if (!name) throw new Error("Player name is required");

    try {
      // check if saves exist for this player
      getPlayerSave(name).then((save) => {
        if (save) {
          this.fromSave(save);
          return;
        }
      });
    } catch (e) {
      console.error(e);
    }
    super("player", name);
  }

  public respawn() {
    this.health = entities.player.health;
    this.position = this.spawnPoint;
  }

  public toCompressed(): Buffer {
    return pack(this);
  }

  public static fromCompressed(data: Buffer): Player {
    return unpack(data) as Player;
  }

  private fromSave(save: { player: Player }) {
    const { player } = save;

    this.name = player.name;
    this.health = player.health;
    this.position = player.position;
    this.spawnPoint = player.spawnPoint;
    this.xp = player.xp;

    this.key = player.key;
    this.uuid = player.uuid;
    this.attackDamage = player.attackDamage;
    this.inventory = player.inventory;
  }
}

export { Player };
