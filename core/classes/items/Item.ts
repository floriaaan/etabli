export class Item {
  public key: string;
  public amount: number = 0;
  public maxAmount: number = 0;

  constructor(key: string, amount: number = 0, maxAmount: number = 0) {
    this.key = key;
    this.amount = amount;
    this.maxAmount = maxAmount;
    // todo: load from items.json
  }

  // public getAmount(): number {
  //   return this.amount;
  // }
  // public getMaxAmount(): number {
  //   return this.maxAmount || 64;
  // }
}
