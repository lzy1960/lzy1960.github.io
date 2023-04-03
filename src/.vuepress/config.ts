import { defineUserConfig } from "vuepress";
import { path } from "@vuepress/utils";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  head: [
    ['script', { src: '/scripts/video.js' }],
    ['script', {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5722919995882918',
      crossorigin: 'anonymous',
      async: true,
    }],
  ],
  locales: {
    // "/": {
    //   lang: "en-US",
    //   title: "Blog Demo",
    //   description: "A blog demo for vuepress-theme-hope",
    // },
    "/": {
      lang: "zh-CN",
      title: "vuepress2-blog",
      description: "vuepress2-blog",
    },
  },

  // theme,
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

});
