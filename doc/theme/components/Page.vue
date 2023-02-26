<template>
  <main  :class="['page', { 'has-page-anchor': hasPageAnchor }]">
    <slot name="top" />

    <Content class="theme-antdocs-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />
    <PageAnchor v-if="!pageAnchorConfig.isDisabled" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';
import PageAnchor from '@theme/components/PageAnchor.vue';

// import { getLocalStorage } from '../util/index';

export default {
  components: { PageEdit, PageNav, PageAnchor },
  props: ['sidebarItems'],
  computed: {
    hasPageAnchor() {
      if (this.pageAnchorConfig.isDisabled){
        this.$store.state.global.isCollapsePageAnchor = true;
        return false;
      }
      if (!this.$page.headers) {
        this.$store.state.global.isCollapsePageAnchor = true;
        return false;
      }
      this.$store.state.global.isCollapsePageAnchor = false;
      return true;
      // if (this.$page.headers) {
      //   return this.$store.state.global.isCollapsePageAnchor ||
      //     getLocalStorage('isCollapsePageAnchor', 'boolen')
      //     ? false
      //     : true;
      // } else {
      //   return false;
      // }
    },
    pageAnchorConfig() {
      return (
        this.$page.frontmatter.pageAnchor ||
        this.$themeConfig.pageAnchor || { anchorDepth: 2, isDisabled: false }
      );
    }
  }
};
</script>

<style lang="less">
@import '../styles/palette.less';
@import '../styles/wrapper.less';
.page {
  padding-bottom: 2rem;
  display: block;
  // transition: padding-right 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

  .ant-btn {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    box-shadow: -1px 0 5px 0 #0000001a;
  }
}
.has-page-anchor {
  padding-right: 12.5rem;

  .ant-btn {
    border-bottom-right-radius: 50%;
    border-top-right-radius: 50%;
    box-shadow: unset;
  }
}

@media (max-width: @MQMobile) {
  .page {
    margin-top: -@navbarHeight;
    padding-right: 0;
  }
}
</style>
