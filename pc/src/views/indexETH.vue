<template>
  <div class="home">
    <!-- <img @click="changeLanguage('en')" class="zn" src="../../assets/en.png" alt="" />
    <img @click="changeLanguage('zh')" src="../../assets/ch.png" alt="" />
    <img @click="changeLanguage('jp')" class="jp" src="../../assets/jp.png" alt="" />
    <img @click="changeLanguage('kn')" class="kn" src="../../assets/han.png" alt="" />
    <img @click="changeLanguage('e')" class="e" src="../../assets/e.png" alt="" /> -->

    <img @click="changeLanguage('en')" class="zn" src="../../assets/en.png" alt="" />
    <img @click="changeLanguage('zh')" src="../../assets/ch.png" alt="" />
    <img @click="changeLanguage('jp')" class="jp" src="../../assets/jp.png" alt="" />
    <img @click="changeLanguage('kn')" class="kn" src="../../assets/han.png" alt="" />
    <img @click="changeLanguage('e')" class="e" src="../../assets/e.png" alt="" />

    <div class="box1">
      <!-- <p>{{ $t('first.title') }}</p> -->
      <div data-aos="fade-up" data-aos-duration="3000">
        <div class="img"><img src="../../assets/lh.png" alt="" /></div>
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
        <!-- <ul>
          <li>68</li>
          <li>:</li>
          <li>52</li>
          <li>:</li>
          <li>10</li>
        </ul> -->
        <div class="btn">{{ Number(amount).toFixed(2) }} USDT</div>
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
          <input min="1" type="number" v-model="value" />
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

      <!-- Link 链接 -->
      <div class="link" data-aos="fade-right" data-aos-duration="3000">
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
            <span class="copyaddress">http://test.vaneapp.com/?Invited={{ addres }}</span>
          </li>
          <li>
            <p>{{ $t('msg.myAddress') }}：</p>
            <span>{{ addres }}</span>
          </li>
          <li></li>
        </ul>
        <div class="btn copy_btn" :data-clipboard-text="'http://test.vaneapp.com/?Invited=' + addres" @click="copy">
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
        <ul v-for="(item, index) in dailyList" :key="index">
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
              <span>{{ Number(userInfo.staticincome).toFixed(4) }}USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.DynamicIncome') }}</p>
              <span
                >{{
                  Number(userInfo.bigreward) + Number(userInfo.smallreward) + Number(userInfo.levelreward).toFixed(4)
                }}USDT</span
              >
            </li>
            <li>
              <p>{{ $t('msg.SettledIncome') }}</p>
              <span>{{ Number(userInfo.withdrawalbalance).toFixed(4) }}USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.outNeeds') }}</p>
              <span>{{ Number(userInfo.surplususdt).toFixed(4) }}USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.TotalTSokenSales') }}</p>
              <span>0.00004 VAC</span>
            </li>
            <li>
              <p>{{ $t('msg.TotalNumberBurned') }}</p>
              <span>0.00005 VAC</span>
            </li>
            <li>
              <p>{{ $t('msg.EntryFundsToday') }}</p>
              <span>0.00006 USDT</span>
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
            <li>
              <!-- <li @click="join()"> -->
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
import VueAos from 'vue-aos'
import NCWeb3 from '../web3'
import SubscriptionAbi from '../../api/subscriptionAbi'
import usdtAbi from '../../api/usdtAbi'
import DownTime from './downTime'
import vaneAbi from '../../api/vaneAbi'
import Clipboard from 'clipboard' // 复制
import BigNumber from 'bignumber.js'
// console.log(BigNumber)
// const BigNumber = require('bignumber.js')

// console.log(11111)
// console.log(BigNumber)
import {
  getUserInfo,
  newPlay,
  getDailyList,
  pay,
  dataoog,
  updateUserVance,
  DataoogTest,
  getFuturePool
} from '@/api/user.js'
import liCaiAbi from '../../api/liCaiAbi'

// import FlipDown from 'vue-flip-down'
// 测试
const USDT_contract_address = '0x77ee2aaC10139dE1EAfEC1D6645EC1eE12e08E13' // USDT(buy)
const token_contract_address = '0x34502304066c6e785791eFb1eFa453ba4daca499' // 代币VV
const licai_contract_address = '0x08E6Abf2e9498b93C337638027623E86bC1aED84'

// const USDT_contract_address = '0x55d398326f99059ff775485246999027b3197955' // USDT(buy)
// const token_contract_address = '0xe2c46ebd8F802Ec28a43F94Cee492fD132D5FCA6' // 代币VV
// const licai = '0xA04b93458Ee812Cf00F64Bc1304136DA9160EA67'
export default {
  components: { DownTime },
  data() {
    return {
      amount: '',
      usdtamount: '',
      vaneamount: '',
      countDown: '',
      endTime: new Date().getTime() + 60 * 60 * 60 * 60 * 60 * 3,
      endMsg: '结束了',
      balance: 0,
      dialogVisible: false,
      value: '',
      currentIndex: -1,
      addres: '',
      usdtDecimals: '',
      vaneDecimals: '',
      updateUserVanceValue: '',
      usdts: ['25%', '50%', '70%', '100%'],
      list: [],
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
      updateTime: '',
      userInfo: {},
      dailyList: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.ObtainedToken = this.CurrentStage * val
        console.log(BigNumber(this.CurrentStage * val))
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
    NCWeb3.Init(addr => {
      // 得到相应的钱包地址
      // this.addres = addr
      // localStorage.setItem('addres', addr)
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
  created() {
    this.getUserInfo()
    this.getDailyList()
    this.DataoogTest()
    this.getFuturePool()
  },
  methods: {
    inputNum(target) {
      if (!/^\d+$/.test(target.value)) {
        this.usdtValue = ''
      }
    },
    getFuturePool() {
      getFuturePool()
        .then(res => {
          this.amount = res.result.amount
        })
        .catch(res => {
          // console.log(res)
        })
    },
    DataoogTest() {
      DataoogTest()
        .then(res => {})
        .catch(res => {
          // console.log(res)
        })
    },
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
    licai() {
      // var Web3 = require('web3')
      // var web3Provider
      // if (window.ethereum) {
      //   web3Provider = window.ethereum
      // } else if (window.web3) {
      //   web3Provider = window.web3.currentProvider
      // } else {
      //   web3Provider = new Web3.providers.HttpProvider('http://localhost:9020')
      // }
      // const web3 = new Web3(web3Provider)
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

      const licai = new web3.eth.Contract(liCaiAbi, licai_contract_address)
      const usdtContract = new web3.eth.Contract(usdtAbi, USDT_contract_address)
      const usdtValue = this.usdtValue * 1000000000000000000
      usdtContract.methods.balanceOf(localStorage.getItem('addres')).call((error, result) => {
        if (!error) {
          if (Number(result) >= Number(usdtValue)) {
            // 查看授权额度
            // console.log('abc' + BigNumber(result) + '::' + BigNumber(usdtValue))
            usdtContract.methods
              .allowance(localStorage.getItem('addres'), licai_contract_address)
              .call((error, result) => {
                if (!error) {
                  if (Number(result) >= Number(usdtValue)) {
                    // 直接支付
                    const res = licai.methods.play(BigNumber(usdtValue))
                    res.send({ from: localStorage.getItem('addres') }, (error, result) => {
                      if (!error) {
                        this.pay(result)
                      }
                    })
                  } else {
                    // 授权
                    usdtContract.methods
                      .approve(licai_contract_address, BigNumber(100000000000000000000000000))
                      .send({ from: localStorage.getItem('addres') }, (error, result) => {
                        if (!error) {
                          // console.log(result)
                          licai.methods
                            .play(usdtValue)
                            .send({ from: localStorage.getItem('addres') }, (error, result) => {
                              if (!error) {
                                this.pay(result)
                                // console.log(result)
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
    toNonExponential(num) {
      var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
      return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
    },
    pay(hah) {
      const params = {
        address: localStorage.getItem('addres'),
        amount: this.usdtValue,
        hah: hah,
        parentaddress: this.$route.query.Invited == 'null' ? '' : this.$route.query.Invited
      }
      pay(params)
        .then(res => {
          if (res.code === 200) {
            this.getUserInfo()
            this.getFuturePool()
          }
        })
        .catch(res => {})
    },
    // 结算
    jiesuan() {
      // var Web3 = require('web3')
      // var web3Provider
      // if (window.ethereum) {
      //   web3Provider = window.ethereum
      // } else if (window.web3) {
      //   web3Provider = window.web3.currentProvider
      // } else {
      //   web3Provider = new Web3.providers.HttpProvider('http://localhost:9020')
      // }
      // const web3 = new Web3(web3Provider)

      const params = {
        address: localStorage.getItem('addres'),
        amount: this.userInfo.balance,
        vaneamount: this.userInfo.vanecount
      }
      dataoog(params)
        .then(res => {
          if (res.code === 200) {
            this.dailyList = res.result
            // console.log(this.dailyList)
            this.usdtamount = res.result.usdtamount
            this.vaneamount = res.result.vaneamount
            if (res.result.usdtamount < 0.1) {
              // 没有可提现余额
              return
            } else {
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
              const licai = new web3.eth.Contract(liCaiAbi, licai_contract_address)
              const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)
              const usdtValue = this.usdtamount * 1000000000000000000
              const vaneValue = this.vaneamount * 1000000000000000000
              vaneContract.methods.balanceOf(this.addres).call((error, result) => {
                if (!error) {
                  // console.log('result::', result, 'vaneValue::', vaneValue)
                  // console.log()
                  if (Number(result) >= Number(vaneValue)) {
                    // 查看授权额度
                    vaneContract.methods
                      .allowance(localStorage.getItem('addres'), licai_contract_address)
                      .call((error, result) => {
                        if (!error) {
                          if (Number(result) >= Number(usdtValue)) {
                            // 直接支付
                            licai.methods
                              .settlement(BigNumber(usdtValue))
                              .send({ from: localStorage.getItem('addres') }, (error, result) => {
                                if (!error) {
                                  // 提现成功
                                }
                              })
                          } else {
                            // 授权
                            vaneContract.methods
                              .approve(licai_contract_address, '100000000000000000000000000')
                              .send({ from: this.addres }, (error, result) => {
                                if (!error) {
                                  licai.methods
                                    .settlement(BigNumber(usdtValue))
                                    .send({ from: localStorage.getItem('addres') }, (error, result) => {})
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
            }
          }
        })
        .catch(res => {
          // console.log(222222222222)
          // console.log(res)
        })
    },
    dataoog() {
      const params = {
        address: localStorage.getItem('addres'),
        amount: this.userInfo.balance,
        vaneamount: this.userInfo.vanecount
      }
      dataoog(params)
        .then(res => {
          if (res.code === 200) {
            this.dailyList = res.result
            this.usdtamount = res.result.usdtamount
            this.vaneamount = res.result.vaneamount
          }
        })
        .catch(res => {})
    },
    getDailyList() {
      getDailyList()
        .then(res => {
          if (res.code === 200) {
            this.dailyList = res.result
          }
        })
        .catch(res => {})
    },
    newPlay() {
      var str = window.location.href
      let parentaddress = ''
      if (str.indexOf('Invited') != -1) {
        parentaddress = str.slice(33, str.length - 2)
      } else {
        parentaddress = ''
      }
      const params = {
        address: localStorage.getItem('addres'),
        parentaddress: parentaddress
      }
      newPlay(params)
        .then(res => {
          if (res.code === 200) {
            this.getUserInfo()
          }
        })
        .catch(res => {})
    },

    buy() {
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
      const usdtValue = _value * 1000000000000000000
      const usdtContract = new web3.eth.Contract(usdtAbi, USDT_contract_address)
      usdtContract.methods.balanceOf(this.addres).call((error, result) => {
        if (!error) {
          if (Number(result) >= Number(usdtValue)) {
            // 查看授权额度
            usdtContract.methods.allowance(this.addres, token_contract_address).call((error, result) => {
              if (!error) {
                if (Number(result) >= Number(usdtValue)) {
                  // 直接支付
                  const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)
                  vaneContract.methods
                    .buyCoinByUsdt(usdtValue.toString())
                    .send({ from: this.addres }, (error, result) => {
                      if (!error) {
                      }
                    })
                } else {
                  // 授权
                  usdtContract.methods
                    .approve(token_contract_address, '100000000000000000000000000')
                    .send({ from: this.addres }, (error, result) => {
                      if (!error) {
                        const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)
                        vaneContract.methods
                          .buyCoinByUsdt(BigNumber(usdtValue))
                          .send({ from: this.addres }, (error, result) => {
                            if (!error) {
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
    getToken() {
      /* 新版的方式 */
      var Web3 = require('web3')
      var web3Provider
      if (window.ethereum) {
        web3Provider = window.ethereum
        try {
          // 请求用户授权
          window.ethereum.enable()
        } catch (error) {
          // 用户不授权时
          console.error('User denied account access')
        }
      } else if (window.Web3) {
        // 老版 MetaMask Legacy dapp browsers...
        Web3Provider = window.Web3.currentProvider
      } else {
        web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
      }
      const web3 = new Web3(web3Provider) // web3就是你需要的web3实例

      web3.eth.getAccounts((error, result) => {
        if (!error) {
          this.addres = result[0]

          localStorage.setItem('addres', result[0])
        } // 授权成功后result能正常获取到账号了
      })

      // 或者

      web3.eth.getBalance(localStorage.getItem('addres'), (error, result) => {
        if (!error) {
        }
      })

      // 创建web3对象并连接到以太坊节点

      const usdtContract = new web3.eth.Contract(usdtAbi, USDT_contract_address)
      const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)

      usdtContract.methods.decimals().call((error, result) => {
        if (!error) {
          this.$nextTick(() => {
            this.usdtDecimals = result
          })
        }
      })

      vaneContract.methods.decimals().call((error, result) => {
        if (!error) {
          this.$nextTick(() => {
            this.vaneDecimals = result
          })
        }
      })

      vaneContract.methods.usdtPrice().call((error, result) => {
        if (!error) {
          this.$nextTick(() => {
            this.CurrentStage = result
          })
        }
      })
      vaneContract.methods.canBuyCount().call((error, result) => {
        if (!error) {
          this.$nextTick(() => {
            this.remaining = (result / Math.pow(10, this.vaneDecimals)).toFixed(4)
          })
        }
      })

      vaneContract.methods
        .balanceOf(localStorage.getItem('addres'))
        .call({ from: localStorage.getItem('addres') }, (error, result) => {
          if (!error) {
            this.$nextTick(() => {
              this.balance = (result / Math.pow(10, this.vaneDecimals)).toFixed(4)
            })
          }
        })
      usdtContract.methods
        .balanceOf(localStorage.getItem('addres'))
        .call({ from: localStorage.getItem('addres') }, (error, result) => {
          if (!error) {
            this.$nextTick(() => {
              this.usdt = (result / Math.pow(10, this.usdtDecimals)).toFixed(4)
            })
          }
        })

      const params = {
        address: localStorage.getItem('addres'),
        amount: this.balance
      }
      updateUserVance(params)
        .then(res => {
          if (res.code === 200) {
          }
        })
        .catch(res => {})
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
    handleChange(val) {},
    changeUsdt(item, index) {
      this.currentIndex = index
      if (index === 0) {
        this.usdtValue = parseInt(this.usdt * 0.25)
      }
      if (index === 1) {
        this.usdtValue = parseInt(this.usdt * 0.5)
      }
      if (index === 2) {
        this.usdtValue = parseInt(this.usdt * 0.75)
      }
      if (index === 3) {
        this.usdtValue = parseInt(this.usdt * 1)
      }
    },

    changeLanguage(type) {
      // console.log(type)
      localStorage.setItem('Language', type)
      this.$i18n.locale = type
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
    padding-top: 100px;
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
      height: 400px;
      background: #22203a;

      border-radius: 16px;
      margin: 0 auto;
      overflow: hidden;
      > p {
        color: #fff;
        margin-top: 34px;
        font-weight: 700;
        font-size: 30px;
        margin-bottom: 36px;
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
      .hui {
        background: #909399;
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
.copyaddress {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
}
</style>
