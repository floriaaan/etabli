export type Keybind = {
    action: string;
    description: string;
}

export const defaultKeybinds: {
    [code: string]: Keybind;
} = {
    "ControlLeft": {
        action: "sneak",
        description: "Sneak",
    },
    "Enter": {
        action: "open_chat",
        description: "Open chat",
    },

    "KeyE": {
        action: "open_inventory",
        description: "Open inventory",
    }
}