<template lang="pug">
    .container.navMenu
        label(v-for="navMenu in navMenus")
            el-menu-item(v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'" :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name")
                i(:class="navMenu.entity.icon")
                span(slot="title") {{navMenu.entity.alias}}
            el-submenu(v-if="navMenu.childs&&navMenu.entity&&navMenu.entity.state==='ENABLE'" :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name")
                template(slot="title")
                    i(:class="navMenu.entity.icon")
                    span {{navMenu.entity.alias}}
                SlideTree(:navMenus="navMenu.childs")
</template>

<script lang="ts">
export default {
  name: 'SlideTree',
  props: {
    navMenus: {
      type:Array,
      default: () => []
    }
  },
  setup () {

  }
}
</script>

<style lang="stylus" scoped>
    .container
        height 100%
        width 100%
</style>
