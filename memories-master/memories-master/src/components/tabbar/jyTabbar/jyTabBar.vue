<template>
<div id="jy-tabBar">
  <!--导航栏-->
  <div class="left" id="font">
    <div v-if="isBack" class="back" @click="back">返回</div>
    <div v-if="normalTitle.length !== 0" class="normalTitle"> <!--普通导航栏-->
      <div v-for="(item, index) in normalTitle" id="title1" class="normal" @click="page(item)">
        <p>{{item.title}}</p>
        <div class="tabBarBottom" :style="{backgroundColor: $route.fullPath.indexOf(item.url) !== -1 ? '#C71010' : '#ffffff',
         border: $route.fullPath.indexOf(item.url) !== -1 ? '2px solid #C71010' : '2px solid #ffffff'}"></div>
      </div><!--“我的”有点问题-->
    </div>
    <div style="margin-left: 50px" v-if="pathTitle.length !== 0">
      <div class="pathTitle">  <!--含路径的导航栏-->
        <div v-for="(item, index) in pathTitle" class="pathTitleText" @click="changePath(item)" :style="{cursor: item.url !== '' ? 'pointer' : 'default'}">
          {{ item.name }}{{ index!==pathTitle.length-1 ? ">" : "" }}
        </div>
      </div>
      <div class="tabBarBottom" style="background-color: #C71010;border: 2px solid #C71010"></div>
    </div>
  </div>
  <p class="center">
    纪 艺
  </p>
  <div class="right" id="font">
    <p>联系我们</p>
  </div>
</div>
</template>

<script>
export default {
  name: "jyTabBar",
  props: {
    normalTitle: {     //普通导航栏
      type: Array,
      default: () => {return []}
    },
    pathTitle: {       //含路径的导航栏
      type: Array,
      default: () => {return []}
    },
    isBack: {
      type: Boolean,   //是否显示返回
      default: true
    }
  },
  methods: {
    page(item) {   //页面跳转
      this.$router.push(item.url)
    },
    back() {
      window.history.back()
    },
    changePath(item) {
      if (item.url !== "") {
        this.$router.push(item.url)
      }
    }
  }
}
</script>

<style scoped>
#jy-tabBar{
  width: 100%;
  min-width: 1450px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 10;
}
#font{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #393939;
}
#title1 div{
  margin: 0;
}
p{
  font-family: 'Hind Vadodara',sans-serif;
}
.left{
  margin-left: 50px;
  display: flex;
  align-items: center;
  width: 350px;
}
.center{
  font-family: 'Songti SC',serif;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: 0.01em;

  color: #393939;
}
.right{
  width: 350px;
  margin-right: 50px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.normalTitle{
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tabBarBottom{
  height: 0;
  width: 21px;
}
.normal{
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}
.pathTitle{
  display: flex;
  align-items: center;
}
.pathTitleText{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #393939;
}
.back{
  cursor: pointer;
}
</style>