<template>
<view>
<!--pages/money/money.wxml-->
<!-- 钱包上部分 -->
<view class="money-top">
  <image src="/static/image/moneybg.png"></image>
  <view class="moneyfloat">
    <view>我的资金</view>
    <view class="mymoney">{{money}}</view>
    <view class="btn" @tap="getnewmoney">提现</view>
  </view>
</view>
<!-- 下部分详情 -->
<view class="money-bottom">
  <view class="money-title">资金明细</view>
  <view style="background: #f1fffe;height:104rpx">
    <view class="pickerdate">
      <picker mode="date" fields="month" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
        <view class="picker">
          {{date}}
        </view>
      </picker>
      <image src="/static/image/arrow-right.png"></image>
    </view>
    <view class="allmoey">
      <text>支出￥{{feeMoney}}</text>
      <text style="margin-left:12rpx">收入￥{{userMoney}}</text>
    </view>
  </view>
  <view v-for="(item, index) in array" :key="index" class="box">
    <view class="box-left">
      <view v-if="item.type==1">线索</view>
      <view v-else-if="item.type==2">问答提交</view>
      <view v-else-if="item.type==3">征文</view>
      <view v-else-if="item.type==4">售货机</view>
      <view v-else-if="item.type==5">签到</view>
      <view v-else-if="item.type==6">提现 </view>
      <view v-else-if="item.type==7&&item.status==1">线索  二审失败</view>
      <view v-else-if="item.type==7&&item.status==4">售货机 二审失败</view>
      <view class="box-time">{{item.time}}</view>
    </view>
    <view class="box-right">
      <view v-if="item.type==6 || item.type==7" style="color:#333">-{{item.money}}</view>
      <view v-else>+{{item.money}}</view>
    </view>
  </view>
  <view class="more" @tap="getcaption">  
    点击查看更多
  </view>
</view>
</view>
</template>

<script>
// pages/money/money.js
var http = require("../../utils/http.js");
const time = require("../../utils/time.js");

export default {
  data() {
    return {
      date: '',
      array: '',
      feeMoney: '',
      userMoney: '',
      money: "",
      user: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      date: time.formatMonth()
    });
    this.getmoneylist();
    this.getmydata();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    // 日期picker
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        date: e.detail.value
      });
    },

    // 获取我的资金和资金明细 默认显示本月的
    getmydata() {
      var that = this;
      var url = 'api/users/userData?openid=' + uni.getStorageSync('openid');
      http.getReq(url, function (res) {
        console.log(res.data);
        console.log(res.data.user_money);
        console.log(res.data.frozen_money);
        var money1 = res.data.user_money - res.data.frozen_money;
        var money = money1.toFixed(2);
        console.log(money);

        if (res.code == 200) {
          that.setData({
            user: res.data,
            money: money
          });
        }
      });
    },

    getmoneylist() {
      const that = this;
      var url = 'api/users/carryMoney?openid=' + uni.getStorageSync('openid') + '&time=' + time.formatMonth();
      var url1 = 'api/users/capitalDetailed';
      var data = {
        openid: uni.getStorageSync('openid'),
        time: that.date
      };
      http.postReq(url1, data, function (res) {
        if (res.code == 200) {
          console.log(res.data);
          var array = res.data.data.slice(0, 3);

          for (var i = 0; i < array.length; i++) {
            array[i].time = time.formatTimeTwo(array[i].time, 'Y-M-D h:m:s');
          }

          that.setData({
            array: array,
            feeMoney: res.data.feeMoney,
            userMoney: res.data.userMoney
          });
        }
      });
    },

    //跳转到更多    
    getcaption() {
      uni.navigateTo({
        url: '/pages/capital/capital'
      });
    },

    // 提现
    getnewmoney() {
      const that = this;
      uni.navigateTo({
        url: '/pages/withdraw/withdraw?money=' + that.money
      });
    }

  }
};
</script>
<style>
/* pages/money/money.wxss */


/* 上面 */
.money-top {
  width: 690rpx;
  height: 444rpx;
  margin: 40rpx auto;
  position: relative;
}

.money-top image {
  width: 100%;
  height: 100%;
}

.moneyfloat {
  position: absolute;
  top: 72rpx;
  left: 230rpx;
  font-size: 48rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
  margin: 0 auto;
}

.mymoney {
  font-size: 72rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: center;
  color: #ff4d00;
  margin: 20rpx 0 36rpx;
}

.moneyfloat .btn {
  width: 168rpx;
  height: 72rpx;
  line-height: 72rpx;
  border-radius: 50rpx;
  opacity: 1;
  background: #00dfd7;
  box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 59, 103, 0.18);
  font-size: 36rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;
}

/* 下面 */
.money-bottom {
  width: 690rpx;
  height: 628rpx;
  opacity: 1;
  background: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.15);
  margin: 40rpx auto;

}

.money-title {
  width: 690rpx;
  height: 92rpx;
  line-height: 92rpx;
  opacity: 1;
  background: #d4fffd;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: CENTER;
  color: #00dfd7;
}

.pickerdate {
display: flex;
align-items: center;
padding: 15rpx 20rpx 0;
}
.pickerdate image{
width: 14rpx;
height: 24rpx;
transform: rotate(90deg);
margin-left: 20rpx;
}
.picker {
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
}

.allmoey {
  font-size: 24rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #999999;
  padding: 0 20rpx;
}

.more{
  font-size: 28rpx;
font-family: PingFang SC, PingFang SC-Regular;
font-weight: 400;
text-align: CENTER;
color: #999999;
margin-top: 30rpx;
}
</style>