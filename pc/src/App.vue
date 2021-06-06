<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.el-loading-spinner {
  .el-icon-loading,
  .el-loading-text {
    color: #fff !important;
  }
}
</style>
