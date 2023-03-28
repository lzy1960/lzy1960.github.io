import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "docs",
      icon: "linux",
      prefix: "docs/",
      children: "structure",
    },
    "intro",
  ],
});
