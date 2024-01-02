<template>
<!--信息确认-->
  <div id="authorConfirm">
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
          <p style="width: 80px">创作性质：</p><p style="width: 170px">{{createType}}</p>
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
          <p style="width: 180px">著作权产生方式：</p><p style="width: 170px">{{editForm.copyrightCreateType}}</p>
        </div>
        <div style="margin-top: 21px">
          <p style="width: 80px">作者信息：</p>
          <p v-for="(item, index) in editForm.authorInfos" style="margin-top: 5px">{{index+1}}.{{item}} &nbsp;&nbsp;&nbsp;署名：{{Info.authorInfos[index].signName}}</p>
        </div>
      </div>
    </div>
    <div class="next" @click="next">
      <button class="ensureBtn">确认</button>
    </div>
  </div>
</template>

<script>
import {launchDeposit} from "@/api";
export default {
  name: "infoConfirm",
  data() {
    return {
      Info: {},
      editForm: {},
      createType: 0
    }
  },
  methods: {
    next() {
      let that = this
      launchDeposit(this.Info).then(()=>{
        that.$router.push("/DigitalArtwork/deposit/complete")
      })
    }
  },
  created() {
    this.Info = this.$route.query.Info
    this.editForm = this.$route.query.editForm
    //创作性质 0-原创1-改编2-翻译3-汇编4-注释5-整理6-其他
    switch (this.Info.createType) {
      case 0: {
        this.createType = "原创"
        break
      }
      case 1: {
        this.createType = "改编"
        break
      }
      case 2: {
        this.createType = "翻译"
        break
      }
      case 3: {
        this.createType = "汇编"
        break
      }
      case 4: {
        this.createType = "注释"
        break
      }
      case 5: {
        this.createType = "整理"
        break
      }
      case 6: {
        this.createType = "其他"
        break
      }
    }
  }
}
</script>

<style scoped>
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
  height: 497px;
  margin-top: 23px;

  background: #FFFFFF;
  border-radius: 11px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.tips{
  margin-top: 35px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #000000;
}
.infoItemBox{
  width: 250px;
  height: 259px;
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
</style>