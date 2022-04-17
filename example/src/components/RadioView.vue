<script lang="ts">
export default {
  name: 'RadioView',
  setup () {
    function miniChange(e: any) {
      console.log('单选按钮修改', e);
      document.querySelector('#miniEvent1')?.setAttribute('checked', (e.detail.value).toString())
    }

    function groupChange(e: any) {
      console.log('单选组修改', e)
    }
    return {
      miniChange,
      groupChange
    }
  }
}
</script>

<template>
  <div style="width: 100%">
      <h3>Radio</h3>
      <h5>Radio</h5>
      <div style="display: flex;justify-content: space-between; align-items: center; padding: 16px">
        <wu-radio label="medium" value="medium" size="medium" name="medium" checked="true"></wu-radio>
        <wu-radio label="small" value="small" size="small" name="small" checked="true"></wu-radio>
        <wu-radio label="mini" value="mini" size="mini" name="mini" id="miniEvent1" @change="miniChange"></wu-radio>
        <wu-radio label="border" value="border" size="mini" checked="true" name="border" disabled="true"></wu-radio>
      </div>
    <h5>RadioGroup</h5>
    <div style="padding: 16px">
      <wu-radio-group name="groupTest" @change="groupChange" value="groupSmall">
        <wu-radio style="margin-right: 16px" label="groupSmall" value="groupSmall" size="small" name="groupTest"></wu-radio>
        <wu-radio style="margin-right: 16px" label="groupMini" value="groupMini" size="small" name="groupTest"></wu-radio>
        <wu-radio style="margin-right: 16px" label="groupMedium" value="groupMedium" size="small" name="groupTest"></wu-radio>
      </wu-radio-group>
      <wu-radio-group name="groupTest1" disabled="true" value="groupSmall" style="margin-left: 32px">
        <wu-radio style="margin-right: 16px" label="groupSmall" value="groupSmall" size="small" name="groupTest1"></wu-radio>
        <wu-radio style="margin-right: 16px" label="groupMini" value="groupMini" size="small" name="groupTest1"></wu-radio>
      </wu-radio-group>
      <wu-radio-group name="groupTest2" disabled="false" value="groupSmall" style="margin-top: 32px">
        <wu-radio style="margin-right: 16px" border="true" label="groupSmall" value="groupSmall" size="small" name="groupTest2"></wu-radio>
        <wu-radio style="margin-right: 16px" border="true" label="groupMini" value="groupMini" size="small" name="groupTest2"></wu-radio>
      </wu-radio-group>
    </div>
    <h5>RadioButton</h5>
    <div style="display: flex;justify-content: space-between; align-items: center; padding: 16px">
      <wu-radio-group name="groupTest3" disabled="false" value="groupButtonSmall1">
        <wu-radio-button label="button1" value="groupButtonSmall1" size="mini" name="groupTest3"></wu-radio-button>
        <wu-radio-button label="button2" value="groupButtonSmall2" size="mini" name="groupTest3"></wu-radio-button>
      </wu-radio-group>
    </div>
  </div>

</template>
<style>

</style>
