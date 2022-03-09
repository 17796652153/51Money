<template>
  <view>
    <!--pages/order/order.wxml-->
    <view class="swiper-tab">
      <view :class="'swiper-tab-list ' + (currentTab==0 ? 'on' : '')" data-current="0" @tap="swichNav">原密码修改
        <view class="navBtm"></view>
      </view>
      <view :class="'swiper-tab-list ' + (currentTab==1 ? 'on' : '')" data-current="1" @tap="swichNav">验证码修改
        <view class="navBtm"></view>
      </view>
    </view>

    <swiper :current="currentTab" class="swiper-box" duration="300"
      :style="'height:' + (winHeight - 62) + 'rpx;padding-bottom:30rpx;'" @change="bindChange">
      <swiper-item>
        <view class="bindingBox">
          <text>手机号</text>
          <view class="bindingBoxInputView">
            <input type="text" placeholder="请填写手机号" v-model="phone" />
          </view>
        </view>
        <view class="bindingBox">
          <text>原密码</text>
          <view class="bindingBoxInputView" style="display:flex;align-items: center;justify-content: space-between;"
            v-show="eyetrue2==false">
            <input type="password" style="width: 400rpx;height: 88rpx;" v-model="passWord2" placeholder="请输入密码" />
            <image src="/static/eyeclose.png" class="eye" @click="eyetrue2=true"></image>
          </view>
          <view class="bindingBoxInputView" style="display:flex;align-items: center;justify-content: space-between;"
            v-show="eyetrue2==true">
            <input type="text" style="width: 400rpx;height: 88rpx;" v-model="passWord2" placeholder="请输入密码" />
            <image src="/static/eyetrue.png" class="eye" @click.stop="eyetrue2=false"></image>
          </view>
        </view>
        <view class="bindingBox">
          <text>新密码</text>
          <view class="bindingBoxInputView" style="display:flex;align-items: center;justify-content: space-between;"
            v-show="eyetrue==false">
            <input type="password" style="width: 400rpx;height: 88rpx;" v-model="passWord" placeholder="请输入密码" />
            <image src="/static/eyeclose.png" class="eye" @click="eyetrue=true"></image>
          </view>
          <view class="bindingBoxInputView" style="display:flex;align-items: center;justify-content: space-between;"
            v-show="eyetrue==true">
            <input type="text" style="width: 400rpx;height: 88rpx;" v-model="passWord" placeholder="请输入密码" />
            <image src="/static/eyetrue.png" class="eye" @click.stop="eyetrue=false"></image>
          </view>
        </view>
        <view class="bindingBox">
          <text>确认新密码</text>
          <view class="bindingBoxInputView" style="display:flex;align-items: center;justify-content: space-between;"
            v-show="eyetrue1==false">
            <input type="password" style="width: 400rpx;height: 88rpx;" v-model="passWord1" placeholder="请输入密码" />
            <image src="/static/eyeclose.png" class="eye" @click="eyetrue1=true"></image>
          </view>
          <view class="bindingBoxInputView" style="display:flex;align-items: center;justify-content: space-between;"
            v-show="eyetrue1==true">
            <input type="text" style="width: 400rpx;height: 88rpx;" v-model="passWord1" placeholder="请输入密码" />
            <image src="/static/eyetrue.png" class="eye" @click.stop="eyetrue1=false"></image>
          </view>
        </view>
        <view class="btn" @click="getsubmit">
          确认更换
        </view>
      </swiper-item>
      <swiper-item>
        <view class="bindingBox">
          <text>手机号</text>
          <view class="bindingBoxInputView">
            <input type="text" placeholder="请填写手机号" :value="phone" @input="getphone" />
          </view>
        </view>
        <view class="bindingBox">
          <text>验证码</text>
          <view class="bindingBoxInputView" style="display:flex;align-items: center;">
            <input type="text" placeholder="请填写验证码" :value="code" @input="getcode" />
            <view :class="'sendPhone ' + (hide == 1 ? 'hide':'')" @tap="sendPhone">获取验证码</view>
            <view :class="'sendPhone ' + (hide == 2 ? 'hide':'')" @tap="sendPhone">重新获取({{num}})</view>
          </view>
        </view>
        <view class="bindingBox">
          <text>新密码</text>
          <view class="bindingBoxInputView" style="display:flex;align-items: center;justify-content: space-between;"
            v-show="eyetrue==false">
            <input type="password" style="width: 400rpx;height: 88rpx;" v-model="passWord" placeholder="请输入密码" />
            <image src="/static/eyeclose.png" class="eye" @click="eyetrue=true"></image>
          </view>
          <view class="bindingBoxInputView" style="display:flex;align-items: center;justify-content: space-between;"
            v-show="eyetrue==true">
            <input type="text" style="width: 400rpx;height: 88rpx;" v-model="passWord" placeholder="请输入密码" />
            <image src="/static/eyetrue.png" class="eye" @click.stop="eyetrue=false"></image>
          </view>
        </view>
        <view class="btn" @click="getsubmit1">
          确认更换
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
        phone: '',
        passWord1: '',
        passWord2: '',
        passWord: '',
        eyetrue1: false,
        eyetrue2: false,
        eyetrue: false,
        hide: 2,
        num: 60,
        code: ''
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      var that = this;
      console.log(options.index);
      that.setData({
        currentTab: options.index || 0
      });
      /**
       * 获取当前设备的宽高
       */

      uni.getSystemInfo({
        success: function(res) {
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
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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
      // 获取数据
      //获取电话
      getphone(e) {
        const that = this;
        console.log('11', e.detail.value);
        that.setData({
          phone: e.detail.value
        });
      },
      
      getcode(e) {
        const that = this;
        that.setData({
          code: e.detail.value
        });
      },
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

      //  tab切换逻辑
      swichNav: function(e) {
        var that = this;

        if (this.currentTab === e.target.dataset.current) {
          return false;
        } else {
          that.setData({
            currentTab: e.target.dataset.current,
            passWord: '',
            phone: '',
          });
          this.eyetrue1 = false
          this.eyetrue2 = false
          this.eyetrue = false
        }
      },
      bindChange: function(e) {
        var that = this;
        that.setData({
          currentTab: e.detail.current,
          passWord: '',
          phone: '',
        });
        this.eyetrue1 = false
        this.eyetrue2 = false
        this.eyetrue = false
      },
      //原密码修改密码
      getsubmit() {
        const that = this;
        var url = 'api/users/changePassword'; // 正则判断手机号是否符合规范

        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

        if (!myreg.test(that.phone)) {
          uni.showToast({
            title: '号码不符合规范',
            icon: 'none',
            duration: 2000
          });
          return false;
        } else if (that.passWord != that.passWord1) {
          uni.showToast({
            title: '两次密码不一样',
            icon: 'none',
            duration: 2000
          });
          return false;
        }

        var data = {
          password: that.passWord,
          primary_password: that.passWord2,
          openid: uni.getStorageSync('openid')
        };
        http.postReq(url, data, function(res) {
          console.log(res);

          if (res.code == 200) {
            uni.showToast({
              title: '修改成功',
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
      },

      getsubmit1() {
        const that = this;
        var url = 'api/login/retrievePassword'; // 正则判断手机号是否符合规范

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
          password: that.passWord
        };
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            uni.showToast({
              title: '修改成功',
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
  };
</script>
<style>
  .eye {
    width: 36rpx;
    height: 36rpx;
  }

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

  /* 修改密码 */
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
    background: #00DFD7;
    color: #FFF;
    font-size: 24rpx;
    text-align: center;
    line-height: 48rpx;
    border-radius: 24rpx;
  }

  .hide {
    display: none;
  }

  .btn {
    margin: 40rpx 30rpx;
    height: 76rpx;
    opacity: 1;
    background: #00DFD7;
    border-radius: 10rpx;
    line-height: 76rpx;
    text-align: center;
    color: #FFF;
  }
</style>
