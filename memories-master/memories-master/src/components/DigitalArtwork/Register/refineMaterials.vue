<template>
<!--编辑主体信息  完善身份证明材料-->
  <div class="materials">
    <el-form class="SubjectForm">
      <div class="subjectItems">
        <div class="subjectItem">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">用户id</p>
          </div>
          <div>
            <el-input type="text" placeholder="请填写用户id" v-model="subjects.idNumber" disabled></el-input>
          </div>
        </div>
        <div class="subjectItem" v-if="accountType === '个人用户'">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">生日</p>
          </div>
          <div>
            <el-date-picker
                v-model="birthday"
                type="date"
                placeholder="请选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="subjectItem">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">国家</p>
          </div>
          <div>
            <el-input v-model="subjects.material.nation" disabled></el-input>
          </div>
        </div>
        <div class="subjectItem" v-if="accountType === '个人用户'">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">性别</p>
          </div>
          <div>
            <el-select v-model="subjects.material.sex" placeholder="请选择性别" :popper-append-to-body="false" filterable id="gender">
              <el-option
                  v-for="(item, index) in gender"
                  :key="'gender'+index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="subjectItem">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">证件发证日期</p>
          </div>
          <div>
            <el-date-picker
                v-model="dateStart"
                type="date"
                placeholder="请选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="subjectItem">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">证件到期日期</p>
          </div>
          <div>
            <el-date-picker
                v-model="dateEnd"
                type="date"
                placeholder="请选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="subjectItem" v-if="accountType === '个人用户'">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">民族</p>
          </div>
          <div>
            <el-select v-model="subjects.material.ethnic" placeholder="请选择民族" :popper-append-to-body="false" filterable id="ethnic">
              <el-option
                  v-for="(item, index) in ethnics"
                  :key="'ethnic'+index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="subjectItem" v-if="accountType === '机构'">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">法定代表人</p>
          </div>
          <div>
            <el-input type="text" placeholder="请填写联系方式" v-model="subjects.material.legalRepresentative"></el-input>
          </div>
        </div>
        <div class="subjectItemFile">
          <div class="itemTips">
            <p class="subjectStars">*</p>
            <p class="subjectTitle">证件照片</p>
          </div>
          <div>
            <div>        <!--普通照片-->
              <div class="idCard" @click="showImg1()">
                <img src="https://s1.ax1x.com/2022/06/29/jnvSZF.png" class="addIcon" alt="add1" id="add1"
                     :style="{display: img1.length > 0 ? 'none' : ''}">
                <div style="display: flex;flex-direction: column;align-items: center" id="uploadText1" :style="{display: img1.length > 0 ? 'none' : ''}">
                  <p class="addText" v-if="subjects.idType !== 'A3'">上传证件正面</p>
                  <p class="addText" v-if="subjects.idType === 'A3'">上传封面</p>
                </div>
                <img :src="item" alt="file1" :id="'img1'+index" v-for="(item, index) in img1" :key="'img1'+index" class="identifyImg">
              </div>
              <input type="file" id="file1" accept="image/*" @change="getPicture1($event)" style="display: none"></input>
            </div>
            <div>
              <div class="idCard" style="margin-top: 15px" @click="showImg2()">
                <img src="https://s1.ax1x.com/2022/06/29/jnvSZF.png" class="addIcon" alt="add2" id="add2" v-if="img2.length === 0">
                <div style="display: flex;flex-direction: column;align-items: center" v-if="img2.length === 0">
                  <p class="addText" v-if="subjects.idType !== 'A3'">上传证件反面</p>
                  <p class="addText" v-if="subjects.idType === 'A3'">上传个人信息页</p>
                </div>
                <img :src="item" alt="file2" :id="'img2'+index" v-for="(item, index) in img2" :key="'img2'+index" class="identifyImg">
              </div>
              <input type="file" id="file2" accept="image/*" @change="getPicture2($event)" style="display: none"></input>
            </div>
            <div v-if="subjects.idType !== 'A3'">  <!--如果是护照-->
              <div class="idCard" style="margin-top: 15px" @click="showImg3()">
                <img src="https://s1.ax1x.com/2022/06/29/jnvSZF.png" class="addIcon" alt="add3" id="add3" v-if="img3.length === 0">
                <div style="display: flex;flex-direction: column;align-items: center" v-if="img3.length === 0">
                  <p class="addText">上传手持证件照片</p>
                </div>
                <img :src="item" alt="file3" :id="'img3'+index" v-for="(item, index) in img3" :key="'img3'+index" class="identifyImg">
              </div>
              <input type="file" id="file3" accept="image/*" @change="getPicture3($event)" style="display: none"></input>
            </div>
          </div>
        </div>
      </div>
      <div class="stepButton">
        <div class="nextMaterials" @click="next">下一步</div>
        <div class="lastMaterials" @click="last">上一步</div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {upload} from "@/api";
function AddSubject(userId, idType, idNumber, residence, material, rights) {
  this.userId = userId
  this.idType = idType
  this.idNumber = idNumber
  this.residence = residence
  this.material = material
  this.rights = rights
}
function AddMaterial(id, birthday, nation, sex, dateStart, ethnic, legalRepresentative, files) {
  this.id = id
  this.birthday = birthday
  this.nation = nation
  this.sex = sex
  this.dateStart = dateStart
  this.ethnic = ethnic
  this.legalRepresentative = legalRepresentative
  this.files = files
}
function AddFile(fileId, fileType) {
  this.fileId = fileId
  this.fileType = fileType
}
export default {
  name: "refineMaterials",
  data() {
    return {
      subjects: {},
      accountType: "",
      isMoney:false,
      birthday: "",
      gender: ["男","女"],
      dateStart: "",
      dateEnd: "",
      ethnics: ["汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族", "黎族", "傣族", "畲族", "傈僳族",
            "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族",
            "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
      ],
      file1Img: "",
      img1: [],
      img2: [],
      img3: [],
      workId:""
    }
  },
  created() {
    let subjects = this.$route.query.subjects
    this.accountType = this.$route.query.accountType
    this.isMoney = this.$route.query.isMoney
    this.workId = this.$route.query.workId
    let files = []
    if(subjects.idType === "A3") {   //护照
      let file1 = new AddFile(0,"1")  //封面
      let file2 = new AddFile(0,"2")  //个人信息页
      files.push(file1)
      files.push(file2)
    }else {
      let file1 = new AddFile(0,"1")  //正面
      let file2 = new AddFile(0,"2")  //反面
      let file3 = new AddFile(0,"3")  //手持
      files.push(file1)
      files.push(file2)
      files.push(file3)
    }
    let material = new AddMaterial("","","中国","","","","",files)
    this.subjects = new AddSubject(subjects.userId, subjects.idType, subjects.idNumber, subjects.residence, material, [])
  },
  methods: {         //再写一个异常处理  数据检查
    uploadImgFile() {
    },
    async getPicture1(e) {
      let that = this
      let forms = new FormData()
      let src = window.URL.createObjectURL(e.target.files[0]);
      forms.append("file", src)
      forms.append("category", "subject_file")
      forms.append("workId", this.workId)
      forms.append("type", "1")
      await upload(forms).then(res=>{
        console.log(res.data.data)
        let file = {fileId: res.data.data.fileId, fileType: "1"}
        let flag = 0
        for(let i = 0; i < that.subjects.material.files.length; i++) {
          if(that.subjects.material.files[i].fileType === "1") {
            that.subjects.material.files[i].fileId = res.data.data.fileId
            flag = 1
            break
          }
        }
        if (flag === 0) {
          that.subjects.material.files.push(file)
        }
      })
      //显示图片
      //this.img1 = e.target.files[0]    //处理图片正面
      for (let i = 0; i <this.img1.length; i++) {
        this.img1.pop()
      }
      this.img1.push(src)
    },
    async getPicture2(e) {
      let that = this
      let forms = new FormData()
      let src = window.URL.createObjectURL(e.target.files[0]);
      forms.append("file", src)
      forms.append("category", "subject_file")
      forms.append("workId", this.workId)
      forms.append("type", "2")
      await upload(forms).then(res=>{
        console.log(res.data.data)
        let file = {fileId: res.data.data.fileId, fileType: "2"}
        let flag = 0
        for(let i = 0; i < that.subjects.material.files.length; i++) {
          if(that.subjects.material.files[i].fileType === "2") {
            that.subjects.material.files[i].fileId = res.data.data.fileId
            flag = 1
            break
          }
        }
        if (flag === 0) {
          that.subjects.material.files.push(file)
        }
      })
      //显示图片
      //this.img1 = e.target.files[0]    //处理图片正面
      for (let i = 0; i <this.img2.length; i++) {
        this.img2.pop()
      }
      this.img2.push(src)
    },
    async getPicture3(e){
      let that = this
      let forms = new FormData()
      let src = window.URL.createObjectURL(e.target.files[0]);
      forms.append("file", src)
      forms.append("category", "subject_file")
      forms.append("workId", this.workId)
      forms.append("type", "3")
      await upload(forms).then(res=>{
        console.log(res.data.data)
        let file = {fileId: res.data.data.fileId, fileType: "3"}
        let flag = 0
        for(let i = 0; i < that.subjects.material.files.length; i++) {
          if(that.subjects.material.files[i].fileType === "3") {
            that.subjects.material.files[i].fileId = res.data.data.fileId
            flag = 1
            break
          }
        }
        if (flag === 0) {
          that.subjects.material.files.push(file)
        }
      })
      //显示图片
      //this.img1 = e.target.files[0]    //处理图片正面
      for (let i = 0; i <this.img3.length; i++) {
        this.img3.pop()
      }
      this.img3.push(src)
    },
    showImg1() {
      document.getElementById('file1').click()
    },
    showImg2() {
      document.getElementById('file2').click()
    },
    showImg3() {
      document.getElementById('file3').click()
    },
    next() {
      //先检查用户类型
      if (this.accountType === "机构") {   //检查数据  机构  法人代表  文件长度
        if (this.dateStart !== "" && this.dateEnd !== "" && this.subjects.material.legalRepresentative !== "" && this.subjects.material.files.length === 3) {
          //日期处理
          let date1 = new Date(this.dateStart)     //时间
          let year1 = date1.getFullYear()
          let month1 = (date1.getMonth() + 1) < 10 ? ('0' + (date1.getMonth() + 1)) : (date1.getMonth() + 1)
          let day1 = (date1.getDate() < 10) ? ('0' + (date1.getDate() < 10)) : (date1.getDate() < 10)
          let Date1 = year1 + '-' + month1 + '-' + day1
          let date2 = new Date(this.dateEnd)     //时间
          let year2 = date2.getFullYear()
          let month2 = (date2.getMonth() + 1) < 10 ? ('0' + (date2.getMonth() + 1)) : (date2.getMonth() + 1)
          let day2 = (date2.getDate() < 10) ? ('0' + (date2.getDate() < 10)) : (date2.getDate() < 10)
          let Date2 = year2 + '-' + month2 + '-' + day2
          this.subjects.material.dateStart = Date1
          this.subjects.material.dateEnd = Date2
          this.$router.push({path: "/DigitalArtwork/registerMain/collection", query: {isMoney: this.isMoney, workId: this.workId, accountType: this.accountType, subjects: this.subjects}})
        }
      }else {      //个人 生日 性别 民族 证件日期
        if (this.birthday !== "" && this.subjects.material.sex !== "" && this.subjects.material.ethnic !== "" && this.dateStart !== "" && this.dateEnd !== "") {
          let date1 = new Date(this.dateStart)     //时间
          let year1 = date1.getFullYear()
          let month1 = (date1.getMonth() + 1) < 10 ? ('0' + (date1.getMonth() + 1)) : (date1.getMonth() + 1)
          let day1 = (date1.getDate() < 10) ? ('0' + (date1.getDate() < 10)) : (date1.getDate() < 10)
          let Date1 = year1 + '-' + month1 + '-' + day1
          let date2 = new Date(this.dateEnd)     //时间
          let year2 = date2.getFullYear()
          let month2 = (date2.getMonth() + 1) < 10 ? ('0' + (date2.getMonth() + 1)) : (date2.getMonth() + 1)
          let day2 = (date2.getDate() < 10) ? ('0' + (date2.getDate() < 10)) : (date2.getDate() < 10)
          let Date2 = year2 + '-' + month2 + '-' + day2
          this.subjects.material.dateStart = Date1
          this.subjects.material.dateEnd = Date2
          if (this.subjects.idType !== "A3") {
            if (this.subjects.material.files.length === 3) {
              this.$router.push({path: "/DigitalArtwork/registerMain/collection", query: {isMoney: this.isMoney, workId: this.workId, accountType: this.accountType, subjects: this.subjects}})
            }
          }else {
            if (this.subjects.material.files.length === 2) {
              this.$router.push({path: "/DigitalArtwork/registerMain/collection", query: {isMoney: this.isMoney, workId: this.workId, accountType: this.accountType, subjects: this.subjects}})
            }
          }
        }
      }
    },
    last() {
      this.$router.push("/DigitalArtwork/registerMain/basicInfo")
    }
  }
}
</script>

<style scoped>
.materials{
  width: 1021px;
  height: 1349px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.subjectItem{
  display: flex;
  align-items: center;
  justify-content: center;
}
.subjectItemFile{
  display: flex;
  align-items: flex-start;
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
.SubjectForm{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.subjectItems{
  width: 1021px;
  height: auto;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F1F1F1;
}
.idCard{
  width: 411px;
  height: 250px;
  background: #D5D5D5;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  overflow: hidden;
}
.addIcon{
  height: 65px;
  width: 65px;
  object-fit: cover;
}
.identifyImg{
  width: 411px;
  height: 250px;
  object-fit: cover;
}
.stepButton{
  width: 1021px;
  display: flex;
  flex-direction: row-reverse;
}
.nextMaterials{
  width: 184px;
  height: 54px;
  background: #326CC2;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
}
.lastMaterials{
  width: 184px;
  height: 54px;
  border: 1px solid #326CC2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
}
</style>