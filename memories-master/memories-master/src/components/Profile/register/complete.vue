<template>
<!--完成注册-->
  <div id="completeRegister">
    <div class="frame">
      <div class="content">
        <p class="result">恭喜您注册成功</p>
        <p class="tips">请妥善保管您的用户名和密码</p>
        <p class="login" @click="login">去登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "complete",
  methods: {
    login() {
      this.$router.push("/userProfile/login")
    }
  }
}
</script>

<style scoped>
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