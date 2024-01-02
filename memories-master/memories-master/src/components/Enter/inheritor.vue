<template>
<!--我是传承者-->
  <div style="position: absolute;width: 100%">
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <div class="inheritorContent">
      <div class="searchName">
        <form style="display: flex;align-items: center">
          <div class="searchFrame">
            <input type="text" class="searchInput"></input>
          </div>
          <input type="button" value="搜索" class="searchInheritorBtn"></input>
        </form>
      </div>
      <div style="margin-top: 100px;display: flex;flex-direction: column;align-items: center">
        <div id="searchResult" class="searchResult" v-if="searchResult.length!==0">查询到{{searchResult.length}}条结果</div>
        <div v-for="(item, index) in searchResult" class="resultDisplay" :key="'search'+index">
          <div class="displayLeft">
            <img :src="item.img" class="resultImg" :alt="'img'+index">
          </div>
          <div class="displayRight">
            <div class="rightUp">
              <p style="margin-top: 25px;margin-left: 40px" class="itemNameText">{{item.name}}</p>
              <p style="margin-top: 8px;margin-left: 40px" class="itemTimeText">上线时间：{{item.time}}</p>
            </div>
            <div class="rightDown">
              <p class="reply">去申请</p>
            </div>
          </div>
        </div>
        <div id="unsearchResult" class="searchResult" v-if="searchResult.length===0">未查询到任何结果</div>
        <div class="unsearchDisplay" v-if="searchResult.length===0" @click="addWeChat">
          <div class="unsearchInner">
            <img src="https://s1.ax1x.com/2022/06/25/jFTFHg.png" alt="unsearch" class="unsearchImg">
            <p class="toCreate">去创建</p>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 420px;width: 100%;min-width: 1400px"></div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
export default {
  name: "inheritor",
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
      // searchResult: [
      //   {img: "https://s1.ax1x.com/2022/06/25/jkLFPg.png", name: "枫香染", time: "2022-5-20", id: "123456"}
      // ],
      result: "",
      searchResult: []
    }
  },
  methods: {
    addWeChat() {
      this.$router.push("/exhibition/enter/weChat")
    }
  }
}
</script>

<style scoped>
.inheritorContent{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 240px;
}
.searchName{
  display: flex;
}
.searchFrame{
  width: 600px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #393939;
}
.searchInput{
  height: 30px;
  width: 540px;
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #313131;
  border: none;
  outline: none;
}
.searchInheritorBtn{
  width: 160px;
  height: 58px;
  background: #393939;
  border: 1px solid #393939;
  font-family: 'Hind Vadodara',ui-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 1.185em;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.searchResult{
  width: 760px;
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 159.3%;
  letter-spacing: 0.165em;
  text-transform: uppercase;
  color: #8D8D8D;
}
.resultDisplay{
  display: flex;
  width: 760px;
  height: 220px;
  background: #FFFFFF;
  border: 1px solid #ECECEC;
  margin-top: 15px;
}
.resultImg{
  width: 380px;
  height: 220px;
  object-fit: cover;
}
.displayRight{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 380px;
  height: 220px;

}
.rightDown{
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  margin-bottom: 20px;
}
.displayLeft{
  width: 380px;
  height: 220px;
}
.reply{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;
  letter-spacing: 0.135em;
  text-transform: uppercase;
  color: #143094;
  margin-right: 28px;
  cursor: pointer;
}
.itemNameText{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 159.3%;
  letter-spacing: 0.165em;
  text-transform: uppercase;
  color: #000000;
}
.itemTimeText{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #878787;
}
.unsearchDisplay{
  width: 760px;
  height: 160px;
  border: 2px solid #393939;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  cursor: pointer;
}
.unsearchInner{
  display: flex;
  align-items: center;
}
.unsearchImg{
  width: 40px;
  height: 40px;
  object-fit: cover;
}
.toCreate{
  font-family: 'Helvetica',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #143094;
  margin-left: 22px;
}
</style>