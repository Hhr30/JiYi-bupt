<template>
<!--编辑主体信息  填写基本信息-->
  <div class="basicInfoBack">
    <el-form class="SubjectForm">
      <div class="subjectItems">
        <div class="subjectItem">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">用户</p>
          </div>
          <div>
            <el-select v-model="subjects.userId" placeholder="请通过用户名/手机号搜索" :popper-append-to-body="false" filterable id="username">
              <el-option
                  v-for="(item, index) in usersInfo"
                  :key="'info'+index"
                  :label="item.nameString"
                  :value="item.userId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="subjectItem">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">账号类型</p>
          </div>
          <div>
            <el-select v-model="user.accountType" placeholder="请选择账号类型" :popper-append-to-body="false" filterable id="accountType" @change="changeAccountType">
              <el-option
                  v-for="(item, index) in accountType"
                  :key="'accountType'+index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="subjectItem">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">证件类型</p>
          </div>
          <div>
            <el-select v-model="subjects.idType" placeholder="请选择证件类型" :popper-append-to-body="false" filterable id="idType">
              <el-option
                  v-for="(item, index) in chooseIdType"
                  :key="'idType'+index"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="subjectItem">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">证件号码</p>
          </div>
          <div>
            <el-input v-model="subjects.idNumber" type="text" placeholder="请填写证件号码"></el-input>
          </div>
        </div>
        <div class="subjectItem">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">证件地址</p>
          </div>
          <div>
            <el-input v-model="subjects.residence" type="text" placeholder="请填写证件地址"></el-input>
          </div>
        </div>
      </div>
      <div>
        <el-button @click="next">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "SubjectInfo",
  data() {
    return {
      subjects: {
        userId: "",
        idType: "",
        idNumber: "",
        residence: "",
        material: {},
        rights: {}
      },
      user: {
        userString: "",
        idType: "",
        accountType: ""
      },
      usersInfo: [],
      isMoney: false,
      accountType: ["个人用户","机构"],
      chooseIdType: [
        {label: "身份证", value: "A2"},
        {label: "护照", value: "A3"},
        {label: "暂住证", value: "A4"},
        {label: "港澳通行证", value: "A5"},
        {label: "营业执照", value: "A6"}
      ],
      idType: [
        {label: "身份证", value: "A2"},
        {label: "护照", value: "A3"},
        {label: "暂住证", value: "A4"},
        {label: "港澳通行证", value: "A5"},
        {label: "营业执照", value: "A6"}
      ],
      workId: ""
      //idType: ["A2身份证", "A3护照", "A4暂住证", "A5港澳通行证", "A6营业执照"]
    }
  },
  created() {
    this.isMoney = this.$route.query.isMoney
    this.workId = this.$route.query.workId
    if (this.isMoney) {   //如果是有财产权的，自动填入用户信息
      let userInfo = this.$route.query.userInfo
      this.usersInfo.push(userInfo)
      this.subjects.userId = this.$route.query.userInfo.userId
    }
  },
  methods: {
    changeAccountType() {
      if (this.user.accountType === "机构") {
        let len = this.chooseIdType.length
        for(let i = 0; i < len; i++) {
          this.chooseIdType.pop()
        }
        this.chooseIdType.push(this.idType[4])
        this.subjects.idType = this.chooseIdType[0].value
      }else {
        let len = this.chooseIdType.length
        for(let i = 0; i < len; i++) {
          this.chooseIdType.pop()
        }
        for(let i = 0; i < this.idType.length; i++) {
          this.chooseIdType.push(this.idType[i])
        }
        this.subjects.idType = ""
      }
    },
    next() {
      this.$router.push({path: "/DigitalArtwork/registerMain/refineMat", query: {accountType: this.user.accountType, subjects: this.subjects, isMoney: this.isMoney, workId: this.workId}})
    }
  }
}
</script>

<style scoped>
.basicInfoBack{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.SubjectForm{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.subjectItem{
  display: flex;
  align-items: center;
  justify-content: center;
}
.itemTips{
  display: flex;
  align-items: center;
}
.subjectStars{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #EA5757;
}
.subjectTitle{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #797979;
}
.subjectItems{
  width: 1021px;
  height: 450px;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F1F1F1;
}
</style>