<template>
  <div class="tools">
    <h1 class="title">精美图片</h1>
    <div v-for="(item, index) in imgList" :key="index" class="tools-main-img">
      <img :src="item" alt="">
    </div>
  </div>
</template>

<script setup>
const imgList = [
'http://101.37.14.121/xing.png'
];

onMounted(() => {});
</script>

<style lang="scss" scoped>
.tools-main-img{
  width: 100%;
  display: flex;
  justify-content: center;
  img{
    cursor: pointer;
    transition: all .6s;
  }
  img:hover{
    transform: scale(1.1);
  }
}
</style>
