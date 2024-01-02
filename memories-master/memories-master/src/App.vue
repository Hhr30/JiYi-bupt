<template>
  <div id="app">
    <router-link to="/DigitalArtwork"></router-link>
    <router-link to="/home"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import TabBar from "@/components/tabbar/DigitalArtwork/TabBar";
import TabBarItem from "@/components/tabbar/DigitalArtwork/TabBarItem";
export default {
  name: 'App',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>
html, body{
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
#app{
  height: 100%;
  width: 100%;
}
</style>
