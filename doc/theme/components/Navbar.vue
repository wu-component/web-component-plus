<template>
  <header class="navbar">
    <a-row>
      <NavButton />
      <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="5" :xxl="4">
        <RouterLink :to="$localePath" :class="{'no-logo': !$site.themeConfig.logo ? true : false,'home-link': true}">
          <img v-if="$site.themeConfig.logo" class="logo" :src="$withBase($site.themeConfig.logo)" :alt="$siteTitle" />
          <span v-if="$siteTitle" ref="siteName" class="site-name">{{ $siteTitle }}</span>
        </RouterLink>
        <SearchBox
          v-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"
          class="mobile-search"
        />
      </a-col>
      <a-col :xs="0" :sm="0" :md="18" :lg="18" :xl="19" :xxl="20" class="nav-space-between">
        <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
        <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
        <NavLinks class="can-hide" />
      </a-col>
    </a-row>

    <a-drawer
      placement="left"
      :closable="false"
      @close="isOpenDrawer"
      :visible="sidebar_visible"
      wrapClassName="sidebarWrap"
      v-if="shouldShowSidebar"
    >
      <div slot="handle">
        <div :class="{ 'drawer-open': sidebar_open, 'drawer-handle': true }" @click="isOpenDrawer">
          <i class="drawer-handle-icon"></i>
        </div>
      </div>
      <Sidebar :items="sidebarItems" class="mobile-sidebar"></Sidebar>
    </a-drawer>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import NavButton from '@theme/components/NavButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'

export default {
  name: 'Navbar',

  components: {
    NavButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox,
    Sidebar
  },

  data() {
    return {
      sidebar_visible: false,
      sidebar_open: false,
    }
  },
  created() {
    this.$store.state.global.navStyle = 'horizontal'
  },
  methods: {
    isOpenDrawer() {
      this.sidebar_visible = !this.sidebar_visible
      this.sidebar_open = !this.sidebar_open
      document.getElementById('app').classList.toggle('toggle-sidebar');
    },
  },
  computed: {
    algolia() {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems() {
      return resolveSidebarItems(this.$page, this.$page.regularPath, this.$site, this.$localePath)
    },
  }
}
</script>

<style lang="less">
@import '../styles/palette.less';

.toggle-sidebar{
  transform: translateX(@sidebarWidth * 0.82) ;
}
.navbar {
  line-height: @navbarHeight;

  a,
  span,
  img {
    display: inline-block;
  }

  .home-link {
    display: flex;
    align-items: center;
    line-height: @navbarHeight;

    &.no-logo{
      justify-content: center;
    }
  }

  .logo {
    height: @navbarLogoHeight;
    min-width: @navbarLogoHeight;
    margin: 0 0.8rem 0 2.4rem;
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 500;
    color: @textColor;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    background-color: white;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: 1.5rem;
    top: 0;
    display: flex;

    .search-box {
      flex: 0 0 auto;
      vertical-align: top;
    }
  }

  .mobile-search {
    display: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .nav-space-between{
    display: flex;
    justify-content: space-between;
  }
}
.sidebarWrap {
  .ant-drawer-content-wrapper {
    width: @sidebarWidth * 0.82 !important;
  }
  .ant-drawer-body {
    padding-left: 0;
    padding-right: 0;
  }
  .drawer-handle {
    display: none;
    position: absolute;
    width: 41px;
    height: 40px;
    cursor: pointer;
    line-height: 40px;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    background: #fff;
    top: 5rem;
    right: -40px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    border-radius: 0 4px 4px 0;

    &.drawer-open {
      .drawer-handle-icon {
        background: transparent;

        &:before {
          transform: translateY(5px) rotate(45deg);
        }
        &:after {
          transform: translateY(-5px) rotate(-45deg);
        }
      }
    }

    .drawer-handle-icon {
      width: 14px;
      height: 2px;
      background: #333;
      position: relative;
      transition: background 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);

      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        background: #333;
        width: 100%;
        height: 2px;
        transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
      &:before {
        top: -5px;
      }
      &:after {
        top: 5px;
      }
    }
  }
  .mobile-sidebar {
    display: none;
  }
}
@media (max-width: @MQMobile) {
  .navbar {
    .home-link {
      justify-content: center;
    }

    .logo {
      margin-left: 0;
    }
  }
}

@media (max-width: @MQMobile) {
  .navbar {
    position: relative;
    
    .home-link {
      justify-content: center;
    }

    .can-hide {
      display: none;
    }

    .links {
      padding-left: 1.5rem;
    }

    .logo {
      margin-left: 0;
      height: 2rem;
      min-width: 2rem;
    }

    .site-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .mobile-search {
      display: block;
    }
  }
  .sidebarWrap {
    .drawer-handle {
      display: flex;
    }
    .mobile-sidebar {
      display: block;
      top: 3rem;
      border: none;
      font-size: 14px;
    }
  }
}
</style>
