
## Upload 文件上传

通过点击或者拖拽上传文件

### 点击上传

::: demo
```html
<template>
    <div style="display: flex; width: 30% align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-upload
                show-file-list="false"
                id="upload0"
                auto-upload="true"
                list-type="picture-card"
                file-list='[{"name":"food.jpeg","url":"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"},{"name":"food2.jpeg","url":"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}]'
                headers='{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
                action="https://canyuegongzi.xyz/simple-file-center/v1.0/qiniu/multipleQiniu"
                data='{"category":4,"userName":"root","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
        >
            <wu-plus-button>选取文件</wu-plus-button>
            <div slot="tip" class="wu-upload_tip" style="font-size: 12px;color: #606266;">只能上传jpg/png文件，且不超过500kb</div>
        </wu-plus-upload>
    </div>
</template>
<script>
</script>
```
:::

### 用户头像上传

多选框不可用状态。

::: demo
```html
<template>
    <div style="display: flex; width: 30% align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-upload
                show-file-list="false"
                id="uploadAvatar"
                auto-upload="true"
                list-type=""
                file-list='[{"name":"food.jpeg","url":"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}]'
                headers='{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
                action=""
                data='{"category":4,"userName":"root","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
        >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <div v-else class="el-icon-plus avatar-uploader-icon">+</div>
        </wu-plus-upload>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                imageUrl: ""
            }
        },
        mounted() {
            const dom = document.querySelector("#uploadAvatar");
            dom.addEventListener("change", (e) => {
                if (e.detail.file?.response?.data?.[0]?.url) {
                    this.imageUrl = e.detail.file.response.data[0].url
                }
            })
            
        }
    }
</script>
<style>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
```
:::

### 照片墙

::: demo
```html
<template>
    <div style="display: flex; width: 30% align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-upload
                show-file-list="false"
                id="upload055"
                auto-upload="true"
                list-type="picture-card"
                file-list='[{"name":"food.jpeg","url":"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"},{"name":"food2.jpeg","url":"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}]'
                headers='{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
                action=""
                data='{"category":4,"userName":"root","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
        >
            <wu-plus-button>选取文件</wu-plus-button>
            <div slot="tip" class="wu-upload_tip" style="font-size: 12px;color: #606266;">只能上传jpg/png文件，且不超过500kb</div>
        </wu-plus-upload>
    </div>
</template>
<script>
</script>
```
:::

### 图片列表缩略图

::: demo
```html
<template>
    <div style="display: flex; width: 30% align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-upload
                show-file-list="false"
                id="upload055"
                auto-upload="true"
                list-type="picture"
                file-list='[{"name":"food.jpeg","url":"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"},{"name":"food2.jpeg","url":"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}]'
                headers='{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
                action=""
                data='{"category":4,"userName":"root","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
        >
            <wu-plus-button>选取文件</wu-plus-button>
            <div slot="tip" class="wu-upload_tip" style="font-size: 12px;color: #606266;">只能上传jpg/png文件，且不超过500kb</div>
        </wu-plus-upload>
    </div>
</template>
<script>
</script>
```
:::

### 拖拽上传

::: demo
```html
<template>
    <div style="display: flex; width: 30% align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-upload
                show-file-list="false"
                id="upload2"
                auto-upload="true"
                list-type="text"
                drag="true"
                file-list='[]'
                headers='{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
                action=""
                data='{"category":4,"userName":"root","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
        >
            <div slot="tip" class="wu-upload_tip" style="font-size: 12px;color: #606266;">只能上传jpg/png文件，且不超过500kb</div>
        </wu-plus-upload>
    </div>
</template>
<script>
</script>
```
:::

### 手动上传

::: demo
```html
<template>
    <div style="display: flex; width: 30% align-items: center;justify-content: space-around;padding: 16px">
        <wu-plus-upload
                show-file-list="false"
                id="upload223"
                auto-upload="false"
                list-type="text"
                multiple="true"
                file-list='[]'
                headers='{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
                action="https://canyuegongzi.xyz/simple-file-center/v1.0/qiniu/multipleQiniu"
                data='{"category":4,"userName":"root","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicm9vdCIsImlhdCI6MTY2MjkxMDM5MiwiZXhwIjoxNjYyOTEzOTkyfQ.65rWS2yBQHI1cP_PBqmk8jr2_h5_ENIRckZarmvffzU"}'
        >
            <button>选取文件</button>
            <div slot="tip" class="wu-upload_tip" style="font-size: 12px;color: #606266;">只能上传jpg/png文件，且不超过500kb</div>
        </wu-plus-upload>

        <wu-plus-button id="okUploadFile">确认上传文件</wu-plus-button>
    </div>
</template>
<script>
    export default {
        mounted() {
            const okUploadFile = document.querySelector("#okUploadFile");
            okUploadFile.addEventListener("click", () => {
                const upload223 = document.querySelector("#upload223");
                console.log(upload223);
                upload223.submit();
            })
        }
    }
</script>
```
:::


### checkbox Attributes

| 参数               | 说明                                                                          | 类型      | 可选值                       | 默认值   |
|------------------|-----------------------------------------------------------------------------|---------|---------------------------|-------|
| action           | 必选参数，上传的地址                                                                  | String  | --                        | --    |
| headers          | 设置上传的请求头部                                                                   | Object  | --                        | {}    |
| data             | 上传时附带的额外参数                                                                  | Object  | --                        | {}    |
| multiple         | 是否支持多选文件                                                                    | Boolean | true、false                | false |
| with-credentials | 支持发送 cookie 凭证信息                                                            | Boolean | true、false                | false |
| name             | 上传的文件字段名                                                                    | String  | --                        | --    |
| drag             | 是否启用拖拽上传                                                                    | Boolean | true、false                | false |
| disabled         | 是否禁用                                                                        | Boolean | true、false                | false |
| auto-upload      | 是否在选取文件后立即进行上传                                                              | Boolean | true、false                | false |
| accept           | 接受上传的文件类型（thumbnail-mode 模式下此参数无效）                                          | String  | --                        | --    |
| list-type        | 文件列表的类型(为空时不展示文件列表)                                                         | String  | text/picture/picture-card | ''    |
| file-list        | 上传的文件列表, 例如</br>: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	 | Array   | --                        | []    |
| limit            | 最大允许上传个数	                                                                   | Number  | --                        | 5     |


### checkbox Event

| 事件名      | 说明 | 参数     |
|---------- |--|---------- |
| file | 文件选择 | (event: CustomEvent) => void |
| change | 文件状态改变时的钩子，添加文件、</br>上传成功和上传失败时都会被调用 | (event: CustomEvent) => void |
| success | 文件上传成功时的钩子 | (event: CustomEvent) => void |
| error | 文件上传失败时时的钩子 | (event: CustomEvent) => void |
| remove | 文件列表移除文件时的钩子 | (event: CustomEvent) => void |
| preview | 点击文件列表中已上传的文件时的钩子 | (event: CustomEvent) => void |

### Slot

| 参数      | 说明         |
|---------|------------|
| trigger | 触发文件选择框的内容 |
| --      | 默认的内容      |

