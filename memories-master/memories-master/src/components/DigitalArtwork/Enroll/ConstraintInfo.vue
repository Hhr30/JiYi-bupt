<template>
  <!--填写约束信息-->
  <div id="copy-info">
    <Item box-height="313px" margin-top="23px">
      <p slot="itemName">版权约束</p>
      <div slot="itemType" id="check">
        <Item box-height="114px" box-width="880px" margin-top="0" left="10px">
          <p slot="itemName">是否可授权</p>
          <tags :value-array="CopyrightLimit.isAuthor" tag-id="isAuthor" slot="itemType" tag-width="121px"></tags>
        </Item>
        <div style="height: 1px;width: 860px;background-color: #BABABA;margin-left: 12px"></div>
        <Item box-height="105px" box-width="880px" margin-top="0" left="10px">
          <p slot="itemName">是否可转让</p>
          <tags :value-array="CopyrightLimit.isTransfer" tag-id="isTransfer" slot="itemType" tag-width="121px"></tags>
        </Item>
      </div>
    </Item>
    <Item box-height="745px">
      <p slot="itemName">授权约束</p>
      <div slot="itemType">
        <Item box-height="114px" box-width="880px" left="10px">
          <p slot="itemName">渠道</p>
          <tags :value-array="authorLimit.channel" tag-id="auChannel" slot="itemType" tag-width="91px" @getType="getApprChannel"></tags>
        </Item>
        <div style="height: 0.5px;width: 860px;background-color: #BABABA;margin-left: 12px"></div>
        <Item box-height="114px" box-width="880px" left="10px">
          <p slot="itemName">地域</p>
          <tags :value-array="authorLimit.area" tag-id="auArea" slot="itemType" tag-width="91px" @getType="getApprArea"></tags>
        </Item>
        <div style="height: 0.5px;width: 860px;background-color: #BABABA;margin-left: 12px"></div>
        <Item box-height="114px" box-width="880px" left="10px">
          <p slot="itemName">时间</p>
          <tags :value-array="authorLimit.time" tag-id="auTime" slot="itemType" tag-width="91px"  @getType="getApprTime"></tags>
        </Item>
        <div style="height: 0.5px;width: 860px;background-color: #BABABA;margin-left: 12px"></div>
        <Item box-height="114px" box-width="880px" left="10px">
          <p slot="itemName">转让类型</p>
          <tags :value-array="authorLimit.transferType" tag-id="auTransferType" slot="itemType" tag-width="121px" @getType="getApprTransferType"></tags>
        </Item>
        <div style="height: 0.5px;width: 860px;background-color: #BABABA;margin-left: 12px"></div>
        <Item box-height="114px" box-width="880px" left="10px">
          <p slot="itemName">再授权类型</p>
          <tags :value-array="authorLimit.reAuthor" tag-id="auReAuthor" slot="itemType" tag-width="121px" @getType="getApprReapproveType"></tags>
        </Item>
      </div>
    </Item>
    <Item box-height="540px">
      <p slot="itemName">操作许可约束</p>
      <div slot="itemType">
        <Item box-height="169px" box-width="880px" left="10px">
          <p slot="itemName">类型</p>
          <div slot="itemType">
            <tags :value-array="opLimit.type" tag-id="opType" slot="itemType" box-width="700px" :pos="6" @getType="getOpType" :is-single="false"></tags>
          </div>
        </Item>
        <div style="height: 0.5px;width: 860px;background-color: #BABABA;margin-left: 12px"></div>
        <Item box-height="114px" box-width="880px" left="10px">
          <p slot="itemName">地域</p>
          <tags :value-array="opLimit.area" tag-id="opArea" slot="itemType" @getType="getOpArea"></tags>
        </Item>
        <div style="height: 0.5px;width: 860px;background-color: #BABABA;margin-left: 12px"></div>
        <Item box-height="114px" box-width="880px" left="10px">
          <p slot="itemName">时间</p>
          <tags :value-array="opLimit.time" tag-id="opTime" slot="itemType" @getType="getOpTime"></tags>
        </Item>
      </div>
    </Item>
    <div id="copyBottom">
      <div style="display: flex;align-items: center;height: 56px">
        <p class="keep" @click="keepDraft">保存草稿</p>
      </div>
      <p class="nextBtn" @click="next">下一步</p>
    </div>
  </div>
</template>

<script>
import Item from "@/components/DigitalArtwork/Item";
import Tags from "@/components/tags/tags";
import {launchEnroll, updateEnrollInfo} from "@/api";
export default {
  name: "ConstraintInfo",
  components: {
    Item,
    Tags
  },
  data() {
    return {
      nextPath: "/DigitalArtwork/enroll/status",
      CopyrightLimit: {
        isAuthor: [
          {name: "可授权", isChoose: false},
          {name: "不可授权", isChoose: false}
        ],
        isTransfer: [
          {name: "可转让", isChoose: false},
          {name: "不可转让", isChoose: false}
        ]
      },
      authorLimit: {
        channel: [
          {name: "全渠道", isChoose: false},
          {name: "网络", isChoose: false},
          {name: "电视", isChoose: false}
        ],
        area: [
          {name: "中国", isChoose: false},
          {name: "亚洲", isChoose: false},
          {name: "世界", isChoose: false}
        ],
        time: [
          {name: "半年", isChoose: false},
          {name: "一年", isChoose: false},
          {name: "三年", isChoose: false},
          {name: "永久", isChoose: false}
        ],
        transferType: [
          {name: "可转让", isChoose: false},
          {name: "不可转让", isChoose: false}
          ],
        reAuthor: [
          {name: "可再授权", isChoose: false},
          {name: "不可再授权", isChoose: false}
        ]
      },
      opLimit: {
        type: [
          {name: "播放", isChoose: false},
          {name: "输出", isChoose: false},
          {name: "打印", isChoose: false},
          {name: "修改", isChoose: false},
          {name: "分割", isChoose: false},
          {name: "打包", isChoose: false},
          {name: "移动", isChoose: false},
          {name: "复制", isChoose: false},
          {name: "备份", isChoose: false},
          {name: "保存", isChoose: false},
          {name: "撤销", isChoose: false}
        ],
        area: [
          {name: "中国", isChoose: false},
          {name: "亚洲", isChoose: false},
          {name: "世界", isChoose: false}
        ],
        time: [
          {name: "半年", isChoose: false},
          {name: "一年", isChoose: false},
          {name: "三年", isChoose: false},
          {name: "永久", isChoose: false}
        ]
      },
      copyrightLimit: 0,             //0-可授权不转让 1- 不可授权可转让 2-可授权不可转让 3-可授权可转让
      appr: {                        //授权约束
        constraintChannel: 0,        //授权约束渠道 0-全 1-网络 2-电视
        constraintArea: 0,           //地域 0-中国 1-亚洲 2-世界
        constraintTime: 0,           //时间 0-半年 1-一年 2-三年 3-永久
        constraintTransferType: 0,   //转让类型 0-不可转让 1-可转让
        constraintReapproveType: 1   //再授权类型 默认值1,0-不可再授权，1-可再授权
      },
      isChooseApprChannel: false,
      isChooseApprArea: false,
      isChooseApprTime: false,
      isChooseApprTransferType: false,
      isChooseApprReapproveType: false,
      op: {                          //操作约束许可
        constraintType: [],          //类型 0-播放 1-输出
        constraintArea: 0,           //地域0-中国1-亚洲2-世界
        constraintTime: 0            //时间
      },
      isChooseOpType: false,
      isChooseOpArea: false,
      isChooseOpTime: false,
      Authorization: {},
      draftFlag: false,
      nextFlag: false
    }
  },
  methods: {
    async next() {
      let that = this
      Promise.all([that.keepDraft()]).then(()=>{
        if(that.nextFlag) {
          this.$router.push({path: this.nextPath, query: {Authorization: this.Authorization}}).catch()
        }
      })
    },
    keepDraft() {
      //版权约束
      let copyrightLimitFlag
      if(this.CopyrightLimit.isAuthor[0].isChoose !== this.CopyrightLimit.isAuthor[1].isChoose && this.CopyrightLimit.isTransfer[0].isChoose !== this.CopyrightLimit.isTransfer[1].isChoose) {
        copyrightLimitFlag = true
        if(this.CopyrightLimit.isAuthor[0].isChoose) {
          if(this.CopyrightLimit.isTransfer[0].isChoose) {
            this.copyrightLimit = 3
          }else {
            this.copyrightLimit = 2
          }
        }else {
          if(this.CopyrightLimit.isTransfer[0].isChoose) {
            this.copyrightLimit = 1
          }else {
            this.copyrightLimit = 0
          }
        }
      }else {
        copyrightLimitFlag = false
      }
      //授权约束
      console.log(this.$route.query.Authorization)
      this.Authorization = this.$route.query.Authorization
      this.Authorization.appr = this.appr
      this.Authorization.op = this.op
      this.Authorization.copyrightLimit = this.copyrightLimit
      let that = this
      if(this.isChooseApprChannel && this.isChooseApprArea && this.isChooseApprTime && this.isChooseApprTransferType && this.isChooseApprReapproveType && this.isChooseOpTime && this.isChooseOpArea && this.isChooseOpType && copyrightLimitFlag) {
        updateEnrollInfo(this.Authorization.toString()).then(function (res) {
          //保存成功
          console.log("成功")
          that.draftFlag = true
          that.nextFlag = true
        },
        function (err) {
          console.log("失败")
          that.draftFlag = false
          that.nextFlag = false
        })
        that.nextFlag = true
      }else {
        updateEnrollInfo(this.Authorization.toString()).then(function (res) {
          //保存成功
          console.log("成功")
          that.draftFlag = true
          that.nextFlag = false
          },
          function (err) {
            console.log("失败")
            that.draftFlag = false
            that.nextFlag = false
        })
        this.nextFlag = false
      }
    },
    getApprChannel(index) {
      this.isChooseApprChannel = true
      this.appr.constraintChannel = index
      return index
    },
    getApprArea(index) {
      this.isChooseApprArea = true
      this.appr.constraintArea = index
      return index
    },
    getApprTime(index) {
      this.isChooseApprTime = true
      this.appr.constraintTime = index
      return index
    },
    getApprTransferType(index) {
      this.isChooseApprTransferType = true
      this.appr.constraintTransferType = index
      return index
    },
    getApprReapproveType(index) {
      this.isChooseApprReapproveType = true
      this.appr.constraintReapproveType = index
      return index
    },
    getOpType(index) {
      if(this.opLimit.type[index].isChoose) {    //如果是选中
        this.op.constraintType.push(index)
        this.isChooseOpType = true
      }else {
        this.op.constraintType.splice(index,1)
        this.isChooseOpType = !(this.op.constraintType.length === 0)
      }
      return index
    },
    getOpArea(index) {
      this.isChooseOpArea = true
      this.op.constraintArea = index
      return index
    },
    getOpTime(index) {
      this.isChooseOpTime = true
      this.op.constraintTime = index
      return index
    }
  }
}
</script>

<style scoped>
#copy-info{
  margin-top: 181px;
  position: relative;
  width: 100%;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
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