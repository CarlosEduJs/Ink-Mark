type Shortcut = {
  name: string;
  shortcuts: string[];
};

type ShortcutCategory = {
  for: string;
  shortcuts: Shortcut[];
};

export const shortcuts: ShortcutCategory[] = [
  {
    for: "Dialogs",
    shortcuts: [
      {
        name: "Open/Close Dialog Help",
        shortcuts: ["Ctrl/Command", "ALT", "H"],
      },
      {
        name: "Open/Close Dialog Command App",
        shortcuts: ["Ctrl/Command", "K"],
      },
      {
        name: "Open/Close Dialog New Custom Section",
        shortcuts: ["Ctrl/Command", "ALT", "N"],
      },
      {
        name: "Open/Close Dialog Edit Name Project",
        shortcuts: ["Ctrl/Command", "E"],
      },
      {
        name: "Open/Close Sheet Variables",
        shortcuts: ["Ctrl/Command", "⇧", "V"],
      },
      {
        name: "Open/Close Reset Project",
        shortcuts: ["Ctrl/Command", "⇧", "R"],
      },
    ],
  },
  {
    for: "Primary",
    shortcuts: [
      {
        name: "Open/Close Drawer With Sections",
        shortcuts: ["Ctrl/Command", "⇧", "D"],
      },
      {
        name: "Open/Close Sidebar",
      shortcuts: ["Ctrl/Command",  "⇧", "B"],
      },
      {
        name: "Copy full code",
        shortcuts: ["Ctrl/Command", "⇧", "F"],
      },
      {
        name: "Change Current Section",
        shortcuts: ["⇧", "Alt"],
      },
      {
        name: "Change Show Shortcuts",
        shortcuts: ["Ctrl/Command", "Alt", "S"],
      },
    ],
  },
  {
    for: "Visualizer",
    shortcuts: [
      {
        name: "Preview",
        shortcuts: ["Ctrl/Command", "Alt", "P"],
      },
      {
        name: "Editor",
        shortcuts: ["Ctrl/Command", "Alt", "R"],
      },
      {
        name: "Split View",
        shortcuts: ["Ctrl/Command", "Alt", "S"],
      },
    ],
  },
];
