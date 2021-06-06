<template>
  <el-dropdown class="language-content" trigger="click">
    <span class="language">
      <img :src="config[current]" class="small-icon" alt="" srcset="" />
      {{ nameConfig[current] }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="changeLanguage('zh')"
        ><img class="e" src="../../assets/ch.png" alt="" />中国
      </el-dropdown-item>
      <el-dropdown-item @click.native="changeLanguage('en')"
        ><img class="zn" src="../../assets/en.png" alt="" />美国</el-dropdown-item
      >
      <el-dropdown-item @click.native="changeLanguage('kn')"
        ><img class="jp" src="../../assets/han.png" alt="" />韩国</el-dropdown-item
      >
      <el-dropdown-item @click.native="changeLanguage('e')"
        ><img class="kn" src="../../assets/e.png" alt="" />俄罗斯</el-dropdown-item
      >
      <el-dropdown-item @click.native="changeLanguage('jp')">
        <img src="../../assets/jp.png" alt="" />日本</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      current: 'zh',
      nameConfig: {
        en: '美国',
        jp: '日本',
        kn: '韩国',
        e: '俄罗斯',
        zh: '中国'
      },
      config: {
        en: require('../../assets/en.png'),
        jp: require('../../assets/jp.png'),
        kn: require('../../assets/han.png'),
        e: require('../../assets/e.png'),
        zh: require('../../assets/ch.png')
      }
    }
  },
  methods: {
    changeLanguage(type) {
      this.current = type
      // console.log(type)
      localStorage.setItem('Language', type)
      this.$i18n.locale = type
    }
  },
  created() {
    this.current = localStorage.getItem('Language') || 'zh'
  }
}
</script>

<style lang="scss">
.language-content {
  width: 150px;
  height: 55px;
  position: absolute;
  top: 48px;
  right: 30px;
  z-index: 999;
  display: flex;
  line-height: 55px;
  .language {
    width: 110px;
    height: 35px;
    border-radius: 46px;
    border: 1px solid #c6c6c6;
    display: flex;
    color: #fff;
    align-items: center;
    justify-content: space-around;
    .small-icon {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}
.el-dropdown-menu__item {
  display: flex;
  width: 150px;
  align-items: center;
  justify-content: flex-start;
  height: 51px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
}
</style>
