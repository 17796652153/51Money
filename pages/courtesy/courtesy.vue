<template>
<view>
<!--pages/order/order.wxml-->
<view class="swiper-tab">
       <view :class="'swiper-tab-list ' + (currentTab==0 ? 'on' : '')" data-current="0" @tap="swichNav">邀请新人
              <view class="navBtm"></view>
       </view>
       <view :class="'swiper-tab-list ' + (currentTab==1 ? 'on' : '')" data-current="1" @tap="swichNav">已邀请人
              <view class="navBtm"></view>
       </view>
</view>

<swiper :current="currentTab" class="swiper-box" duration="300" :style="'height:' + (winHeight - 62) + 'rpx;padding-bottom:30rpx;'" @change="bindChange">
       <swiper-item>
              <view class="swiper-top" @tap="getinviter">
                     <view class="qrcodebox">
                            <image src="/static/image/qrcode.png" class="qrcode"></image>
                            <view>邀请二维码</view>
                     </view>
                     <image src="/static/image/arrowbox.png" class="arrowto"></image>
              </view>
              <view class="money-bottom">
                     <view class="money-title">邀请奖励</view>
                     <rich-text :nodes="reward"></rich-text>
              </view>
       </swiper-item>
       <swiper-item>
              <view v-for="(item, index) in array" :key="index" style="margin-bottom:20rpx">
                     <view class="pickerdate">
                            <image :src="item.avatar"></image>
                            <text>{{item.username}}</text>
                     </view>
                     <view class="allmoey">
                            <text>受邀时间：{{item.create_time}}</text>
                     </view>
              </view>
       </swiper-item>
</swiper>
</view>
</template>

<script>
// pages/order/order.js
var http = require("../../utils/http.js");
const time = require("../../utils/time.js");

export default {
  data() {
    return {
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,
      reward: "",
      array: []
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
    this.getreward();
    this.getlowerUser();
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

    // 获取邀请奖励信息
    getreward() {
      const that = this;
      var url = "api/users/invitationRichText";
      http.postReq(url, '', function (res) {
        console.log(res);
        that.setData({
          reward: res.data
        });
      });
    },

    getinviter() {
      uni.navigateTo({
        url: '/pages/inviter/inviter'
      });
    },

    //获取我的下级 
    getlowerUser() {
      const that = this;
      var url = 'api/users/lowerUser';
      console.log(that.user);
      var data = {
        openid: uni.getStorageSync('openid')
      };
      http.postReq(url, data, function (res) {
        if (res.code == 200) {
          console.log(res.data);

          for (var i = 0; i < res.data.length; i++) {
            res.data[i].create_time = time.formatTimeTwo(res.data[i].create_time, 'Y-M-D h:m:s');
          }

          that.setData({
            array: res.data
          });
          console.log(that.array);
        }
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
      }
    },
    bindChange: function (e) {
      var that = this;
      that.setData({
        currentTab: e.detail.current
      });
    }
  }
};
</script>
<style>
/* pages/order/order.wxss */

.swiper-tab {
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  line-height: 80rpx;
  display: flex;
  justify-content: space-between;
  background: #d4fffd;
  padding: 0 124rpx;
  padding-bottom: 10rpx;
}

.swiper-tab-list {
  font-size: 30rpx;
  /* display: inline-block; */
  color: #666;

}

.navBtm {
  width: 40rpx;
  height: 8rpx;
  background: #00DFD7;
  margin: auto;
  display: none;
}

.on {
  color: #00DFD7;

  /* border-bottom: 3rpx solid blue; */
}

.on .navBtm {
  display: block;
}

.swiper-box {
  display: block;
  height: 100%;
  width: 100%;

}

swiper-item {
  overflow: auto;
  padding-bottom: 60rpx;
}

.swiper-top {
  width: 690rpx;
  height: 160rpx;
  opacity: 1;
  background: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 0rpx 12rpx 4rpx rgba(0, 0, 0, 0.08);
  font-size: 36rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: LEFT;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40rpx 30rpx;
}

.qrcodebox {
  display: flex;
  align-items: center;
}

.swiper-top .qrcode {
  width: 76rpx;
  height: 76rpx;
  opacity: 1;
  margin: 0 20rpx 0 40rpx;
}

.swiper-top .arrowto {
  width: 40rpx;
  height: 40rpx;
  opacity: 1;
  margin-right: 40rpx;
}

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

/* 一邀请人 */
.pickerdate {
  display: flex;
  align-items: center;
  padding: 15rpx 20rpx 0;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: CENTER;
  color: #333333;
}

.pickerdate image {
  width: 72rpx;
  height: 72rpx;
  margin-left: 30rpx;
  margin-right: 20rpx;
}
.allmoey{
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #666666;
  margin-left: 50rpx;
  margin-top: 20rpx;
}

</style>