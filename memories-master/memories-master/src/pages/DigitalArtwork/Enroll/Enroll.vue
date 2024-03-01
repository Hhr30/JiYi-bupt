<template>
  <div id="enroll-authority">
    <!--进度条-->
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <Progress :title-array="title" :status="status">
      <p slot="p-name">版权注册</p>
    </Progress>
    <!--进度条以下的内容-->
    <div id="route">
      <router-link to="/DigitalArtwork/enroll/unit"></router-link>
      <router-link to="/DigitalArtwork/enroll/info"></router-link>
      <router-link to="/DigitalArtwork/enroll/status"></router-link>
      <router-link to="/DigitalArtwork/enroll/finish"></router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Progress from "@/components/DigitalArtwork/Progress";
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
export default {
  name: "Enroll",
  components: {
    Progress,
    jyTabBar
  },
  data() {
    return {
      title: ["填写版权单元","填写约束信息","填写版权状态","完成上传"],
      pathTitle: [
        {name: "创作者家园", url: "/DigitalArtwork/Work"},
        {name: "版权注册", url: ""}
      ]
    }
  },
  computed: {
    status() {
      if(this.$route.fullPath.indexOf("/DigitalArtwork/enroll/unit") !== -1){
        return 1
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/enroll/info") !== -1){
        return 2
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/enroll/status") !== -1){
        return 3
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/enroll/finish") !== -1){
        return 4
      }
    }
  }
}
</script>

<style scoped>
@import "../../../assets/css/DigitalArtwork/enroll.css";
</style>