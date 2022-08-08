import { Block } from "@etabli/classes/items/Block";
import { DEFAULT_GENERATION_OPTIONS } from "@etabli/classes/world/constants";
import { compress, Compressed, decompress } from "compress-json";

class ChunkBlock extends Block {
  constructor(key: string) {
    super(key);

    delete this.maxAmount;
    delete this.enchants;
    delete this.hasEnchant;
  }
}

export class Chunk {
  public region: [number, number];

  public size: number = DEFAULT_GENERATION_OPTIONS.chunkSize;
  public height: number = DEFAULT_GENERATION_OPTIONS.worldHeight;

  // add blocks to a 3d array

  public data: ChunkBlock[][][] = [];

  constructor(i: number, j: number) {
    this.region = [i, j];

    for (let x = 0; x < this.size; x++) {
      this.data[x] = [];
      for (let y = 0; y < DEFAULT_GENERATION_OPTIONS.seaLevel; y++) {
        this.data[x][y] = [];
        for (let z = 0; z < this.size; z++) {
          this.data[x][y][z] = new ChunkBlock("dirt");
        }
      }
    }
  }

  public getBlock(x: number, y: number, z: number): ChunkBlock {
    return this.data[x][y][z];
  }

  public setBlock(x: number, y: number, z: number, block: ChunkBlock): void {
    this.data[x][y][z] = block;
  }

  public toCompressed(): Compressed {
    return compress(this.data);
  }

  public static fromCompressed(c: Compressed): Chunk {
    return decompress(c) as Chunk;
  }
}
