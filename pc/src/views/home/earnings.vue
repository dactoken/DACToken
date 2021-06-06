<template>
  <div class="home">
    <Language />
    <div class="box_">
      <h4 data-aos="fade-up">{{ $t('msg.DynamicIncome') }}</h4>
      <div class="statistical" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
        <div class="list-ul">
          <ul class="ul">
            <!-- <li>
                            <p>{{ $t('msg.DirectNode') }}</p>
                            <span>{{ Number(userInfo.childtotalusdt).toFixed(2) }} USDT</span>
                        </li> -->
            <li>
              <p>{{ $t('msg.RegionalPerformance') }}</p>
              <span>{{ Number(userInfo.smallreward).toFixed(2) }} USDT </span>
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

      <h4 data-aos="fade-up">{{ $t('msg.PerformanceStatistics') }}</h4>
      <div class="statistical" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
        <div class="list-ul statistics">
          <ul class="ul">
            <li>
              <p>{{ $t('msg.TotalPerformance') }}</p>
              <span>{{ Number(userInfo.yeji).toFixed(2) }} USDT</span>
            </li>

            <li>
              <p>{{ $t('msg.DirectRecommendationTotalPerformance') }}</p>
              <span>{{ Number(userInfo.childtotalusdt).toFixed(2) }} USDT </span>
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
          <ul class="level">
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
import web3 from '../web3'
import { getUserInfo, getAchievement, getLevelNum } from '@/api/user.js'
import Language from './Language'
import liCaiAbi from '../../api/liCaiAbi'
export default {
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
  components: { VueAos, Language },
  data() {
    return {
      userInfo: {},
      achievementData: {},
      levelNumData: {}
    }
  },
  async created() {
    await this.getUserInfo()
    await this.getAchievement()
    await this.getLevelNum()
  },

  mounted() {
    AOS.init()
    NCWeb3.Init(addr => {
      // 得到相应的钱包地址
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
    handleChange(val) {
      console.log(val)
    },
    changeUsdt(index) {
      this.currentIndex = index
      this.usdt = this.usdts[index]
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

  > img {
    position: fixed;
    right: 40px;
    top: 220px;
    z-index: 10000;
    cursor: pointer;
  }
  .zn {
    top: 294px;
  }
  .jp {
    top: 368px;
  }
  .kn {
    top: 442px;
  }
  .e {
    top: 516px;
  }
  h4 {
    color: #eecd96;
    font-size: 50px;
    font-weight: 700;
    margin: 72px 0 34px;
  }
  .title {
    font-weight: 700;
    color: #eecd96;
    margin-bottom: 56px;
  }
  .box_ {
    width: 100%;
    background-image: url('../../assets/4.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
    height: 100%;
    .rule {
      padding: 34px 80px 42px;
      box-sizing: border-box;
      width: 1200px;
      background: #232323;
      border-radius: 15px;
      margin: auto;
      ul {
        font-size: 16px;
        li {
          text-align: left;
          margin-bottom: 28px;
        }
      }
    }
    .day {
      padding: 40px 80px;
      box-sizing: border-box;
      width: 1200px;
      background: #232323;
      margin: auto;

      border-radius: 15px;
      ul {
        overflow: hidden;
        color: #fff;
        font-size: 20px;
        li {
          width: 33%;
          float: left;
          text-align: left;
          line-height: 50px;
        }
      }
      ul:first-child {
        color: #717173;
        font-size: 16px;
      }
      .btn {
        width: 650px;
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
      width: 1200px;
      overflow: hidden;
      background: #232323;
      border-radius: 15px;
      margin: auto;
      p:first-child {
        margin: 40px 0;
        font-weight: 700;
      }
      .earnings {
        width: 1040px;
        background: #2a2a2a;
        border-radius: 8px;
        margin: auto;
        overflow: hidden;
        .left,
        .right {
          width: 50%;
          float: left;
          box-sizing: border-box;
          padding: 25px 28px 28px;
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
              margin-left: 58px;
              text-align: center;
              font-size: 16px;
              font-weight: 700;
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
      }
      .list-ul {
        overflow: hidden;
        width: 1200px;
        margin: auto;
        padding: 22px 80px;
        box-sizing: border-box;
        ul {
          width: 100%;
          li {
            width: 25%;
            float: left;
            text-align: left;
            p {
              font-size: 16px;
              font-weight: 700;
              color: #ffffff;
              margin: 28px 0 16px 0;
            }
            span {
              color: #eecd96;
              font-size: 20px;
            }
          }
        }
        .ul {
          background: #2a2a2a;
          padding: 0 28px;
          box-sizing: border-box;
          width: 1040px;
          overflow: hidden;
          border-radius: 8px;
          height: 116px;
        }
      }
      .statistics {
        .ul {
          height: 130px;
          p {
            height: 36px;
          }
        }
        li {
          width: 25% !important;
        }
        .level {
          li {
            width: 20% !important;
          }
        }
      }
      .btn {
        width: 650px;
        margin: 22px auto 40px;
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
}
</style>
