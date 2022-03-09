<template>
  <view>
    <!--<import src="../../wxParse/wxParse.wxml"></import>-->
    <mp-html :content="article"></mp-html>
  </view>
</template>

<script>
  // pages/courselist/courselist.js
  const http = require("../../utils/http.js");


  export default {
    data() {
      return {
        article:'',
      };
    },

    components: {},
    props: {},




    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.getdatas()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    methods: {

      // 获取详情
      getdatas() {
        const that = this;
        var url = 'api/users/noticeInfo';
        var data = {
          type: 'yinsi'
        }
        http.postReq(url, data, function(res) {
      
          var article = res.data.content;
          /**
           * WxParse.wxParse(bindName , type, data, target,imagePadding)
           * 1.bindName绑定的数据名(必填)
           * 2.type可以为html或者md(必填)
           * 3.data为传入的具体数据(必填)
           * 4.target为Page对象,一般为this(必填)
           * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
           */

          that.article = that.escape2Html(article);
        });
      },

    }
  };
</script>
<style>
  /* pages/courselist/courselist.wxss */
  .copy {
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
