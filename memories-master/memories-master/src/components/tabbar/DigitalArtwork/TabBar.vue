<template>
  <div id="tab-bar">
    <div class="tabBar">
      <img src="@/assets/img/DigitalArtwork/logo.png" alt="空" class="logoImg">
      <p class="titleText">枫香染</p>
      <div class="rightItems">
        <router-link to="/DigitalArtwork/upload" tag="p">作品上传</router-link>
        <router-link to="/DigitalArtwork/deposit" tag="p">作品存证</router-link>
        <router-link to="/DigitalArtwork/enroll" tag="p">版权注册</router-link>
        <router-link to="/DigitalArtwork/register" tag="p">登记确权</router-link>
        <router-link to="/DigitalArtwork/profile" tag="p">我的</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  methods: {

  }
}
</script>

<style scoped>
@import "./../../../assets/css/tabBar/DigitalArtwork/DigitalArtwork.css";
</style>