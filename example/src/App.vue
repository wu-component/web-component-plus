<script lang="ts">
import { defineComponent, ref } from "vue";
import ButtonView from "./wu-component/ButtonView.vue";
export default defineComponent({
  components: {
    ButtonView
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
