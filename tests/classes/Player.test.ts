import { Player } from "@etabli/classes/entities/Player";
import { Item } from "@etabli/classes/items/Item";

describe("Player tests", () => {
  let player: Player;
  beforeEach(() => (player = new Player("Steve")));

  it("should have Steve as a name", () => {
    expect(player.name).toBe("Steve");
  });

  it("should have a health of 20", () => {
    expect(player.health).toBe(20);
  });

  it("should have a key of 'player'", () => {
    expect(player.key).toBe("player");
  });

  it("should have an inventory", () => {
    expect(player.inventory).toBeDefined();
  });

  it("should have an empty inventory by default", () => {
    expect(player.inventory.isEmpty()).toBe(true);
  });

  it("can add an item to the inventory", () => {
    player.inventory.add("apple", 1);
    player.inventory.add("dirt", 64);
    expect(player.inventory.isEmpty()).toBe(false);
  })

  it("should have a slot full of dirt", () => {
    player.inventory.add("dirt", 64);
    console.log(player.inventory.slots);
    expect(player.inventory.isSlotFull()).toBe(true);
  })

  it("can attack other entities", () => {
    const other = new Player("Bob");
    player.attack(other);
    expect(other.health).toBe(16);
  });

  it("should be hurt when attack other entities with thorn enchant", () => {
    const other = new Player("Bob");
    other.inventory.armorSlots[0] = new Item("diamond_helmet");
    other.inventory.armorSlots[0].enchants["thorns"] = { level: 1 };

    player.attack(other);

    expect(player.health).toBe(19);
  });

});
