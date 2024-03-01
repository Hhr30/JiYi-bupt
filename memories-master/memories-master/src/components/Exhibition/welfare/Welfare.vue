<template>
<!--公益追溯-->
  <div id="welContent" style="width: 100%;min-width: 1400px">
    <div class="welfareContent">
      <div style="width: 1096px" v-if="imgInfo.length !== 0">
        <el-carousel indicator-position="outside" height="500px">
          <el-carousel-item v-for="(item, index) in imgInfo" :key="'info'+index">
            <div @click="enterInfo(item.infoPath)">
              <img :src="item.url" :alt="'ppt' + index" style="width: 1096px;height: 500px;object-fit: cover">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div id="workNumber" class="workNumber" v-if="imgInfo.length !== 0">
        <div class="everyTypeNum" v-for="(item, index) in NumberInfo">
          <div class="typeInfo">
            <p class="workNum">+{{item.num}}</p>
            <p class="workType">{{item.name}}</p>
          </div>
          <div class="gapLine" v-if="index !== NumberInfo.length - 1"></div>  <!--分割线-->
        </div>
      </div>
      <div class="welfareBottom">
        <div class="welfareSearch">
          <form class="welfareSearch">
            <div style="width: 560px;height: 55px;border: 1px solid #393939;display: flex;align-items: center;justify-content: center;">
              <input type="text" v-model="workInfo" style="width: 90%;height: 35px" class="progressInput"></input>
            </div>
            <input type="button" value="查看公益进程" class="progressButton" @click="search"></input>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welfare",
  methods: {
    search() {    //搜索事件

    },
    enterInfo(path) {
      this.$router.push({path: "/exhibition/welfare/info", query: {id: path}})
    }
  },
  data() {
    return  {
      NumberInfo: [
        {num: 7500, name: "累计收入"},
        {num: 110, name: "新增非遗作品"},
        {num: 10, name: "新增技艺传承人"}
      ],
      workInfo: "",
      imgInfo: [
        {url: "https://s1.ax1x.com/2022/06/25/jkwyKP.png", infoPath: ""},
        {url: "https://s1.ax1x.com/2022/06/25/jk02sx.png", infoPath: ""}
      ]
    }
  },
  created() {

  }
}
</script>

<style scoped>
.welfareContent{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  width: 100%;
  min-width: 1400px;
}
.imgContain{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 510px;
  width: 1200px;
}
.lastImg{
  width: 45px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.nextImg{
  width: 45px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.showImg{
  width: 1100px;
  height: 100%;
  display: flex;
  align-items: center;
}
.innerImg{
  width: 1100px;
  height: 100%;
  object-fit: cover;
}
.lastImgInner{
  width: 40px;
  height: 40px;
  object-fit: cover;
}
.workNumber{
  width: 1180px;
  height: 210px;
  background: #EBEBEB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.typeInfo{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 390px;
  height: 210px;
}
.workNum{
  font-family: 'DM Sans',sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 130%;
  color: #212529;
}
.workType{
  font-family: 'DM Sans',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #C71010;
  margin-top: 15px;
}
.gapLine{
  height: 85px;
  width: 1px;
  opacity: 0.5;
  background-color: #C71010;
}
.everyTypeNum{
  display: flex;
  height: 100%;
  align-items: center;
}
.welfareBottom{
  height: 300px;
  width: 100%;
  min-width: 1400px;
  display: flex;
  justify-content: center;
}
.welfareSearch{
  display: flex;
  align-items: center;
  height: 60px;
  margin-top: 65px;
}
.progressInput{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #252525;
  outline: none;
  border: none;
}
.progressButton{
  width: 165px;
  height: 58px;
  background: #393939;
  border: 1px solid #393939;
  cursor: pointer;
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #FFFFFF;

}
</style>