<template>
  <div id="upload-work">
    <!--上传作品-->
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <upload-content></upload-content>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import uploadContent from "@/components/DigitalArtwork/Upload/uploadContent";
export default {
  name: "Upload",
  components: {
    uploadContent,
    jyTabBar
  },
  data() {
    return {
      pathTitle: [
        {name: "创作者家园", url: "/DigitalArtwork/Work"},
        {name: "上传作品", url: ""}
      ],
    }
  }
}
</script>

<style scoped>
#upload-work{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 1400px;
  position: absolute;
}
</style>