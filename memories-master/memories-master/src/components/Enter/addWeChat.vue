<template>
<div style="position: absolute;width: 100%">
  <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
  <div class="weChatContent">
    <div class="weChatFrame">
      <p class="chatTip">请发送内容至邮箱以方便进一步沟通</p>
      <p class="weChatNumber">ichreorder@163.com</p>
    </div>
  </div>
</div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
export default {
  name: "addWeChat",
  components: {
    jyTabBar
  },
  data() {
    return {
      pathTitle: [
        {name: "数字展馆", url: "/exhibition/exhibitionHome"},
        {name: "走进纪艺", url: "/exhibition/enter/menu"},
        {name: "传承人", url: ""}
      ],
    }
  }
}
</script>

<style scoped>
.weChatContent{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 1400px;
  margin-top: 180px;
}
.weChatFrame{
  width: 490px;
  height: 370px;
  border: 2px solid #393939;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.chatTip{
  font-family: 'Helvetica',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #363636;
}
.weChatNumber{
  font-family: 'Helvetica',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 37px;
  color: #143094;
  margin-top: 110px;
}
</style>