<template>
  <div class="tools">
    <h1 class="title">效率工具</h1>
    <div class="tools-main-img">
      <img src="http://101.37.14.121/xing.png" alt="">
    </div>
    <ToolsBar
      v-for="(item, index) in toolsList"
      :title="item.title"
      :subtitle="item.subtitle"
      :toolsList="item.list"
      :key="index"
    ></ToolsBar>
  </div>
</template>

<script setup>
import ToolsBar from "../components/ToolsBar.vue";
const toolsList = [
{
    title: "AI工具",
    subtitle: "开发者必备",
    list: [
      {
        title: "ChatGPT",
        subtitle: "最好用的AI工具",
        url: "https://chatgpt.com/chat",
        icon: "https://cdn.oaistatic.com/assets/favicon-32x32-p4ktpm1x.webp",
      },
    ],
  },
{
    title: "UI工具",
    subtitle: "前端必备",
    list: [
      {
        title: "ANTD DESIGN",
        subtitle: "最好用的UI框架？",
        url: "https://www.antdv.com/docs/vue/introduce-cn",
        icon: "https://next.antdv.com/assets/logo.1ef800a8.svg",
      },
      {
        title: "element-plus",
        subtitle: "vue还是我说了算？",
        url: "https://element-plus.org/zh-CN/",
        icon: "https://element-plus.org/images/element-plus-logo-small.svg",
      },
    ],
  },
{
    title: "在线加密工具",
    subtitle: "对接解密必备",
    list: [
      {
        title:'rgb颜色转16进制',
        subtitle:'颜色格式转换',
        url:'https://www.bejson.com/convert/rgbhex/',
        icon:'https://www.bejson.com/static/bejson/img/logo.png'
      },
      {
        title: "sha256",
        subtitle: "最常用的非对称加密",
        url: "https://www.jyshare.com/crypto/sha256/",
        icon: "http://101.37.14.121/c-runoob-logo.ico",
      },
      {
        title: "base64",
        subtitle: "最常用的对称加密",
        url: "https://www.jyshare.com/front-end/693/",
        icon: "http://101.37.14.121/c-runoob-logo.ico",
      },
      {
        title: "URL编码解码",
        subtitle: "肯定要用",
        url: "https://www.jyshare.com/front-end/695/",
        icon: "http://101.37.14.121/c-runoob-logo.ico",
      },
      
    ],
  },
  
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
