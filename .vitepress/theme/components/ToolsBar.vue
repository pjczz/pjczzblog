<template>
  <div class="tools-bar">
    <h2 class="tools-bar-title">{{ props.title }}</h2>
    <div class="tools-bar-subtitle">{{ props.subtitle }}</div>
    <div style="display: grid; grid-template-columns: repeat(5 ,1fr);margin-top: 20px;">
      <a :href="item.url" target="_blank" class="tools-bar-item" v-for="(item, index) in props.toolsList" :key="index">
        <div class="tools-bar-item-icon">
          <img :src="item.icon"></img>
        </div>
        <div style="flex: 1;height: 64px;">
          <div class="tools-bar-item-title">{{ item.title }}</div>
          <div class="tools-bar-item-subtitle">{{ item.subtitle }}</div>
        </div>
      </a>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
  // 工具列表
  toolsList: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "工具",
  },
  subtitle: {
    type: String,
    default: "子标题",
  },
})
</script>
<style lang="scss" scoped>
@keyframes img-small {
  0% {
    margin-top: 0;

  }

  100% {
    margin-top: 30px;
  }
}

.tools-bar {

  cursor: pointer;

  .tools-bar-title {
    font-size: 1.6rem;
    margin-bottom: 5px;
  }

  .tools-bar-subtitle {
    font-size: 16px;
    color: var(--main-font-second-color);
  }

  .tools-bar-item:hover {
    background-color: var(--main-color);
    border-color: var(--main-color);

    .tools-bar-item-title {
      color: var(--main-card-background);
    }

    .tools-bar-item-subtitle {
      color: var(--main-card-background);
    }

    .tools-bar-item-icon {
      width: 0;
      height: 0;
      animation: img-small 1.4s ease;


      img {
        width: 0;
        height: 0;
        animation: img-small 1.4s ease;
      }
    }
  }

  .tools-bar-item {
    color: black;
    display: flex;
    width: 251px;
    height: 90px;
    padding: 12px;
    border-radius: 16px;
    background-color: var(--main-card-background);
    border: 1px solid var(--main-card-border);
    box-shadow: 0 8px 16px -4px var(--main-border-shadow);
    transition: all .3s;
    display: flex;

    .tools-bar-item-icon {

      transition: all .6s;
      width: 76px;
      height: 60px;

      img {
        width: 60px;
        height: 60px;
        transition: all .6s;
      }
    }

    .tools-bar-item-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 5px;
      color: var(--main-font-color);
    }

    .tools-bar-item-subtitle {
      color: var(--main-font-second-color);
    }
  }
}
</style>
