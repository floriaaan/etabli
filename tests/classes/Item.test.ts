import { Item } from "@etabli/classes/items/Item";

describe("Item tests", () => {
  let item: Item;

  it("should have a default max amount", () => {
    item = new Item("apple");
    expect(item.maxAmount).toBe(64);
  });

  it("should have an enchant", () => {
    item = new Item("apple");
    item.enchants["thorns"] = { level: 1 };
    expect(item.hasEnchant("thorns")).toBe(true);
  });

  it("should throw an error if item key is not defined", () => {
    expect(() => {
      // @ts-expect-error
      new Item();
    }).toThrow("key is required");
  });

  it("should throw an error if item key is not valid", () => {
    expect(() => {
      new Item("not_a_valid_key");
    }).toThrow("is not a valid item key");
  });
});
