<template>
  <!--数字展馆首页-->
  <div style="position: absolute">
    <jy-tab-bar :normal-title="normalTitle" :is-back="false"></jy-tab-bar>
    <div id="exhibitionHome">
      <div style="display: flex">
        <div v-for="(item, index) in path1" style="position: relative;cursor: pointer;" @click="changePage(item)">
          <img :src="item.imgUrl" style="width: 100%;min-width: 720px;object-fit: cover;z-index: -1" :alt="'img1' + index">
          <p class="title">{{ item.title }}</p>
        </div>
      </div>
      <div style="display: flex;top: 0">
        <div v-for="(item, index) in path2" style="position: relative;cursor: pointer;" @click="changePage(item)">
          <img :src="item.imgUrl" style="width: 100%;min-width: 720px;object-fit: cover;z-index: -1" :alt="'img1' + index">
          <p class="title">{{ item.title }}</p>
        </div>
      </div>
      <div style="height: 85px;width: 100%;min-width: 1400px;display: flex;justify-content: center;align-items: center">
        <div style="width: 490px;height:1px;background-color: #A5A5A5"></div>
      </div>
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
export default {
  name: "home",
  components: { jyTabBar },
  data() {
    return {
      path1: [
        { imgUrl: "https://s1.ax1x.com/2022/06/24/jivQOI.png", title: "作品总览 #01", url: "/allWorks" },
        { imgUrl: "https://s1.ax1x.com/2022/06/24/jivHhD.png", title: "数字商城 #02", url: "/digitalMall" }
      ],
      path2: [
        { imgUrl: "https://s1.ax1x.com/2022/06/24/jivxBt.png", title: "公益追溯 #03", url: "/welfare" },
        { imgUrl: "https://s1.ax1x.com/2022/06/24/jixF3Q.png", title: "走进纪艺 #04", url: "/enter" }
      ],
      normalTitle: [
        { title: "首页", url: "/home" },
        { title: "非遗星球", url: "/nonHeritagePlanet/nonHeritagePlanet" },
        { title: "数字展馆", url: "/exhibition/exhibitionHome" },
        { title: "创作者家园", url: "/DigitalArtwork/Work" },
        { title: "我的", url: this.$cookies.get('token') === null ? "/userProfile/login" : "/userProfile/userInfo" }
      ]
    }
  },
  methods: {
    changePage(item) {
      let url = "/exhibition" + item.url
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
div {
  margin: 0;
  padding: 0;
  font-size: 0;
}

#exhibitionHome {
  margin-top: 60px;
  width: 100%;
  min-width: 1400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-family: 'Songti SC', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 45px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  position: absolute;
  top: 45%;
  left: 35%;
  z-index: 1;
}
</style>