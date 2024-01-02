<template>
  <div id="copy-status">
    <Item margin-top="23px">
      <p slot="itemName">发表状态</p>
      <tags :value-array="Publish.status" tag-id="pbStatus" slot="itemType" tag-width="121px" @getType="changePublishStatus"></tags>
    </Item>
    <Item v-if="Publish.status[1].isChoose">   <!--城市部分暂时不写-->
      <p slot="itemName">发表城市</p>
      <div slot="itemType">
        <el-cascader
            placeholder="请选择城市"
            :options="province"
            v-model="Publish.city"
            :popper-append-to-body="false"
            :append-to-body="false"
            filterable>
        </el-cascader>
      </div>
    </Item>
    <Item v-if="Publish.status[1].isChoose">
      <p slot="itemName">发表国家</p>
      <div slot="itemType" id="country">
        <el-input placeholder="中国" v-model="Publish.country" :disabled="true"></el-input>
      </div>
    </Item>
    <Item v-if="Publish.status[1].isChoose">
      <p slot="itemName">发表时间</p>
      <div slot="itemType" id="date">
        <el-date-picker v-model="Publish.date" type="date" placeholder="请选择发表时间">
        </el-date-picker>
      </div>
    </Item>
    <!--出版状态-->
    <Item>
      <p slot="itemName">出版状态</p>
      <tags :value-array="comeOut.status" tag-id="coStatus" slot="itemType" tag-width="121px" @getType="changeComeOutStatus"></tags>
    </Item>
    <Item v-if="comeOut.status[1].isChoose">
      <p slot="itemName">出版城市</p>
      <div slot="itemType">
        <el-cascader
            placeholder="请选择城市"
            :options="province"
            v-model="comeOut.city"
            :popper-append-to-body="false"
            :append-to-body="false"
            filterable>
        </el-cascader>
      </div>
    </Item>
    <Item v-if="comeOut.status[1].isChoose">
      <p slot="itemName">出版国家</p>
      <div slot="itemType" id="comeOutCountry">
        <el-input placeholder="中国" v-model="comeOut.country" :disabled="true"></el-input>
      </div>
    </Item>
    <Item v-if="comeOut.status[1].isChoose">
      <p slot="itemName">出版时间</p>
      <div slot="itemType" id="comeOutDate">
        <el-date-picker v-model="comeOut.date" type="date" placeholder="请选择出版时间">

        </el-date-picker>
      </div>
    </Item>
    <!--发行-->
    <Item>
      <p slot="itemName">发行状态</p>
      <tags :value-array="Issue.status" tag-id="IsStatus" slot="itemType" tag-width="121px" @getType="changeIssueStatus"></tags>
    </Item>
    <Item v-if="Issue.status[1].isChoose">   <!--城市部分暂时不写-->
      <p slot="itemName">发行城市</p>
      <div slot="itemType">
        <el-cascader
            placeholder="请选择城市"
            :options="province"
            v-model="Issue.city"
            :popper-append-to-body="false"
            :append-to-body="false"
            filterable>
        </el-cascader>
      </div>
    </Item>
    <Item v-if="Issue.status[1].isChoose">
      <p slot="itemName">发行国家</p>
      <div slot="itemType" id="issueCountry">
        <el-input placeholder="中国" v-model="Issue.country" :disabled="true"></el-input>
      </div>
    </Item>
    <Item v-if="Issue.status[1].isChoose">
      <p slot="itemName">发行时间</p>
      <div slot="itemType" id="issueDate">
        <el-date-picker v-model="Issue.date" type="date" placeholder="请选择发行时间">

        </el-date-picker>
      </div>
    </Item>
    <div id="copyBottom">
      <div style="display: flex;align-items: center;height: 56px">
        <p class="keep">保存草稿</p>
      </div>
      <p class="nextBtn" @click="next">下一步</p>
    </div>
  </div>
</template>

<script>
import Item from "@/components/DigitalArtwork/Item";
import tags from "@/components/tags/tags";
import {createProvince} from "@/functions";
import {updateEnrollInfo} from "@/api";
import {regionData} from "element-china-area-data/dist/app";
import {launchEnroll} from "@/api";
export default {
  name: "CopyrightStatus",
  data() {
    return {
      nextPath: "/DigitalArtwork/enroll/finish",
      Publish: {
        status: [
          {name: "未发表", isChoose: false},
          {name: "已发表", isChoose: false}
        ],
        city: [],
        country: "中国",
        date: ""
      },
      comeOut: {
        status: [
          {name: "未出版", isChoose: false},
          {name: "已出版", isChoose: false}
        ],
        city: [],
        country: "中国",
        date: ""
      },
      Issue: {
        status: [
          {name: "未发行", isChoose: false},
          {name: "已发行", isChoose: false}
        ],
        city: [],
        country: "中国",
        date: ""
      },
      province: regionData,
      publish: {                     //发表状态
        status: 0,                   //0-未发表 1-已发表
        country: "",                 //国家
        city: "",                    //城市 号码表
        date: 0                      //时间 yyyy-MM-dd
      },
      comeout: {                     //出版
        status: 0,                   //出版状态 0-未出版
        city: "",                    //城市 号码表
        country: "",                 //国家
        date: 0                      //时间
      },                             //发行
      issue: {
        status: 0,                   //状态
        date: 0,
        country: "",
        city: "",
      },
      Authorization: {},
      isNext: false
    }
  },
  components: {
    Item,
    tags
  },
  methods: {
    next() {
      let that = this
      Promise.all([that.keepDraft()]).then(res=>{
        if(that.isNext) {
          launchEnroll(this.Authorization.toString()).then(function (err) {
            that.$router.replace(that.nextPath).catch()
          })
        }
      })
    },
    async keepDraft() {
      let pFlag = false
      let cFlag = false
      let iFlag = false
      //发表状态
      let that = this
      if(this.publish.status === 1) {
        this.publish.city = this.getPublishCity()
        await this.getPublishTime()
        if(this.publish.city.length !== 0 && this.publish.date !== 0) {  //检查是否都已填
          pFlag = true
        }
      }else {
        //先检查是否是未选
        pFlag = this.Publish.status[0].isChoose
      }
      //出版状态
      if(this.comeout.status === 1) {
        this.comeout.city = this.getComeOutCity()
        await this.getComeOutTime()
        if(this.comeout.city.length !== 0 && this.comeout.date !== 0) {  //检查是否都已填
          cFlag = true
        }
      }else {
        cFlag = this.comeOut.status[0].isChoose
      }
      //发行状态
      if(this.issue.status === 1) {
        this.comeout.city = this.getIssueCity()
        await this.getIssueTime()
        if(this.issue.city.length !== 0 && this.issue.date !== 0) {  //检查是否都已填
          iFlag = true
        }
      }else {
        iFlag = this.Issue.status[0].isChoose
      }
      this.Authorization = this.$route.query.Authorization
      this.Authorization.publish = this.publish
      this.Authorization.comeout = this.comeout
      this.Authorization.issue = this.issue
      updateEnrollInfo(this.Authorization.toString()).then(function(err) {
        that.isNext = pFlag && cFlag && iFlag
      },
      function (err) {
        that.isNext = pFlag && cFlag && iFlag
      })
      return this.isNext
    },
    changePublishStatus(index) {
      this.publish.status = index
    },
    changeComeOutStatus(index) {
      this.comeout.status = index
    },
    changeIssueStatus(index) {
      this.issue.status = index
    },
    getPublishCity() {
      let City = ""
      for(let i = 0; i < this.Publish.city.length; i++){
        City += this.Publish.city[i]
      }
      return City
    },
    getComeOutCity() {
      let City = ""
      for(let i = 0; i < this.comeOut.city.length; i++){
        City += this.comeOut.city[i]
      }
      return City
    },
    getIssueCity() {
      let City = ""
      for(let i = 0; i < this.Issue.city.length; i++){
        City += this.Issue.city[i]
      }
      return City
    },
    getPublishTime() {
      try {                                                                                      //发表时间
        if (this.Publish.date === "") {
          this.publish.date = 0
        }else {
          this.publish.date = this.Publish.date.getTime()
        }
      }catch (e) {
        this.publish.date = 0
      }
    },
    getComeOutTime() {
      try {                                                                                      //出版时间
        if(this.comeOut.date === "") {
          this.comeout.date = 0
        }else {
          this.comeout.date = this.comeOut.date.getTime()
        }
      }catch (e) {
        this.comeout.date = 0
      }
    },
    getIssueTime() {
      try {                                                                                      //发行时间
        if(this.Issue.date === "") {
          this.issue.date = 0
        }else {
          this.issue.date = this.Issue.date.getTime()
        }
      }catch (e) {
        this.issue.date = 0
      }
    }
  }
}
</script>

<style scoped>
#copy-status{
  margin-top: 181px;
  position: relative;
  width: 100%;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#country>>>.el-input.is-disabled .el-input__inner{
  background-color: #FFFFFF;
  color: #000000;
  border-color: #848484;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
#country>>>.el-input__inner{
  width: 410px;
  height: 43px;
}
#copy-status>>>.el-input__inner{
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
#copy-status>>>.el-input__inner::placeholder{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #A0A0A0;
}
#copy-status>>>.el-select-dropdown{
  margin: 0;
  width: 410px;
  max-height: 274px;

  background: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #8C8C8C;
}
#copy-status>>>.el-popper .popper__arrow{
  display: none;
}
#copy-status>>>.el-select-dropdown__item{
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
#copy-status>>>.el-select-dropdown__item:hover{
  background-color: #DBDBDB;
}
#copy-status>>>.el-select-dropdown__item.hover{
  background-color: #DBDBDB;
}

#copy-status>>>.el-avatar .el-cascader-panel .el-radio .el-radio--medium.is-bordered .el-radio__label .el-radio__label{
  font-size: 16px;
}
#copy-status>>>.el-cascader-menu{
  color: #070707;
  border-right: 1px solid #848484;
}
#copy-status>>>.el-popper[x-placement^=bottom]{
  margin-top: 1px;
}
#copy-status>>>.el-cascader__dropdown{
  font-size: 16px;
  background-color: #FFFFFF;
  border-color: #848484;
}
#copy-status>>>.el-cascader-node.in-active-path, .el-cascader-node.is-active, .el-cascader-node.is-selectable.in-checked-path{
  color: #848484;
  font-weight: 500;
}
#copy-status>>>.el-input.is-disabled .el-input__inner{
  background-color: #FFFFFF;
  color: #000000;
  border-color: #848484;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
#copy-status>>>.el-input__prefix{
  display: none;
}
#copy-status>>>.el-input__suffix-inner{
  display: none;
}
#copy-status>>>.el-input::-webkit-scrollbar-thumb{
  width: 410px;
  height: 43px;
}
#copyBottom{
  display: flex;
  justify-content: space-between;
  width: 1021px;
  height: 56px;
  margin-top: 33px;
  margin-bottom: 38px;
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

  display: flex;
  align-items: center;
  justify-content: center;
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
</style>