<template>
<!--走进纪艺-->
  <div>
    <router-link to="/exhibition/enter/menu"></router-link>
    <router-link to="/exhibition/enter/inheritor"></router-link> <!--继承人-->
    <router-link to="/exhibition/enter/weChat"></router-link>
    <router-link to="/exhibition/enter/creator"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "enter"
}
</script>

<style scoped>

</style>