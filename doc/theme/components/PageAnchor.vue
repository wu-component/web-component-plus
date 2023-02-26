<template>
  <div
    :class="['page-anchor', { 'collapse-page-anchor': isCollapsePageAnchor }]"
    v-if="hasHeaders"
  >

    <a-space direction="vertical" size="large" style="width:100%;">
      <!-- <a-button @click="collapsePageAnchor" shape="circle">
        <a-icon v-if="isCollapsePageAnchor" type="left" />
        <a-icon v-else type="right" />
      </a-button> -->

      <a-anchor class="page-anchor-offset">
        <template v-for="(item, index) in filterHeadersByLevel">
          <a-anchor-link
            v-if="item['items'].length !== 0"
            :href="'#' + item.slug"
            :title="item.title"
            :key="index"
          >
            <template v-for="(subItem, index) in item['items']">
              <a-anchor-link
                v-if="subItem.level === 3"
                :href="'#' + subItem.slug"
                :title="subItem.title"
                :key="index"
              />
            </template>
          </a-anchor-link>

          <a-anchor-link
            v-else
            :href="'#' + item.slug"
            :title="item.title"
            :key="index"
          />
        </template>
      </a-anchor>
    </a-space>
  </div>
</template>

<script>
// import { getLocalStorage } from '../util/index';
export default {
  data() {
    return {
      headersList: [],
      // isCollapsePageAnchor: false
    };
  },
  methods: {
    // collapsePageAnchor() {
    //   this.isCollapsePageAnchor = !this.isCollapsePageAnchor;
    //   this.$store.state.global.isCollapsePageAnchor = this.isCollapsePageAnchor;
    //   if (typeof localStorage === 'undefined') return;
    //   localStorage.setItem('isCollapsePageAnchor', this.isCollapsePageAnchor);
    // },
    arrayToTree(arr, parent) {
      return arr.reduce((res, current) => {
        if (current['parent'] === parent) {
          current.items = this.arrayToTree(arr, current['id']);
          return res.concat(current);
        }
        return res;
      }, []);
    }
  },
  computed: {
    hasHeaders() {
      return this.headersData ? true : false;
    },
    headersData() {
      return this.$page.headers;
    },
    pageAnchorConfig() {
      return (
        this.$page.frontmatter.pageAnchor ||
        this.$themeConfig.pageAnchor || { anchorDepth: 2, isDisabled: false }
      );
    },
    isCollapsePageAnchor(){
      return this.$store.state.global.isCollapsePageAnchor
    },
    filterHeadersByLevel2() {
      const { headers } = this.$page;
      let headersList;
      headersList = headers.filter(item => item.level === 2);
      headersList.forEach(item => {
        item['items'] = [];
      });
      return headersList;
    },
    filterHeadersByLevel() {
      if (this.pageAnchorConfig.anchorDepth === 1) {
        return this.filterHeadersByLevel2;
      }

      const { headers } = this.$page;
      let headersList = headers;
      headersList.forEach((item, index) => {
        item['id'] = index + 1;
        if (item.level === 2) {
          item['parent'] = 0;
        } else {
          if (index !== 0) {
            if (headersList[index - 1].level === 2) {
              item['parent'] = headersList[index - 1]['id'];
            } else if (headersList[index - 1].level === 3) {
              item['parent'] = headersList[index - 1]['parent'];
            }
          }
        }
      });
      return this.arrayToTree(headersList, 0);
    }
  },
  // mounted() {
  //   this.isCollapsePageAnchor = getLocalStorage(
  //     'isCollapsePageAnchor',
  //     'boolen'
  //   );
  // }
};
</script>

<style lang="less">
@import '../styles/palette.less';

.page-anchor {
  width: 12.5rem;
  position: fixed;
  top: @navbarHeight + 3.5rem;
  right: 1.25rem;
  z-index: 999;
  // transition: right 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

  .anticon {
    margin-top: -3px;
  }

  // .ant-anchor-wrapper {
  //   transition: opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  // }

  .page-anchor-offset {
    padding-left: 6px;
    max-height: 15rem;
    overflow-y: auto;
  }
}
// .collapse-page-anchor {
//   right: -10.5rem;

//   .ant-anchor-wrapper {
//     opacity: 0;
//     visibility: hidden;
//   }
// }
</style>
