import { Inventory } from "@etabli/classes/items/Inventory";
import { Item } from "@etabli/classes/items/Item";

describe("Inventory tests", () => {
  let i: Inventory;
  beforeEach(() => (i = new Inventory()));

  it("should have an inventory", () => {
    expect(i).toBeDefined();
  });

  it("should have an empty inventory by default", () => {
    expect(i.isEmpty()).toBe(true);
  });
  it("should have an empty slot by default", () => {
    expect(i.isSlotEmpty()).toBe(true);
  });

  it("should have items in inventory", () => {
    i.add("apple", 1);
    expect(i.isEmpty()).toBe(false);
  });
});
