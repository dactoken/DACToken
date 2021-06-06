<template>
  <div class="home">
    <p class="img_box">
      <img @click="changeLanguage('en')" class="" src="../../assets/en.png" alt="" />
      <img @click="changeLanguage('e')" class="zn" src="../../assets/e.png" alt="" />
      <img @click="changeLanguage('jp')" class="jp" src="../../assets/jp.png" alt="" />
      <img @click="changeLanguage('kn')" class="kn" src="../../assets/han.png" alt="" />
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
    </div>

    <div class="box1">
      <!-- <p>{{ $t('first.title') }}</p> -->
      <div data-aos="fade-up" data-aos-duration="1500">
        <div class="img"><img src="../../assets/title.png" alt="" /></div>
        <p>{{ $t('msg.one') }}</p>
        <p>{{ $t('msg.meet') }}</p>

        <p>
          {{ $t('msg.meetExplain') }}
        </p>
      </div>
    </div>

    <div class="box2">
      <div class="count" data-aos="zoom-in-up" data-aos-duration="1500">
        <p>{{ $t('msg.countdown') }}</p>
        <DownTime v-if="flag" :endTime="OpenTime" :startTime="new Date().getTime()" :endMsg="endMsg"> </DownTime>

        <div class="btn">{{ Number(amount).toFixed(2) }} USDT</div>
      </div>
      <div class="traffic" data-aos="zoom-in-down" data-aos-duration="1500">
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
          <input type="number" min="1" v-model="value" />
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
        <div class="btn hui" v-if="remaining == 0">{{ $t('msg.ForTheEnd') }}</div>
        <div class="btn" v-else-if="countDown <= 0" @click="buy">{{ $t('msg.buy') }}</div>
        <div class="btn" v-else-if="countDown > 0">{{ $t('msg.AfterTheStart') }}{{ updateTime }}</div>
      </div>
      <h4 data-aos="fade-up" data-aos-duration="1500">{{ $t('msg.participate') }}</h4>
      <p data-aos="fade-up">
        {{ $t('msg.participateExplain1') }}
        <br />
        {{ $t('msg.participateExplain2') }}
        <br />{{ $t('msg.participateExplain3') }}
        <br />
      </p>
    </div>

    <div class="box3">
      <div class="traffic" data-aos="fade-left" data-aos-duration="1500">
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
          <input type="text" v-model="usdtValue" @keyup="inputNum($event.target)" />
          <span>USDT</span>
        </div>
        <ul class="ul2">
          <li>
            <span>{{ $t('msg.account_balance') }}：</span>
            <b>{{ usdt }} USDT</b>
          </li>
        </ul>
        <div class="btn" @click="licai">{{ $t('msg.buy') }}</div>
      </div>
      <div class="link" data-aos="fade-right" data-aos-duration="1500">
        <p class="title">{{ $t('msg.link') }}</p>
        <ul>
          <li>
            <p>{{ $t('msg.myReferral') }}：</p>
            <span>{{ userInfo.pid }}</span>
          </li>
          <li>
            <p>{{ $t('msg.myDirectReferrals') }}：</p>
            <span>{{ userInfo.recommendcount }}</span>
          </li>
          <li>
            <p>{{ $t('msg.myID') }}：</p>
            <span>{{ userInfo.id }}</span>
          </li>
        </ul>
        <ul>
          <li>
            <p>{{ $t('msg.myInvitationLink') }}：</p>
            <span>http://ipfs.vaneapp.com/?Invited={{ addres }}</span>
          </li>
          <li>
            <p>{{ $t('msg.myAddress') }}：</p>
            <span>{{ addres }}</span>
          </li>
          <li></li>
        </ul>
        <div class="btn copy_btn" data-clipboard-text="'http://ipfs.vaneapp.com/?Invited=' + addres" @click="copy">
          {{ $t('msg.copyInvitationLink') }}
        </div>
      </div>
    </div>
    <div class="box4">
      <div class="rule" data-aos="fade-left" data-aos-duration="1500">
        <p class="title">{{ $t('msg.Rules') }}</p>
        <ul>
          <li>1.）{{ $t('msg.RulesExplain1') }}</li>
          <li>2.）{{ $t('msg.RulesExplain2') }}</li>
          <li>3.）{{ $t('msg.RulesExplain3') }}</li>
        </ul>
      </div>
      <h4>{{ $t('msg.TodayAward') }}</h4>
      <div class="day" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500">
        <ul>
          <li>{{ $t('msg.Rank') }}</li>
          <li>{{ $t('msg.Performance') }}</li>
          <li>ID</li>
        </ul>
        <ul v-for="(item, index) in list" :key="index">
          <li>{{ index + 1 }}</li>
          <li>{{ Number(item.amount).toFixed(4) }}</li>
          <li>{{ item.uid }}</li>
        </ul>
        <div class="btn" @click="linkAward">{{ $t('msg.ViewYesterdays') }}</div>
      </div>
      <h4 data-aos="fade-up">{{ $t('msg.Statistics') }}</h4>
      <div class="statistical" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
        <p>{{ $t('msg.MyLevel') }}：V0</p>
        <div class="earnings">
          <div class="left">
            <p>{{ $t('msg.UnsettledEarnings') }}</p>
            <p>USDT：{{ Number(userInfo.balance).toFixed(4) }}</p>
            <p>
              VAC：{{ balance }} <span @click="jiesuan">{{ $t('msg.balance') }}</span>
            </p>
          </div>
          <div class="right">
            <p>{{ $t('msg.CashableIncome') }}</p>
            <p>USDT：{{ Number(usdtamount).toFixed(4) }}</p>
            <p>VAC：{{ Number(vaneamount).toFixed(4) }}</p>
          </div>
        </div>
        <div class="list-ul">
          <ul>
            <li>
              <p>{{ $t('msg.StaticIncome') }}</p>
              <span>{{ Number(userInfo.staticincome).toFixed(4) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.DynamicIncome') }}</p>
              <span>{{ (Number(userInfo.levelreward) + Number(userInfo.smallreward)).toFixed(4) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.SettledIncome') }}</p>
              <span>{{ Number(userInfo.withdrawalbalance).toFixed(4) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.outNeeds') }}</p>
              <span>{{ Number(userInfo.surplususdt).toFixed(4) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.TotalTSokenSales') }}</p>
              <span>{{ Number(balance21W).toFixed(4) }}VAC</span>
            </li>
            <li>
              <p>{{ $t('msg.TotalNumberBurned') }}</p>
               <span>{{ totalBurned }} VAC</span>
            </li>
            <li>
              <p>{{ $t('msg.EntryFundsToday') }}</p>
              <span>{{ Number(dailyUsdt).toFixed(4) }} USDT</span>
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
          <ul>
            <li @click="hysj()"  ref="hysj">>{{ $t('msg.hysj') }}</li>
            <li  @click="join()">
              <!-- <li @click="join()"> -->
              <span>{{ $t('msg.jrwmdb') }}</span>
              <img src="../../assets/xfj.png" alt="" />
            </li>
          </ul>
          <p @click="dialogVisible = true">{{ $t('msg.logo') }}</p>
        </div>
        <img src="../../assets/foot.png" alt="" />
        <p>2021&copy;{{ $t('msg.yhzj') }}</p>
      </div>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" width="80%">
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
import VueAos from 'vue-aos'
import NCWeb3 from '../web3'
import SubscriptionAbi from '../../api/subscriptionAbi'
import usdtAbi from '../../api/usdtAbi'
import DownTime from './downTime'
import vaneAbi from '../../api/vaneAbi'
import Clipboard from 'clipboard' // 复制
import BigNumber from 'bignumber.js'
import {
  getUserInfo,
  newPlay,
  getDailyList,
  pay,
  dataoog,
  updateUserVance,
  DataoogTest,
  getFuturePool,
  getDailyUsdt,
  getOpenTime
} from '@/api/user.js'
import liCaiAbi from '../../api/liCaiAbi'

const USDT_contract_address = '0x55d398326f99059ff775485246999027b3197955' // USDT(buy)
const token_contract_address = '0xe2c46ebd8F802Ec28a43F94Cee492fD132D5FCA6' // 代币VV
const licai_contract_address = '0xA04b93458Ee812Cf00F64Bc1304136DA9160EA67'
export default {
  components: { DownTime },
  data() {
    return {
      countDown: '',
      menuShow: false,
      endTime: new Date().getTime() + 60 * 60 * 60 * 60 * 60 * 3,
      endMsg: '结束了',
      balance: 0,
      isBuy: true,
      dialogVisible: false,
      value: '',
      currentIndex: '',
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
      ],
      timer: null, // 定时器名称
      timer2: null,
      updateTime: ''
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
  created() {
    // 账号
    // this.getToken()
  },

  mounted() {
    AOS.init()
    NCWeb3.Init(addr => {
      // 得到相应的钱包地址
      this.addres = addr
      localStorage.setItem('addres', addr)
    })
    this.getToken()

    this.timer = setInterval(() => {
      setTimeout(this.getToken, 0)
    }, 100 * 60)

    this.getTime()
    this.timer2 = setInterval(() => {
      setTimeout(this.update, 0)
    }, 1000)
  },
  methods: {
    getTime() {
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
      const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)
      // 倒计时
      vaneContract.methods.canBuyTime().call((error, result) => {
        if (!error) {
          this.$nextTick(() => {
            this.countDown = result - new Date().getTime() / 1000
            if (this.countDown > 0) {
              this.updateTime = this.secondToDate(result - new Date().getTime() / 1000)
              this.update()
            } else {
              this.countDown = 0
              clearInterval(this.timer2)
              this.timer2 = null
            }
          })
        }
      })
    },
    update() {
      this.countDown -= 1
      console.log('时间:', this.countDown)

      if (this.countDown > 0) {
        this.updateTime = this.secondToDate(this.countDown)
      } else {
        clearInterval(this.timer2)
        this.timer2 = null
      }
      this.countDown -= 1
      console.log('时间:', this.countDown)

      if (this.countDown > 0) {
        this.updateTime = this.secondToDate(this.countDown)
      } else {
        clearInterval(this.timer2)
        this.timer2 = null
      }
    },
    secondToDate(result) {
      var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
      var m =
        Math.floor((result / 60) % 60) < 10 ? '0' + Math.floor((result / 60) % 60) : Math.floor((result / 60) % 60)
      var s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60)
      return (result = h + ':' + m + ':' + s)
    },
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
      window.open('https://github.com/shamingdouyiyang/vane/tree/main/abi')
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
    downloadCodeImg(num) {
      var a = document.createElement('a')
      a.download = name || 'logo'
      a.href = require('../../assets/logo' + num + '.png')
      a.click()
    },

    changeLanguage(type) {
      console.log(type)
      // 将用户设置存储到localStorage以便用户下次打开时使用此设置
      localStorage.setItem('Language', type)
      this.$i18n.locale = type
    },
    getToken() {
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
      web3.eth.getBalance(localStorage.getItem('addres'), (error, result) => {
        if (!error) {
          console.log('账户余额eth::', result)
        }
      })

      // 创建web3对象并连接到以太坊节点

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
              console.log('通证余额:', this.balance, 'VAC')
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
      if (this.value < 1 || this.value > 100) {
        this.$alert('<b class="success">' + this.$t('msg.xian') + '</b>', {
          showClose: false,
          showConfirmButton: false,
          dangerouslyUseHTMLString: true,
          closeOnClickModal: true
        })
        return
      }
      if (this.value === '' || this.value <= 0) {
        return
      }
      const _value = this.value
      this.value = ''
      var Web3 = require('web3')
      const web3 = new Web3(Web3.givenProvider)
      const usdtValue = Math.pow(10, this.usdtDecimals) * _value
      const usdtContract = new web3.eth.Contract(usdtAbi, USDT_contract_address)
      usdtContract.methods.balanceOf(localStorage.getItem('addres')).call((error, result) => {
        if (!error) {
          if (result >= usdtValue) {
            usdtContract.methods
              .allowance(localStorage.getItem('addres'), token_contract_address)
              .call((error, result) => {
                console.log('result::', result)
                if (!error) {
                  if (result >= usdtValue) {
                    console.log('bbb' + result + '::' + usdtValue)
                    // 直接支付
                    console.log('usdtValue=' + usdtValue)

                    console.log('已授权2')
                    const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)

                    console.log('usdtValue::::::' + usdtValue)

                    vaneContract.methods
                      .buyCoinByUsdt(usdtValue.toString())
                      .send({ from: localStorage.getItem('addres') }, (error, result) => {
                        console.log(error)
                        if (!error) {
                          console.log('ccc' + result)
                        }
                      })
                  } else {
                    // 授权
                    console.log('授权')
                    usdtContract.methods
                      .approve(token_contract_address, '100000000000000000000000000')
                      .send({ from: localStorage.getItem('addres') }, (error, result) => {
                        console.log(1)
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
          } else {
            this.$alert('<b class="success">' + this.$t('msg.notSufficientFunds') + '</b>', {
              showClose: false,
              showConfirmButton: false,
              dangerouslyUseHTMLString: true,
              closeOnClickModal: true
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
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
    clearInterval(this.timer2)
    this.timer2 = null
  }
}
</script>
<style lang="scss" scope>
.home {
  font-size: 30px;
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
    color: #ffa244;
    font-size: 50px;
    font-weight: 700;
    margin: 80px 0 40px;
  }
  .title {
    font-weight: 700;
    color: #ffa244;
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
    background: #22203a;
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
  .box1 {
    width: 100%;
    background-image: url('../../assets/1.png');
    background: #18161f;
    background-size: 100% 100%;
    padding-top: 158px;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
    img:nth-child(1) {
      width: 248px;
      height: 304px;
      margin-top: 74px;
    }
    .img {
      width: 100%;
      text-align: center;
      background-image: url('../../assets/bj.png');
      height: 516px;
      background-size: 100% 100%;
      img {
        width: 456px;
        height: 482px;
        margin-top: 60px;
      }
    }

    p:nth-child(2) {
      font-size: 32px;
      margin-top: 24px;
    }
    p:nth-child(3) {
      margin-top: 52px;
      font-weight: 700;
      color: #ffa244;
      font-size: 50px;
    }
    p:nth-child(4) {
      color: #717173;
      font-size: 24px;
      width: 100%;
      margin: 40px auto 80px;
      text-align: left;
      padding: 0 40px;
      box-sizing: border-box;
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
    padding: 0 40px;
    box-sizing: border-box;
    .count {
      width: 400px;
      height: 400px;
      background: #22203a;
      border-radius: 16px;
      margin: 0 auto;
      overflow: hidden;
      > p {
        color: #fff;
        font-weight: 700;
        font-size: 30px;
        margin: 40px 0;
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
      margin: 40px auto 0;
      width: 100%px;
      background: #22203a;
      border-radius: 15px;
      padding: 40px 28px;
      box-sizing: border-box;
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
      ul {
        text-align: left;
        font-size: 24px;
        color: #fff;
        li {
          line-height: 38px;

          b {
            color: #ffa244;
          }
        }
      }
      .btn {
        margin: 32px auto 40px;
        width: 614px;
        line-height: 80px;
        background: #5c297f;
        border-radius: 40px;
        font-size: 30px;
        color: #ffffff;
      }
      .hui {
        background: #909399;
      }
    }

    > p {
      color: #717173;
      font-size: 24px;
      margin-bottom: 80px;
      text-align: left;
      padding: 0 40px;
      box-sizing: border-box;
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
    padding: 0 40px;
    box-sizing: border-box;
    .traffic {
      margin: 0 auto 80px;
      width: 100%;
      width: 670px;
      background: #22203a;
      border-radius: 15px;
      padding: 40px 28px;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        color: #ffa244;
        margin-bottom: 40px;
      }
      .ul1 {
        overflow: hidden;
        width: 100%;
        li {
          width: 140px;
          line-height: 60px;
          float: left;
          margin-right: 16px;
          padding: 0;
          box-sizing: border-box;
          color: #ffffff;
          border-radius: 4px;
          font-size: 20px;
          border: 1px solid #5c5b5e;
          cursor: pointer;
        }
        li:nth-child(4n) {
          margin-right: 0;
        }
        .current {
          border: 2px solid #604ae2;
          background: #604ae2;
        }
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
        width: 614px;
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
      width: 100%;
      background: #22203a;
      border-radius: 15px;
      padding: 40px 28px;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        color: #ffa244;
        margin-bottom: 56px;
      }
      ul {
        overflow: hidden;
        margin-bottom: 28px;
        text-align: center;
        li {
          line-height: 37px;
          p {
            font-size: 24px;
            color: #fff;
            margin-bottom: 16px;
          }
          span {
            font-size: 32px;
            color: #ffa244;
            margin-bottom: 40px;
            display: inline-block;
          }
        }
      }
      .btn {
        margin: 56px auto 40px;
        width: 614px;
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
    padding: 0 40px;
    box-sizing: border-box;
    .rule {
      padding: 34px 28px 42px;
      box-sizing: border-box;
      width: 100%;
      background: #22203a;
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
      background: #22203a;
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
              min-width: 90px;
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
            color: #ffa244;
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
              color: #ffa244;
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
  .box5 {
    width: 100%;
    background-image: url('../../assets/5.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
    padding: 0 40px;
    box-sizing: border-box;
    .el-collapse {
      width: 100%;
      margin: auto;
      margin-bottom: 120px;
      .el-collapse-item {
        text-align: left;
        margin-bottom: 24px;
        .el-collapse-item__header {
          padding: 28px 24px;
          box-sizing: border-box;
          color: #fff;
          background: #222139;
          text-align: left;
          font-size: 26px;
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
        padding: 24px;
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
  }
  .box6 {
    background: #18161f;
    > div {
      width: 100%;
      background-image: url('../../assets/6.png');
      background-size: 100% 100%;
      box-sizing: border-box;
      text-align: center;
      color: #fff;
      overflow: hidden;
      > img {
        margin-top: 169px;
        width: 154px;
        height: 46px;
      }
      > p {
        color: #717173;
        margin-bottom: 62px;
        font-size: 24px;
      }
      > div {
        width: 100%;
        margin: auto;
        margin-top: 162px;
        overflow: hidden;
        text-align: left;
        > img {
          width: 260px;
          height: 48px;
          margin-bottom: 14px;
        }
        ul {
          width: 100%;
          height: auto;
          padding: 0 40px;
          margin-bottom: 30px;
          box-sizing: border-box;
          overflow: hidden;
          li {
            width: 50%;
            color: #ffffff;
            font-size: 16px;
            float: left;
            img {
              width: 20px;
              float: right;
              margin-top: 4px;
              margin-right: 16px;
            }
            span {
              float: right;
            }
          }
          li:nth-child(2) {
            text-align: center;
          }
          li:last-child {
            text-align: right;
          }
        }
        > p {
          font-size: 16px;
          text-align: right;
          padding-right: 34px;
          margin-top: 30px;
          cursor: pointer;
        }
      }
    }
  }
  .el-dialog__wrapper {
    background: #18161f;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
      background: #18161f;
      overflow: hidden;
      padding: 0;
      ul {
        width: 100%;
        li {
          width: 49%;
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
            width: 100%;
            height: 102px;
          }
        }
        li:nth-child(2) {
          padding: 20px 0 0;
          box-sizing: border-box;
          margin-bottom: 8px;
          float: right;
          img {
            width: 100%;
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
            width: 100%;
            height: 442px;
          }
          p {
            position: absolute;
            bottom: 0;
            width: 100%;
          }
        }
        li:nth-child(4) {
          float: right;
          text-align: center;
          img {
            width: 100%;
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
    top: -70px;
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
