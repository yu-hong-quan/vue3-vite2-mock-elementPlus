<template>
  <div id="markDown">
    <v-md-editor
      v-model="text"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      height="800px"
    ></v-md-editor>
  </div>
</template>

<script setup name="markDown">
import { ref } from 'vue';
const text = ref('');

const handleUploadImage = (event, insertImage, files) => {
  console.log(event)
  // 拿到 files 之后将files上传到文件服务器，然后向编辑框中插入对应的内容
  console.log(files);

  // 此处即为向编辑框中插入的内容，url即为图片上传后返回的链接
  // 此处只做示例
  insertImage({
    url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg',
    desc: '七龙珠',
    // width: 'auto',
    // height: 'auto',
  });
}
</script>

<style lang="less" scoped>
#markDown {
  width: 100%;
  height: 100%;
}
</style>
