export const saves = {
  autosave: {
    enabled: false,
    interval: "3s",
  },
  path: "saves",
  world: "world",
};

export const modloader = {
  enabled: false,
  path: "mods",
};

export const server = {
  enabled: true,
  port: 3000,
  webapp: { enabled: true, port: 8080 },
  console: {
    log: {
      connections: true,
      chat: true,
    },
  },
};
