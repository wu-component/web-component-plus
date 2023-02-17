<template>
  <div v-if="data">
    <div class="promo">
      <!-- Promo state 1 -->
      <div v-if="data.style === 1" @click="gotoLink" id="promo_1">
        <img :src="data.image" />
        <span :title="data.text">{{ data.text || 'No text' }}</span>
      </div>
      <!-- Promo state 2 -->
      <div v-else-if="data.style === 2" id="promo_2">
        <a-carousel autoplay :autoplaySpeed="data.speed || 3000">
          <div v-for="(item, index) in data.items" :key="index">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">
              <img :src="item.image" :title="item.text" />
            </a>
          </div>
        </a-carousel>
      </div>
      <!-- Promo state 3 -->
      <div v-else id="promo_3">
        <div class="promo_title">{{ data.title || 'Sponsor' }}</div>
        <a-button type="primary" ghost @click="popupInfo">{{
          data.btnText || 'Become a Sponsor'
        }}</a-button>
      </div>
    </div>
    <a-divider dashed id="reset-margin" />
  </div>
</template>

<script>
export default {
  name: 'Promo',
  methods: {
    gotoLink() {
      window.open(this.data.link);
    },
    popupInfo() {
      this.$info({
        title: this.data.msgTitle || 'Message Title',
        content: this.data.msgText || 'Put your text here.',
        okText: this.data.msgOkText || 'Ok',
        maskClosable: true
      });
    }
  },
  computed: {
    data() {
      return this.$themeConfig.ads;
    }
  }
};
</script>

<style lang="less">
@import '../styles/palette.less';

.promo {
  padding: 0 1rem 0.6rem;
  font-size: 0.75rem;
  overflow: hidden;

  #promo_1 {
    cursor: pointer;

    img {
      float: left;
      margin-right: 1rem;
      max-width: @PromoStyle1MW;
    }
  }

  #promo_2 {
    img {
      width: 100%;
    }
  }

  #promo_3 {
    padding: 0 1.5rem;
    margin-bottom: 0.8125rem;

    .promo_title {
      color: #777;
      font-weight: 300;
      font-size: 0.9375rem;
      margin-bottom: 0.9375rem;
    }
  }

}

#reset-margin {
  margin: 5px 0;
}

@media (max-width: @MQMobile) {
  .promo {
    display: @MobileShow;
  }
  #reset-margin {
    display: @MobileShow;
  }
}
</style>
