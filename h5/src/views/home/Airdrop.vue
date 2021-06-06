<template>
  <div>
    <div class="airdrop" v-if="showAir">
      <div class="get-airdrop">
        <img src="../../assets/airdrop.png" class="airdrop-pic" alt="" />
        <div class="airdrop-btn" @click="showLottery = true">{{ $t('msg.receiveAirdrop') }}</div>
      </div>
      <img class="close" @click="hiddenAir" src="../../assets/close1.png" alt="" />
    </div>
    <div class="lottery" v-if="showLottery">
      <div class="content">
        <div class="card">
          <template v-for="item in 4">
            <div class=" is-lottery " :key="item" v-if="item === active">
              <div class="des">{{ $t('msg.congratulations') }}<br />{{ $t('msg.Earn') }}</div>
              <div class="price">{{ amount }}</div>
            </div>
            <div class="card-item" v-else :key="item">
              <div class="no-lottery">
                <div class="price"></div>
                <div class="get-lottery" @click="getMt(item)">{{ $t('msg.flipMe') }}!</div>
              </div>
            </div>
          </template>
        </div>
        <div class="tip">{{ count ? $t('msg.opportunity1') : $t('msg.opportunity2') }}</div>
      </div>
      <img class="lottery-close" @click="showLottery = false" src="../../assets/close1.png" alt="" />
    </div>
  </div>
</template>

<script>
import vaneAbi from '../../api/vaneAbi'
import liCaiAbi from '../../api/liCaiAbi'
import config from '../../config'
const { token_contract_address, licai_contract_address } = config
export default {
  data() {
    return {
      showAir: true,
      count: 0,
      showLottery: false,
      vaneContract: null,
      active: '',
      amount: ''
    }
  },
  props: {
    address: String
  },
  methods: {
    async getMt(item) {
      if (this.flag || !this.count) return
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.flag = true
      try {
        await this.vaneContract.methods.giveMt().send({ from: this.address })

        this.flag = false
        await this.getMtLogInfo()
        this.active = item
        loading.close()
      } catch (error) {
        console.log(error)
        loading.close()
        this.flag = false
      }
    },
    async show() {
      this.showLottery = true
      await this.getMtLogInfo()
    },
    hiddenAir() {
      this.showAir = false
    },
    initWeb3() {
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
      this.vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)
      this.licaiContract = new web3.eth.Contract(liCaiAbi, licai_contract_address)
    },
    async getMtLogInfo() {
      const res = await this.vaneContract.methods.getMtLogInfo().call({ from: this.address })
      const usdtCount = await this.licaiContract.methods.getUserTotalUsdt(this.address).call()
      const { d, amount } = res
      this.amount = (amount / Math.pow(10, 18)).toFixed(2)
      if (!+usdtCount) {
        this.count = 0
        return
      }
      if (d < parseInt(new Date() / 1000 / (24 * 3600))) {
        this.count = 1
      } else {
        this.count = 0
      }
    }
  },
  async created() {
    await this.initWeb3()
  },
  watch: {
    address(newV) {
      this.getMtLogInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
.airdrop {
  position: fixed;
  right: 96px;
  top: 50%;
  z-index: 999;
  display: flex;
  flex-flow: column;
  align-items: center;
  .get-airdrop {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 28px;
    .airdrop-pic {
      width: 104px;
      height: 92px;
      margin-bottom: 14px;
    }
    .airdrop-btn {
      width: 155px;
      height: 53px;
      background: linear-gradient(94deg, #fbe27d 0%, #f8ae16 100%);
      border-radius: 33px;
      text-align: center;
      line-height: 53px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1d1d1d;
      cursor: pointer;
    }
  }
  .close {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}
.lottery {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url('../../assets/lottery-bg.png');
  background-size: 100% 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  .lottery-close {
    width: 30px;
    height: 30px;
    cursor: pointer;
    top: 50px;
    right: 50px;
    position: fixed;
  }
  .content {
    display: flex;
    flex-flow: column;
    // width: 1264px;
    // height: 566px;
    margin: 0 auto;
    align-items: center;
    .card {
      // width: 1264px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-bottom: 80px;
      .card-item {
        width: 271px;
        height: 399px;
        background: url('../../assets/card-item.png');
        background-size: 100% 100%;
        margin-bottom: 55px;
        .no-lottery {
          text-align: center;
          width: 132px;
          margin: 0 auto;
          margin-top: 217px;
          .price {
            // font-size: 26px;
            height: 65px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #fee7a4;
            // margin-bottom: 39px;
          }
          .get-lottery {
            width: 132px;
            height: 45px;
            background: linear-gradient(90deg, #ffeeaa 0%, #f9ca8c 100%);
            border-radius: 24px;
            font-size: 22px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #eb372e;
            line-height: 45px;
            cursor: pointer;
          }
        }
      }
      .is-lottery {
        width: 271px;
        height: 399px;
        background: url('../../assets/card-item1.png') !important;
        background-size: 100% 100% !important;
        text-align: center;
        .des {
          color: #fff;
          margin: 77px 0 47px 0;
          font-size: 24px;
        }
        .price {
          font-size: 56px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #fee7a4;
        }
      }
    }
    .tip {
      // width: 331px;
      padding: 0 10px;
      height: 86px;
      border-radius: 15px;
      border: 2px solid #fee7a4;
      font-size: 26px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 86px;
      text-align: center;
    }
  }
}
</style>
