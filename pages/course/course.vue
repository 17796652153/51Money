<template>
<view>
<!--pages/order/order.wxml-->
<view class="swiper-tab">
       <view :class="'swiper-tab-list ' + (currentTab==0 ? 'on' : '')" data-current="0" @tap="swichNav">线索
              <view class="navBtm"></view>
       </view>
       <view :class="'swiper-tab-list ' + (currentTab==1 ? 'on' : '')" data-current="1" @tap="swichNav">问答提交
              <view class="navBtm"></view>
       </view>
       <view :class="'swiper-tab-list ' + (currentTab==2 ? 'on' : '')" data-current="2" @tap="swichNav">写作
              <view class="navBtm"></view>
       </view>
       <view :class="'swiper-tab-list ' + (currentTab==3 ? 'on' : '')" data-current="3" @tap="swichNav">发现售货机
              <view class="navBtm"></view>
       </view>
       <view :class="'swiper-tab-list ' + (currentTab==4 ? 'on' : '')" data-current="4" @tap="swichNav">其他教程
              <view class="navBtm"></view>
       </view>
</view>

<swiper :current="currentTab" class="swiper-box" duration="300" :style="'height:' + (winHeight - 62) + 'rpx;padding-bottom:30rpx;'" @change="bindChange">
       <swiper-item>
              <view v-for="(item, index) in datalist" :key="index" class="swiperItemBox" :data-index="item.id" @tap="gettolist">
                     <view class="swiperItemViewLeft">
                            <image :src="item.ad_image"></image>
                     </view>
                     <view class="swiperItemViewRight">
                            {{item.ad_name}}
                     </view>
              </view>
       </swiper-item>
       <swiper-item>
              <view v-for="(item, index) in datalist" :key="index" class="swiperItemBox" :data-index="item.id" @tap="gettolist">
                     <view class="swiperItemViewLeft">
                            <image :src="item.ad_image"></image>
                     </view>
                     <view class="swiperItemViewRight">
                            {{item.ad_name}}
                     </view>
              </view>

       </swiper-item>
       <swiper-item>
              <view v-for="(item, index) in datalist" :key="index" class="swiperItemBox" :data-index="item.id" @tap="gettolist">
                     <view class="swiperItemViewLeft">
                            <image :src="item.ad_image"></image>
                     </view>
                     <view class="swiperItemViewRight">
                            {{item.ad_name}}
                     </view>
              </view>

       </swiper-item>
       <swiper-item>
              <view v-for="(item, index) in datalist" :key="index" class="swiperItemBox" :data-index="item.id" @tap="gettolist">
                     <view class="swiperItemViewLeft">
                            <image :src="item.ad_image"></image>
                     </view>
                     <view class="swiperItemViewRight">
                            {{item.ad_name}}
                     </view>
              </view>
       </swiper-item>
       <swiper-item>
              <view v-for="(item, index) in datalist" :key="index" class="swiperItemBox" :data-index="item.id" @tap="gettolist">
                     <view class="swiperItemViewLeft">
                            <image :src="item.ad_image"></image>
                     </view>
                     <view class="swiperItemViewRight">
                            {{item.ad_name}}
                     </view>
              </view>
       </swiper-item>
</swiper>
</view>
</template>

<script>
// pages/order/order.js
var http = require("../../utils/http.js");

export default {
  data() {
    return {
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,
      datalist: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取当前设备的宽高
     */

    uni.getSystemInfo({
      success: function (res) {
        var height = res.windowWidth * 2;
        that.setData({
          winWidth: res.windowWidth * 2,
          winHeight: res.windowHeight * 2
        });
      }
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
    clickEvaluateList: function () {
      uni.navigateTo({
        url: '/pages/evaluateList/evaluateList'
      });
    },
    clickEvaluateAdd: function () {
      uni.navigateTo({
        url: '/pages/evaluateAdd/evaluateAdd'
      });
    },

    // 获取数据
    getdata() {
      const that = this;
      let url = 'api/users/courseVideo';
      let data = {
        page: 1,
        limit: 1000,
        pid: parseInt(that.currentTab) + 1
      };
      http.postReq(url, data, function (res) {
        for (const key in res.data) {
          console.log(res.data[key].ad_image);

          if (res.data[key].ad_image != '') {
            res.data[key].ad_image = http.rootDocment + res.data[key].ad_image;
          }
        }

        that.setData({
          datalist: res.data
        });
        console.log(that.datalist);
      });
    },

    gettolist(e) {
      console.log("data-index值：", e.currentTarget.dataset.index);
      uni.navigateTo({
        url: '/pages/courselist/courselist?id=' + e.currentTarget.dataset.index
      });
    },

    //  tab切换逻辑
    swichNav: function (e) {
      var that = this;

      if (this.currentTab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.target.dataset.current
        });
        this.getdata();
      }
    },
    bindChange: function (e) {
      var that = this;
      that.setData({
        currentTab: e.detail.current
      });
      this.getdata();
    }
  }
};
</script>
<style>
/* pages/order/order.wxss */

.swiper-tab{
 width: 100%;
 text-align: center;
 line-height: 80rpx;
 display:flex;
 background:#d4fffd;
 padding-bottom:16rpx;
}
.swiper-tab-list{  
 font-size: 30rpx;
 /* display: inline-block; */
 width:25%;
 color: #666;

}
.navBtm{
  width:40rpx;
  height:8rpx;
  background:#00DFD7;
  margin: auto;
  display:none;
}
.on{ 
 color:#00DFD7;

 /* border-bottom: 3rpx solid blue; */
}
.on .navBtm{
 display:block;
}

.swiper-box{
  display: block; 
  height: 100%; 
  width: 100%; 
  
}
swiper-item{
 overflow:auto;
 padding-bottom:60rpx;
}
.swiperItemBox{
   display:flex;
   width:92%;
   margin:40rpx auto 0rpx;
   border-radius:20rpx;
   box-shadow: 0px 0px 16rpx 2rpx rgba(0,0,0,0.10); 
   padding:30rpx;
   box-sizing: border-box;
}
.swiperItemViewLeft{
  width:300rpx;
  height:200rpx;
  overflow: hidden;
}
.swiperItemViewLeft image{
    width:100%;
    height:100%;
}
.swiperItemViewRight{
    font-size:36rpx;
    color:#333;
    margin-left:30rpx;
    width: 350rpx;
}




</style>