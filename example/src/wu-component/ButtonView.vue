<script lang="ts">
import { onMounted, ref } from "vue";

export default {
  name: 'ButtonView',
  setup () {
    const type = ref('success')
    const indexNum = ref(0)
    const disabled = ref(false)
    function test() {
      document.getElementById('buttonEvent1')?.setAttribute('type', 'danger')
    }
    onMounted(() => {
      document.getElementById('buttonEvent2')?.addEventListener('click', () => {
        alert('手动绑定事件')
      })
    });

    function editType() {
      const types = ['primary', 'success', 'warning', 'danger', 'info']
      indexNum.value ++
      if (indexNum.value >= 4) {
        indexNum.value = 0;
      }
      type.value = types[indexNum.value];
    }

    function editType1() {
      const types = ['primary', 'success', 'warning', 'danger', 'info']
      indexNum.value ++
      if (indexNum.value >= 4) {
        indexNum.value = 0;
      }
      type.value = types[indexNum.value];
      console.log(type.value)
    }

    function editType2() {
      disabled.value = !disabled.value
      console.log(disabled)
    }

    function radioChange(e: any) {
      console.log(e);
    }

    function radioMounted(e: any) {
      console.log(e);
    }

    return { test, type, editType, editType1, disabled, editType2, radioChange, radioMounted }
  }
}
</script>

<template>
  <div style="width: 100%">
      <h3>Button</h3>
      <div style="display: flex;justify-content: space-between; align-items: center; padding: 16px">
        <wu-plus-button type="success" size="small" :type="type" @click="editType1">small</wu-plus-button>
        <wu-plus-button type="success" size="mini">mini</wu-plus-button>
        <wu-plus-button type="success" size="medium">medium</wu-plus-button>
      </div>
      <div style="display: flex; align-items: center;justify-content: space-between;padding: 16px">
        <wu-plus-button size="mini" type="primary">primary</wu-plus-button>
        <wu-plus-button size="mini" type="success">success</wu-plus-button>
        <wu-plus-button size="mini" type="warning">warning</wu-plus-button>
        <wu-plus-button size="mini" type="danger">danger</wu-plus-button>
        <wu-plus-button size="mini" type="info">info</wu-plus-button>
        <wu-plus-button size="mini" type="text">text</wu-plus-button>
      </div>
      <div style="display: flex; align-items: center;justify-content: space-between;padding: 16px">
        <wu-plus-button size="mini" type="primary" disabled="true">disabled</wu-plus-button>
        <wu-plus-button size="mini" type="primary" plain="true">plain</wu-plus-button>
        <wu-plus-button size="mini" type="primary" round="true">round</wu-plus-button>
        <wu-plus-button size="mini" type="primary" circle="true" id="buttonEvent2">circle</wu-plus-button>
        <wu-plus-button size="mini" type="primary" loading="true" id="buttonEvent1" @click="test">loading</wu-plus-button>
      </div>
      <wu-plus-button id="testDom2" :type="type" @click="editType">按钮</wu-plus-button>
      <wu-plus-button id="testDom3" type="success">按钮</wu-plus-button>
      <wu-plus-button id="testDom4" type="info" v-bind:disabled="disabled" @click="editType2">按钮</wu-plus-button>
      <wu-plus-icon name="ice-cream-square">按钮</wu-plus-icon>
      <wu-plus-icon name="loading">按钮</wu-plus-icon>
      <wu-plus-radio label="small" value="small" size="small" name="small" @mounted="radioMounted" checked="true" @change="radioChange" />
  </div>

</template>
<style>

</style>
