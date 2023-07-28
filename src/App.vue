<template>
  <lucky-wheel
          ref="myLucky"
          width="300px"
          height="300px"
          :prizes="prizes"
          :blocks="blocks"
          :buttons="buttons"
          @start="startCallback"
          @end="endCallback"
          class="luckyWheel"
  />
</template>

<script>
import axios from 'axios';
import { LuckyWheel } from '@lucky-canvas/vue'
export default {
  name: 'App',
  components: {
    LuckyWheel
  },
  data () {
    return {
      // 背景区域
      blocks: [
        { padding: '10px', background: '#869cfa' }
      ],
      // 奖品列表
      prizes: [],
      // 抽奖按钮
      buttons: [
        { radius: '40%', background: '#617df2' },
        { radius: '35%', background: '#afc8ff' },
        {
          radius: '30%', background: '#869cfa',
          pointer: true,
          fonts: [{ text: '开始', top: '-10px' }]
        }
      ]
    }
  },
  mounted() {
    this.getDrawList();
  },
  methods: {
    /** 获取奖品列表 */
    getDrawList() {
      axios.get('/functions/lotterylist').then((response)=> {
        const resData = response.data.data;
        this.prizes = resData.drawList.map((val, index)=> {
          return {
            background: ((index + 1) % 2) === 0 ? '#e9e8fe' : '#b8c5f2',
            fonts: [{ text: val.text, top: '10px' }]
          }
        })
        console.log('请求成功', response);
      }).catch(function (error) {
        console.log('请求失败', error);
      });
    },
    /** 抽奖 */
    drawLottery() {
      axios.get('/functions/drawlottery').then((response)=> {
        const resData = response.data.data;
        this.$refs.myLucky.stop(resData.drawIndex); // 中奖下标
        console.log('请求成功', response);
      }).catch(function (error) {
        console.log('请求失败', error);
      });
    },
    /*** 点击抽奖按钮会触发start回调 **/
    startCallback () {
      this.$refs.myLucky.play()
      setTimeout(() => {
         this.drawLottery();
      }, 3000)
    },
    // 抽奖结束会触发end回调
    endCallback (prize) {
      console.log(prize)
    },
  }
}
</script>

<style>
  .luckyWheel{
    margin: 200px auto 0;
  }
</style>
