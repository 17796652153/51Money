<template>
<view>
<view class="way">
  <view>提现方式</view>
  <view class="waywx">微信</view>
</view>
<view class="amount">
  <view class="title">提现金额</view>
  <view class="amountmoney">
    <text>￥</text>
    <input type="text" class="inputbox" :value="amoney" @input="getmoney">
  </view>
</view>
<view class="allamount-box">
  当前可用余额{{allmoney}}<text class="allamount " @tap="getall">全部提现</text>
</view>
<view class="btn">
  <image src="/static/image/tixianbtn.png" @tap="gowithdraw"></image>
</view>

     <!-- <view  @click="weixinLo">微信登录</view> -->
</view>
</template>

<script>
// pages/withdraw/withdraw.js
var http = require("../../utils/http.js");
const time = require("../../utils/time.js");
var soket = require("../../utils/soket.js");

export default {
  data() {
    return {
      allmoney: '150.35',
      amoney: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getuser()
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

  methods: {
    //获取个人数据,计算自己的金额
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
          that.allmoney=Number(res.data.user_money)-Number(res.data.frozen_money)
          that.allmoney= that.allmoney.toFixed(2)
        } else if (res.code == 400) {
          uni.showToast({
          	title:res.msg,
          	icon:'none',
          })
        }
      });
    },
    // 选择填入所有钱
    getall() {
      console.log(231);
      this.setData({
        amoney: this.allmoney
      });
    },

    // 监听输入提现多少
    getmoney(e) {
      this.setData({
        amoney: e.detail.value
      });
    },

    // 申请提现
    gowithdraw() {
      const that = this;

      if (this.amoney > this.allmoney) {
        uni.showModal({
          title: '提示',
          content: '提现金额不能超过总金额',
          showCancel: false,

          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }

        });
        return;
      } else if (this.amoney==0) {
        uni.showModal({
          title: '提示',
          content: '提现金额不能为0',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        });
        return;
      }

      var url = 'api/users/carryMoney';
      var data = {
        openid: uni.getStorageSync('openid'),
        carry_money: that.amoney,
        username: uni.getStorageSync('user').username,
        avatar: uni.getStorageSync('user').avatar
      };
      http.postReq(url, data, function (res) {
        if(res.code==101){
          that.weixinLo()
        }else if (res.code == 200) {
          soket.send("6"); 

          uni.navigateTo({
            url: '/pages/withdraw/withdrawtrue'
          });
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
    weixinLo() {
    	 let that = this;
        uni.login({
        provider: 'weixin',
        success: function(loginRes) {
          console.warn(loginRes.authResult);
          //这里吧数据全部提交给后台核验，有没有注册 注册了 后台代码会请求接口String s = HttpClient.doGet("https://api.weixin.qq.com/sns/userinfo?access_token=" + loginInfo.getToken() + "&openid=" + loginInfo.getOpenid()); 获取头像和昵称
          var url = 'api/users/addOpenid';
          var data = {
            openid: uni.getStorageSync('openid'),
            wx_openid:loginRes.authResult.openid
          };
          http.postReq(url, data, function(res) {
            console.log(res)
            if(res.code==200){
              uni.showToast({
                title: '绑定成功，请进行提现',
                icon: 'none',
                duration: 2000
              });
            }
          });
        },
        fail:function(err){
          console.log(err)
        },
        
      });
    },
    

  }
};
</script>
<style>
/* pages/withdraw/withdraw.wxss */
.way {
  width: calc(100% - 60rpx);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: CENTER;
  color: #333333;
  padding: 40rpx 0;
  margin: 0 30rpx;
  border-bottom: 2rpx solid #e5e5e5;
}
 
.waywx {
  width: 112rpx;
  height: 48rpx;
  line-height: 48rpx;
  opacity: 1;
  border: 2rpx solid #00dfd7;
  border-radius: 4rpx;
  font-size: 28rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: CENTER;
  color: #00dfd7;
  margin-left: 44rpx;
}

.amount {
  width: calc(100% - 60rpx);
  box-sizing: border-box;
  border-bottom: 2rpx solid #e5e5e5;
  margin: 0 30rpx;
}

.amount .title {
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: LEFT;
  color: #000000;
  margin: 20rpx 0;
}

.amountmoney {
  font-size: 72rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  color: #000000;
  display: flex;
  align-items: center;
}
.inputbox{
  height: 72rpx;
}
.allamount-box {
  margin: 20rpx 30rpx 0;
  font-size: 32rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: LEFT;
  color: #999999;
}

.allamount {
  color:#ff2424;
  margin-left: 50rpx;
}

.btn {
  width: 100%; 
  text-align: center;
}
.btn image{
  width: 400rpx;
  height: 100rpx;
  margin-top:80rpx;
}
</style>