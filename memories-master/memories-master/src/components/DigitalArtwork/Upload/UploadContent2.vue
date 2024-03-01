<template>
  <div id="work-ensure">
    <div class="infoBox">
      <div class="tips">请仔细核对以下信息</div>
      <div class="infoItemBox" id="myInfo">
        <div style="display: flex;align-items: flex-start">
          <p style="width: 80px">作品名称：</p><p style="width: 170px">{{info.content.workName}}</p>
        </div>
        <div style="display: flex;align-items: flex-start;margin-top: 21px">
          <p style="width: 80px">作品类型：</p><p style="width: 170px">{{$route.query.workType}}</p>
        </div>
        <div style="display: flex;align-items: flex-start;margin-top: 21px">
          <p style="width: 80px">创作性质：</p><p style="width: 170px">{{createType}}</p>
        </div>
        <div style="display: flex;align-items: flex-start;margin-top: 21px">
          <p style="width: 80px">创作城市：</p><p style="width: 170px">{{City}}</p>
        </div>
        <div style="display: flex;align-items: flex-start;margin-top: 21px">
          <p style="width: 80px">创作国家：</p><p style="width: 170px">{{info.content.createCountry}}</p>
        </div>
        <div style="display: flex;align-items: flex-start;margin-top: 21px">
          <p style="width: 80px">创作时间：</p><p style="width: 170px">{{ Time }}</p>
        </div>
        <div style="display: flex;align-items: flex-start;margin-top: 21px">
          <p style="width: 80px">作品文件：</p><p style="width: 170px">{{$route.query.fileName}}</p>
        </div>
      </div>
    </div>
    <div class="next" @click="next">
      <button class="ensureBtn">确认</button>
    </div>
  </div>
</template>

<script>
import UploadContent1 from "@/components/DigitalArtwork/Upload/UploadContent1";
import { CodeToText } from 'element-china-area-data';
import {addWork} from "@/api";
export default {
  name: "UploadContent2",
  data() {
    return {
      nextPath: "/DigitalArtwork/upload/uploadcomplete",
      //receiveData: this.$route.query.dataInfo,
      selItemcat: ["文字","口述","音乐","戏剧","曲艺","舞蹈","杂技","美术","建筑","摄影","电影","类似摄制电影方法创作作品","工程设计图","产品设计图","地图、示意图","模型","录音作品","录像作品","其他作品"],
      cateAttr: [
        {name: "改编", isChoose: false},
        {name: "原创", isChoose: false},
        {name: "翻译", isChoose: false},
        {name: "汇编", isChoose: false},
        {name: "注释", isChoose: false},
        {name: "整理", isChoose: false},
        {name: "其他", isChoose: false}
      ],
      dataInfo: this.$route.query.dataInfo,
      info: {                         //要发送的数据
        status: this.$route.query.dataInfo.status,
        content: {
          workName: this.$route.query.dataInfo.content.workName,
          workType: this.$route.query.dataInfo.content.workType,   //文字
          createType: this.$route.query.dataInfo.content.createType,   //原创 or
          createCity: this.$route.query.dataInfo.content.createCity,
          createCountry: "中国",
          createDate: this.$route.query.dataInfo.content.createDate,
          workCreateTime: this.$route.query.dataInfo.content.createTime,
          workUpdateTime: this.$route.query.dataInfo.workUpdateTime,
          workId: this.$route.query.dataInfo.workId,
          fileUrl: this.$route.query.dataInfo.content.fileUrl
        }
      },
      displayInfo: {
        workName: this.$route.query.dataInfo.content.workName,
        createCity: this.City,
        createCountry: "中国"
      }
    }
  },
  computed:{
    City() {    //暂定
      let city = ""
      city += CodeToText[this.$route.query.dataInfo.content.createCity.slice(0,6)] + "-"
      city += CodeToText[this.$route.query.dataInfo.content.createCity.slice(6,12)] + "-"
      city += CodeToText[this.$route.query.dataInfo.content.createCity.slice(12)]
      return city
    },
    Time() {    //创作日期/时间
      let date = new Date(this.$route.query.dataInfo.content.createDate)
      let time = ""
      time = date.getFullYear() + "-" +(date.getMonth() + 1) + "-" + date.getDate()
      return time
    },
    createType() {
      console.log(this.$route.query.dataInfo)
      return this.cateAttr[this.$route.query.dataInfo.content.createType].name
    }
  },
  methods: {
    next() {
      let that = this
      addWork(this.info.toString()).then(function (res){
        if(res.status === 200){
          that.$router.push(that.nextPath).catch()     //页面跳转后悔报错，也不知道为什么
          console.log(res)
        }
      })
    }
  }
}
</script>

<style scoped>
#work-ensure{
  margin-top: 181px;
  position: relative;
  width: 100%;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.infoBox{
  width: 1019px;
  height: 497px;
  margin-top: 23px;

  background: #FFFFFF;
  border-radius: 11px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.tips{
  margin-top: 35px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #000000;
}
.infoItemBox{
  width: 250px;
  height: 259px;
  margin-top: 27px;
}
.infoItemText{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #595959;

}
.next{
  display: flex;
  flex-direction: row-reverse;
  width: 1021px;
  margin-top: 41px;
}
.ensureBtn{
  width: 183.89px;
  height: 54px;

  background: #326CC2;
  border-radius: 4px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #FFFFFF;
  border: none;
  cursor: pointer;
  margin-bottom: 109px;
}
#myInfo p{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #595959;

}
</style>