<template>
<view>
<!--pages/signList/signList.wxml-->
<view v-for="(item, index) in list" :key="index" class="viewBox">
     <text class="text1">征文标题：{{item.title}}</text>
     <rich-text class="text2" :nodes="item.content"></rich-text>
     <text class="text2 text3">征文日期：{{item.end_time}}</text>
     <view class="minBox" :data-index="item.id" @tap="getdetail">
        <text class="text4"> 查看详情 </text>
        <image src="/static/image/zuo.png"></image> 
     </view>
</view>
</view>
</template>

<script>
// pages/signList/signList.js
var http = require("../../utils/http.js");
const app = getApp();

export default {
  data() {
    return {
      list: [],
      tips3: ""
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
    app.globalData.banned();
    this.getlist();
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
    //获取列表
    getlist() {
      var that = this;
      var url = 'api/users/writingList';
      var data = {
        limit: 10000,
        page: 1
      };
      http.postReq(url, data, function (res) {
        console.log(res.data);
        that.setData({
          list: res.data
        });
      });
    },

    // 跳转详情
    getdetail(e) {
      var that = this;
      console.log("data-index值：", e.currentTarget.dataset.index);
      let id = e.currentTarget.dataset.index;
      uni.navigateTo({
        url: '/pages/signDetails/signDetails?id=' + id
      }); // /pages/addressAdd/addressAdd
    }

  }
};
</script>
<style>
/* pages/signList/signList.wxss */

.viewBox{
   width:90%;
   margin:20rpx auto 0rpx;
   border-radius: 20rpx;
   box-shadow: 0px 0px 20rpx 0px rgba(0,38,37,0.16); 
   padding:20rpx;
   box-sizing: border-box;
   background: #d8fffd;
}
.viewBox text{
   display:block;
   
}
.text1{
    color:#333;
    font-size:32rpx;
    margin-bottom:20rpx;
}
.text2{
   font-size:28rpx;
   color:#666;
}
.text3{
   margin-top:30rpx;
}
.minBox{
   display:flex;
   align-items: center;
   justify-content: flex-end;
   margin-top:20rpx;
}
.text4{
   font-size:28rpx;
   color:#00DFD7;
  
}
.minBox image{
  width:28rpx;
  height:28rpx;
}
</style>