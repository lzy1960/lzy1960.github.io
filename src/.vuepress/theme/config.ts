// .vuepress/theme/config.ts
import { defineClientConfig } from "@vuepress/client";
import BlogHome from "./layouts/BlogHome.vue";

export default defineClientConfig({
  layouts: {
    BlogHome,
  },
});
