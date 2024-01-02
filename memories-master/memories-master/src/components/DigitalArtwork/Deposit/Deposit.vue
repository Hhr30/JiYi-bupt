<template>
  <div style="width: 100%;min-width: 1400px;position: absolute;display: flex;flex-direction: column;align-items: center;" id="deposit">
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <Progress :title-array="title" :status="status">
      <p slot="p-name">作品存证</p>
    </Progress>
    <div id="depositInfo" v-show="status === 1">
      <el-form style="width: 100%;display: flex; flex-direction: column;align-items: center;" :popper-append-to-body="false">
        <Item>
          <p slot="itemName">作品</p>
          <div slot="itemType">
            <el-select v-model="workName" placeholder="请输入作品名称/平台编号进行搜素" @change="queryWork" :remote-method="getWork" :popper-append-to-body="false" filterable remote>
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
              <p class="fileText">{{dataContent.content.fileName}}</p>
              <a class="download" :href="editForm.fileUrl" download>下载</a>
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
          <el-button type="primary" class="depositNext" @click="next">下一步</el-button>
        </div>
      </el-form>
    </div>
    <div id="authorsInfo" v-show="status === 2">
      <el-form style="width: 100%;display: flex; flex-direction: column;align-items: center;" :popper-append-to-body="false">
        <Item box-height="auto">
          <p slot="itemName">作者</p>
          <div slot="itemType">
            <div>
              <div v-for="(item, index) in authors" :key="'authorInfos'+index" class="author" :style="{marginTop: index === 0 ? '' : '28px'}">
                <p class="authorNum">第{{index+1}}位</p>
                <div>
                  <div style="display: flex;align-items: center;justify-content: space-between">
                    <el-select v-model="item.search" placeholder="请输入用户名/手机号进行查询" :popper-append-to-body="false" style="margin-top: 20px" @change="change(index)" :remote-method="(value)=>{searchAuthor(value,index)}" filterable remote>
                      <el-option
                          v-for="(tip, pos) in item.result"
                          :key="pos"
                          :label="tip.username + '（**' + tip.name + '）' + '**************' + tip.identificationNumber"
                          :value="pos"> <!--??-->
                      </el-option>
                    </el-select>
                    <p @click="deleteAuthor(index)" class="deleteAuthor">删除</p>
                  </div>
                  <div style="display: flex;align-items: center;margin-top: 20px">
                    <p class="depositStar">*</p>
                    <p class="depositAuthor">作者署名</p>
                  </div>
                  <div style="margin-top: 20px">
                    <el-input v-model="Info.authorInfos[index].signName"></el-input>
                  </div>
                </div>
                <div class="authorGapLine" v-if="index !== Info.authorInfos.length - 1" style="margin-top: 30px">
                </div>
              </div>
            </div>
            <div style="margin-top: 36px">
              <div class="authorLine"></div>
              <p class="addAuthor" @click="addAuthor" style="margin-bottom: 38px">+添加作者</p>
            </div>
            <div class="warn">{{warn}}</div>
            <div style="height: 20px;width: 100%"></div>
          </div>
        </Item>
        <div style="display: flex;align-items: center;justify-content: space-between;width: 1021px;margin-top: 150px;margin-bottom: 200px">
          <div style="display: flex;">
            <el-button type="text" class="authorLast" @click="last">上一步</el-button>
            <el-button type="primary" class="authorNext" @click="next">下一步</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <div id="authorConfirm" v-show="status === 3">
      <div class="infoBox">
        <div class="tips">请仔细核对以下信息</div>
        <div class="infoItemBox" id="myInfo">
          <div style="display: flex;align-items: flex-start">
            <p style="width: 80px">作品名称：</p><p style="width: 170px">{{editForm.workName}}</p>
          </div>
          <div style="display: flex;align-items: flex-start;margin-top: 21px">
            <p style="width: 80px">作品类型：</p><p style="width: 170px">{{editForm.workType}}</p>
          </div>
          <div style="display: flex;align-items: flex-start;margin-top: 21px">
            <p style="width: 80px">创作性质：</p><p style="width: 170px">{{editForm.createType}}</p>
          </div>
          <div style="display: flex;align-items: flex-start;margin-top: 21px">
            <p style="width: 80px">创作城市：</p><p style="width: 170px">{{editForm.createCity}}</p>
          </div>
          <div style="display: flex;align-items: flex-start;margin-top: 21px">
            <p style="width: 80px">创作国家：</p><p style="width: 170px">{{editForm.createCountry}}</p>
          </div>
          <div style="display: flex;align-items: flex-start;margin-top: 21px">
            <p style="width: 80px">创作时间：</p><p style="width: 170px">{{editForm.createDate}}</p>
          </div>
          <div style="display: flex;align-items: flex-start;margin-top: 21px">
            <p>著作权产生方式：</p><p style="width: 170px">{{editForm.copyrightCreateType}}</p>
          </div>
          <div style="margin-top: 21px">
            <p style="width: 80px">作者信息：</p>
            <p v-for="(item, index) in editForm.authorInfos" style="margin-top: 5px">{{index+1}}.&nbsp;{{item}} &nbsp;&nbsp;&nbsp;署名：{{Info.authorInfos[index].signName}}</p>
          </div>
        </div>
        <div style="height: 20px;width: 1019px"></div>
      </div>
      <div class="next" @click="next">
        <button class="ensureBtn">确认</button>
      </div>
    </div>
    <finish-work v-show="status === 4">发起作品存证成功</finish-work>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import Progress from "@/components/DigitalArtwork/Progress";
import { getWorkLists, getUserInfoByName, getUserInfoByNumber, launchDeposit, updateDeposit, getWorkByName, getWorkById } from '@/api.js'
import Item from "@/components/DigitalArtwork/Item";
import Tags from "@/components/tags/tags";
import {CodeToText} from "element-china-area-data";
import FinishWork from "@/components/DigitalArtwork/Finish/FinishWork";

function AddAuthor(userId, signName) {      //添加作者
  this.userId = userId
  this.signName = signName
}
function GetUser(username, name, identificationNumber, userId) {
  this.username = username
  this.name = name
  this.identificationNumber = identificationNumber    //身份证号
  this.userId = userId
}
function AddAuthors(author, result, search) {            //作者集合 包含每一个作者和对应的搜索结果
  this.author = author
  this.result = result    //搜索框结果，内容 数组
  this.search = search    //搜索框内容
}
export default {
  name: 'Deposit',
  components: {
    jyTabBar,
    Progress,
    Item,
    Tags,
    FinishWork
  },
  data() {
    return {
      pathTitle: [
        {name: "创作者家园", url: "/DigitalArtwork/Work"},
        {name: "作品存证", url: ""}
      ],
      title: ["填写作品信息","编辑作者信息","信息确认","完成上传"],
      status: 1,
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
      copyrightCreateTypes: [
        {name: "个人", isChoose: false},
        {name: "合作", isChoose: false},
        {name: "法人", isChoose: false},
        {name: "职务", isChoose: false},
        {name: "委托", isChoose: false}
      ],
      Info: {                       //更新/发起 作品存证使用
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
          fileUrl: "",
          fileName: ""
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
      success: false,
      authorInfos: [],      //搜索到的信息数据
      editAuthorInfos: [],   //编辑的数据
      authors: [],            //作者信息
      authorInfosText: [],
      warn: "",
      headers: {
        "Content-Type": "application/json"
      }
    }
  },
  methods: {
    async getWorkOptions() {    //获得作品的列表
      try {
        let that = this
        let v = await getWorkLists()
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
        console.log(e)
      }
    },
    async getWork(content) {                     //实时查找作品
      let len = this.works.length
      for (let i = 0; i < len; i++) {
        this.works.pop()
      }
      let that = this
      try {
        let v1 = await getWorkByName(content, this.headers)    //如果是作品名
        v1.data.data.forEach(item => {   //遍历
          that.works.push({
            workId: item.workId,
            workName: item.content.workName,
            workType: item.content.workType,
            createType: item.content.createType,
            createCity: item.content.createCity,
            createCountry: item.content.createCountry,
            createDate: item.content.createDate,         //创作时间
            fileUrl: item.content.fileUrl,
            fileName: item.content.fileName
          })
        }).catch(e);

        let v2 = await getWorkById(Number(content), this.headers)
        v2.data.data.forEach(item => {   //遍历
          let flag = 0
          for (let i = 0; i < that.works.length; i++) {
            if (Number(that.works[i].workId) === item.workId) {

              flag = 1
            }
          }
          if (flag === 0) {                      //检查是否重复
            that.works.push({
              workId: item.workId,
              workName: item.content.workName,
              workType: item.content.workType,
              createType: item.content.createType,
              createCity: item.content.createCity,
              createCountry: item.content.createCountry,
              createDate: item.content.createDate,         //创作时间
              fileUrl: item.content.fileUrl,
              fileName: item.content.fileName
            })
          }
        }).catch(e)
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
      this.dataContent.content.fileName = this.works[this.workName].fileName
      this.dataContent.content.fileUrl = this.works[this.workName].fileUrl

      this.editForm.createType = this.createTypes[this.works[this.workName].createType].name
      this.dataContent.workId = this.works[this.workName].workId   //作品id
      this.Info.workId = this.works[this.workName].workId
      this.editForm.workId = this.works[this.workName].workId
      this.editForm.fileName = this.dataContent.content.fileName
      this.editForm.fileUrl = this.dataContent.content.fileUrl
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
      // copyrightCreateType: -1,    //著作权产生方式 0-个人1-合作2-法人3-职务4-委托
      //     createType: -1,             //创作性质 0-原创1-改编2-翻译3-汇编4-注释5-整理6-其他
      //     createCity: 0,              //创作城市 按城市号码表传，精确到市级
      //     createCountry: "中国",       //
      //     createDate: 0,              //
      //     authorInfos: [],            //
      //     workId: ""                  //
      //处理创作性质
      this.createTypes[this.dataContent.content.createType].isChoose = true
      this.$refs.createType.choose2(this.dataContent.content.createType)
      this.Info.createType = this.dataContent.content.createType
      //处理创作城市
      //CodeToText[六位数编码字符串]返回城市
      this.Info.createCity = this.works[this.workName].createCity
      let cityNumber = this.Info.createCity.toString()
      let City = ""
      console.log(cityNumber.length)
      let area1 = CodeToText[cityNumber]
      City += area1

      this.editForm.createCity = City
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
    async next() {
      let that = this
      if (this.status === 1) {                 //第一步时下一步的操作
        if (this.workName !== "" && this.Info.copyrightCreateType !== -1) {
          this.dataContent.content.workName = this.works[this.workName].workName
          await updateDeposit(this.Info, this.headers).then((res) => {
            console.log(res)
            if (res.data.data !== null) {
              console.log(res)
              that.status++
            }
          })
        }
      }else if (this.status === 2) {                    //第二步时下一步的操作
        if (this.Info.authorInfos.length > 0 && this.warn === "") {
          let flag = 0
          for(let i = 0; i < this.Info.authorInfos.length; i++) {
            if (this.Info.authorInfos[i].userId === "" || this.Info.authorInfos[i].signName === "") {
              flag = 1
              break
            }
          }
          if (flag === 0) {
            await updateDeposit(this.Info, this.headers).then(res=>{
              if (res.data.data !== null) {
                console.log(res)
                that.status++
              }
            })
          }
        }
      }else if (this.status === 3) {                    //第三步时下一步的操作
        console.log(this.Info)
        await launchDeposit(this.Info, this.headers).then(res=>{
          console.log(res)
          if (res.data.data !== null) {
            console.log(res)
            that.status++
          }
        })
      }
    },
    addAuthor() {
      let author = new AddAuthor(0,"")
      this.Info.authorInfos.push(author)     //用于发送数据
      let user = new GetUser("", "", "", 0)
      let newAuthor = new AddAuthors(user, [], "")
      this.authors.push(newAuthor)    //用于搜索

      let flag = 1
      switch (this.Info.copyrightCreateType) {
        case 0: {
          if (this.Info.authorInfos.length > 1) {
            this.warn = "*该著作权方式仅能有1名作者"
            flag = 0
          }
          break
        }
        case 1: {
          if (this.Info.authorInfos.length < 2) {
            this.warn = "*该著作权方式不能少于2名作者"
            flag = 0
          }
          break
        }
        case 2: {
          if (this.Info.authorInfos.length > 1) {
            this.warn = "*该著作权方式仅能有1名作者"
            flag = 0
          }
          break
        }
        case 3: {
          if (this.Info.authorInfos.length < 2) {
            this.warn = "*该著作权方式不能少于2名作者"
            flag = 0
          }
          break
        }
        case 4: {
          if (this.Info.authorInfos.length < 2) {
            this.warn = "*该著作权方式不能少于2名作者"
            flag = 0
          }
          break
        }
      }
      if (flag === 1) {
        this.warn = ""
      }

    },
    async searchAuthor(value, index) {
      // let headers = {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   headers: this.$store.state.token
      // }
      let that = this
      for(let i = 0; i < this.authors[index].result.length; i++) {   //先清空搜索内容
        that.authors[index].result.pop()
      }
      console.log(this.authors[index].search)
      let phone = Number(value)
      if (!isNaN(phone)) {
        await getUserInfoByNumber(value, this.headers).then(res=>{           //返回的是数组  通过手机号查找
          if (res.data.data!==null) {
            console.log(res.data)
            that.authors[index].result.push(res.data.data)
          }
        })
      }
      await getUserInfoByName(value, this.headers).then(res=>{             //通过用户名查找
        console.log(res)
        if (res.data.data !== null) {
          let flag = 0
          for(let j = 0; j < that.authors[index].result.length; j++) {
            if (that.authors[index].result[j].userId ===  res.data.data.userId) {   //检查id是否重复
              flag = 1    //如果出现了用户信息重复
            }
          }
          if (flag === 0) {
            that.authors[index].result.push(res.data.data)
          }
        }
      })

    },
    change(index) {    //修改id即可
      this.Info.authorInfos[index].userId = this.authors[index].result[this.authors[index].search].userId
      this.authorInfosText[index] = this.authors[index].result[this.authors[index].search].username + '（**' + this.authors[index].result[this.authors[index].search].name + '）' + '**************' + this.authors[index].result[this.authors[index].search].identificationNumber //获得字符串
      this.editForm.authorInfos[index] = this.authorInfosText[index]
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
    deleteAuthor(i) {           //删除
      this.Info.authorInfos.splice(i,1)
      this.editForm.authorInfos.splice(i,1)
      this.authors.splice(i,1)
      let flag = 1
      switch (this.Info.copyrightCreateType) {
        case 0: {
          if (this.Info.authorInfos.length <= 1) {
            flag = 0
          }
          break
        }
        case 1: {
          if (this.Info.authorInfos.length >= 2) {
            flag = 0
          }
          break
        }
        case 2: {
          if (this.Info.authorInfos.length <= 1) {
            flag = 0
          }
          break
        }
        case 3: {
          if (this.Info.authorInfos.length >= 2) {
            flag = 0
          }
          break
        }
        case 4: {
          if (this.Info.authorInfos.length >= 2) {
            flag = 0
          }
          break
        }
      }
      if (flag === 0) {
        this.warn = ""
      }
    },
    async last() {  //上一步
      let that = this
      if (this.status === 2) {
        let len = this.Info.authorInfos.length
        for (let i = 0; i < len; i++) {         //清楚作者数据
          this.Info.authorInfos.pop()
          this.authors.pop()
          this.authorInfosText.pop()
        }
        await updateDeposit(this.Info, this.headers).then(res=>{
          console.log(res)
          that.status--
        })
      }else if (this.status === 3) {
        this.status--
      }
    },
  },
  created () {
    // this.getWorkOptions()
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
  flex-direction: row-reverse;
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
#deposit>>>.el-input__inner{
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
#deposit>>>.el-input__inner::placeholder{
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #A0A0A0;
}
#deposit>>>.el-select-dropdown{
  margin: 0;
  width: 410px;
  max-height: 274px;

  background: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #8C8C8C;
}
#deposit>>>.el-popper .popper__arrow{
  display: none;
}
#deposit>>>.el-select-dropdown__item{
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
#deposit>>>.el-select-dropdown__item:hover{
  background-color: #DBDBDB;
}
#deposit>>>.el-select-dropdown__item.hover{
  background-color: #DBDBDB;
}

#deposit>>>.el-avatar .el-cascader-panel .el-radio .el-radio--medium.is-bordered .el-radio__label .el-radio__label{
  font-size: 16px;
}
#deposit>>>.el-cascader-menu{
  color: #070707;
  border-right: 1px solid #848484;
}
#deposit>>>.el-popper[x-placement^=bottom]{
  margin-top: 1px;
}
#deposit>>>.el-cascader__dropdown{
  font-size: 16px;
  background-color: #FFFFFF;
  border-color: #848484;
}
#deposit>>>.el-cascader-node.in-active-path, .el-cascader-node.is-active, .el-cascader-node.is-selectable.in-checked-path{
  color: #848484;
  font-weight: 500;
}
#deposit>>>.el-input.is-disabled .el-input__inner{
  background-color: #FFFFFF;
  color: #000000;
  border-color: #848484;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
#deposit>>>.el-input__prefix{
  display: none;
}
#deposit>>>.el-input__suffix-inner{
  display: none;
}
#deposit>>>.el-input::-webkit-scrollbar-thumb{
  width: 410px;
  height: 43px;
}

#authorsInfo{
  margin-top: 181px;
  position: relative;
  width: 100%;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
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
.authorLine{
  width: 925px;
  height: 1px;
  background-color: #CACACA;
}
.addAuthor{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
  margin-top: 18px;
  cursor: pointer;
}
.authorNum{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
}
.authorGapLine{
  width: 925px;
  height: 1px;
  background-color: #CACACA;
}
.authorKeepDraft{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
  cursor: pointer;
}
.authorLast{
  width: 184px;
  height: 54px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
  border-radius: 4px;
  border: 1px solid #326CC2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.authorNext{
  width: 184px;
  height: 54px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  margin-left: 11px;
  background-color: #326CC2;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.warn{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #EA5757;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;


}
.deleteAuthor{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #EA5757;
  margin-right: 110px;
  cursor: pointer;
}
#authorConfirm{
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
  margin-top: 23px;
  background-color: #FFFFFF;
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
}
.tips{
  margin-top: 35px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  width: 400px;
  display: flex;
  justify-content: center;
  color: #000000;
}
.infoItemBox{
  width: 400px;
  /*height: 259px;*/
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

.depositStar{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #EA5757;
}
.depositAuthor{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #404040;
  margin-left: 10px;
}
</style>