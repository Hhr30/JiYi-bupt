<template>
  <!--填写版权单元-->
  <div id="copy-unit">
    <Item margin-top="23px" id="input">
      <p slot="itemName">作品</p>
      <el-select v-model="workTitle" placeholder="请输入作品名称/平台编号进行搜索" filterable slot="itemType" :popper-append-to-body="false">
        <el-option v-for="(item, index) in workList" :value="item.workId" :key="item.workId" :label="item.workId + ' ' +item.content.workName"></el-option>
      </el-select>
    </Item>
    <Item box-height="154px">
      <p slot="itemName">权利取得方式</p>
      <tags :value-array="makeWay" tag-id="makeWay" slot="itemType" tag-width="91px" @getType="copyrightGetType"></tags>
    </Item>
    <Item box-height="auto">
      <p slot="itemName">版权单元</p>
      <div slot="itemType" id="copyrightAdd" style="margin-bottom: 42px">
        <div id="addUser">  <!----------------------------添加用户----------------------------->
          <!--版权单元-->
          <div id="copyrights">
            <div id="copyRight" class="addUser" v-for="(unit,pos) in workUnit" :key="'unit' + pos" :style="{marginTop: pos===0?'0':'30px'}">
              <div class="userTitle">第{{pos + 1}}位</div>
              <div class="titleInfo" id="search">
                <div @keydown="searchUser(pos)">
                  <el-select v-model="unit.searchContent" placeholder="请输入用户名/手机号进行搜索" filterable :popper-append-to-body="false">
                    <el-option v-for="(item, index) in unit.replyResult" :value="item" :key="item + index" :label="item"></el-option>
                  </el-select>
                </div>
                <p class="pack" v-if="unit.isDisplay" @click="hideInfo(pos)">收起权利信息</p>
                <p class="pack" v-if="!unit.isDisplay" @click="spreadInfo(pos)">展开权利信息</p>
                <p class="delete" @click="deleteUser(pos)">删除</p>
              </div>
              <div class="copyTitle" v-if="unit.isDisplay">
                <p style="font-weight: 400;font-size: 18px;line-height: 22px;color: #EA5757">*</p>
                <p style="font-weight: 500;font-size: 18px;line-height: 22px;color: #404040;margin-left: 8px">版权权利类型</p>
                <p style="font-weight: 400;font-size: 18px;line-height: 22px;color: #326CC2;margin-left: 44px;cursor: pointer" @click="selectAll(pos)">全选</p>
                <p style="font-weight: 500;font-size: 18px;line-height: 22px;color: #404040;margin-left: 86px">分账比例</p>
                <p style="font-weight: 500;font-size: 18px;line-height: 22px;color: #404040;margin-left: 142px">权利说明</p>
              </div>
              <el-form style="margin-top: 25px" v-if="unit.isDisplay">
                <el-form-item v-for="(item, index) in unit.copyUnit" style="margin-top: 15px">
                  <div class="baseUnitInfo">
                    <div style="display: flex;align-items: center;width: 189px;cursor: pointer" @click="chooseCopy(pos,index)">   <!--点击修改版权信息-->
                      <img src="../../../assets/img/function/selected.png" alt="none" v-if="item.select" class="imgSelect">
                      <img src="../../../assets/img/function/unselected.png" alt="none" v-if="!item.select" class="imgSelect">
                      <p style="font-weight: 400;font-size: 20px;line-height: 28px;margin-left: 16px" :style="{color: item.select? '#326CC2' : '#9C9C9C'}">{{item.name}}</p>
                    </div>
                    <div style="margin-left: 102px" id="prop" @mouseleave="hideProportion(pos,index)" @keydown="displayProportion(pos,index)" @mousedown="displayProportion(pos,index)" @keyup="displayProportion(pos,index)">
                      <el-input placeholder="请输入比例" v-model="item.proportion" clearable :popper-append-to-body="false"></el-input>
                    </div>
                    <div style="margin-left: 53px" id="explain">
                      <el-input placeholder="请填写权利说明" v-model="item.explain" clearable></el-input>
                    </div>
                  </div>
                  <p class="attention" v-if="item.proportionFlag">{{item.proTips}}</p>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!--版权单元-->
        </div>
        <div id="addBtn">   <!--添加用户的按钮-->
          <p class="addBtn" @click="addUser">+ 添加用户</p>
        </div>
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
import tags from "@/components/tags/tags";
import {getUserInfoByName, getUserInfoByNumber, getWorkLists, updateEnrollInfo} from "@/api";
import {launchEnroll} from "@/api";

//构造器函数
function Copyrights(type) {   //copyrights列表
  this.userInfos = []
  this.type = type
}
function UserInfos(userId, copyrightExplain, propotion) {   //userInfos列表
  this.userId = userId
  this.copyrightExplain = copyrightExplain
  this.propotion = propotion
}
function CreateCopyUnit(searchContent, copyUnit, isDisplay, replyResult) {
  this.searchContent = searchContent
  this.copyUnit = copyUnit
  this.isDisplay = isDisplay
  this.replyResult = replyResult    //搜索结果
}

//小数的处理还没解决
export default {
  name: "CopyrightUnit",
  components: {
    Item,
    tags,
  },
  data() {
    return {
      //workId
      //版权单元部分
      friends: ['你好','我好'],
      copyUnit: [                             //每个版权单元
        {type: 4, select: false, proportion: "", explain: "", name: "复制权", proportionFlag: false},
        {type: 5, select: false, proportion: "", explain: "", name: "发行权", proportionFlag: false},
        {type: 6, select: false, proportion: "", explain: "", name: "出租权", proportionFlag: false},
        {type: 7, select: false, proportion: "", explain: "", name: "展览权", proportionFlag: false},
        {type: 8, select: false, proportion: "", explain: "", name: "表演权", proportionFlag: false},
        {type: 9, select: false, proportion: "", explain: "", name: "放映权", proportionFlag: false},
        {type: 10, select: false, proportion: "", explain: "", name: "广播权", proportionFlag: false},
        {type: 11, select: false, proportion: "", explain: "", name: "信息网络传播权", proportionFlag: false},
        {type: 12, select: false, proportion: "", explain: "", name: "摄制权", proportionFlag: false},
        {type: 13, select: false, proportion: "", explain: "", name: "改编权", proportionFlag: false},
        {type: 14, select: false, proportion: "", explain: "", name: "翻译权", proportionFlag: false},
        {type: 15, select: false, proportion: "", explain: "", name: "汇编权", proportionFlag: false},
        {type: 16, select: false, proportion: "", explain: "", name: "其他", proportionFlag: false}
      ],
      nextPath: "/DigitalArtwork/enroll/info",
      mywork: [
        { value: "选项一", label: "你好"},
        { value: "选项二", label: "我不好"}
      ],
      value: '',
      makeWay: [      //权利取得方式
        {name: "原创", isChoose: false},
        {name: "转让", isChoose: false},
        {name: "继承", isChoose: false},
        {name: "承受", isChoose: false},
        {name: "赠予", isChoose: false},
        {name: "其他", isChoose: false}
      ],
      workList: [],
      workTitle: "",                   //编号与作品名称
      Authorization: {
        workId: 0,                     //作品id
        copyrightGetType: 0,           //权利取得方式 0-原创 1-转让 2-继承
        //草稿分界***********************
        copyrightLimit: 0,             //0-可授权不转让 2- 不可授权可转让 3-可授权不可转让 4-可授权可转让
        appr: {                        //授权约束
          constraintChannel: 0,        //授权约束渠道 0-全 1-网络 2-电视
          constraintArea: 0,           //地域 0-中国 1-亚洲 2-世界
          constraintTime: 0,           //时间 0-半年 1-一年 2-三年 3-永久
          constraintTransferType: 0,   //转让类型 0-不可转让 1-可转让
          constraintReapproveType: 1   //再授权类型 默认值1,0-不可再授权，1-可再授权
        },
        op: {                          //操作约束许可
          constraintType: 0,           //类型 0-播放 1-输出
          constraintArea: 0,           //地域0-中国1-亚洲2-世界
          constraintTime: 0            //时间
        },
        publish: {                     //发表状态
          status: 0,                   //0-未发表 1-已发表
          country: "",                 //国家
          city: 0,                     //城市 号码表
          date: 0                      //时间 yyyy-MM-dd
        },
        comeout: {                     //出版
          status: 0,                   //出版状态 0-已出版
          city: 0,                     //城市 号码表
          country: "",                 //国家
          date: 0                      //时间
        },                             //发行
        issue: {
          status: 0,                   //状态
          date: 0,
          country: "",
          city: 0,
        },
        //草稿分界*************************
        copyrights: [                  //使用构造器函数
          // {
          //   type: 0,                   //4-复制权 5-发行权 6-出租权...
          //   userInfos: [               //版权单元列表
          //     {
          //       userId: 0,             //用户地址
          //       copyrightExplain: "",  //权利说明
          //       propotion: 0           //分账比例
          //     }
          //   ]
          // }
        ]
      },
      searchContent: [],                  //搜索栏内容
      workUnit: [],                       //每个新建的版权单元  临时使用
      redundantPro: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00]   //剩余比例
    }
  },
  methods: {
    chooseWay(index){
      this.makeWay[index].isChoose = this.makeWay[index].isChoose === false
    },
    async next() {
      let OuterFlag = false
      if(this.keepDraft()) {
        for(let i = 0; i < this.workUnit.length; i++) {
          let nextFlag = false
          for (let j = 0; j < 13; j++) {
            if(this.workUnit[i].copyUnit[j].select) {
              nextFlag = true
            }
          }
          OuterFlag = nextFlag
          if(!OuterFlag) {
            break
          }
        }
        if(OuterFlag) {
          this.$router.push({path: this.nextPath, query: {Authorization: this.Authorization}}).catch()
        }
      }
    },
    copyrightGetType(index){                                 //权利取得方式 0-原创 1-转让 2-继承  获取下标
      this.Authorization.copyrightGetType = index
      //console.log(index)
    },
    addUser() {                                    //添加版权单元****************
      let copyUnit = [                             //每个版权单元
        {type: 4, select: false, proportion: "", explain: "", name: "复制权", proportionFlag: false, proTips: ""},
        {type: 5, select: false, proportion: "", explain: "", name: "发行权", proportionFlag: false, proTips: ""},
        {type: 6, select: false, proportion: "", explain: "", name: "出租权", proportionFlag: false, proTips: ""},
        {type: 7, select: false, proportion: "", explain: "", name: "展览权", proportionFlag: false, proTips: ""},
        {type: 8, select: false, proportion: "", explain: "", name: "表演权", proportionFlag: false, proTips: ""},
        {type: 9, select: false, proportion: "", explain: "", name: "放映权", proportionFlag: false, proTips: ""},
        {type: 10, select: false, proportion: "", explain: "", name: "广播权", proportionFlag: false, proTips: ""},
        {type: 11, select: false, proportion: "", explain: "", name: "信息网络传播权", proportionFlag: false, proTips: ""},
        {type: 12, select: false, proportion: "", explain: "", name: "摄制权", proportionFlag: false, proTips: ""},
        {type: 13, select: false, proportion: "", explain: "", name: "改编权", proportionFlag: false, proTips: ""},
        {type: 14, select: false, proportion: "", explain: "", name: "翻译权", proportionFlag: false, proTips: ""},
        {type: 15, select: false, proportion: "", explain: "", name: "汇编权", proportionFlag: false, proTips: ""},
        {type: 16, select: false, proportion: "", explain: "", name: "其他", proportionFlag: false, proTips: ""}
      ]
      let copyunit = new CreateCopyUnit("",copyUnit,true,[])
      this.workUnit.push(copyunit)      //
    },
    deleteUser(pos) {                                                                       //删除版权单元****************
      // let that = this
      // if(this.workUnit[pos].searchContent !== "") {
      //   for(let i = 0; i < 13; i++) {
      //     if(that.workUnit[pos].copyUnit[i].select) {
      //       getUserInfoByName(this.workUnit[pos].searchContent).then(function (res) {    //无变有
      //         that.deleteCopyright(res,pos,i)
      //       })
      //     }
      //   }
      // }
      this.workUnit.splice(pos, 1)
    },
    searchUser(pos) {                               //搜索用户信息
      let that = this
      for(let i = 0; i < this.workUnit[pos].replyResult.length; i++){
        this.workUnit[pos].replyResult.pop()
      }
      getUserInfoByName({username: this.workUnit[pos].searchContent}).then(function (res){   //添加到搜索列表    后期还要修改    搜索搜索
        //console.log(res)
        that.workUnit[pos].replyResult.push(res.data.data.username)
      })
      getUserInfoByNumber({phone: this.workUnit[pos].searchContent}).then(function (res){
        if(res.data.date !== null) {                                             //感觉这里非常奇怪TAT 我不会了
          that.workUnit[pos].replyResult.push(res.data.data.username)
          //console.log(res)
        }
      })
    },
    chooseCopy(pos,index) {     //选择版权          就
      //let userId
      let that = this
      if(this.workUnit[pos].searchContent !== "") {
        let Info = this.workUnit[pos].copyUnit[index]
        Info.select = !Info.select
      }
    },
    createCopyright(data,pos,index) {      //创建版权单元对象    保存草稿时用
      let type
      let userInfos = new UserInfos(data.data.data.userId,this.workUnit[pos].copyUnit[index].explain,this.workUnit[pos].copyUnit[index].proportion)   //创建用户单元
      type = this.copyUnit[index].type
      let copyrights = new Copyrights(type)
      this.Authorization.copyrights.push(copyrights)
      this.Authorization.copyrights[this.Authorization.copyrights.length - 1].userInfos.push(userInfos)
    },
    addCopyright(data,pos,index) {        //添加版权单元对象     保存草稿or下一步时
      let type = this.copyUnit[index].type     //获得种类
      let flagOuter = true                     //外边是否已存在
      for(let i = 0; i < this.Authorization.copyrights.length; i++) {
        if(type === this.Authorization.copyrights[i].type) {    //如果种类相同，说明该种类的版权单元已经建立
          let userInfo = new UserInfos(data.data.data.userId,this.workUnit[pos].copyUnit[index].explain,this.workUnit[pos].copyUnit[index].proportion)   //该版权用户信息
          this.Authorization.copyrights[i].userInfos.push(userInfo)
          flagOuter = false   //修改
          break
        }
      }
      if(flagOuter) {      //如果该种类的版权单元还没建立
        this.createCopyright(data,pos,index)
      }
    },
    // deleteCopyright(data,pos,index) {
    //   let type = this.copyUnit[index].type
    //   let flagInner = true
    //   let flagOuter = true
    //   for(let i = 0; i < this.Authorization.copyrights.length; i++) {
    //     if(type === this.Authorization.copyrights[i].type) {
    //       for(let j = 0; j < this.Authorization.copyrights[i].userInfos.length; j++) {
    //         if(data.data.data.userId === this.Authorization.copyrights[i].userInfos[j].userId) {
    //           this.Authorization.copyrights[i].userInfos.splice(j,1)
    //           flagInner = false
    //           break
    //         }
    //       }
    //       if(this.Authorization.copyrights[i].userInfos.length === 0) {
    //         this.Authorization.copyrights.splice(i,1)
    //       }
    //       break
    //     }
    //   }
    // },
    hideInfo(pos) {         //修改展示状态
      this.workUnit[pos].isDisplay = false
    },
    spreadInfo(pos) {      //点击展开
      this.workUnit[pos].isDisplay = true
    },
    selectAll(pos) {       //点击全选
      let flag = true
      if(this.workUnit[pos].searchContent!=="") {
        for(let i = 0; i < 13; i++) {                       //检查是否已经全选
          if(!this.workUnit[pos].copyUnit[i].select) {
            flag = false
            break
          }
        }
        if(flag) {
          for(let i = 0; i < 13; i++) {
            this.workUnit[pos].copyUnit[i].select = false
          }
        }else {
          for(let i = 0; i < 13; i++) {
            this.workUnit[pos].copyUnit[i].select = true
          }
        }
      }
    },
    displayProportion(pos,index) {                                     //修改比例显示状态
      if(this.workUnit[pos].copyUnit[index].select) {                  //是否已经可选
        this.redundantPro[index] = 1.00
        this.workUnit[pos].copyUnit[index].proportionFlag = true
        //修改比例
        let isRedundant = false
        let tips = "注：剩余比例："
        let current = "当前分配状态为："  //当前分配状态
        for(let i = 0; i < this.workUnit.length; i++) {
          if(this.workUnit[i].copyUnit[index].select) {
            if(this.workUnit[i].copyUnit[index].proportion !== "" && this.workUnit[i].copyUnit[index].proportion.indexOf("%") !== -1) {
              isRedundant = true
              let percentValue = this.toPoint(this.workUnit[i].copyUnit[index].proportion)    //小数值
              let percent = this.toPercent(percentValue)                                      //百分数的值   为了统一格式
              current += this.workUnit[i].searchContent + '(' + percent + ')'                 //百分比
              this.redundantPro[index] -= percentValue
            }
          }
        }
        tips += this.toPercent(this.redundantPro[index])
        if(isRedundant) {
          tips += ' ' + current
          this.workUnit[pos].copyUnit[index].proTips = tips
        }else {
          this.workUnit[pos].copyUnit[index].proTips = tips
        }
      }
      //console.log(this.workUnit[pos].copyUnit[index].proportionFlag)
    },
    toPoint(percent) {             //百分数转化为小数
      let str=percent.replace("%","");
      str= str/100;
      return str;
    },
    toPercent(point){             //小数转化为百分数   保留两位小数
      let str=Number(point*100)//.toFixed(2);
      str+="%";
      return str;
    },
    hideProportion(pos,index) {
      if(this.workUnit[pos].copyUnit[index].proportion === ""){
        this.workUnit[pos].copyUnit[index].proportionFlag = false
      }
    },
    keepDraft() {                      //保存草稿
      let that = this
      for(let i = 0; i < this.Authorization.copyrights.length; i++) {
        this.Authorization.copyrights.pop()
      }
      for(let i = 0; i < this.workUnit.length; i++) {
        let username = this.workUnit[i].searchContent   //用户名
        getUserInfoByName({username: username}).then(function (res){
          //console.log(res)
          for(let j = 0; j < 13; j++) {
            if(that.workUnit[i].copyUnit[j].select) {
              that.addCopyright(res,i,j)
            }
          }
        })
      }
      //console.log(typeof this.workTitle)
      if(this.workTitle !== 0) {         //有一点小问题其实
        //this.Authorization.workId = parseInt(this.workTitle.substring(0, this.workTitle.indexOf(' ')))
        this.Authorization.workId = this.workTitle
        //console.log(this.Authorization.copyrights)
        updateEnrollInfo(this.Authorization.toString()).then(function (res) {
          console.log("成功")
          console.log(that.Authorization.copyrights)
          //console.log(that.workTitle)
          return true
        })
        return true
      }else {
        return false
      }
    }
  },
  computed: {

  },
  created() {
    let that = this
    getWorkLists().then(function (res){
      that.workList = res.data.data
      //console.log(that.workList)
    })
    launchEnroll(this.Authorization.toString()).then(function (res){
      //console.log(res)
    })
  }
}
</script>

<style scoped>
#copy-unit{
  margin-top: 181px;
  position: relative;
  width: 100%;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#input>>>.el-input__inner{
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
#input>>>.el-input__inner::placeholder{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #A0A0A0;
}
#input>>>.el-select-dropdown{
  margin: 0;
  width: 410px;
  max-height: 274px;

  background: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #8C8C8C;
}
#input>>>.el-popper .popper__arrow{
  display: none;
}
#input>>>.el-select-dropdown__item{
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
#input>>>.el-select-dropdown__item:hover{
  background-color: #DBDBDB;
}
#input>>>.el-select-dropdown__item.hover{
  background-color: #DBDBDB;
}
.tags{
  display: flex;
  flex-wrap: wrap;
}
#copyrightAdd{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 925px;
}
#addBtn{
  display: flex;
  flex-direction: column-reverse;
  width: 925px;
  border-top: 1px solid #CACACA;
  margin-top: 43px;
}
.addBtn{
  margin-top: 18px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #326CC2;
  cursor: pointer;
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
.addUser{
  width: 884px;
}
.userTitle{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #000000;
}
.titleInfo{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 19px;
}
p{
  font-family: 'Inter';
  font-style: normal;
}
div{
  font-family: 'Inter';
  font-style: normal;
}
button{
  font-family: 'Inter';
  font-style: normal;
}
.pack{
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
  color: #326CC2;
}
.delete{
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
  color: #EA5757;
}
.copyTitle{
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.imgSelect{
  width: 33px;
  height: 33px;
  object-fit: cover;
}
.baseUnitInfo{
  display: flex;
  align-items: center;
  height: 34px;
}
#form>>>.el-input__inner{

}
#search>>>.el-input__inner{
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
#search>>>.el-input__inner::placeholder{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #A0A0A0;
}
#search>>>.el-select-dropdown{
  margin: 0;
  width: 410px;
  max-height: 274px;

  background: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #8C8C8C;
}
#search>>>.el-popper .popper__arrow{
  display: none;
}
#search>>>.el-select-dropdown__item{
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
#search>>>.el-select-dropdown__item:hover{
  background-color: #DBDBDB;
}
#search>>>.el-select-dropdown__item.hover{
  background-color: #DBDBDB;
}
#prop>>>.el-input__inner{
  box-sizing: border-box;

  width: 161px;
  height: 34px;

  border: 1px solid #929292;
  border-radius: 4px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  color: #585858;

}
#prop>>>.el-input__inner:focus{
  border-color: #326CC2;
}
#prop>>>.el-input__inner::placeholder{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;


  color: #989898;
}
#explain>>>.el-input__inner{
  box-sizing: border-box;

  width: 355px;
  height: 34px;

  border: 1px solid #929292;
  border-radius: 4px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  color: #585858;

}
#explain>>>.el-input__inner:focus{
  border-color: #326CC2;
}
#explain>>>.el-input__inner::placeholder{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;


  color: #989898;
}
.attention{
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin-top: 10px;
  color: #9B9B9B;
  margin-left: 291px;
}
</style>