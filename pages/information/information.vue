<template>
  <view>
    <!--pages/bindingPhone/bindingPhone.wxml-->
    <view class="bindingBox bindingBox2">
      <text>头像</text>
      <image class="avatar" :src="avatar" @click="chooseImg"></image>
    </view>
    <view class="bindingBox">
      <text>昵称</text>
      <view class="bindingBoxInputView">
        <input type="text" placeholder-class="placeholder" v-model="user.username"  >
      </view>
    </view>
    <view class="bindingBox">
      <text>性别</text>
      <picker class="myPicker" @change="bindPickerChange"  :range="array">
        <view class="picker" style="justify-content: space-between;">
          <text>{{array[sex]}}</text>
          <image class="xl" src="/static/image/xl.png"></image>
        </view>
      </picker>
    </view>
    <view class="bindingBox">
      <text>出生日期</text>
      <picker class="myPicker" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
        <view class="picker" style="justify-content: space-between;">
          {{date}}
          <image class="xl" src="/static/image/xl.png"></image>
        </view>
      </picker>
    </view>

    <view class="bindingBox">
      <text>支付宝姓名</text>
      <view class="bindingBoxInputView">
        <input type="text" placeholder-class="placeholder" placeholder="请输入支付宝姓名" @input="alipayNameInput"
          :value="alipay_name">
      </view>
    </view>
    <view class="bindingBox">
      <text>支付宝账号</text>
      <view class="bindingBoxInputView">
        <input type="text" placeholder-class="placeholder" placeholder="请输入支付宝账号" @input="alipayNumberInput"
          :value="alipay_number">
      </view>
    </view>
    <view class="bindingBox">
      <text>微信账号</text>
      <view class="bindingBoxInputView">
        <input type="text" placeholder-class="placeholder" placeholder="请输入微信账号" @input="wechatNumberInput"
          :value="wechat_number">
      </view>
    </view>

    <image class="myClick" src="/static/image/bcxg.png" @tap="getsubmit"></image>
  </view>
</template>

<script>
  // pages/bindingPhone/bindingPhone.js
  var http = require("../../utils/http.js");
 var time = require("../../utils/time.js");
 import {
   pathToBase64,
   base64ToPath
 } from '../../components/image-tools/index.js'
  export default {
    data() {
      const currentDate = this.getDate({
        format: true
      })
      return {
        num: 60,
        hide: 2,
        user: '',
        sex: 0,
        array: ['保密','男', '女'],
        date: '未知',
        alipay_name: '',
        alipay_number: '',
        wechat_number: '',
        phone_code: '',
        avatar:''
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      this.getuserdetail();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    computed: {
      startDate() {
        return this.getDate('start');
      },
      endDate() {
        return this.getDate('end');
      }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    methods: {
      bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
          sex: e.detail.value
        });
      },
      bindDateChange: function(e) {
        this.date = e.target.value
      },
      getDate(type) {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (type === 'start') {
          year = year - 60;
        } else if (type === 'end') {
          year = year + 2;
        }
        month = month > 9 ? month : '0' + month;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
      },
      // 获取个人数据
      getuserdetail() {
        console.log(231);
        var that = this;
        var url = 'api/users/userData';
        var data = {
           openid: uni.getStorageSync('openid')
        };
        http.postReq(url,data, function(res) {
          console.log(res.data);
          if (res.code == 200) {
            that.avatar=res.data.avatar.charAt(0)
            if(that.avatar!='h'){
             that.avatar=http.rootDocment+res.data.avatar.substr(1)
            }else{
              that.avatar=res.data.avatar
            }
            console.log(that.avatar)
           var date= time.formatTimeTwo(res.data.birthday,'Y-M-D')
            that.setData({
              user: res.data,
              sex:res.data.sex,
              date,
              alipay_name: res.data.alipay_name,
              alipay_number: res.data.alipay_number,
              wechat_number: res.data.wechat_number
            });
          }
        });
      },

      // getsubmit
      //获取用户输入支付宝名字
      alipayNameInput: function(e) {
        this.setData({
          alipay_name: e.detail.value
        });
      },
      //获取用户输支付宝账号
      alipayNumberInput: function(e) {
        this.setData({
          alipay_number: e.detail.value
        });
      },
      //获取用户输微信名
      wechatNumberInput: function(e) {
        this.setData({
          wechat_number: e.detail.value
        });
      },
      //获取用户输入的验证码
      codeInput: function(e) {
        this.setData({
          phone_code: e.detail.value
        });
      },
      
      getsubmit() {
        var that = this;
        console.log(that.alipay_name);
        console.log(that.alipay_number);
        console.log(that.wechat_number);
        console.log(new Date(this.date))
        var birthday=new Date(this.date).getTime()/1000
        console.log(birthday); 
        var url = "api/users/updateUserData";
        var data = {
          openid: uni.getStorageSync('openid'),
          phone: that.user.phone,
          username:that.user.username,
          avatar:that.avatar,
          sex:that.sex,
          birthday,
          alipay_name: that.alipay_name,
          alipay_number: that.alipay_number,
          wechat_number: that.wechat_number
        };
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            uni.showToast({
              title: '修改成功',
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
      },
      
      // 上传图片
      //上传图片开始
      chooseImg: function(e) {
        var that = this
        uni.chooseImage({
          count: 1,
          // 最多可以选择的图片张数，默认9
          sizeType: ['compressed'],
          // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'],
          // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            uni.showLoading({
                title: '上传中···'
            });
            pathToBase64(tempFilePaths[0])
              .then(base64 => {
                console.log(base64)
                let url = 'api/users/upload';
                var data = {
                  base64
                }
                http.postReq(url, data, function(res) {
                  if (res.code == 200) {
                    that.avatar=http.rootDocment + res.data.substr(1)
                    uni.hideLoading();
                  }
                });
              })
              .catch(error => {
                console.error(error)
              })
          }
        });
      },
    }
  };
</script>
<style>
  /* pages/bindingPhone/bindingPhone.wxss */
  .bindingBox {
    display: flex;
    /* justify-content: center; */
    width: 100%;
    padding: 0rpx 4%;
    box-sizing: border-box;
    align-items: center;
  }

  .bindingBox2 {
    justify-content: space-between;
    margin-top: 20rpx;
  }

  .bindingBox text {
    font-size: 32rpx;
    color: #333;
    display: inline-block;
    width: 27%;
    text-align: left;
  }

  .avatar {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
  }

  .bindingBox .bindingBoxInputView {
    width: 69%;
    border-bottom: 1rpx solid #e5e5e5;
  }

  .bindingBox input {
    height: 112rpx;
    color: #333;
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

  .myClick {
    width: 400rpx;
    height: 100rpx;
    display: block;
    margin: 160rpx auto 0rpx;
  }

  /* picker */
  .myPicker {
    width: 69%;
  }

  .xl {
    width: 32rpx;
    height: 30rpx;
  }

  .picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 130rpx;
  }

  .picker .flex {
    display: flex;
    align-items: center;
  }
</style>
