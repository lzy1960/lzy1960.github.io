// .vuepress/theme/index.ts
import { path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import type { ThemeOptions } from "vuepress-theme-hope";

export default (options) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  layouts: {
    "@theme-hope/components/PageFooter": path.resolve(
      __dirname,
      "./layouts/BlogHome.vue"
    ),
  },
});
