<template>
  <div id="registerRights" style="width: 100%;min-width:1400px">
    <div v-show="isEditMain" style="width: 100%;display: flex;flex-direction: column;align-items: center;">
      <!--填写登记确权信息-->
      <jy-tab-bar :path-title="pathTitle"></jy-tab-bar><!--发起登记确权-->
      <Progress :title-array="title1" :status="status">
        <p slot="p-name">发起登记确权</p>
      </Progress>
      <div id="registerAdd" v-show="status === 1" style="margin-top: 180px;width: 100%;min-width:1400px;" :style="{height: RegisterData.subjects.length === 0 ? '100%':'auto'}">
        <!--填写主体信息-->
        <el-form style="width: 100%;display: flex; flex-direction: column;align-items: center;" :popper-append-to-body="false">
          <Item>
            <p slot="itemName">作品</p>
            <div slot="itemType">
              <el-select v-model="RegisterData.workId" placeholder="请输入作品名称/平台编号进行搜素" :popper-append-to-body="false" style="margin-top: 10px" :remote-method="getWorks" @change="handleWork" filterable remote>
                <el-option
                    v-for="(tip, pos) in works"
                    :key="pos"
                    :label="tip.workName"
                    :value="tip.workId">
                </el-option>
              </el-select>
            </div>
          </Item>
          <Item box-height="auto" v-if="userInfos.length !== 0">
            <p slot="itemName">主体列表</p>
            <div slot="itemType">
              <div v-for="(item, index) in userInfos" :key="'userInfos'+index">
                <p class="numberTitle" :style="{marginTop: index !== 0 ? '25px' : ''}">第{{index + 1}}位</p>
                <div style="display: flex;align-items: center">
                  <el-select v-model="subjects[index].userId" placeholder="请通过用户名/手机号进行搜索" :popper-append-to-body="false" style="margin-top: 10px" filterable disabled>
                    <el-option
                        v-for="(tip, pos) in userInfos"
                        :key="pos"
                        :label="tip.nameString"
                        :value="tip.userId">
                    </el-option>
                  </el-select>
                  <p @click="refineInfo(index)" :id="'completeInfo' + index + 1" class="refineInfo">{{item.completeStatus}}</p>
                </div>
                <div class="registerBottomLine" v-if="index !== allUserInfos.length - 1" :style="{marginTop: index !== allUserInfos.length - 1 ? '30px' : ''}"></div>
              </div>
              <div v-for="(item, index) in otherUserInfos" :key="'userInfos' + (userInfos.length + index)" style="margin-top: 25px">
                <p class="numberTitle">第{{userInfos.length + index + 1}}位</p>
                <div style="display: flex;align-items: center">
                  <div>
                    <el-select v-model="RegisterData.subjects[userInfos.length + index].userId" placeholder="请通过用户名/手机号进行搜索" :popper-append-to-body="false" style="margin-top: 10px" filterable remote disabled>
                      <el-option
                          v-for="(obj, pos) in searchUser[nowPage - userInfos.length]"
                          :key="'info'+ nowPage + ' ' + pos"
                          :label="obj.nameString"
                          :value="obj.userId">
                      </el-option>
                    </el-select>
                  </div>
                  <p @click="refineInfo(userInfos.length + index)" :id="'completeInfo'+ (userInfos.length + index + 1)" class="refineInfo">{{item.completeStatus}}</p>
                  <p class="deleteObj" @click="deleteObj(index)">删除</p>
                </div>
                <div class="registerBottomLine" v-if="userInfos.length + index !== allUserInfos.length - 1" :style="{marginTop: index !== allUserInfos.length - 1 ? '30px' : ''}"></div>
              </div>
              <div class="registerBottomLine" :style="{marginTop: allUserInfos.length !== 0 ? '30px' : ''}"></div>
              <p class="registerAddUser" @click="addUser">+添加用户</p>
            </div>
          </Item>
          <div class="displayButtons">
            <p @click="next" class="registerNext">下一步</p>
          </div>
        </el-form>
        <div style="width: 100px;height: 100px"></div>
      </div>
      <div id="objectInfo" v-show="status === 2"  style="margin-top: 180px;width: 100%;min-width:1400px;height: auto">
        <el-form style="width: 100%;display: flex; flex-direction: column;align-items: center;height: auto" :popper-append-to-body="false">
          <Item box-height="auto">
            <p slot="itemName">新增的署名</p>
            <div slot="itemType" class="objItem">
              <div v-for="(item, index) in RegisterData.object.authors" :key="'author' + index" :style="{marginTop: index === 0 ? '' : '30px'}">
                <div>
                  <p class="numberTitle">第{{index + 1}}位</p>
                  <div style="margin-top:20px">
                    <el-input v-model="item.username" disabled></el-input>
                  </div>
                </div>
                <Item box-width="960px" box-height="auto" >
                  <p slot="itemName">作者姓名</p>
                  <div slot="itemType">
                    <el-input v-model="item.name" disabled></el-input>
                  </div>
                </Item>
                <Item box-width="960px" box-height="auto">
                  <p slot="itemName">作者署名</p>
                  <div slot="itemType">
                    <el-input v-model="item.signName"></el-input>
                  </div>
                </Item>
                <Item box-width="960px" box-height="auto">
                  <p slot="itemName">署名状态</p>
                  <div slot="itemType">
                    <tags :value-array="signStatus[index]" :tag-id="'signStatus' + index" tag-width="91px" @getType="(pos)=>{getAuthorType(index, pos)}"></tags>
                  </div>
                </Item>
                <div class="registerLineBottom"></div>
              </div>
              <div style="width:100px;height: 30px"></div>
            </div>
          </Item>
          <div class="stepButton" style="margin-top:100px">
            <div class="nextMaterials" @click="next">下一步</div>
            <div class="lastMaterials" @click="last">上一步</div>
          </div>
          <div style="width:100px;height:100px"></div>
        </el-form>
      </div>
      <div id="uploadMaterial" v-show="status === 3"  style="margin-top: 180px;width: 100%;min-width:1400px;">
        <Item box-height="auto">
          <p slot="itemName">证明材料列表</p>
          <div slot="itemType" class="materialsBox">
            <div v-for="(item, index) in materials" :key="'material' + index" class="materialItem" :style="{marginTop: index === 0 ? '' : '15px'}">
              <div class="materialLeft" v-if="item.url !== ''">
                <p class="fileName">{{ item.name }}</p>
                <a :href="item.url" :download="item.name" class="downloadBtn">下载模板</a>
              </div>
              <div class="materialRight" v-if="item.url !== ''">
                <div class="uploadAllMaterials" v-if="item.isUploaded">
                  <p class="uploadFileName">{{item.uploadFileName}}</p>
                  <a :href="item.uploadFileUrl" :download="item.uploadFileName" class="downloadBtn">下载</a>
                  <p class="uploadDel" @click="deleteFile(index)">删除</p>
                </div>
                <div class="uploadAllMaterials" v-if="!item.isUploaded">
                  <p class="downloadBtn" @click="uploadFileClick(index)">上传文件</p>
                  <input type="file" style="display:none" @change="($event)=>{uploadFile($event,index)}" :id="'upload'+index">
                </div>
              </div>
            </div>
          </div>
        </Item>
        <div class="stepButton" style="margin-top:100px">
          <div class="nextMaterials" @click="next">下一步</div>
          <div class="lastMaterials" @click="last">上一步</div>
        </div>
      </div>
      <div id="registerComplete" v-show="status === 4" style="width: 100%;height: 100%">
        <finish-work>发起作品登记确权成功</finish-work>
      </div>
    </div>
    <div v-if="!isEditMain" style="width: 100%">
      <!--编辑主体信息-->
      <div style="display: flex;flex-direction: column;align-items: center;width: 100%">
        <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
        <Progress :title-array="title2" :status="nowStep">
          <p slot="p-name">编辑主体信息</p>
        </Progress>
        <div v-show="nowStep === 1" class="basicInfoBack" style="width:100%">  <!--有财产权的-->
          <el-form class="SubjectForm" style="width:100%">
            <div class="subjectItems" style="height: 450px;">
              <div class="subjectItem" style="margin-top: 60px">
                <!--编辑主体信息-->
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">用户</p>
                </div>
                <div v-if="nowPage < userInfos.length" class="inputLeft">
                  <!--用户-->
                  <el-select v-model="RegisterData.subjects[nowPage].userId" placeholder="请通过用户名/手机号搜索" :popper-append-to-body="false" filterable :id="'username' + nowPage" disabled> <!--如果是拥有财产权的用户，自动填入-->
                    <el-option
                        v-for="(obj, pos) in allUserInfos"
                        :key="'info'+ nowPage + ' ' + pos"
                        :label="obj.nameString"
                        :value="obj.userId"> <!--浅改动-->
                    </el-option>
                  </el-select>
                </div>
                <div v-if="nowPage >= userInfos.length" class="inputLeft">
                  <!--用户-->
                  <el-select v-model="RegisterData.subjects[nowPage].userId" placeholder="请通过用户名/手机号搜索" :popper-append-to-body="false" filterable :id="'username' + nowPage" :remote-method="(value)=>{getUsers(value, nowPage - userInfos.length)}" remote @change="ensureOther(nowPage)">
                    <el-option
                        v-for="(obj, pos) in searchUser[nowPage - userInfos.length]"
                        :key="'info'+ nowPage + ' ' + pos"
                        :label="obj.nameString"
                        :value="obj.userId">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="subjectItem">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">账号类型</p>
                </div>
                <div class="inputLeft">
                  <el-input v-model="accountType[nowPage]" type="text" :popper-append-to-body="false" placeholder="请选择账号类型" :id="'accountType'+ nowPage" disabled></el-input>
                  <!--<el-select v-model="user.accountType" placeholder="请选择账号类型" :popper-append-to-body="false" filterable id="accountType" @change="changeAccountType">
                    <el-option
                        v-for="(item, index) in accountType"
                        :key="'accountType'+index"
                        :label="item"
                        :value="item">
                    </el-option>
                  </el-select>-->
                </div>
              </div>
              <div class="subjectItem">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">证件类型</p>
                </div>
                <div class="inputLeft">
                  <el-select v-model="RegisterData.subjects[nowPage].idType" placeholder="请选择证件类型" :popper-append-to-body="false" :id="'idType'+nowPage" :disabled="allUserInfos[nowPage].type === 100" @change="changeFile(nowPage)">
                    <el-option
                        v-for="(obj, pos) in chooseIdType"
                        :key="'idType'+nowPage + ' ' + pos"
                        :label="obj.label"
                        :value="obj.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="subjectItem">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">证件号码</p>
                </div>
                <div class="inputLeft">
                  <el-input v-model="RegisterData.subjects[nowPage].idNumber" placeholder="请填写证件号码"></el-input>
                </div>
              </div>
              <div class="subjectItem">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">证件地址</p>
                </div>
                <div class="inputLeft">
                  <el-input v-model="RegisterData.subjects[nowPage].residence" type="text" placeholder="请填写证件地址"></el-input>
                </div>
              </div>
            </div>
            <div class="displayButtons">
              <div class="nextMaterials" @click="editNext(nowPage)">下一步</div>
            </div>
            <div style="width:100px;height:100px"></div>
          </el-form>
        </div>
        <div v-show="nowStep === 2" class="materials">  <!--证件材料-->
          <el-form class="SubjectForm">
            <div class="subjectItems">
              <div class="subjectItem">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">用户id</p>
                </div>
                <div class="inputLeft">
                  <el-input type="text" placeholder="请填写用户id" v-model="RegisterData.subjects[nowPage].idNumber" :popper-append-to-body="false" disabled></el-input>
                </div>
              </div>
              <div class="subjectItem" v-if="accountType[nowPage] === '个人用户'">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">生日</p>
                </div>
                <div class="inputLeft">
                  <el-date-picker
                      v-model="allUserInfos[nowPage].birthday"
                      type="date"
                      placeholder="请选择日期"
                      :popper-append-to-body="false"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="subjectItem">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">国家</p>
                </div>
                <div class="inputLeft">
                  <el-input v-model="RegisterData.subjects[nowPage].material.nation" disabled :popper-append-to-body="false"></el-input>
                </div>
              </div>
              <div class="subjectItem" v-if="accountType[nowPage] === '个人用户'">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">性别</p>
                </div>
                <div>
                  <el-select v-model="RegisterData.subjects[nowPage].material.sex" placeholder="请选择性别" :popper-append-to-body="false" filterable id="gender">
                    <el-option
                        v-for="(obj, pos) in gender"
                        :key="'gender'+nowPage + ' ' + pos"
                        :label="obj"
                        :value="obj"
                    >
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
                      v-model="allUserInfos[nowPage].dateStart"
                      type="date"
                      placeholder="请选择日期"
                      :popper-append-to-body="false"
                  >
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
                      v-model="allUserInfos[nowPage].dateEnd"
                      type="date"
                      placeholder="请选择日期"
                      :popper-append-to-body="false"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="subjectItem" v-if="accountType[nowPage] === '个人用户'">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">民族</p>
                </div>
                <div>
                  <el-select v-model="RegisterData.subjects[nowPage].material.ethnic" placeholder="请选择民族" :popper-append-to-body="false" filterable :id="'ethnic' + nowPage">
                    <el-option
                        v-for="(obj, pos) in ethnics"
                        :key="'ethnic' + nowPage + ' ' + pos"
                        :label="obj"
                        :value="obj">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="subjectItem" v-if="accountType[nowPage] === '机构'">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">法定代表人</p>
                </div>
                <div>
                  <el-input type="text" placeholder="请填写联系方式" v-model="RegisterData.subjects[nowPage].material.legalRepresentative"></el-input>
                </div>
              </div>
              <!--上传照片-->
              <div class="subjectItemFile">
                <div class="itemTips">
                  <p class="subjectStars">*</p>
                  <p class="subjectTitle">证件照片</p>
                </div>
                <div>
                  <div>        <!--普通照片-->
                    <div class="idCard" @click="showImg1(nowPage)">
                      <img src="https://s1.ax1x.com/2022/06/29/jnvSZF.png" class="addIcon" alt="add1" id="add1"
                           :style="{display: displayImg1.length !== 0 ? 'none' : ''}">
                      <div style="display: flex;flex-direction: column;align-items: center" id="uploadText1" :style="{display: displayImg1.length !== 0 ? 'none' : ''}">
                        <p class="addText" v-if="RegisterData.subjects[nowPage].idType !== 'A3'">上传证件正面</p>
                        <p class="addText" v-if="RegisterData.subjects[nowPage].idType === 'A3'">上传封面</p>
                      </div>
                      <img :src="item" v-for="(item, index) in displayImg1" alt="file1" :id="'img1'+index" v-if="displayImg1.length !== 0" :key="'img1'+index" class="identifyImg">
                    </div>
                    <input type="file" :id="'file1'" accept="image/*" @change="getPicture1($event)" style="display: none"></input>
                  </div>
                  <div>
                    <div class="idCard" style="margin-top: 15px" @click="showImg2(nowPage)">
                      <img src="https://s1.ax1x.com/2022/06/29/jnvSZF.png" class="addIcon" alt="add2" id="add2"
                           :style="{display: displayImg2.length !== 0 ? 'none' : ''}">
                      <div style="display: flex;flex-direction: column;align-items: center" v-if="displayImg2.length === 0">
                        <p class="addText" v-if="RegisterData.subjects[nowPage].idType !== 'A3'">上传证件反面</p>
                        <p class="addText" v-if="RegisterData.subjects[nowPage].idType === 'A3'">上传个人信息页</p>
                      </div>
                      <img :src="item" v-for="(item, index) in displayImg2" alt="file2" :id="'img2'+index" v-if="displayImg2.length !== 0" :key="'img2'+index" class="identifyImg">
                    </div>
                    <input type="file" id="file2" accept="image/*" @change="getPicture2($event)" style="display: none"></input>
                  </div>
                  <div v-if="RegisterData.subjects[nowPage].idType !== 'A3'">  <!--如果是护照-->
                    <div class="idCard" style="margin-top: 15px" @click="showImg3(nowPage)">
                      <img src="https://s1.ax1x.com/2022/06/29/jnvSZF.png" class="addIcon" alt="add3" id="add3"
                           :style="{display: displayImg3.length !== 0 ? 'none' : ''}">
                      <div style="display: flex;flex-direction: column;align-items: center" v-if="displayImg3.length === 0">
                        <p class="addText">上传手持证件照片</p>
                      </div>
                      <img :src="item" v-for="(item, index) in displayImg3" alt="file3" :id="'img3'+index" v-if="displayImg3.length !== 0" :key="'img3'+index" class="identifyImg">
                    </div>
                    <input type="file" :id="'file3'" accept="image/*" @change="getPicture3($event)" style="display: none"></input>
                  </div>
                </div>
              </div>
              <div style="height:40px;width:100px"></div>
            </div>
            <div class="stepButton" style="margin-top:100px">
              <div class="nextMaterials" @click="editNext(nowPage)">下一步</div>
              <div class="lastMaterials" @click="editLast(nowPage)">上一步</div>
            </div>
            <div style="width:100px;height:100px"></div>
          </el-form>
        </div>
        <div v-show="nowStep === 3" class="rightsCollection">
          <div class="collectionItems">
            <div class="collTitle">
              <p class="collStar" v-if="nowPage >= userInfos.length">*</p>
              <p class="collTitleInner" :style="{marginLeft: nowPage >= userInfos.length ? '10px' : ''}">权利集合</p>
              <div v-if="nowPage < userInfos.length" style="display: flex;align-items: center;margin-left:20px;">
                <p class="helpText">注：当该主体具有人身权时需要填写</p>
                <img src="https://s1.ax1x.com/2022/07/16/j5sB1H.png" alt="help" class="helpIcon">
              </div>
            </div>
            <div class="collItem" v-for="(obj, pos) in selectRights[nowPage]" :key="'rights'+nowPage + ' ' + pos">
              <div style="display:flex">
                <img src="./../../../assets/img/function/selected.png" :alt="'selected'+nowPage" class="selectIcon" v-if="obj.isChoose" @click="chooseRights(nowPage, pos)">
                <img src="./../../../assets/img/function/unselected.png" :alt="'unselected'+nowPage" class="selectIcon" v-if="!obj.isChoose" @click="chooseRights(nowPage, pos)">
                <p :class="{'selectedText': obj.isChoose, 'unselectedText': !obj.isChoose}" @click="chooseRights(nowPage, pos)" style="margin-left: 20px;">{{obj.label}}</p>
              </div>
              <input type="text" v-model="obj.explain" class="explainInput" placeholder="请填写权利说明" @keydown="rightsExplain(nowPage, pos, obj.explain)"></input>
            </div>
            <div style="display: flex;flex-direction: row-reverse;width:780px;margin-top:20px"><p class="helpText">注：权利取得方式为原创时不需要填写权利说明</p></div>
          </div>
          <div class="stepButton" style="margin-top:100px">
            <div @click="editComplete(nowPage)" class="nextMaterials">完成编辑</div>
            <div @click="editLast(nowPage)" class=lastMaterials>上一步</div>
          </div>
          <div style="width:100px;height:100px"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import Progress from "@/components/DigitalArtwork/Progress";
import Item from "@/components/DigitalArtwork/Item";
import tags from "@/components/tags/tags";
import finishWork from "@/components/DigitalArtwork/Finish/FinishWork";
import {
  getWork,
  getWorkList,
  getWorkByName,
  getEnrollRes,
  getWorkById,
  getUserById,
  getUserInfoByName,
  getUserInfoByNumber,
  updateRegisterInfo,
  upload,
  getDepositInfo,
  getWorkInfo,
  launchRegister
} from "@/api";

function AddWork(type, workName, workId) {    //添加作品
  this.type = type                            //0表示先通过作品名查找  1表示直接通过workId查找
  this.workName = workName
  this.workId = workId
}
function AddUser(username, name, identificationNumber, userId, nameString, type, birthday, dateStart, dateEnd, completeStatus) {
  this.username = username
  this.name = name
  this.identificationNumber = identificationNumber
  this.userId = userId
  this.nameString = nameString
  this.type = type
  this.birthday = birthday
  this.dateStart = dateStart
  this.dateEnd = dateEnd
  this.completeStatus = completeStatus
}
function AddOtherUser(username, name, identificationNumber, userId, nameString, search, type, birthday, dateStart, dateEnd, completeStatus) {
  this.username = username
  this.name = name
  this.identificationNumber = identificationNumber
  this.userId = userId
  this.nameString = nameString
  this.search = search
  this.type = type
  this.birthday = birthday
  this.dateStart = dateStart
  this.dateEnd = dateEnd
  this.completeStatus = completeStatus
}
function AddSearchUser(username, name, nameString, userId, phone, type) {
  this.username = username
  this.name = name
  this.nameString = nameString
  this.userId = userId
  this.phone = phone
  this.type = type
}
function AddSubject(userId, idType, idNumber, residence, material, rights) {
  this.userId = userId   //用户id
  this.idType = idType   //证件类型
  this.idNumber = idNumber   //证件号码
  this.residence = residence  //证件地址
  this.material = material    //证件材料
  this.rights = rights        //权利
}
function AddMaterial(id, birthday, nation, sex, dateStart, dateEnd, ethnic, legalRepresentative, files) {    //证件材料
  this.id = id
  this.birthday = birthday
  this.nation = nation
  this.sex = sex
  this.dateStart = dateStart
  this.dateEnd = dateEnd
  this.ethnic = ethnic
  this.legalRepresentative = legalRepresentative
  this.files = files
}
function AddFile(fileId, fileType) {    //文件
  this.fileId = fileId
  this.fileType = fileType
}
function AddAuthor(userId, username, signName, signStatus) {        //添加有署名权的用户
  this.userId = userId
  this.username = username
  this.signName = signName
  this.signStatus = signStatus
}
export default {
  name: "registerRights",
  components: { jyTabBar, Progress, Item, tags, finishWork },
  data() {
    return {
      nowPage: -1,
      nowStep: 1,
      displayImg1: [],      //目前只能想到这种麻烦的方法了
      displayImg2: [],
      displayImg3: [],
      testData: {    //测试数据
        workId: 31,
        content: {
          copyrights: [
            {
              userInfos: [
                {
                  copyrightExplain: "",
                  userId: 20,
                  propotion: ""
                },
                {
                  copyrightExplain: "",
                  userId: 21,
                  propotion: ""
                },
                {
                  copyrightExplain: "",
                  userId: 22,
                  propotion: ""
                }
              ],
              type: 1
            },
            {
              userInfos: [
                {
                  copyrightExplain: "",
                  userId: 20,
                  propotion: ""
                },
                {
                  copyrightExplain: "",
                  userId: 21,
                  propotion: ""
                }
              ],
              type: 2
            },
            {
              userInfos: [
                {
                  copyrightExplain: "",
                  userId: 20,
                  propotion: ""
                },
                {
                  copyrightExplain: "",
                  userId: 25,
                  propotion: ""
                },
                {
                  copyrightExplain: "",
                  userId: 26,
                  propotion: ""
                }
              ],
              type: 4
            },
            {
              userInfos: [
                {
                  copyrightExplain: "",
                  userId: 26,
                  propotion: ""
                },
                {
                  copyrightExplain: "",
                  userId: 29,
                  propotion: ""
                }
              ],
              type: 7
            }
          ]
        }
      },
      testUserInfo: [
        {
          type: 1,
          userId: 20,
          username: 'xiaogang1',
          name: "方",
          identificationNumber: ""
        },
        {
          type: 1,
          userId: 21,
          username: 'xiaogang2',
          name: "一",
          identificationNumber: ""
        },
        {
          type: 1,
          userId: 22,
          username: 'xiaogang3',
          name: "妙",
          identificationNumber: ""
        },
        {
          type: 1,
          userId: 23,
          username: 'xiaogang4',
          name: "杰",
          identificationNumber: ""
        },
        {
          type: 1,
          userId: 24,
          username: 'xiaogang5',
          name: "佟",
          identificationNumber: ""
        },
        {
          type: 1,
          userId: 25,
          username: 'xiaogang6',
          name: "树",
          identificationNumber: ""
        },
        {
          type: 100,
          userId: 30,
          username: 'testjigou1',
          name: "华",
          identificationNumber: ""
        },
        {
          type: 100,
          userId: 29,
          username: 'testjigou2',
          name: "够",
          identificationNumber: ""
        },
      ],
      status: 1,
      childStatus1: [],
      childStatus2: [],
      isEditMain: true,
      userPage1: [],
      userPage2: [],
      accountType: [],
      birthday: [],
      dateStart: [],
      dateEnd: [],
      ethnic: [],
      pathTitle: [
        {name: "创作者家园", url: "/DigitalArtwork/Work"},
        {name: "登记确权", url: ""}
      ],
      title1: ["填写主体信息","填写客体信息","上传证明材料","完成上传"],
      title2: ["填写基本信息","完善身份证明材料","填写权利集合"],
      success: false,
      subjects: [],
      workId: 0,
      works: [],           //搜索出的作品列表 包括搜索类型、作品名、作品id
      worksOptions: [],
      searchContent: "",
      searchWorks: [],      //搜索出来的作品列表
      object: null,         //选择的作品
      userInfosId: [],         //主体用户列表
      userInfos: [],           //用户信息列表
      otherUserInfos: [],       //无财产权但有人身权的用户
      otherSearchUsers: [],     //下拉框搜索内容
      allUserInfos: [],         //总体用户信息列表
      searchUser: [],            //用于搜索的用户
      searchUserOptions: [],      //*****************************
      RegisterData: {
        subjects: [],
        object: {
          workId: "",
          authors: []
        },
        materials: [],
        workId: ""
      },
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
      gender: ["男","女"],
      ethnics: ["汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族", "黎族", "傣族", "畲族", "傈僳族",
        "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族",
        "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
      ],
      imgs: [],
      selectRights: [

      ],
      authorUsers: [

      ],
      signStatus: [

      ],
      headers: {
        "Content-Type": "application/json"
      },
      fileHeaders: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      files: [   //true为必填 false为有条件时必填 null为无条件选填
        {type: "C1", name: "作品创作说明", url: "", isMust: true},    //必填
        {type: "C2", name: "作品创作过程说明", url: "", isMust: null},//选填
        {type: "C3", name: "作品权利保证书", url: "https://fxr-1312386734.cos.ap-beijing.myqcloud.com/%E7%99%BB%E8%AE%B0%E7%A1%AE%E6%9D%83%E6%9D%90%E6%96%99/%E4%BD%9C%E5%93%81%E6%9D%83%E5%88%A9%E4%BF%9D%E8%AF%81%E4%B9%A6.docx", isMust: true}, //必填
        {type: "C4", name: "法人创作说明", url: "", isMust: false},    //权利生产方式为法人时必填
        {type: "C5", name: "职务创作协议", url: "https://fxr-1312386734.cos.ap-beijing.myqcloud.com/%E7%99%BB%E8%AE%B0%E7%A1%AE%E6%9D%83%E6%9D%90%E6%96%99/%E8%81%8C%E5%8A%A1%E5%88%9B%E4%BD%9C%E5%8D%8F%E8%AE%AE.docx", isMust: false},   //权利生产方式为职务时
        {type: "C6", name: "合作创作协议", url: "https://fxr-1312386734.cos.ap-beijing.myqcloud.com/%E7%99%BB%E8%AE%B0%E7%A1%AE%E6%9D%83%E6%9D%90%E6%96%99/%E5%90%88%E4%BD%9C%E5%88%9B%E4%BD%9C%E5%8D%8F%E8%AE%AE.docx", isMust: false},   //权利生产方式为合作时
        {type: "C7", name: "委托创作协议", url: "https://fxr-1312386734.cos.ap-beijing.myqcloud.com/%E7%99%BB%E8%AE%B0%E7%A1%AE%E6%9D%83%E6%9D%90%E6%96%99/%E5%A7%94%E6%89%98%E5%88%9B%E4%BD%9C%E5%8D%8F%E8%AE%AE.docx", isMust: false},   //权利生产方式为委托时
        {type: "C8", name: "著作权许可使用合同", url: "https://fxr-1312386734.cos.ap-beijing.myqcloud.com/%E7%99%BB%E8%AE%B0%E7%A1%AE%E6%9D%83%E6%9D%90%E6%96%99/%E8%91%97%E4%BD%9C%E6%9D%83%E8%AE%B8%E5%8F%AF%E4%BD%BF%E7%94%A8%E5%90%88%E5%90%8C.docx", isMust: false}, //作品创作性质为改编/翻译/汇编/注释/整理/其他时，必填  
        {type: "C9", name: "作品登记证书", url: "", isMust: null},//已在版权局登记，上传登记证书 选填
        {type: "C10", name: "第三方认证机构的证明", url: "", isMust: null},//选填
        {type: "C11", name: "转让合同", url: "https://fxr-1312386734.cos.ap-beijing.myqcloud.com/%E7%99%BB%E8%AE%B0%E7%A1%AE%E6%9D%83%E6%9D%90%E6%96%99/%E6%9D%83%E5%88%A9%E4%B9%89%E5%8A%A1%E6%A6%82%E6%8B%AC%E6%80%A7%E8%BD%AC%E8%AE%A9%E5%90%88%E5%90%8C.docx", isMust: false},//权利义务概括性转让合同  著作权取得方式为转让时
        {type: "C12", name: "继承证明", url: "https://fxr-1312386734.cos.ap-beijing.myqcloud.com/%E7%99%BB%E8%AE%B0%E7%A1%AE%E6%9D%83%E6%9D%90%E6%96%99/%E8%91%97%E4%BD%9C%E6%9D%83%E7%BB%A7%E6%89%BF%E9%81%97%E5%98%B1.docx", isMust: false},  //著作权取得方式为继承时
        {type: "C13", name: "承受协议", url: "", isMust: false},  //著作权取得方式为承受时
        {type: "C14", name: "赠予合同", url: "", isMust: false},  //著作权取得方式为赠予时
        {type: "C15", name: "", url: "", isMust: false},
        {type: "C16", name: "唯一著作权注册平台承诺书", url: "https://fxr-1312386734.cos.ap-beijing.myqcloud.com/%E7%99%BB%E8%AE%B0%E7%A1%AE%E6%9D%83%E6%9D%90%E6%96%99/%E8%91%97%E4%BD%9C%E6%9D%83%E6%89%BF%E8%AF%BA%E4%B9%A6.docx", isMust: true}   //必填
      ],
      neccFilePos: [0, 2, 15],
      unneFilePos: [1, 8, 9],
      createType: -1,   //创作性质  原创/改编/翻译/汇编/注释/其他
      copyrightCreateType: -1,     //著作权产生方式  个人/合作/法人/职务/委托
      copyrightGetType: -1,  //权利取得方式  原创/转让/继承/承受/赠予/其他
      materials: [],     //用于第二步展示的文件
      materialsFlag: true,    //false表示下一步为第二步时不重新加载，true为重新加载
      objectFlag: true,
    }
  },
  methods: {
    ensure() {
      this.success = false
    },
    async next() {
      let that = this
      /*下一步的条件判断*/
      switch (this.status) {
        case 1: {
          let signFlag = 0
          let nextFlag = 0
          /*注意加条件判断*/ //先判断能不能下一步
          for (let i = 0; i < this.allUserInfos.length; i++) {
            if (this.allUserInfos[i].completeStatus !== "编辑主体信息") {
              nextFlag = 1
              break
            }
          }
        
          if (nextFlag === 0) {
            for (let i = 0; i < this.RegisterData.object.authors.length; i++) {    //先清空主体信息
              this.RegisterData.object.authors.pop()
            }
            for (let i = 0; i < this.signStatus.length; i++) {
              this.signStatus.pop()
            }
          //找出有署名权的用户
            for (let i = 0; i < this.RegisterData.subjects.length; i++) {
              for (let j = 0; j < this.RegisterData.subjects[i].rights.length; j++) {
                if (this.RegisterData.subjects[i].rights[j].category === "1") {
                  if( i >= this.userInfos.length) {
                    signFlag = 1
                  }
                  //1-本名 2-别名 3-不具名
                  this.RegisterData.object.authors.push({username: this.allUserInfos[i].username, userId: this.allUserInfos[i].userId, signStatus: "", signName: "", name: this.allUserInfos[i].name})
                  let statuses = [
                    {name: "本名", value: "1", isChoose: false},
                    {name: "别名", value: "2", isChoose: false},
                    {name: "不具名", value: "3", isChoose: false}
                  ]
                  this.signStatus.push(statuses)
                  break
                }
              }
            }
          }
          if (nextFlag === 0) {
            await updateRegisterInfo(this.RegisterData, this.headers).then(res=>{
              if (res.data.data !== null) {
                if (that.RegisterData.object.authors.length === 0) {
                  that.status = 3
                }else{
                  that.status = 2
                }
              }
            })
          }
          break
        }
        case 2: {
          let nextFlag = 0
          for (let i = 0; i < this.RegisterData.object.authors.length; i++) {
            if (this.RegisterData.object.authors[i].signStatus === "" || this.RegisterData.object.authors[i].signName === "") {
              nextFlag = 1
              break
            }
          }
          if (nextFlag === 0) {
            await updateRegisterInfo(this.RegisterData, this.headers).then(res=>{
              if(res.data.data !== null) {
                that.status = 3
              }
            })
          }
          break
        }
        case 3: {
          let nextFlag = 0
          for (let i = 0; i < this.materials.length; i++) {
            if (this.materials[index].isMust) {
              if (!this.materials[index].isUploaded) {
                nextFlag = 1
                break
              }
            }
          }
          if (nextFlag === 0) {
            await launchRegister(this.RegisterData, this.headers).then(res=>{
              if (res.data.data !== null) {
                that.status = 4
              }
            })
          }
          break
        }
        case 4: {
          break
        }
      }
    },
    last() {
      this.status--
    },
    change(index) {

    },
    changeFile(index) {                             //选择证件类型
      let file1 = new AddFile("","1")  //正面
      let file2 = new AddFile("","2")  //反面
      let file3 = new AddFile("","3")  //手持
      for (let i = 0; i < this.RegisterData.subjects[index].material.files.length; i++) {
        this.RegisterData.subjects[index].material.files.pop()
      }
      if (this.accountType[index] === "个人用户") {  //如果是个人用户 说明未添加证件材料
        if (this.RegisterData.subjects[index].idType !== "A3") {
          this.RegisterData.subjects[index].material.files.push(file1)
          this.RegisterData.subjects[index].material.files.push(file2)
          this.RegisterData.subjects[index].material.files.push(file3)
          this.imgs[index].push("")
          this.imgs[index].push("")
          this.imgs[index].push("")
        } else {
          this.RegisterData.subjects[index].material.files.push(file1)
          this.RegisterData.subjects[index].material.files.push(file2)
          this.imgs[index].push("")
          this.imgs[index].push("")
        }
      }
      // if (index < this.userInfos.length) {   //拥有财产权的用户
      // }
    },
    async getWorks(content) {
      let that = this
      let workId = []         //通过作品名获得的作品Id
      let workName = []       //对应的名字
      let workIdFlag1 = 0     //可以通过作品名找到获得版权注册的作品
      let workIdFlag2 = 0     //可以通过id找到获得版权注册的作品
      let idLen = 0           //通过id找到的返回的结果数
      let works = []          //作品，包含作品id和作品名

      for(let i = 0; i < this.works.length; i++) {
        this.works.pop()                          //作品列表
      }
      for(let i = 0; i < this.searchWorks.length; i++) {
        this.searchWorks.pop()                    //作品 保留原始数据
      }
      // for(let i = 0; i < this.worksOptions.length; i++) {
      //   this.worksOptions.pop()                   //作品下拉框
      // }
      let headers = {
        "Content-Type": "application/json"
      }
      await getWorkByName(content, headers).then(res=>{           //通过作品名获取作品的id
        if (res.data.data !== null) {
          for(let i = 0; i < res.data.data.length; i++) {
            works.push({workId: res.data.data[i].workId, workName: res.data.data[i].content.workName})
            workId.push(res.data.data[i].workId)
            workName.push(res.data.data[i].content.workName)
          }
        }
      },err=>{
        workId = []
        works = []
        workName = []
      })
      //获得对应作品名的id后通过id查找
      if (works.length !== 0) {
        for(let i = 0 ;i < works.length; i++) {
          await getEnrollRes(works[i].workId, headers).then(res=>{             //两个id查找 通过作品名获得id再通过这个获得版权注册信息
            if (res.data.data !== null) {
              that.searchWorks.push(res.data.data)                          //searchWorks保留原始返回数据  Works为处理过的获得的数据
              let work = new AddWork(0, works[i].workName, res.data.data.workId)   //通过作品名查找
              that.works.push(work)                                         //加入到作品中
            }
            // that.searchWorks.push(res.data.data)                          //searchWorks保留原始返回数据  Works为处理过的获得的数据
            // let work = new AddWork(0, works.workName, res.data.data.workId)   //通过作品名查找
            //workId[i] = res.data.data.workId
          })
        }
        //  测试数据代码*******************
        // this.searchWorks.push(this.testData)
        // let work = new AddWork(0, "大鹏展翅", 31)
        // this.works.push(work)
        //  ****************************
      }
      if (!isNaN(Number(content))) {
        await getEnrollRes(Number(content), headers).then(res=>{              //直接作为id 看看能否返回，如果有id(在版权注册能搜到)，则通过id获得作品信息中的名字
          if (res.data.data !== null || res.data.msg === "作品不存在") {
            that.searchWorks.push(res.data.data)        //原本的数据
            workIdFlag1 = 1
            idLen++
          }
        })
        if (workIdFlag1 === 1) {                                    //如果已经通过id找到了这个作品
          await getWorkById(Number(content), headers).then(res=>{   //返回作品信息
            for(let i = 0; i < res.data.data.length; i++) {      //检查作品是否重复
              let pos = 0
              for (let j = 0; j < that.works.length; j++) {
                if (that.works.workId === res.data.data[i].workId) {
                  pos = 1
                  break
                }
              }
              if (pos === 0) {
                let work = new AddWork(1, res.data.data[i].content.workName, res.data.data[i].workId)      //需要知道这个作品的名字
                that.works.push(work)
                workIdFlag2 = 1
                break
              }
            }
          })
          if (workIdFlag2 !== 1) {
            for (let i = 0; i < idLen; i++) {
              this.searchWorks.pop()
            }
          }
        }
      }
      //
      // setTimeout(() => {
      //   this.worksOptions = this.works.filter(item => {
      //     return item.workName.indexOf(content) > -1 || item.workId.toString().indexOf(content) > -1
      //   })
      // }, 200)

    },
    async handleWork(item) {                                      //根据选择处理主体列表
      let headers = {
        "Content-Type": "application/json"
      }
      for(let i = 0; i < this.userInfosId.length; i++) {    //先清空有财产权的用户的列表
        this.userInfos.pop()
        this.userInfosId.pop()
      }
      for (let i = 0; i < this.childStatus1.length; i++) {   //清空有财产权编辑主体页面信息
        this.childStatus1.pop()
      }
      for (let i = 0; i < this.otherUserInfos.length; i++) {     //清空只有人身权的用户列表
        this.otherUserInfos.pop()
      }
      for (let i = 0; i < this.childStatus2.length; i++) {
        this.childStatus2.pop()
      }
      for (let i = 0; i < this.subjects.length; i++) {      //主体信息列表
        this.subjects.pop()
      }
      for (let i = 0; i < this.RegisterData.subjects.length; i++) {
        this.RegisterData.subjects.pop()
      }
      for (let i = 0; i < this.accountType.length; i++) {    //用户类型列表
        this.accountType.pop()
      }
      for (let i = 0; i < this.birthday.length; i++) {       //用户生日
        this.birthday.pop()
      }
      for (let i = 0; i < this.allUserInfos.length; i++) {   //所有用户信息列表
        this.allUserInfos.pop()
      }
      for (let i = 0; i < this.imgs.length; i++) {           //图片文件
        this.imgs.pop()
      }
      for (let i = 0; i < this.selectRights.length; i++) {   //选择集合列表
        this.selectRights.pop()
      }
      for (let i = 0; i < this.searchUser.length; i++) {
        this.searchUser.pop()
      }
      for (let i = 0; i < this.RegisterData.materials.length; i++) {
        this.RegisterData.materials.pop()
        this.materials.pop()
      }
      let workId = this.RegisterData.workId
      let that = this
      for(let i = 0; i < this.searchWorks.length; i++) {   //找出对应的作品信息
        if (this.searchWorks[i].workId === workId) {
          this.object = this.searchWorks[i]
          break
        }
      }
      //存证条件判断*************
      // console.log(this.object)
      this.otherSearchUsers.push([]) //??
      //获取第二步的材料
      for(let i = 0; i < this.object.content.copyrights.length; i++) {
        for(let j = 0; j < this.object.content.copyrights[i].userInfos.length; j++) {
          if (this.userInfosId.indexOf(this.object.content.copyrights[i].userInfos[j].userId) < 0) {        //如果这个用户还没存在用户列表里
            let id = this.object.content.copyrights[i].userInfos[j].userId
            await getUserById(id, this.headers).then(res=>{
              console.log(res)
              if (res.data.data !== null) {
                let user = new AddUser(res.data.data.username, res.data.data.name, res.data.data.identificationNumber, res.data.data.userId, res.data.data.username + "（**" + res.data.data.name + "）", res.data.data.type, "", "", "", "请完善主体信息")
                that.imgs.push([])
                that.childStatus1.push(1)
                let files = []
                let idType = ""
                if (user.type === 100) {                 //如果是机构
                  let file1 = new AddFile("","1")  //正面
                  let file2 = new AddFile("","2")  //反面
                  let file3 = new AddFile("","3")  //手持
                  files.push(file1)
                  files.push(file2)
                  files.push(file3)
                  that.accountType.push("机构")
                  that.imgs[i].push("")
                  that.imgs[i].push("")
                  that.imgs[i].push("")
                  idType = "A6"
                  //营业执照
                }else {
                  that.accountType.push("个人用户")
                }
                that.birthday.push("")
                let material = new AddMaterial("","","中国","","", "", "","", files)
                that.subjects.push(new AddSubject(user.userId, idType, "", "", material, []))
                that.RegisterData.subjects.push(new AddSubject(user.userId, idType, "", "", material, []))
                // this.allUserInfos.push(this.userInfos[i])

                let rights = [                                             //添加权利
                  {label: "发表权", value: "0", isChoose: false, explain: ""},
                  {label: "署名权", value: "1", isChoose: false, explain: ""},
                  {label: "修改权", value: "2", isChoose: false, explain: ""},
                  {label: "保护作品权", value: "3", isChoose: false, explain: ""}
                ]
                that.selectRights.push(rights)

                that.allUserInfos.push(user)
                that.userInfosId.push(that.object.content.copyrights[i].userInfos[j].userId)
                that.userInfos.push(user)
              }
              
            })
            //暂时忽略该步骤***************************
            // await getUserById(this.object.content.copyrights[i].userInfos[j].userId, headers).then(res=>{
            //   if (res !== null) {
            //     let user = new AddUser(res.data.data.username, res.data.data.name, res.data.data.identificationNumber, res.data.data.userId, that.selectUser(res.data.data.username, res.data.data.name), res.data.data.type, "", "", "")
            //     that.userInfosId.push(this.object.content.copyrights[i].userInfos[j].userId)
            //     that.userInfos.push(user)
            //   }
            // })
          }
        }
      }

      this.RegisterData.object.workId = this.RegisterData.workId
      let flag1 = 0
      let flag2 = 0
      let flag3 = 0
      for (let i = 0; i < this.neccFilePos.length; i++) {   //无论如何必填
        this.RegisterData.materials.push({type: this.files[this.neccFilePos[i]].type, fileId: []})
        this.materials.push({name: this.files[this.neccFilePos[i]].name, 
                             url: this.files[this.neccFilePos[i]].url, 
                             uploadFileName: "", 
                             uploadFileUrl: "",
                             isMust: true,
                             isUploaded: false
                            })
      }
      // 根据作品必填
      await getDepositInfo(this.RegisterData.workId, this.headers).then(res=>{    //获取作品存证的信息
        if (res.data.data !== null) {
          that.createType = res.data.data.content.createType  //权利产生方式  原创/改编/翻译/汇编/注释/其他
          that.copyrightCreateType = res.data.data.content.copyrightCreateType //著作权产生方式  个人/合作/法人/职务/委托
          flag1 = 1
        }
      })
      await getEnrollRes(this.RegisterData.workId, this.headers).then(res=>{      //获取版权注册的信息
        if (res.data.data !== null) {
          that.copyrightGetType = res.data.data.content.copyrightGetType      //权利取得方式  原创/转让/继承/承受/赠予/其他
          flag2 = 1
        }
      })
      if (flag1 === 1 && flag2 === 1) {    //如果都获取到了
        switch (this.copyrightCreateType) {
          case 1: {   //合作
            this.RegisterData.materials.push({type: "C6", fileId: []})
            this.materials.push({name: this.files[5].name, 
                                 url: this.files[5].url, 
                                 uploadFileName: "", 
                                 uploadFileUrl: "",
                                 isMust: true,
                                 isUploaded: false
                                })
            break
          }
          case 2: {    //法人
            this.RegisterData.materials.push({type: "C4", fileId: []})
            this.materials.push({name: this.files[3].name, 
                                 url: this.files[3].url, 
                                 uploadFileName: "", 
                                 uploadFileUrl: "",
                                 isMust: true,
                                 isUploaded: false
                                })
            break
          }
          case 3: {   //职务
            this.RegisterData.materials.push({type: "C5", fileId: []})
            this.materials.push({name: this.files[4].name, 
                                 url: this.files[4].url, 
                                 uploadFileName: "", 
                                 uploadFileUrl: "",
                                 isMust: true,
                                 isUploaded: false
                                })
            break
          }
          case 4: {    //委托
            this.RegisterData.materials.push({type: "C7", fileId: []})
            this.materials.push({name: this.files[6].name, 
                                 url: this.files[6].url, 
                                 uploadFileName: "", 
                                 uploadFileUrl: "",
                                 isMust: true,
                                 isUploaded: false
                                })
            break
          }
        }
        if (this.createType !== 0) {
          this.RegisterData.materials.push({type: "C8", fileId: []})
          this.materials.push({name: this.files[7].name, 
                               url: this.files[7].url, 
                               uploadFileName: "", 
                               uploadFileUrl: "",
                               isMust: true,
                               isUploaded: false
                              })
        }
        switch (this.copyrightGetType) {
          case 1: {  //转让
            this.RegisterData.materials.push({type: "C11", fileId: []})
            this.materials.push({name: this.files[10].name, 
                                 url: this.files[10].url, 
                                 uploadFileName: "", 
                                 uploadFileUrl: "",
                                 isMust: true,
                                 isUploaded: false
                                })
            break
          }
          case 2: {  //继承
            this.RegisterData.materials.push({type: "C12", fileId: []})
            this.materials.push({name: this.files[11].name, 
                                 url: this.files[11].url, 
                                 uploadFileName: "", 
                                 uploadFileUrl: "",
                                 isMust: true,
                                 isUploaded: false
                                })
            break
          }
          case 3: {  //承受
            this.RegisterData.materials.push({type: "C13", fileId: []})
            this.materials.push({name: this.files[12].name, 
                                 url: this.files[12].url, 
                                 uploadFileName: "", 
                                 uploadFileUrl: "",
                                 isMust: true,
                                 isUploaded: false
                                })
            break
          }
          case 4: {  //赠予
            this.RegisterData.materials.push({type: "C14", fileId: []})
            this.materials.push({name: this.files[13].name, 
                                 url: this.files[13].url, 
                                 uploadFileName: "", 
                                 uploadFileUrl: "",
                                 isMust: true,
                                 isUploaded: false
                                })
            break
          }
        }
        for (let i = 0; i < this.unneFilePos.length; i++) {
          this.RegisterData.materials.push({type: this.files[this.unneFilePos[i]].type, fileId: []})
          this.materials.push({name: this.files[this.unneFilePos[i]].name, 
                               url: this.files[this.unneFilePos[i]].url, 
                               uploadFileName: "", 
                               uploadFileUrl: "",
                               isMust: true,
                               isUploaded: false
                              })
        }
      }
      //暂时忽略************************************
      // for (let i = 0; i < this.userInfos.length; i++) {       //拥有财产权的用户的主体信息
      //   this.imgs.push([])
      //   this.childStatus1.push(-1)
      //   let files = []
      //   let idType = ""
      //   if (this.userInfos[i].type === 100) {                 //如果是机构
      //     let file1 = new AddFile(0,"1")  //正面
      //     let file2 = new AddFile(0,"2")  //反面
      //     let file3 = new AddFile(0,"3")  //手持
      //     files.push(file1)
      //     files.push(file2)
      //     files.push(file3)
      //     this.accountType.push("机构")
      //     this.imgs[i].push("")
      //     this.imgs[i].push("")
      //     this.imgs[i].push("")
      //     idType = "A6"
      //     //营业执照
      //   }else {
      //     this.accountType.push("个人用户")
      //   }
      //   this.birthday.push("")
      //   let material = new AddMaterial("","","中国","","","","", files)
      //   this.subjects.push(new AddSubject(this.userInfos[i].userId, idType, "", "", material, []))
      //   this.RegisterData.subjects.push(new AddSubject(this.userInfos[i].userId, idType, "", "", material, []))
      //   this.allUserInfos.push(this.userInfos[i])
      //
      //   let rights = [                                             //添加权利
      //     {label: "发表权", value: "0", isChoose: false, explain: ""},
      //     {label: "署名权", value: "1", isChoose: false, explain: ""},
      //     {label: "修改权", value: "2", isChoose: false, explain: ""},
      //     {label: "保护作品权", value: "3", isChoose: false, explain: ""}
      //   ]
      //   this.selectRights.push(rights)
      // }
    },
    formatName(name) {
      let newStr;
      if (name.length === 2) {
        newStr = name.substr(0, 1) + '*';
      } else if (name.length > 2) {
        let char = '';
        for (let i = 0, len = name.length - 2; i < len; i++) {
          char += '*';
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1);
      } else {
        newStr = name;
      }
      return newStr;
    },
    selectUser(username, name) {
      return username + "（**" + name + "）"
    },
    refineInfo(index) {
      let that = this
      console.log(this.allUserInfos[index])
      console.log(this.accountType[index], index)
      console.log(this.accountType)
      if (index < this.userInfos.length) {  //isMoney有无财产权
        this.nowPage = index
        this.isEditMain = false
      }else {
        this.nowPage = index
        this.isEditMain = false
      }
      this.nowPage = index
      this.isEditMain = false
      if (this.allUserInfos[index].completeStatus === "编辑主体信息") {
        this.displayImg1.push(this.imgs[index][0])
        this.displayImg2.push(this.imgs[index][1])
        if (this.imgs[index].length === 3) {
          this.displayImg3.push(this.imgs[index][2])
        }
      }
    },
    addUser() {     //添加主体用户
      let user = new AddOtherUser("","","",0,"","", 0, "", "", "", "请完善主体信息")
      this.otherUserInfos.push(user)
      this.allUserInfos.push(user)
      let array = []
      let array2 = []
      this.searchUser.push(array)
      this.searchUserOptions.push(array2)
      this.childStatus2.push(-1)
      this.childStatus1.push(1)
      this.otherSearchUsers.push([])
      //编辑主体信息
      this.imgs.push([])
      this.accountType.push("")
      this.birthday.push("")

      let material = new AddMaterial("","","中国","","", "", "","", [])
      this.subjects.push(new AddSubject("", "", "", "", material, []))
      this.RegisterData.subjects.push(new AddSubject("", "", "", "", material, []))
      this.imgs.push([])

      let rights = [                                             //添加权利
        {label: "发表权", value: "0", isChoose: false, explain: ""},
        {label: "署名权", value: "1", isChoose: false, explain: ""},
        {label: "修改权", value: "2", isChoose: false, explain: ""},
        {label: "保护作品权", value: "3", isChoose: false, explain: ""}
      ]
      this.selectRights.push(rights)
    },
    async getUsers(value, index) {     //搜索用户信息
      let headers = {
        "Content-Type": "application/json"
      }
      let that = this
      let len1 = this.searchUser[index].length
      let len2 = this.searchUserOptions[index].length
      for(let i = 0; i < len1; i++) {    //先清空
        this.searchUser[index].pop()
      }
      for(let i = 0; i < len2; i++) {    //先清空
        this.searchUserOptions[index].pop()
      }
      await getUserInfoByName(value, headers).then(res=>{
        if (res.data.data !== null) {
          let user = new AddSearchUser(res.data.data.username, res.data.data.name, res.data.data.username + "（**" + res.data.data.name + "）", res.data.data.userId, res.data.data.phone, res.data.data.type)
          that.searchUser[index].push(user)
        }
      })
      if (!isNaN(Number(value))) {
        await getUserInfoByNumber(Number(value), headers).then(res=>{
          if (res.data.data !== null) {
            let user = new AddSearchUser(res.data.data.username, res.data.data.name, res.data.data.username + "（**" + res.data.data.name + "）", res.data.data.userId, res.data.data.phone)
            that.searchUser[index].push(user)
          }
        })
      }

      // for(item in this.searchUser[index]) {
      //   if (item.name.indexOf(value) > -1 || item.phone.indexOf(value) > -1) {
      //     this.searchUserOptions[index].push(item)
      //   }
      // }
      // for(let i = 0; i < this.searchUser[index].length; i++){
      //   if(this.searchUser[index][i].name.indexOf(value) > -1 || this.searchUser[index][i].phone.indexOf(value) > -1) {
      //     this.searchUserOptions[index].push(this.searchUser[index][i])
      //   }
      // }
    },
    deleteObj(index) {
      this.otherUserInfos.splice(index,1)
      this.allUserInfos.splice(this.userInfos.length + index, 1)
      this.imgs.splice(this.userInfos.length + index, 1)
      this.searchUser.splice(index,1)
      this.searchUserOptions.splice(index,1)
      this.childStatus1.splice(index, 1)
      this.childStatus2.splice(index, 1)
      this.selectRights.splice(index, 1)
      this.otherSearchUsers.splice(index, 1)
      this.RegisterData.subjects.splice(this.userInfos.length + index, 1)
      this.accountType.splice(this.userInfos.length + index, 1)
    },
    async editNext(index) {
      //下一步
      let that = this
      switch (this.nowStep) {   //第一步
        case 1: {

          if ( this.RegisterData.subjects[index].userId !== "" &&
              this.RegisterData.subjects[index].idNumber !== "" &&
              this.RegisterData.subjects[index].residence !== "" &&
              this.RegisterData.subjects[index].idType !== ""
          ) {
            this.RegisterData.subjects[index].material.id = this.RegisterData.subjects[index].idNumber
            this.nowStep = 2
            // this.childStatus1[this.nowPage]++
            // 暂时忽略********************
            // await updateRegisterInfo(this.RegisterData, this.headers).then(res=>{
            //   console.log(res)
            //   if (res.data.data !== null) {
            //     that.childStatus1[index]++
            //   }
            // })
          }
          break
        }
        case 2: {
          let flag = 0
          // 条件判断
          let Date1 = new Date(this.allUserInfos[index].dateStart).getTime()
          let Date2 = new Date(this.allUserInfos[index].dateEnd).getTime()
          this.RegisterData.subjects[index].material.dateStart = Date1
          this.RegisterData.subjects[index].material.dateEnd = Date2
          
          if (this.accountType[index] === "机构") {
            if (this.allUserInfos[index].dateStart !== "" &&
                this.allUserInfos[index].dateEnd !== "" &&
                this.RegisterData.subjects[index].material.nation !== "" &&
                this.RegisterData.subjects[index].material.legalRepresentative !== "" &&
                this.RegisterData.subjects[index].material.files[0].fileId !== [] &&
                this.RegisterData.subjects[index].material.files[1].fileId !== [] &&
                this.RegisterData.subjects[index].material.files[2].fileId !== []
            ) {
              
              flag = 1
            }
          }else {
            let Date3 = new Date(this.allUserInfos[index].birthday).getTime()
            this.RegisterData.subjects[index].material.birthday = Date3
            if (
                this.RegisterData.subjects[index].material.dateStart !== "" &&
                this.RegisterData.subjects[index].material.dateEnd !== "" &&
                this.RegisterData.subjects[index].material.nation !== "" &&
                this.RegisterData.subjects[index].material.birthday !== "" &&
                this.RegisterData.subjects[index].material.sex !== "" &&
                this.RegisterData.subjects[index].material.ethnic !== "" &&
                this.RegisterData.subjects[index].material.files[0].fileId !== [] &&
                this.RegisterData.subjects[index].material.files[1].fileId !== []
            ) {
              if (this.RegisterData.subjects[index].material.files.length === 3) {
                if (this.RegisterData.subjects[index].material.files[1].fileId !== []) {
                  flag = 1
                }
              }else {
                flag = 1
              }
            }
          }
          // 暂时忽略********************
          if (flag !== 0) {

            // await updateRegisterInfo(this.RegisterData, this.headers).then(res=>{
            //   console.log(res)
            //   if (res.data.data !== null) {
            //     that.childStatus1[index]++
            //   }
            // })
            this.nowStep = 3
          }
          break
        }
        case 3: {
          if (this.nowPage < this.userInfos.length) {
            this.displayImg1.pop()
            this.displayImg2.pop()
            if (this.displayImg3.length !== 0) {
              this.displayImg3.pop()
            }
            this.isEditMain = false
            this.nowStep = 1
          }
        }
      }
    },
    async editLast(index) {   //编辑主体信息上一步

    },
    editComplete(index) {     //完成编辑主体信息
      this.displayImg1.pop()
      this.displayImg2.pop()
      if (this.displayImg3.length !== 0) {
        this.displayImg3.pop()
      }
      if (this.nowPage < this.userInfos.length) {
        this.userInfos[index].completeStatus = "编辑主体信息"
        this.nowStep = 1
        this.allUserInfos[index].completeStatus = "编辑主体信息"
        this.isEditMain = true
      }else {
        if (this.RegisterData.subjects[index].rights.length > 0) {
          this.nowStep = 1
          this.otherUserInfos[index - this.userInfos.length].completeStatus = "编辑主体信息"
  
          this.allUserInfos[index].completeStatus = "编辑主体信息"
          this.isEditMain = true
        }
      }
      console.log(this.RegisterData)
    },
    showImg1(index) {
      document.getElementById('file1').click()
    },
    showImg2(index) {
      document.getElementById('file2').click()
    },
    showImg3(index) {
      document.getElementById('file3').click()
    },
    async getPicture1(e) {
      if (e.target !== null) {
        let that = this
        let forms = new FormData()
        let src = window.URL.createObjectURL(e.target.files[0]);
        forms.append("file", e.target.files[0])
        forms.append("category", "subject_file")
        forms.append("workId", this.RegisterData.workId)
        forms.append("type", "1")
        this.displayImg1.pop()
        await upload(forms, this.headers).then(res=>{
          // let file = {fileId: res.data.data.fileId, fileType: "1"}**************
          // let flag = 0
          if (res.data.data !== null) {
            that.RegisterData.subjects[that.nowPage].material.files[0].fileId = res.data.data.fileId
            console.log("图片材料文件的id是：" + that.RegisterData.subjects[that.nowPage].material.files[0].fileId)
            console.log(res.data.data.fileId)
            that.displayImg1.push(src)
          }
        })
        this.imgs[this.nowPage][0] = src   //  保存当前图片
      }
      //显示图片
      //this.img1 = e.target.files[0]    //处理图片正面
      //this.imgs[this.nowPage][0] = src   //  保存当前图片
      // for (let i = 0; i <this.img1.length; i++) {
      //   this.img1.pop()
      // }
      // this.img1.push(src)
    },
    async getPicture2(e) {
      if (e.target !== null) {
        let that = this
        let forms = new FormData()
        let src = window.URL.createObjectURL(e.target.files[0]);
        forms.append("file", e.target.files[0])
        forms.append("category", "subject_file")
        forms.append("workId", this.workId)
        forms.append("type", "2")
        this.displayImg2.pop()
        await upload(forms).then(res=>{
          // console.log(res.data.data)
          // let file = {fileId: res.data.data.fileId, fileType: "2"}
          // let flag = 0
          if (res.data.data !== null) {
            that.RegisterData.subjects[that.nowPage].material.files[1].fileId = res.data.data.fileId
            that.displayImg2.push(src)
          }
          // that.RegisterData.subjects[that.nowPage].material.files[1].fileId = 2
          // for(let i = 0; i < that.subjects.material.files.length; i++) {
          //   if(that.subjects.material.files[i].fileType === "2") {
          //     that.subjects.material.files[i].fileId = res.data.data.fileId
          //     flag = 1
          //     break
          //   }
          // }
          // if (flag === 0) {
          //   that.subjects.material.files.push(file)
          // }
        })

        //显示图片
        //this.img1 = e.target.files[0]    //处理图片正面
        // for (let i = 0; i <this.img2.length; i++) {
        //   this.img2.pop()
        // }
        // this.img2.push(src)
        this.imgs[that.nowPage][1] = src    //保存当前图片
      }
    },
    async getPicture3(e){
      if (e.target !== null) {
        let that = this
        let forms = new FormData()
        let src = window.URL.createObjectURL(e.target.files[0]);
        forms.append("file", e.target.files[0])
        forms.append("category", "subject_file")
        forms.append("workId", this.workId)
        forms.append("type", "3")
        this.displayImg3.pop()
        await upload(forms).then(res=>{
          if (res.data.data !== null) {
            that.RegisterData.subjects[that.nowPage].material.files[2].fileId = res.data.data.fileId
            that.displayImg3.push(src)
          }
          // that.RegisterData.subjects[that.nowPage].material.files[2].fileId = 3
          // console.log(res.data.data)
          // let file = {fileId: res.data.data.fileId, fileType: "3"}
          // let flag = 0
          // for(let i = 0; i < that.subjects.material.files.length; i++) {
          //   if(that.subjects.material.files[i].fileType === "3") {
          //     that.subjects.material.files[i].fileId = res.data.data.fileId
          //     flag = 1
          //     break
          //   }
          // }
          // if (flag === 0) {
          //   that.subjects.material.files.push(file)
          // }
        })
        //显示图片
        //this.img1 = e.target.files[0]    //处理图片正面
        // for (let i = 0; i <this.img3.length; i++) {
        //   this.img3.pop()
        // }
        // this.img3.push(src)
        this.imgs[that.nowPage][2] = src   //保存当前图片
      }
    },
    async chooseAuthor(index) {      //署名作者列表

    },
    getAuthorType(index, pos) {   //署名状态
      // pos为选择的标签的下标
      this.RegisterData.object.authors[index].signStatus = this.signStatus[index][pos].value
      //this.signStatus[index][pos].isChoose = true
      //for (let i = 0; i < this.signStatus[index].length; i++) {
      //  if (i !== pos) {
      //    this.signStatus[index][i].isChoose = false
      //  }
      //}
    },
    addSignUser() {                     //添加用户   客体信息

    },
    chooseRights(index, pos) {          //选择权利集合
      if (this.selectRights[index][pos].isChoose) {   //已选变未选
        this.selectRights[index][pos].isChoose = false
        for (let i = 0; i < this.RegisterData.subjects[index].rights.length; i++) {
          if (this.RegisterData.subjects[index].rights[i].category === this.selectRights[index][pos].value) {
            this.RegisterData.subjects[index].rights.splice(i, 1)         //减去这个主体对应的权利项
            this.selectRights[index][pos].explain = ""             //清空权利说明
            break
          }
        }
      } else {
        this.selectRights[index][pos].isChoose = true
        this.RegisterData.subjects[index].rights.push({category: this.selectRights[index][pos].value, explain: ""})
      }
    },
    rightsExplain(index, pos, explain) {
      if (this.selectRights[index][pos].isChoose) {  //如果这个权利未选，则无法输入  若已选 则实时更新到RegisterData
        this.RegisterData.subjects[index].rights[pos].explain = explain
      } else {
        this.selectRights[index][pos].explain = ""
      }
    },
    async searchOther(index, value) {                      //搜索无财产权的用户
      let that = this
      for (let i = 0; i < this.otherSearchUsers[index].length; i++) {
        this.otherSearchUsers[index].pop()
      }
      await getUserInfoByName(value, this.headers).then(res=>{
        if (res.data.data !== null) {
          let flag = 0
          for (let i = 0; i < that.userInfos.length; i++) {
            if (that.userInfos[i].username === res.data.data.username) {
              flag = 1
              break
            }
          }
          if (flag === 0) {
            that.otherSearchUsers[index].push({type: res.data.data.type, username: res.data.data.username, name: res.data.data.username, userId: res.data.data.userId, nameString: res.data.data.username + "（**" + res.data.data.name + "）"})
          }
        }
      })
      let phone = Number(value)
      if (!isNaN(phone)) {
        await getUserInfoByNumber(phone, this.headers).then(res=>{
          if (res.data.data !== null) {
            let flag = 0
            let flag2 = 0
            for (let i = 0; i < that.userInfos.length; i++) {
              if (that.userInfos[i].username === res.data.data.username) {
                flag = 1
                break
              }
            }
            for (let i = 0; i < that.otherSearchUsers[index].length; i++) {
              if (that.otherSearchUsers[index][i].username === res.data.data.name) {
                flag2 = 1
              }
            }
            if (flag === 0 && flag2 === 0) {
              that.otherSearchUsers[index].push({type: res.data.data.type, username: res.data.data.username, name: res.data.data.username, userId: res.data.data.userId, nameString: res.data.data.username + "（**" + res.data.data.name + "）"})
            }
          }
        })
      }
    },
    async ensureOther(index) {                                   //无财产权的用户选择
      let flag = 0
      let pos = 0
      //先找到选择的用户
      for (let i = 0; i < this.searchUser[index - this.userInfos.length].length; i++) {
        if (this.RegisterData.subjects[index].userId === this.searchUser[index - this.userInfos.length][i].userId) {
          pos = i
          break
        }
      }
      for (let i = 0; i < this.RegisterData.subjects.length; i++) {
        if (i !== index) {
          if (this.RegisterData.subjects[i].userId === this.RegisterData.subjects[index].userId) {   //检查有没有用户重复
            flag = 1
            this.RegisterData.subjects[index].userId = ""
            break
          }
        }
      }
      if (flag === 0) {
        //用户信息
        this.allUserInfos[index].type = this.searchUser[index - this.userInfos.length][pos].type   //aaa不对不对
        this.allUserInfos[index].username = this.searchUser[index - this.userInfos.length][pos].username
        this.allUserInfos[index].name = this.searchUser[index - this.userInfos.length][pos].name
        this.allUserInfos[index].userId = this.searchUser[index - this.userInfos.length][pos].userId
        this.allUserInfos[index].phone = this.searchUser[index - this.userInfos.length][pos].phone
        this.allUserInfos[index].nameString = this.searchUser[index - this.userInfos.length][pos].nameString
        if (this.allUserInfos[index].type === 100) {    // 机构
          
          for (let i = 0; i < this.RegisterData.subjects[index].material.files.length; i++) {
            this.RegisterData.subjects[index].material.files.pop()
          }

          let file1 = new AddFile("","1")  //正面
          let file2 = new AddFile("","2")  //反面
          let file3 = new AddFile("","3")  //手持

          this.imgs[index][0] = ""
          this.imgs[index][1] = ""
          this.imgs[index][2] = ""

          this.RegisterData.subjects[index].idType = "A6"      // 选择证件类型
          this.RegisterData.subjects[index].material.files.push(file1)
          this.RegisterData.subjects[index].material.files.push(file2)
          this.RegisterData.subjects[index].material.files.push(file3)
          this.accountType[index] = "机构"
        }else {
          this.accountType[index] = "个人用户"
        }
      }
    },
    uploadFileClick(index) {
      document.getElementById('upload'+index).click()
    },
    async uploadFile(e,index) {
      if (e.target !== null) {
        let that = this
        let forms = new FormData()
        let src = window.URL.createObjectURL(e.target.files[0]);
        forms.append("file", e.target.files[0])
        forms.append("category", "material")
        forms.append("workId", this.RegisterData.workId)
        forms.append("type", materials[index].type)
        await upload(forms, this.headers).then(res=>{
          // let file = {fileId: res.data.data.fileId, fileType: "1"}**************
          // let flag = 0
          if (res.data.data !== null) {
            that.RegisterData.materials[index].fileId = [res.data.data.fileId]
            that.materials[index].uploadFileUrl = src
            that.materials[index].uploadFileName = e.target.files[0].name
            that.materials[index].isUploaded = true
          }
        })
      }
    },
    deleteFile(index) {
      this.materials[index].isUploaded = false
      this.RegisterData.materials[index].fileId = []
      that.materials[index].uploadFileUrl = ""
      that.materials[index].uploadFileName = ""

    }
  }
}
</script>

<style scoped>
#registerRights{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#registerAdd{
  margin-top: 181px;
  position: absolute;
  width: 100%;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
}
#objectInfo{
  margin-top: 181px;
  position: absolute;
  width: 100%;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
}
.keepSuccessBack{
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  opacity: 50%;
  background-color: #4B4B4B;
  z-index: 1;
}
.resultCard{
  width: 460px;
  height: 216px;
  background: #FFFFFF;
  border-radius: 10px;
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.successLogo{
  width: 25px;
  height: 25px;
  object-fit: cover;
}
.successText1{
  font-family: 'PingFang HK',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #000000;
  margin-left: 15px;
}
.successTip{
  font-family: 'PingFang HK',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #B1B1B1;
  margin-top: 16px;
}
.windowSure{
  font-family: 'PingFang HK',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #326CC2;
  cursor: pointer;
}
.registerBottomLine{
  width: 952px;
  height: 1px;
  background-color: #CACACA;
}
.registerAddUser{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
  margin-top: 18px;
  cursor: pointer;
  margin-bottom: 41px;
}
.refineInfo{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
  color: #326CC2;
  margin-left: 76px;
}
.deleteObj{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #EA5757;
  cursor: pointer;
  margin-left: 245px;
}
#registerRights>>>.el-input__inner{
  box-sizing: border-box;

  width: 410px;
  height: 43px;
  border: 1px solid #848484;
  border-radius: 6px;

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

}
#registerRights>>>.el-input__inner::placeholder{
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #A0A0A0;
}
#registerRights>>>.el-select-dropdown{
  margin: 0;
  width: 410px;
  max-height: 274px;

  background: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #8C8C8C;
}
#registerRights>>>.el-popper .popper__arrow{
  display: none;
}
#registerRights>>>.el-select-dropdown__item{
  width: 410px;
  height: 35px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

  display: flex;
  align-items: center;

}.selected{
   font-family: 'Inter',sans-serif;
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   color: #000000;
 }
#registerRights>>>.el-select-dropdown__item:hover{
  background-color: #DBDBDB;
}
#registerRights>>>.el-select-dropdown__item.hover{
  background-color: #DBDBDB;
}

#registerRights>>>.el-avatar .el-cascader-panel .el-radio .el-radio--medium.is-bordered .el-radio__label .el-radio__label{
  font-size: 16px;
}
#registerRights>>>.el-cascader-menu{
  color: #070707;
  border-right: 1px solid #848484;
}
#registerRights>>>.el-popper[x-placement^=bottom]{
  margin-top: 1px;
}
#registerRights>>>.el-cascader__dropdown{
  font-size: 16px;
  background-color: #FFFFFF;
  border-color: #848484;
}
#registerRights>>>.el-cascader-node.in-active-path, .el-cascader-node.is-active, .el-cascader-node.is-selectable.in-checked-path{
  color: #848484;
  font-weight: 500;
}
#registerRights>>>.el-input.is-disabled .el-input__inner{
  background-color: #FFFFFF;
  color: #000000;
  border-color: #848484;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
#registerRights>>>.el-input__prefix{
  display: none;
}
#registerRights>>>.el-input__suffix-inner{
  display: none;
}
#registerRights>>>.el-input::-webkit-scrollbar-thumb{
  width: 410px;
  height: 43px;
}
.helpText{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #8A8A8A;
}
.helpIcon{
  height: 20px;
  width: 20px;
  object-fit: cover;
}
.selectedText{
  font-family: 'PingFang HK',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #326CC2;
}
.unselectedText{
  font-family: 'PingFang HK',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #A3A3A3;
}
.objItem{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.registerLineBottom{
  width: 90%;
  height: 1px;
  background-color: #CACACA;
  margin-top: 35px;
}
.addText{
  margin-top: 18px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #575757;
  cursor: pointer;
}
.numberTitle{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
}
.basicInfoBack{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 440px;
  width: 68%;
}
.SubjectForm{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.subjectItem{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 55%;
  margin-top: 30px;
  min-width: 600px;
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
  margin-left: 10px;
}
.subjectItems{
  width: 1021px;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F1F1F1;
}
.materials{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 68%;
}
.subjectItemFile{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 55%;
  min-width: 600px;
  margin-top: 30px;
}
.SubjectForm{
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-left: 10px;
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
  justify-content: space-between;
  width: 780px;
  margin-top: 16px;
}
.selectIcon{
  width: 28px;
  height: 28px;
  object-fit: cover;
  cursor: pointer;
}
.inputLeft{
  margin-left: 45px;
}
.registerNext{
  width: 185px;
  height: 55px;
  background: #326CC2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  cursor: pointer;
}
.displayButtons{
  display: flex;
  flex-direction: row-reverse;
  width: 66%;
  margin-top: 100px;
}
#registerRights>>>.el-input--prefix .el-input__inner {
  padding-left: 15px;
}
#registerRights>>>.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: auto;
}
.explainInput{
  width: 420px;
  height: 40px;
  top: 443px;
  border: 1px solid #929292;
  border-radius: 4px;
}
#uploadMaterial{
  margin-top: 181px;
  position: absolute;
  width: 100%;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
}
.materialsBox{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}
.materialItem{
  display: flex;
  align-items: center;
}
.materialLeft{
  display: flex;
  align-items: center;
  width: 400px;
}
.fileName{
  font-family: 'Inter',Georgia,Serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  width: 140px;
}
.downloadBtn{
  font-family: 'Inter',Georgia,Serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #326CC2;
  margin-left: 80px;
  text-decoration: none;
}
.uploadFileName{
  font-family: 'Inter',Georgia,Serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #606060;
  width: 140px;
}
.uploadDel{
  font-family: 'Inter',Georgia,Serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #EA5757;
  cursor: pointer;
  margin-left: 45px;

}
.materialRight{
  display: flex;
  align-items: center;
}
.uploadAllMaterials{
  display: flex;
  align-items: center;
}
</style>