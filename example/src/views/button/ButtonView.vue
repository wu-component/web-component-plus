<script lang="ts">
import { onMounted } from "vue";
export default {
  name: 'ButtonView',
  setup () {
    function test() {
      document.getElementById('buttonEvent1')?.setAttribute('type', 'danger')
    }
    onMounted(() => {
      document.getElementById('buttonEvent2')?.addEventListener('click', () => {
        alert('手动绑定事件')
      })
    });

    return { test }
  }
}
</script>

<template>
  <div style="width: 100%">
      <h3>Button</h3>
      <div style="display: flex;justify-content: space-between; align-items: center; padding: 16px">
        <wu-button type="success" size="small">small</wu-button>
        <wu-button type="success" size="mini">mini</wu-button>
        <wu-button type="success" size="medium">medium</wu-button>
      </div>
      <div style="display: flex; align-items: center;justify-content: space-between;padding: 16px">
        <wu-button size="mini" type="primary">primary</wu-button>
        <wu-button size="mini" type="success">success</wu-button>
        <wu-button size="mini" type="warning">warning</wu-button>
        <wu-button size="mini" type="danger">danger</wu-button>
        <wu-button size="mini" type="info">info</wu-button>
        <wu-button size="mini" type="text">text</wu-button>
      </div>
      <div style="display: flex; align-items: center;justify-content: space-between;padding: 16px">
        <wu-button size="mini" type="primary" disabled="true">disabled</wu-button>
        <wu-button size="mini" type="primary" plain="true">plain</wu-button>
        <wu-button size="mini" type="primary" round="true">round</wu-button>
        <wu-button size="mini" type="primary" circle="true" id="buttonEvent2">circle</wu-button>
        <wu-button size="mini" type="primary" loading="true" id="buttonEvent1" @click="test">loading</wu-button>
      </div>
  </div>

</template>
<style>

</style>
