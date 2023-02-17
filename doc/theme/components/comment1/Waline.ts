import Vue from "vue";
import { Route } from "vue-router";

import "./waline.styl";

let timeout: NodeJS.Timeout | null = null;

// const options = COMMENT_OPTIONS as WalineOptions;
const options = {
  provider: "waline",
  // 插件选项
  serverURL: "https://whl47bsd.api.lncldglobal.com",
  locale: {},
  comment: true,
  pageview: true,
  delay: 0
}
const locales = {};

export default Vue.extend({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Waline",

  data: () => ({
    waline: null,
  }),

  computed: {
    enable(): boolean {
      return Boolean(options.serverURL);
    },

    enableComment(): boolean {
      if (!this.enable) return false;

      const globalEnable = options.comment !== false;
      const pageEnable = this.$page.frontmatter.comment;

      return (globalEnable && pageEnable !== false) || pageEnable === true;
    },

    /** Whether to display view number */
    enablePageview(): boolean {
      if (!this.enable) return false;

      const globalEnable = options.pageview !== false;
      const pageEnable = this.$page.frontmatter.pageview;

      return (globalEnable && pageEnable !== false) || pageEnable === true;
    },
  },

  watch: {
    $route(to: Route, from: Route): void {
      // Refresh comment when navigating to a new page
      if (to.path !== from.path) {
        Vue.nextTick(() => {
          if (timeout) clearTimeout(timeout);

          timeout = setTimeout(() => {
            this.waline?.update({
              path: this.$withBase(this.$route.path),
              pageview: this.enablePageview,
            });
          }, options.delay);
        });
      }
    },
  },

  mounted(): void {
    if (this.enable)
      timeout = setTimeout(() => {
        void import(
          /* webpackChunkName: "waline" */ "@waline/client/dist/waline"
        ).then(({ init }) => {
          this.waline = init({
            el: "#waline-comment",
            lang: this.$lang === "zh-CN" ? "zh-CN" : "en-US",
            locale: {
              ...locales[this.$localePath],
              ...(options?.locale || {}),
            },
            emoji: [
              "//unpkg.com/@waline/emojis@1.0.1/weibo",
              "//unpkg.com/@waline/emojis@1.0.1/bilibili",
            ],
            ...options,
            pageview: this.enablePageview,
            path: this.$withBase(this.$route.path),
          });
        });
      }, options.delay);
  },

  beforeDestroy(): void {
    if (timeout) clearTimeout(timeout);
    this.waline?.destroy();
  },

  render(h) {
    return h(
      "div",
      {
        class: "waline-wrapper",
        style: { display: this.enableComment ? "block" : "none" },
      },
      [h("div", { attrs: { id: "waline-comment" } })]
    );
  },
});
