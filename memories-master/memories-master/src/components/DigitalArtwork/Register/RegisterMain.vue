<template>
  <div>
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <div id="register_main">
      <div class="head">
        <div class="steps">
          <p>编辑主题信息</p>
          <div class="step">
            <div class="step_active">
            </div>
            <div class="step_button">
            </div>
            <div class="step_bar"></div>
          </div>
          <div class="step_labels">
            <div>填写基本信息</div>
            <div>完善身份证明材料</div>
            <div>填写权利集合</div>
          </div>
        </div>
      </div>
      <div class="main" v-show="show1">
        <div class="info">
          <el-form label-position="right" label-width="100px">
            <el-form-item label="用户" required>
              <el-select>
              </el-select>
            </el-form-item>
            <el-form-item label="账号类型" required>
              <el-select placeholder="请选择账号类型">
              </el-select>
            </el-form-item>
            <el-form-item label="证件类型" required>
              <el-select placeholder="请选择证件类型">
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码" required>
              <el-input placeholder="请填写证件号码">
              </el-input>
            </el-form-item>
            <el-form-item label="证件地址" required>
              <el-input placeholder="请填写证件地址"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btns">
          <el-button type="primary" class="next" @click="next">下一步</el-button>
        </div>
      </div>
      <div class="main2" v-show="show2">
        <div class="info2">
          <el-form label-position="right" label-width="100px">
            <el-form-item label="用户id">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker placeholder="请选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="国家">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select placeholder="请选择性别"></el-select>
            </el-form-item>
            <el-form-item label="证件发证日期">
              <el-date-picker placeholder="请选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="证件到期日期">
              <el-date-picker  placeholder="请选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="民族">
              <el-select placeholder="请选择i民族"></el-select>
            </el-form-item>
            <el-form-item label="证件照片">
              <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">上传证件正面</div>
              </el-upload>
              <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">上传证件反面</div>
              </el-upload>
              <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">上传手持证件照片</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="btns">
          <el-button  type="primary" class="next" @click="next2">下一步</el-button>
          <el-button type="plain" class="previous" @click="previous2">上一步</el-button>
        </div>
      </div>
      <div class="main3" v-show="show3">
        <div class="info3">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
export default {
  components:{jyTabBar},
  data() {
    return {
      show1: true,
      show2: false,
      show3: false,
      pathTitle: [
        {name: "创作者家园", url: "/DigitalArtwork/Work"},
        {name: "上传作品", url: ""}
      ]
    }
  },
  methods: {
    next() {
      this.show1 = false
      this.show2 = true
    },
    next2() {
      this.show2 = false
      this.show3 = true
    },
    previous2() {
      this.show2 = false
      this.show1 = true
    }
   }
  }
</script>

<style scoped>
#register_main {
    position: relative;
    top: 48px;
    height: 784px;
    background-color: #FCFCFC;
    font-family: Inter;
}

.head {
  height: 133px;
  background-color: #FCFCFC;
}

.steps {
  width: 1021px;
  height: 97px;
  margin: 0 auto;
}

.steps p {
  position: relative;
  top: 21px;
  width: 120px;
  font-family: Inter;
  font-weight: 400;
  font-size: 20px;
  line-height: 24.2px;
}
.step {
  width: 1021px;
  margin: 0 auto;
}
.step_active {
  width: 97px;
  height: 7px;
  position: relative;
  top: 55px;
  background-color: #326CC2;
}

.step_button {
  width: 20px;
  height: 20px;
  background-color: #326CC2;
  position: relative;
  top: 42px;
  left: 86px;
  border-radius: 100%;
}

.step_bar {
  width: 904px;
  height: 7px;
  background-color: #efefef;
  position: relative;
  top: 28px;
  left: 106px;
}

.step_labels {
  width:  919px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  position: relative;
  top: 44px;
}

.info {
  width: 1021px;
  height: 439px;
  background-color: #F1F1F1;
  margin: 0 auto;
}

.el-form {
  padding-top: 23px;
  width: 555px;
  margin: 0 auto;
}
/* .el-form >>> .el-form-item__label {
  /* padding-left: 35px; */
  /* height: 24px;
  line-height: 24px; */


 .el-select {
  width: 411px;
  height: 43px;
  /* padding-left: 35px; */
}

 .el-input {
  width: 411px;
  height: 43px;
  /* padding-left: 35px;; */
}

.el-date-picker {
  width: 411px;;
  height: 43px;
}

.btns .next {
  width: 183.89px;
  height: 54px;
  float: right;
  background-color: #326CC2;
}

.btns .previous {
  width: 183.89px;
  height: 54px;
  float: right;
  position: relative;
  right: 10.22px;
}

.btns {
  position: relative;
  top: 46px;
  width: 1021px;
  margin: 0 auto;
}

.info2 {
  width: 1021px;
  background-color: #F1F1F1;
  margin: 0 auto;
}

.info3 {
  width: 1021px;
  height: 423px;
  background-color: #FFFFFF;
  margin: 0 auto; 
  position: relative;
  top: 23px;
}
</style>