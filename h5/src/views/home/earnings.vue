<template>
  <div class="home">
    <Language />
    <!-- <p class="img_box">
      <img @click="changeLanguage('en')" class="" src="../../assets/en.png" alt="" />
      <img @click="changeLanguage('e')" class="zn" src="../../assets/e.png" alt="" />
      <img @click="changeLanguage('jp')" class="jp" src="../../assets/jp.png" alt="" />
      <img @click="changeLanguage('kn')" class="kn" src="../../assets/han.png" alt="" />
      <img @click="changeLanguage('zh')" class="e" src="../../assets/ch.png" alt="" />
      <img @click="changeLanguage('zh')" class="e" src="../../assets/ch.png" alt="" />
      <img class="menu" v-show="!menuShow" @click="menuShow = true" src="../../assets/menu.png" alt="" />
      <img class="menu" v-show="menuShow" @click="menuShow = false" src="../../assets/clone.png" alt="" />
    </p>
    <div class="menuUl-box" v-show="menuShow">
      <ul class="menuUl">
        <li @click="exchange">
          Exchange
          <img src="../../assets/rjt.png" alt="" />
        </li>
        <li @click="github">
          <img class="git" src="../../assets/git.png" alt="" />
          Github
          <img src="../../assets/rjt.png" alt="" />
        </li>
        <li @click="hysj()">{{ $t('msg.hysj') }}<img src="../../assets/rjt.png" alt="" /></li>
      </ul>
    </div> -->
    <div class="box44">
      <h4 data-aos="fade-up">{{ $t('msg.DynamicIncome') }}</h4>
      <div class="statistical" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
        <p>{{ $t('msg.MyLevel') }}：V{{ userInfo.level || 0 }}</p>
        <div class="list-ul">
          <ul>
            <li>
              <p>{{ $t('msg.RegionalPerformance') }}</p>
              <span>{{ Number(userInfo.bigreward).toFixed(2) }} USDT </span>
            </li>
            <!-- <li>
              <p>{{ $t('msg.CommunityPerformance') }}</p>
              <span>{{ Number(userInfo.smallreward).toFixed(2) }} USDT</span>
            </li> -->
            <li>
              <p>{{ $t('msg.LevelAward') }}</p>
              <span>{{ Number(userInfo.levelreward).toFixed(2) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.DailyRankingsAward') }}</p>
              <span>{{ Number(userInfo.dailyreward).toFixed(2) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.LuckyReward') }}</p>
              <span>{{ Number(userInfo.futurereward).toFixed(2) }} USDT</span>
            </li>
          </ul>
          <ul>
            <!-- <li>
              <p>{{ $t('msg.DividendAward') }}</p>
              <span>{{ Number(userInfo.globalreward).toFixed(2) }} USDT</span>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="box44 statistics-con">
      <h4 data-aos="fade-up" style="margin-top:20px">{{ $t('msg.PerformanceStatistics') }}</h4>
      <div class="statistical" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
        <div class="list-ul">
          <ul>
            <li>
              <p>{{ $t('msg.TotalPerformance') }}</p>
              <span>{{ Number(userInfo.yeji).toFixed(2) }} USDT </span>
            </li>
            <li>
              <p>{{ $t('msg.DirectRecommendationTotalPerformance') }}</p>
              <span>{{ Number(userInfo.childtotalusdt).toFixed(2) }} USDT</span>
            </li>
            <!-- <li>
              <p>{{ $t('msg.RegionalTotalPerformance') }}</p>
              <span>{{ Number(achievementData.big).toFixed(2) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.TotalPerformanceInSmallArea') }}</p>
              <span>{{ Number(achievementData.small).toFixed(2) }} USDT</span>
            </li> -->
          </ul>
          <ul>
            <li>
              <p>{{ $t('msg.V1Level') }}</p>
              <span>{{ levelNumData.v1num }}</span>
            </li>

            <li>
              <p>{{ $t('msg.V2Level') }}</p>
              <span>{{ levelNumData.v2num }}</span>
            </li>
            <li>
              <p>{{ $t('msg.V3Level') }}</p>
              <span>{{ levelNumData.v3num }}</span>
            </li>
            <li>
              <p>{{ $t('msg.V4Level') }}</p>
              <span>{{ levelNumData.v4num }}</span>
            </li>
            <li>
              <p>{{ $t('msg.V5Level') }}</p>
              <span>{{ levelNumData.v5num }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import VueAos from 'vue-aos'
import NCWeb3 from '../web3'
import Contractabi from '../../api/contractabi'
import SubscriptionAbi from '../../api/subscriptionAbi'
import { getUserInfo, getAchievement, getLevelNum } from '@/api/user.js'
import Language from './Language'
var Web3 = require('web3')
var web3Provider
if (window.ethereum) {
  web3Provider = window.ethereum
} else if (window.web3) {
  web3Provider = window.web3.currentProvider
} else {
  web3Provider = new Web3.providers.HttpProvider('http://localhost:9020')
}
export default {
  components: { VueAos, Language },
  data() {
    return {
      menuShow: false,
      balance: 0,
      isBuy: true,
      dialogVisible: false,
      value: '',
      currentIndex: 0,
      addres: '',
      usdt: '0.0000',
      ObtainedToken: '0.0000',
      usdtValue: '',
      activeNames: ['1'],
      language: 1,
      CurrentStage: 0,
      remaining: 0,
      lang: [
        {
          label: this.$t('msg.zh'), // 模板语法的一种
          value: 0
        },
        {
          label: this.$t('msg.en'),
          value: 1
        },
        {
          label: this.$t('msg.jp'),
          value: 2
        },
        {
          label: this.$t('msg.kn'),
          value: 3
        }
      ],
      userInfo: {},
      achievementData: {},
      levelNumData: {}
    }
  },
  watch: {
    value: {
      handler(val) {
        this.ObtainedToken = this.CurrentStage * val
      }
    },

    // 侦听器
    language(val) {
      // 侦听单选按钮的变化，从而进行切换语言
      val === 0 ? (this.$i18n.locale = 'zh') : (this.$i18n.locale = 'en')
      this.lang = [
        {
          label: this.$t('msg.zh'), // 如果不使用Vue.set，也可以使用更新数据的方法
          value: 0
        },
        {
          label: this.$t('msg.en'),
          value: 1
        },
        {
          label: this.$t('msg.jp'),
          value: 2
        },
        {
          label: this.$t('msg.kn'),
          value: 3
        }
      ]
    }
  },
  async created() {
    // 账号

    await this.getUserInfo()
    await this.getAchievement()
    await this.getLevelNum()
  },

  mounted() {
    AOS.init()
    NCWeb3.Init(addr => {
      // 得到相应的钱包地址
      this.addres = addr
      localStorage.setItem('addres', addr)
    })
  },
  methods: {
    getUserInfo() {
      if (localStorage.getItem('addres') === 'undefined' || localStorage.getItem('addres') === undefined) {
        return
      } else {
        const params = { address: localStorage.getItem('addres') }
        getUserInfo(params)
          .then(res => {
            if (res.code === 200) {
              this.userInfo = res.result
              console.log(this.userInfo)
            } else if (res.code === 317) {
              this.newPlay()
            }
          })
          .catch(res => {
            // console.log(res)
          })
      }
    },
    async getAchievement() {
      let address = localStorage.getItem('addres')
      if (!address) return
      let { code, result } = await getAchievement({ address })
      if (code === 200) {
        this.achievementData = result
      }
    },
    async getLevelNum() {
      let address = localStorage.getItem('addres')
      if (!address) return
      let { code, result } = await getLevelNum({ address })
      if (code === 200) {
        this.levelNumData = result
      }
    },
    github() {
      window.open('https://github.com/shamingdouyiyang/vane/tree/main/abi')
    },
    exchange() {
      window.open('https://pancakeswap.finance/')
    },
    hysj() {
      window.open('https://all-app.oss-cn-shenzhen.aliyuncs.com/app/vaneapp/vane.pdf')
    },
    changeLanguage(type) {
      console.log(type)
      // 将用户设置存储到localStorage以便用户下次打开时使用此设置
      localStorage.setItem('Language', type)
      this.$i18n.locale = type
    }
  }
}
</script>
<style lang="scss" scope>
.home {
  font-size: 30px;
  height: 100%;
  > .img_box {
    position: fixed;
    padding: 50px 0px;
    box-sizing: border-box;
    z-index: 10000;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    background: #18161f;
    img {
      width: 48px;
      height: 48px;
      margin-left: 20px;
      cursor: pointer;
    }
    .menu {
      float: right;
      margin-right: 20px;
    }
  }
  .zn {
    right: 108px;
  }
  h4 {
    color: #eecd96;
    font-size: 50px;
    font-weight: 700;
    margin: 80px 0 40px;
  }
  .title {
    font-weight: 700;
    color: #eecd96;
    margin-bottom: 40px;
    font-size: 36px;
  }
  .menuUl-box {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    top: 150px;
    position: fixed;
    z-index: 2;
  }
  .menuUl {
    width: 100%;
    background: #232323;
    color: #fff;
    li {
      font-size: 26px;
      line-height: 100px;
      padding: 0 28px;
      box-sizing: border-box;
      border-bottom: 1px solid #5c5892;
      img {
        width: 20px;
        height: 32px;
        float: right;
        margin-top: 34px;
      }
      .git {
        margin-top: 34px;
        float: left;
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
    }
  }
  .box44 {
    width: 100%;
    background-image: url('../../assets/4.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
    padding: 100px 40px;
    padding-bottom: 0px;
    height: 80%;
    box-sizing: border-box;
    .rule {
      padding: 34px 28px 42px;
      box-sizing: border-box;
      width: 100%;
      background: #232323;
      border-radius: 15px;
      margin: auto;
      ul {
        font-size: 24px;
        li {
          text-align: left;
          margin-bottom: 28px;
        }
      }
    }
    .day {
      padding: 40px 28px;
      box-sizing: border-box;
      width: 100%;
      background: #232323;
      margin: auto;

      border-radius: 15px;
      ul {
        overflow: hidden;
        color: #fff;
        font-size: 20px;
        padding-bottom: 40px;
        li {
          width: 33%;
          float: left;
          text-align: center;
          line-height: 50px;
        }
        li:first-child {
        }
        li:first-child {
          text-align: left;
        }
        li:last-child {
          text-align: right;
        }
      }

      .btn {
        width: 614px;
        margin: auto;
        line-height: 80px;
        font-size: 30px;
        font-weight: 700;
        color: #ffffff;
        margin-top: 60px;
        border-radius: 40px;
        border: 2px solid #5c5b5e;
        cursor: pointer;
        transition: all 0.5s;
      }
      .btn:hover {
        transform: scale(1.2);
      }
    }
    .statistical {
      width: 100%;
      overflow: hidden;
      background: #232323;
      border-radius: 15px;
      margin: auto;
      padding: 0 28px;
      box-sizing: border-box;
      p:first-child {
        margin: 40px 0;
        font-weight: 700;
      }
      .earnings {
        width: 100%;
        background: #2f2c4c;
        border-radius: 8px;
        margin: auto;
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 20px;
        .left,
        .right {
          box-sizing: border-box;
          padding: 40px 28px;
          p {
            color: #ffffff;
            font-size: 20px;
            text-align: left;
            margin: 0;
            span {
              width: 90px;
              line-height: 34px;
              background: #604ae2;
              border-radius: 4px;
              display: inline-block;
              float: right;
              text-align: center;
              font-size: 20px;
              cursor: pointer;
              transition: all 0.5s;
            }
            span:hover {
              transform: scale(1.2);
            }
          }
          p:first-child {
            font-weight: 600;
            color: #eecd96;
            font-size: 24px;
            margin-bottom: 26px;
          }
          p:nth-child(2) {
            margin-bottom: 16px;
          }
        }
        .right {
          padding-top: 10px;
        }
      }
      .list-ul {
        overflow: hidden;
        width: 100%;
        margin: auto;
        padding: 0px;
        box-sizing: border-box;
        padding-bottom: 40px;
        ul {
          width: 100%;
          li {
            text-align: center;
            p {
              font-size: 24px;
              color: #ffffff;
              padding: 44px 0 18px 0;
              margin: 0;
            }
            span {
              color: #eecd96;
              font-size: 32px;
            }
          }
        }
      }
      .btn {
        width: 613px;
        margin: 42px auto 40px;
        line-height: 80px;
        font-size: 30px;
        font-weight: 700;
        color: #ffffff;
        border-radius: 40px;
        border: 2px solid #5c5b5e;
        cursor: pointer;
        transition: all 0.5s;
      }
      .btn:hover {
        transform: scale(1.2);
      }
    }
  }
  .statistics-con {
    padding: 0.1rem 0.53333rem 0.5rem 0.53333rem !important;
    height: auto !important;
  }
}
</style>
