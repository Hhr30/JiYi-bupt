<template>
<!--作者信息-->
  <div id="authorInfo">
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
      <Item box-height="auto">
        <p slot="itemName">作者</p>
        <div slot="itemType">
          <div>
            <div v-for="(item, index) in authors" :key="'authorInfos'+index" class="author" :style="{marginTop: index === 0 ? '' : '28px'}">
              <p class="authorNum">第{{index+1}}位</p>
              <div>
                <div style="display: flex;align-items: center;justify-content: space-between" @keydown="searchAuthor(index)">
                  <el-select v-model="item.search" placeholder="请输入用户名/手机号进行查询" :popper-append-to-body="false" style="margin-top: 20px" @change="change(index)" filterable>
                    <el-option
                        v-for="(tip, pos) in item.result"
                        :key="pos"
                        :label="tip.username + ' (' + formatName(tip.name) + ') ' + tip.identificationNumber"
                        :value="pos"> <!--??-->
                    </el-option>
                  </el-select>
                  <p @click="deleteAuthor(index)" class="deleteAuthor">删除</p>
                </div>
                <div>
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
        <p class="authorKeepDraft" @click="keepDraft">保存草稿</p>
        <div style="display: flex;">
          <el-button type="text" class="authorLast" @click="last">上一步</el-button>
          <el-button type="primary" class="authorNext" @click="next">下一步</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
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

import { getUserInfoByName, getUserInfoByNumber, updateDeposit } from '@/api.js'
import Item from "@/components/DigitalArtwork/Item";
export default {
  name: "authorInfo",
  components: {
    Item
  },
  data() {
    return {
      success: false,
      Info: {},             //用于传送的数据信息
      editForm: {},         //用于显示的数据信息
      authorInfos: [],      //搜索到的信息数据
      editAuthorInfos: [],   //编辑的数据
      authors: [],            //作者信息
      authorInfosText: [],
      warn: ""
    }
  },
  methods: {
    ensure() {
      this.success = false
    },
    addAuthor() {
      let author = new AddAuthor(0,"")
      this.Info.authorInfos.push(author)
      let user = new GetUser("", "", "", 0)
      let newAuthor = new AddAuthors(user, [], "")
      this.authors.push(newAuthor)

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
    searchAuthor(index) {
      let that = this
      for(let i = 0; i < this.authors[index].result.length; i++) {   //先清空
        that.authors[index].result.pop()
      }
      console.log(this.authors[index].search)
      getUserInfoByNumber(this.authors[index].search).then(res=>{
        that.authors[index].result.push(res.data.data)
      })
      getUserInfoByName(this.authors[index].search).then(res=>{
        that.authors[index].result.push(res.data.data)
      })

    },
    change(index) {    //修改id即可
      this.Info.authorInfos[index].userId = this.authors[index].result[this.authors[index].search].userId
      this.authorInfosText[index] = this.authors[index].result[this.authors[index].search].username + ' (' + this.formatName(this.authors[index].result[this.authors[index].search].name) + ') ' + this.authors[index].result[this.authors[index].search].identificationNumber //获得字符串
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
    last() {
      window.history.back()
    },
    next() {
      let that = this
      updateDeposit(this.Info).then(res=>{
        if (that.Info.authorInfos.length > 0 && that.warn === "") {
          that.$router.push({path: "/DigitalArtwork/deposit/confirmInfo", query: {Info: that.Info, editForm: that.editForm}}).catch
        }
      })
    }

  },
  created() {
    this.Info = this.$route.query.Info    //传送的数据
    this.editForm = this.$route.query.editForm     //用于显示的数据
  }
}
</script>

<style>
#authorInfo{
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
</style>