import { Player } from "@etabli/classes/entities/Player";
import { Item } from "@etabli/classes/items/Item";

describe("Test person.ts", () => {
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
  })

  it("should have an inventory", () => {
    expect(player.inventory).toBeDefined();
  })

  it("should have an empty inventory", () => {
    expect(player.inventory.isEmpty()).toBe(true);
  })

  it("should have items in inventory", () => {
    player.inventory.add(new Item("apple", 1), 1);
    expect(player.inventory.isEmpty()).toBe(false);
  })

});
