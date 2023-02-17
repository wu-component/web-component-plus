<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <RouterLink
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        active: isActive($route, item.path)
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span>{{ item.title }}</span>

      <span v-if="collapsable" class="arrow" :class="open ? 'down' : 'right'">
        <a-icon type="down" />
      </span>
    </RouterLink>

    <p
      v-else
      class="sidebar-heading"
      :class="{ open }"
      @click="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <span v-if="collapsable" class="arrow" :class="open ? 'down' : 'right'">
        <a-icon type="down" />
      </span>
    </p>

    <SidebarLinks
      v-if="open || !collapsable"
      class="sidebar-group-items"
      :items="item.children"
      :sidebar-depth="item.sidebarDepth"
      :depth="depth + 1"
    />
  </section>
</template>

<script>
import { isActive } from '../util';

export default {
  name: 'SidebarGroup',

  props: ['item', 'open', 'collapsable', 'depth'],

  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks = require('@theme/components/SidebarLinks.vue').default;
  },

  methods: { isActive }
};
</script>

<style lang="less">
@import '../styles/palette.less';

.sidebar-group {
  .sidebar-group {
    padding-left: 0.5em;
  }

  &:not(.collapsable) {
    .sidebar-heading:not(.clickable) {
      cursor: auto;
      color: inherit;
    }
  }

  // refine styles of nested sidebar groups
  &.is-sub-group {
    padding-left: 0;

    & > .sidebar-heading {
      font-size: 0.95em;
      line-height: 1.4;
      font-weight: normal;
      padding-left: 2rem;

      &:not(.clickable) {
        opacity: 0.5;
      }
    }

    & > .sidebar-group-items {
      padding-left: 1rem;

      & > li > .sidebar-link {
        font-size: 0.95em;
        border-left: none;
      }
    }
  }

  &.depth-2 {
    & > .sidebar-heading {
      border-left: none;
    }
  }
}

.sidebar-heading {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  transition: color 0.15s ease;
  cursor: pointer;
  font-size: 14px;
  margin: 0.25rem auto;
  padding: 0.35rem 2.2rem;
  width: 100%;
  box-sizing: border-box;
  border-left: 0.25rem solid transparent;
  transition: color 0.25s ease-in-out;

  &.open {
    color: inherit;
  }
  &:hover {
    color: @accentColor;
  }

  .arrow {
    position: absolute;
    right: 1.2em;
  }

  &.clickable {
    &.active {
      font-weight: 600;
      color: @accentColor;
      border-left-color: @accentColor;
    }

    &:hover {
      color: @accentColor;
    }
  }
}

.sidebar-group-items {
  transition: height 0.2s ease-out;
  font-size: 0.95em;
  overflow: hidden;

  > li {
    a {
      padding-left: 3.5rem;
    }
  }
}
</style>
