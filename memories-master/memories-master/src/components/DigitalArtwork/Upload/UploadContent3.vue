<template>
  <finish-work>发起作品存证成功</finish-work>
</template>

<script>
import FinishWork from "@/components/DigitalArtwork/Finish/FinishWork";

export default {
  name: "UploadContent3",
  components: {
    FinishWork
  }
}
</script>

<style scoped>
#uploadComplete{
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 181px;
  position: absolute;
  width: 100%;
  background: #F1F1F1;
}
.completeInfo{
  width: 1017px;
  height: 499px;
  margin-top: 23px;
  background: #FFFFFF;
  border-radius: 13px;
  margin-bottom: 197px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.completeMes{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 34px;
  /* identical to box height */
  margin-top: 190px;

  color: #000000;
}
.check{
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.checkFont{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #9E9E9E;
}
.myWork{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #326CC2;
  cursor: pointer;
}
.backHome{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #326CC2;

  margin-top: 200px;
  cursor: pointer;
}
</style>