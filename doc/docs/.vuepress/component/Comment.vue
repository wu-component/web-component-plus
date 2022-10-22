<template>
  <div id="#waline-container"></div>
</template>

<script>

import '@waline/client/dist/waline.css';

export default {
  name: "Comment",
  data() {
    return {
      waline: null,
    }
  },
  created() {
    console.log("mounted11");
  },
  mounted() {
    console.log("mounted");
    this.$nextTick(() => {
      this.waline = Waline.init({
        el: this.$el,
        provider: "waline",
        // 插件选项
        serverURL: "https://wu-component-issues.vercel.app",
        emoji: [
          "//unpkg.com/@waline/emojis@1.0.1/weibo",
          "//unpkg.com/@waline/emojis@1.0.1/bilibili",
        ],
        dark: "body.theme-dark",
        lang: this.$lang === "en-US" ? "zh-CN" : "zh-CN",
        comment: true,
        pageview: true, // 浏览量统计
      });
    })
  },
  beforeDestroy() {
    this.waline?.destroy();
  }
}
</script>

<style scoped>

</style>
