<template>
  <view>
    <view class="bindingBox">
      <text>团队名称</text>
      <view class="bindingBoxInputView">
        <input type="text" placeholder="请输入团队名称" :value="name" @input="getphone">
      </view>
    </view>
    <view class="bindingBox">
      <text>团队人数</text>
      <view class="bindingBoxInputView">
        <input type="text" placeholder="请规定团队人数" :value="num" @input="getcode">
      </view>
    </view>
    <view class="btn">
      <image src="/static/qdcjbtn.png" @tap="getsubmit"></image>
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
        name: '',
        num: '',
        istrue: false
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

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
      // 监听离开界面
      //获取电话
      getphone(e) {
        const that = this;
        console.log('11', e.detail.value);
        that.setData({
          name: e.detail.value
        });
      },

      getcode(e) {
        const that = this;
        that.setData({
          num: e.detail.value
        });
      },



      // 保存数据
      getsubmit() {
        const that = this;
        var url = 'api/team/createTeam'; // 正则判断手机号是否符合规范
        var data = {
          team_name: that.name,
          team_count: that.num,
          openid: uni.getStorageSync('openid')
        };
        http.postReq(url, data, function (res) {
          console.log(res);
          if (res.code == 200) {
            uni.showToast({
              title: '创建成功',
              icon: 'none',
              duration: 2000
            });
            setTimeout(function() {
              uni.navigateBack({
                delta:1
              })
            }, 2000);
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
            setTimeout(function() {
              uni.navigateBack({
                delta:1
              })
            }, 2000);
          }
        });
      
      }

    }
  };
</script>
<style>
  /* pages/bindingPhone/bindingPhone.wxss */
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
    width: 100%;
    text-align: center;
  }

  .btn image {
    width: 400rpx;
    height: 100rpx;
    margin-top: 80rpx;
  }
</style>
