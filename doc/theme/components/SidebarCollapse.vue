<template>
  <a-button @click="collapseSidebar" shape="circle" size="small" class="collapse-sidebar-btn">
    <a-icon v-if="isCollapseSidebar" type="right" />
    <a-icon v-else type="left" />
  </a-button>
</template>

<script>
export default {
  name: 'SidebarCollapse',

  // props: [
  //   'items',
  //   'depth', // depth of current sidebar links
  //   'sidebarDepth' // depth of headers to be extracted
  // ],

  data() {
    return {
      // openGroupIndex: 0
    };
  },

  methods: {}
};
</script>

<style lang="less">
@import '../styles/palette.less';

.collapse-sidebar-btn {
  position: absolute;
  top: @navbarHeight + 8rem;
  right: -0.9rem;
  z-index: 999;

  // .anticon {
  //     margin-top: -10px;
  //   }

}
// .collapse-sidebar {
//   right: -10.5rem;
// }
</style>
