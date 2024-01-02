<template>
   <div id="registerAdd">
     <div class="keepSuccessBack" v-if="success">
     </div>
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
     <el-form style="width: 100%;display: flex; flex-direction: column;align-items: center;" :popper-append-to-body="false">
       <Item>
         <p slot="itemName">作品</p>
         <div slot="itemType">
           <el-select v-model="searchContent" placeholder="请输入作品名称/平台编号进行搜素" :popper-append-to-body="false" style="margin-top: 10px" :remote-method="getWorks" @change="handleWork" filterable remote>
             <el-option
                 v-for="(tip, pos) in worksOptions"
                 :key="pos"
                 :label="tip.workName"
                 :value="tip.workId">
             </el-option>
           </el-select>
         </div>
       </Item>
       <Item box-height="auto" v-if="userInfos.length !== 0">
         <p slot="itemName">主体列表</p>
         <div slot="itemType">
           <div v-for="(item, index) in userInfos" :key="'userInfos'+index">
             <p>第{{index + 1}}位</p>
             <div style="display: flex;align-items: center">
               <el-select v-model="item.nameString" placeholder="请通过用户名/手机号进行搜索" :popper-append-to-body="false" style="margin-top: 10px" filterable disabled>
                 <el-option
                     v-for="(tip, pos) in userInfos"
                     :key="pos"
                     :label="tip.username"
                     :value="tip.userId">
                 </el-option>
               </el-select>
               <p @click="refineInfo(index)" :id="'completeInfo' + index + 1" class="refineInfo">请完善主体信息</p>
             </div>
           </div>
           <div v-for="(item, index) in otherUserInfos" :key="'userInfos' + (userInfos.length + index)">
             <p>第{{userInfos.length + index + 1}}位</p>
             <div style="display: flex;align-items: center">
               <div>
                 <el-select v-model="item.search" placeholder="请通过用户名/手机号进行搜索" :popper-append-to-body="false" style="margin-top: 10px" :remote-method="(value)=>getUsers(value, index)" filterable remote>
                   <el-option
                       v-for="(user, pos) in searchUser[index]"
                       :key="'select' + index + pos"
                       :label="user.nameString"
                       :value="user.nameString">
                   </el-option>
                 </el-select>
               </div>
               <p @click="refineInfo(userInfos.length + index)" :id="'completeInfo'+ (userInfos.length + index + 1)" class="refineInfo">请完善主体信息</p>
               <p class="deleteObj" @click="deleteObj(index)">删除</p>
             </div>
           </div>
           <div class="registerBottomLine"></div>
           <p class="registerAddUser" @click="addUser">+添加用户</p>
         </div>
       </Item>
     </el-form>
   </div>
</template>

<script>
function AddSubject(userId, idType, idNumber, residence, material, rights) {
  this.userId = userId   //整数 // 用户id
  this.idType = idType   // A2身份证 A3护照 A4暂住证 A5港澳通行证 A6营业执照
  this.idNumber = idNumber   //证件号码
  this.residence = residence //证件地址
  this.material = material   //材料 对象数组
  this.rights = rights       // 如果拥有人身权，不为空   对象数组
}
function AddMaterial(id, birthday, nation, sex, dateStart, dateEnd, ethnic, legalRepresentative, files) {
  this.id = id    //证件id
  this.birthday = birthday   // yyyy-MM-dd 机构用户传空
  this.nation = nation       // 国家
  this.sex = sex             // 机构用户传空
  this.dateStart = dateStart // yyyy-MM-dd 证件发证日期
  this.dateEnd = dateEnd     // yyyy-MM-dd 证件发证日期
  this.ethnic = ethnic       // 民族 机构用户传空
  this.legalRepresentative = legalRepresentative   // 个人用户传空
  this.files = files         // 证明文件
}
function AddFile(fileId, fileType) {
  this.fileId = fileId   //文件id 整数 // 文件id
  this.fileType = fileType   // 个人（除护照外）：1正面2反面3手持；个人（护照）：1封面2个人信息页；机构：1正面2反面3营业执照
}
function AddRights(category, explain) {
  this.category = category  // 权利类别 0发表权1署名权2修改权3保护作品完整权
  this.explain = explain    // 权利说明 / 限制
}
function AddWork(type, workName, workId) {    //添加作品
  this.type = type   //0表示先通过作品名查找  1表示直接通过workId查找
  this.workName = workName
  this.workId = workId
}
function AddUser(username, name, identificationNumber, userId, nameString) {
  this.username = username
  this.name = name
  this.identificationNumber = identificationNumber
  this.userId = userId
  this.nameString = nameString
}
function AddOtherUser(username, name, identificationNumber, userId, nameString, search) {
  this.username = username
  this.name = name
  this.identificationNumber = identificationNumber
  this.userId = userId
  this.nameString = nameString
  this.search = search
}
function AddSearchUser(username, name, nameString, userId, phone) {
  this.username = username
  this.name = name
  this.nameString = nameString
  this.userId = userId
  this.phone = phone
}
import Item from "@/components/DigitalArtwork/Item";
import {getWork, getWorkList, getWorkByName, getEnrollRes, getWorkById, getUserById, getUserInfoByName, getUserInfoByNumber} from "@/api";
export default {
  components: {Item},
  data() {
    return {
      success: false,
      subjects: [],
      workId: 0,
      works: [],           //搜索出的作品列表
      worksOptions: [],
      searchContent: "",
      searchWorks: [],      //搜索出来的作品列表
      object: null,
      userInfosId: [],         //主体用户列表
      userInfos: [],
      otherUserInfos: [],       //无财产权但有人身权的用户
      searchUser: [],            //用于搜索的用户
      searchUserOptions: []      //*****************************
    }
  },
  methods: {
    ensure() {
      this.success = false
    },
    change(index) {

    },
    async getWorks(content) {
      let that = this
      let workId = []         //通过作品名获得的作品Id
      let workName = []       //对应的名字
      let workIdFlag1 = 0     //可以通过作品名找到获得版权注册的作品
      let workIdFlag2 = 0     //可以通过id找到获得版权注册的作品
      let idLen = 0           //通过id找到的返回的结果数

      for(let i = 0; i < this.works.length; i++) {
        this.works.pop()
      }
      for(let i = 0; i < this.searchWorks.length; i++) {
        this.searchWorks.pop()
      }
      for(let i = 0; i < this.worksOptions.length; i++) {
        this.worksOptions.pop()
      }

      await getWorkByName(content).then(res=>{             //通过作品名获取作品的id
        for(let i = 0; i < res.data.data.length; i++) {
          workId.push(res.data.data[i].workId)
          workName.push(res.data.data[i].content.workName)
        }
      },err=>{
        workId = []
      })
      //获得对应作品名的id后通过id查找
      if (workId.length !== 0) {
        for(let i = 0 ;i < workId.length; i++) {
          await getEnrollRes(workId[i]).then(res=>{                       //两个id查找 通过作品名获得id再通过这个获得版权注册信息
            that.searchWorks.push(res.data.data)                          //searchWorks保留原始返回数据  Works为处理过的获得的数据
            let work = new AddWork(0, workName[i], res.data.data.workId)
            workId[i] = res.data.data.workId
            that.works.push(work)
          })
        }
      }
      try {
        await getEnrollRes(Number(content)).then(res=>{              //直接作为id 看看能否返回，如果有id(在版权注册能搜到)，则通过id获得作品信息中的名字
          that.searchWorks.push(res.data.data)
          workIdFlag1 = 1
          idLen++
        })
        if (workIdFlag1 === 1) {
          await getWorkById(Number(content)).then(res=>{   //返回作品信息
            let work = new AddWork(1, res.data.data.basic.content.workName, res.data.data.workId)
            that.works.push(work)
            workIdFlag2 = 1
          })
          if (workIdFlag2 !== 1) {
            for (let i = 0; i < idLen; i++) {
              this.searchWorks.pop()
            }
          }
        }
      }catch (e) {

      }
      setTimeout(() => {
        this.worksOptions = this.works.filter(item => {
          return item.workName.indexOf(content) > -1 || item.workId.toString().indexOf(content) > -1
        })
      }, 200)

    },
    handleWork(item) {   //根据选择处理主体列表
      for(let i = 0; i < this.userInfosId.length; i++) {    //先清空
        this.userInfos.pop()
        this.userInfosId.pop()
      }
      let workId = this.searchContent
      console.log(workId)
      let that = this
      for(let i = 0; i < this.searchWorks.length; i++) {   //找出对应的作品信息
        if (this.searchWorks[i].workId === workId) {
          this.object = this.searchWorks[i]
        }
      }
      console.log(this.object)
      for(let i = 0; i < this.object.content.copyrights.length; i++) {
        for(let j = 0; j < this.object.content.copyrights[i].userInfos.length; j++) {
          if (this.userInfosId.indexOf(this.object.content.copyrights[i].userInfos[j].userId) < 0) {        //如果这个用户还没存在用户列表里
            getUserById(this.object.content.copyrights[i].userInfos[j].userId).then(res=>{
              let user = new AddUser(res.data.data.username, res.data.data.name, res.data.data.identificationNumber, res.data.data.userId, that.selectUser(res.data.data.username, res.data.data.name))
              that.userInfosId.push(this.object.content.copyrights[i].userInfos[j].userId)
              that.userInfos.push(user)
            })
          }
        }
      }
    },
    formatName(name) {
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
    selectUser(username, name) {
      return username + '（' + this.formatName(name) + '）'
    },
    refineInfo(index) {
      let that = this
      if (index <= this.userInfos.length - 1) {  //isMoney有无财产权
        this.$router.push({path: "/DigitalArtwork/registerMain", query: {isMoney: true, userInfo: that.userInfos[index], workId: that.searchContent}})
      }else {
        this.$router.push({path: "/DigitalArtwork/registerMain", query: {isMoney: false, userInfo: that.otherUserInfos[index - that.userInfos.length], workId:that.searchContent}})
      }
    },
    addUser() {     //添加主体用户
      let user = new AddOtherUser("","","",0,"","")
      this.otherUserInfos.push(user)
      let array = []
      let array2 = []
      this.searchUser.push(array)
      this.searchUserOptions.push(array2)
    },
    async getUsers(value, index) {
      let that = this
      let len1 = this.searchUser[index].length
      let len2 = this.searchUserOptions[index].length
      for(let i = 0; i < len1; i++) {    //先清空
        this.searchUser[index].pop()
      }
      for(let i = 0; i < len2; i++) {    //先清空
        this.searchUserOptions[index].pop()
      }
      await getUserInfoByName(value).then(res=>{
        let user = new AddSearchUser(res.data.data.username, res.data.data.name, that.selectUser(res.data.data.username, res.data.data.name), res.data.data.userId, res.data.data.phone)
        that.searchUser[index].push(user)
      })
      await getUserInfoByNumber(Number(value)).then(res=>{
        let user = new AddSearchUser(res.data.data.username, res.data.data.name, that.selectUser(res.data.data.username, res.data.data.name), res.data.data.userId, res.data.data.phone)
        that.searchUser[index].push(user)
      })

      // for(item in this.searchUser[index]) {
      //   if (item.name.indexOf(value) > -1 || item.phone.indexOf(value) > -1) {
      //     this.searchUserOptions[index].push(item)
      //   }
      // }
      // for(let i = 0; i < this.searchUser[index].length; i++){
      //   if(this.searchUser[index][i].name.indexOf(value) > -1 || this.searchUser[index][i].phone.indexOf(value) > -1) {
      //     this.searchUserOptions[index].push(this.searchUser[index][i])
      //   }
      // }
    },
    deleteObj(index) {
      this.otherUserInfos.splice(index,1)
      this.searchUser.splice(index,1)
      this.searchUserOptions.splice(index,1)
    }
}
}
</script>

<style scoped>
#registerAdd{
  margin-top: 181px;
  position: absolute;
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
.registerBottomLine{
  width: 952px;
  height: 1px;
  background-color: #CACACA;
}
.registerAddUser{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
  margin-top: 18px;
  cursor: pointer;
  margin-bottom: 41px;
}
.refineInfo{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
  color: #326CC2;
  margin-left: 76px;
}
.deleteObj{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #EA5757;
  cursor: pointer;
  margin-left: 245px;
}
</style>