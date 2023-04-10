import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "docs",
      icon: "note",
      prefix: "docs/",
      children: [
        {
          text: "wsl2",
          icon: "linux",
          prefix: "wsl2/",
          children: 'structure'
        },
        {
          text: "vps",
          icon: "fly",
          prefix: "vps/",
          children: 'structure'
        },
      ]
    },
    "intro",
  ],
});
