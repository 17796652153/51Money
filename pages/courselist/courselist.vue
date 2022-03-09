<template>
<view>
<!--<import src="../../wxParse/wxParse.wxml"></import>-->
<mp-html :content="article"></mp-html>
</view>
</template>

<script>
// pages/courselist/courselist.js
const http = require("../../utils/http.js");

function getRandomColor() {
  const rgb = [];

  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length === 1 ? '0' + color : color;
    rgb.push(color);
  }

  return '#' + rgb.join('');
}

export default {
  data() {
    return {
      inputValue: '',
      src: '',
      danmuList: [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      }, {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }],
      content2: '',
      article: "",
      id: ""
    };
  },

  components: {},
  props: {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: 'video',
      path: 'page/component/pages/video/video'
    };
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.videoContext = uni.createVideoContext('myVideo');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      id: options.id
    });

    if (options.id) {
      this.getdatas();
    }
  },
  // content2

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
  methods: {
    bindInputBlur(e) {
      this.inputValue = e.detail.value;
    },

    bindButtonTap() {
      const that = this;
      uni.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: ['front', 'back'],

        success(res) {
          that.setData({
            src: res.tempFilePath
          });
        }

      });
    },

    bindVideoEnterPictureInPicture() {
      console.log('进入小窗模式');
    },

    bindVideoLeavePictureInPicture() {
      console.log('退出小窗模式');
    },

    bindPlayVideo() {
      console.log('1');
      this.videoContext.play();
    },

    bindSendDanmu() {
      this.videoContext.sendDanmu({
        text: this.inputValue,
        color: getRandomColor()
      });
    },

    videoErrorCallback(e) {
      console.log('视频错误信息:');
      console.log(e.detail.errMsg);
    },

    // 获取详情
    getdatas() {
      const that = this;
      let url = 'api/users/courseVideoDetails';
      let data = {
        id: that.id
      };
      http.postReq(url, data, function (res) {
        console.log(res); // that.setData({
        //   datalist: res.data
        // })

        that.setData({
          content2: res.data.content2
        });
        var article = res.data.content;
        /**
         * WxParse.wxParse(bindName , type, data, target,imagePadding)
         * 1.bindName绑定的数据名(必填)
         * 2.type可以为html或者md(必填)
         * 3.data为传入的具体数据(必填)
         * 4.target为Page对象,一般为this(必填)
         * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
         */

        console.log(12132, article);
        //WxParse.wxParse('article', 'html', article, that, 5)
        that.article = that.escape2Html(article);
      });
    },

    copycontet() {
      var that = this;

      if (that.content2 == '') {
        uni.showToast({
          title: '视频或图片不能复制',
          icon: 'none',
          duration: 2000
        });
      } else {
        uni.setClipboardData({
          data: that.content2,

          success(res) {
            uni.showToast({
              title: '复制成功',
              icon: 'none',
              duration: 2000
            });
          }

        });
      }
    }

  }
};
</script>
<style>
/* pages/courselist/courselist.wxss */
.copy{
  width: 150rpx;
  height: 50rpx;
  border-radius: 5rpx;
  line-height: 50rpx;
  background: #00dfd7;
  font-size: 28rpx;
  color: #ffffff;
  text-align: center;
  position: fixed;
  right: 0;
  top: 500rpx;
}
</style>