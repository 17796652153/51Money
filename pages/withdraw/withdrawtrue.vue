<template>
  <view>
    <view class="signtrue">
      <image src="/static/image/moneysign.png"></image>
    </view>
    <view class="btntext">申请成功</view>
    <view class="btn">
      <image src="/static/image/getmoney.png" @tap="gettomoney"></image>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {};
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
      gettomoney() {
        uni.navigateBack({
          delta: 2
        });
      },

    }
  };
</script>
<style>
  /* pages/withdraw/withdrawtrue.wxss */
  /* pages/withdraw/withdraw.wxss */
  .signtrue {
    width: 100%;
    text-align: center;
    margin: 80rpx 0 40rpx;
  }

  .signtrue image {
    width: 160rpx;
    height: 160rpx;
  }

  .btntext {
    font-size: 40rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: CENTER;
    color: #333333;
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
