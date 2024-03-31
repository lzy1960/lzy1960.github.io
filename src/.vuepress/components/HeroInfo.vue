<template>
  <HopeBlogHero>
    <template #heroBg>
      <div id="hero-video-wrapper">
        <video id="hero-video" src="/background.mp4" poster="/background.webp" autoplay loop muted />
      </div>
    </template>
  </HopeBlogHero>
</template>
<script setup lang="ts">
import HopeBlogHero from "vuepress-theme-hope/modules/blog/components/BlogHero.js";
</script>

<style lang="scss" scoped>
#hero-video-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
  animation: fadeIn 1s ease-out;
  height: 100vmin;
  overflow: hidden;

  #hero-video {
    position: relative;
    left: 50%;
    display: block;
    height: 100%;
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6rem;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--bg-color));
  }
}

html[data-theme='light'] {
  #hero-video-wrapper {
    &::after {
      background: linear-gradient(to bottom,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 1));
    }
  }
}
</style>
