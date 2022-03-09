<template>
<view>
<!--pages/addressList/addressList.wxml-->
<view v-if="address.length==0" style="text-align:center">
 <view style="font-size: 36rpx;color:#999;margin:80rpx 0 60rpx">暂无数据</view>
 <image src="/static/wuaddress.png"></image>  
</view>
<block v-if="address.length>0">
      <view v-for="(item, index) in address" :key="index" class="addressBox">
            <text class="addressBoxText1">{{item.address_name}}<text class="addressBoxText2">
                        {{item.address_phone}}</text></text>
            <text class="addressBoxText3">{{item.address_province}} {{item.address_city}} {{item.address_area}}
                  {{item.address_details}}</text>
            <view class="addressBoxMin">
                  <view class="addressBoxLeft" :data-index="item.address_id" @tap="cheekdefault">
                        <image src="/static/image/wxz1.png" v-if="item.address_status==0"></image>
                        <image src="/static/image/xzl.png" v-if="item.address_status==1"></image>
                        <text>默认地址</text>
                  </view>
                  <view class="addressBoxRight">
                        <text :data-index="item.address_id" @tap="getdetail" class="addressBoxText4">修改</text>
                        <text :data-index="item.address_id" @tap="binddel">删除</text>
                  </view>
            </view>
      </view>
</block>

<!-- <view class="addressBox">
      <text class="addressBoxText1">张三<text class="addressBoxText2">12345678901</text></text>
      <text class="addressBoxText3">河南省 郑州市 管城回族区 商都路街道 心仪路郑州东站西广场</text>
      <view class="addressBoxMin">
           <view class="addressBoxLeft">
                 <image src="/image/wxz.png"></image>
                 <text>默认地址</text>
           </view>
           <view class="addressBoxRight">
                 <text class="addressBoxText4">修改</text>
                 <text>删除</text>
           </view>
      </view>
</view> -->

<view style="height:160rpx;"></view>
<image class="myClick" src="/static/image/shdz.png" @tap="getadd"></image>
</view>
</template>

<script>
// pages/addressList/addressList.js
var http = require("../../utils/http.js");

export default {
  data() {
    return {
      address: []
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
    getadd() {
      uni.navigateTo({
        url: '/pages/addressAdd/addressAdd'
      });
    },

    //获取列表
    getlist() {
      var that = this;
      var url = 'api/users/addressList?openid=' + uni.getStorageSync('openid');
      http.getReq(url, function (res) {
        console.log(res);
        that.setData({
          address: res
        });
        console.log(that.address);
      });
    },

    // 设置默认地址
    cheekdefault(e) {
      var that = this;
      var url = 'api/users/addressDefault'; //  console.log("data-index值：",e.currentTarget.dataset.index)

      let id = e.currentTarget.dataset.index;
      var data = {
        address_id: id,
        openid: uni.getStorageSync('openid')
      };
      http.postReq(url, data, function (res) {
        if (res.code == 200) {
          uni.showToast({
            title: '设置成功',
            icon: 'none',
            duration: 2000
          });
          that.getlist(); // setTimeout(function(){
          //   wx.navigateBack()
          // }, 2000 )
        }
      });
    },

    // 删除地址
    binddel(e) {
      var that = this;
      console.log("data-index值：", e.currentTarget.dataset.index);
      let id = e.currentTarget.dataset.index;
      var url = 'api/users/addressDelete?address_id=' + id;
      http.getReq(url, function (res) {
        if (res.code == 200) {
          uni.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 2000
          });
          that.getlist();
        }
      });
    },

    // 跳转详情
    getdetail(e) {
      var that = this;
      console.log("data-index值：", e.currentTarget.dataset.index);
      let id = e.currentTarget.dataset.index;
      uni.navigateTo({
        url: '/pages/addressdetail/addressdetail?id=' + id
      }); // /pages/addressAdd/addressAdd
    }

  }
};
</script>
<style>
/* pages/addressList/addressList.wxss */
page{
   background:#f0f2f4;
}
.addressBox{
  width:92%;
  margin:36rpx auto 0rpx;
  background:#FFF;
  padding:32rpx 30rpx;
  box-sizing: border-box;
  border-radius:12rpx;
  box-shadow: 1px 1px 8px 0px rgba(0,0,0,0.05); 
}
.addressBoxText1{
   font-size:32rpx;
   color:#333;
   display:block;
}
.addressBoxText2{
   color:#999; 
   margin-left: 30rpx;
}
.addressBoxText3{
    font-size:28rpx;
    color:#333; 
    display:block;
    margin-top:20rpx;
}
.addressBoxMin{
    display:flex;
    padding-top:24rpx;
    border-top:1rpx solid #EEE;
    margin-top:24rpx;
}
.addressBoxLeft{
    width:50%;
    display:flex;
    align-items: center;
}
.addressBoxLeft image{
    width:36rpx;
    height:36rpx;
}
.addressBoxLeft text{
    font-size:28rpx;
    color:#999; 
    margin-left:12rpx;
}
.addressBoxRight{
    width:50%;
    text-align:right;
}
.addressBoxRight text{
    font-size:28rpx;
    color:#666;
    /* margin-left:30rpx; */
}
.addressBoxText4{
   margin-right:30rpx;
}
.addressBttomBox{
   position: fixed;
   left:0rpx;
   bottom:0rpx;
   width:100%;
   background:#FFF;
   padding:20rpx 0rpx;
}
.addressBttomBoxMin{
    width:90%;
    height:96rpx;
    background: linear-gradient(90deg,#7de59b, #47dc71 100%);
    border-radius:48rpx;
    text-align: center;
    line-height:96rpx;
    font-size:34rpx;
    color:#FFF;
    margin: auto;
}
.myClick{
    width:500rpx;
    height:100rpx;
    display:block;
    margin:160rpx auto 0rpx;
}
</style>