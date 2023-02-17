<template>
  <div class="theme-switch" @click="switchScheme()">
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>{{ !isDarkMode ? '切换暗黑模式' : '切换亮色模式' }}</span>
      </template>
      <a v-if="!isDarkMode" style="margin-top:2px;">
        <i class="anticon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" fill="white" fill-opacity="0.01" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 3V6.15V3Z"
              fill="#333"
            />
            <path
              d="M24 3V6.15"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M38.8492 9.15076L36.6219 11.3781L38.8492 9.15076Z"
              fill="#333"
            />
            <path
              d="M38.8492 9.15076L36.6219 11.3781"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M45 24H41.85H45Z"
              fill="#333"
            />
            <path
              d="M45 24H41.85"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M38.8492 38.8492L36.6219 36.6219L38.8492 38.8492Z"
              fill="#333"
            />
            <path
              d="M38.8492 38.8492L36.6219 36.6219"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 45V41.85V45Z"
              fill="#333"
            />
            <path
              d="M24 45V41.85"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.15076 38.8492L11.3781 36.6219L9.15076 38.8492Z"
              fill="#333"
            />
            <path
              d="M9.15076 38.8492L11.3781 36.6219"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 24H6.15H3Z"
              fill="#333"
            />
            <path
              d="M3 24H6.15"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.15076 9.15076L11.3781 11.3781L9.15076 9.15076Z"
              fill="#333"
            />
            <path
              d="M9.15076 9.15076L11.3781 11.3781"
              stroke="#333"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M24 36C30.6274 36 36 30.6274 36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36Z"
              fill="none"
              stroke="#333"
              stroke-width="4"
              stroke-linejoin="round"
            />
          </svg>
        </i>
      </a>
      <a v-else style="margin-top:2px;">
        <i class="anticon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" fill="white" fill-opacity="0.01" />
            <path
              d="M28.0527 4.41085C22.5828 5.83695 18.5455 10.8106 18.5455 16.7273C18.5455 23.7564 24.2436 29.4545 31.2727 29.4545C37.1894 29.4545 42.1631 25.4172 43.5891 19.9473C43.8585 21.256 44 22.6115 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C25.3885 4 26.744 4.14149 28.0527 4.41085Z"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
              stroke-linejoin="round"
            />
          </svg>
        </i>
      </a>
    </a-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitch',
  data() {
    return {
      isDarkMode: false
    };
  },
  methods: {
    getSchemeStorage(name) {
      if (typeof localStorage === 'undefined') return;
      let val = localStorage.getItem(name);
      if (val === 'light') {
        return true;
      } else if (val === 'dark') {
        return false;
      } else {
        return true;
      }
    },
    setSchemeStorage(val) {
      return val === true ? 'dark' : 'light';
    },
    switchScheme() {
      this.isDarkMode = !this.isDarkMode;
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(
        'antdocs-color-scheme',
        this.setSchemeStorage(this.isDarkMode)
      );
      const htmlEl = window?.document.querySelector('html')
      htmlEl?.classList.toggle('dark', this.isDarkMode)
    }
  },
  mounted() {
    this.isDarkMode = !this.getSchemeStorage('antdocs-color-scheme');
    const htmlEl = window?.document.querySelector('html')
    htmlEl?.classList.toggle('dark', this.isDarkMode)
  }
};
</script>

<style lang="less">
@import '../styles/palette.less';

.theme-switch{
  cursor: pointer;

  // &:hover{
  //   a{
  //     color: var(--bg-navbar);
  //   }
  // }

  a{
    color: inherit;
  }
}
</style>
