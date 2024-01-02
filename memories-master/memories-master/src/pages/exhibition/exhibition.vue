<template>
<div>
  <router-link to="/exhibition/exhibitionHome"></router-link>
  <router-link to="/exhibition/welfare"></router-link>
  <router-link to="/exhibition/digitalMall"></router-link>
  <router-link to="/exhibition/enter"></router-link>
  <router-link to="/exhibition/allWorks"></router-link>
  <div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import home from "@/components/Exhibition/home/home";
export default {
  name: "exhibition",
  components: {
    jyTabBar,
    home
  },
  data() {
    return {
      normalTitle: [
        {title: "首页", url: "/home"},
        {title: "数字展馆", url: "/exhibition/exhibitionHome"},
        {title: "创作者家园", url: "/DigitalArtwork"},
        {title: "我的", url: "/userProfile/" + this.$store.state.token === "" ? "login" : "userInfo"}
      ]
    }
  }
}
</script>

<style scoped>

</style>