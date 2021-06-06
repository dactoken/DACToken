<template>
  <div class="home">
    <Language />
    <div class="box">
      <h4>{{ $t('msg.YesterdayRankingAward') }}</h4>
      <div class="day" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
        <ul>
          <li>{{ $t('msg.Rank') }}</li>
          <li>{{ $t('msg.YesterdayAward') }}</li>
          <li>ID</li>
        </ul>
        <ul v-for="(item, index) in list" :key="index">
          <li>{{ index + 1 }}</li>
          <li>{{ (+item.amount).toFixed(2) }}</li>
          <li>{{ item.uid }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import VueAos from 'vue-aos'
import NCWeb3 from '../web3'
import Language from './Language'
import { getBreakDailyList } from '@/api/user.js'
export default {
  components: { VueAos, Language },
  data() {
    return {
      list: []
    }
  },

  mounted() {
    AOS.init()
    NCWeb3.Init(addr => {
      // 得到相应的钱包地址
      localStorage.setItem('addres', addr)
    })
  },
  created() {
    this.getBreakDailyList()
  },
  methods: {
    async getBreakDailyList() {
      const { result } = await getBreakDailyList()
      this.list = result
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
    top: 420px;
    z-index: 10000;
    cursor: pointer;
  }
  .zn {
    top: 494px;
  }
  .jp {
    top: 568px;
  }
  .kn {
    top: 642px;
  }
  .e {
    top: 716px;
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

  .box {
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
        background: #2f2c4c;
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
            width: 33%;
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
