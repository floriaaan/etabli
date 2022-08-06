const DEFAULT_MAX_AMOUNT = 64;

const items = {
  apple: {
    maxAmount: DEFAULT_MAX_AMOUNT,
  },
  diamond_helmet: {
    maxAmount: 1,
  },
};

const blocks = {
  dirt: {
    maxAmount: DEFAULT_MAX_AMOUNT,
  },
};

export default { items, blocks };
export const mixed = { ...items, ...blocks };
