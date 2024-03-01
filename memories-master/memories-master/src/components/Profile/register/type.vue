<template>
<!--注册类型-->
  <div class="type">
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
</template>

<script>
export default {
  name: "type",
  data() {
    return {
      type: -1
    }
  },
  methods: {
    change1() {
      this.type = 0
      this.$router.push({path: "/register/info", query: {type: this.type}}).catch()
    },
    change2() {
      this.type = 100
      this.$router.push({path: "/register/info", query: {type: this.type}}).catch()
    }
  }
}
</script>

<style scoped>
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
</style>