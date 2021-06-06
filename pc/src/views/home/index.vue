<template>
  <div class="home">
    <Language />
    <Airdrop :address="addres" />
    <div class="box1">
      <!-- <p>{{ $t('first.title') }}</p> -->
      <div data-aos="fade-up" data-aos-duration="3000">
        <div class="img"><img src="../../assets/lh.png" alt="" /></div>
        <!-- 有史以来第一次 -->
        <div class="slogan">{{ $t('msg.firstTime') }}</div>
        <div class="description">STAKING GROWT</div>
        <!-- <div class="smart">
          {{ $t('msg.contract') }}
        </div> -->
        <div class="header-btn">
          <div class="get-btn" @click="goAirdrop">{{ $t('msg.receiveAirdrop') }}</div>
          <div class="get-btn" @click="goMdex1">{{ $t('msg.exchangeDAC') }}</div>
          <div class="get-btn" @click="goMdex">{{ $t('msg.exchangeWDAC') }}</div>
        </div>
        <p class="feat">{{ $t('msg.meet') }}</p>
        <p class="des">
          {{ $t('msg.meetExplain') }}
        </p>
      </div>
    </div>
    <div class="box2">
      <div class="count" data-aos="zoom-in-up" data-aos-duration="3000">
        <p>{{ $t('msg.countdown') }}</p>
        <DownTime v-if="flag" :endTime="OpenTime" :startTime="new Date().getTime()" :endMsg="endMsg"> </DownTime>

        <div class="btn">{{ Number(amount).toFixed(2) }} USDT</div>
      </div>

      <h4 data-aos="fade-up" data-aos-duration="3000">{{ $t('msg.participate') }}</h4>
      <p data-aos="fade-up">
        {{ $t('msg.participateExplain1') }}
        <br />
        {{ $t('msg.participateExplain2') }}
        <br />{{ $t('msg.participateExplain3') }}
      </p>
      <div class="traffic" data-aos="zoom-in-down" data-aos-duration="3000">
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
      <div class="traffic" data-aos="fade-left" data-aos-duration="3000">
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
          <input min="1" type="number" v-model="value" />
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
        <div class="btn hui" v-if="remaining == 0">{{ $t('msg.ForTheEnd') }}</div>
        <div class="btn" v-else-if="countDown <= 0" @click="buy">{{ $t('msg.buy') }}</div>
        <div class="btn" v-else-if="countDown > 0">{{ $t('msg.AfterTheStart') }}{{ updateTime }}</div>
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
          <img src="../../assets/foot.png" alt="" />
          <ul>
            <li>2021&copy;{{ $t('msg.yhzj') }}</li>
            <li @click="hysj()" ref="hysj">{{ $t('msg.hysj') }}</li>
            <li @click="join()">
              <img class="xfj" src="../../assets/xfj.png" alt="" />
              <span ref="join">{{ $t('msg.jrwmdb') }}</span>
            </li>
          </ul>
          <ul class="footul">
            <li @click="github"><img src="../../assets/git.png" alt="" /> <span ref="github">Github</span></li>
            <li></li>
            <!-- <li @click="exchange" ref="exchange">exchange</li> -->
            <li></li>
            <!-- <li @click="dialogVisible = true">
              {{ $t('msg.logo') }}
            </li> -->
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
  getOpenTime,
  lockUser,
  unLockUser
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
  //   mixins: [mixins],
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
      interValTimer: null,
      reloadStatus: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.ObtainedToken = this.CurrentStage * val
        // console.log(BigNumber(this.CurrentStage * val))
      }
    }
  },
  async mounted() {
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

    this.getDownTime()
  },
  created() {
    this.getDailyList()
    // this.DataoogTest()
    this.getFuturePool()
    this.getDailyUsdt()
    this.getOpenTime()
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
    initGetToken() {
      this.timer = setInterval(() => {
        setTimeout(this.getToken, 0)
      }, 100 * 60)
    },
    getDownTime() {
      this.getTime()
      this.timer2 = setInterval(() => {
        setTimeout(this.update, 0)
      }, 1000)
    },
    getOpenTime() {
      getOpenTime()
        // id=1的是每日开奖时间   2: 72小时开奖时间
        .then(res => {
          res.result.map(item => {
            if (item.id == 2) {
              this.OpenTime = Number(item.opentime) * 1000
              // this.OpenTime = 1615816719060
              // console.log('当前：', new Date().getTime())
              // console.log('后台：', this.OpenTime)
              // console.log('后2：', this.OpenTime - new Date().getTime())
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
      console.log(this.hashConfig)
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
      return { licai, usdtContract, web3 }
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
      const { licai, usdtContract, web3 } = this.initLiCaiWeb3()
      if (this.hashConfig.conduct.length) return
      if (this.timer3) return
      await this.getConductStatus(1)
      this.timer3 = setTimeout(() => {
        this.timer3 = null
      }, 15000)

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
        // const { transactionHash } = await
        licai.methods
          .play(BigNumber(usdtValue).toString(10), this.userInfo.level)
          .send({ from: this.addres, gas: 316250 }, async (err, result) => {
            if (err) return
            params.hash = result
            this.addHashConfig(params, 1)
          })
      } catch (error) {
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

      if (this.hashConfig.settlement.length || this.timer4) return
      await this.getConductStatus(2)
      this.timer4 = true
      const params = {
        address: this.addres,
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
        this.timer4 = null
        console.log(error)
      }
    },
    async dataoog() {
      const {
        code,
        result: { usdtamount, vaneamount }
      } = await dataoog({
        address: localStorage.getItem('addres'),
        amount: this.userInfo.balance,
        vaneamount: this.userInfo.vanecount
      })
      if (code === 200) {
        // this.dailyList = res.result
        this.usdtamount = usdtamount
        this.vaneamount = vaneamount
      }
    },
    async getDailyList() {
      const { code, result } = await getDailyList()
      if (code === 200) {
        this.dailyList = result
      }
    },
    async newPlay() {
      const { code } = await newPlay({
        address: localStorage.getItem('addres'),
        parentaddress: this.$route.query.Invited || ''
      })
      if (code === 200) {
        this.getUserInfo()
      }
    },
    async getDailyUsdt() {
      const {
        result: { dailyUsdt }
      } = await getDailyUsdt()
      // 今日入场资金
      this.dailyUsdt = dailyUsdt
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
      if (window.web3) {
        web3Provider = window.web3.currentProvider
      } else {
        web3Provider = new Web3.providers.HttpProvider('http://localhost:9020')
      }
      // else if (window.ethereum) {
      //   web3Provider = window.ethereum
      // }
      // const web3 = new Web3(web3Provider)
      // const vaneContract = new web3.eth.Contract(vaneAbi, token_contract_address)
      // 倒计时
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
      window.open(location.origin)
      // window.open('https://t.me/vane369')
      this.$refs.join.style.color = '#0de5f6'
    },
    async getToken() {
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
          // console.error('User denied account access')
        }
      } else if (window.Web3) {
        // 老版 MetaMask Legacy dapp browsers...
        web3Provider = window.Web3.currentProvider
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
    downloadCodeImg(num) {
      var a = document.createElement('a')
      a.download = name || 'logo'
      a.href = require('../../assets/logo' + num + '.png')
      a.click()
    },
    handleChange(val) {},
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
    .slogan {
      font-size: 44px;
      color: #eecd96;
      margin-bottom: 17px;
    }
    .description {
      font-size: 32px;
      color: #ffffff;
    }
    .img {
      width: 653px;
      height: 678px;
      margin: 0 auto;
      img {
        height: 100%;
      }
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
      width: 1200px;
      justify-content: space-around;
      .get-btn {
        width: 365px;
        height: 156px;
        background: url('../../assets/btn.png');
        background-size: 100% 100%;
        border-radius: 10px;
        text-align: center;
        line-height: 91px;
        font-size: 38px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #1c1c1c;
        line-height: 156px;
        margin: 16px auto 16px auto;
        border-radius: 45px;
        cursor: pointer;
      }
    }

    .des {
      max-width: 1200px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      color: #b8b8b8;
      line-height: 28px;
      margin: 35px auto 59px auto;
    }
    .feat {
      margin-top: 82px;
      color: #eecd96;
      font-size: 50px;
    }
    // p:first-child {
    //   // font-size: 60px;
    //   // font-weight: 700;
    //   font-size: 32px;
    //   margin-top: 40px;
    // }
    // p:nth-child(2) {
    //   margin-top: 104px;
    //   font-weight: 700;
    //   color: #0debfc;
    //   font-size: 50px;
    // }
    // p:nth-child(3) {
    //   margin-top: 104px;
    //   font-weight: 700;
    //   color: #EECD96;
    //   font-size: 50px;
    // }
    p:nth-child(3) {
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
      width: 561px;
      height: 459px;
      // background: url('../../assets/count.png');
      background-size: 100% 100%;

      border-radius: 16px;
      margin: 0 auto;
      overflow: hidden;
      > p {
        color: #fff;
        margin-top: 34px;
        font-weight: 700;
        font-size: 30px;
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
          background: #205cdf;
          text-align: center;
          color: #fff;
          font-size: 30px;
        }
      }
      .btn {
        height: 60px;
        line-height: 70px;
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
      width: 1200px;
      background: #2a2a2a;
      border-radius: 15px;
      padding: 34px 80px 40px;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        color: #fff;
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
          line-height: 77px;
          height: 77px;
          color: #eecd96;
          border-radius: 4px;
          border: 1px solid #eecd96;
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
          border: 2px solid #d3ab5f;
          cursor: pointer;
        }
        .current {
          border: 2px solid #eecd96;
          color: #eecd96;
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
        width: 650px;
        line-height: 90px;
        height: 80px;
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
      margin: 0px auto 80px;
      width: 1200px;
      background: #2a2a2a;
      border-radius: 15px;
      padding: 34px 80px 40px;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        color: #eecd96;
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
          height: 77px;
          color: #eecd96;
          border-radius: 4px;
          border: 1px solid#EECD96;
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
        color: #b2b2b2;
        li {
          line-height: 38px;

          b {
            color: #fff;
          }
        }
      }
      .btn {
        margin: 76px auto 40px;
        width: 650px;
        line-height: 90px;
        height: 80px;

        background: url('../../assets/btn3.png');
        background-size: 100% 100%;
        border-radius: 40px;
        font-size: 30px;
        color: #1c1c1c;
        cursor: pointer;
        transition: all 0.5s;
      }
      .hui {
        line-height: 80px !important;
        background: #909399;
        color: #fff;
      }
      .btn:hover {
        transform: scale(1.2);
      }
    }
    .link {
      margin: 0 auto 80px;
      width: 1200px;
      background: #2a2a2a;
      border-radius: 15px;
      padding: 34px 80px 40px;
      box-sizing: border-box;
      .title {
        font-weight: 700;
        color: #eecd96;
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
            color: #eecd96;
          }
        }
      }
      .btn {
        margin: 56px auto 40px;
        width: 650px;
        line-height: 90px;
        height: 80px;
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
      background: #2a2a2a;
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
        border: 2px solid #d3ab5f;
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
      background: #2a2a2a;
      border-radius: 15px;
      margin: auto;
      p:first-child {
        margin: 40px 0;
        font-weight: 700;
        color: #eecd96;
      }
      .earnings {
        width: 1040px;
        border: 1px solid #d3ab5f;
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
              background: #c39e5a;
              border-radius: 4px;
              display: inline-block;
              margin-left: 58px;
              text-align: center;
              font-size: 16px;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.5s;
              color: #1c1c1c;
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
              color: #b2b2b2;
              margin: 28px 0 16px 0;
            }
            span {
              color: #ffffff;
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
          background: #2a2a2a;
          text-align: left;
          font-weight: 700;
          font-size: 20px;
          line-height: 28px;
          border: none;
          border-radius: 8px;
        }
        .el-collapse-item__header.is-active {
          color: #eecd96;
          .el-collapse-item__wrap {
            border-color: #2a2a2a;
            background-color: none;
          }
        }
      }
      .el-collapse-item__content {
        font-size: 16px;
        background: #2a2a2a;
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
        background: #2a2a2a;
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
          width: 104px;
          height: 108px;
          margin-bottom: 14px;
        }
        ul {
          width: 100%;
          height: auto;
          display: flex;
          margin-bottom: 20px;
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
