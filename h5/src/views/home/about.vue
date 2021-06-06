<!-- home -->
<template>
  <div class="about-container" v-html="json"></div>
</template>

<script>
// 请求接口
import { getUserInfo } from '@/api/user.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      json: `
       <p>{</p>
        <p style="padding:0 20px;box-sizing:border-box;">address: '0x505ade8cea4db608250e503a5e8d4cb436044d2e',</p>
        <p style="padding:0 20px;box-sizing:border-box;">
          msg:
            "As the audit result, 1 remark was revealed that did not affect the users' funds security on the contract. The exit scam clear signs - not found. Remark is related to the contract peculiarities, regarding the additional income calculation depending on the time. Telescr.in guarantees the VANE contract security and performance. Sha1 from bytecode: 14d6419c77a6ef5b2614c89de9b148709ac3989f, sha1 from bytecode (non-metadata): 8bfde0fb50565c75e292d04dd45d96ec766b307f, contract address: TWNVY5MEsxj1WyCeBohgKme9DP2giVZEgc",
        </p>
        <p style="padding:0 20px;box-sizing:border-box;">sig:
          '0x28ff97e1a39b3566726d91dbb8884b9fb5009253bb16dfa63e3d5770baf839041defa8b0710a7d830fde690fdcec89111f5c9dda6c4fcd4f53bc333fd7da47141b',</p>
        <p style="padding:0 20px;box-sizing:border-box;">version: '3'</p>
      <p>}</p>`,
      wechat: `${this.$cdn}/wx/640.gif`
    }
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 请求数据案例
    initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      const params = { user: 'sunnie' }
      getUserInfo(params)
        .then(() => {})
        .catch(() => {})
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch() {
      this.$store.dispatch('setUserName', '真乖，赶紧关注公众号，组织都在等你~')
    },
    goGithub(index) {
      window.location.href = 'https://github.com/sunniejs/vue-h5-template'
    }
  }
}
</script>
<style lang="scss">
.about-container {
  padding: 20px;
  word-break: break-all;
  box-sizing: border-box;
  word-wrap: break-word;
  font-size: 24px;
  line-height: 40px;
}
</style>
