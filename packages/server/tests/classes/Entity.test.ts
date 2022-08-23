import { Entity } from "@etabli/classes/entities/Entity";
import { Item } from "@etabli/classes/items/Item";
import { entities } from "@etabli/resources/entities";

describe("Entity tests", () => {
  let entity: Entity;
  beforeEach(() => (entity = new Entity("zombie")));

  it("should have Zombie as a name", () => {
    expect(entity.name).toBe("Zombie");
  });

  it("should have a health of 20", () => {
    expect(entity.health).toBe(20);
  });

  it("should have a key of 'zombie'", () => {
    expect(entity.key).toBe("zombie");
  });

  it("should have an inventory", () => {
    expect(entity.inventory).toBeDefined();
  });

  it("should have an empty inventory by default", () => {
    expect(entity.inventory.isEmpty()).toBe(true);
  });

  it("can add an item to the inventory", () => {
    entity.inventory.add("apple", 1);
    entity.inventory.add("dirt", 64);
    expect(entity.inventory.isEmpty()).toBe(false);
  });

  it("should have a slot full of dirt", () => {
    entity.inventory.add("dirt", 64);
    expect(entity.inventory.isSlotFull()).toBe(true);
  });

  it("can attack other entities", () => {
    const other = new Entity("skeleton");
    entity.attack(other);
    expect(other.health).toBe(
      entities["skeleton"].health - entity.attackDamage
    );
  });

  it("should be hurt when attack other entities with thorn enchant", () => {
    const other = new Entity("player", "Bob");
    other.inventory.armorSlots[0] = new Item("diamond_helmet");
    other.inventory.armorSlots[0].enchants["thorns"] = { level: 1 };

    entity.attack(other);

    expect(entity.health).toBe(19);
  });

  it("should throw an error if entity key is not defined", () => {
    expect(() => {
      // @ts-expect-error
      new Entity();
    }).toThrow("key is required");
  });

  it("should throw an error if entity key is not valid", () => {
    expect(() => {
      new Entity("not_a_valid_key");
    }).toThrow("is not a valid entity key");
  });
});
