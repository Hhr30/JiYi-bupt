<template>
  <!--导航-->
  <div style="display: flex;flex-direction: column;align-items: center">
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar><!--发起登记确权-->
    <Progress :title-array="title" :status="status">
      <p slot="p-name">发起登记确权</p>
    </Progress>
    <router-link to="/DigitalArtwork/registerRight/add"></router-link>  <!--主体信息-->
    <router-link to="/DigitalArtwork/registerRight/objectInfo"></router-link>  <!--客体信息-->
    <router-link to="/DigitalArtwork/registerRight/materials"></router-link>   <!--上传证明材料-->
    <router-link to="/DigitalArtwork/registerRight/complete"></router-link>   <!--完成上传-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import Progress from "@/components/DigitalArtwork/Progress";
export default {
  name: "register",
  components: {jyTabBar, Progress},
  data() {
    return {
      pathTitle: [
        {name: "创作者家园", url: "/DigitalArtwork/Work"},
        {name: "登记确权", url: ""}
      ],
      title: ["填写主体信息","填写客体信息","上传证明材料","完成上传"],
    }
  },
  computed: {
    status() {
      if(this.$route.fullPath.indexOf("/DigitalArtwork/registerRight/add") !== -1){
        return 1
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/registerRight/objectInfo") !== -1){
        return 2
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/registerRight/materials") !== -1){
        return 3
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/registerRight/complete") !== -1){
        return 4
      }
    }
  }
}
</script>

<style scoped>

</style>