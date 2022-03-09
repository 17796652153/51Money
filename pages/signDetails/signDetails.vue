<template>
<view>
<view class="back">征文详情</view>
<view class="clueBox">
      <view class="signBox">
           <view class="title">征文标题</view>
           <view class="line"></view>
           <view class="cont">{{detail.title}}</view>
      </view>
      <view style="height:60rpx;"></view>
      <view class="signBox">
           <view class="title">征文描述</view>
           <view class="line"></view>
           <rich-text class="cont" :nodes="detail.content"></rich-text>
      </view>
      <view class="text">温馨提示：可将文章链接进行上传保存，获得{{tips3}}元奖励，详情请仔细阅读首页使用教程</view>
      <image class="sendForm" src="/static/image/zxtg.png" @tap="getnavto"></image>
</view>

<view style="height:100rpx;"></view>
</view>
</template>

<script>
var http = require("../../utils/http.js");

export default {
  data() {
    return {
      id: '',
      detail: '',
      tips3: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      tips3: uni.getStorageSync('tips3')
    });
    this.getdata();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      tips3: uni.getStorageSync('tips3')
    });
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
    getdata() {
      var that = this;
      var url = 'api/users/writingListDetails';
      var data = {
        id: that.id
      };
      http.postReq(url, data, function (res) {
        that.setData({
          detail: res
        });
      });
    },

    getnavto() {
      console.log(231);
      var that = this;
      console.log(that.detail.title);
      var title = that.detail.title;
      var end = that.detail.end_time;
      uni.navigateTo({
        url: '/pages/signSubmit/signSubmit?id=' + that.id + '&title=' + title + '&end=' + end
      });
    }

  }
};
</script>
<style>
.back{
   height:350rpx;
   background: linear-gradient(#00DFD7, #FFF 100%);
   text-align: center;
   font-size:36rpx;
   color:#FFF;
   padding-top:70rpx;
   box-sizing: border-box;
}
.clueBox{
   width:92%;
   margin:auto;
   border-radius: 10px;
   padding:80rpx 40rpx 20rpx 40rpx;
   box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.25); 
   box-sizing: border-box;
   position: relative;
   top:-290rpx;
   z-index:999;
   background:#FFF;
}

.input-placeholder{
   color:#333;
}
.xl{
   width:32rpx;
   height:30rpx;
}
.picker{
   display: flex;
   align-items: center;
   justify-content: space-between;
}
.sendForm{
  width:400rpx;
  height:100rpx;
  display:block;
  margin:40rpx auto 0rpx;
}
.title{
    font-size:36rpx;
    color:#333;
    font-weight: 500;
}
.line{
  height: 1px;
  background: #ebebeb;
  margin-top:20rpx;
}
.cont{
   font-size:28rpx;
   color:#333;
   margin-top:20rpx;
}
.text{
  font-size:28rpx;
  color:#666;
  margin-top:120rpx;
}
</style>