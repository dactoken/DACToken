<template>
  <div class="home receive-airdrop">
    <Language />
    <!-- data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000" -->
    <div class="box">
      <div class="airdrop-item">
        <div class="title">{{ $t('msg.receive') }} WDAC</div>
        <div class="content">
          <div class="top">
            <div class="info">
              <div class="info-item">
                <div>
                  <!-- 待解锁 -->
                  <span>{{ $t('msg.toBeUnlocked') }}：</span>
                  <span class="gold">{{ frozenConfig.frozen }} WDAC</span>
                </div>
              </div>
              <div class="info-item">
                <div>
                  <!-- 已解锁 -->
                  <span>{{ $t('msg.unlocked') }}：</span>
                  <span class="gold">{{ 100 - (frozenConfig.frozen || 100) }} WDAC</span>
                </div>
              </div>
              <div class="info-item">
                <div>
                  <!-- 待领取 -->
                  <span>{{ $t('msg.pending') }}：</span>
                  <span class="gold">{{ frozenConfig.can2baOf }} WDAC</span>
                </div>
                <!-- 领取 -->
                <div class="btn-item" @click="froToba">{{ $t('msg.receive') }}</div>
              </div>
            </div>
          </div>
          <div class="des">
            <p>1.{{ $t('msg.airdropDesOne') }}</p>
            <p>2.{{ $t('msg.airdropDesTwo') }}</p>
            <p>3.{{ $t('msg.airdropDesThree') }}</p>
          </div>
        </div>
      </div>
      <div class="airdrop-item">
        <div class="title">WDAC {{ $t('msg.mining') }}</div>
        <div class="content">
          <div class="top">
            <div class="info">
              <div class="info-item">
                <div>
                  <!-- 质押数量 -->
                  <span>{{ $t('msg.pledgeAmount') }}：</span>
                  <span class="gold">{{ frozenConfig.pledgeAmount }} WDAC</span>
                </div>
                <!-- 质押 -->
                <div class="btn-item" @click="handlePledge">{{ $t('msg.pledge') }}</div>
              </div>
              <div class="info-item">
                <div>
                  <!-- 挖矿产出 -->
                  <span>{{ $t('msg.miningOutput') }}：</span>
                  <span class="gold">{{ frozenConfig.output }} DAC</span>
                </div>
              </div>
            </div>
          </div>
          <div class="des">
            <p>
              {{ $t('msg.airdropDesFour') }}
            </p>
          </div>
          <div class="top" style="flex-wrap: wrap;">
            <div class="info list" v-for="(item, index) in frozenConfig.incomeList" :key="index">
              <div class="info-item">
                <div>
                  <span>{{ $t('msg.pledgeTime') }}：</span>
                  <span class="gold">{{ frozenConfig.time }} WDAC</span>
                </div>
              </div>
              <div class="info-item">
                <div>
                  <span>{{ $t('msg.pledgeAmount') }}：</span>
                  <span class="gold">{{ frozenConfig.amount }} DAC</span>
                </div>
              </div>
              <div class="info-item">
                <div>
                  <!-- 待领收益 -->
                  <span>{{ $t('msg.income') }}：</span>
                  <span class="gold">{{ frozenConfig.value }} DAC</span>
                </div>
                <!-- 领取 -->
                <div class="btn-item" @click="receive(item)">{{ $t('msg.receive') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pledge-dialog" v-if="showPledge">
      <div class="header">
        <span>{{ $t('msg.enterThePledgeAmount') }}</span>
        <img src="../../assets/close1.png" @click="showPledge = false" alt="" />
      </div>
      <input type="number" v-model="amount" />
      <div class="balance">{{ $t('msg.balance1') }}：{{ frozenConfig.balance }}</div>
      <div class="confirm" @click="confirmPledge">{{ $t('msg.confirmPledge') }}</div>
    </div>
  </div>
</template>

<script>
import VueAos from 'vue-aos'
import NCWeb3 from '../web3'
import Language from './Language'
import wdagAbi from '../../api/wdagAbi'
import config from '../../config'
import day from 'dayjs'
const { wdag_contract_address } = config
export default {
  components: { VueAos, Language },
  data() {
    return {
      showPledge: false,
      wdagContract: null,
      frozenConfig: {
        incomeList: []
      },
      address: '',
      amount: ''
    }
  },
  methods: {
    /**
     * 待领取金额领取
     */
    async froToba() {
      if (!this.frozenConfig.can2baOf) return
      try {
        this.showLoading()
        await this.wdagContract.methods.fro2ba().send({
          from: this.address
        })
        this.loading.close()
        await this.getFrozen()
      } catch (error) {
        this.loading.close()
      }
    },
    /**
     * 点击质押
     */
    async handlePledge() {
      this.amount = ''
      this.showPledge = true
    },
    /**
     * 确认质押
     */
    async confirmPledge() {
      try {
        if (this.frozenConfig.balance < this.amount) return
        let amount = this.amount * Math.pow(10, 18)
        if (!amount) return
        this.showLoading()
        await this.wdagContract.methods.toPledge(BigNumber(amount).toString(10)).send({
          from: this.address
        })
        this.loading.close()
        this.showPledge = false
        await this.getFrozen()
        await this.getList()
      } catch (error) {
        this.loading.close()
      }
    },
    /**
     * 领取待领收益
     */
    async receive({ _index, value }) {
      if (!value) return
      if (this.flag) return
      this.flag = true
      try {
        const res = await this.wdagContract.methods.endTargetPledeg(_index).send({
          from: this.address
        })
        this.flag = false
        await this.getList()
      } catch (_) {
        this.flag = false
      }
    },

    showLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    async initWeb3() {
      var Web3 = require('web3')
      var web3Provider
      if (window.ethereum) {
        web3Provider = window.ethereum
      } else if (window.web3) {
        web3Provider = window.web3.currentProvider
      } else {
        web3Provider = new Web3.providers.HttpProvider('http://localhost:9020')
      }
      const web3 = new Web3(web3Provider)
      const wdagContract = new web3.eth.Contract(wdagAbi, wdag_contract_address)
      const [accountAddress] = await web3.eth.getAccounts()

      this.address = accountAddress
      this.wdagContract = wdagContract
    },
    /**
     * 获取挖矿数据
     */
    async getList() {
      let list = await this.wdagContract.methods.getPledgeInfo(this.address).call()
      list = list.filter(item => item[1] !== '1')
      // [质押开始时间，质押数量，质押结束时间，质押时间]
      //当前时间戳 数组对象 下标为2的时间戳进行对比 取小值
      // 再跟下标为3进行对比 如果相同 那就是领取过了，否则用第一步取到的值减下标3的值，
      // 再 除以30天的秒数 * 每条数据的质押数量
      const currentTime = ~~(new Date() / 1000)
      let output = 0
      let incomeList = []
      let pledgeAmount = 0
      list.forEach(item => {
        const [start, number, time, time1, _index] = item
        const amount = number / Math.pow(10, 18)
        let a = currentTime < time ? currentTime : time
        if (a === time1) {
        } else {
          incomeList.push({
            amount,
            value: Math.floor((a - time1) / 2592000) * amount,
            time: day(start * 1000).format('YYYY/MM/DD'),
            _index
          })
          // income += Math.floor((a - time1) / 2592000) * amount
        }
        pledgeAmount += amount
        output += Math.floor((time1 - start) / 2592000) * amount
      })
      this.frozenConfig = {
        ...this.frozenConfig,
        output,
        incomeList,
        pledgeAmount
      }
    },
    /**
     * 获取挖矿数据
     */
    async getFrozen() {
      const frozen = await this.wdagContract.methods.frozenOf(this.address).call()
      const balance = await this.wdagContract.methods.balanceOf(this.address).call()
      const can2baOf = await this.wdagContract.methods.can2baOf(this.address).call()
      this.frozenConfig = {
        ...this.frozenConfig,
        frozen: frozen / Math.pow(10, 18), //待解锁
        balance: balance / Math.pow(10, 18), //可质押余额
        can2baOf: can2baOf / Math.pow(10, 18)
      }
    }
  },
  async mounted() {
    AOS.init()
    NCWeb3.Init(() => {})
    await this.initWeb3()
    await this.getFrozen()
    await this.getList()
  }
}
</script>
<style lang="scss" scope>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
.receive-airdrop {
  position: relative;
  .pledge-dialog {
    width: 518px;
    height: 279px;
    background: #000000;
    border-radius: 10px;
    opacity: 0.9;
    position: absolute;
    padding: 29px 28px 40px 28px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .header {
      position: relative;
      text-align: center;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
      img {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 0;
      }
    }
    input {
      width: 506px;
      height: 80px;
      background: #2a2a2a;
      border-radius: 6px;
      border: 1px solid #80879b;
      margin: 38px 0 10px 0;
      color: #fff;
      padding-left: 10px;
    }
    .balance {
      font-size: 16px;
      color: #fff;
      margin-bottom: 20px;
    }
    .confirm {
      width: 518px;
      height: 80px;
      background: #eecd96;
      border-radius: 6px;
      text-align: center;
      line-height: 80px;
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      cursor: pointer;
    }
  }
  .box {
    padding-top: 144px;
  }
}
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
    overflow-y: auto;
    height: 100%;
    .airdrop-item {
      width: 694px;
      margin: 0 auto;
      overflow: hidden;
      &:last-child {
        margin-bottom: 64px;
      }
      &:first-child {
        // margin-top: 100px;
      }
      .title {
        font-size: 50px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #eecd96;
        margin: 54px auto 34px auto;
      }
      .content {
        background: #2a2a2a;
        border-radius: 15px;
        padding: 28px;
        .top {
          display: flex;
          justify-content: space-between;
          .info {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-flow: column;
            margin-bottom: 54px;
            .info-item {
              font-size: 20px;
              font-family: PingFangSC-Semibold, PingFang SC;
              text-align: left;
              margin-bottom: 55px;
              display: flex;
              justify-content: space-between;
              align-content: center;
              line-height: 52px;
              &:last-child {
                margin-bottom: 0;
              }
              // font-weight: 600;
              color: #ffffff;
              span {
              }
              .gold {
                color: #eecd96;
              }
              .btn-item {
                width: 162px;
                height: 52px;
                border-radius: 8px;
                border: 2px solid #eecd96;
                font-size: 20px;
                font-family: PingFangSC-Semibold, PingFang SC;
                color: #eecd96;
                text-align: center;
                line-height: 52px;
                cursor: pointer;
              }
            }
          }
          .list {
            border-top: 1px solid #1c1c1c;
            padding: 40px 0;
            padding-bottom: 0;
          }
        }

        .des {
          width: 100%;
          text-align: left;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          color: #ffffff;

          p {
            margin-bottom: 40px;
          }
        }
      }
    }
  }
}
</style>
