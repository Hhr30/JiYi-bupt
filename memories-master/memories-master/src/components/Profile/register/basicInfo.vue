<template>
<!--基本信息-->
  <div class="basicInfo">
    <form>
      <div class="userInfo">
        <div class="info">
          <div class="itemInfo">
            <p class="isNeed">*</p>
            <p class="infoName">用户名</p>
            <div class="inputFrame">
              <input type="text" placeholder="请输入用户名" class="input" v-model="user.username" @keydown="checkName"></input>
            </div>
            <p class="isRegister" v-if="nameUsed">该用户名已被注册</p>
          </div>
          <div class="itemInfo">
            <p class="isNeed">*</p>
            <p class="infoName">手机号</p>
            <div class="inputFrame">
              <input type="tel" placeholder="请输入手机号" class="input" v-model="user.phone"></input>
            </div>
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
          </div>
          <div class="itemInfo">
            <p class="isNeed">*</p>
            <p class="infoName">确认密码</p>
            <div class="inputFrame">
              <input type="password" placeholder="请再次输入密码" class="input" v-model="ensurePassword" autocomplete="off"></input>
            </div>
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
</template>

<script>
import {getUserInfoByName} from "@/api";
import {register} from "@/api";
export default {
  name: "basicInfo",
  data() {
    return {
      user: {
        username: "",
        type: this.$route.query.type,
        password: "",
        phone: ""
      },
      password: "",   //密码
      ensurePassword: "",   //确认密码
      code: "",       //验证码
      nameUsed: false,  //用户名是否被使用
      isSend: true
    }
  },
  methods: {
    async checkName() {   //检查用户名是否存在
      let that = this
      await Promise.all([getUserInfoByName(that.user.username)]).then(res=>{   //还没用上真的接口
        if (res.data.data.username === that.username) {
          that.nameUsed = true
        }
      }).catch(err=>{

      })
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
      //检查验证码  暂无
      //检查用户名
      //检查密码
      let that = this
      if (this.nameUsed === false) {
        if (this.password === this.ensurePassword) {
          this.user.password = this.password
          that.user.type = Number(that.user.type)
          await register(this.user).then(res=>{
            console.log(res)
            that.$router.push("/register/complete")
          })
        }
      }
    },
    last() {    //上一步
      this.$router.push("/register/type")
    }
  }
}
</script>

<style scoped>
body{
  background-color: #E5E5E5;;
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
</style>