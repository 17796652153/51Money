<template>
<view>
<!--pages/order/order.wxml-->
<view class="swiper-tab">
       <view :class="'swiper-tab-list ' + (currentTab==0 ? 'on' : '')" data-current="0" @tap="swichNav">图片
              <view class="navBtm"></view>
       </view>
       <view :class="'swiper-tab-list ' + (currentTab==1 ? 'on' : '')" data-current="1" @tap="swichNav">文字
              <view class="navBtm"></view>
       </view>
       <view :class="'swiper-tab-list ' + (currentTab==2 ? 'on' : '')" data-current="2" @tap="swichNav">视频
              <view class="navBtm"></view>
       </view>
</view>

<swiper :current="currentTab" class="swiper-box" duration="300" :style="'height:' + (winHeight - 62) + 'rpx;padding-bottom:120rpx;'" @change="bindChange">
       <swiper-item>
              <view class="pickerdate-box">
                     <view v-for="(item, index) in imglist" :key="index" class="pickerdate">
                            <image :src="item.image" :data-index="index" @tap="previewImg"></image>
                     </view>
              </view>
       </swiper-item>
       <swiper-item>
                     <view v-for="(item, index) in imglist" :key="index" class="text-box">
                           <text selectable="true">{{item.text}}</text>
                     </view>
       </swiper-item>
       <swiper-item>
       <view v-for="(item, index) in imglist" :key="index" class="videobox">
              <video id="myVideo" :src="item.video" :poster="item.image" @error="videoErrorCallback"></video>
                     <!-- show-center-play-btn='{{false}}' show-play-btn="{{true}}"  -->
              <image src="/static/image/download.png" class="download" :data-index="item" @tap="downloadvideo"></image>
       </view>
       </swiper-item>
</swiper>
<picker @change="bindPickerChange" range-key="position_name"  :range="sheetbox">
<view class="bottom-box">
       分类
       <image src="/static/image/material.png"></image>
       筛选
</view>
</picker>
</view>
</template>

<script>
// pages/order/order.js
var http = require("../../utils/http.js");
const time = require("../../utils/time.js");

export default {
  data() {
    return {
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,
      videolist: ['https://vd3.bdstatic.com/mda-kjj7gq2kvv7nvs58/hd/mda-kjj7gq2kvv7nvs58.mp4?v_from_s=hkapp-haokan-tucheng&auth_key=1626502666-0-0-280a918bdbee34dd07b2c587ecf525e1&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=', 'http://vd3.bdstatic.com/mda-jgia8hayxi5wfx7a/mda-jgia8hayxi5wfx7a.mp4?playlist=["hd","sc"]', 'https://vd3.bdstatic.com/mda-kjj7gq2kvv7nvs58/hd/mda-kjj7gq2kvv7nvs58.mp4?v_from_s=hkapp-haokan-tucheng&auth_key=1626502666-0-0-280a918bdbee34dd07b2c587ecf525e1&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest='],
      sheet: [],
      pageindex: 1,
      type: '',
      imglist: [],
      sheetbox: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取当前设备的宽高
     */

    uni.getSystemInfo({
      success: function (res) {
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
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
    this.getlowerUser();
    this.setData({
      type: ''
    });
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
    onPullDownRefresh() {
        this.setData({
          pageindex: 1
        });
        this.getList();
        setTimeout(function () {
            uni.stopPullDownRefresh();
        }, 1000);
    },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(21312);
    var pageindexs = ++this.pageindex;
    console.log(pageindexs);
    this.setData({
      pageindex: pageindexs
    });
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    downloadvideo(e) {
      console.log("data-index值：", e.currentTarget.dataset.index);
      var url = e.currentTarget.dataset.index;
      let that = this; //获取相册授权

      uni.showModal({
        title: '提示',
        content: '请问是否要下载该视频',

        success(res) {
          if (res.confirm) {
            uni.getSetting({
              success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                  uni.authorize({
                    scope: 'scope.writePhotosAlbum',

                    success() {
                      //这里是用户同意授权后的回调
                      that.savevideo(url);
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
                  that.savevideo(url);
                }
              }

            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }

      });
    },

    savevideo(url) {
      let that = this;
      uni.downloadFile({
        url: url,
        success: function (res) {
          console.log(res); //图片保存到本地

          uni.saveVideoToPhotosAlbum({
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
    },

    // 获取邀请奖励信息
    getList() {
      const that = this;
      var url = "api/users/materialList";
      var type = 0;

      if (that.currentTab == 0) {
        type = 1;
      } else if (that.currentTab == 1) {
        type = 3;
      } else {
        type = 2;
      }

      var data = {
        limit: 20,
        page: that.pageindex,
        type: type,
        pid: that.type
      };
      http.postReq(url, data, function (res) {
        console.log(res);
        var arr = [];

        if (that.currentTab == 0) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].image = 'https://qny.zhigoukeji.com/' + res.data[i].image;
            arr.push(res.data[i]);
          }
        } else {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].image = http.rootDocment + res.data[i].image;
            res.data[i].video = http.rootDocment + res.data[i].video;
            arr.push(res.data[i]);
          }
        }

        if (that.pageindex == 1) {
          that.setData({
            imglist: res.data
          });
        } else {
          var c = that.imglist.concat(arr);
          that.setData({
            imglist: c
          });
        }
      });
    },

    //获取底部弹出框数据
    getlowerUser() {
      const that = this;
      var url = 'api/users/materialType';
      http.postReq(url, '', function (res) {
        if (res.code == 200) {
          console.log(res.data);
          var sheet = [];

          for (let index = 0; index < res.data.length; index++) {
            const el = res.data[index];
            console.log(el.position_name);
            sheet.push(el.position_name);
          }

          console.log(sheet);
          that.setData({
            sheet: sheet,
            sheetbox: res.data
          });
        }
      });
    },

    // picker
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      const that = this;
      this.setData({
        type: that.sheetbox[e.detail.value].id,
        pageindex: 1
      });
      this.getList();
    },
    // 预览图片
    previewImg: function (e) {
      //获取当前图片的下标
      var index = e.currentTarget.dataset.index; //所有图片

      var pics = this.imglist;
      console.log(pics);
      var imgbox = [];

      for (var i = 0; i < pics.length; i++) {
        imgbox.push(pics[i].image);
      }

      uni.previewImage({
        //当前显示图片
        current: imgbox[index],
        //所有图片
        urls: imgbox
      });
    },
    //  tab切换逻辑
    swichNav: function (e) {
      var that = this;

      if (this.currentTab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.target.dataset.current,
          pageindex: 1,
          type: ''
        });
        that.getList();
      }
    },
    bindChange: function (e) {
      var that = this;
      that.setData({
        currentTab: e.detail.current,
        pageindex: 1,
        type: ''
      });
      that.getList();
    },

    videoErrorCallback() {
      console.log("占位：函数 videoErrorCallback 未声明");
    }

  }
};
</script>
<style>
/* pages/material/material.wxss */
/* pages/order/order.wxss */

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
  /* display: inline-block; */
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
  padding-bottom: 160rpx;
}

.videobox {
  margin: 0 auto;
  text-align: center;
  position: relative;
}

#myVideo {
  width: 690rpx;
  height: 328rpx;
  margin-top: 20rpx;
}

.download {
  position: absolute;
  top: 20rpx;
  right: 50rpx;
  width: 60rpx;
  height: 60rpx;
}

.pickerdate-box{
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;
  margin-left:22rpx;
}
.pickerdate {
  width: 218rpx;
  height: 216rpx;
  border-radius: 20rpx;
  margin:0 10rpx;
  margin-top: 20rpx;
  overflow: hidden;
}
.pickerdate image{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.bottom-box{
  height: 98rpx;
  width: 100%;
  opacity: 1;
  background: #d4fffd;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20rpx;
}
.bottom-box image{
  width: 70rpx;
  height: 70rpx;
  margin: 0 10rpx;
}
.text-box{
  width: 690rpx;
min-height: 220rpx;
opacity: 1;
border: 2rpx solid #00dfd7;
border-radius: 20rpx;
margin: 10px auto;
}
</style>