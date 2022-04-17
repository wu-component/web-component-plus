<script lang="ts">
export default {
  name: 'InputView',
  setup () {
    function inputChange(e: any) {
      console.log('input change', e);
    }
    return {
      inputChange
    }
  }
}
</script>

<template>
  <div style="width: 100%">
      <h3>Input</h3>
      <h5>Normal</h5>
      <div style="display: flex;justify-content: space-between; align-items: center; padding-left: 16px">
        <wu-input name="setting" size="mini" @change="inputChange" value="" clearable="true" placeholder="请输入内容"></wu-input>
      </div>
    <h5>Disabled</h5>
    <div style="display: flex;justify-content: space-between; align-items: center; padding-left: 16px">
      <wu-input name="setting" size="mini" disabled="true" @change="inputChange" value="" clearable="true" placeholder="请输入内容"></wu-input>
    </div>
    <h5>Textarea</h5>
    <div style="display: flex;justify-content: space-between; align-items: center; padding-left: 16px">
      <wu-input name="setting" size="mini" type="textarea" @change="inputChange" value="" placeholder="请输入内容"></wu-input>
    </div>
    <h5>MaxLength</h5>
    <div style="display: flex;justify-content: space-between; align-items: center; padding-left: 16px">
      <wu-input name="setting" max-length="12" size="mini" type="textarea" @change="inputChange" value="" placeholder="请输入内容"></wu-input>
    </div>
  </div>

</template>
<style>

</style>
