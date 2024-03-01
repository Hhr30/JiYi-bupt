<template>
<!--注册-->
  <div>
    <jy-tab-bar :is-back="false" :normal-title="normalTitle"></jy-tab-bar>
    <div class="register">
      <div style="display: flex;position: absolute;margin-top: 90px;margin-left: 850px;z-index: 2;min-width: 180px" id="changeLogin" v-if="status!==3">
        <p>已有账号？</p>
        <p style="color: #326CC2;cursor:pointer;" @click="login">直接登陆</p>
      </div>
      <Progress :title-array="title" :status="status">
        <p slot="p-name">注册新用户</p>
      </Progress>
      <!--<router-link to="/register/type"></router-link>
      <router-link to="/register/info"></router-link>
      <router-link to="/register/complete"></router-link>-->
      <div style="margin-top: 250px;display: flex;flex-direction: column;align-items: center;width: 100%;min-width: 1400px">
        <div class="type" v-show="status === 1">
          <div class="everyType" @click="change1">
            <div class="inner">
              <img src="https://s1.ax1x.com/2022/06/24/jFU6OS.png" alt="choose1" class="img">
              <p class="registerType">机构注册</p>
            </div>
          </div>
          <div class="everyType" @click="change2">
            <div class="inner">
              <img src="https://s1.ax1x.com/2022/06/24/jFUfFs.png" alt="choose2" class="img">
              <p class="registerType">个人注册</p>
            </div>
          </div>
        </div>
        <div class="basicInfo" v-show="status === 2">
          <form>
            <div class="userInfo">
              <div class="info">
                <div class="itemInfo">
                  <p class="isNeed">*</p>
                  <p class="infoName">用户名</p>
                  <div class="inputFrame">
                    <input type="text" placeholder="请输入用户名" class="input" v-model="user.username"></input>
                  </div>
                  <p class="isRegister" v-if="nameUsed">{{response}}</p>
                  <p class="isRegister" v-if="notQualified">{{response}}</p>
                </div>
                <div class="itemInfo">
                  <p class="isNeed">*</p>
                  <p class="infoName">手机号</p>
                  <div class="inputFrame">
                    <input type="tel" placeholder="请输入手机号" class="input" v-model="user.phone"></input>
                  </div>
                  <p class="isRegister" v-if="illegalPhone">{{response}}</p>
                </div>
                <div class="itemInfo">
                  <p class="isNeed">*</p>
                  <p class="infoName">验证码</p>
                  <div class="inputFrame">
                    <input type="text" placeholder="请输入验证码" class="input" v-model="code"></input>
                    <p class="send" @click="checkPhone" id="send">发送验证码</p>
                  </div>
                </div>
                <div class="itemInfo">
                  <p class="isNeed">*</p>
                  <p class="infoName">密码</p>
                  <div class="inputFrame">
                    <input type="password" placeholder="请设置密码" class="input" v-model="password" autocomplete="off"></input>
                  </div>
                  <p class="isRegister" v-if="illegalPassword">{{response}}</p>
                </div>
                <div class="itemInfo">
                  <p class="isNeed">*</p>
                  <p class="infoName">确认密码</p>
                  <div class="inputFrame">
                    <input type="password" placeholder="请再次输入密码" class="input" v-model="ensurePassword" autocomplete="off"></input>
                  </div>
                  <p class="isRegister" v-if="passwordDiff">密码不一致</p>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="nextStep" @click="next">下一步</p>
              <p class="lastStep" @click="last">上一步</p>
            </div>
          </form>
          <div style="width: 100%; height: 126px"></div>
        </div>
        <div id="completeRegister" v-show="status === 3">
          <div class="frame">
            <div class="content">
              <p class="result">恭喜您注册成功</p>
              <p class="tips">请妥善保管您的用户名和密码</p>
              <p class="login" @click="login">去登录</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import Progress from "@/components/DigitalArtwork/Progress";
import {getUserInfoByName} from "@/api";
import {register} from "@/api";
export default {
  name: "register",
  components: {
    jyTabBar,
    Progress
  },
  data() {
    return {
      response: "",
      normalTitle: [
        {title: "首页", url: "/home"},
        {title: "数字展馆", url: "/exhibition/exhibitionHome"},
        {title: "创作者家园", url: "/DigitalArtwork/Work"},
        {title: "我的", url: this.$cookies.get('token') === null ? "/userProfile/login" : "/userProfile/userInfo"}
      ],
      title: ['选择账号类型', '编辑基本信息', '完成注册'],
      notQualified: false,     //用户名不合法
      illegalPhone: false,     //非法手机号
      illegalPassword: false,  //密码不符合
      user: {
        username: "",
        type: -1,
        password: "",
        phone: ""
      },
      password: "",   //密码
      ensurePassword: "",   //确认密码
      code: "",       //验证码
      nameUsed: false,  //用户名是否被使用
      isSend: true,
      passwordDiff: false,
      status: 1
    }
  },
  computed: {
    // status() {
    //   if(this.$route.fullPath.indexOf("/register/type") !== -1){
    //     return 1
    //   }
    //   if(this.$route.fullPath.indexOf("/register/info") !== -1){
    //     return 2
    //   }
    //   if(this.$route.fullPath.indexOf("/register/complete") !== -1){
    //     return 3
    //   }
    // }
  },
  methods: {
    login() {    //跳转至登录界面
      this.$router.push("/userProfile/login")
    },
    change1() {
      this.$message({
        message: '当前暂时无法进行机构注册',
        type: 'warning'
      })
      // this.user.type = 100
      // this.status++
    },
    change2() {
      this.user.type = 1
      this.status++
    },
    checkPhone() {
      //暂时先只实现点击开始计时
      if (this.isSend) {
        this.isSend = false
        let time = 60
        document.getElementById('send').style.cursor = "default"
        document.getElementById('send').style.color = "#A5A5A5"
        let timer = setInterval(() => {
          if(time === 0) {
            this.isSend = false
            document.getElementById('send').style.cursor = "pointer"
            document.getElementById('send').style.color = "#326CC2"
            clearInterval(timer)
            document.getElementById('send').innerText = "获取验证码"
          } else {
            document.getElementById('send').innerText = time + "秒后重试"
            time--
          }
        },1000)
      }
    },
    async next() {    //下一步
      let that = this
      // if (this.nameUsed === false) {
      //   if (this.password === this.ensurePassword) {
      //     this.user.password = this.password
      //     that.user.type = Number(that.user.type)
      //     await register(this.user).then(res=>{
      //       console.log(res)
      //       // that.$router.push("/register/complete")
      //     })
      //   }
      // }
      if (this.password === this.ensurePassword) {
        this.passwordDiff = false
        this.user.password = this.password
        await register(this.user).then(res=>{
          console.log(res)
          if (res.data.msg === "SUCCESS") {
            that.status++
          }else {
            that.response = res.data.msg
            if (that.response.indexOf("密码") > -1) {
              that.illegalPassword = true
              that.notQualified = false     //用户名不合法
              that.illegalPhone = false     //非法手机号
              that.nameUsed = false         //用户名是否被使用
            }else if (that.response.indexOf("用户名已存在") > -1) {
              that.illegalPassword = false
              that.notQualified = false     //用户名不合法
              that.illegalPhone = false     //非法手机号
              that.nameUsed = true         //用户名是否被使用
            }else if (that.response.indexOf("用户名只能") > -1) {
              that.illegalPassword = false
              that.notQualified = true     //用户名不合法
              that.illegalPhone = false     //非法手机号
              that.nameUsed = false         //用户名是否被使用
            }else if (that.response.indexOf("手机号") > -1) {
              that.illegalPassword = false
              that.notQualified = false     //用户名不合法
              that.illegalPhone = true     //非法手机号
              that.nameUsed = false         //用户名是否被使用
            }
          }
          // that.$router.push("/register/complete")
        })
      }else {
        this.passwordDiff = true
        that.illegalPassword = false
        that.notQualified = false
        that.illegalPhone = false
        that.nameUsed = false
      }
    },
    last() {    //上一步
      this.status--
    }
  },
  created() {
    this.status = 1
  }
}
</script>

<style scoped>
body{
  background-color: #E5E5E5;;
}
.register{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 1400px;
}
#changeLogin p{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
}
.type{
  display: flex;
  justify-content: space-between;
  width: 1060px;
}
.everyType{
  box-sizing: border-box;
  width: 520px;
  height: 335px;
  border: 2px solid #393939;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.img{
  width: 50px;
  height: 50px;
}
.inner{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.registerType{
  font-family: 'Helvetica',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  margin-top: 80px;
}
.basicInfo{
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF;
  border-radius: 13px;
}
.userInfo{
  width: 1021px;
  height: 436px;

  background: #FFFFFF;
  border-radius: 13px;

  display: flex;
  flex-direction: column;
}
.info{
  height: 30px;
  margin-left: 200px;
  display: flex;
  flex-direction: column;
}
.itemInfo{
  display: flex;
  align-items: center;
  margin-top: 18px;
}
.isNeed{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #EA5757;
}
.input{
  margin-left: 20px;
  width: 340px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #171717;
  outline: none;
  border: none;
}
input::-webkit-input-placeholder{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
.inputFrame{
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 470px;
  height: 48px;
  background: #FDFDFD;
  border: 1px solid #C1C1C1;
  border-radius: 7px;
  margin-left: 30px;

}
.send{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
  margin-right: 20px;
  cursor: pointer;
}
.infoName{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  width: 85px;
  color: #797979;
  margin-left: 10px;
}
.isRegister{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #EA5757;
  margin-left: 35px;
  width: 180px;
}
.step{
  width: 1021px;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 51px;
}
.nextStep{
  width: 185px;
  height: 55px;
  background: #326CC2;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
.lastStep{
  width: 185px;
  height: 55px;
  border: 1px solid #326CC2;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #326CC2;
  margin-right: 12px;
}
#completeRegister{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.frame{
  width: 1021px;
  height: 436px;
  background: #FFFFFF;
  border: 2px solid #143094;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.result{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 34px;
  color: #000000;
}
.tips{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #9E9E9E;
  margin-top: 8px;
}
.login{
  width: 200px;
  height: 62px;
  background: #143094;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
  cursor: pointer;
  color: #FFFFFF;
}
</style>