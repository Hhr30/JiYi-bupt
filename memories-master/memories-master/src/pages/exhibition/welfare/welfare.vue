<template>
<!--公益追溯-->
  <div style="position: absolute;width: 100%;min-width: 1400px">
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <Welfare></Welfare>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import Welfare from "@/components/Exhibition/welfare/Welfare";
export default {
  name: "welfare",
  components: {
    jyTabBar,
    Welfare
  },
  data() {
    return {
      pathTitle: [
        {name: "数字展馆", url: "/exhibition/home"},
        {name: "公益追溯", url: ""}
      ]
    }
  }
}
</script>

<style scoped>

</style>