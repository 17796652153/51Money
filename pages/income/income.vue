<template>
<view>
<!--pages/statistical/statistical.wxml-->
<!-- 标题 -->
<picker @change="bindPickerChange" :value="index" :range="array">
  <view class="titlebox">
    <text class="flexglow"></text>
    <view class="title">
      {{array[index]}}
    </view>
    <image src="/static/image/arrow.png"></image>
  </view>
</picker>
<view class="titlebox" v-if="index==3">
  <text class="flexglow"></text>
  <view class="pickerflex">
    <picker mode="date" :value="date" start="2021-06-01" :end="date" @change="bindDateChange">
      <view class="title">
        {{date}}
      </view>
    </picker>
    至
    <picker mode="date" :value="date1" start="2021-06-01" :end="enddate" @change="bindDateChange1">
      <view class="title">
        {{date1}}
      </view>
    </picker>
  </view>

  <image src="/static/image/arrow.png"></image>
</view>
<!-- 内容 -->
<view v-if="datalist.length==0" style="text-align:center">
 <view style="font-size: 36rpx;color:#999;margin:80rpx 0 60rpx">暂无数据</view>
 <image src="/static/image/wubg.png"></image>  
</view>
<!-- 全部 -->
<block v-if="index==0&&datalist.length>0">
<view v-for="(item, index) in datalist" :key="index" class="box">
  <view class="box-left">
    <block v-if="item.lower_nick!=''">
      <view>{{item.lower_nick}} -
      <text v-if="item.type==1">线索</text>
      <text v-else-if="item.type==2">问答提交</text>
      <text v-else-if="item.type==3">征文</text>
      <text v-else-if="item.type==4">售货机</text>
      <view v-else-if="item.type==5">签到</view>
      <view v-else-if="item.type==6">提现</view>
      <view v-else-if="item.type==7">二审扣除金额</view>
      <view v-else-if="item.type==8">完成任务</view>
      <view v-else-if="item.type==9">团队目标奖励</view>
    </view>
    </block>
    <block v-else>
      <view v-if="item.type==1">线索</view>
      <view v-else-if="item.type==2">问答提交</view>
      <view v-else-if="item.type==3">征文</view>
      <view v-else-if="item.type==4">售货机</view>
      <view v-else-if="item.type==5">签到</view>
      <view v-else-if="item.type==6">提现</view>
      <view v-else-if="item.type==7">二审扣除金额</view>
      <view v-else-if="item.type==8">完成任务</view>
      <view v-else-if="item.type==9">团队目标奖励</view>
    </block>
    <view class="box-time">{{item.time}}</view>
  </view>
  <view class="box-right">
    <view style="color: #333;" v-if="item.type==6 || item.type==7">-{{item.money}}</view>
    <view v-else>+{{item.money}}</view>
  </view>
</view>
</block>
<!-- 邀请人 -->
<block v-if="index==1&&datalist.length>0">
<view v-for="(item, index) in datalist" :key="index" class="box">
  <view class="box-left">
      <view>{{item.lower_nick}} -
      <text v-if="item.type==1">线索</text>
      <text v-else-if="item.type==2">问答提交</text>
      <text v-else-if="item.type==3">征文</text>
      <text v-else-if="item.type==4">售货机</text>
      <view v-else-if="item.type==5">签到</view>
      <view v-else-if="item.type==6">提现</view>
      <view v-else-if="item.type==7">二审扣除金额</view>
      <view v-else-if="item.type==8">完成任务</view>
      <view v-else-if="item.type==9">团队目标奖励</view>
    </view>
    <view class="box-time">{{item.time}}</view>
  </view>
  <view class="box-right">
    <view style="color: #333;" v-if="item.type==6 || item.type==7">-{{item.money}}</view>
    <view v-else>+{{item.money}}</view>
  </view>
</view>
</block>
<!-- 任务 -->
<block v-if="index==2 || index==3 || index==6&&datalist.length>0">
  <view v-for="(item, index) in datalist" :key="index" class="box">
    <view class="box-left">
      <view v-if="item.type==1">线索</view>
      <view v-else-if="item.type==2">问答提交</view>
      <view v-else-if="item.type==3">征文</view>
      <view v-else-if="item.type==4">售货机</view>
      <view v-else-if="item.type==5">签到</view>
      <view v-else-if="item.type==6">提现</view>
      <view v-else-if="item.type==7">二审扣除金额</view>
      <view v-else-if="item.type==8">完成任务</view>
      <view v-else-if="item.type==9">团队目标奖励</view>
      <view class="box-time">{{item.time}}</view>
    </view>
    <view class="box-right">
      <view style="color: #333;" v-if="item.type==6 || item.type==7">-{{item.money}}</view>
      <view v-else>+{{item.money}}</view>
    </view>
</view>
</block>
<!-- 范围 -->
<!-- 月 -->
<block v-if="index==4&&datalist.length>0">
  <view v-for="(item, index) in datalist" :key="index" class="box">
    <view class="box-left">
      <view>{{item.times}}</view>
    </view>
    <view class="box-right">
      <view>+{{item.money}}</view>
    </view>
</view>
</block>
<!-- 周 -->
<block v-if="index==5">
  <view class="box">
    <view class="box-left">
      <text>{{datalist.time1}}-</text>
      <text>{{datalist.time2}}</text>
      <!-- <view class="box-time">{{item.time}}</view> -->
    </view>
    <view class="box-right">
      <view>+{{datalist.data}}</view>
    </view>
</view>
</block>

<!-- piker -->
</view>
</template>

<script>
// pages/statistical/statistical.js
const http = require("../../utils/http.js");
const time = require("../../utils/time.js");
const app = getApp();

export default {
  data() {
    return {
      array: ['全部', '邀新收入', '任务收入', '日期筛选', '月收入', '周收入', '日收入'],
      index: 0,
      date: '2016-09-01',
      date1: '2016-09-01',
      enddate: '',
      datalist: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: time.formatTime(),
      date1: time.formatTime(),
      enddate: time.getDate('end')
    });
    uni.setStorageSync('101', 0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getdetail();
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
    // picker
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        index: e.detail.value
      });
      this.getdetail();
    },
    // date
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        date: e.detail.value
      });
      this.getdetail();
    },
    bindDateChange1: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        date1: e.detail.value
      });
      this.getdetail();
    },

    getdetail() {
      const that = this;
      let url = 'api/users/capitalIncome';
      let data = {};

      if (that.index == 3) {
        data = {
          openid: uni.getStorageSync('openid'),
          type: parseInt(that.index),
          start_time: that.date,
          end_time: that.date1 + ' 23:59'
        };
      } else {
        data = {
          openid: uni.getStorageSync('openid'),
          type: parseInt(that.index)
        };
      }

      http.postReq(url, data, function (res) {
        if (res.code == 200) {
          console.log(res.data);

          if (data.type == 5) {
            that.setData({
              datalist: res
            });
            console.log('5', that.datalist);
          } else if (data.type == 4)   {
            var arr = [];
            arr.push(res.data.time1);
            arr.push(res.data.time2);
            arr.push(res.data.time3);
            arr.push(res.data.time4);
            arr.push(res.data.time5);
            arr.push(res.data.time6);
            arr.push(res.data.time7);
            arr.push(res.data.time8);
            arr.push(res.data.time9);
            arr.push(res.data.time10);
            arr.push(res.data.time11);
            arr.push(res.data.time12);
            console.log(res.data);
            that.setData({
              datalist: arr
            });
            console.log('4', that.datalist);
          } else {
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].time = time.formatTimeTwo(res.data[i].time, 'Y-M-D h:m:s');
            }

            that.setData({
              datalist: res.data
            });
          }
        }
      });
    }

  }
};
</script>
<style>
/* pages/statistical/statistical.wxss */
.titlebox{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d4fffd;
  width: 100%;
  height: 92rpx;
  padding: 0 50rpx;
}
.flexglow{
  width: 40rpx;
  height: 40rpx;
}
.title{
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: CENTER;
  color: #00dfd7;
}
.titlebox image{
  width: 40rpx;
  height: 40rpx;
}
.pickerflex{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: CENTER;
  color: #00dfd7;
}
</style>