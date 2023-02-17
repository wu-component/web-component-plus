<template>
  <aside class="sidebar">
    <!-- <SidebarCollapse /> -->
    <!-- Promo ADs here -->
    <Promo v-if="this.$themeConfig.ads"/>
    <slot name="top" />
    <SidebarLinks :depth="0" :items="items" />
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue';
import Promo from '@theme/components/Promo.vue';
// import SidebarCollapse from '@theme/components/SidebarCollapse.vue';

export default {
  name: 'Sidebar',
  components: { 
    // SidebarCollapse,
    SidebarLinks,
    Promo
  },
  props: ['items']
};
</script>

<style lang="less">
@import '../styles/palette.less';

.sidebar {

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
    position: relative;
  }

  & > .sidebar-links {
    padding-bottom: 1.5rem;

    & > li > a.sidebar-link {
      font-size: 0.875rem;
      line-height: 2;
      transition: color 0.25s ease-in-out, border-color 0.25s ease-in-out, background 0.25s ease-in-out;
    }
  }
}
</style>
