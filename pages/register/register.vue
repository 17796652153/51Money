<template>
  <view>
    <view class="loginTitle">智购协同</view>
    <input class="loginInput" type="text" v-model="invite" placeholder="请输入邀请码" />
    <input class="loginInput" type="text" v-model="phone" placeholder="请输入手机号" />
    <view class="loginInput" style="padding-right: 10rpx;">
      <input type="text" placeholder="请填写验证码" v-model="code">
      <view :class="'sendPhone ' + (hide == 1 ? 'hide':'')" @tap="sendPhone">获取验证码</view>
      <view :class="'sendPhone ' + (hide == 2 ? 'hide':'')">重新获取({{num}})</view>
    </view>
    <view class="loginInput" v-show="eyetrue==false">
      <input type="password" style="width: 400rpx;height: 88rpx;" v-model="passWord" placeholder="请输入密码" />
      <image src="/static/eyeclose.png" class="eye" @click="eyetrue=true"></image>
    </view>
    <view class="loginInput" v-show="eyetrue">
      <input type="text" style="width: 400rpx;height: 88rpx;" v-model="passWord" placeholder="请输入密码" />
      <image src="/static/eyetrue.png" class="eye" @click.stop="eyetrue=false"></image>
    </view>
    <view class="btn" @click="getsubmit">注册</view>
    <view class="regist">
      <text @click="navgetto">账号密码登录</text>
    </view>
  </view>
</template>

<script>
  var http = require("../../utils/http.js");
  export default {
    data() {
      return {
        num: 60,
        hide: 2,
        code: '',
        invite: '',
        phone: '',
        passWord: '',
        eyetrue: false,
      }
    },
    methods: {
      //获取验证码
      sendPhone: function() {
        const that = this;
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

        if (!myreg.test(that.phone)) {
          uni.showToast({
            title: '号码不符合规范',
            icon: 'none',
            duration: 2000
          });
          return false;
        } else {
          var num = 60;
          this.setData({
            hide: 1
          });
          var times = setInterval(function() {
            num--;
            that.setData({
              num: num
            });

            if (num <= 0) {
              clearInterval(times);
              that.setData({
                hide: 2,
                num: 60
              });
            }
          }, 1000);
          var url = 'api/users/sendCode';
          var data = {
            phone: that.phone
          };
          http.postReq(url, data, function(res) {
            if (res.code == 200) {
              uni.showToast({
                title: '请等待',
                icon: 'none',
                duration: 2000
              });
            } else {
              uni.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000
              });
            }
          });
        }
      },
      navgetto() {
        uni.navigateBack({
          delta: 1
        })
      },
      //提交注册信息
      // 保存数据
      getsubmit() {
        const that = this;
        var url = 'api/login/register'; // 正则判断手机号是否符合规范

        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

        if (!myreg.test(that.phone)) {
          uni.showToast({
            title: '号码不符合规范',
            icon: 'none',
            duration: 2000
          });
          return false;
        }

        var data = {
          phone: that.phone,
          code: that.code,
          yqm: that.invite,
          password: that.passWord,
         // #ifdef APP-PLUS
         province: uni.getStorageSync('province'),
         city: uni.getStorageSync('city'),
         district: uni.getStorageSync('district') 
         // #endif
        };
        http.postReq(url, data, function(res) {
          console.log(res);

          if (res.code == 200) {
            uni.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 2000
            });
            setTimeout(function() {
              uni.reLaunch({
                url: '/pages/login/login'
              });
            }, 2000);
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      }

    }
  }
</script>

<style>
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

  .bindingBox {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0rpx 4%;
    box-sizing: border-box;
    align-items: center;
  }

  .bindingBox text {
    font-size: 32rpx;
    color: #333;
    display: inline-block;
    width: 31%;
    text-align: left;
  }

  .bindingBox .bindingBoxInputView {
    width: 69%;
    border-bottom: 1rpx solid #e5e5e5;
  }

  .bindingBox input {
    height: 130rpx;
  }

  .sendPhone {
    display: inline-block;
    width: 180rpx;
    height: 48rpx;
    color: #999;
    font-size: 24rpx;
    text-align: center;
    line-height: 48rpx;
    border-radius: 24rpx;
  }

  .hide {
    display: none;
  }
</style>
