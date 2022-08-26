import { Inventory } from "@etabli/classes/items/Inventory";
import { entities } from "@etabli/resources/entities";
import { log } from "@etabli/utils/console/log";
import { Coordinates } from "@etabli/types/Coordinates";
import { v5 as uuid } from "uuid";

export class Entity {
  public key: string;
  public uuid: string;

  public name: string;
  public health: number;
  public inventory: Inventory = new Inventory();

  public attackDamage: number;

  public position: Coordinates = [0, 0, 0];

  constructor(key: string, name?: string | undefined) {
    if (!key) throw "key is required";
    if (!entities[key]) throw `${key} is not a valid entity key`;

    this.key = key;

    this.name = name || entities[key].name;
    this.health = entities[key].health;
    this.attackDamage = entities[key].attackDamage;
    this.uuid = uuid(
      `${key}:${name || entities[key].name}`,
      "630eb68f-e0fa-5ecc-887a-7c7a62614681"
    );
  }

  public attack(entity: Entity) {
    if (
      entity.inventory.armorSlots
        .filter((a) => a !== null)
        .find((armor) => armor.hasEnchant("thorns"))
    ) {
      this.health -= entity.inventory.armorSlots
        .filter((a) => a !== null)
        .reduce((acc, cur) => {
          return acc + cur.enchants["thorns"].level;
        }, 0);
      if (this.health <= 0) this.die();
    }
    entity.health -= this.attackDamage;
    if (entity.health <= 0) entity.die();
  }

  public die() {
    if (this.key === "player") {
      log(`${this.name} has died`, { date: false, type: "chat" });
    }
    this.inventory.explode();
  }
}
