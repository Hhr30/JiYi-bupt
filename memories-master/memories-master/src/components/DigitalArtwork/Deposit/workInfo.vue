<template>
<!--填写作品信息-->
  <div id="depositInfo">
    <div class="keepSuccessBack" v-if="success">
    </div>
    <!--保存草稿-->
    <div class="resultCard" v-if="success">
      <div style="display: flex;align-items: center;margin-top: 30px">
        <img src="https://s1.ax1x.com/2022/06/27/jEDZHx.png" alt="ensure" class="successLogo">
        <p class="successText1">草稿保存成功！</p>
      </div>
      <div class="successTip">您可以在我的——作品管理或作品存证首页查看</div>
      <div style="display: flex;flex-direction: row-reverse;width: 85%;margin-top: 45px">
        <p @click="ensure" class="windowSure">确定</p>
      </div>
    </div>
    <!--正文内容-->
    <el-form style="width: 100%;display: flex; flex-direction: column;align-items: center;" :popper-append-to-body="false">
      <Item>
        <p slot="itemName">作品</p>
        <div slot="itemType">
          <el-select v-model="workName" placeholder="请输入作品名称/平台编号进行搜素" @change="queryWork" :popper-append-to-body="false" filterable>
            <el-option
                v-for="(item, index) in works"
                :key="index"
                :label="item.workName"
                :value="index">
            </el-option>
          </el-select>
        </div>
      </Item>
      <Item>
        <p slot="itemName">作品类别</p>
        <div slot="itemType">
          <el-input
              :popper-append-to-body="false"
              placeholder="作品类别"
              v-model="editForm.workType"
              :disabled="true">
          </el-input>
        </div>
      </Item>
      <Item>
        <p slot="itemName">作品性质</p>
        <div slot="itemType">
          <div>
            <tags :value-array="createTypes" tag-id="createType" slot="itemType" tag-width="90px" :is-disabled="true" ref="createType"></tags>
          </div>
        </div>
      </Item>
      <Item>
        <p slot="itemName">创作城市</p>
        <div slot="itemType">
          <el-input
              placeholder="创作城市"
              v-model="editForm.createCity"
              :disabled="true">
          </el-input>
        </div>
      </Item>
      <Item>
        <p slot="itemName">创作国家</p>
        <div slot="itemType">
          <el-input
              :popper-append-to-body="false"
              placeholder="创作国家"
              v-model="editForm.createCountry"
              :disabled="true">
          </el-input>
        </div>
      </Item>
      <Item>
        <p slot="itemName">创作时间</p>
        <div slot="itemType">
          <el-input
              :popper-append-to-body="false"
              placeholder="创作时间"
              v-model="editForm.createDate"
              :disabled="true">
          </el-input>
        </div>
      </Item>
      <Item>
        <p slot="itemName">作品文件</p>
        <div slot="itemType">
          <div style="display: flex;align-items: center;justify-content: space-between;width: 300px;margin-top: 23px">
            <p class="fileText">{{editForm.fileName}}</p>
            <p class="download">下载</p>
          </div>
        </div>
      </Item>
      <Item>
        <p slot="itemName">著作权产生方式</p>
        <div slot="itemType">
          <tags :value-array="copyrightCreateTypes" tag-id="copyrightCreateTypes" slot="itemType" tag-width="92px" id="copyrightCreateType" @getType="getTheType"></tags>
        </div>
      </Item>
      <div class="depositInfoBottom">
        <el-button type="text" class="keepDraft" @click="keepDraft">保存草稿</el-button>
        <el-button type="primary" class="depositNext" @click="next">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getWorkLists, getUserInfoByName, getUserInfoByNumber, launchDeposit, updateDeposit } from '@/api.js'
import Item from "@/components/DigitalArtwork/Item";
import Tags from "@/components/tags/tags";
import { CodeToText } from 'element-china-area-data';  //编码变城市
export default {
  name: "workInfo",
  components: {
    Item,
    Tags
  },
  data() {
    return {
      createTypes: [
        {name: "原创", isChoose: false},
        {name: "改编", isChoose: false},
        {name: "翻译", isChoose: false},
        {name: "汇编", isChoose: false},
        {name: "注释", isChoose: false},
        {name: "整理", isChoose: false},
        {name: "其他", isChoose: false}
      ],
      copyrightCreateTypes: [
        {name: "个人", isChoose: false},
        {name: "合作", isChoose: false},
        {name: "法人", isChoose: false},
        {name: "职务", isChoose: false},
        {name: "委托", isChoose: false}
      ],
      Info: {                       //更新作品存证使用
        copyrightCreateType: -1,    //著作权产生方式 0-个人1-合作2-法人3-职务4-委托
        createType: -1,             //创作性质 0-原创1-改编2-翻译3-汇编4-注释5-整理6-其他
        createCity: 0,              //创作城市 按城市号码表传，精确到市级
        createCountry: "中国",       //
        createDate: 0,              //
        authorInfos: [],            //
        workId: ""                  //
      },
      dataContent: {                //获取的作品数据
        content: {
          workName: "",
          workType: 0,
          createType: 0,
          createCity: 0,
          createCountry: "",
          createDate: 0,
          workCreateTime: 0,
          workUpdateTime: 0,
          fileUrl: ""
        },
        workId: "",
      },
      workName: '',
      editForm: {                  //用于显示在页面儿中的数据的
        workName: '',
        workType: '',              //作品类别
        createType: -1,            //创作性质
        createCity: '',
        createCountry: '',
        createDate: '',
        fileUrl: '',              //作品文件？？？名儿呢
        fileName: '',
        copyrightCreateType: '',
        authorInfos: [],
        workId: ''
      },
      works: [],   //作品列表
      success: false
    }
  },
  methods: {
    async getWorkOptions() {    //获得作品的列表
      try {
        let that = this
        let v = await getWorkLists()
        console.log(v)
        v.data.data.forEach(item => {   //遍历
          that.works.push({
            workId: item.workId,
            createCity: item.content.createCity,
            createCountry: item.content.createCountry,
            createDate: item.content.createDate,
            createType: item.content.createType,
            fileUrl: item.content.fileUrl,
            workCreateTime: item.workCreateTime,
            workName: item.content.workName,
            workType: item.content.workType,
            workUpdateTime: item.content.workUpdateTime
          })
        });
      } catch (e) {
        //console.log(e)
      }
    },
    queryWork() {
      this.editForm.workName = this.works[this.workName].workName
      this.dataContent.content.workName = this.works[this.workName].workName
      this.dataContent.content.workType = this.works[this.workName].workType
      this.dataContent.content.createType = this.works[this.workName].createType
      this.dataContent.content.createCountry = this.works[this.workName].createCountry
      this.dataContent.content.createDate = this.works[this.workName].createDate
      let t = -1     //修改创作类型
      //处理作品类别
      switch (this.dataContent.content.workType) {              //处理作品类别
        case 1:{
          this.editForm.workType = "文学"
          break
        }
        case 2:{
          this.editForm.workType = "口述"
          break
        }
        case 3:{
          this.editForm.workType = "音乐"
          break
        }
        case 4:{
          this.editForm.workType = "戏剧"
          break
        }
        case 5:{
          this.editForm.workType = "曲艺"
          break
        }
        case 6:{
          this.editForm.workType = "舞蹈"
          break
        }
        case 7:{
          this.editForm.workType = "杂技"
          break
        }
        case 8:{
          this.editForm.workType = "美术"
          break
        }
        case 9:{
          this.editForm.workType = "建筑"
          break
        }
        case 10:{
          this.editForm.workType = "摄影"
          break
        }
        case 11:{
          this.editForm.workType = "电影"
          break
        }
        case 12:{
          this.editForm.workType = "类似摄制电影方法创作作品"
          break
        }
        case 13:{
          this.editForm.workType = "工程设计图，产品设计图"
          break
        }
        case 15:{
          this.editForm.workType = "地图，示意图"
          break
        }
        case 17:{
          this.editForm.workType = "模型"
          break
        }
        case 19:{
          this.editForm.workType = "录音作品"
          break
        }
        case 20:{
          this.editForm.workType = "录像作品"
          break
        }
        case 181:{
          this.editForm.workType = "录像作品"
          break
        }
        default: {
          this.editForm.workType = "文学"
        }
      }
      //处理创作性质
      switch (this.dataContent.content.createType) {
        case 0: {
          this.editForm.createType = this.dataContent.content.createType
          this.createTypes[0].isChoose = true
          t = 0
          break
        }
        case 1: {
          this.editForm.createType = this.dataContent.content.createType
          this.createTypes[1].isChoose = true
          t = 1
          break
        }
        case 2: {
          this.editForm.createType = this.dataContent.content.createType
          this.createTypes[2].isChoose = true
          t = 2
          break
        }
        case 3: {
          this.editForm.createType = this.dataContent.content.createType
          this.createTypes[3].isChoose = true
          t = 3
          break
        }
        case 4: {
          this.editForm.createType = this.dataContent.content.createType
          this.createTypes[4].isChoose = true
          t = 4
          break
        }
        case 5: {
          this.editForm.createType = this.dataContent.content.createType
          this.createTypes[5].isChoose = true
          t = 5
          break
        }
        case 6: {
          this.editForm.createType = this.dataContent.content.createType
          this.createTypes[6].isChoose = true
          t = 6
          break
        }
        default: {
          this.editForm.createType = 0
          this.createTypes[0].isChoose = true
          t = 0
          break
        }
      }
      for(let i = 0; i < 7; i++) {
        if (i !== t) {
          this.createTypes[i] = false
        }
      }
      this.$refs.createType.choose2(t)
      this.Info.createType = t
      //处理创作城市
      //CodeToText[六位数编码字符串]返回城市，暂不处理
      this.Info.createCity = this.works[this.workName].createCity
      //创作国家
      this.editForm.createCountry = this.dataContent.content.createCountry
      this.Info.createCountry = this.dataContent.content.createCountry
      //创作时间
      let date = new Date(this.dataContent.content.createDate)
      this.editForm.createDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate()
      this.Info.createDate = this.dataContent.content.createDate
      //作品文件  暂不处理
    },
    getTheType(index) {
      //著作权产生方式 0-个人1-合作2-法人3-职务4-委托
      this.Info.copyrightCreateType = index
      switch (index) {
        case 0: {
          this.editForm.copyrightCreateType = "个人"
          break
        }
        case 1: {
          this.editForm.copyrightCreateType = "合作"
          break
        }
        case 2: {
          this.editForm.copyrightCreateType = "法人"
          break
        }
        case 3: {
          this.editForm.copyrightCreateType = "职务"
          break
        }
        case 4: {
          this.editForm.copyrightCreateType = "委托"
          break
        }
      }
    },
    keepDraft() {
      let that = this
      this.dataContent.content.workName = this.works[this.workName].workName
      updateDeposit(this.Info).then(() => {
        that.success = true
      })
    },
    next() {
      let that = this
      this.dataContent.content.workName = this.works[this.workName].workName
      updateDeposit(this.Info).then(() => {
        that.$router.push({path: "/DigitalArtwork/deposit/authorInfo", query: {
          Info: that.Info, editForm: that.editForm
          }}).catch()
      })
    },
    ensure() {
      this.success = false
    }
  },
  created() {
    this.getWorkOptions()
  }
}
</script>

<style scoped>
.keepSuccessBack{
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  opacity: 50%;
  background-color: #4B4B4B;
  z-index: 1;
}
#depositInfo{
  margin-top: 181px;
  position: relative;
  width: 100%;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fileText{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #4B4B4B;
}
.download{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
  cursor: pointer;
}
.depositInfoBottom{
  height: 140px;
  width: 1010px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.keepDraft{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
}
.depositNext{
  width: 185px;
  height: 54px;
  background: #326CC2;
  border-radius: 4px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
}
.resultCard{
  width: 460px;
  height: 216px;
  background: #FFFFFF;
  border-radius: 10px;
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.successLogo{
  width: 25px;
  height: 25px;
  object-fit: cover;
}
.successText1{
  font-family: 'PingFang HK',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #000000;
  margin-left: 15px;
}
.successTip{
  font-family: 'PingFang HK',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #B1B1B1;
  margin-top: 16px;
}
.windowSure{
  font-family: 'PingFang HK',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #326CC2;
  cursor: pointer;
}
#depositInfo>>>.el-input__inner{
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
#depositInfo>>>.el-input__inner::placeholder{
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #A0A0A0;
}
#depositInfo>>>.el-select-dropdown{
  margin: 0;
  width: 410px;
  max-height: 274px;

  background: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #8C8C8C;
}
#depositInfo>>>.el-popper .popper__arrow{
  display: none;
}
#depositInfo>>>.el-select-dropdown__item{
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
#depositInfo>>>.el-select-dropdown__item:hover{
  background-color: #DBDBDB;
}
#depositInfo>>>.el-select-dropdown__item.hover{
  background-color: #DBDBDB;
}

#depositInfo>>>.el-avatar .el-cascader-panel .el-radio .el-radio--medium.is-bordered .el-radio__label .el-radio__label{
  font-size: 16px;
}
#depositInfo>>>.el-cascader-menu{
  color: #070707;
  border-right: 1px solid #848484;
}
#depositInfo>>>.el-popper[x-placement^=bottom]{
  margin-top: 1px;
}
#depositInfo>>>.el-cascader__dropdown{
  font-size: 16px;
  background-color: #FFFFFF;
  border-color: #848484;
}
#depositInfo>>>.el-cascader-node.in-active-path, .el-cascader-node.is-active, .el-cascader-node.is-selectable.in-checked-path{
  color: #848484;
  font-weight: 500;
}
#depositInfo>>>.el-input.is-disabled .el-input__inner{
  background-color: #FFFFFF;
  color: #000000;
  border-color: #848484;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
#depositInfo>>>.el-input__prefix{
  display: none;
}
#depositInfo>>>.el-input__suffix-inner{
  display: none;
}
#depositInfo>>>.el-input::-webkit-scrollbar-thumb{
  width: 410px;
  height: 43px;
}
</style>