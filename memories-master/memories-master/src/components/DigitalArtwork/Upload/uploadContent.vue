<template>
  <div style="display: flex;flex-direction: column;width: 100%;align-items: center;min-width: 1400px;">
    <Progress :title-array="title" :status="status">
      <p slot="p-name">上传作品</p>
    </Progress>

    <div id="uploadContent" style="display: flex;width: 100%;min-width: 1400px;flex-direction: column;align-items: center">
      <div v-if="contentIndex === 0" style="width: 100%">
        <div id="work-info">
          <!--上传文件-->
          <input type="file" style="display: none" id="workFile" @change="selectFile($event)">   <!--文件-->
          <!---->
          <Item margin-top="23px">
            <p slot="itemName">作品</p>
            <div slot="itemType">
              <input class="iteminput" placeholder="请填写作品名称" required v-model="metadata.workName">
            </div>
          </Item>
          <Item>
            <p slot="itemName">作品类别</p>
            <el-select v-model="metadata.workType" placeholder="请选择作品类别" slot="itemType" :popper-append-to-body="false">
              <el-option v-for="(item, index) in workTypes"
                         :key="'workType'+index"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </Item>
          <Item>
            <p slot="itemName">作品性质</p>
            <tags :value-array="createTypes" tag-id="createTypes" slot="itemType" tag-width="91px" @getType="getCreateType"></tags>
          </Item>
          <Item>
            <p slot="itemName">创作城市</p>
            <div id="createCity" slot="itemType">
              <el-cascader
                  placeholder="请选择创作城市"
                  :options="province"
                  v-model="createCity"
                  :popper-append-to-body="false"
                  :append-to-body="false"
                  filterable>
              </el-cascader>
            </div>
          </Item>
          <Item>
            <p slot="itemName">创作国家</p>
            <div slot="itemType">
              <el-input placeholder="中国" v-model="metadata.createCountry" :disabled="true"></el-input>
            </div>
          </Item>
          <Item>
            <p slot="itemName">创作时间</p>
            <div slot="itemType">
              <el-date-picker v-model="workCreateTime" type="date" placeholder="请选择创作时间">
              </el-date-picker>
            </div>
          </Item>
          <Item box-height="175px">
            <p slot="itemName">作品文件</p>
            <div slot="itemType">
              <button @click="uploadFile" class="uploadBtn">上传</button>
              <div class="fileDelete">
                <p class="fileName">{{displayInfo.filename}}
                <p v-if="displayInfo.filename !==''" class="delete" @click="deleteFile">删除</p>
              </div>
            </div>
          </Item>
          <div class="next">
            <button class="nextBtn" @click="next">下一步</button>
          </div>
        </div>
      </div>
      <div v-if="contentIndex === 1" style="width: 100%">
        <div id="work-ensure">
          <div class="infoBox">
            <div class="tips">请仔细核对以下信息</div>
            <div class="infoItemBox" id="myInfo">
              <div style="display: flex;align-items: flex-start">
                <p style="width: 80px">作品名称：</p><p style="width: 170px">{{displayInfo.workName}}</p>
              </div>
              <div style="display: flex;align-items: flex-start;margin-top: 21px">
                <p style="width: 80px">作品类型：</p><p style="width: 170px">{{displayInfo.workType}}</p>
              </div>
              <div style="display: flex;align-items: flex-start;margin-top: 21px">
                <p style="width: 80px">创作性质：</p><p style="width: 170px">{{displayInfo.createType}}</p>
              </div>
              <div style="display: flex;align-items: flex-start;margin-top: 21px">
                <p style="width: 80px">创作城市：</p><p style="width: 170px">{{displayInfo.createCity}}</p>
              </div>
              <div style="display: flex;align-items: flex-start;margin-top: 21px">
                <p style="width: 80px">创作国家：</p><p style="width: 170px">{{displayInfo.createCountry}}</p>
              </div>
              <div style="display: flex;align-items: flex-start;margin-top: 21px">
                <p style="width: 80px">创作时间：</p><p style="width: 170px">{{displayInfo.createDate}}</p>
              </div>
              <div style="display: flex;align-items: flex-start;margin-top: 21px">
                <p style="width: 80px">作品文件：</p><p style="width: 170px">{{displayInfo.filename}}</p>
              </div>
            </div>
          </div>
          <div class="next" @click="next">
            <button class="ensureBtn">确认</button>
          </div>
        </div>
      </div>
      <div v-if="contentIndex === 2" style="width: 100%;">
        <finish-work>发起作品存证成功</finish-work>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "@/components/DigitalArtwork/Item";
import selectBar from "@/components/selectBar/selectBar";
import Tags from "@/components/tags/tags";
import Progress from "@/components/DigitalArtwork/Progress";
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import FinishWork from "@/components/DigitalArtwork/Finish/FinishWork";
import {updateWork, checkName} from "@/api";
import axios from "axios";
import {getWorkLists} from "@/api";
import {provinceAndCityData} from "element-china-area-data/dist/app";
import { CodeToText } from 'element-china-area-data';
import axio from "@/config";
export default {
  name: "uploadContent",
  data() {
    return {
      title: ["填写作品信息", "信息确认", "完成上传"],
      contentIndex: 0,      //下标
      metadata: {           //用于创建作品的json
        workName : "",
        workType: "",       //整数
        fileType: "",       //整数  1-图片 2-视频 3-音频 4-文档
        createCity: "",     //整数
        createType: "",     //整数
        createDate: "",     //整数
        createCountry: "中国"
      },
      creation: "",         //作品文件  用于创建作品
      workObject: {         //已经获得作品id
        workName: "",
        workType: "",        //字符串
        createCity: "",      //整数数据
        createType: "",      //整数
        createCountry: "中国",
        createDate: "",      //整数
        workId: ""           //整数
      },
      workTypes: [          //作品类型
        {label: "文字", value: 1},
        {label: "口述", value: 2},
        {label: "音乐", value: 3},
        {label: "戏剧", value: 4},
        {label: "曲艺", value: 5},
        {label: "舞蹈", value: 6},
        {label: "杂技", value: 7},
        {label: "美术", value: 8},
        {label: "建筑", value: 9},
        {label: "摄影", value: 10},
        {label: "电影", value: 11},
        {label: "类似摄制电影方法创作作品", value: 12},
        {label: "工程设计图，产品设计图", value: 13},
        {label: "地图，示意图", value: 15},
        {label: "模型", value: 17},
        {label: "录音作品", value: 19},
        {label: "录像作品", value: 20},
        {label: "其他作品", value: 181}
      ],
      createTypes: [                     //创作性质
        {name: "原创", isChoose: false, value: 0},
        {name: "改编", isChoose: false, value: 1},
        {name: "翻译", isChoose: false, value: 2},
        {name: "汇编", isChoose: false, value: 3},
        {name: "注释", isChoose: false, value: 4},
        {name: "整理", isChoose: false, value: 5},
        {name: "其他", isChoose: false, value: 6}
      ],
      province: provinceAndCityData,
      createCity: [],   //创作城市
      filename: "",
      status: 1,
      city: "",
      workCreateTime: "",       //作品创建时间
      displayInfo: {
        workName: "",
        workType: "",
        createType: "",
        createCity: "",
        createCountry: "中国",
        createDate: "",
        filename: ""
      }
    }
  },
  components: {
    Item,
    selectBar,
    Tags,
    FinishWork,
    Progress,
    jyTabBar
  },
  methods: {
    selectFile(e) {                                                                //上传文件事件
      if(document.getElementById("workFile").files.length!==0) {
        this.creation = e.target.files[0]                                            //获取url
        //console.log(this.data.content.fileUrl)
        this.displayInfo.filename = e.target.files[0].name
        if (e.target.files[0].type.indexOf("image") > -1) {
          this.metadata.fileType = 0
        }else if (e.target.files[0].type.indexOf("video") > -1) {
          this.metadata.fileType = 1
        }else if (e.target.files[0].type.indexOf("audio") > -1) {
          this.metadata.fileType = 2
        }else if (e.target.files[0].type.indexOf("application") >-1) {
          this.metadata.fileType = 3
        }
      }
    },
    getCreateType(index){                                                                       //作品类别数字化   文字balabala
      this.metadata.createType = index
      this.workObject.createType = index
    },
    uploadFile() {                                                                //上传文件
      document.getElementById("workFile").click()
    },
    deleteFile() {     //删除要上传的文件
      let file = document.getElementById("workFile")
      file.files = null
      this.metadata.fileType = ""
      this.displayInfo.filename = ""
      this.creation = ""
    },
    async next() {
      if (this.creation !== "") {    //一定要已经有文件信息才能保存文件
        if (this.createCity.length > 0 && this.metadata.workName !== "" && this.metadata.workType !== "" && this.workCreateTime !== "" && this.metadata.createType !== "" && this.metadata.fileType !== "") {
          if (this.checkNameLegal()) {
            await this.getCreateCity()                         //获得城市
            await this.Time()
            this.metadata.createDate = this.workCreateTime.getTime()
            this.displayInfo.workName = this.metadata.workName
            for (let i = 0; i < this.workTypes.length; i++) {
              if (this.metadata.workType === this.workTypes[i].value) {
                this.displayInfo.workType = this.workTypes[i].label
                break
              }
            }
            this.displayInfo.createType = this.createTypes[this.metadata.createType].name
            await this.City()
            if (this.status === 2) {
              let that = this
              let config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: this.$cookies.get('token')
                },
              }
              let param = new FormData();
              console.log(this.metadata)
              param.append("metadata", JSON.stringify(this.metadata));
              param.append("creation", this.creation);

              axio.post("/creation",param, config).then(function(res){
                console.log(res)
                if (res.status === 200) {
                  console.log(res)
                  //that.workObject.workId = res.data.data.workId
                  that.status++     //跳到信息确认界面
                  that.contentIndex++
                }
              }, function (err){
                console.log("检查")
              })
            }else {
              this.status++
              this.contentIndex++
            }
          }
        }
      }
    },
    async checkNameLegal() {    //检查作品名是否合法
      let flag = false
      await checkName(this.metadata.workName).then(res=>{
        if (res.data.data.legal) {
          flag = true
        }
      })
      return flag
    },
    getCreateCity() {     //获得城市的编码
      let City = ""
      City += this.createCity[1]
      this.metadata.createCity = City
      console.log(City)
    },
    City() {            //获得城市字符串
      let city = ""
      city += CodeToText[this.createCity[1]]
      this.displayInfo.createCity = city
    },
    Time() {    //创作日期/时间
      let date = new Date(this.workCreateTime)
      let time = ""
      time = date.getFullYear() + "-" +(date.getMonth() + 1) + "-" + date.getDate()
      this.displayInfo.createDate = time
    },

  }
}
</script>

<style scoped>
#work-info{
  margin-top: 181px;
  width: 100%;
  position: relative;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.iteminput{
  width: 370px;
  height: 43px;
  outline: none;
  font-size: 16px;
  border: 1px solid #848484;
  border-radius: 6px;
  padding: 0 20px;
}
.iteminput::-webkit-input-placeholder{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #A9A9A9;

}
.tags{
  display: flex;
  flex-wrap: wrap;
}

.fileDelete{
  display: flex;
  justify-content: space-between;
  width: 298px;
  height: 19px;
  margin-top: 19px;
}
.uploadBtn{
  width: 134px;
  height: 43px;

  background: #326CC2;
  border-radius: 4px;

  border: none;

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.275em;

  color: #FFFFFF;
  cursor: pointer;
}
.fileName{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #4B4B4B;

}
.delete{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;

  color: #EA5757;
}
.next{
  display: flex;
  flex-direction: row-reverse;
  width: 1021px;
  margin-top: 41px;
}
.nextBtn{
  width: 183.89px;
  height: 54px;
  background: #326CC2;
  border-radius: 4px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #FFFFFF;
  border: none;
  cursor: pointer;
  margin-bottom: 52px;
}
.keep{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #326CC2;
  cursor: pointer;
}

#work-info>>>.el-input__inner{
  box-sizing: border-box;

  width: 410px;
  height: 43px;
  border: 1px solid #848484;
  border-radius: 6px;

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

}
#work-info>>>.el-input__inner::placeholder{
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #A0A0A0;
}
#work-info>>>.el-select-dropdown{
  margin: 0;
  width: 410px;
  max-height: 274px;

  background: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #8C8C8C;
}
#work-info>>>.el-popper .popper__arrow{
  display: none;
}
#work-info>>>.el-select-dropdown__item{
  width: 410px;
  height: 35px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

  display: flex;
  align-items: center;

}.selected{
   font-family: 'Inter',sans-serif;
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   color: #000000;
 }
#work-info>>>.el-select-dropdown__item:hover{
  background-color: #DBDBDB;
}
#work-info>>>.el-select-dropdown__item.hover{
  background-color: #DBDBDB;
}

#work-info>>>.el-avatar .el-cascader-panel .el-radio .el-radio--medium.is-bordered .el-radio__label .el-radio__label{
  font-size: 16px;
}
#work-info>>>.el-cascader-menu{
  color: #070707;
  border-right: 1px solid #848484;
}
#work-info>>>.el-popper[x-placement^=bottom]{
  margin-top: 1px;
}
#work-info>>>.el-cascader__dropdown{
  font-size: 16px;
  background-color: #FFFFFF;
  border-color: #848484;
}
#work-info>>>.el-cascader-node.in-active-path, .el-cascader-node.is-active, .el-cascader-node.is-selectable.in-checked-path{
  color: #848484;
  font-weight: 500;
}
#work-info>>>.el-input.is-disabled .el-input__inner{
  background-color: #FFFFFF;
  color: #000000;
  border-color: #848484;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
#work-info>>>.el-input__prefix{
  display: none;
}
#work-info>>>.el-input__suffix-inner{
  display: none;
}
#work-info>>>.el-input::-webkit-scrollbar-thumb{
  width: 410px;
  height: 43px;
}

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
  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #595959;

}
</style>