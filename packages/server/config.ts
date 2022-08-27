export const saves = {
  autosave: {
    enabled: true,
    interval: "3s",
  },
  path: "saves",
  world: "world",
  console: {
    log: {
      players: false,
    },
  },
};

export const modloader = {
  enabled: true,
  path: "mods",
  console: {
    log: {
      loading: false,
    },
  },
};

export const server = {
  enabled: true,
  port: 3000,
  webapp: { enabled: false, port: 8080 },
  console: {
    log: {
      anonymousConnections: false,
      connections: true,
      chat: true,
    },
  },
  log: {
    enabled: true,
    pathDir: "logs",
    pathFiles: {
      default: "default.log",
      connections: "connections.log",
      chat: "chat.log",
      crash: "crash.log",
    },
  },
};
