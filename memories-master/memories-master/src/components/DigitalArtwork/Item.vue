<template>
  <div class="item" :style="defStyle">
    <div class="itemTip" :style="Tip">
      <p class="necc">*</p>
      <div class="itemname"><slot name="itemName"></slot></div>
    </div>
    <div :style="Type">
      <slot name="itemType"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    boxHeight: {
      type: String,
      default: "147px"
    },
    marginTop: {
      type: String,
      default: "12px"
    },
    boxWidth: {
      type: String,
      default: "1021px"
    },
    boxRadius: {
      type: String,
      default: "8px"
    },
    left: {            //左边距
      type: String,
      default: "35px"
    },
    tipTop: {
      type: String,
      default: "23px"
    },
    typeTop: {
      type: String,
      default: "20px"
    }
  },
  data() {
    return {

    }
  },
  computed: {
    defStyle() {
      return {height: this.boxHeight, marginTop: this.marginTop, width: this.boxWidth, borderRadius: this.boxRadius}
    },
    Tip() {
      return {marginLeft: this.left, marginTop: this.tipTop}
    },
    Type() {
      return {marginLeft: this.left, marginTop: this.typeTop}
    }
  }
}
</script>

<style scoped>
div{
  margin: 0;
  padding: 0;
}
.item{
  flex: none;
  order: 0;
  flex-grow: 0;

  height: 147px;

  background: #FFFFFF;
}
.itemTip{
  display: flex;
  height: 23px;
}
.necc{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;

  color: #EA5757;

}
.itemname{
  margin-left: 10px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */


  color: #404040;
}
</style>