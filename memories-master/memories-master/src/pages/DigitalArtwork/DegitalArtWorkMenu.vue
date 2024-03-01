<template>
<div>
  <router-link to="/DigitalArtwork/Work"></router-link>
  <router-link to="/DigitalArtwork/upload"></router-link>
  <router-link to="/DigitalArtwork/deposit"></router-link>
  <router-link to="/DigitalArtwork/enroll"></router-link>
  <router-link to="/DigitalArtwork/registerRight"></router-link>
  <router-link to="/DigitalArtwork/profile"></router-link>
  <div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: "DegitalArtWorkMenu"
}
</script>

<style scoped>

</style>