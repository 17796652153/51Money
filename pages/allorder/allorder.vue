<template>
<view>
<!--pages/order/order.wxml-->
<view class="swiper-tab">
       <view :class="'swiper-tab-list ' + (currentTab==0 ? 'on' : '')" data-current="0" @tap="swichNav">待发货
              <view class="navBtm"></view>
       </view>
       <view :class="'swiper-tab-list ' + (currentTab==1 ? 'on' : '')" data-current="1" @tap="swichNav">待收货
              <view class="navBtm"></view>
       </view>
       <view :class="'swiper-tab-list ' + (currentTab==2 ? 'on' : '')" data-current="2" @tap="swichNav">售后服务
              <view class="navBtm"></view>
       </view>
</view>

<swiper :current="currentTab" class="swiper-box" duration="300" :style="'height:' + (winHeight - 62) + 'rpx;padding-bottom:30rpx;'" @change="bindChange">
       <swiper-item>
              <view v-for="(item, index) in datalist" :key="index" class="shoplist" :data-index="item.id" @tap="gettolist">
                     <view class="shopbox">
                            <image :src="item.image" mode="scaleToFill"></image>
                            <view style="width: 100%">
                                   <view class="title">{{item.goods_name}}</view>
                                   <view class="num">数量：1台</view>
                                   <!-- <view>物流：中通快递</view>
                                   <view class="odd">
                                          <text>单号：7788668822456</text>
                                          <image src="/image/arrow.png" mode="scaleToFill" class="shopimg"></image>
                                   </view> -->
                            </view>
                     </view>
                     <view class="money">实付款： <text>￥{{item.money}}</text><text style=" font-size: 28rpx;color:#333" v-if="item.freight_money==0">（免运费）</text><text style=" font-size: 28rpx;color:#333" v-if="item.freight_money>0">（运费：{{item.freight_money}}元）</text></view>
                     <view class="btnbox">
                            <view class="btn" :data-id="item.id" @tap="drawback">申请退款</view>
                     </view>
              </view>
       </swiper-item>
       <swiper-item>
              <view v-for="(item, index) in datalist" :key="index" class="shoplist" :data-index="item.id" @tap="gettolist">
                     <view class="shopbox">
                            <image :src="item.image" mode="scaleToFill"></image>
                            <view style="width: 100%">
                                   <view class="title">{{item.goods_name}}</view>
                                   <view class="num">数量：1台</view>
                                   <view>物流：{{item.platform}}</view>
                                   <view class="odd">
                                          <text>单号：{{item.express}}</text>
                                          <image src="/static/image/copy.png" mode="scaleToFill" :data-dan="item.express" class="shopimg" @tap="copydan"></image>
                                   </view>
                            </view>
                     </view>
                     <view class="money">实付款： <text>￥{{item.money}}</text><text style=" font-size: 28rpx;color:#333" v-if="item.freight_money==0">（免运费）</text><text style=" font-size: 28rpx;color:#333" v-if="item.freight_money>0">（运费：{{item.freight_money}}元）</text></view>
                     <view class="btnbox">
                            <view class="btn" :data-id="item.id" @tap="drawback">申请退款</view>
                            <view class="btn btn1" :data-id="item.id" @tap="receipt">确认收货</view>
                     </view>
              </view>

       </swiper-item>
       <swiper-item>
              <view v-for="(item, index) in datalist" :key="index" class="shoplist" :data-index="item.id" @tap="gettolist">
                     <view class="shopbox">
                            <image :src="item.image" mode="scaleToFill"></image>
                            <view style="width: 100%">
                                   <view class="title">{{item.goods_name}}</view>
                                   <view class="num">数量：1台</view>
                                   <view>物流：{{item.platform}}</view>
                                   <view class="odd">
                                          <text>单号：{{item.express}}</text>
                                          <image src="/static/image/copy.png" mode="scaleToFill" :data-dan="item.express" class="shopimg" @tap="copydan"></image>
                                   </view>
                            </view>
                     </view>
                     <view class="money">实付款： <text>￥{{item.money}}</text><text style=" font-size: 28rpx;color:#333" v-if="item.freight_money==0">（免运费）</text><text style=" font-size: 28rpx;color:#333" v-if="item.freight_money>0">（运费：{{item.freight_money}}元）</text></view>
                     <view class="btnbox">
                            <!-- <view class="btn" data-id='{{item.id}}' bindtap="drawback">申请退款</view> -->
                            <!-- 0待发货,1已发货,2已完成,3申请退款,4已退款 -->
                            <view class="btn" v-if="item.type==4">已退款</view>
                            <view class="btn" v-if="item.type==3" :data-id="item.id" @tap="backout">撤销申请</view>
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
    console.log(options.index);
    that.setData({
      currentTab: options.index
    });
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
    // 获取数据
    getdata() {
      const that = this;
      let url = 'api/users/order';
      let data = {
        is: parseInt(that.currentTab) + 1,
        openid: uni.getStorageSync('openid')
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
        }); // console.log(that.data.datalist)
      });
    },

    copydan(e) {
      const that = this;
      console.log(e.currentTarget.dataset.dan);
      uni.setClipboardData({
        data: e.currentTarget.dataset.dan,
        success: function (res) {
          uni.showToast({
            title: '复制成功',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },

    drawback(e) {
      const that = this;
      console.log(e.currentTarget.dataset.id);
      var content = '';

      if (that.currentTab == 0) {
        content = '卖家马上就要寄出了还要退款吗？';
      } else if (that.currentTab == 1) {
        content = '设备已经在路上了确定要申请退款吗？';
      }

      uni.showModal({
        content: content,
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            let url = 'api/users/refundOrder';
            let data = {
              id: e.currentTarget.dataset.id,
              openid: uni.getStorageSync('openid')
            };
            http.postReq(url, data, function (res) {
              if (res.code == 200) {
                uni.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000
                });
                that.getdata();
              }
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },

    receipt(e) {
      const that = this;
      console.log(e.currentTarget.dataset.id);
      uni.showModal({
        content: '是否要确认收货',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            let url = 'api/users/receivingOrder';
            let data = {
              id: e.currentTarget.dataset.id,
              openid: uni.getStorageSync('openid')
            };
            http.postReq(url, data, function (res) {
              if (res.code == 200) {
                uni.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000
                });
                that.getdata();
              }
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },

    backout(e) {
      const that = this;
      console.log(e.currentTarget.dataset.id);
      uni.showModal({
        content: '确定撤销申请吗？',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            let url = 'api/users/cancelOrder';
            let data = {
              id: e.currentTarget.dataset.id,
              openid: uni.getStorageSync('openid')
            };
            http.postReq(url, data, function (res) {
              if (res.code == 200) {
                uni.showToast({
                  title: "撤销成功",
                  icon: 'none',
                  duration: 2000
                });
                that.getdata();
              }
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
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
        this.getdata();
      }
    },
    bindChange: function (e) {
      var that = this;
      that.setData({
        currentTab: e.detail.current
      });
      this.getdata();
    },

    gettolist() {
      console.log("占位：函数 gettolist 未声明");
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

.shoplist {
  margin: 20rpx 30rpx 0;
  border-bottom: 1px solid #e5e5e5;
}

.shopbox {
  display: flex;
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  color: #333333;
}
/* .shopimg{
  width: 300rpx;
  height: 200rpx;

} */
.shopbox image {
  width: 300rpx;
  height: 200rpx;
  margin-right: 40rpx;
}

.num {
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  color: #999999;
  margin: 20rpx 0;
}

.title {
  color: #333333;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Medium;
}

.odd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  margin: 20rpx 0;
}

.odd image {
  width: 28rpx;
  height: 28rpx;
}

.money {
  margin-top: 25rpx;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  color: #333333;
}

.money text {
  color: #f10d0d;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Regular;
}
.btnbox{
  display: flex;
  justify-content: flex-end;
  margin: 40rpx 0;
}
.btn {
  width: 172rpx;
  height: 56rpx;
  opacity: 1;
  border: 2rpx solid #999999;
  border-radius: 10rpx;
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  color: #333333;
  line-height: 56rpx;
  text-align: center;
  margin-left: 20rpx;
}
.btn1{
  background-color: #00DFD7;
  color: #ffffff;
  border-color:#00DFD7 ;
}
</style>