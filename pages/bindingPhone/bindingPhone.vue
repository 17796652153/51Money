<template>
<view>
<view class="bindingBox">
     <text>手机号</text>
     <view  class="bindingBoxInputView">
      <input type="text" placeholder="请填写手机号" :value="phone" @input="getphone"/>
     </view>
</view>
<view class="bindingBox">
     <text>验证码</text>
     <view  class="bindingBoxInputView" style="display:flex;align-items: center;">
      <input type="text" placeholder="请填写验证码" :value="code"   @input="getcode"/>
      <view :class="'sendPhone ' + (hide == 1 ? 'hide':'')" @tap="sendPhone">获取验证码</view>
      <view :class="'sendPhone ' + (hide == 2 ? 'hide':'')" @tap="sendPhone">重新获取({{num}})</view>
     </view>
</view>
<view class="btn" @click="getsubmit">
     确认更换
</view>
<view class="tishi">
     <text>温馨提示：</text>手机号更换后，账户所有信息将同步至新手机号码，原手机号码将不能在使用。
</view>
</view>
</template>

<script>
// pages/bindingPhone/bindingPhone.js
var http = require("../../utils/http.js");

export default {
  data() {
    return {
      num: 60,
      hide: 2,
      phone: '',
      code: '',

      istrue: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      upper_openid: options.upper_openid
    });
    this.getinviter();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
    // 监听离开界面
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
    sendPhone: function () {
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
        var times = setInterval(function () {
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
        http.postReq(url, data, function (res) {
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

    // 获取电话
    getinviter() {
      var that = this;
      var url = 'api/users/upperPhone';
      var data = {
        upper_openid: that.upper_openid
      };
      http.postReq(url, data, function (res) {
        that.setData({
          inviter: res.data.phone
        });
      });
    },

    // 保存数据
    getsubmit() {
      const that = this;
      var url = 'api/users/bindingPhone'; // 正则判断手机号是否符合规范

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
        openid: uni.getStorageSync('openid')
      };
      http.postReq(url, data, function (res) {
        console.log(res);

        if (res.code == 200) {
          uni.showToast({
            title: '成功',
            icon: 'none',
            duration: 2000
          });
          setTimeout(function () {
            uni.switchTab({
              url: '/pages/my/my'
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
  /* pages/bindingPhone/bindingPhone.wxss */
  .bindingBox{
     display:flex;
     justify-content: center;
     width:100%;
     padding:0rpx 4%;
     box-sizing: border-box;
     align-items: center;
  }  
  .bindingBox text{
       font-size:32rpx;
       color:#333;
       display: inline-block;
       width:31%;
       text-align:left;
  }
  .bindingBox .bindingBoxInputView{
      width:69%;
      border-bottom:1rpx solid #e5e5e5;
  }
  .bindingBox input{
      height:130rpx;
  }
  .sendPhone{
     display: inline-block;
     width:180rpx;
     height:48rpx;
     background:#00DFD7;
     color:#FFF;
     font-size:24rpx;
     text-align: center;
     line-height:48rpx;
     border-radius:24rpx;
  }
  .hide{
    display:none;
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
  .tishi{
    margin:  0  30rpx;
    font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  color: #666666;
  }
  .tishi text{
    color: #FE6668;
  }
</style>