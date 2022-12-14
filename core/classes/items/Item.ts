import { mixed } from "@etabli/resources/items";

export class Item {
  public key: string;
  public maxAmount: number = 0;

  public enchants: { [key: string]: Enchant } = {};

  constructor(key: string) {
    if (!key) throw "key is required";
    if (!mixed[key]) throw `${key} is not a valid item key`;

    this.key = key;

    this.maxAmount = mixed[key].maxAmount;
  }

  public hasEnchant(enchant: string): boolean {
    return this.enchants[enchant] !== undefined;
  }
}

type Enchant = {
  level: number;
};
