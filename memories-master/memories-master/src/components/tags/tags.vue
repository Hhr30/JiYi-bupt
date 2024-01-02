<template>
  <div class="tags" :style="{width: boxWidth, rowGap: rowGap}">
    <div :id="tagId + index" :style="{
        height: tagHeight,
        width: tagWidth,
        backgroundColor: tagBackColor,
        border: tagBorder,
        borderRadius: tagBorderRadius,
        marginLeft: index === 0 || index === pos ? '0' : tagLeft,
        color: tagTextColor,
        size: tagTextSize,
        fontFamily: tagTextFamily,
        fontStyle: tagTextStyle,
        fontWeight: tagTextWeight,
        lineHeight: tagTextLineHeight
    }" class="myTag" @click="chooseAttribute(index)" v-for="(item,index) in valueArray" :key="tagId + index">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: "tags",
  data() {
    return {
      isChoose: false
    }
  },
  props: {
    isSingle: {
      type: Boolean,
      default: true
    },
    valueArray: {
      type: Array,
      default: []
    },
    tagId: {
      type: String,
      default: "tag"
    },
    tagHeight: {  //标签的高度
      type: String,
      default: "44px"
    },
    tagWidth: {   //标签的宽度
      type: String,
      default: "91px"
    },
    tagBackColor: {     //标签的背景色
      type: String,
      default: "#FFFFFF"
    },
    tagBorder: {       //标签的边框
      type: String,
      default: "1px solid #6C6C6C"
    },
    tagBorderRadius: {     //边框的半径
      type: String,
      default: "6px"
    },
    tagLeft: {
      type: String,
      default: "13px"
    },
    tagTextColor: {           //内容的颜色
      type: String,
      default: "#6C6C6C"
    },
    tagTextSize: {
      type: String,
      default: "16px"
    },
    tagTextFamily: {
      type: String,
      default: "Inter"
    },
    tagTextStyle: {
      type: String,
      default: "normal"
    },
    tagTextWeight: {
      type: String,
      default: "400"
    },
    tagTextLineHeight: {
      type: String,
      default: "19px"
    },
    changeColor: {   //选中的颜色
      type: String,
      default: "#326CC2"
    },
    isChange: {
      type: Boolean,
      default: false
    },
    boxWidth: {
      type: String,
      default: '750px'
    },
    rowGap: {
      type: String,
      default: "8px"
    },
    pos: {
      type: Number,
      default: 0
    },
    isDisabled: {   //是否可编辑
      type: Boolean,
      default: false
    }
  },
  computed: {
    normalClass() {
      return {
        height: this.tagHeight,
        width: this.tagWidth,
        backgroundColor: this.tagBackColor,   //边框的颜色
        border: this.tagBorder,
        borderRadius: this.tagBorderRadius,
        //marginLeft: this.tagLeft,
        color: this.tagTextColor,   //字体的颜色
        size: this.tagTextSize,
        fontFamily: this.tagTextFamily,
        fontStyle: this.tagTextStyle,
        fontWeight: this.tagTextWeight,
        lineHeight: this.tagTextLineHeight
      }
    }
  },
  methods:{
    chooseAttribute(index) {
      if(this.isDisabled === false) {
        if(this.isSingle) {
          if(this.valueArray[index].isChoose === false){
            document.getElementById(this.tagId + index).style.color = this.changeColor     //点击修稿样式
            document.getElementById(this.tagId + index).style.borderColor = this.changeColor
            this.valueArray[index].isChoose = true
            this.$emit("getType",index)
          }
          for(let i = 0; i < this.valueArray.length; i++) {
            if(this.valueArray[i].isChoose === true && i !== index){
              document.getElementById(this.tagId + i).style.color = this.tagTextColor
              document.getElementById(this.tagId + i).style.borderColor = this.tagTextColor
              this.valueArray[i].isChoose = false
            }
          }
        }else {
          if(this.valueArray[index].isChoose === false){
            document.getElementById(this.tagId + index).style.color = this.changeColor     //点击修稿样式
            document.getElementById(this.tagId + index).style.borderColor = this.changeColor
            this.valueArray[index].isChoose = true
            this.$emit("getType",index)
          }else {
            document.getElementById(this.tagId + index).style.color = this.tagTextColor
            document.getElementById(this.tagId + index).style.borderColor = this.tagTextColor
            this.valueArray[index].isChoose = false
            this.$emit("getType",index)
          }
        }
      }
    },
    choose2(index) {
      console.log("执行了" + index)
      if(this.isDisabled) {
        document.getElementById(this.tagId + index).style.color = this.changeColor     //点击修稿样式
        document.getElementById(this.tagId + index).style.borderColor = this.changeColor
        this.valueArray[index].isChoose = true
        for(let i = 0; i < this.valueArray.length; i++) {
          if(this.valueArray[i].isChoose === true && i !== index){
            document.getElementById(this.tagId + i).style.color = this.tagTextColor
            document.getElementById(this.tagId + i).style.borderColor = this.tagTextColor
            this.valueArray[i].isChoose = false
          }
        }
      }
    }
  },
}
</script>

<style scoped>
.myTag{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.tags{
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
}
</style>