<script lang="ts">


export default {
  name: 'TreeView',
  setup () {
    function inputChange(e: any) {
      console.log('input change', e);
    }
    const treeData: any[] = [
      {
        label: '子节点1',
        value: '子节点1',
        children: [
          {
            label: '子节点1-1',
            value: '子节点1-1',
          },
          {
            label: '子节点1-2',
            value: '子节点1-2',
          }
        ]
      }
    ];
    return {
      inputChange,
      treeData
    }
  }
}
</script>

<template>
  <div style="width: 100%">
      <h3>Tree</h3>
      <h5>Normal</h5>
      <div style="display: flex;justify-content: space-between; align-items: center; padding-left: 16px">
        <wu-tree size="mini" :data="treeData"></wu-tree>
      </div>
  </div>

</template>
<style>

</style>
