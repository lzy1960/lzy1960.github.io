import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { viteBundler } from '@vuepress/bundler-vite';
import path from "path";

export default defineUserConfig({
  base: "/",

  locales: {
    // "/": {
    //   lang: "en-US",
    //   title: "Blog Demo",
    //   description: "A blog demo for vuepress-theme-hope",
    // },
    "/": {
      lang: "zh-CN",
      title: "Storm Lee的博客",
      description: "Storm Lee的博客，喜欢捣鼓新东西，WSL2 前端开发环境使用者",
    },
  },

  // theme,
  theme,

  // Enable it with pwa
  shouldPrefetch: true,

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HeroInfo.vue
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/HeroInfo.vue",
    ),
  },
});
