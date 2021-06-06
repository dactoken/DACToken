<template>
  <div class="home">
    <Language />
    <Airdrop :address="addres" />
    <div class="box1">
      <div data-aos="fade-up" data-aos-duration="1500">
        <div class="img"><img src="../../assets/title.png" alt="" /></div>
        <div class="slogan">{{ $t('msg.firstTime') }}</div>
        <div class="description">STAKING GROWT</div>
        <!-- <p>{{ $t('msg.one') }}</p> -->
        <!-- <div class="smart">
          {{ $t('msg.contract') }}
        </div> -->
        <div class="header-btn">
          <div class="get-btn" @click="goAirdrop">{{ $t('msg.receiveAirdrop') }}</div>
          <div class="get-btn" @click="goMdex1">{{ $t('msg.exchangeDAC') }}</div>
          <div class="get-btn" @click="goMdex">{{ $t('msg.exchangeWDAC') }}</div>
        </div>
        <p class="feat">{{ $t('msg.meet') }}</p>
        <p class="des"></p>

        <p class="meetExplain">
          {{ $t('msg.meetExplain') }}
        </p>
      </div>
    </div>

    <div class="box2">
      <!-- class="count" -->
      <div class="count" data-aos="zoom-in-up" data-aos-duration="1500">
        <p>{{ $t('msg.countdown') }}</p>
        <DownTime v-if="flag" :endTime="OpenTime" :startTime="new Date().getTime()" :endMsg="endMsg"> </DownTime>

        <div class="btn">{{ Number(amount).toFixed(2) }} USDT</div>
      </div>

      <h4 data-aos="fade-up" data-aos-duration="1500">{{ $t('msg.participate') }}</h4>
      <p data-aos="fade-up">
        {{ $t('msg.participateExplain1') }}
        <br />
        {{ $t('msg.participateExplain2') }}
        <br />{{ $t('msg.participateExplain3') }}
        <br />
      </p>
      <div class="traffic" data-aos="zoom-in-down" data-aos-duration="1500">
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
    </div>

    <div class="box3">
      <div class="traffic" data-aos="fade-left" data-aos-duration="1500">
        <p class="title">{{ $t('msg.getToken') }}</p>
        <ul>
          <li>
            <span>{{ $t('msg.currentStage') }}：</span>
            <b>1USDT={{ CurrentStage }} DAC </b>
          </li>
          <li>
            <span>{{ $t('msg.Remaining') }}：</span>
            <b>{{ remaining }} DAC</b>
          </li>
        </ul>
        <div>
          <input type="number" min="1" v-model="value" />
          <span>USDT</span>
        </div>
        <ul>
          <li>
            <span>{{ $t('msg.ObtainedToken') }}：</span>
            <b>{{ ObtainedToken }} DAC</b>
          </li>
          <li>
            <span>{{ $t('msg.TokenBalance') }}：</span>
            <b>{{ balance }} DAC</b>
          </li>
          <li>
            <span>{{ $t('msg.AccountBalance') }}：</span>
            <b>{{ usdt }}USDT</b>
          </li>
        </ul>
        <div class="btn" @click="buy">{{ $t('msg.buy') }}</div>
        <!-- <div class="btn hui" v-if="remaining == 0">{{ $t('msg.ForTheEnd') }}</div>
        <div class="btn" v-else-if="countDown <= 0" @click="buy">{{ $t('msg.buy') }}</div>
        <div class="btn" v-else-if="countDown > 0">{{ $t('msg.AfterTheStart') }}{{ updateTime }}</div> -->
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
            <span class="copyaddress">{{ getUrl }}</span>
          </li>
          <li>
            <p>{{ $t('msg.myAddress') }}：</p>
            <span>{{ addres }}</span>
          </li>
          <li></li>
        </ul>
        <div class="btn copy_btn" :data-clipboard-text="getUrl" @click="copy">
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
        <ul v-for="(item, index) in dailyList" :key="index">
          <li>{{ index + 1 }}</li>
          <li>{{ Number(item.amount).toFixed(2) }}</li>
          <li>{{ item.uid }}</li>
        </ul>
        <div class="btn" @click="linkAward">{{ $t('msg.ViewYesterdays') }}</div>
      </div>
      <h4 data-aos="fade-up">{{ $t('msg.Statistics') }}</h4>
      <div class="statistical" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
        <p>{{ $t('msg.MyLevel') }}：V{{ userInfo.level || 0 }}</p>
        <div class="earnings">
          <div class="left">
            <p>{{ $t('msg.UnsettledEarnings') }}</p>
            <p>USDT：{{ Number(userInfo.balance).toFixed(2) }}</p>
            <p>
              DAC：{{ balance }} <span @click="jiesuan">{{ $t('msg.balance') }}</span>
            </p>
          </div>
          <div class="right">
            <p>{{ $t('msg.CashableIncome') }}</p>
            <p>USDT：{{ Number(usdtamount).toFixed(2) }}</p>
            <p>DAC：{{ Number(vaneamount).toFixed(2) }}</p>
          </div>
        </div>
        <div class="list-ul">
          <ul>
            <li>
              <p>{{ $t('msg.StaticIncome') }}</p>
              <span>{{ Number(userInfo.staticincome).toFixed(2) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.DynamicIncome') }}</p>
              <span>{{ (Number(userInfo.levelreward) + Number(userInfo.smallreward)).toFixed(2) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.SettledIncome') }}</p>
              <span>{{ Number(userInfo.withdrawalbalance).toFixed(2) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.outNeeds') }}</p>
              <span>{{ Number(userInfo.surplususdt).toFixed(2) }} USDT</span>
            </li>
            <li>
              <p>{{ $t('msg.TotalTSokenSales') }}</p>
              <span>{{ Number(balance21W).toFixed(2) }}DAC</span>
            </li>
            <li>
              <p>{{ $t('msg.TotalNumberBurned') }}</p>
              <span>{{ totalBurned }} DAC</span>
            </li>
            <li>
              <p>{{ $t('msg.EntryFundsToday') }}</p>
              <span>{{ Number(dailyUsdt).toFixed(2) }} USDT</span>
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
            <li @click="hysj()" ref="hysj">>{{ $t('msg.hysj') }}</li>
            <li @click="join()">
              <!-- <li @click="join()"> -->
              <span>{{ $t('msg.jrwmdb') }}</span>
              <img src="../../assets/xfj.png" alt="" />
            </li>
          </ul>
          <!-- <p @click="dialogVisible = true">{{ $t('msg.logo') }}</p> -->
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
import Language from './Language'
import Airdrop from './Airdrop'
import {
  getUserInfo,
  newPlay,
  getDailyList,
  pay,
  dataoog,
  dataoogOk,
  updateUserVance,
  DataoogTest,
  getFuturePool,
  getDailyUsdt,
  getOpenTime
} from '@/api/user.js'
import liCaiAbi from '../../api/liCaiAbi'
import config from '../../config'
const { USDT_contract_address, token_contract_address, licai_contract_address } = config
export default {
  computed: {
    getUrl() {
      return `${window.location.origin}/#/?Invited=${this.addres}`
    }
  },
  components: { DownTime, Language, Airdrop },
  data() {
    return {
      balance21W: '',
      totalBurned: '',
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
      usdt: '0.00',
      ObtainedToken: '0.00',
      usdtValue: '',
      activeNames: ['1'],
      CurrentStage: 0,
      remaining: 0,
      menuShow: false,
      timer: null, // 定时器名称
      timer2: null,
      updateTime: '',
      userInfo: {},
      dailyList: [],
      dailyUsdt: '',
      OpenTime: '',
      flag: false,
      timer3: null,
      timer4: null,
      web3: null,
      hashConfig: {
        conduct: [],
        settlement: []
      },
      interValTimer: null
    }
  },
  watch: {
    value: {
      handler(val) {
        this.ObtainedToken = this.CurrentStage * val
      }
    }
  },
  created() {
    this.getDailyList()
    // this.DataoogTest()
    this.getFuturePool()
    this.getDailyUsdt()
    this.getOpenTime()
  },
  mounted() {
    if (this.$route.query.a) {
      new VConsole()
    }
    AOS.init()
    NCWeb3.Init(addr => {
      // 得到相应的钱包地址
      // this.addres = addr
      // localStorage.setItem('addres', addr)
    })
    this.initHashConfig()
    this.getToken()
    this.initGetToken()
    document.addEventListener('visibilitychange', () => {
      let state = document.visibilityState
      state === 'visible' ? this.initGetToken() : clearInterval(this.timer)
    })
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer)
    })

    // this.getDownTime()
  },
  methods: {
    goAirdrop() {
      this.$router.push({
        path: '/airdrop'
      })
    },
    goMdex() {
      location.href = 'https://mdex.com'
    },
    goMdex1() {
      location.href =
        'https://ht.mdex.com/?utm_source=tokenpocket#/swap?inputCurrency=0xa71EdC38d189767582C38A3145b5873052c3e47a&outputCurrency=0x4619A5a1c4e6F35455781Bb7675d4D8D0e67F4F2'
    },
    getDownTime() {
      this.getTime()
      this.timer2 = setInterval(() => {
        setTimeout(this.update, 0)
      }, 1000)
    },
    initGetToken() {
      this.timer = setInterval(() => {
        setTimeout(this.getToken, 0)
      }, 100 * 60)
    },
    getOpenTime() {
      getOpenTime()
        // id=1的是每日开奖时间   2: 72小时开奖时间
        .then(res => {
          res.result.map(item => {
            if (item.id === 2) {
              this.OpenTime = Number(item.opentime) * 1000
              this.flag = true
            }
          })
          // console.log('倒计时：：', this.OpenTime)
        })
        .catch(res => {
          // console.log(res)
        })
    },
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
    initHashConfig() {
      let hashConfig = localStorage.getItem('hashConfig')
      this.hashConfig = hashConfig ? JSON.parse(hashConfig) : { conduct: [], settlement: [] }
      this.interValUpdateHash()
    },
    interValUpdateHash() {
      if (this.interValTimer) clearInterval(this.interValTimer)
      const { conduct, settlement } = this.hashConfig
      if (conduct.length || settlement.length) {
        this.interValTimer = setInterval(() => {
          if (conduct.length) {
            this.getConductStatus(1)
          }
          if (settlement.length) {
            this.getConductStatus(2)
          }
          if (!this.hashConfig.conduct.length && !this.hashConfig.settlement.length) {
            clearInterval(this.interValTimer)
          }
        }, 1000)
      } else {
        clearInterval(this.interValTimer)
      }
    },
    async getConductStatus(type) {
      let key = type === 1 ? 'conduct' : 'settlement'
      let len = this.hashConfig[key].length
      if (!len) return
      await this[type === 1 ? 'initLiCaiWeb3' : 'initJieSuanWeb3']()
      let web3 = type === 1 ? this.web3 : this.web3One
      for (var i = 0; i < len; i++) {
        let res = await web3.eth.getTransactionReceipt(this.hashConfig[key][i].hash)
        if (!res) return
        if (res.status) {
          if (this.reloadStatus) return
          this.reloadStatus = true
          let result = null
          if (type === 1) {
            result = await this.pay(this.hashConfig[key][i])
            this.hashConfig[key] = []
            localStorage.setItem('hashConfig', JSON.stringify(this.hashConfig))
            this.reloadStatus = false
          } else {
            const { address, amount, vaneamount } = this.hashConfig[key][i]
            result = await dataoogOk({ address, amount, vaneamount })
            if (result.code === 200) {
              this.hashConfig[key] = []
              localStorage.setItem('hashConfig', JSON.stringify(this.hashConfig))
            }
            this.reloadStatus = false
          }
        } else {
          // if (type === 2) {
          //   await unLockUser({ id: this.userInfo.id })
          // }
          this.hashConfig[key] = []
          localStorage.setItem('hashConfig', JSON.stringify(this.hashConfig))
          this.reloadStatus = false
        }
      }
    },
    addHashConfig(params, type) {
      params.time = ~~(new Date() / 1000)
      this.hashConfig[type === 1 ? 'conduct' : 'settlement'] = [params]
      localStorage.setItem('hashConfig', JSON.stringify(this.hashConfig))
      this.interValUpdateHash()
    },
    initLiCaiWeb3() {
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
      this.web3 = web3
      return { licai, usdtContract }
    },
    initJieSuanWeb3() {
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
      this.web3One = web3
      return { licai, vaneContract }
    },
    async licai() {
      if (!this.usdtValue) return
      const { licai, usdtContract } = this.initLiCaiWeb3()
      if (this.hashConfig.conduct.length || this.timer3) return
      await this.getConductStatus(1)
      this.timer3 = null
      // this.timer3 = setTimeout(() => {
      //   this.timer3 = null
      // }, 15000)

      const usdtValue = this.usdtValue * 1000000000000000000
      let payusdtValue = this.usdtValue
      this.usdtValue = ''
      let params = {
        address: this.addres,
        amount: payusdtValue,
        parentaddress: this.$route.query.Invide
      }

      try {
        const usdtRes = await usdtContract.methods.balanceOf(this.addres).call()
        //余额不足
        if (Number(usdtRes) < Number(usdtValue)) {
          this.$alert('<b class="success">' + this.$t('msg.notSufficientFunds') + '</b>', {
            showClose: false,
            showConfirmButton: false,
            dangerouslyUseHTMLString: true,
            closeOnClickModal: true
          })
          this.timer3 = null
          return
        }
        // 查看授权额度
        const allowance = await usdtContract.methods.allowance(this.addres, licai_contract_address).call()
        //额度不足，授权
        if (Number(allowance) < Number(usdtValue)) {
          await usdtContract.methods
            .approve(licai_contract_address, '100000000000000000000000000')
            .send({ from: this.addres, gas: 316250 })
        }
        //支付
        //const { transactionHash } = await
        licai.methods
          .play(BigNumber(usdtValue).toString(10), this.userInfo.level)
          .send({ from: this.addres, gas: 316250 }, async (err, result) => {
            if (err) return
            params.hash = result
            this.addHashConfig(params, 1)
          })
      } catch (error) {
        this.timer3 = null
        console.log(error)
      }
    },
    toNonExponential(num) {
      var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
      return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
    },
    pay({ address, hash, amount, parentaddress }) {
      const params = {
        address,
        amount,
        hah: hash,
        parentaddress
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
    async jiesuan() {
      const { licai, vaneContract } = this.initJieSuanWeb3()

      if (this.hashConfig.settlement.length) return
      await this.getConductStatus(2)
      if (this.timer4) return
      this.timer4 = setTimeout(() => {
        this.timer4 = null
      }, 15000)
      const params = {
        address: localStorage.getItem('addres'),
        amount: this.userInfo.balance,
        vaneamount: this.userInfo.vanecount
      }

      const {
        code,
        result: { usdtamount, vaneamount }
      } = await dataoog(params)
      if (code !== 200) return
      if (usdtamount < 0.1) return
      this.usdtamount = usdtamount
      this.vaneamount = vaneamount

      const usdtValue = this.usdtamount * 1000000000000000000
      const vaneValue = this.vaneamount * 1000000000000000000

      const vaneRes = await vaneContract.methods.balanceOf(this.addres).call()

      try {
        if (Number(vaneRes) < Number(vaneValue)) {
          this.$alert('<b class="success">' + this.$t('msg.notSufficientFunds') + '</b>', {
            showClose: false,
            showConfirmButton: false,
            dangerouslyUseHTMLString: true,
            closeOnClickModal: true
          })
          this.timer4 = null
          return
        }

        //查看授权额度
        const allowRes = await vaneContract.methods.allowance(this.addres, licai_contract_address).call()
        //额度不足，授权
        if (Number(allowRes) < Number(usdtValue)) {
          await vaneContract.methods
            .approve(licai_contract_address, '100000000000000000000000000')
            .send({ from: this.addres })
        }
        //直接支付
        //const { transactionHash } = await
        licai.methods
          .settlement(BigNumber(usdtValue).toString(10))
          .send({ from: localStorage.getItem('addres'), gas: 316250 }, async (err, result) => {
            if (err) return
            params.hash = result
            console.log(params)
            this.addHashConfig(params, 2)
          })
      } catch (error) {
        // await unLockUser({ id: this.userInfo.id })
        console.log(error)
      }
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
            console.log(res)
            this.dailyList = res.result
          }
        })
        .catch(res => {})
    },
    newPlay() {
      //   var str = window.location.href

      //   let parentaddress = ''
      //   if (str.indexOf('Invited') != -1) {
      //     parentaddress = str.split('=')[1].split('#')[0]
      //   } else {
      //     parentaddress = ''
      //   }
      const params = {
        address: localStorage.getItem('addres'),
        parentaddress: this.$route.query.Invited || ''
      }
      newPlay(params)
        .then(res => {
          if (res.code === 200) {
            this.getUserInfo()
          }
        })
        .catch(res => {})
    },
    getDailyUsdt() {
      getDailyUsdt()
        .then(res => {
          // 今日入场资金
          this.dailyUsdt = res.result.dailyUsdt
        })
        .catch(res => {
          // console.log(res)
        })
    },
    async buy() {
      if (this.value > 1500) {
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

      try {
        const usdtRes = await usdtContract.methods.balanceOf(this.addres).call()
        if (usdtRes < Number(usdtValue)) {
          this.$alert('<b class="success">' + this.$t('msg.notSufficientFunds') + '</b>', {
            showClose: false,
            showConfirmButton: false,
            dangerouslyUseHTMLString: true,
            closeOnClickModal: true
          })
          return
        }

        // 查看授权额度
        const allowRes = await usdtContract.methods.allowance(this.addres, token_contract_address).call()
        if (allowRes < usdtValue) {
          await usdtContract.methods
            .approve(token_contract_address, '100000000000000000000000000')
            .send({ from: this.addres, gas: 316250 })
        }
        const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)
        await vaneContract.methods
          .buyCoinByUsdt(BigNumber(usdtValue).toString(10))
          .send({ from: this.addres, gas: 316250 })
      } catch (error) {
        console.log(error)
      }
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
      // const web3 = new Web3(web3Provider)
      // const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)
      // // 倒计时
      // vaneContract.methods.canBuyTime().call((error, result) => {
      //   if (!error) {
      //     this.$nextTick(() => {
      //       this.countDown = result - new Date().getTime() / 1000
      //       if (this.countDown > 0) {
      //         this.updateTime = this.secondToDate(result - new Date().getTime() / 1000)
      //         this.update()
      //       } else {
      //         this.countDown = 0
      //         clearInterval(this.timer2)
      //         this.timer2 = null
      //       }
      //     })
      //   }
      // })
    },
    update() {
      this.countDown -= 1
      // console.log('时间:', this.countDown)

      if (this.countDown > 0) {
        this.updateTime = this.secondToDate(this.countDown)
      } else {
        clearInterval(this.timer2)
        this.timer2 = null
      }
      this.countDown -= 1
      // console.log('时间:', this.countDown)

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
      this.$refs.github.style.color = '#0de5f6'
      window.open(location.origin)
      // window.open('https://github.com/shamingdouyiyang/vane/tree/main/abi')
    },
    exchange() {
      this.$refs.exchange.style.color = '#0de5f6'
      // window.open('https://exchange.pancakeswap.finance/#/swap')
    },
    hysj() {
      this.$refs.hysj.style.color = '#0de5f6'
      window.open(location.origin)
      // window.open('https://all-app.oss-cn-shenzhen.aliyuncs.com/app/vaneapp/vane.pdf')
    },
    join() {
      // window.open('https://t.me/vane369')
      window.open(location.origin)
      this.$refs.join.style.color = 'red'
    },
    downloadCodeImg(num) {
      var a = document.createElement('a')
      a.download = name || 'logo'
      a.href = require('../../assets/logo' + num + '.png')
      a.click()
    },

    changeLanguage(type) {
      // console.log(type)
      // 将用户设置存储到localStorage以便用户下次打开时使用此设置
      localStorage.setItem('Language', type)
      this.$i18n.locale = type
    },
    async getToken() {
      var Web3 = require('web3')
      var web3Provider
      if (window.ethereum) {
        web3Provider = window.ethereum
      } else if (window.web3) {
        web3Provider = window.web3.currentProvider
      } else {
        web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
      }
      const web3 = new Web3(web3Provider) // web3就是你需要的web3实例
      const [accountAddress] = await web3.eth.getAccounts()
      this.addres = accountAddress
      localStorage.setItem('addres', accountAddress)
      this.getUserInfo()

      let address = localStorage.getItem('addres')
      if (!address) return

      // 创建web3对象并连接到以太坊节点
      const usdtContract = new web3.eth.Contract(usdtAbi, USDT_contract_address)
      const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)

      this.usdtDecimals = await usdtContract.methods.decimals().call()

      this.vaneDecimals = await vaneContract.methods.decimals().call()

      const price = await vaneContract.methods.usdtPrice().call()
      this.CurrentStage = 1 / (+price / Math.pow(10, 18))

      const canBuyCount = await vaneContract.methods.canBuyCount().call()

      //本阶段剩余额度
      this.remaining = (canBuyCount / Math.pow(10, this.vaneDecimals)).toFixed(2)
      // 2100W  通证销售总数
      const balanceOf = await vaneContract.methods
        .balanceOf('0xf8b233A17dece3dB1Ac3a41919Faa22d4224537f')
        .call({ from: '0xf8b233A17dece3dB1Ac3a41919Faa22d4224537f' })
      this.balance21W = 11000000 - balanceOf / Math.pow(10, this.vaneDecimals)

      // 通证焚毀总数
      const totalBurned = await vaneContract.methods
        .balanceOf('0x0000000000000000000000000000000000000000')
        .call({ from: address })
      this.totalBurned = (totalBurned / Math.pow(10, this.vaneDecimals)).toFixed(2)

      //账户余额
      const usdt = await usdtContract.methods.balanceOf(address).call({ from: address })
      this.usdt = (usdt / Math.pow(10, this.usdtDecimals)).toFixed(2)

      //通证余额
      const balance = await vaneContract.methods.balanceOf(address).call({ from: address })
      this.balance = (balance / Math.pow(10, this.vaneDecimals)).toFixed(2)
      if (this.flag1) return
      await updateUserVance({
        address: address,
        amount: this.balance
      })
      this.flag1 = true
    },
    linkEarnings() {
      this.$router.push({ path: '/earnings' })
    },
    linkAward() {
      this.$router.push({ path: '/award' })
    },
    handleChange(val) {
      // console.log(val)
    },
    changeUsdt(item, index) {
      this.currentIndex = index
      const config = [0.25, 0.5, 0.75, 1]
      this.usdtValue = parseInt(this.usdt * config[index])
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
    background: #2a2a2a;
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
    // background: #18161f;
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
      // background-image: url('../../assets/bj.png');
      height: 516px;
      background-size: 100% 100%;
      img {
        width: 456px;
        height: 482px;
        margin-top: 60px;
      }
    }
    .slogan {
      font-size: 44px;
      color: #eecd96;
      margin-bottom: 17px;
    }
    .description {
      font-size: 32px;
      color: #ffffff;
      margin-bottom: 61px;
    }
    .smart {
      font-size: 48px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #0debfc;
      line-height: 67px;
      margin-top: 152px;
    }
    .header-btn {
      margin: 0 auto;
      display: flex;
      // width: 1200px;
      justify-content: space-around;
      .get-btn {
        width: 264px;
        height: 131px;
        background: url('../../assets/btn.png');
        background-size: 100% 100%;
        border-radius: 10px;
        text-align: center;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #1c1c1c;
        line-height: 131px;
        // margin: 46px auto 16px auto;
        border-radius: 45px;
      }
    }
    .meetExplain {
      margin-bottom: 86px;
      text-align: left;
      padding: 0 40px;
    }
    .des {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      color: #b8b8b8;
      line-height: 28px;
      margin: 35px 0 59px 0;
    }
    .feat {
      margin-top: 104px;
      color: #eecd96;
      font-size: 50px;
    }
    // p:nth-child(2) {
    //   font-size: 32px;
    //   margin-top: 24px;
    // }
    // p:nth-child(3) {
    //   margin-top: 52px;
    //   font-weight: 700;
    //   color: #0debfc;
    //   font-size: 50px;
    // }
    p:nth-child(3) {
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
      width: 560px;
      height: 459px;
      background-size: 100% 100%;
      border-radius: 16px;
      margin: 0 auto;
      overflow: hidden;
      > p {
        color: #fff;
        font-weight: 700;
        font-size: 30px;
        margin: 40px 0;
        margin-bottom: 90px;
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
        height: 85px;
        line-height: 95px;
        background: url('../../assets/btn1.png');
        background-size: 100% 100%;
        color: #1c1c1c;
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
      margin: 0 auto 80px;
      width: 100%;
      width: 670px;
      background: #2a2a2a;
      border-radius: 15px;
      padding: 40px 28px;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        color: #fff;
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
          border: 2px solid #dabd8b;
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
          height: 75px;
          border-radius: 4px;
          border: 1px solid#DABD8B;
          cursor: pointer;
          color: #dabd8b;
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
        color: #b2b2b2;
        li {
          line-height: 38px;

          b {
            color: #fff;
          }
        }
      }
      .btn {
        margin: 80px auto 40px;
        width: 614px;
        line-height: 90px;
        background: url('../../assets/btn3.png');
        background-size: 100% 100%;
        border-radius: 40px;
        font-size: 30px;
        color: #1c1c1c;
        cursor: pointer;
        transition: all 0.5s;
      }
      .btn:hover {
        transform: scale(1.2);
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
      margin: 40px auto 0;
      width: 100%;
      background: #2a2a2a;
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
          height: 75px;
          border-radius: 4px;
          border: 1px solid#DABD8B;
          cursor: pointer;
          color: #dabd8b;
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
        font-size: 16px;
        color: #b2b2b2;
        li {
          line-height: 38px;

          b {
            color: #fff;
          }
        }
      }
      .btn {
        margin: 32px auto 40px;
        width: 614px;
        line-height: 90px;
        background: url('../../assets/btn3.png');
        background-size: 100% 100%;
        border-radius: 40px;
        font-size: 30px;
        color: #1c1c1c;
      }
      .hui {
        line-height: 80px;
        background: #909399;
        color: #fff;
      }
    }
    .link {
      margin: 80px auto;
      width: 100%;
      background: #2a2a2a;
      border-radius: 15px;
      padding: 40px 28px;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        color: #dabd8b;
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
            color: #dabd8b;
            margin-bottom: 40px;
          }
        }
      }
      .btn {
        margin: 56px auto 40px;
        width: 614px;
        height: 80px;
        line-height: 90px;
        background-image: url('../../assets/btn3.png');
        background-size: 100% 100%;
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
      background: #2a2a2a;
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
      background: #2a2a2a;
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
        border: 2px solid #dabd8b;
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
      background: #2a2a2a;
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
        border-radius: 8px;
        margin: auto;
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 20px;
        border: 1px solid #dabd8b;
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
              min-width: 108px;
              height: 40px;
              line-height: 40px;
              background: #dabd8b;
              color: #2a2a2a;
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
            color: #b2b2b2;
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
              color: #b2b2b2;
              padding: 44px 0 18px 0;
              margin: 0;
            }
            span {
              color: #fff;
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
        border: 2px solid #d3ab5f;
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
          background: #2a2a2a;
          text-align: left;
          font-size: 26px;
          border: none;
          border-radius: 8px;
        }
        .el-collapse-item__header.is-active {
          color: #d3ab5f;
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
        margin-top: 69px;
        width: 146px;
        height: 152px;
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
          background: #043295;
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
  background: #2a2a2a;
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
