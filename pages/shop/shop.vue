<template>
<view>
<view class="page-section page-section-spacing swiper noticeBox">
  <swiper indicator-dots="true" interval="5000" autoplay="true" duration="500" class="swiper">
    <swiper-item v-for="(item, index) in background" :key="index" :data-index="item">
      <image :src="item" mode="scaleToFill" style="width:100%;height:200px"></image>
    </swiper-item>
  </swiper>
</view>

<view class="content" v-if="shop!=''">
  <view class="mt20">
    {{shop.name}}
  </view>
  <view class="flexac">
    <view class="moneyred">
      ￥{{shop.gauge[0].money}}
    </view>
    <view class="vipmoney">会员价</view>
    <s class="vipmoney1">￥{{shop.gauge[0].money2}}</s>
  </view>

  <view class="inputbox">
    <text>规格</text>
    <view class="box-right" @tap="open">
      <input type="text" disabled="true" placeholder="请选择" class="inputp" :value="mode">
      <image class="xl xltransform" src="/static/image/xl.png" mode="scaleToFill"></image>
    </view>
  </view>
  <view class="inputbox">
    <text>收货地址</text>
    <view class="box-right" @tap="open1">
      <input type="text" disabled="true" placeholder="请选择" class="inputp" :value="address1 && address1.address_details ">
      <image class="xl xltransform" src="/static/image/xl.png" mode="scaleToFill"></image>
    </view>
  </view>

  <view class="subtitle">
    设备详情
    <view class="navBtm"></view>
  </view>
  <!--<import src="../../wxParse/wxParse.wxml"></import>-->
  <mp-html :content="article"></mp-html>
</view>
<view class="shoptime">
  <view class="shopleftbox">
    <image src="/static/image/img99.png" mode="scaleToFill"></image>
    预计发货时间
  </view>
  <view>
    5个工作日
  </view>
</view>
<view class="shoptime shoptime1">
  <view class="shopleftbox">
    <image src="/static/image/img100.png" mode="scaleToFill"></image>
    运费说明
  </view>
  <view v-if="postmoney!=''&&postmoney[1].value==0">
    免运费
  </view>
  <view v-if="postmoney!=''&&postmoney[1].value==1">
    {{postmoney[0].value}}元
  </view>
</view>
<view class="shoptime">
  <view class="shopleftbox">
    <image src="/static/image/img101.png" mode="scaleToFill"></image>
    退换货说明
  </view>
  <view>
    非质量问题概不退换
  </view>
</view>
<view class="bottomsell">
<!--  <button class="kefubox" open-type="contact" @contact="handleContact">
    <image src="/static/image/kefu.png" mode="scaleToFill" class="kefu"></image>
  </button> -->
  <image src="/static/image/gosell.png" mode="scaleToFill" class="gosell" @tap="gosell"></image>
</view>
<!-- 规格 -->
<view id="cover" v-if="mask" @tap="open"></view>
<view class="tabc tabcs" v-if="mask">
  <view class="tabtop">
    <view class="tabtopleft">
      <image :src="shop.image" mode="scaleToFill" class="shopimg"></image>
      <view>
        <view class="tabmoney">￥{{shopmoney}}</view>
        <view>{{shop.name}}</view>
      </view>
    </view>
    <image src="/static/image/close.png" mode="scaleToFill" class="close" @tap="open"></image>
  </view>

  <view class="designbox">
    <view>款式</view>
    <view class="design">
      <view v-for="(item, index) in shop.gauge" :key="index" :class="'des ' + (desindex==index ? 'destrue' : '')" :data-index="index" @tap="changedesindex">{{item.title}}</view>
    </view>
  </view>
  <view class="btn" @tap="clickmode">
    确定
  </view>
</view>
<!-- 地址 -->
<view id="cover" v-if="mask1" @tap="open1"></view>
<view class="tabc tabcs1" v-if="mask1">
  <view style="text-align: right;padding: 30rpx;padding-bottom: 0;">
    <image src="/static/image/close.png" mode="scaleToFill" class="close" @tap="open1"></image>
  </view>
  <view class="btn" @tap="godizhi" v-if="address.length==0">
    添加地址
  </view>
  <block v-if="address.length>0">
    <view v-for="(item, index) in address" :key="index" :class="'addressBox ' + (addindex==index ? 'addressBoxtrue' : '')" :data-index="index" @tap="choseaddress">
      <view class="addressBoxText1">
        <text>{{item.address_name}}</text>
        <text class="addressBoxText2">{{item.address_phone}}</text>
      </view>
      <text class="addressBoxText3">{{item.address_province}} {{item.address_city}} {{item.address_area}}
        {{item.address_details}}</text>
    </view>
    <view class="btn" @tap="clickmode1">
      确定
    </view>
    <view class="btn" @tap="clickmode1">
      进入地址列表
    </view>
  </block>

</view>
</view>
</template>

<script>
// pages/shop/shop.js
const http = require("../../utils/http.js");

const app = getApp();

export default {
  data() {
    return {
      mask: false,
      mask1: false,
      array: ['普通款', 2, 3, 4, 5],
      desindex: 0,
      shop: "",
      postmoney: '',
      addindex: 0,
      address: '',
      address1:'',
      mode: '',
      article: "",
      background: [],
      shopmoney: "",
      user: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: uni.getStorageSync('user')
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
    this.getshop();
    this.getfahuomoney();
    this.getaddress();
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
    handleContact(e) {
      console.log(e.detail.path);
      console.log(e.detail.query);
    },

    //获取规格
    getshop() {
      const that = this;
      var url = 'api/users/goods';
      http.postReq(url, '', function (res) {
        if (res.code == 200) {
          console.log('轮播', res.data);
          res.data.image = http.rootDocment + res.data.image;
          var imgs = res.data.many_image.split(',');
          console.log(imgs);
          var imgsbox = [];

          for (let index = 0; index < imgs.length; index++) {
            const element = imgs[index];
            var img = http.rootDocment + element;
            imgsbox.push(img);
          }

          that.setData({
            background: imgsbox,
            shop: res.data,
            shopmoney: res.data.gauge[0].money
          });
          //console.log("shop",that.shop)
          var article = res.data.content;
          /**
           * WxParse.wxParse(bindName , type, data, target,imagePadding)
           * 1.bindName绑定的数据名(必填)
           * 2.type可以为html或者md(必填)
           * 3.data为传入的具体数据(必填)
           * 4.target为Page对象,一般为this(必填)
           * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
           */

          // console.log(12132, article);
          //WxParse.wxParse('article', 'html', article, that, 5)
          that.article = that.escape2Html(article);
        }
      });
    },

    getfahuomoney() {
      const that = this;
      var url = 'api/users/express';
      http.postReq(url, '', function (res) {
        if (res.code == 200) {
          console.log('发货', res.data);
          that.setData({
            postmoney: res.data
          });
        }
      });
    },

    godizhi() {
      if (uni.getStorageSync('openid') == '') {
        uni.showModal({
          title: '警告',
          content: '请您登陆后在进行添加地址',
          showCancel: false,
          confirmText: '确定',
          success: function (res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            uni.switchTab({
              url: '/pages/my/my'
            });
          }
        });
        return;
      }

      uni.navigateTo({
        url: '/pages/addressAdd/addressAdd'
      });
    },

    getaddress() {
      var that = this;
      var url = 'api/users/addressList?openid=' + uni.getStorageSync('openid');
      http.getReq(url, function (res) {
        console.log(res);
        that.setData({
          address: res,
          address1: res[0]
        });
        console.log(that.address);
      });
    },

    clickmode() {
      const that = this;
      this.setData({
        mode: that.shop.gauge[that.desindex].title // shopname:that.data.shop.gauge[e.currentTarget.dataset.index].title

      });
      this.setData({
        mask: false
      });
    },

    clickmode1() {
      const that = this;
      this.setData({
        address1: that.address[that.addindex] // shopname:that.data.shop.gauge[e.currentTarget.dataset.index].title

      });
      this.setData({
        mask1: false
      });
    },

    gosell() {
      const that = this;
      var url = 'api/users/payNumber';

      if (that.mode == '') {
        uni.showToast({
          title: "请选择规格",
          icon: 'none',
          duration: 2000
        });
        return;
      } else if (that.address1 == '') {
        uni.showToast({
          title: "请选择收货地址",
          icon: 'none',
          duration: 2000
        });
        return;
      } else if (uni.getStorageSync('openid') == '') {
        uni.showModal({
          title: '警告',
          content: '请您登陆后在进行购买',
          showCancel: false,
          confirmText: '确定',
          success: function (res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            uni.switchTab({
              url: '/pages/my/my'
            });
          }
        });
        return;
      }

      var addressdetails = that.address1.address_province + that.address1.address_city + that.address1.address_area + that.address1.address_details;
      var freight = '';

      if (that.postmoney[1].value == 1) {
        freight = that.postmoney[0].value;
      } else {
        freight = 0;
      }

      var money = Number(that.shopmoney) + Number(freight);
      let data = {
        name: that.address1.address_name,
        phone: that.address1.address_phone,
        address: addressdetails,
        image: that.shop.image,
        goods_name: that.shop.name,
        count: 1,
        money: money,
        goods_money: that.shopmoney,
        freight_money: freight,
        openid: uni.getStorageSync('openid'),
        avatar: that.user.avatar,
        nick_name: that.user.username
      };
      http.postReq(url, data, function (res) {
        console.log('发货',res);
        if (res.code == 200) {
          console.log('发货', res.config);
          uni.requestPayment({
            provider:'wxpay',
            orderInfo:res.config,
            success(res) {
              console.log(res);
              uni.showToast({
                title: '购买成功，请等待发货',
                icon: 'none',
                duration: 2000
              });
              setTimeout(function () {
                uni.navigateTo({
                  url: '/pages/allorder/allorder?index=0'
                });
              }, 2000);
            },
            fail(res) {
              console.log(res);
            }
          
          });
        }
      });
    },

    open() {
      const that = this;
      this.setData({
        mask: !that.mask
      });
    },

    open1() {
      // const that = this
      // this.setData({
      //   mask1: !that.data.mask1
      // })
      // 直接跳转到地址列表让客户设置默认地址为地址
      uni.navigateTo({
        url: '/pages/addressList/addressList'
      }); 
    },

    changedesindex(e) {
      const that = this;
      console.log(e.currentTarget.dataset.index);
      this.setData({
        desindex: e.currentTarget.dataset.index,
        shopmoney: that.shop.gauge[e.currentTarget.dataset.index].money // shopname:that.data.shop.gauge[e.currentTarget.dataset.index].title

      });
    },

    choseaddress(e) {
      const that = this;
      console.log(e.currentTarget.dataset.index);
      this.setData({
        addindex: e.currentTarget.dataset.index // shopname:that.data.shop.gauge[e.currentTarget.dataset.index].title

      });
    }

  }
};
</script>
<style>
/* pages/shop/shop.wxss */
.imgtitle {
  width: 750rpx;
  height: 400rpx;
  vertical-align: top;
}

.content {
  margin: 0 30rpx;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  color: #000000;
}

.moneyred {
  color: #f10d0d;
  margin: 20rpx 0;
  font-size: 36rpx;
}

.myPicker {
  background: #ebebeb;
  margin-top: 30rpx;
  height: 68rpx;
  border-radius: 34rpx;
  padding: 0rpx 20rpx;
  box-sizing: border-box;
  line-height: 60rpx;
  color: #333;
}

.input-placeholder {
  color: #333;
}

.xltransform {
  transform: rotate(-90deg);
}

.xl {
  width: 32rpx;
  height: 30rpx;
}

.subtitle {
  margin-top: 30rpx;
  margin-bottom: 20rpx;
}

.navBtm {
  width: 72rpx;
  height: 8rpx;
  background: #00DFD7;
}

.shoptime {
  box-sizing: border-box;
  width: 750rpx;
  height: 72rpx;
  opacity: 1;
  background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  padding: 0 30rpx;
  margin-top: 20rpx;
}

.shoptime1 {
  background: #ffffff;
}

.shopleftbox {
  color: #999999;
  display: flex;
  align-items: center;
}

.shopleftbox image {
  width: 45rpx;
  height: 41rpx;
  margin-right: 23rpx;
}

.bottomsell {
  margin: 80rpx 30rpx 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kefu {
  width: 100rpx;
  height: 100rpx;
}

.kefubox {
  background-color: #ffffff;
  padding: 0;
  width: 100rpx !important;
  height: 100rpx;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.kefubox::after {
  border: none;
}

.gosell {
  width: 368rpx;
  height: 100rpx;
  /* margin-left: 60rpx; */
}



.inputbox {
  display: flex;
  align-items: center;
  height: 70rpx;
  background: #FFFFFF;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: LEFT;
  color: #999999;
}

.inputbox text {
  width: 140rpx;
}

.box-right {
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  color: #333333;
  display: flex;
  align-items: center;
}

.inputp {
  width: 540rpx;
  text-align: left;
  margin-left: 20rpx
}

/* 模态 */
/* 弹出选项卡 */
#cover {
  position: fixed;
  left: 0px;
  top: 0px;/*  #ifdef  H5  */
  top: calc(88rpx + constant(safe-area-inset-top));
  top: calc(88rpx + env(safe-area-inset-top));/*  #endif  */
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
  height: 100%;
  filter: alpha(opacity=60);
  /*设置透明度为60%*/
  opacity: 0.6;
  /*非IE浏览器下设置透明度为60%*/
  z-Index: 999;
}

.tabc {
  width: 575rpx;
  height: 712rpx;
  opacity: 1;
  background: #ffffff;
  border-radius: 20rpx 20rpx 0 0;
  position: absolute;
  left: 88rpx;
  bottom: calc(50% - 356rpx);
  z-Index: 9999;
  /* 		position: fixed;
  	left: 32rpx;
  	bottom: 80rpx; */
}

.tabcs {
  overflow: auto;
  width: 100%;
  height: 520rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
}

.tabtop {
  margin: 30rpx;
  display: flex;
  justify-content: space-between;
}

.tabtopleft {
  display: flex;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  color: #333;
}

.shopimg {
  width: 200rpx;
  height: 108rpx;
  margin-right: 40rpx;
}

.tabmoney {
  color: #ff0000;
  margin-bottom: 40rpx;
}

.close {
  width: 32rpx;
  height: 32rpx;
}

.designbox {
  margin: 0 30rpx;
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  color: #999999;
}

.design {

  display: flex;
  flex-wrap: wrap;
}

.des {
  margin-top: 20rpx;
  padding: 8rpx 20rpx;
  background: #d4fffd;
  border-radius: 10rpx;
  margin-right: 20rpx;
  font-size: 24rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  color: #333333;
}

.destrue {
  background: #00dfd7;
  color: #ffffff;
}

.btn {
  margin: 80rpx 50rpx 0;
  height: 88rpx;
  opacity: 1;
  background: #00dfd7;
  border-radius: 54rpx;
  font-size: 36rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  color: #ffffff;
  text-align: center;
  line-height: 88rpx;
}

/* 地址 */
.tabcs1 {
  overflow: auto;
  width: 100%;
  height: 100vh;
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 0;
}

.addressBox {
  width: 92%;
  margin: 36rpx auto 0rpx;
  background: #FFF;
  padding: 32rpx 30rpx;
  box-sizing: border-box;
  border-radius: 12rpx;
  box-shadow: 1px 1px 8px 0px rgba(0, 0, 0, 0.05);
}

.addressBoxtrue {
  background: #00dfd7;
}

.addressBoxText1 {
  font-size: 32rpx;
  color: #333;
  display: flex;
  justify-content: space-between;
}

.addressBoxText2 {
  color: #999;
}

.addressBoxText3 {
  font-size: 28rpx;
  color: #333;
  display: block;
  margin-top: 20rpx;
}

.addressBoxMin {
  display: flex;
  padding-top: 24rpx;
  border-top: 1rpx solid #EEE;
  margin-top: 24rpx;
}

.addressBoxLeft {
  width: 50%;
  display: flex;
  align-items: center;
}

.addressBoxLeft image {
  width: 36rpx;
  height: 36rpx;
}

.addressBoxLeft text {
  font-size: 28rpx;
  color: #999;
  margin-left: 12rpx;
}

.addressBoxRight {
  width: 50%;
  text-align: right;
}

.addressBoxRight text {
  font-size: 28rpx;
  color: #666;
  /* margin-left:30rpx; */
}

.addressBoxText4 {
  margin-right: 30rpx;
}

.swiper {
  height: 200px;
}

.vipmoney {
  color: #333;
  background: #00DFD7;
  font-size: 24rpx;
  font-family: PingFang SC, PingFang SC-Medium;
  width: 80rpx;
  height: 30rpx;
  line-height: 30rpx;
  text-align: center;
  margin: 0 10rpx;
}

.vipmoney1 {
  text-decoration: line-through;
  color: #999999;
  font-size: 30rpx;
}

.flexac {
  display: flex;
  align-items: baseline;
}
</style>