<template>
  <div style="display: flex;flex-direction: column;align-items: center">
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <Progress :title-array="title" :status="status">
      <p slot="p-name">编辑主体信息</p>
    </Progress>
    <router-link to="/DigitalArtwork/registerMain/basicInfo"></router-link>
    <router-link to="/DigitalArtwork/registerMain/refineMat"></router-link>
    <router-link to="/DigitalArtwork/registerMain/collection"></router-link>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import RegisterMain from '@/components/DigitalArtwork/Register/RegisterMain.vue'
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import Progress from "@/components/DigitalArtwork/Progress";
export default {
  name: "registerMain",
  components: {
    RegisterMain,
    jyTabBar,
    Progress
  },
  data() {
    return {
      pathTitle: [
        {name: "创作者家园", url: "/DigitalArtwork/Work"},
        {name: "登记确权", url: ""}
      ],
      title: ["填写基本信息","完善身份证明材料","填写权利集合"],
    }
  },
  methods: {
    back() {
      this.$router.push("/DigitalArtwork/registerRight/add")
    }
  },
  created() {
    console.log(this.$route.query.userInfo)

  },
  computed: {
    status() {
      if(this.$route.fullPath.indexOf("/DigitalArtwork/registerMain/basicInfo") !== -1){
        return 1
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/registerMain/refineMat") !== -1){
        return 2
      }
      if(this.$route.fullPath.indexOf("/DigitalArtwork/registerMain/collection") !== -1){
        return 3
      }
    }
  }
}
</script>

<style scoped>

</style>