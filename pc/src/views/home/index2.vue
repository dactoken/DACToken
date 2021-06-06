<template>
  <div class="home">
    <img @click="changeLanguage('en')" class="zn" src="../../assets/en.png" alt="" />
    <!-- <img @click="changeLanguage('zh')" src="../../assets/ch.png" alt="" /> -->
    <img @click="changeLanguage('jp')" class="jp" src="../../assets/jp.png" alt="" />
    <img @click="changeLanguage('kn')" class="kn" src="../../assets/han.png" alt="" />
    <img @click="changeLanguage('e')" class="e" src="../../assets/e.png" alt="" />
    <div class="box1">
      <!-- <p>{{ $t('first.title') }}</p> -->
      <div data-aos="fade-up" data-aos-duration="3000">
        <img src="../../assets/lh.png" alt="" />
        <p>{{ $t('msg.one') }}</p>

        <p>{{ $t('msg.meet') }}</p>
        <p>
          {{ $t('msg.meetExplain') }}
        </p>
      </div>
    </div>
    <div class="box2">
      <div class="count" data-aos="zoom-in-up" data-aos-duration="3000">
        <p>{{ $t('msg.countdown') }}</p>
        <DownTime :endTime="endTime" :startTime="new Date().getTime()" :endMsg="endMsg"> </DownTime>

        <div class="btn">2000 USDT</div>
      </div>
      <div class="traffic" data-aos="zoom-in-down" data-aos-duration="3000">
        <p class="title">{{ $t('msg.getToken') }}</p>
        <ul>
          <li>
            <span>{{ $t('msg.currentStage') }}：</span>
            <b>{{ $t('msg.currentStage2') }}1USDT={{ CurrentStage }} VAC </b>
          </li>
          <li>
            <span>{{ $t('msg.Remaining') }}：</span>
            <b>{{ remaining }} VAC</b>
          </li>
        </ul>
        <div>
          <input type="number" min="0" v-model="value" />
          <span>USDT</span>
        </div>
        <ul>
          <li>
            <span>{{ $t('msg.ObtainedToken') }}：</span>
            <b>{{ ObtainedToken }} VAC</b>
          </li>
          <li>
            <span>{{ $t('msg.TokenBalance') }}：</span>
            <b>{{ balance }} VAC</b>
          </li>
          <li>
            <span>{{ $t('msg.AccountBalance') }}：</span>
            <b>{{ usdt }}USDT</b>
          </li>
        </ul>
        <div class="btn" @click="buy">{{ $t('msg.buy') }}</div>
      </div>
      <h4 data-aos="fade-up" data-aos-duration="3000">{{ $t('msg.participate') }}</h4>
      <p data-aos="fade-up">
        {{ $t('msg.participateExplain1') }}
        <br />
        {{ $t('msg.participateExplain2') }}
        <br />{{ $t('msg.participateExplain3') }}
      </p>
    </div>

    <div class="box3">
      <div class="traffic" data-aos="fade-left" data-aos-duration="3000">
        <p class="title">{{ $t('msg.game') }}</p>
        <ul class="ul1">
          <li
            @click="changeUsdt(item, index)"
            v-for="(item, index) in usdts"
            :key="index"
            :class="index === currentIndex ? 'current' : ''"
          >
            {{ item }}
          </li>
        </ul>
        <div>
          <input type="text" v-model="usdtValue" />
          <span>USDT</span>
        </div>
        <ul class="ul2">
          <li>
            <span>{{ $t('msg.account_balance') }}：</span>
            <b>{{ usdt }} USDT</b>
          </li>
        </ul>
        <div class="btn">{{ $t('msg.buy') }}</div>
      </div>

      <!-- Link 链接 -->
      <div class="link" data-aos="fade-right" data-aos-duration="3000">
        <p class="title">{{ $t('msg.link') }}</p>
        <ul>
          <li>
            <p>{{ $t('msg.myReferral') }}：</p>
            <span>52720</span>
          </li>
          <li>
            <p>{{ $t('msg.myDirectReferrals') }}：</p>
            <span>0</span>
          </li>
          <li>
            <p>{{ $t('msg.myID') }}：</p>
            <span>0</span>
          </li>
        </ul>
        <ul>
          <li>
            <p>{{ $t('msg.myInvitationLink') }}：</p>
            <span>http://www.vaneapp.com</span>
          </li>
          <li>
            <p>{{ $t('msg.myAddress') }}：</p>
            <span>{{ addres }}</span>
          </li>
          <li></li>
        </ul>
        <div class="btn copy_btn" data-clipboard-text="http://www.vaneapp.com" @click="copy">
          {{ $t('msg.copyInvitationLink') }}
        </div>
      </div>
    </div>
    <div class="box4">
      <div class="rule" data-aos="fade-left" data-aos-duration="3000">
        <p class="title">{{ $t('msg.Rules') }}</p>
        <ul>
          <li>1.）{{ $t('msg.RulesExplain1') }}</li>
          <li>2.）{{ $t('msg.RulesExplain2') }}</li>
          <li>3.）{{ $t('msg.RulesExplain3') }}</li>
        </ul>
      </div>
      <h4>{{ $t('msg.TodayAward') }}</h4>
      <div class="day" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
        <ul>
          <li>{{ $t('msg.Rank') }}</li>
          <li>{{ $t('msg.Performance') }}</li>
          <li>ID</li>
        </ul>
        <ul v-for="(item, index) in list" :key="index">
          <li>{{ index + 1 }}</li>
          <li>{{ item.yj }}</li>
          <li>{{ item.id }}</li>
        </ul>
        <div class="btn" @click="linkAward">{{ $t('msg.ViewYesterdays') }}</div>
      </div>
      <h4 data-aos="fade-up">{{ $t('msg.Statistics') }}</h4>
      <div class="statistical" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
        <p>{{ $t('msg.MyLevel') }}：V0</p>
        <div class="earnings">
          <div class="left">
            <p>{{ $t('msg.UnsettledEarnings') }}</p>
            <p>USDT：0.0000</p>
            <p>
              VAC：0.0000 <span>{{ $t('msg.balance') }}</span>
            </p>
          </div>
          <div class="right">
            <p>{{ $t('msg.CashableIncome') }}</p>
            <p>USDT：0.0000</p>
            <p>VAC：0.0000</p>
          </div>
        </div>
        <div class="list-ul">
          <ul>
            <li>
              <p>{{ $t('msg.StaticIncome') }}</p>
              <span>0.0000 USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.DynamicIncome') }}</p>
              <span>0.0000 USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.SettledIncome') }}</p>
              <span>0.0000 USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.outNeeds') }}</p>
              <span>0.0000 USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.TotalTSokenSales') }}</p>
              <span>0.0000 VAC</span>
            </li>
            <li>
              <p>{{ $t('msg.TotalNumberBurned') }}</p>
              <span>0.0000 VAC</span>
            </li>
            <li>
              <p>{{ $t('msg.EntryFundsToday') }}</p>
              <span>0.0000 USDT</span>
            </li>
          </ul>
        </div>
        <div class="btn" @click="linkEarnings">{{ $t('msg.ViewDetailedData') }}</div>
      </div>
    </div>
    <div class="box5">
      <h4>{{ $t('msg.commonProblem') }}</h4>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="$t('msg.problem1')" :name="0">
          <div>{{ $t('msg.answer1') }}</div>
        </el-collapse-item>
        <el-collapse-item :title="$t('msg.problem2')" :name="1">
          <div>{{ $t('msg.answer2') }}</div>
        </el-collapse-item>
        <el-collapse-item :title="$t('msg.problem3')" :name="2">
          <div>{{ $t('msg.answer3') }}</div>
        </el-collapse-item>
        <el-collapse-item :title="$t('msg.problem4')" :name="3">
          <div>{{ $t('msg.answer4') }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="box6">
      <div>
        <div>
          <img src="../../assets/foot.png" alt="" />
          <ul>
            <li>2021&copy;{{ $t('msg.yhzj') }}</li>
            <li @click="hysj()">{{ $t('msg.hysj') }}</li>
            <li @click="join()">
              <img class="xfj" src="../../assets/xfj.png" alt="" />
              <span>{{ $t('msg.jrwmdb') }}</span>
            </li>
          </ul>
          <ul class="footul">
            <li @click="github"><img src="../../assets/git.png" alt="" /> <span>Github</span></li>
            <li @click="exchange">Exchange</li>
            <li @click="dialogVisible = true">
              {{ $t('msg.logo') }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" width="914px">
      <!-- <img class="clone" src="../../assets/close.png" alt="" @click.stop="dialogVisible-false" /> -->
      <ul>
        <li>
          <img src="../../assets/logo1.png" alt="" />
          <p @click="downloadCodeImg(1)">{{ $t('msg.save') }}</p>
        </li>
        <li>
          <img src="../../assets/logo2.png" alt="" />
          <p @click="downloadCodeImg(2)">{{ $t('msg.save') }}</p>
        </li>
        <li>
          <img src="../../assets/logo3.png" alt="" />
          <p @click="downloadCodeImg(3)">{{ $t('msg.save') }}</p>
        </li>
        <li>
          <img src="../../assets/logo4.png" alt="" />
          <p @click="downloadCodeImg(4)">{{ $t('msg.save') }}</p>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NCWeb3 from '../web3'
import VueAos from 'vue-aos'

import usdtAbi from '../../api/usdtAbi'
import vaneAbi from '../../api/vaneAbi'
import DownTime from './downTime'
import Clipboard from 'clipboard'
// 币安
const USDT_contract_address = '0x3dFD4d451581E3d9ad4D9D34A341D8Dda825Eb65' // USDT(buy)
const token_contract_address = '0xe2c46ebd8F802Ec28a43F94Cee492fD132D5FCA6' // 代币VV

import { BscConnector } from '@binance-chain/bsc-connector'

export default {
  components: { DownTime },
  data() {
    return {
      endTime: new Date().getTime() + 60 * 60 * 60 * 60 * 60 * 3,
      endMsg: '结束了',
      balance: 0,
      isBuy: true,
      dialogVisible: false,
      value: '',
      currentIndex: 0,
      addres: '',
      usdtDecimals: '',
      vaneDecimals: '',
      usdts: ['25%', '50%', '70%', '100%'],
      list: [
        {
          id: 1,
          yj: '34.0000'
        },
        {
          id: 2,
          yj: '36.0000'
        },
        {
          id: 3,
          yj: '333.0000'
        },
        {
          id: 4,
          yj: '333.0000'
        },
        {
          id: 5,
          yj: '333.0000'
        },
        {
          id: 6,
          yj: '333.0000'
        },
        {
          id: 7,
          yj: '333.0000'
        },
        {
          id: 8,
          yj: '333.0000'
        },
        {
          id: 9,
          yj: '333.0000'
        },
        {
          id: 10,
          yj: '333.0000'
        },
        {
          id: 11,
          yj: '333.0000'
        }
      ],
      // eth: '0.0000',
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
        },
        {
          label: this.$t('msg.e'),
          value: 4
        }
      ]
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
        },
        {
          label: this.$t('msg.e'),
          value: 4
        }
      ]
    }
  },

  mounted() {
    AOS.init()
    console.log(window.BinanceChain)
    const bsc = new BscConnector({
      supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
    })
    console.log(bsc)
    var activate = bsc.activate()
    activate.then(res => {
      localStorage.setItem('addres', res.account)
    })
    var getAccount = bsc.getAccount()
    getAccount.then(res => {
      console.log(res)
    })
    var getChainId = bsc.getChainId()
    getChainId.then(res => {
      console.log('getChainId')
      console.log(res)
    })

    console.log(window.BinanceChain)
    this.getToken()
    // this.timer = setInterval(() => {
    //   setTimeout(this.getToken, 0)
    // }, 100 * 60)
  },
  created() {},
  methods: {
    copy() {
      var clipboard = new Clipboard('.copy_btn')
      clipboard.on('success', e => {
        this.$alert('<b class="success">' + this.$t('msg.ReplicationSuccess') + '</b>', {
          showClose: false,
          showConfirmButton: false,
          dangerouslyUseHTMLString: true,
          closeOnClickModal: true
        })
        clipboard.destroy()
      })

      clipboard.on('error', e => {
        alert('该浏览器不支持自动复制')
        clipboard.destroy()
      })
    },
    github() {
      window.open('https://github.com/shamingdouyiyang/vane')
    },
    exchange() {
      window.open('https://app.dodoex.io/')
    },
    hysj() {
      window.open('https://all-app.oss-cn-shenzhen.aliyuncs.com/app/vaneapp/vane.pdf')
    },
    join() {
      window.open('https://t.me/joinchat/aIO7lgSwNIVkYjc1')
    },
    getToken() {
      var Web3 = require('web3')
      // const web3 = new Web3(Web3.givenProvider)
      const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')
      console.log(localStorage.getItem('addres'))
      web3.eth.getBalance(localStorage.getItem('addres'), (error, result) => {
        if (!error) {
          console.log('账户余额::', result)
        }
      })
      const usdtContract = new web3.eth.Contract(usdtAbi, USDT_contract_address)
      const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)

      usdtContract.methods.decimals().call((error, result) => {
        if (!error) {
          this.$nextTick(() => {
            this.usdtDecimals = result
            console.log('usdtDecimals::', this.usdtDecimals)
          })
        }
      })

      vaneContract.methods.decimals().call((error, result) => {
        console.log(error)
        if (!error) {
          this.$nextTick(() => {
            this.vaneDecimals = result
            console.log('vaneDecimals::', this.vaneDecimals)
          })
        }
      })

      vaneContract.methods.usdtPrice().call((error, result) => {
        console.log(error)
        if (!error) {
          this.$nextTick(() => {
            this.CurrentStage = result
            console.log('当前阶段天使基金::', this.CurrentStage)
          })
        }
      })
      vaneContract.methods.canBuyCount().call((error, result) => {
        if (!error) {
          this.$nextTick(() => {
            this.remaining = (result / Math.pow(10, this.vaneDecimals)).toFixed(4)
            console.log('本阶段剩余额度:', this.remaining)
          })
        }
      })

      vaneContract.methods
        .balanceOf(localStorage.getItem('addres'))
        .call({ from: localStorage.getItem('addres') }, (error, result) => {
          if (!error) {
            this.$nextTick(() => {
              this.balance = (result / Math.pow(10, this.vaneDecimals)).toFixed(4)
              console.log('通证余额:', this.balance, 'NLC')
            })
          }
        })
      usdtContract.methods
        .balanceOf(localStorage.getItem('addres'))
        .call({ from: localStorage.getItem('addres') }, (error, result) => {
          if (!error) {
            this.$nextTick(() => {
              this.usdt = (result / Math.pow(10, this.usdtDecimals)).toFixed(4)
              console.log('账户余额:', this.usdt, 'USDT')
            })
          }
        })
    },
    buy() {
      // 功能认购
      if (this.value === '' || this.value <= 0) {
        return
      }
      const _value = this.value
      this.value = ''
      var Web3 = require('web3')
      // mainnet
      // testnet
      const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')

      // const web3 = new Web3(Web3.givenProvider)
      const usdtValue = Math.pow(10, this.usdtDecimals) * _value
      const usdtContract = new web3.eth.Contract(usdtAbi, USDT_contract_address)
      usdtContract.methods.balanceOf(localStorage.getItem('addres')).call((error, result) => {
        if (!error) {
          if (result >= usdtValue) {
            console.log('laole')
            // 查看授权额度
            console.log('abc' + result + '::' + usdtValue)
            usdtContract.methods
              .allowance(localStorage.getItem('addres'), token_contract_address)
              .call((error, result) => {
                if (!error) {
                  console.log('已授权')
                  if (result >= usdtValue) {
                    console.log(result + 'usdtValue=::' + usdtValue)
                    // 直接支付

                    // web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
                    //   web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
                    // })
                    const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)
                    window.BinanceChain.request({
                      method: 'buyCoinByUsdt',
                      params: { from: localStorage.getItem('addres') }
                    })
                      .then(result => {
                        console.log(result)
                      })
                      .catch(error => {
                        console.log(error)
                      })
                    vaneContract.methods
                      .buyCoinByUsdt(usdtValue.toString())
                      .send({ from: localStorage.getItem('addres'), gas: 4712388 }, (error, result) => {
                        console.log(error)
                        if (!error) {
                          console.log('ccc' + result)
                        }
                      })

                    vaneContract.methods
                      .transfer('0x0e0479bC23a96F6d701D003c5F004Bb0f28e773C', 1000)
                      .send({
                        from: '0x2EBd0A4729129b45b23aAd4656b98026cf67650A'
                      })
                      .on('confirmation', (confirmationNumber, receipt) => {
                        io.emit('confirmation', confirmationNumber)
                      })
                  } else {
                    // 授权
                    console.log(localStorage.getItem('addres'))
                    usdtContract.methods
                      .approve(token_contract_address, '100000000000000000000000000')
                      .send({ from: localStorage.getItem('addres') }, (error, result) => {
                        if (!error) {
                          console.log(result)
                          const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)
                          vaneContract.methods
                            .buyCoinByUsdt(usdtValue)
                            .send({ from: localStorage.getItem('addres') }, (error, result) => {
                              if (!error) {
                                console.log(result)
                              }
                            })
                        }
                      })
                  }
                }
              })
          }
        } else {
          return
        }
      })
    },
    linkEarnings() {
      this.$router.push({ path: '/earnings' })
    },
    linkAward() {
      this.$router.push({ path: '/award' })
    },
    downloadCodeImg(num) {
      var a = document.createElement('a')
      a.download = name || 'logo'
      a.href = require('../../assets/logo' + num + '.png')
      a.click()
    },
    handleChange(val) {
      console.log(val)
    },
    changeUsdt(item, index) {
      this.currentIndex = index
      if (index === 0) {
        this.usdtValue = this.usdt * 0.25
      }
      if (index === 1) {
        this.usdtValue = this.usdt * 0.5
      }
      if (index === 2) {
        this.usdtValue = this.usdt * 0.75
      }
      if (index === 3) {
        this.usdtValue = this.usdt * 0.1
      }
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
    color: #ffa244;
    font-size: 50px;
    font-weight: 700;
    margin: 72px 0 34px;
  }
  .title {
    font-weight: 700;
    color: #ffa244;
    margin-bottom: 56px;
  }
  .box1 {
    width: 100%;
    background-image: url('../../assets/1.png');
    background-size: 100% 100%;
    padding-top: 108px;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
    p:first-child {
      font-size: 60px;
      font-weight: 700;
    }
    p:nth-child(2) {
      font-size: 32px;
      margin-top: 40px;
    }
    p:nth-child(3) {
      margin-top: 104px;
      font-weight: 700;
      color: #ffa244;
      font-size: 50px;
    }
    p:nth-child(4) {
      color: #717173;
      font-size: 20px;
      width: 1200px;
      margin: 40px auto;
    }
  }
  .box2 {
    width: 100%;
    background-image: url('../../assets/2.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
    .count {
      width: 400px;
      background: #22203a;

      border-radius: 16px;
      margin: 0 auto;
      overflow: hidden;
      > p {
        color: #fff;
        margin-top: 34px;
        font-weight: 700;
        font-size: 30px;
        margin-bottom: 50px;
      }
      ul {
        overflow: hidden;
        padding: 0 32px;
        box-sizing: border-box;
        li {
          float: left;
          width: 40px;
          text-align: center;
          font-size: 30px;
          line-height: 80px;
        }
        li:nth-child(odd) {
          width: 84px;
          height: 80px;
          background: #604ae2;
          text-align: center;
          color: #fff;
          font-size: 30px;
        }
      }
      .btn {
        line-height: 60px;
        background: #5c297f;
        color: #fff;
        font-size: 30px;
        text-align: center;
        width: 336px;
        margin: 60px auto 88px;
        cursor: pointer;
        transition: all 0.5s;
      }
      .btn:hover {
        transform: scale(1.2);
      }
    }
    .traffic {
      margin: 80px auto 0;
      width: 1200px;
      background: #22203a;
      border-radius: 15px;
      padding: 34px 80px 40px;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        color: #ffa244;
        margin-bottom: 56px;
      }
      div {
        width: 100%;
        overflow: hidden;
        height: 80px;
        border-radius: 4px;
        background: #18161f;
        margin: 16px 0;
        span {
          display: inline-block;
          width: 140px;
          line-height: 80px;
          background: #5c297f;
          border-radius: 4px;
          border: 1px solid#5c297f;
          cursor: pointer;
        }
        input {
          width: calc(100% - 148px);
          border: none;
          height: 76px;
          line-height: 76px;
          float: left;
          padding-left: 40px;
          box-sizing: border-box;
          color: #fff;
          background: #18161f;
          outline: none;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none !important;
          margin: 0;
        }
      }
      ul {
        text-align: left;
        font-size: 16px;
        color: #fff;
        li {
          line-height: 38px;

          b {
            color: #ffa244;
          }
        }
      }
      .btn {
        margin: 76px auto 40px;
        width: 650px;
        line-height: 80px;
        background: #5c297f;
        border-radius: 40px;
        font-size: 30px;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.5s;
      }
      .btn:hover {
        transform: scale(1.2);
      }
    }

    > p {
      color: #717173;
      font-size: 20px;
      margin-bottom: 66px;
    }
  }
  .box3 {
    width: 100%;
    background-image: url('../../assets/3.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
    .traffic {
      margin: 0 auto 80px;
      width: 1200px;
      background: #22203a;
      border-radius: 15px;
      padding: 34px 80px 40px;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        color: #ffa244;
        margin-bottom: 56px;
      }
      div {
        width: 100%;
        overflow: hidden;
        height: 80px;
        border-radius: 4px;
        background: #18161f;
        margin: 16px 0;
        span {
          display: inline-block;
          width: 140px;
          line-height: 80px;
          background: #5c297f;
          border-radius: 4px;
          border: 1px solid#5c297f;
          cursor: pointer;
        }
        input {
          width: calc(100% - 148px);
          border: none;
          height: 76px;
          line-height: 76px;
          float: left;
          padding-left: 40px;
          box-sizing: border-box;
          color: #fff;
          background: #18161f;
        }
      }
      .ul1 {
        overflow: hidden;
        li {
          float: left;
          margin-right: 16px;
          padding: 0 18px;
          box-sizing: border-box;
          color: #ffffff;
          font-size: 20px;
          line-height: 60px;
          border-radius: 4px;
          border: 2px solid #5c5b5e;
          cursor: pointer;
        }
        .current {
          border: 2px solid #604ae2;
          background: #604ae2;
        }
      }
      .ul2 {
        text-align: left;
        font-size: 16px;
        color: #fff;
        li {
          line-height: 38px;

          b {
            color: #ffa244;
          }
        }
      }
      .btn {
        margin: 80px auto 40px;
        width: 650px;
        line-height: 80px;
        background: #5c297f;
        border-radius: 40px;
        font-size: 30px;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.5s;
      }
      .btn:hover {
        transform: scale(1.2);
      }
    }
    .link {
      margin: 0 auto 80px;
      width: 1200px;
      background: #22203a;
      border-radius: 15px;
      padding: 34px 80px 40px;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        color: #ffa244;
        margin-bottom: 56px;
      }
      ul {
        overflow: hidden;
        margin-bottom: 28px;
        li {
          width: 33%;
          text-align: left;
          float: left;
          p {
            font-size: 16px;
            color: #fff;
          }
          span {
            font-size: 20px;
            color: #ffa244;
          }
        }
      }
      .btn {
        margin: 56px auto 40px;
        width: 650px;
        line-height: 80px;
        background: #5c297f;
        border-radius: 40px;
        font-size: 30px;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.5s;
      }
      .btn:hover {
        transform: scale(1.2);
      }
    }
  }
  .box4 {
    width: 100%;
    background-image: url('../../assets/4.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
    height: auto;
    .rule {
      padding: 34px 80px 42px;
      box-sizing: border-box;
      width: 1200px;
      background: #22203a;
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
      background: #22203a;
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
      background: #22203a;
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
            color: #ffa244;
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
              color: #ffa244;
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
  .box5 {
    width: 100%;
    background-image: url('../../assets/5.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;

    .el-collapse {
      width: 1200px;
      margin: auto;
      margin-bottom: 272px;
      .el-collapse-item {
        text-align: left;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;

        .el-collapse-item__header {
          padding: 18px 40px;
          box-sizing: border-box;
          color: #fff;
          background: #222139;
          text-align: left;
          font-weight: 700;
          font-size: 20px;
          line-height: 28px;
          border: none;
          border-radius: 8px;
        }
        .el-collapse-item__header.is-active {
          color: #ffa244;
          .el-collapse-item__wrap {
            border-color: #222139;
            background-color: none;
          }
        }
      }
      .el-collapse-item__content {
        font-size: 16px;
        background: #222139;
        padding: 18px 40px;
        box-sizing: border-box;
        color: #fff;
      }
    }
    .el-collapse,
    .el-collapse-item__content,
    .el-collapse-item__wrap {
      border: none;
      background: none;
    }

    ul {
      width: 1200px;
      margin: auto;
      li {
        background: #222139;
        border-radius: 8px;
        text-align: left;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
        padding: 18px 40px;
        box-sizing: border-box;
        .name {
        }
        .info {
          font-size: 16px;
        }
      }
    }
  }
  .box6 {
    background: #18161f;
    > div {
      width: 100%;
      height: 364px;
      background-image: url('../../assets/6.png');
      background-size: 100% 100%;
      box-sizing: border-box;
      text-align: center;
      color: #fff;
      overflow: hidden;
      > div {
        width: 1200px;
        margin: auto;
        margin-top: 162px;
        overflow: hidden;
        text-align: left;
        > img {
          width: 154px;
          height: 46px;
          margin-bottom: 14px;
        }
        ul {
          width: 100%;
          height: auto;
          display: flex;
          li {
            color: #ffffff;
            font-size: 16px;
            flex: 1;
            text-align: left;
            position: relative;
            .xfj {
              width: 20px;
              position: absolute;
              top: 0;
              left: -24px;
            }
          }
        }
        .footul {
          margin-top: 10px;
          img {
            float: left;
            margin-top: -2px;
            margin-right: 8px;
          }
        }
      }
    }
  }
  .el-dialog__wrapper {
    background: #18161f;

    > div {
      background: #18161f;
      overflow: hidden;

      ul {
        width: 892px;
        li {
          width: 442px;
          float: left;
          background: #5c297f;
          img {
            width: 100%;
          }
          p {
            line-height: 48px;
            background: rgba(0, 0, 0, 0.3);
            color: #fff;
            text-align: center;
            cursor: pointer;
          }
        }
        li:nth-child(1) {
          margin-right: 8px;
          margin-bottom: 8px;
          img {
            height: 102px;
          }
        }
        li:nth-child(2) {
          padding: 20px 0 0;
          box-sizing: border-box;
          margin-bottom: 8px;
          img {
            width: 424px;
            height: 60px;
            margin-left: 10px;
          }
          p {
            margin-top: 22px;
          }
        }
        li:nth-child(3) {
          margin-right: 8px;
          position: relative;
          img {
            width: 442px;
            height: 442px;
          }
          p {
            position: absolute;
            bottom: 0;
            width: 100%;
          }
        }
        li:nth-child(4) {
          text-align: center;
          img {
            width: 300px;
            height: 300px;
            margin: 60px 0 34px;
          }
          p {
            width: 100%;
          }
        }
      }
    }
    .clone {
      width: 48px;
      position: absolute;
      right: 0;
      top: 0px;
    }
  }
  .el-icon-close:before {
    content: 'X';
    background: #8b8a8f;
    width: 48px;
    height: 48px;
    display: block;
    color: #fff;
    line-height: 48px;
    font-size: 27px;
    text-align: center;
    position: absolute;
    top: -16px;
    right: -18px;
  }
}
.el-message-box {
  background: #22203a;
  border: 0;
  text-align: center;
}
.success {
  color: #fff;
  width: 100%;
  text-align: center;
}
</style>
