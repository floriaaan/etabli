export type Entity = {
  key: string;
  name: string;
  health: number;
  attackDamage: number;
};

export const entities = {
  player: {
    key: "player",
    name: "Steve",
    health: 20,
    attackDamage: 4,
  },
  zombie: {
    key: "zombie",
    name: "Zombie",
    health: 20,
    attackDamage: 3,
  },
  skeleton: {
    key: "skeleton",
    name: "Skeleton",
    health: 20,
    attackDamage:2,
  },
  creeper: {
    key: "creeper",
    name: "Creeper",
    health: 20,
    attackDamage:22,
  },
} as { [key: string]: Entity };
