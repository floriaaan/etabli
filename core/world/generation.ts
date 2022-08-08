import { DEFAULT_GENERATION_OPTIONS } from "@etabli/classes/world/constants";
import { Chunk } from "@etabli/classes/world/Chunk";
import { World } from "@etabli/classes/world/World";

export const generateWorld = (seed?: string | undefined): World => {
  const world = new World();
  const { chunkSize, worldSize } = DEFAULT_GENERATION_OPTIONS;
  const worldSizeInChunks = Math.ceil(worldSize / chunkSize);

  for (let i = 0; i < worldSizeInChunks; i++) {
    world.chunks[i] = [];
    for (let j = 0; j < worldSizeInChunks; j++) {
      world.chunks[i][j] = new Chunk(i, j);
    }
  }

  return world;
};
