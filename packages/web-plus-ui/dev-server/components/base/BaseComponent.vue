<template>
    <div style="display: flex;flex-direction: column">
        <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
            <wu-plus-button size="mini" type="primary">primary</wu-plus-button>
            <wu-plus-button size="mini" type="success">success</wu-plus-button>
            <wu-plus-button size="mini" type="warning">warning</wu-plus-button>
            <wu-plus-button size="mini" type="danger">danger</wu-plus-button>
            <wu-plus-button size="mini" type="info">info</wu-plus-button>
            <wu-plus-button size="mini" type="text">text</wu-plus-button>
        </div>
        <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
            <wu-plus-icon style="font-size: 24px" name="ice-cream-square" />
            <wu-plus-icon style="font-size: 24px" name="loading" />
            <wu-plus-icon style="font-size: 24px" name="star-off" />
            <wu-plus-icon style="font-size: 24px" name="user-solid" />
            <wu-plus-icon style="font-size: 24px" name="setting" />
            <wu-plus-icon style="font-size: 24px" name="warning-outline" />
        </div>
        <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
            <wu-plus-radio label="男" value="medium" size="medium" name="medium" checked="true"></wu-plus-radio>
            <wu-plus-radio label="女" value="small" size="small" name="small" checked="true"></wu-plus-radio>
            <wu-plus-radio label="未知" value="mini" size="mini" name="mini" id="miniEvent1"></wu-plus-radio>
        </div>
        <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
            <wu-plus-input style="width: 280px" placeholder="请输入" clearable="true" type="input"></wu-plus-input>
        </div>
        <div style="display: flex; align-items: center;justify-content: space-around;padding: 16px">
            <wu-plus-input style="width: 280px" disabled="true" clearable="true" type="textarea"></wu-plus-input>
        </div>
        <wu-plus-row>
            <div>内容</div>
            <div>内容</div>
            <div>内容</div>
        </wu-plus-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<style scoped>

</style>
