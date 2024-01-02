<template xmlns="http://www.w3.org/1999/html">
  <div id="work-info">
    <!--上传文件-->
    <input type="file" style="display: none" id="workFile" @change="selectFile">
    <!---->
    <Item margin-top="23px">
      <p slot="itemName">作品</p>
      <div slot="itemType">
        <input class="iteminput" placeholder="请填写作品名称" required v-model="data.content.workName">
      </div>
    </Item>
    <Item>
      <p slot="itemName">作品类别</p>
      <el-select v-model="workCate" placeholder="请选择作品类别" slot="itemType" :popper-append-to-body="false">
        <el-option v-for="(item, index) in selItemcat"
                   :key="'Cate'+index"
                   :label="item"
                   :value="item"></el-option>
      </el-select>
    </Item>
    <Item>
      <p slot="itemName">作品性质</p>
      <tags :value-array="cateAttr" tag-id="cateAttr" slot="itemType" tag-width="91px" @getType="getCreateType"></tags>
    </Item>
    <Item>
      <p slot="itemName">创作城市</p>
      <div id="createCity" slot="itemType">
        <el-cascader
            placeholder="请选择创作城市"
            :options="province"
            v-model="chooseCity"
            :popper-append-to-body="false"
            :append-to-body="false"
            filterable>
        </el-cascader>
      </div>
    </Item>
    <Item>
      <p slot="itemName">创作国家</p>
      <div slot="itemType">
        <el-input placeholder="中国" v-model="data.content.createCountry" :disabled="true"></el-input>
      </div>
    </Item>
    <Item>
      <p slot="itemName">创作时间</p>
      <div slot="itemType">
        <el-date-picker v-model="date" type="date" placeholder="请选择创作时间">
        </el-date-picker>
      </div>
    </Item>
    <Item box-height="175px">
      <p slot="itemName">作品文件</p>
      <div slot="itemType">
        <button @click="uploadFile" class="uploadBtn">上传</button>
        <div class="fileDelete">
          <p class="fileName">{{uploadDoc.name}}
          <p v-if="uploadDoc.name!==''" class="delete" @click="deleteFile">删除</p>
        </div>
      </div>
    </Item>
    <div class="next">
      <button class="nextBtn" @click="next">下一步</button>
      <p class="keep" @click="saveDraft">保存草稿</p>
    </div>

  </div>
</template>

<script>

import Item from "@/components/DigitalArtwork/Item";
import selectBar from "@/components/selectBar/selectBar";
import tags from "@/components/tags/tags";
import Tags from "@/components/tags/tags";
import {createProvince} from "@/functions";
import {updateWork} from "@/api";
import axios from "axios";
import {getWorkLists} from "@/api";
import {regionData} from "element-china-area-data/dist/app";
import {CodeToText} from "element-china-area-data"
//let province = createProvince()

export default {
  name: "UploadContent1",
  data() {
    return {
      nextPath: "/DigitalArtwork/upload/ensureinfo",
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
      uploadDoc: {   //以防要加参数，先用对象表示
        name: ""
      },
      province: regionData,
      chooseCity: [],
      workCate: "",
      country: "中国",
      date: "",
      data: {
        content: {
          createCity: "",           //可用parseInt直接转成数据      */////////////////////////
          createCountry: "中国",
          createDate: 0,            //创作日期           *
          createType: -1,           //创作类别 原创 改编   *
          fileUrl: "",              //文件路径           *
          thumbnailUrl: "132456",   //文件略缩图  ？？？
          workCreateTime: 129519647,//作品创建时间 ？？？
          workName: "",             //作品名字            *
          workType: 0               //作品类型 文字、口述等 *
        },
        status: "laboris elit qui",
        workId: 90,
        workUpdateTime: 0           //作品更新时间
      }

    }
  },
  computed: {

  },
  components: {
    Tags,
    Item,
    selectBar
  },
  methods: {
    chooseAttr(index) {                                                           //修改作品性质 颜色变换  好像用不上了...
      this.cateAttr[index].isChoose = this.cateAttr[index].isChoose === false
    },
    uploadFile() {                                                                //上传文件
      document.getElementById("workFile").click()
    },
    selectFile() {                                                                //上传文件事件
      if(document.getElementById("workFile").files.length!==0) {
        let doc = document.getElementById("workFile").files[0]
        this.data.content.fileUrl = window.URL.createObjectURL(doc)               //获取url
        //console.log(this.data.content.fileUrl)
        this.uploadDoc.name = doc.name
      }

    },
    deleteFile() {     //删除要上传的文件
      var file = document.getElementById("workFile")
      file.files = null
      this.uploadDoc.name = ""
      this.data.content.fileUrl = ""
    },
    next() {    //下一步  同时自动保存草稿
      let that = this
      let list = getWorkLists()

      let flag = true      //时间
      list.then(function (res){
        for(let i = 0; i < res.data.length; i++) {
          if(res.data[i].workId === that.workId) {
            flag = false
            break
          }
        }
        if(flag){                                                                                //若ID不存在   ？？更新时间和创建时间的关系没搞懂
          that.data.workUpdateTime = that.data.content.workCreateTime = (new Date()).getTime()   //作品更新时间即作品创作时间
        }else{
          that.data.workUpdateTime = (new Date()).getTime()                                      //作品创建时间
        }
      })
      this.data.content.createCity = this.getCreateCity()                                        //城市数据
      try {                                                                                      //作品创建日期
        this.data.content.createDate = this.date.getTime()
      }catch (e) {
        this.data.content.createDate = ""
      }
      this.data.content.workType = this.transferWorkType(this.workCate)                          //作品类型数字化

      axios.put("http://127.0.0.1:4523/mock/879662/creation",that.data).then(function(response){
        //console.log(response)
        if(response.status === 200) {
          if (that.data.content.createCity.length !== 0 && that.data.content.fileUrl !== "") {          //好乱...
            that.$router.replace({
              path: that.nextPath,
              query: {dataInfo: that.data, workType: that.workCate, fileName: that.uploadDoc.name}
            }).catch()
          }
        }
      },
      function (err){
        console.log("检查")
      })
    },
    saveDraft(){                                             //保存草稿
      let that = this
      let list = getWorkLists()

      let flag = true                                        //时间
      list.then(function (res){
        for(let i = 0; i < res.data.length; i++) {           //检查作品是否已经存在
          if(res.data[i].workId === that.workId) {
            flag = false
            break
          }
        }
        if(flag){                                                                                //若ID不存在   ？？更新时间和创建时间的关系没搞懂
          that.data.workUpdateTime = that.data.content.workCreateTime = (new Date()).getTime()   //作品更新时间即作品创作时间
        }else{
          that.data.workUpdateTime = (new Date()).getTime()                                      //作品创建时间
        }
      })
      this.data.content.createCity = this.getCreateCity()                                        //城市数据
      try {                                                                                      //作品创建日期
        this.data.content.createDate = this.date.getTime()
      }catch (e) {
        this.data.content.createDate = ""
      }
      this.data.content.workType = this.transferWorkType(this.workCate)                          //作品类型数字化
      console.log(this.data)
      updateWork(that.data.toString()).then(function(response){
        console.log(response)
      },
      function (err){
        console.log("检查")
      }
      )
    },
    transferWorkType(typeName){    //作品类型数字化转换  文字、口述......
      for(let i = 0; i < this.selItemcat.length; i++) {
        if(typeName === this.selItemcat[i]){
          return i + 1
        }
      }
      return null
    },
    getCreateType(index){                                                                       //作品类别数字化   文字balabala
      this.data.content.createType = index
    },
    getCreateCity() {
      let City = ""
      for(let i = 0; i < this.chooseCity.length; i++){
        City += this.chooseCity[i]
      }
      return City
    }
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
  font-family: 'Inter';
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

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.275em;

  color: #FFFFFF;
  cursor: pointer;
}
.fileName{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #4B4B4B;

}
.delete{
  font-family: 'Inter';
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
  justify-content: space-between;
}
.nextBtn{
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
  margin-bottom: 52px;
}
.keep{
  font-family: 'Inter';
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

  font-family: 'Inter';
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
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

  display: flex;
  align-items: center;

}.selected{
   font-family: 'Inter';
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
  font-family: 'Inter';
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
</style>