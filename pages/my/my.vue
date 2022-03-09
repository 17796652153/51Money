<template>
  <view>
    <!--pages/my/my.wxml-->
    <image class="setUp" src="/static/image/sz.png" @tap="getuserdetail(1)"></image>
    <view class="headerBox">
      <!-- <button class="conferAvatar"  bindtap="login"></button> -->
      <image class="headerAvatar" :src="user.avatar" @tap="getuserdetail(2)"></image>
      <text class="headerBoxTextNickName">{{user.username}}</text>
    </view>
    <view class="signBox" style="background-image: url(https://oa.zhigoukeji.com/home1.png);background-size:100% 100%;">
      <text>每日签到不间断，现金奖励嗨不停</text>
      <view @tap="sign" v-if="signtext==true">签到</view>
      <view v-if="!signtext">已签到</view>
    </view>

    <view class="max">
      <view class="balancebox">
        <view class="balance">
          <view class="balancetop"><text>我的余额</text>
            <image src="/static/home1.png" mode="aspectFit" @click="getnavto(0)"></image>
          </view>
          <view class="balancebottom">余额（元）<text style="color: #FF0000;font-size: 48rpx;">{{datamoney}}</text></view>
        </view>
        <view class="balance">
          <view class="balancetop"><text>累计收益</text>
            <image src="/static/home2.png" mode="aspectFit" @click="getnavto(1)"></image>
          </view>
          <view class="balancebottom"><text style="color: #FF0000;font-size: 48rpx;">{{user.meterMoneyCount}}</text>（元）</view>
           <text class="inform" v-if="soket104>0">{{soket104}}</text>
        </view>
      </view>
      <view class="balance1" style="margin-left: 30rpx;width: 690rpx;" @click="getnavto(2)">
        <image src="/static/home3.png" mode="aspectFit"></image>
        <text>已发布</text>
        <text class="inform" v-if="soket105>0">{{soket105}}</text>
      </view>
      <view class="balancebox">
        <view class="balance1" @click="getnavto(8)">
          <image src="/static/home4.png" mode="aspectFit"></image>
          <text>已提交</text>
          <text class="inform" v-if="soket103>0">{{soket103}}</text>
        </view>
        <view class="balance1" @click="getnavto(3)">
          <image src="/static/home5.png" mode="aspectFit"></image>
          <text>任务审核</text>
          <text class="inform" v-if="soket107>0">{{soket107}}</text>
        </view>
      </view>
      <view class="shopcar">
        <view class="all">
          <text>我的订单</text>
          <view class="allgo" data-index="0" @tap="getallorder">全部订单<image src="/static/image/arrow-green.png"></image>
          </view>
        </view>
        <view class="imgcar">
          <view class="cargo cargofirst">
            <image src="/static/image/shop1.png" data-index="0" @tap="getallorder"></image>
            <view>待发货</view>
          </view>
          <view class="cargo">
            <image src="/static/image/shop2.png" data-index="1" @tap="getallorder"></image>
            <view>待收货</view>
          </view>
          <view class="cargo">
            <image src="/static/image/shop3.png" data-index="2" @tap="getallorder"></image>
            <view>售后服务</view>
          </view>
        </view>
      </view>
      <view class="shopcar">
        <view class="all">
          <text>常用工具</text>
        </view>
        <view class="imgcar1">
          <view class="cargo1" @click="getnavto(4)">
            <image src="/static/my2.png"></image>
            <view>资金收入</view>
            <text class="inform"  v-if="soket101>0">{{soket101}}</text>
          </view>
          <view class="cargo1" @click="getnavto(5)">
            <image src="/static/my6.png" data-index="1"></image>
            <view>地址管理</view>
          </view>
          <view class="cargo1" @click="getnavto(6)">
            <image src="/static/my3.png" data-index="2"></image>
            <view>我的团队</view>
            <text class="inform"  v-if="soket102>0">{{soket102}}</text>
          </view>
          <view class="cargo1" @click="getnavto(7)">
            <image src="/static/my4.png" data-index="3"></image>
            <view>任务审核</view>
            <text class="inform" v-if="soket106>0">{{soket106}}</text>
          </view>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
  // pages/my/my.js
  var QQMapWX = require("../../utils/qqmap-wx-jssdk.min.js");
  var http = require("../../utils/http.js");
    var soket = require("../../utils/soket.js");
  var qqmapsdk;
  const app = getApp();

  export default {
    data() {
      return {
        listbox: ['/pages/withdraw/withdraw', '/pages/capital/capital', '/pages/my/releaselist',
          '/pages/my/missionlist', '/pages/income/income', '/pages/addressList/addressList', '/pages/teambox/myteam',
          '/pages/teambox/review','/pages/mysubmit/mysubmit'
        ],
        show: false,
        show1: false,
        isLogin: false,
        user: '',
        province: '',
        city: '',
        district: '',
        id: '',
        openid: '',
        signtext: true,
        datamoney: "",
        soket101:0,
        soket102:0,
        soket103:0,
        soket104:0,
        soket105:0,
        soket106:0,
        soket107:0,
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) { //请求接口判断签到没有，没有签到弹出签到框
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      const that = this;
      that.setData({
        province: uni.getStorageSync('province'),
        city: uni.getStorageSync('city'),
        district: uni.getStorageSync('district')
      });
      console.log('地址', that.province);

      const openid = uni.getStorageSync('openid');
      console.log("openid", openid);
      // that.signtrue();
      this.getuser()
    // 接收soket信息
    this.soket101=uni.getStorageSync('101')
    this.soket102=uni.getStorageSync('102')
    this.soket103=uni.getStorageSync('103')
    this.soket104=uni.getStorageSync('104')
    this.soket105=uni.getStorageSync('105')
    this.soket106=uni.getStorageSync('106')
    this.soket107=uni.getStorageSync('107')
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    methods: {
      //获取个人信息详情
       getuser(){
        var that = this;
        var url = 'api/users/userData';
        var data = {
          openid: uni.getStorageSync('openid')
        };
        http.postReq(url, data, function(res) {
          console.log('user', res);
          if (res.code == 200) {
            var avatar=res.data.avatar.charAt(0)
            if(avatar!='h'){
              res.data.avatar=http.rootDocment+res.data.avatar.substr(1)
            }
            res.data.meterMoneyCount=res.data.meterMoneyCount.toFixed(2)
            that.user=res.data
            
            that.datamoney=Number(res.data.user_money)-Number(res.data.frozen_money)
            that.datamoney= that.datamoney.toFixed(2)
          } else if (res.code == 400) {
            uni.showToast({
            	title:res.msg,
            	icon:'none',
            })
          }
        });
      },
      
      //根据结果判断是否要弹出签到框
      signtrue() {
        var that = this;
        var url = 'api/users/signCheck';
        var data = {
          openid: uni.getStorageSync('openid')
        };
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            that.setData({
              show: true,
              signtext: true
            });
          } else if (res.code == 400) {
            that.setData({
              signtext: false
            });
          }
        });
      },
      // 签到
      sign() {
        var that = this;
        var url = 'api/users/signCheck';
        var data = {
          openid: uni.getStorageSync('openid')
        };

        // if (data.openid == '') {
        //   uni.showModal({
        //     title: '警告',
        //     content: '请您登陆后在进行签到',
        //     showCancel: false,
        //     confirmText: '确定',
        //     success: function(res) { // 用户没有授权成功，不需要改变 isHide 的值
        //     }
        //   });
        //   return;
        // }
        uni.navigateTo({
          url: './signbox'
        })
      },

      // 弹窗关闭
      buttontap() {
        this.setData({
          show: false,
          show1: false
        });
      },



      //跳转
      getnavto(e) {
        let url = this.listbox[e];
        uni.navigateTo({
          url
        });

        console.log(url);
      },

      //已经登陆了点击头像跳转的个人详情页面
      getuserdetail(e) {
        var that=this
        if (e == 1) {
          uni.navigateTo({
            url: './setting?id='+that.user.id
          });
        } else {
          uni.navigateTo({
            url: '/pages/information/information'
          });
        }

      },

      //跳转去订单页面
      getallorder(e) {
        console.log(e.currentTarget.dataset.index);
        uni.navigateTo({
          url: '/pages/allorder/allorder?index=' + e.currentTarget.dataset.index
        });
      },

      // login() {
      //   // 微信登录
      //   const that = this;

      //   if (that.province == '') {
      //     uni.showModal({
      //       title: '警告',
      //       content: '您拒绝获取位置信息，将无法进入小程序，请授权之后再进入!!!',
      //       showCancel: false,
      //       confirmText: '返回授权',
      //       success: function(res) {
      //         // 用户没有授权成功，不需要改变 isHide 的值
      //         uni.openSetting({
      //           success(res) {
      //             console.log(res.authSetting['scope.userLocation']);

      //             if (res.authSetting['scope.userLocation']) {}
      //           }

      //         });
      //       }
      //     });
      //   } else {
      //     uni.getUserProfile({
      //       desc: '用于完善用户资料',
      //       // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      //       success: res => {
      //         console.log("用户信息", res);
      //         const iv = res.iv;
      //         const encryptedData = res.encryptedData;
      //         const avatarUrl = res.userInfo.avatarUrl;
      //         const nickName = res.userInfo.nickName; // 获取定位

      //         uni.login({
      //           success: function(res) {
      //             console.log(res);
      //             const code = res.code;
      //             console.log(code, 'code'); // const upper_openid=wx.getStorageSync('upper_openid');
      //             // const upper_openid = '';

      //             const url = 'api/login/login';
      //             const data = {
      //               code: code,
      //               nickName: nickName,
      //               avatarUrl: avatarUrl,
      //               iv: iv,
      //               encryptedData: encryptedData,
      //               upper_openid: '' || uni.getStorageSync('upper_openid'),
      //               province: that.province,
      //               city: that.city,
      //               district: that.district
      //             };
      //             console.log('shujju', data);
      //             http.postReq(url, data, function(res) {
      //               console.log("登录接口", res);
      //               uni.setStorageSync("user", res
      //                 .user); // wx.setStorageSync("integral", res.user.integral)

      //               uni.setStorageSync("openid", res.user.openid);
      //               that.setData({
      //                 isLogin: false,
      //                 user: res.user,
      //                 id: res.user.id,
      //                 openid: res.user.openid
      //               });
      //               console.log(res.user.phone);
      //               that.signtrue();

      //               if (res.user.phone == null || res.user.phone == "") {
      //                 uni.redirectTo({
      //                   url: '/pages/bindingPhone/bindingPhone?upper_openid=' + res.user
      //                     .upper_openid
      //                 });
      //               }

      //               if (res.user.status == 0) {
      //                 uni.redirectTo({
      //                   url: '/pages/banned/banned'
      //                 });
      //               }
      //             });
      //           }
      //         });
      //       },
      //       fail: err => {
      //         console.log(err, "1111"); //用户按了拒绝按钮

      //         uni.showModal({
      //           title: '警告',
      //           content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      //           showCancel: false,
      //           confirmText: '返回授权',
      //           success: function(res) {
      //             // 用户没有授权成功，不需要改变 isHide 的值
      //             if (res.confirm) {
      //               console.log('用户点击了“返回授权”');
      //             }
      //           }
      //         });
      //       }
      //     });
      //   }
      // }

    }
  };
</script>
<style>
  /* pages/my/my.wxss */
  page {
    background: #F5F5F5;
  }

  .setUp {
    width: 40rpx;
    height: 40rpx;
    position: fixed;
    right: 34rpx;
    top: 0rpx;
    /*  #ifdef  H5  */
    top: calc(88rpx + constant(safe-area-inset-top));
    top: calc(88rpx + env(safe-area-inset-top));
    /*  #endif  */
  }

  .headerBox {
    background: #00dfd7;
    height: 290rpx;
    border-radius: 0rpx 0rpx 140rpx 140rpx;
    padding-top: 20rpx;
  }

  .headerAvatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    display: block;
    margin: auto;
  }

  .conferAvatar {
    width: 120rpx !important;
    height: 120rpx !important;
    border-radius: 50%;
    line-height: 120rpx;
    color: #333;
    padding: 0rpx;
  }

  .headerBoxTextNickName {
    display: block;
    text-align: center;
    color: #FFF;
    font-size: 28rpx;
    margin-top: 10rpx;
  }

  .signBox {
    width: 92%;
    height: 108rpx;
    margin: auto;
    position: relative;
    top: -104rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rpx 20rpx;
    box-sizing: border-box;
  }

  .signBox text {
    font-size: 28rpx;
    color: #333;
  }

  .signBox view {
    width: 96rpx;
    height: 44rpx;
    color: #FFF;
    font-size: 24rpx;
    border-radius: 22rpx;
    text-align: center;
    line-height: 44rpx;
    background: #FF4631;
  }

  .max {
    margin-top: -100rpx;
    margin-bottom: 50rpx;
  }

  .navBox {
    width: 92%;
    margin: 20rpx auto 0rpx;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 20rpx;
    height: 88rpx;
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.10);
  }

  .navBox:active {
    background: #EFEFEF;
  }

  .navBox image {
    width: 48rpx;
    height: 48rpx;
  }

  .navBox text {
    font-size: 32rpx;
    color: #333;
    margin-left: 20rpx;
  }

  /* 自己写的遮罩 */
  /* 模态 */
  /* 弹出选项卡 */
  #cover {
    position: fixed;
    left: 0px;
    top: 0px;
    /*  #ifdef  H5  */
    top: calc(88rpx + constant(safe-area-inset-top));
    top: calc(88rpx + env(safe-area-inset-top));
    /*  #endif  */
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
    position: fixed;
    z-Index: 9999;
    top: 250rpx;
    left: 40rpx;
    text-align: center;
  }

  .tabc1 {
    position: fixed;
    z-Index: 9998;
    top: 250rpx;
    left: 125rpx;
  }

  .clock {
    width: 512rpx;
    height: 612rpx;
  }

  .btnclock {
    margin-top: 60rpx;
    width: 280rpx;
    height: 80rpx;
  }

  .bgclock {
    width: 512rpx;
    height: 596rpx;
  }

  .bgtext {
    font-size: 36rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: CENTER;
    color: #333333;
    position: absolute;
    z-Index: 9999;
    top: 310rpx;
    left: 100rpx;
  }

  /* 小汽车 */
  .shopcar {
    margin: 20rpx 30rpx 0;
    opacity: 1;
    background: #ffffff;
    border-radius: 10rpx;
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.10);
  }

  .all {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    border-bottom: 1px dashed #e5e5e5;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #333333;
  }

  .allgo {
    display: flex;
    align-items: center;
  }

  .allgo image {
    width: 24rpx;
    height: 24rpx;
    margin-left: 10rpx;
  }

  .imgcar {
    display: flex;
    font-size: 26rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    padding: 20rpx;
  }

  .imgcar1 {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    /* height: 160rpx; */
    font-size: 26rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    padding: 20rpx;
  }

  .cargo {
    text-align: center;
    margin-right: 60rpx;
    margin-top: 10rpx;
  }

  .cargo1 {
    text-align: center;
    margin-top: 10rpx;
    position: relative;
  }

  .cargofirst {
    margin-left: 30rpx;
  }

  .cargo image {
    width: 52rpx;
    height: 52rpx;
  }

  .cargo1 image {
    width: 52rpx;
    height: 52rpx;
  }

  /* balance */
  .balancebox {
    margin: 20rpx 30rpx;
    display: flex;
    justify-content: space-between;
  }

  .balance1 {
    width: 330rpx;
    height: 120rpx;
    background: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.10);
    text-align: center;
    line-height: 120rpx;
    position: relative;
  }

  .balance1 image {
    width: 60rpx;
    height: 60rpx;
    vertical-align: middle;
    margin-right: 20rpx;
  }

  .balance {
    width: 330rpx;
    background: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.10);
    position: relative;
  }

  .balancetop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx;
    border-bottom: 1px solid #ebebeb;
  }

  .balancetop image {
    width: 88rpx;
    height: 40rpx;
  }

  .balancebottom {
    padding: 40rpx 20rpx;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #333333;
  }
  .inform{
      position: absolute;
      top: 0;
      right: 0;
      background-color: #FA3534;
      color: #FFFFFF;
      width: 40rpx;
      height: 40rpx;
      font-size: 20rpx;
      border-radius: 50%;
      line-height: 40rpx;
      text-align: center;
  }
</style>
