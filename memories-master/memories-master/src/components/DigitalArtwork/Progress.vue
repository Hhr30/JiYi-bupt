<template>
  <div id="progress" :style="{width: progressWidth + 'px'}">
    <div class="pro-name"><slot name="p-name"></slot></div>
    <div class="pro-line" :style="{width: progressWidth + 'px'}">
      <div class="pro-back" :style="{width: progressWidth + 'px'}">
        <div class="pro-forward" :style="{width: lineWidth}"></div>
      </div>
      <div class="pro-point" :style="{left: pointLeft}"></div>
    </div>
    <div id="pro-text" :style="{marginTop: itemTextTop}">
      <p v-for="(item, index) in titleArray"
         :key="item + index"
         :style="{
           marginLeft: index === 0 ? itemMargin + 'px' : '0',
           marginRight: index === titleArray.length - 1 ? itemMargin + 'px' : '0'
          }"
      >{{titleArray[index]}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Progress",
  props: {
    titleArray: {
      type: Array,
      default: () => []
    },
    itemTextTop: {
      type: String,
      default: "60px"
    },
    itemMargin: {
      type: Number,
      default: 28
    },
    status: {      //记录当前路由状态
      type: Number,
      default: 1
    },
    progressWidth: {
      type: Number,
      default: 1021
    }
  },
  computed: {
    lineWidth() {
      if(this.titleArray.length === 3){     //计算进度条的长度并显示
        if (this.status === 1){
          return (this.itemMargin + 48) + 'px'
        }else if(this.status === 2){
          return this.progressWidth/2 + 'px'
        }else {
          return (this.progressWidth - this.itemMargin - 48) + 'px'
        }
      }else if(this.titleArray.length === 4){
        if (this.status === 1){
          return (this.itemMargin + 48) + 'px'
        }else if(this.status === 2){
          return (((this.progressWidth - 96 - this.itemMargin) / 3) + 48 + this.itemMargin) + 'px'
        }else if(this.status === 3){
          return (((this.progressWidth - 96 - this.itemMargin) * 2 / 3) + 48 + this.itemMargin) + 'px'
        }else {
          return (this.progressWidth - 48 - this.itemMargin) + 'px'
        }
      }
    },
    pointLeft() {
      if(this.titleArray.length === 3){
        if (this.status === 1){
          return (this.itemMargin + 48 - 10) + 'px'
        }else if(this.status === 2){
          return this.progressWidth/2 - 10 + 'px'
        }else {
          return (this.progressWidth - this.itemMargin - 48 - 10) + 'px'
        }
      }else if(this.titleArray.length === 4){
        if (this.status === 1){
          return (this.itemMargin + 48 - 10) + 'px'
        }else if(this.status === 2){
          return (((this.progressWidth - 96 - this.itemMargin) / 3) + 48 + this.itemMargin - 10) + 'px'
        }else if(this.status === 3){
          return (((this.progressWidth - 96 - this.itemMargin) * 2 / 3) + 48 + this.itemMargin - 10) + 'px'
        }else {
          return (this.progressWidth - 48 - this.itemMargin - 10) + 'px'
        }
      }
    }
  }

}
</script>

<style scoped>

div{
  margin: 0;
  padding: 0;
}
p{
  margin: 0;
  padding: 0;
}
#progress{
  position: absolute;
  height: 97px;
  top: 69px;
}
.pro-name{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #000000;
}
.pro-line{
  position: absolute;
  height: 20px;
  top: 49px;
  display: flex;
  align-items: center;
}
.pro-back{
  position: absolute;
  height: 7px;
  background: #EFEFEF;
  border-radius: 3.5px;
}
.pro-forward{
  height: 7px;
  background: #326CC2;
  border-radius: 3.5px;
}
.pro-point{
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #326CC2;
}
#pro-text{
  display: flex;
  justify-content: space-between;
  position: relative;
}
#pro-text p{
  width: 140px;
  height: 19px;

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

  flex: none;
  order: 0;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>