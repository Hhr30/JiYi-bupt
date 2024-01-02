<template>
  <div style="width: 100%;">
    <div>
      <img src="https://s1.ax1x.com/2022/06/24/jFtxE9.png" alt="back" class="back">
      <div class="loginContent" v-if="$store.state.token === ''">
        <div class="left">
          <img src="https://s1.ax1x.com/2022/06/24/jirDdU.png" class="jyFont" alt="jyFont">
          <p class="projectName">非遗数字藏品创意馆</p>
          <div class="line">
            <div class="line1"></div>
            <div class="line2"></div>
          </div>
        </div>
        <div class="right">
          <div class="type">
            <p class="typeName" :style="{color: loginType === 0 ? '#143094' : '#9C9C9C'}" @click="changeType1">个人用户</p>
            <p class="typeName" :style="{color: loginType === 1 ? '#143094' : '#9C9C9C'}" @click="changeType2">机构</p>
          </div>
          <div style="width: 85%;margin-top: 20px"><p class="tip">账号密码登录</p></div>
          <div>
            <form>
              <div class="account">
                <div class="accountLeft">
                </div>
                <input class="accountRight" type="text" placeholder="请输入用户名/手机号" v-model="username" />
              </div>
              <div class="account">
                <div class="accountLeft"></div>
                <input class="accountRight" type="password" placeholder="密码" v-model="password" autocomplete="off" />
              </div>
              <div class="isError"><p class="error" v-if="isError">*{{response}}</p></div>
              <div style="width: 100%;display: flex;justify-content: center">
                <input type="button" value="立即登录" class="login" @click="login" />
              </div>
            </form>
          </div>
          <div class="bottomTips">
            <div class="forget">忘记密码</div>
            <div class="registerTip">
              <p class="noAccount">还没有账号？</p>
              <p class="register" @click="register">立即注册</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="$store.state.token === ''"></div>
    </div>
  </div>
  <!--登录-->
</template>

<script>
function Account(username, password) {
  this.username = username
  this.password = password
}
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import {userLogin} from "@/api";
export default {
  name: "login",
  components: {
    jyTabBar
  },
  data() {
    return {
      loginType: 0,
      isError: false,
      username: "",
      password: "",
      token: "",
      response: ""
    }
  },
  methods: {
    changeType1() {
      this.loginType = 0
    },
    changeType2() {
      this.loginType = 1
    },
    login() {
      const user = new Account(this.username,this.password)

      userLogin(user).then(res=>{
        const body = res.data
        console.log(res)
        if(body.msg === "SUCCESS") {
          this.isError = false
          this.response = ""
          this.$cookies.set('token', body.data.token.split(' ')[1])
          this.$router.push("/userProfile/userInfo")
        }else {
          this.response = body.msg
          this.isError = true
        }
      })
    },
    register() {
      this.$router.push("/register")
    }
  },
  created() {
    // 如果已经有了token，则跳转到userInfo
    if (this.$cookies.isKey('token')) {
      this.$router.push("/userProfile/userInfo")
    } else {
      this.$message({
        message: '请进行登录',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.loginContent{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left{
  margin-top: 135px;
  margin-left: 100px;
}
.jyFont{
  width: 620px;
  height: 345px;
  object-fit: cover;
}
.line{
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.line1{
  width: 280px;
  height: 0;
  margin-left: 30px;
  background-color: #C71010;
  border: 6px solid #C71010;
}
.line2{
  width: 81px;
  height: 0;
  margin-left: 10px;
  background-color: #143094;
  border: 6px solid #143094;
}
.projectName{
  font-family: 'Songti SC',serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 45px;

  letter-spacing: 0.01em;
  color: #000000;
  margin-left: 30px;
}
.right{
  margin-top: 200px;
  width: 420px;
  height: 520px;
  margin-right: 150px;

  background: #FFFFFF;
  border: 2px solid #143094;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.type{
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.typeName{
  width: 50%;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #9C9C9C;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.tip{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}
.account{
  width: 350px;
  height: 50px;
  background: #FFFFFF;
  border: 1px solid #C2C2C2;
  border-radius: 7px;
  margin-top: 25px;
  display: flex;
  overflow: hidden;
}
.accountLeft{
  width: 60px;
  height: 50px;
  background: #E9E9E9;
  border: 1px solid #C2C2C2;
  border-radius: 7px 0 0 7px;
  margin: 0;
}
.accountRight{
  outline: none;
  margin-left: 20px;
  width: 250px;
  border-radius: 0 7px 7px 0;
  border: none;
  font-family: 'Inter',ui-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;
}
.error{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #EA5757;
}
.isError{
  margin-top: 28px;
  height: 20px;
  width: 85%;
}
.login{
  width: 340px;
  height: 65px;
  background: #143094;
  border-radius: 7px;

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #FFFFFF;
  cursor: pointer;
  margin-top: 26px;
}
.forget{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #868686;
}
.bottomTips{
  width: 85%;
  margin-top: 43px;
  display: flex;
  justify-content: space-between;
}
.noAccount{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #5E5E5E;
}
.registerTip{
  display: flex;
}
.register{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #143094;
  cursor: pointer;
}
.bottom{
  width: 100%;
  height: 180px;
}
.back{
  width: 890px;
  height: 830px;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  margin-top: 40px;
}
</style>