<template>
  <div style="width: 100%;min-width: 1400px;position: absolute;display: flex;flex-direction: column;align-items: center;">
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <Progress :title-array="title" :status="status">
      <p slot="p-name">作品存证</p>
    </Progress>
    <router-link to="/DigitalArtwork/deposit/workInfo"></router-link>
    <router-link to="/DigitalArtwork/deposit/authorInfo"></router-link>
    <router-link to="/DigitalArtwork/deposit/confirmInfo"></router-link>
    <router-link to="/DigitalArtwork/deposit/complete"></router-link>
    <router-view ref="children"></router-view>


  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import Progress from "@/components/DigitalArtwork/Progress";

export default {
  components: { jyTabBar, Progress },
  name: 'DepositAdd',
  data() {
    return{
      pathTitle: [
        {name: "创作者家园", url: "/DigitalArtwork/Work"},
        {name: "作品存证", url: ""}
      ],
      title: ["填写作品信息","编辑作者信息","信息确认","完成上传"],
    }
  },
  methods: {

  },
  created() {
  },
  computed: {
    status() {
      if(this.$route.fullPath.indexOf("/DigitalArtwork/deposit/workInfo") !== -1){
        return 1
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/deposit/authorInfo") !== -1){
        return 2
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/deposit/confirmInfo") !== -1){
        return 3
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/deposit/complete") !== -1){
        return 4
      }
    }
  }
}
</script>

<style scoped>

</style>