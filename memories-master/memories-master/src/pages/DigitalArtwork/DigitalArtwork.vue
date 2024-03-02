<template>
  <div id="artworkPage" style="position: absolute;width: 100%">
    <jy-tab-bar :is-back="false" :normal-title="normalTitle"></jy-tab-bar>
    <div class="content">
      <div class="lineTop"></div>
      <div class="functions">
        <div style="display: flex;justify-content: space-between;width: 100%">
          <div class="functionCard" @mouseenter="enterShortCard(1)" @mouseleave="leaveShortCard(1)" id="uploadWork"
            @click="changeUrl(0)">
            <p class="tip" id="uploadWorkText1">将您的作品基本信息上传到云织非遗上吧</p>
            <div class="CardItem">
              <img src="https://s1.ax1x.com/2022/06/25/jFIHoj.png" class="icon" alt="uploadEnter" id="uploadEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jF7HTe.png" class="icon" alt="uploadLeave" style="display: none"
                id="uploadLeave">
              <p class="items" id="uploadWorkText2">上传作品</p>
            </div>
          </div>
          <div class="functionCard" @mouseenter="enterShortCard(2)" @mouseleave="leaveShortCard(2)" id="workDeposit"
            @click="changeUrl(1)">
            <p class="tip" id="workDepositText1">我们会将您的作品固定在区块链上</p>
            <div class="CardItem">
              <img src="https://s1.ax1x.com/2022/06/25/jFTAEQ.png" class="icon" alt="depositEnter" id="depositEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jFb7PH.png" class="icon" alt="depositEnter" id="depositLeave"
                style="display: none">
              <p class="items" id="workDepositText2">作品存证</p>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;width: 100%;margin-top: 17px">
          <div class="functionCard" @mouseenter="enterShortCard(3)" @mouseleave="leaveShortCard(3)" id="Register"
            @click="changeUrl(2)">
            <p class="tip" id="RegisterText1">您将获得作品的13项版权通证</p>
            <div class="CardItem">
              <img src="https://s1.ax1x.com/2022/06/25/jFTENj.png" class="icon" alt="registerEnter" id="registerEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jFqmoF.png" class="icon" alt="registerLeave" id="registerLeave"
                style="display: none">
              <p class="items" id="RegisterText2">版权注册</p>
            </div>
          </div>
          <div class="functionCard" @mouseenter="enterShortCard(4)" @mouseleave="leaveShortCard(4)" id="enrollAuthor"
            @click="changeUrl(3)">
            <p class="tip" id="enrollAuthorText1">您将获得版权局发放的作品版权证书</p>
            <div class="CardItem">
              <img src="https://s1.ax1x.com/2022/06/25/jFXELt.png" class="icon" alt="enrollEnter" id="enrollEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jFqWWj.png" class="icon" alt="enrollLeave" id="enrollLeave"
                style="display: none">
              <p class="items" id="enrollAuthorText2">登记确权</p>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;width: 100%;margin-top: 17px">
          <div class="cardBottom" @mouseenter="enterShortCard(5)" @mouseleave="leaveShortCard(5)" id="postWork">
            <div class="worksBottomContent">
              <img src="https://s1.ax1x.com/2022/06/25/jFos10.png" class="icon" alt="postEnter" id="postEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jFX8Lq.png" class="icon" alt="postLeave" id="postLeave"
                style="display: none">
              <p class="items" id="postWorkText1">发布藏品</p>
              <p class="bottomItem" id="postWorkText2">请发布您创作的数字藏品</p>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;width: 100%;margin-top: 17px">
          <div class="cardBottom" @mouseenter="enterShortCard(6)" @mouseleave="leaveShortCard(6)" id="workAuthor">
            <div class="worksBottomContent">
              <img src="https://s1.ax1x.com/2022/06/25/jFTFHg.png" class="icon" alt="workEnter" id="workEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jFXJe0.png" class="icon" alt="workLeave" id="workLeave"
                style="display: none">
              <p class="items" id="workAuthorText1">作品授权</p>
              <p class="bottomItem" id="workAuthorText2">您可以将发布的作品授权给平台</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomWorks"></div>
    </div>
    <!--导航-->
    <!--
    <router-link to="/DigitalArtwork/upload"></router-link>
    <router-link to="/DigitalArtwork/deposit"></router-link>
    <router-link to="/DigitalArtwork/enroll"></router-link>
    <router-link to="/DigitalArtwork/register"></router-link>
    <router-link to="/DigitalArtwork/profile"></router-link>
    -->
    <!--内容展示-->
  </div>
</template>

<script>
import TabBar from "@/components/tabbar/DigitalArtwork/TabBar";
import Progress from "@/components/DigitalArtwork/Progress";
import Upload from "@/pages/DigitalArtwork/Upload/Upload";
import Register from "@/pages/DigitalArtwork/Register/Register";
import ProgressText from "@/components/DigitalArtwork/ProgressText";
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
export default {
  name: "DigitalArtwork",
  components: {
    TabBar,
    Upload,
    Register,
    Progress,
    ProgressText,
    jyTabBar
  },
  data() {
    return {
      normalTitle: [
        { title: "首页", url: "/home" },
        { title: "非遗星球", url: "/nonHeritagePlanet/nonHeritagePlanet" },
        { title: "数字展馆", url: "/exhibition/exhibitionHome" },
        { title: "创作者家园", url: "/DigitalArtwork/Work" },
        { title: "我的", url: this.$cookies.get('token') === null ? "/userProfile/login" : "/userProfile/userInfo" }
      ],
      url: [
        "/DigitalArtwork/upload",
        "/DigitalArtwork/deposit",
        "/DigitalArtwork/enroll",
        "/DigitalArtwork/registerRight"
      ]
    }
  },
  methods: {
    enterShortCard(type) {
      switch (type) {   //移动鼠标更改样式
        case 1: {
          document.getElementById("uploadWork").style.backgroundColor = "#20347C"
          document.getElementById("uploadWorkText1").style.color = "#ffffff"
          document.getElementById("uploadWorkText2").style.color = "#ffffff"
          document.getElementById("uploadEnter").style.display = "none"
          document.getElementById("uploadLeave").style.display = ""
          break
        }
        case 2: {
          document.getElementById("workDeposit").style.backgroundColor = "#20347C"
          document.getElementById("workDepositText1").style.color = "#ffffff"
          document.getElementById("workDepositText2").style.color = "#ffffff"
          document.getElementById("depositEnter").style.display = "none"
          document.getElementById("depositLeave").style.display = ""
          break
        }
        case 3: {
          document.getElementById("Register").style.backgroundColor = "#20347C"
          document.getElementById("RegisterText1").style.color = "#ffffff"
          document.getElementById("RegisterText2").style.color = "#ffffff"
          document.getElementById("registerEnter").style.display = "none"
          document.getElementById("registerLeave").style.display = ""
          break
        }
        case 4: {
          document.getElementById("enrollAuthor").style.backgroundColor = "#20347C"
          document.getElementById("enrollAuthorText1").style.color = "#ffffff"
          document.getElementById("enrollAuthorText2").style.color = "#ffffff"
          document.getElementById("enrollEnter").style.display = "none"
          document.getElementById("enrollLeave").style.display = ""
          break
        }
        case 5: {
          document.getElementById("postWork").style.backgroundColor = "#20347C"
          document.getElementById("postWorkText1").style.color = "#ffffff"
          document.getElementById("postWorkText2").style.color = "#ffffff"
          document.getElementById("postEnter").style.display = "none"
          document.getElementById("postLeave").style.display = ""
          break
        }
        case 6: {
          document.getElementById("workAuthor").style.backgroundColor = "#20347C"
          document.getElementById("workAuthorText1").style.color = "#ffffff"
          document.getElementById("workAuthorText2").style.color = "#ffffff"
          document.getElementById("workEnter").style.display = "none"
          document.getElementById("workLeave").style.display = ""
          break
        }
      }
    },
    leaveShortCard(type) {
      switch (type) {   //移动鼠标更改样式
        case 1: {
          document.getElementById("uploadWork").style.backgroundColor = ""
          document.getElementById("uploadWorkText1").style.color = "#606060"
          document.getElementById("uploadWorkText2").style.color = "#143094"
          document.getElementById("uploadLeave").style.display = "none"
          document.getElementById("uploadEnter").style.display = ""
          break
        }
        case 2: {
          document.getElementById("workDeposit").style.backgroundColor = ""
          document.getElementById("workDepositText1").style.color = "#606060"
          document.getElementById("workDepositText2").style.color = "#143094"
          document.getElementById("depositEnter").style.display = ""
          document.getElementById("depositLeave").style.display = "none"
          break
        }
        case 3: {
          document.getElementById("Register").style.backgroundColor = ""
          document.getElementById("RegisterText1").style.color = "#606060"
          document.getElementById("RegisterText2").style.color = "#143094"
          document.getElementById("registerEnter").style.display = ""
          document.getElementById("registerLeave").style.display = "none"
          break
        }
        case 4: {
          document.getElementById("enrollAuthor").style.backgroundColor = ""
          document.getElementById("enrollAuthorText1").style.color = "#606060"
          document.getElementById("enrollAuthorText2").style.color = "#143094"
          document.getElementById("enrollEnter").style.display = ""
          document.getElementById("enrollLeave").style.display = "none"
          break
        }
        case 5: {
          document.getElementById("postWork").style.backgroundColor = ""
          document.getElementById("postWorkText1").style.color = "#606060"
          document.getElementById("postWorkText2").style.color = "#143094"
          document.getElementById("postEnter").style.display = ""
          document.getElementById("postLeave").style.display = "none"
          break
        }
        case 6: {
          document.getElementById("workAuthor").style.backgroundColor = ""
          document.getElementById("workAuthorText1").style.color = "#606060"
          document.getElementById("workAuthorText2").style.color = "#143094"
          document.getElementById("workEnter").style.display = ""
          document.getElementById("workLeave").style.display = "none"
          break
        }
      }
    },
    changeUrl(type) {
      this.$router.push(this.url[type]).catch()
    }
  }
}
</script>

<style scoped>@import "../../assets/css/DigitalArtwork/DigitalArtwork.css";</style>