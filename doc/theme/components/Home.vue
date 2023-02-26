<template>
  <div>
    <main class="home" aria-labelledby="main-title">
      <header class="hero">
        <img
          v-if="data.heroImage"
          :src="$withBase(data.heroImage)"
          :alt="data.heroAlt || 'hero'"
          class="hero-logo"
        />

        <h1 v-if="data.heroText !== null" id="main-title">
          {{ data.heroText || $title || 'Hello' }}
        </h1>

        <p v-if="data.tagline !== null" class="description">
          {{ data.tagline || $description || 'Welcome to your VuePress site' }}
        </p>

        <div v-if="data.actions && data.actions.length" class="actions">
          <a-space size="middle">
            <a-button
              v-for="(action, index) in data.actions"
              :key="index"
              :type="action.type ? action.type : 'primary'"
              :shape="action.shape ? action.shape : null"
              :size="action.size ? action.size : 'large'"
              :ghost="action.ghost ? action.ghost : false"
            >
              <a
                v-if="isExtlink(action.link?action.link:'/')"
                :href="link(action.link?action.link:'/')"
                target="_blank"
              >
                {{ action.text }}
              </a>
              <RouterLink v-else :to="link(action.link?action.link:'/')">
                {{ action.text }}
              </RouterLink>
            </a-button>
          </a-space>
        </div>

      </header>

      <div v-if="data.features && data.features.length" class="features">
        <div
          v-for="(feature, index) in data.features"
          :key="index"
          class="feature"
        >
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.details }}</p>
        </div>
      </div>

      <Content class="theme-antdocs-content custom" />
    </main>
    <div v-if="data.footer" class="footer">
      <div
        v-if="data.footerWrap && data.footerWrap.length"
        class="footer-container"
      >
        <a-row
          :gutter="{ md: 0, lg: 32 }"
          type="flex"
          justify="space-around"
          class="add-bottom"
        >
          <a-col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            :xl="6"
            v-for="(footerWrap, index) in data.footerWrap"
            :key="index"
          >
            <div>
              <h2>{{ footerWrap.headline }}</h2>
              <div
                class="footer-item"
                v-for="(item, index) in footerWrap.items"
                :key="index"
              >
                <a
                  :href="item.link"
                  target="_blank"
                  v-if="item.title && item.title !== null"
                >
                  {{ item.title }}
                </a>
                <span
                  class="footer-item-separator"
                  v-if="item.details && item.details !== null"
                  >-</span
                >
                <span
                  class="footer-item-description"
                  v-if="item.details && item.details !== null"
                  >{{ item.details }}</span
                >
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div
        :class="{ 'footer-divider': isDivider, 'footer-bottom': true }"
        v-html="data.footer"
      ></div>
    </div>
  </div>
</template>

<script>
import { ensureExt } from '../util';

export default {
  name: 'Home',

  data() {
    return {
      isDivider: false
    };
  },
  methods: {
    isExtlink(path) {
      const Reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
      return Reg.test(path);
    },
    link(url) {
      url = typeof url === 'undefined' ? '' : url;
      let _url = ensureExt(url);
      _url = _url.length === 5 && _url === '.html' ? '' : _url;
      return _url;
    }
  },
  mounted() {
    if (this.data.footerWrap && this.data.footerWrap.length) {
      this.isDivider = true;
    }
  },
  computed: {
    data() {
      return this.$page.frontmatter;
    },
  }
};
</script>

<style lang="less">
@import '../styles/palette.less';

.home {
  padding: @navbarHeight 2rem 0;
  max-width: @homePageWidth;
  margin: 0px auto;
  display: block;
  margin-bottom: 40px;

  .hero {
    text-align: center;

    .hero-logo {
      max-width: 100%;
      max-height: 250px;
      display: block;
      margin: 5rem auto 1.5rem;
    }

    h1 {
      font-size: 3rem;
    }

    h1,
    .description,
    .action {
      margin: 1.8rem auto;
      text-align: center;
    }

    .description {
      max-width: 35rem;
      font-size: 1.5rem;
      line-height: 1.3;
      color: #949494;
    }
  }

  .features {
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;
    font-size: 1rem;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten(@textColor, 10%);
    }

    p {
      color: lighten(@textColor, 25%);
      margin-top: 0.5rem;
    }
  }

  .ant-btn-lg {
    font-size: 18px;
    height: 3rem;
    padding: 0 1.5rem;
  }
}

.footer {
  clear: both;
  font-size: 0.875rem;
  background-color: #000;
  position: relative;
  color: rgba(255, 255, 255, 0.4);
  .footer-container {
    max-width: 1100px;
    padding: 5rem 0;
    margin: 0 auto;

    h2 {
      position: relative;
      margin: 0 auto 1.5rem;
      padding: 0;
      font-weight: 500;
      font-size: 16px;
      color: #fff;
      text-align: left;
    }
    .add-bottom {
      > div {
        > div {
          margin-bottom: 1.875rem;
        }
      }
    }

    .footer-item {
      margin: 0.75rem 0;
      a {
        color: #fff;
      }
      a:hover {
        color: @accentColor;
      }
      .footer-item-separator {
        margin: 0 0.3em;
      }
    }
  }
  .footer-bottom {
    max-width: 1200px;
    text-align: center;
    padding: 16px 0;
    margin: 0 auto;
    line-height: 32px;
    overflow: hidden;
    font-size: 16px;
    font-variant: tabular-nums;

    &.footer-divider {
      border-top: 1px solid rgba(255, 255, 255, 0.25);
    }
  }
}

@media (max-width: @MQMobile) {
  .home {
    .hero {
      .hero-logo {
        max-height: 150px;
        margin: 2rem auto 1.2rem;
      }
    }

    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 1rem;
      margin: 0.5rem auto;
      text-align: center;
    }
  }
  .footer-container {
    text-align: center;

    h2 {
      text-align: center !important;
    }
    .add-bottom {
      > div {
        &:last-child {
          > div {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

@media (max-width: @MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 2.8rem;

    .hero {
      .hero-logo {
        max-height: 150px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1,
      .description,
      .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      // .action-button {
      //   font-size: 1rem;
      //   padding: 0.6rem 1.2rem;
      // }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
