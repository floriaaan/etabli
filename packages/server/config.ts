export const saves = {
  autosave: {
    enabled: true,
    interval: "3s",
  },
  path: "saves",
  world: "world",
};

export const modloader = {
  enabled: true,
  path: "mods",
};

export const server = {
  enabled: true,
  port: 3000,
  // todo: fix in vite.config.ts
  webapp: { enabled: true, port: 8080 },
  console: {
    log: {
      connections: true,
      chat: true,
    },
  },
};
