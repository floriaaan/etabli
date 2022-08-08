import { Chunk } from "@etabli/classes/world/Chunk";
import { compress, Compressed, decompress } from "compress-json";

export class World {
  public chunks: Chunk[][] = [];

  public toCompressed(): Compressed {
    return compress(this);
  }

  public static fromCompressed(c: Compressed): World {
    return decompress(c) as World;
  }
}
