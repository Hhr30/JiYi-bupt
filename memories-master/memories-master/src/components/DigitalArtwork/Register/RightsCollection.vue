<template>
<!--编辑主体信息  填写权利集合-->
  <div class="rightsCollection">
    <div class="collectionItems">
      <div class="collTitle">
        <p class="collStar" v-if="this.isMoney">*</p>
        <p class="collTitleInner">权利集合</p>
        <p v-if="this.accountType === '机构'"></p>
      </div>
      <div class="collItem" v-for="(item, index) in selectRights" :key="'rights'+index">
        <img src="./../../../assets/img/function/selected.png" :alt="'selected'+index" class="selectIcon">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightsCollection",
  data() {
    return {
      subjects: {},
      accountType: "",
      isMoney:false,
      workId:"",
      selectRights: [
        {label: "发表权", value: "0", isChoose: false, explain: ""},
        {label: "署名权", value: "1", isChoose: false, explain: ""},
        {label: "修改权", value: "2", isChoose: false, explain: ""},
        {label: "保护作品权", value: "3", isChoose: false, explain: ""}
      ],
    }
  },
  created() {
    this.subjects = this.$route.query.subjects
    this.accountType = this.$route.query.accountType
    this.isMoney = this.$route.query.isMoney
    this.workId = this.$route.query.workId
  }
}
</script>

<style scoped>
.rightsCollection{
  width: 100%;
  min-width: 1400px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eeeeee;
  margin-top: 181px;
}
.collectionItems{
  width: 961px;
  height: 363px;
  background: #FFFFFF;
  border-radius: 8px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  padding: 30px 30px;
}
.collTitle{
  display: flex;
  align-items: center;
}
.collStar{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #EA5757;
}
.collTitleInner{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #404040;
}
.collItem{
  display: flex;
  align-items: center;
}
.selectIcon{
  width: 28px;
  height: 28px;
  object-fit: cover;
  cursor: pointer;
}
</style>