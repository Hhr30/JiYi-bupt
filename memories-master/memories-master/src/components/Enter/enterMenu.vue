<template>
<div style="position: absolute;width: 100%">
  <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
  <div class="enterMenu">
    <div class="titleLine"></div>
    <div class="enterMenuItem">
      <div v-for="(item, index) in items" class="EnterItem" :style="{backgroundColor: item.isSelected ? '#20347C' : ''}" @mouseenter="enterEnter(index)" @mouseleave="enterLeave(index)" @click="changePage(index)">
        <img :src="item.isSelected ? item.selectImg : item.unselectImg" :alt="'img'+index" class="enterImg">
        <p class="textTitle" :style="{color: item.isSelected ? '#ffffff' : '#143094'}">{{ item.title }}</p>
        <p class="textTip" :style="{color: item.isSelected? '#ffffff' : '#848484'}">{{ item.text }}</p>
      </div>
      <!--<div class="enterItem" id="enter1" @mouseenter="enterEnter('enter1')" @mouseleave="enterLeave('enter1')" @click="changePage(0)">
        <img src="https://s1.ax1x.com/2022/06/24/jFUfFs.png" alt="interImg1" class="enterImg" id="enter11">
        <img src="https://s1.ax1x.com/2022/06/25/jk75KP.png" alt="interImg1" class="enterImg" id="enter12" style="display: none">
        <p class="enterTextTitle" id="enter13">我是传承人</p>
        <p class="enterTextTip" id="enter14">我是非物质文化遗产的传承人</p>
      </div>
      <div class="enterItem" id="enter2" @mouseenter="enterEnter('enter2')" @mouseleave="enterLeave('enter2')" @click="changePage(0)">
        <img src="https://s1.ax1x.com/2022/06/25/jFTFHg.png" alt="interImg1" class="enterImg" id="enter21">
        <img src="https://s1.ax1x.com/2022/06/25/jFXJe0.png" alt="interImg1" class="enterImg" id="enter22" style="display: none">
        <p class="enterTextTitle" id="enter23">我是创作者</p>
        <p class="enterTextTip" id="enter24">我想加入非遗数字作品的创作</p>
      </div>-->
    </div>
    <div class="enterMenuBottom"></div>
  </div>
</div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
export default {
  name: "enterMenu",
  components: {
    jyTabBar
  },
  data() {
    return {
      pathTitle: [
        {name: "数字展馆", url: "/exhibition/exhibitionHome"},
        {name: "走进纪艺", url: ""}
      ],
      items: [
        {unselectImg: "https://s1.ax1x.com/2022/06/24/jFUfFs.png", selectImg: "https://s1.ax1x.com/2022/06/25/jk75KP.png", isSelected: false, path: "/exhibition/enter/inheritor", title: "我是传承人", text: "我是非物质文化遗产的传承人"},  //传承人
        {unselectImg: "https://s1.ax1x.com/2022/06/25/jFTFHg.png", selectImg: "https://s1.ax1x.com/2022/06/25/jFXJe0.png", isSelected: false, path: "/exhibition/enter/creator", title: "我是创作者", text: "我想加入非遗数字作品的创作"},  //创作者
        {unselectImg: "https://s1.ax1x.com/2022/07/25/jxmBkD.png", selectImg: "https://s1.ax1x.com/2022/07/25/jxm61A.png", isSelected: false, path: "/exhibition/enter/campus", title: "我是高校", text: "我是来自高校的志愿者"},  //高校
        {unselectImg: "https://s1.ax1x.com/2022/07/25/jxmt61.png", selectImg: "https://s1.ax1x.com/2022/07/25/jxmd0K.png", isSelected: false, path: "/exhibition/enter/program", title: "了解程序", text: "我想进一步了解纪艺项目"}   //了解程序
      ]
    }
  },
  methods: {
    enterEnter(index) {    //鼠标移开
      this.items[index].isSelected = true

    },
    enterLeave(index) {
      this.items[index].isSelected = false

    },
    changePage(index) {
      this.$router.push(this.items[index].path)

    }
  }
}
</script>

<style scoped>
.enterMenu{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  width: 100%;
}
.titleLine{
  width: 480px;
  height: 1.5px;
  background-color: #A5A5A5;
  margin-top: 70px;
}
.enterMenuItem{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-top: 110px;
  flex-wrap: wrap;
}
.EnterItem{
  width: 370px;
  height: 335px;
  border: 2px solid #393939;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
}
.enterItem{
  width: 500px;
  height: 500px;
  border: 2px solid #393939;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.leaveItem{
  width: 500px;
  height: 500px;
  border: 2px solid #393939;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #20347C;
}
.enterImg{
  width: 65px;
  height: 65px;
  object-fit: cover;
}
.textTitle{
  font-family: 'Helvetica',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 200%;
  line-height: 37px;
  margin-top: 55px;
}
.textTip{
  font-family: 'Helvetica',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 100%;
  line-height: 18px;
  color: #848484;
  margin-top: 15px;
}
.enterTextTip{
  font-family: 'Helvetica',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #848484;
  margin-top: 15px;
}
.enterMenuBottom{
  height: 100px;
  width: 100%;
}
</style>