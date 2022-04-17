<script lang="ts">
import ButtonView from "./components/ButtonView.vue"
import { defineComponent, ref } from "vue";
import RadioView from "./components/RadioView.vue";
import IconView from "./components/IconView.vue";
import InputView from "./components/InputView.vue";
import TreeView from "./components/TreeView.vue";
export default defineComponent({
  components: {
    ButtonView,
    RadioView,
    IconView,
    InputView,
    TreeView
  },
  setup(){
    const sonRef = ref(null);
    const handleClick = () => {
    }
    return { sonRef, handleClick, }
  }
})
</script>

<template>
  <el-container style="height: 100%;">
    <el-header style="text-align: right; font-size: 12px; height: 32px">
      Components
    </el-header>
    <el-main style="height: calc(100% - 32px)">
      <el-scrollbar style="height: 100%">
        <ButtonView></ButtonView>
        <RadioView></RadioView>
        <IconView></IconView>
        <InputView></InputView>
        <TreeView></TreeView>
      </el-scrollbar>

    </el-main>
  </el-container>

</template>
<style>
html, body {
  height: 100%;
  margin: 0;
}
#app{
  height: 100%;
}
</style>
