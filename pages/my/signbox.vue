<template>
  <view style="margin-left: 30rpx;">
    <view class="signtitle">
      已获取奖金：<text style="font-size: 48rpx;color: #FF0000;">{{signmoney}}</text>（元）
    </view>
    <view class="timelinebox">
      <view class="timesign">
        今日<text v-if='signcheck'>已</text><text v-else>未</text>签到，已连续签到{{signday}}天
      </view>
      <view class="getmoney">
        <view class="sevenmoney">连续签到7天即可获得现金奖励，可在我的余额进行提现</view>
        <image mode="aspectFit" src="../../static/money7.png" style="width: 136rpx;height: 40rpx" @click="getwithdraw"></image>
      </view>
      <view class="stepsboxs">
        <view class="stepsbox" v-for="(item,index) in sings" :key="index">
          <view class="steps_line "  :class="item.day==0? 'brokenbg':item.day==8?'brokenbg1':''" v-if="index!=0">
          </view>
          <view class="leftsteps ">
            <view class="steps_item " :class="item.day==0? 'broken':item.day==8?'broken1':''">
              <text v-if='item.day==0'>未签</text>
              <text v-if='item.day==8'></text>
              <text v-if='item.day!=8&&item.day!=0'>+{{item.day}}</text>
            </view>
            <view>
              {{item.timeStr}}
            </view>
          </view>
        </view>
      </view>
      <view style="margin-top: 40rpx; text-align: center;">
        <image mode="aspectFit" src="../../static/textsign.png" style="width: 412rpx;height: 76rpx;" @tap="btnclock"></image>
      </view>
    </view>
    <view
      style="margin: 40rpx 0 20rpx;  color: #333333;font-size: 32rpx;font-family: PingFang SC, PingFang SC-Regular;">
      完成任务赚取更多奖金
    </view>
    <view class="missonbgbox">
     <view class="missonbg" v-for="(item,index) in watch" :key='index'>
       <view class="mBgTop">
         <text>{{item.name}}</text>
         <view class="TopMoney">{{item.count_money}}元/<text style="font-size: 26rpx">条</text></view>
       </view>
       <view class="mBgmiddele">
         <view class="mbgmbox" v-for="(n,i) in item.branch" :key='i'>
           {{n}}
         </view>
       </view>
       <view class="mBgbottom">
         <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
             height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
         <text>{{item.username}}·发布者</text>
       </view>
       <view class="btnpos" @click="getTeamdetaill(item.id)">前往完成</view>
     </view>
      </view>
    </view>
  </view>
</template>

<script>
    var http = require("../../utils/http.js");
    var time = require("../../utils/time.js");
  export default {
    data() {
      return {
        sings: [],
        signday:'',
        signmoney:'',
        watch:'',
        signcheck:'',
      }
    },
    onShow() {
    this.getUserList() //获取签到信息
    this.getWatch() //获取下部任务信息
    this.sign() //获取今天是否签到
    },
    methods: {  
      getwithdraw(){
        uni.navigateTo({
          url:"/pages/withdraw/withdraw"
        });
      },
      
      //获取大家都看任务
      getWatch() {
        const that = this;
        var url = 'api/team/everyoneIsWatching';
        let data = {
          openid: uni.getStorageSync('openid')
        }
        http.postReq(url, data, function(res) {
          console.log('Watch', res)
          if (res.code == 200) {
            res.data.forEach(el => {
              el.branch = el.branch.split(',')
            })
            that.watch = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      getTeamdetaill(id) {
        uni.redirectTo({
          url: '/pages/teambox/Teamdetail?id=' + id
        });
      },
      
      getUserList() {
        const that = this
        let url = 'api/users/signUserList'
        let data={
          openid:uni.getStorageSync('openid')
        }
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
              that.sings=res.data.sign.reverse()
              that.signday=res.data.day
              that.signmoney=res.data.money
          } else if (res.code == 400) {
            uni.showToast({
            	title:res.msg,
            	icon:'none',
            })
          }
        });
      },
      // 签到
      sign() {
        var that = this;
        var url = 'api/users/signCheck';
        var data = {
          openid: uni.getStorageSync('openid')
        };
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            that.signcheck=false
          } else if (res.code == 400) {
            that.signcheck=true
          }
        });
      },
      btnclock() {
        var that = this;
        var url = 'api/users/signReachMoney';
        var data = {
          openid: uni.getStorageSync('openid')
        };
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
              uni.showToast({
              	title:res.msg,
              	icon:'none',
              })
              that.getUserList()
              that.sign() 
          }else{
            uni.showToast({
            	title:res.msg,
            	icon:'none',
            })
          }
        });
      },

    }
  }
</script>

<style>
  page {
    background-color: #f4f6ed;
  }

  .signtitle {
    margin: 40rpx 0 20rpx 0;
    font-size: 36rpx;
    color: #333333;
    font-family: PingFang SC, PingFang SC-Regular;
  }

  .timelinebox {
    box-sizing: border-box;
    width: 690rpx;
    background: linear-gradient(123deg, #7cfffa, #11f5ed 100%);
    border-radius: 40rpx;
    padding: 20rpx;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #02b9b2;
  }

  .getmoney {
    width: 100%;
    height: 96rpx;
    background: rgba(255, 255, 255, 0.80);
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    margin: 20rpx 0 40rpx 0;
  }

  .getmoney .sevenmoney {
    width: 400rpx;
  }

  .stepsboxs {
    display: flex;
  }

  .stepsbox {
    display: flex;
  }

  .leftsteps {
    width: 70rpx;
    text-align: center;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #02b9b2;
  }

  .steps_item {
    width: 70rpx;
    height: 70rpx;
    text-align: center;
    line-height: 60rpx;
    background: #ffffff;
    border: 6rpx solid #ff9534;
    border-radius: 36rpx;
    font-size: 28rpx;
    color: #00dfd7;
    margin-bottom: 8rpx;
  }

  .steps_line {
    width: 26rpx;
    height: 6rpx;
    background: #ff9534;
    margin-top: 32rpx;
  }

  .broken {
    color: #999999;
    border-color: #999;
  }

  .brokenbg {
    background-color: #999999;
  }

  .broken1 {
    color: #02b9b2;
    border-color: #02b9b2;
  }

  .brokenbg1 {
    background-color: #02b9b2;
  }

  /* 最后结束的表 */
  .missonbg {
    box-sizing: border-box;
    background: url(../../static/missonbg.png) no-repeat;
    width: 690rpx;
    height: 280rpx;
    background-size: contain;
    padding: 40rpx 20rpx 0;
    position: relative;
    margin-bottom: 20rpx;
  }

  .mBgTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Regular;
  }

  .TopMoney {
    color: #ff0000;
  }

  .mBgmiddele {
    display: flex;
    margin: 20rpx 0 40rpx;
  }

  .mbgmbox {
    background: #e0fffe;
    border-radius: 10rpx;
    color: #666666;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    padding: 8rpx 20rpx;
    margin-right: 20rpx;
  }

  .mBgbottom {
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    line-height: 48rpx;
  }

  .btnpos {
    position: absolute;
    right: 0;
    bottom: 20rpx;
    width: 168rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    opacity: 1;
    background: #d7fffe;
    border-radius: 30rpx 0rpx 0rpx 30rpx;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #00dfd7;
  }
</style>
