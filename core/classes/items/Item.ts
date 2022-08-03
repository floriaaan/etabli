export class Item {
  public key: string;
  public maxAmount: number = 0;

  constructor(key: string, maxAmount: number = 0) {
    this.key = key;
    // todo: load from items.json
    this.maxAmount = maxAmount;
  }
}
