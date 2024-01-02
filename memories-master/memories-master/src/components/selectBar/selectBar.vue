<template>
  <div id="selected-bar" :style="selectBarStyle">
    <div :style="selectBarHeader" class="BarHeader" @click="spread" :id="selectBarId">       <!--选择器组件的头-->
      <div :style="headerText" :id="selectBarId + 'header'">{{selectedText}}</div>
      <div :style="headerImg"><slot name="selectImg"></slot></div>
    </div>
    <div class="itemBox" :id="selectBarId + 'itemBox'" :style="itemBox">
      <div :style="skip"></div>
      <div v-for="(item, index) in selectItem" :key="selectBarId + index" :id="selectBarId + index" @mouseenter="itemEnter(index)"
           @mouseleave="itemLeave(index)" style="display: flex;align-items: center;cursor: pointer" :style="itemTextBox" @click="selectText(item,index)">
        <p :style="itemText">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "selectBar",
  props: {
    selectedText: {
      type: String,
      default: ""
    },
    barWidth: {        //设置总组件的宽度
      type: String,
      default: "200px"
    },
    BarHeaderWidth: {    //选择器头的宽度
      type: String,
      default: "410px"
    },
    BarHeaderHeight: {    //选择器头的高度
      type: String,
      default: "43px"
    },
    BarHeaderBorder: {    //选择器头的边框粗细和颜色设置
      type: String,
      default: "1px solid #848484"
    },
    BarHeaderRadius: {    //选择器头的边框角半径
      type: String,
      default: "6px"
    },
    headerTextLeft: {     //选择器头里文字部分的左边距
      type: String,
      default: "20px"
    },
    headerTextSize: {     //选择器开头的字的大小
      type: String,
      default: "16px"
    },
    headerTextColor: {    //选择器开头的字的颜色
      type: String,
      default: "#A0A0A0"
    },
    headerTextFamily: {    //选择器开头的字体
      type: String,
      default: "Inter"
    },
    headerTextStyle: {
      type: String,
      default: "normal"
    },
    headerTextWeight: {
      type: String,
      default: "400"
    },
    headerTextLineHeight: {
      type: String,
      default: "19px"
    },
    headerImgRight: {    //选择器头里下拉图标的右边距
      type: String,
      default: "9px"
    },
    headerImgHeight: {   //选择图标的高度
      type: String,
      default: "24px"
    },
    headerImgWidth: {    //选择图标的宽度
      type: String,
      default: "24px"
    },
    selectItem: {        //选择器的内容
      type: Array,
      default: () => []
    },
    selectBarId: {       //设置id，便于组件使用
      type: String,
      default: "SelectBar"
    },
    itemBoxWidth: {      //下拉框的宽度
      type: String,
      default: "410px"
    },
    itemBoxHeight: {     //下拉框的最大高度
      type: String,
      default: "274px"
    },
    itemBoxBorder: {     //下拉框的边框
      type: String,
      default: "1px solid #8C8C8C"
    },
    itemBoxBackColor: {   //下拉框的背景色
      type: String,
      default: "#FFFFFF"
    },
    itemBoxRadius: {
      type: String,
      default: "6px"
    },
    itemTextBoxWidth: {     //每一条选择框的宽度
      type: String,
      default: "410px"
    },
    itemTextBoxHeight: {    //每一条选择框的高度
      type: String,
      default: "35px"
    },
    itemFirstBoxTop: {     //第一项与顶部的间隔
      type: String,
      default: "0"
    },
    selectItemColor: {     //被选中的框的颜色
      type: String,
      default: "#DBDBDB"
    },
    noselectItemColor: {   //没被选中的框的颜色
      type: String,
      default: "#FFFFFF"
    },
    itemTextSize: {    //字的样式
      type: String,
      default: "16px"
    },
    itemTextWeight: {
      type: String,
      default: "400"
    },
    itemTextFamily: {
      type: String,
      default: "Inter"
    },
    itemTextStyle: {
      type: String,
      default: "normal"
    },
    itemTextLineHeight: {
      type: String,
      default: "19px"
    },
    itemTextColor: {
      type: String,
      default: "#000000"
    },
    itemTextLeft: {
      type: String,
      default: "20px"
    }
  },
  computed: {
    selectBarStyle() {    //选择器最外框的样式  设置宽度、子组件的关系
      return {
        width: this.barWidth
      }
    },
    selectBarHeader() {    //选择器头的外框样式
      return {
        width: this.BarHeaderWidth,
        height: this.BarHeaderHeight,
        border: this.BarHeaderBorder,
        borderRadius: this.BarHeaderRadius
      }
    },
    headerText() {    //选择器文字的样式
      return {
        marginLeft: this.headerTextLeft,
        fontSize: this.headerTextSize,
        color: this.headerTextColor,
        fontFamily: this.headerTextFamily,
        fontStyle: this.headerTextStyle,
        fontWeight: this.headerTextWeight,
        lineHeight: this.headerTextLineHeight
      }
    },
    headerImg() {    //下拉图标样式
      return {
        height: this.headerImgHeight,
        marginRight: this.headerImgRight,
        width: this.headerImgWidth
      }
    },
    itemBox() {      //每个选项的样式
      return {
        width: this.itemBoxWidth,
        maxHeight: this.itemBoxHeight,
        border: this.itemBoxBorder,
        backgroundColor: this.itemBoxBackColor,
        borderRadius: this.itemBoxRadius
      }
    },
    itemTextBox() {     //选项盒的样式
      return {
        height: this.itemTextBoxHeight,
        width: this.itemTextBoxWidth,
      }
    },
    skip() {      //间隔样式
      return {
        height: this.itemFirstBoxTop,
        width: this.itemBoxWidth
      }
    },
    itemText() {      //文字的样式
      return {
        fontSize: this.itemTextSize,
        weight: this.itemTextWeight,
        fontFamily: this.itemTextFamily,
        fontStyle: this.itemTextStyle,
        lineHeight: this.itemTextLineHeight,
        color: this.itemTextColor,
        marginLeft: this.itemTextLeft
      }
    }
  },
  methods: {
    spread() {
      if (document.getElementById(this.selectBarId + "itemBox").style.display === "none" || document.getElementById(this.selectBarId + "itemBox").style.display === "") {
        document.getElementById(this.selectBarId + "itemBox").style.display = "block"
      }else{
        document.getElementById(this.selectBarId + "itemBox").style.display = "none"
      }
    },
    itemEnter(index) {
      document.getElementById(this.selectBarId + index).style.backgroundColor = this.selectItemColor
    },
    itemLeave(index) {
      document.getElementById(this.selectBarId + index).style.backgroundColor = this.noselectItemColor
    },
    selectText(item, index) {
      this.$emit("changeText", item)
      document.getElementById(this.selectBarId + "itemBox").style.display = "none"
      document.getElementById(this.selectBarId + 'header').style.color = this.itemTextColor
    }
  }
}
</script>

<style scoped>
#selected-bar{
  position: relative;
}
.BarHeader{
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.itemBox{
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  display: none;
}
.itemBox:hover{
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #AAAAAA;
}
.itemBox::-webkit-scrollbar{
  width: 7px;
  height: 76px;

}

.itemBox::-webkit-scrollbar-thumb{
  border-radius: 3.5px;
  background-color: #AAAAAA;
}

</style>