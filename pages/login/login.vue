<template>
  <view>
    <view class="loginTitle">智购协同</view>
    <input class="loginInput" type="text" v-model="phone" placeholder="请输入手机号" />
    <view class="loginInput" v-show="eyetrue==false">
      <input type="password" style="width: 400rpx;height: 88rpx;" v-model="passWord" placeholder="请输入密码" />
      <image src="/static/eyeclose.png" class="eye" @click="eyetrue=true"></image>
    </view>
    <view class="loginInput" v-show="eyetrue">
      <input type="text" style="width: 400rpx;height: 88rpx;" v-model="passWord" placeholder="请输入密码" />
      <image src="/static/eyetrue.png" class="eye" @click.stop="eyetrue=false"></image>
    </view>
    <view class="btn" @click="login">登录</view>
    <view class="regist">
      <text @click="navgetto(1)">注册账号</text>
      <text @click="navgetto(2)">忘记密码？</text>
    </view>
    <view class="deal">
      <icon type="success" color="#00dfd7" v-if="deal" @click="chagnedeal"></icon>
      <icon type="circle" v-else @click="chagnedeal"></icon>
      <view class="dealbox">
        我已阅读并同意<text style="color:#409eff" @click="getto(1)">《用户协议》</text>和<text style="color:#409eff"
          @click="getto(2)">《隐私政策》</text>
      </view>
    </view>
		<view class="deal1">v:{{version}}</view>
  </view>
</template>

<script>
  var http = require("../../utils/http.js");
  var soket = require("../../utils/soket.js");
  export default {
    data() {
      return {
        phone: '',
        passWord: '',
        eyetrue: false,
        clientid: '',
        deal: false,
				version:''
      }
    },
    onLoad() {
			this.version=plus.runtime.version
      var openid = uni.getStorageSync('openid')
      console.log(openid)
      if (openid == '' || openid == null) {

      } else {
        uni.switchTab({
          url: '/pages/index/index'
        })
      }
    },
    methods: {
      chagnedeal() {
        this.deal = !this.deal
      },
      getto(n) {
        var url = ''
        if (n == 1) {
          // url = "/pages/login/loginreg"
          url = "/pages/login/loginweb?id=" + n
        } else {
          // url = "/pages/login/loginyinsi"
          url = "/pages/login/loginweb?id=" + n
        }
        uni.navigateTo({
          url: url
        })
      },
      getlocation() {
        uni.getLocation({
          type: 'wgs84',
          // #ifdef APP-PLUS
          geocode: true,
          // #endif
          success: function(res) {
            console.log(res)
            console.log('当前位置的经度：' + res.longitude);
            console.log('当前位置的纬度：' + res.latitude);
            // {
            //   "type": "WGS84",
            //   "altitude": 0,
            //   "latitude": 34.756715,
            //   "longitude": 113.770471,
            //   "speed": 0,
            //   "accuracy": 25,
            //   "address": {
            //     "country": "中国",
            //     "province": "河南省",
            //     "city": "郑州市",
            //     "district": "管城回族区",
            //     "street": "榆林北路",
            //     "streetNum": "67号",
            //     "poiName": "升龙广场",
            //     "cityCode": "0371"
            //   },
            //   "errMsg": "getLocation:ok"
            // }

            // #ifdef APP-PLUS
            console.log(res.address.province)
            console.log(res.address.city)
            console.log(res.address.district)
            uni.setStorageSync("province", res.address.province);
            uni.setStorageSync("city", res.address.city);
            uni.setStorageSync("district", res.address.district);
            // #endif
          },
          fail(err) {
            console.log('四百', err)
          }
        });
      },
      //点击了登录按钮
      login() {
        var that = this;
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (this.deal == false) {
          uni.showToast({
            title: '请阅读并同意用户协议和隐私协议',
            icon: 'none',
            duration: 2000
          })
          return
        } else if (!myreg.test(that.phone)) {
          uni.showToast({
            title: '号码不符合规范',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        var phone = that.phone;
        var password = that.passWord;
        var url = 'api/login/login';
        var data = {
          phone,
          password,
          // #ifdef APP-PLUS
          province: uni.getStorageSync('province'),
          city: uni.getStorageSync('city'),
          district: uni.getStorageSync('district')
          // #endif
        }
        http.postReq(url, data, function(res) {
          console.log('登录信息', res);
          if (res.code == 200) {
            uni.showToast({
              title: '登录成功',
              duration: 2000,
              icon: 'none'
            })
            var openid = res.data.openid;
            uni.setStorageSync('openid', openid);
            console.log('user:'+openid)
            soket.send('user:'+openid);
            uni.setStorageSync('user', res.data);
            uni.setStorageSync('phone', phone);
            console.log(password)
            uni.setStorageSync('password', password);
            setTimeout(function() {
              uni.switchTab({
                url: '/pages/index/index'
              })
            }, 2000);
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
            })
          }
        })
      },
      navgetto(e) {
        if (this.deal == false) {
          uni.showToast({
            title: '请阅读并同意用户协议和隐私协议',
            icon: 'none',
            duration: 2000
          })
          return
        }
        let url = ''
        if (e == 1) {
          url = '/pages/register/register'
        } else {
          url = '/pages/register/forget'
        }
        uni.navigateTo({
          url
        })
      }
    }
  }
</script>

<style>
  .deal {
    position: fixed;
    bottom: 100rpx;
    display: flex;
    align-items: center;
    margin-left: 80rpx;
  }
.deal1 {
    position: fixed;
    bottom: 60rpx;
    display: flex;
    align-items: center;
		width: 100%;
		justify-content: center;
  }
  .dealbox {
    margin-left: 10rpx;
  }

  page {
    background-color: #fff;
  }

  .eye {
    width: 36rpx;
    height: 36rpx;
  }

  .loginTitle {
    color: #000000;
    font-size: 36rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    text-align: center;
    margin: 66rpx 0 172rpx;
  }

  .loginInput {
    box-sizing: border-box;
    margin: 0 auto;
    width: 586rpx;
    height: 88rpx;
    opacity: 1;
    background: #e8e8e8;
    border-radius: 44rpx;
    margin-bottom: 28rpx;
    padding: 0 58rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /*  .loginBox {
    box-sizing: border-box;
    margin: 0 auto;
    width: 586rpx;
    height: 88rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #e8e8e8;
    border-radius: 44rpx;
    margin-bottom: 28rpx;
    padding: 0 58rpx;
  } */

  .btn {
    margin: 0 auto;
    width: 584rpx;
    height: 88rpx;
    opacity: 1;
    background: #00dfd7;
    border-radius: 44rpx;
    color: #ffffff;
    font-size: 32rpx;
    text-align: center;
    line-height: 88rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    margin-bottom: 28rpx;
  }

  .regist {
    margin: 0 auto;
    color: #999999;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    display: flex;
    justify-content: space-between;
    width: 584rpx;
  }
</style>
