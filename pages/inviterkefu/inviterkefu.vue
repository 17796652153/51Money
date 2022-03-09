<template>
<!--pages/Inviter/Inviter.wxml-->
<view class="container">
  <image src="/static/image/qrbg.png" class="imagebg"></image>
  <view class="up">
    <view class="content">
      <view>扫码联系客服</view>
      <image :src="imgUrl"></image>
    </view>
    <view class="btn">
      <image src="/static/image/qrbt.png" @tap="saveimg"></image>
    </view>
  </view>
</view>
</template>

<script>
// pages/Inviter/Inviter.js
var http = require("../../utils/http.js");

export default {
  data() {
    return {
      imgUrl: "",
      user: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      user: uni.getStorageSync('user')
    });
    this.getqrcode();
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
  methods: {
    //获取二维码 
    getqrcode() {
      const that = this;
      var url = 'api/users/sitePhone';
      http.postReq(url, '', function (res) {
        if (res.code == 200) {
          console.log('客服',res.data)
          that.setData({
            imgUrl: http.rootDocment + res.data
          });
        }
      });
    },

    // 保存二维码
    getsave() {
      let that = this; //获取相册授权

      uni.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            uni.authorize({
              scope: 'scope.writePhotosAlbum',

              success() {
                //这里是用户同意授权后的回调
                that.saveimg();
              },

              fail() {
                //这里是用户拒绝授权后的回调
                uni.showModal({
                  title: '警告',
                  content: '您拒绝获取相册信息,无法进行保存,请打开相册授权',
                  showCancel: false,
                  confirmText: '返回授权',
                  success: function (res) {
                    // 用户没有授权成功，不需要改变 isHide 的值
                    uni.openSetting({
                      success(res) {
                        console.log(res.authSetting['scope.writePhotosAlbum']);
                      }

                    });
                  }
                });
              }

            });
          } else {
            //用户已经授权过了
            that.saveimg();
          }
        }

      }); // saveImageToPhotosAlbum
    },

    saveimg() {
      let that = this;
      let imgSrc = that.imgUrl;
      console.log(imgSrc);
      uni.downloadFile({
        url: imgSrc,
        success: function (res) {
          console.log(res); //图片保存到本地

          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              uni.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 2000
              });
            }
          });
        }
      });
    }

  }
};
</script>
<style>
/* pages/Inviter/Inviter.wxss */
.container{
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
}
.imagebg{
  position: absolute;
  width: 100%;
  height: 100%;
}
.up{
  position: absolute;
  z-index: 1;
}
.content{
  box-sizing: border-box;
  width: 630rpx;
  height: 644rpx;
  opacity: 1;
  background: #ffffff;
  border-radius: 20rpx;
  font-size: 44rpx;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: CENTER;
  color: #333333;
  margin: 120rpx auto;
  padding-top: 80rpx;
}

.content image{
  width: 400rpx;
  height: 400rpx;
  margin-top: 40rpx;
}
.btn {
  width: 100%;
  text-align: center;
}
.btn image{
  width: 400rpx;
  height: 100rpx;
}

</style>