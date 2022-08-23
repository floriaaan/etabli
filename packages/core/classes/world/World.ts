import { Chunk } from "@etabli/classes/world/Chunk";
// import { compress, Compressed, decompress } from "compress-json";
import { unpack, pack } from "msgpackr";

export class World {
  public chunks: Chunk[][] = [];

  // public toCompressed(): Compressed {
  //   return compress(this);
  // }

  // public static fromCompressed(c: Compressed): World {
  //   return decompress(c) as World;
  // }

  public toCompressed(): Buffer {
    return pack(this);
  }

  public static fromCompressed(c: Buffer): World {
    return unpack(c) as World;
  }
}
