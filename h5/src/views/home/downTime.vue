<template>
  <!-- 倒计时组件 -->
  <div class="downTime-wrapper">
    <!-- 这里是显示还未结束时的内容，这里只是我这得布局，你可以随意。 -->
    <div class="time" v-show="!isShow">
      <!-- <span class="hour">{{myDay}}</span> : -->
      <div class="hour">
        <span>{{ getHours1 }}</span>
        <span>{{ getHours2 }}</span>
      </div>
      <span class="dian">:</span>
      <div class="minute">
        <span>{{ getMinutes1 }}</span>
        <span>{{ getMinutes2 }}</span>
      </div>
      <span class="dian">:</span>
      <div class="second">
        <span>{{ getSeconds1 }}</span>
        <span>{{ getSeconds2 }}</span>
      </div>
    </div>
    <!-- 这里是显示结束后的内容 -->
    <span class="second" v-show="isShow">{{ clocker }}</span>
  </div>
</template>
<script>
export default {
  name: 'DownTime',

  props: {
    // 接收父组件传递过来的参数,这里传了  结束时间 - 开始时间 - 结束后显示的内容
    endTime: {
      type: Number
    },
    startTime: {
      type: Number
    },
    endMsg: {
      type: String
    }
  },

  data() {
    return {
      isShow: false, // 控制显示结束或还未结束显示的内容
      clocker: '', // 结束后显示的内容
      timeObj: null, // 时间对象,下方会用到
      myDay: 0, // 我定义来接收计算出来的 天 的
      myHours: 0, // 我定义来接收计算出来的 小时 的
      myMinutes: 0, // 我定义来接收计算出来的 分钟 的
      mySeconds: 0 // 我定义来接收计算出来的 秒钟 的
    }
  },
  computed: {
    getHours1() {
      return this.myHours < 10 ? 0 : parseInt((this.myHours % 100) / 10)
    },
    getHours2() {
      return parseInt(this.myHours % 10)
    },
    getMinutes1() {
      return this.myMinutes < 10 ? 0 : parseInt((this.myMinutes % 100) / 10)
    },
    getMinutes2() {
      return parseInt(this.myMinutes % 10)
    },
    getSeconds1() {
      return this.mySeconds < 10 ? 0 : parseInt((this.mySeconds % 100) / 10)
    },
    getSeconds2() {
      return parseInt(this.mySeconds % 10)
    }
  },
  mounted() {},
  methods: {
    option() {
      // 计算时间差
      let timeLag = (this.endTime - this.startTime) / 1000
      // 判断当前是否时分秒的值是否大于10
      const add = num => {
        return num < 10 ? '0' + num : num
      }
      // 时间倒计时运算的方法
      const timeFunction = () => {
        const time = timeLag--
        this.timeObj = {
          // 时间对象
          seconds: Math.floor(time % 60),
          minutes: Math.floor(time / 60) % 60,
          hours: Math.floor(time / 60 / 60)
          // days: Math.floor(time / 60 / 60 / 24)
        }
        // 计算出时分秒
        this.myDay = `${add(this.timeObj.days)}`
        this.myHours = `${add(this.timeObj.hours)}`
        this.myMinutes = `${add(this.timeObj.minutes)}`
        this.mySeconds = `${add(this.timeObj.seconds)}`
        // 当时间差小于等于0时,停止倒计时
        if (time <= 0) {
          this.isShow = true
          this.clocker = this.endMsg
          clearInterval(go)
        }
      }
      // 开始执行倒计时
      timeFunction()
      // 每一秒执行一次
      const go = setInterval(() => {
        timeFunction()
      }, 1000)
    }
  },
  watch: {
    endTime: {
      handler(newName, oldName) {
        this.option()
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.downTime-wrapper {
  display: inline-block;
  .dian {
    font-weight: bold;
    position: relative;
    top: -5px;
    width: 48px;
    display: inline-block;
  }
  .hour {
    display: inline-block;
    font-size: 36px;
    box-shadow: 0px 2px 28px 0px rgba(245, 221, 106, 0.29);
    span {
      border-radius: 6px;
      color: #fff;
      background: #b60000;
      width: 40px;
      line-height: 80px;
      display: inline-block;
      font-size: 30px;
    }
    span:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      text-align: right;
    }
    span:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      text-align: left;
    }
  }
  .minute {
    display: inline-block;
    font-size: 36px;
    box-shadow: 0px 2px 28px 0px rgba(245, 221, 106, 0.29);
    span {
      border-radius: 6px;
      color: #fff;
      background: #b60000;
      width: 40px;
      line-height: 80px;
      display: inline-block;
      font-size: 30px;
    }
    span:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      text-align: right;
    }
    span:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      text-align: left;
    }
  }
  .second {
    display: inline-block;
    font-size: 36px;
    margin-top: -5px;
    box-shadow: 0px 2px 28px 0px rgba(245, 221, 106, 0.29);
    span {
      border-radius: 6px;
      color: #fff;
      background: #b60000;
      width: 40px;
      line-height: 80px;
      display: inline-block;
      font-size: 30px;
    }
    span:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      text-align: right;
    }
    span:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      text-align: left;
    }
  }
}
</style>
