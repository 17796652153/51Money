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
<view class="titlebox1" v-if="index==3">
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
</view>
<!-- 内容 -->
<view v-if="datalist.length==0" style="text-align:center">
 <view style="font-size: 36rpx;color:#999;margin:80rpx 0 60rpx">暂无数据</view>
 <image src="/static/image/wubg.png"></image>  
</view>
<block v-if="datalist.length>0">
  <view v-for="(item, index) in datalist" :key="index" class="box">
  <view class="box-left">
      <view v-if="item.large_type==1">提交线索</view>
      <view v-else-if="item.large_type==2">问答提交</view>
      <view v-else-if="item.large_type==3">文章</view>
      <view v-else>发现售货机</view>
      <view class="box-time">{{item.add_time}}</view>
    </view>
    <view class="box-right">
      <view v-if="item.type==0" class="shenhe">审核中</view>
      <view v-else-if="item.type==1">合格</view>
      <view v-else>不合格</view>
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
      array: ['全部', '不合格', '合格', '范围查看', '月数据', '周数据', '日数据'],
      index: 0,
      date: '2016-09-01',
      date1: '2016-09-01',
      enddate: '',
      datalist: []
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getlist();
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
      this.getlist();
    },
    // date
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        date: e.detail.value
      });
      this.getlist();
    },
    bindDateChange1: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        date1: e.detail.value
      });
      this.getlist();
    },

    // api/users/capitalDetailedDetails
    getlist() {
      const that = this;
      var url = 'api/users/dataStatistics'; //     openid	是	string	用户openid
      // type	是	string	1不合格,2合格,3范围查看,4月数据,5周数据,6日数据
      // start_time	范围查看需要传	string	开始时间 2021-05-01
      // end_time	范围查看需要传	string	结束时间 2021-05-30

      if (that.index == 3) {
        var data = {
          openid: uni.getStorageSync('openid'),
          type: parseInt(that.index),
          start_time: that.date,
          end_time: that.date1 + ' 23:59'
        };
      } else {
        var data = {
          openid: uni.getStorageSync('openid'),
          type: parseInt(that.index)
        };
      }

      http.postReq(url, data, function (res) {
        if (res.code == 200) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].add_time = time.formatTimeTwo(res.data[i].add_time, 'Y-M-D h:m:s');
          }

          that.setData({
            datalist: res.data
          });
          console.log(res.data);
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
.titlebox1{
  box-sizing: border-box;
  display: flex;
  justify-content: center;
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