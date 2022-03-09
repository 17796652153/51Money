<template>
<view>
<!--pages/capital/capital.wxml-->
<view v-for="(item, index) in array" :key="index" class="money-bottom">
  <view style="background: #d4fffd;height:104rpx">
    <view class="pickerdate">
        <view class="picker">
          {{item.times}}
        </view>
    </view>
    <view class="allmoey">
      <text>支出￥{{item.feeMoney}}</text>
      <text style="margin-left:12rpx">收入￥ {{item.userMoney}}</text>
    </view>
  </view>
  <view v-for="(item, index2) in item.data" :key="index2" class="box">
    <view class="box-left">
      <view v-if="item.type==1">线索 </view>
      <view v-else-if="item.type==2">问答提交</view>
      <view v-else-if="item.type==3">征文</view>
      <view v-else-if="item.type==4">售货机</view>
      <view v-else-if="item.type==5">签到</view>
      <view v-else-if="item.type==6">提现 </view>
      <view v-else-if="item.type==7&&item.status==1">线索  二审失败</view>
      <view v-else-if="item.type==7&&item.status==4">售货机 二审失败</view>
      <view v-else-if="item.type==8">完成任务</view>
      <view v-else-if="item.type==9">团队目标奖励</view>
      <view class="box-time">{{item.time}}</view>
    </view>
    <view class="box-right">
      <view v-if="item.type==6 || item.type==7" style="color:#333">-{{item.money}}</view>
      <view v-else>+{{item.money}}</view>
    </view>
  </view>
</view>
</view>
</template>

<script>
// pages/capital/capital.js
var http = require("../../utils/http.js");
const time = require("../../utils/time.js");

export default {
  data() {
    return {
      array: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uni.setStorageSync('104', 0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getdata();
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
    //获取资金明细
    getdata() {
      var that = this;
      var url = 'api/users/capitalDetailedDetails';
      var data = {
        openid: uni.getStorageSync('openid')
      };
      http.postReq(url, data, function (res) {
        if (res.code == 200) {
          console.log(res.data);
          var array = res.data;

          for (var k = 0; k < array.length; k++) {
            for (var i = 0; i < array[k].data.length; i++) {
              console.log(array[k].data[i].time)
              array[k].data[i].time = time.formatTimeTwo(array[k].data[i].time, 'Y-M-D h:m:s');
            }
          }

          that.setData({
            array: array
          });
        }
      });
    }

  }
};
</script>
<style>
/* pages/capital/capital.wxss */
.money-title {
  width: 100%;
  height: 92rpx;
  line-height: 92rpx;
  opacity: 1;
  background: #d4fffd;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: CENTER;
  color: #d4fffd;
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
.loss{
color: #333333;
}
</style>