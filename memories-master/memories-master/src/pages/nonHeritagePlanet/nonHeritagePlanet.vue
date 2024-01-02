<template>
  <div>
    <!-- 导航栏 -->
    <div style="position: absolute; z-index: 2; top: 0; left: 0; right: 0;">
      <jy-tab-bar :normal-title="normalTitle" :is-back="false"></jy-tab-bar>
    </div>

    <!-- 轮播图 -->
    <div class="carousel-container">
      <div class="carousel-wrapper" :style="{ transform: 'translateX(' + translateValue + ')' }">
        <div v-for="(item, index) in carouselImages" :key="index" class="carousel-slide">
          <a :href="item.link">
            <img :src="item.src" alt="轮播图" class="carousel-image" />
            <div class="image-description">{{ item.description }}</div> <!-- 添加说明文字 -->
          </a>
        </div>
      </div>
      <button class="prev-button" @click="prevSlide">&lt;</button>
      <button class="next-button" @click="nextSlide">&gt;</button>
    </div>

  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";

export default {
  name: 'nonHeritagePlanet',
  components: {
    jyTabBar,
  },
  data() {
    return {
      normalTitle: [
        { title: "首页", url: "/home" },
        { title: "非遗星球", url: "/nonHeritagePlanet/nonHeritagePlanet" },
        { title: "数字展馆", url: "/exhibition/exhibitionHome" },
        { title: "创作者家园", url: "/DigitalArtwork/Work" },
        { title: "我的", url: this.$cookies.get('token') === null ? "/userProfile/login" : "/userProfile/userInfo" }
      ],
      carouselImages: [
        { src: "https://i2.100024.xyz/2023/12/27/ysdifm.webp", link: "https://zh.wikipedia.org/wiki/%E4%B8%89%E6%98%9F%E5%A0%86%E9%81%97%E5%9D%80", description: "三星堆" },
        { src: "https://i2.100024.xyz/2023/12/27/ysdhyk.webp", link: "https://zh.wikipedia.org/wiki/%E4%B8%89%E6%98%9F%E5%A0%86%E9%81%97%E5%9D%80", description: "榫卯结构" },
        { src: "https://img2.baidu.com/it/u=1639383325,2675348140&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=753", link: "https://zh.wikipedia.org/wiki/%E4%B8%89%E6%98%9F%E5%A0%86%E9%81%97%E5%9D%80", description: "枫香染" },
        // 添加更多轮播图项
      ],
      currentIndex: 0,
    }
  },
  computed: {
    translateValue() {
      return `-${this.currentIndex * 100}%`;
    },
  },
  methods: {
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #581526;
}


.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #581526;
  /* 添加背景颜色，根据实际需求调整 */
  margin-top: 50px;
  /* 与顶部的距离，根据实际需求调整 */
  text-align: center;
  display: flex;
  align-items: center;
  /* 垂直居中图片 */
  justify-content: center;
  /* 水平居中图片 */
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  flex: 0 0 100%;
}

.carousel-image {
  /* width: 50%; */
  /* 设置图片的最大高度，根据实际需求调整 */
  max-height: 600px; 
  width: auto;
  /* height: auto; */
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 32px;
  /* 调整箭头的大小 */
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  /* 调整箭头的颜色 */
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}



.image-description {
  color: #fff;
  /* 调整说明文字颜色 */
  font-size: 28px;
  /* 调整说明文字大小 */
  /* margin-top: 20px; */
  /* 调整说明文字与图片的距离 */
}</style>
