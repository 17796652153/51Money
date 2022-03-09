<template>
<view>
<!--pages/mysubmit/cause/cause.wxml-->
<view class="title">失败描述</view>
<view class="detail">{{notes}}</view>
</view>
</template>

<script>
// pages/mysubmit/cause/cause.js
var http = require("../../utils/http.js");

export default {
  data() {
    return {
      id: '',
      notes: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id: options.id
    });
    this.look();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
    look() {
      const that = this;
      let url = 'api/users/lookup';
      let data = {
        id: that.id
      };
      http.postReq(url, data, function (res) {
        if (res.code == 200) {
          console.log(res.data.review_notes);
          that.setData({
            notes: res.data.review_notes
          });
        }
      });
    }

  }
};
</script>
<style>
/* pages/mysubmit/cause/cause.wxss */
.title{
  font-size: 36rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: LEFT;
  color: #333333;
  margin-left: 60rpx;
  margin-top: 50rpx;
}
.detail{
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: LEFT;
  color: #999999;
  margin-left: 70rpx;
}
</style>