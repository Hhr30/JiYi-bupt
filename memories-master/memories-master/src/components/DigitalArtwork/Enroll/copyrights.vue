<template>
  <div id="Copyrights">
    <!--进度条-->
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <Progress :title-array="title" :status="status">
      <p slot="p-name">版权注册</p>
    </Progress>
    <div id="copy-unit" v-show="status === 1">
      <Item margin-top="23px" id="input">
        <p slot="itemName">作品</p>
        <el-select v-model="workTitle" placeholder="请输入作品名称/平台编号进行搜索" filterable slot="itemType" :popper-append-to-body="false" :remote-method="getWorks" remote>
          <el-option v-for="(item, index) in workList" :value="item.workId" :key="item.workId" :label="item.workName"></el-option>
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
                  <div>
                    <el-select v-model="unit.searchContent" placeholder="请输入用户名/手机号进行搜索" :remote-method="(value=>{searchUser(value, pos)})" filterable :popper-append-to-body="false" remote>
                      <el-option v-for="(item, index) in unit.replyResult" :value="index" :key="'item' + index" :label="item.userInfo"></el-option>
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
      <div style="display:flex;width:1021px;flex-direction:row-reverse;margin-top:80px;height: 200px">
        <p class="nextBtn" @click="next">下一步</p>
      </div>
      <!--<div id="copyBottom">
        <div style="display: flex;align-items: center;height: 56px">
          <p class="keep" @click="keepDraft">保存草稿</p>
        </div>
        <p class="nextBtn" @click="next">下一步</p>
      </div>-->
    </div>
    <div id="copy-info" :key="'copyInfo'+Info" v-show="status === 2">
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
      <div style="display:flex;width:1021px;flex-direction:row-reverse;margin-top:80px;height: 200px">
        <p class="nextBtn" @click="next" style="margin-right:15px">下一步</p>
        <p class="lastBtn" @click="last">上一步</p>
      </div>
      <!--<div id="copyBottom">
        <div style="display: flex;align-items: center;height: 56px">
          <p class="keep" @click="keepDraft">保存草稿</p>
        </div>
        <div style="display:flex">
          <p class="lastBtn" @click="last">上一步</p>
          <p class="nextBtn" @click="next">下一步</p>
        </div>
      </div>-->
    </div>
    <div id="copy-status" :key="'copyStatus'+Status" v-show="status === 3">
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
      <div style="display:flex;width:1021px;flex-direction:row-reverse;margin-top:80px;height: 200px">
        <p class="nextBtn" @click="next" style="margin-right:15px">下一步</p>
        <p class="lastBtn" @click="last">上一步</p>
      </div>
    </div>
    <finish-work v-show="status === 4">发起作品版权注册成功</finish-work>
  </div>
</template>

<script>
import Progress from "@/components/DigitalArtwork/Progress";
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import Item from "@/components/DigitalArtwork/Item";
import tags from "@/components/tags/tags";
import FinishWork from "@/components/DigitalArtwork/Finish/FinishWork";
import {getUserInfoByName, getUserInfoByNumber, getWorkLists, updateEnrollInfo, getWorkByName, getWorkById, getDepositInfo, getEnrollRes} from "@/api";
import {launchEnroll} from "@/api";
import {provinceAndCityData} from "element-china-area-data";

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

export default {
  name: "copyrights",
  components: { Progress, jyTabBar, Item, tags, FinishWork },
  data() {
    return {
      Status: 0,
      Info: 0,
      status: 1,
      title: ["填写版权单元","填写约束信息","填写版权状态","完成上传"],
      pathTitle: [
        {name: "创作者家园", url: "/DigitalArtwork/Work"},
        {name: "版权注册", url: ""}
      ],
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
          constraintType: "[]",           //类型 0-播放 1-输出
          constraintArea: 0,           //地域0-中国1-亚洲2-世界
          constraintTime: 0            //时间
        },
        publish: {                     //发表状态
          status: 0,                   //0-未发表 1-已发表
          country: "",                 //国家
          city: "",                     //城市 号码表
          date: 0                      //时间 yyyy-MM-dd
        },
        comeout: {                     //出版
          status: 0,                   //出版状态 0-为出版
          city: "",                     //城市 号码表
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
      redundantPro: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],   //剩余比例
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
      draftFlag: false,
      nextFlag: false,
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
      province: provinceAndCityData,
      publish: {                     //发表状态
        status: 0,                   //0-未发表 1-已发表
        country: "中国",              //国家
        city: "",                    //城市 号码表
        date: 0                     //时间 yyyy-MM-dd
      },
      comeout: {                     //出版
        status: 0,                   //出版状态 0-未出版
        city: "",                    //城市 号码表
        country: "中国",              //国家
        date: 0                     //时间
      },                             //发行
      issue: {
        status: 0,                   //状态
        date: 0,
        country: "中国",
        city: "",
      },
      isNext: false,
      headers: {
        "Content-Type": "application/json"
      },
      postFlag: 0
    }
  },
  methods: {
    chooseWay(index){
      this.makeWay[index].isChoose = this.makeWay[index].isChoose === false
    },
    async next() {
      let postFlag = 0
      let that = this
      if (this.status === 1) {
        let OuterFlag = false
        if (this.workTitle !== 0) {
          this.Authorization.workId = this.workTitle
          // ***************
          // await getEnrollRes(this.Authorization.workId, this.headers).then(res=>{    //先看看之前有没有发起版权注册
          //   console.log(res)
          //   if (res.data.data === null) {
          //     that.postFlag = 1
          //   }else {
          //     if (res.data.data.records.status === "作品存证中") {
          //       that.postFlag = 1
          //     }
          //   }
          // })
          // if (this.postFlag === 1) {          //如果还没有发起
          //   await launchEnroll(this.Authorization, this.headers).then(function (res) {
          //     console.log(res)
          //     if (res.data.data !== null) {
          //      postFlag = 1
          //     }
          //   })
          // }
        }
        
        await this.keepDraft()
        if(this.isNext) {
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
            this.status++
          }
        }
      }else if (this.status === 2) {
        await this.keepDraft()
        if(this.isNext) {
          this.status++
        }
      }else if (this.status === 3) {
        await this.keepDraft()
        console.log(this.isNext)
        if(that.isNext) {
          console.log(this.isNext)
          that.status++
          // await launchEnroll(this.Authorization, this.headers).then(function (res) {
          //  console.log(res)
          //  that.status++
          // })
        }
      }
    },
    async last() {
      let that = this
      this.status--
      /*if (this.status === 2) {
        this.copyrightLimit = 0      //清空版权约束数据
        this.CopyrightLimit.isAuthor[0].isChoose = false
        this.CopyrightLimit.isAuthor[1].isChoose = false
        this.CopyrightLimit.isTransfer[0].isChoose = false
        this.CopyrightLimit.isTransfer[1].isChoose = false
        this.Authorization.copyrightLimit = 0
        // appr: {                        //授权约束
        //   constraintChannel: 0,        //授权约束渠道 0-全 1-网络 2-电视
        //       constraintArea: 0,           //地域 0-中国 1-亚洲 2-世界
        //       constraintTime: 0,           //时间 0-半年 1-一年 2-三年 3-永久
        //       constraintTransferType: 0,   //转让类型 0-不可转让 1-可转让
        //       constraintReapproveType: 1   //再授权类型 默认值1,0-不可再授权，1-可再授权
        // },
        //清空授权约束数据
        this.authorLimit.channel[this.appr.constraintChannel].isChoose = false
        this.authorLimit.area[this.appr.constraintArea].isChoose = false
        this.authorLimit.time[this.appr.constraintTime].isChoose = false
        this.authorLimit.transferType[this.appr.constraintTransferType].isChoose = false
        this.authorLimit.reAuthor[this.appr.constraintReapproveType].isChoose = false
        this.appr.constraintChannel = 0
        this.appr.constraintArea = 0
        this.appr.constraintTime = 0
        this.appr.constraintTransferType = 0
        this.appr.constraintReapproveType = 1
        this.Authorization.appr.constraintChannel = 0
        this.Authorization.appr.constraintArea = 0
        this.Authorization.appr.constraintTime = 0
        this.Authorization.appr.constraintTransferType = 0
        this.Authorization.appr.constraintReapproveType = 1
        this.isChooseApprChannel = false
        this.isChooseApprArea =  false
        this.isChooseApprTime = false
        this.isChooseApprTransferType = false
        this.isChooseApprReapproveType = false
        //清空操作许可约束数据
        for (let i = 0; i < this.opLimit.type.length; i++) {
          this.opLimit.type[i].isChoose = false
        }
        let len1 = this.op.constraintType.length
        for (let i = 0; i < len1; i++) {
          this.op.constraintType.pop()
        }
        this.Authorization.op.constraintType = "[]"
        this.isChooseOpType = false
        this.isChooseOpArea = false
        this.isChooseOpTime = false
        await updateEnrollInfo(this.Authorization, this.headers).then(res=>{    //重新发送数据
          if (res.data.data !== null) {
            that.Info++
            that.status--
          }
        })
      }else if (this.status === 3) {
        this.Authorization.publish.city = ""
        this.Authorization.publish.date = ""
        this.Authorization.publish.status = 0
        this.Authorization.publish.country = ""
        this.Authorization.comeout.city = ""
        this.Authorization.comeout.date = ""
        this.Authorization.comeout.status = 0
        this.Authorization.comeout.country = ""
        this.Authorization.issue.city = ""
        this.Authorization.issue.date = ""
        this.Authorization.issue.status = 0
        this.Authorization.issue.country = ""
        this.publish.status = 0
        this.publish.city = ""
        this.publish.date = ""
        this.publish.country = ""
        for (let i = 0; i < this.Publish.city.length; i++) {
          this.Publish.city.pop()
        }
        this.Publish.status[0].isChoose = false
        this.Publish.status[1].isChoose = false
        this.Publish.date = ""
        this.Publish.country = ""
        this.comeout.status = 0
        this.comeout.city = ""
        this.comeout.date = ""
        this.comeout.country = ""
        this.comeOut.status[0].isChoose = false
        this.comeOut.status[1].isChoose = false
        for (let i = 0; i < this.comeOut.city.length; i++) {
          this.comeOut.city.pop()
        }
        this.comeOut.date = ""
        this.comeOut.country = ""
        this.issue.status = 0
        this.issue.city = ""
        this.issue.date = ""
        this.issue.country = ""
        this.Issue.status[0].isChoose = false
        this.Issue.status[1].isChoose = false
        for (let i = 0; i < this.Issue.city.length; i++) {
          this.Issue.city.pop()
        }
        this.Issue.date = ""
        this.Issue.country = ""
        await updateEnrollInfo(this.Authorization, this.headers).then(res=>{    //重新发送数据
          if (res.data.data !== null) {
            that.Status++
            that.status--
          }
        })
      }*/
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
    async searchUser(value, pos) {                               //搜索用户信息
      let that = this
      for(let i = 0; i < this.workUnit[pos].replyResult.length; i++){
        this.workUnit[pos].replyResult.pop()
      }
      await getUserInfoByName(value, this.headers).then((res)=>{   //添加到搜索列表    后期还要修改    搜索搜索
        if (res.data.data !== null) {
          let flag = 0
          for (let i = 0; i < that.workUnit.length; i++) {               //检查是否重复，已经选择过的不能再选择
            if (i !== pos && that.workUnit[i].searchContent !== "") {
              if (that.workUnit[i].replyResult[that.workUnit[i].searchContent].userId === res.data.data.userId) {
                flag = 1
                break
              }
            }
          }
          if (flag === 0) {
            that.workUnit[pos].replyResult.push({userInfo: res.data.data.username + "（**" + res.data.data.name + "）", userId: res.data.data.userId, username: res.data.data.username})
          }
        }
      })
      if (!isNaN(Number(value))) {
        await getUserInfoByNumber(value, this.headers).then(function (res){
          let flag = 0
          if(res.data.data !== null) {                                             //感觉这里非常奇怪TAT 我不会了
            for (let i = 0; i < that.workUnit.length; i++) {               //检查是否重复，已经选择过的不能再选择
              if (i !== pos && that.workUnit[i].searchContent !== "") {
                if (that.workUnit[i].replyResult[that.workUnit[i].searchContent].userId === res.data.data.userId) {
                  flag = 1
                  break
                }
              }
            }
            if (flag === 0) {
              that.workUnit[pos].replyResult.push({userInfo: res.data.data.username + "（**" + res.data.data.name + "）", userId: res.data.data.userId, username: res.data.data.username})
            }
            //console.log(res)
          }
        })
      }
    },
    formatName(name) {    //替换名字
      let newStr;
      if (name.length === 2) {
        newStr = name.substr(0, 1) + '*';
      } else if (name.length > 2) {
        let char = '';
        for (let i = 0, len = name.length - 2; i < len; i++) {
          char += '*';
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1);
      } else {
        newStr = name;
      }

      return newStr;
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
        this.redundantPro[index] = 100
        this.workUnit[pos].copyUnit[index].proportionFlag = true
        //修改比例
        let isRedundant = false
        let tips = "注：剩余比例："
        let current = "当前分配状态为："  //当前分配状态
        for(let i = 0; i < this.workUnit.length; i++) {
          if(this.workUnit[i].copyUnit[index].select) {
            let prop = Number(this.workUnit[i].copyUnit[index].proportion)
            if(this.workUnit[i].copyUnit[index].proportion !== "" && isNaN(prop) === false) {
              if (prop % 1 === 0 && prop <= this.redundantPro[index]) {
                isRedundant = true
                // let percentValue = this.toPoint(this.workUnit[i].copyUnit[index].proportion)    //小数值
                // let percent = this.toPercent(percentValue)                                      //百分数的值   为了统一格式
                current += this.workUnit[i].replyResult[this.workUnit[i].searchContent].username + '(' + prop + '%) '
                //百分比
                console.log(current)
                this.workUnit[i].copyUnit[index].proportion = Number(this.workUnit[i].copyUnit[index].proportion)
                this.redundantPro[index] -= prop
              }
            }
          }
        }
        tips += this.redundantPro[index] + "%"
        if(isRedundant) {
          tips += ' ' + current
          this.workUnit[pos].copyUnit[index].proTips = tips
        }else {
          this.workUnit[pos].copyUnit[index].proTips = tips
        }
        console.log(tips)
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
    async keepDraft() {                      //保存草稿
      let that = this
      if (this.status === 1) {
        for(let i = 0; i < this.Authorization.copyrights.length; i++) {
          this.Authorization.copyrights.pop()
        }
        for(let i = 0; i < this.workUnit.length; i++) {
          let username = this.workUnit[i].replyResult[this.workUnit[i].searchContent].username   //用户名
          await getUserInfoByName(username, this.headers).then(function (res){
            //console.log(res)
            if (res.data.data !== null) {
              for(let j = 0; j < 13; j++) {
                if(that.workUnit[i].copyUnit[j].select) {
                  that.addCopyright(res,i,j)               //添加版权
                }
              }
            }
          })
        }
        if(this.workTitle !== 0) {         //有一点小问题其实
          this.Authorization.workId = this.workTitle           //更新版权注册信息
          await updateEnrollInfo(this.Authorization, this.headers).then(function (res) {
            console.log(res)
            console.log(that.Authorization.copyrights)
            that.isNext = true
          })
        }else {
          that.isNext = false
        }
      }else if (this.status === 2) {
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

        this.Authorization.appr = this.appr
        this.Authorization.op.constraintArea = this.op.constraintArea
        this.Authorization.op.constraintTime = this.op.constraintTime
        // for (let i = 0; i < this.Authorization.op.constraintType.length; i++) {
        //   this.Authorization.op.constraintType.pop()
        // }
        this.Authorization.op.constraintType = "[" + this.op.constraintType.toString() + "]"
        this.Authorization.copyrightLimit = this.copyrightLimit
        let that = this
        if(this.isChooseApprChannel && this.isChooseApprArea && this.isChooseApprTime && this.isChooseApprTransferType && this.isChooseApprReapproveType && this.isChooseOpTime && this.isChooseOpArea && this.isChooseOpType && copyrightLimitFlag) {
          await updateEnrollInfo(this.Authorization, this.headers).then(function (res) {
                //保存成功
                console.log(res)
                that.draftFlag = true
                that.nextFlag = true
                that.isNext = true
              },
              function (err) {
                that.draftFlag = false
                that.nextFlag = false
                that.isNext = false
              })
          //that.nextFlag = true
        }else {
          // await updateEnrollInfo(this.Authorization).then(function (res) {
          //       //保存成功
          //       console.log("成功")
          //       that.draftFlag = true
          //       that.nextFlag = false
          //     },
          //     function (err) {
          //       console.log("失败")
          //       that.draftFlag = false
          //       that.nextFlag = false
          //     })
          that.draftFlag = false
          this.nextFlag = false
          this.isNext = false
        }
      }else if (this.status === 3) {
        let pFlag = false
        let cFlag = false
        let iFlag = false
        //发表状态
        let that = this
        if(this.publish.status === 1) {
          this.publish.city = this.getPublishCity()
          await this.getPublishTime()
          if(this.publish.city !== "" && this.publish.date !== 0) {  //检查是否都已填
            pFlag = true
            console.log(pFlag)
          }
        }else {
          //先检查是否是未选
          pFlag = this.Publish.status[0].isChoose
          console.log(pFlag)
        }
        //出版状态
        if(this.comeout.status === 1) {
          this.comeout.city = this.getComeOutCity()
          await this.getComeOutTime()
          if(this.comeout.city !== "" && this.comeout.date !== 0) {  //检查是否都已填
            cFlag = true
          }
        }else {
          cFlag = this.comeOut.status[0].isChoose
        }
        //发行状态
        if(this.issue.status === 1) {
          this.issue.city = this.getIssueCity()
          await this.getIssueTime()
          if(this.issue.city !== "" && this.issue.date !== 0) {  //检查是否都已填
            iFlag = true
          }
        }else {
          iFlag = this.Issue.status[0].isChoose
        }
        this.Authorization.publish = this.publish
        this.Authorization.comeout = this.comeout
        this.Authorization.issue = this.issue
        this.isNext = pFlag && cFlag && iFlag
        console.log(this.isNext)
        if (this.isNext) {              //如果信息已经填完，则可以到下一步
          await launchEnroll(this.Authorization, this.headers).then(function(res) {
            console.log(res)
            if (res.data.data === null) {
              if (res.data.data.result !== "成功") {
                that.isNext = false
              }
            }
            },
            function (err) {
              that.isNext = false
          })
        }
        return this.isNext
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
    },
    changePublishStatus(index) {
      this.publish.status = index
      if (index === 0) {
        this.publish.city = ""
        this.publish.country = ""
        this.publish.date = 0
        for(let i = 0; i < this.Publish.city.length; i++) {
          this.Publish.city.pop()
        }
        this.Publish.country = ""
        this.Publish.date = ""
      }
    },
    changeComeOutStatus(index) {
      this.comeout.status = index
      if (index === 0) {
        this.comeout.city = ""
        this.comeout.country = "中国"
        this.comeout.date = 0
        for(let i = 0; i < this.Publish.city.length; i++) {
          this.comeOut.city.pop()
        }
        this.comeOut.country = "中国"
        this.comeOut.date = ""
      }
    },
    changeIssueStatus(index) {
      this.issue.status = index
      if (index === 0) {
        this.issue.city = ""
        this.issue.country = "中国"
        this.issue.date = 0
        for(let i = 0; i < this.Publish.city.length; i++) {
          this.Issue.city.pop()
        }
        this.Issue.country = "中国"
        this.Issue.date = ""
      }
    },
    getPublishCity() {
      // let City = ""
      // for(let i = 0; i < this.Publish.city.length; i++){
      //   City += this.Publish.city[i]
      // }
      return Number(this.Publish.city[1])
    },
    getComeOutCity() {
      // let City = ""
      // for(let i = 0; i < this.comeOut.city.length; i++){
      //   City += this.comeOut.city[i]
      // }
      return Number(this.comeOut.city[1])
    },
    getIssueCity() {
      // let City = ""
      // for(let i = 0; i < this.Issue.city.length; i++){
      //   City += this.Issue.city[i]
      // }
      return Number(this.Issue.city[1])
    },
    getPublishTime() {
      try {                                                                                      //发表时间
        this.publish.date = this.Publish.date.getTime()
      }catch (e) {
        this.publish.date = 0
      }
    },
    getComeOutTime() {
      try {                                                                                      //出版时间
        this.comeout.date = this.comeOut.date.getTime()
      }catch (e) {
        this.comeout.date = 0
      }
    },
    getIssueTime() {
      try {                                                                                      //发行时间
        this.issue.date = this.Issue.date.getTime()
      }catch (e) {
        this.issue.date = 0
      }
    },
    async getWorks(value) {     //获得作品信息
      let works = []
      for (let i = 0; i < this.workList.length;i++) {
        this.workList.pop()
      }
      let that = this
      await getWorkByName(value, this.headers).then(res=>{

        if (res.data.data !== null) {
          for (let i = 0; i < res.data.data.length; i++) {
            works.push({workId: res.data.data[i].workId, workName: res.data.data[i].content.workName})
          }
        }
      })
      let n = Number(value)
      if (!isNaN(n)) {
        await getWorkById(n, this.headers).then(res=>{
          if (res.data.data !== null) {
            for (let i = 0; i < res.data.data.length; i++) {
              let flag = 0
              for (let j = 0; i < works.length; j++) {
                if (res.data.data[i].workId === works[j].workId) {
                  flag = 1
                  break
                }
              }
              if (flag === 0) {
                works.push({workId: res.data.data[i].workId, workName: res.data.data[i].content.workName})
              }
            }
          }
        })
      }
      // console.log(works)
      for (let i = 0; i < works.length; i++) {
        await getDepositInfo(works[i].workId, this.headers).then(res=>{
          console.log(res)
          if (res.data.data !== null) {
            that.workList.push(works[i])
          }
        })
      }
    }
  }
}
</script>

<style scoped>
#Copyrights{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 1400px;
}
.upload-p-text{
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 60px;
}
#pro-text p{
  width: 96px;
  height: 19px;

  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
}
#copy-unit{
  margin-top: 181px;
  position: relative;
  width: 100%;
  min-width: 1400px;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#copy-info{
  margin-top: 181px;
  position: relative;
  width: 100%;
  min-width:1400px;
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

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

}
#input>>>.el-input__inner::placeholder{
  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
  font-style: normal;
}
div{
  font-family: 'Inter',sans-serif;
  font-style: normal;
}
button{
  font-family: 'Inter',sans-serif;
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

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

}
#search>>>.el-input__inner::placeholder{
  font-family: 'Inter',sans-serif;
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

  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
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

  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
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

#copy-status{
  margin-top: 181px;
  position: relative;
  width: 100%;
  min-width:1400px;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#country>>>.el-input.is-disabled .el-input__inner{
  background-color: #FFFFFF;
  color: #000000;
  border-color: #848484;
  font-family: 'Inter',sans-serif;
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

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

}
#copy-status>>>.el-input__inner::placeholder{
  font-family: 'Inter',sans-serif;
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
  font-family: 'Inter',sans-serif;
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
  margin-left: 15px;
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
.lastBtn{
  width: 185px;
  height: 55px;
  border: 1px solid #326CC2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
  cursor: pointer;
}
</style>