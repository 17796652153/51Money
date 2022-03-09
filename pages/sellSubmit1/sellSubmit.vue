<template>
<view>
<!--pages/clueSubmit/clueSubmit.wxml-->
<view class="back"></view>
<view class="clueBox">
  <input type="text" placeholder="请备注联系人电话" placeholder-class="input-placeholder" :value="tel" @input="gettel">
  <input type="text" placeholder="请输入详细地址，如街道、社区等" placeholder-class="input-placeholder" :value="address" @input="getaddress">
  <input type="text" placeholder="请输入售货机品牌" :value="shop" placeholder-class="input-placeholder" @input="getshop">
  <view class="uploader-img  flex justify-content-start" v-if="pics">
    <view class="upAdd" @tap="chooseImg">
      <image style="width:160rpx;height:160rpx;" src="/static/image/uploads_image.png" mode="widthFix"></image>
    </view>
    <view v-for="(item, index) in pics" :key="index" class="uploader-list">
      <image style="width:160rpx;height:160rpx;" :src="item" :data-index="index" mode="scaleToFill" @tap="previewImg1"></image>
      <image class="delete" style="width:52rpx;height:52rpx;" :data-index="index" src="/static/image/gb.png" mode="widthFix" @tap="deleteImg"></image>
    </view>

  </view>


  <view class="text">温馨提示：{{tips4}}</view>
  <image class="sendForm" src="/static/image/ljbc.png" @tap="getsubmit"></image>
</view>

<view style="height:100rpx;"></view>
</view>
</template>

<script>
// pages/opinion/opinion.js
var http = require("../../utils/http.js");
var soket = require("../../utils/soket.js");

export default {
  data() {
    return {
      pics: [],
      //图片
      array: ['渠道1', '渠道2'],
      tel: '',
      address: '',
      shop: '',
      user: '',
      tips4: "",
      id: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      id: options.id
    });

    if (options.id) {
      this.getmostdetail();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      user: uni.getStorageSync('user'),
      tips4: uni.getStorageSync('tips4')
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
    getmostdetail() {
      const that = this;
      let url = 'api/users/lookup';
      let data = {
        id: that.id
      };
      http.postReq(url, data, function (res) {
        if (res.code == 200) {
          var imgList = [];

          if (res.data.image != '') {
            imgList = res.data.image.split(',');
          }

          that.setData({
            tel: res.data.phone,
            address: res.data.address,
            shop: res.data.brand,
            pics: imgList
          });
        }
      });
    },

    // 获取用户填写的信息
    gettel(e) {
      this.setData({
        tel: e.detail.value
      });
    },

    getaddress(e) {
      this.setData({
        address: e.detail.value
      });
    },

    getshop(e) {
      this.setData({
        shop: e.detail.value
      });
    },

    // 提交售货机
    getsubmit() {
      //  api/users/submitClue
      const that = this;
      let url = 'api/users/UpdaSubmit';
      let date = {
        openid: uni.getStorageSync('openid'),
        id: that.id,
        phone: that.tel,
        image: that.pics,
        address: that.address,
        brand: that.shop,
        avatar: that.user.avatar,
        nick: that.user.username,
        province: uni.getStorageSync('province'),
        city: uni.getStorageSync('city'),
        area: uni.getStorageSync('district')
      }; //console.log('接口数据',date)

      http.postReq(url, date, function (res) {
        if (res.code == 200) {
          soket.send("4");
          uni.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 2000
          });
          setTimeout(function () {
            uni.navigateTo({
              url: '/pages/mysubmit/mysubmit'
            });
          }, 2000);
        }
      });
    },

    /**
     * 图片放大查看
     */
    previewImg: function (e) {
      var index = e.target.dataset.index; //当前图片地址

      var imgArr = e.target.dataset.list; //所有要预览的图片的地址集合 数组形式

      console.log(index, imgArr);
      uni.previewImage({
        current: imgArr[index],
        urls: imgArr
      });
    },

    /**
     * 图片上传
     * 
     */
    //上传图片开始
    chooseImg: function (e) {
      var that = this,
          pics = this.pics;
      console.log(pics);
      uni.chooseImage({
        count: 1,
        // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'],
        // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          let url = 'api/users/upload';
          http.base64({
            url: tempFilePaths[0],
            type: 'png'
          }).then(res => {
            let data = {
              base64: res
            };
            http.postReq(url, data, function (res) {
              if (res.code == 200) {
                pics.push(http.rootDocment + res.data);
                that.setData({
                  pics: pics
                });
              }
            });
          });
        }
      });
    },
    // 删除图片
    deleteImg: function (e) {
      var that = this;
      var pics = this.pics;
      var index = e.currentTarget.dataset.index;
      pics.splice(index, 1);
      console.log(pics);
      this.setData({
        pics: pics
      });
    },
    // 预览图片
    previewImg1: function (e) {
      //获取当前图片的下标
      var index = e.currentTarget.dataset.index; //所有图片

      var pics = this.pics;
      uni.previewImage({
        //当前显示图片
        current: pics[index],
        //所有图片
        urls: pics
      });
    }
  }
};
</script>
<style>
/* pages/clueSubmit/clueSubmit.wxss */
.back {
   height: 350rpx;
   background: linear-gradient(#00DFD7, #FFF 100%);
   text-align: center;
   font-size: 36rpx;
   color: #FFF;
   padding-top: 70rpx;
   box-sizing: border-box;
}

.clueBox {
   width: 92%;
   margin: auto;
   border-radius: 10px;
   padding: 80rpx 40rpx 20rpx 40rpx;
   box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.25);
   box-sizing: border-box;
   position: relative;
   top: -290rpx;
   z-index: 999;
   background: #FFF;
}

.clueBox input {
   background: #ebebeb;
   margin-top: 30rpx;
   height: 68rpx;
   border-radius: 34rpx;
   padding: 0rpx 20rpx;
   box-sizing: border-box;
}

.clueBox textarea {
   background: #ebebeb;
   margin-top: 30rpx;
   height: 160rpx;
   border-radius: 34rpx;
   padding: 10rpx 20rpx;
   box-sizing: border-box;
}

.uploader-img {
   display: flex;
   flex-wrap: wrap;
   margin-top: 30rpx;
}

.uploader-list {
   width: 160rpx;
   position: relative;
   /* float:left; */
   margin-left: 14rpx;
}

.uploader-list:nth-child(1) {
   margin-left: 0rpx;
}

.uploader-list:nth-child(4) {
   margin-left: 0rpx;
}

.uploader-list:nth-child(7) {
   margin-left: 0rpx;
}

.uploader-list:nth-child(10) {
   margin-left: 0rpx;
}

.delete {
   position: absolute;
   right: 0rpx;
}

.weui-input {
   background: #f0f2f4;
   height: 84rpx;
   padding-left: 30rpx;
   box-sizing: border-box;
   border-radius: 16rpx;
   margin-top: 20rpx;
}

.radio-group {
   margin-top: 30rpx;
}

.radio {
   font-size: 32rpx;
   color: #333;
}

.radio:nth-child(2) {
   margin-left: 80rpx;
}

.text {
   font-size: 28rpx;
   color: #666;
   margin-top: 120rpx;
}

.sendForm {
   width: 400rpx;
   height: 100rpx;
   display: block;
   margin: 40rpx auto 0rpx;
}

.myPicker {
   background: #ebebeb;
   margin-top: 30rpx;
   height: 68rpx;
   border-radius: 34rpx;
   padding: 0rpx 20rpx;
   box-sizing: border-box;
   line-height: 60rpx;
   color: #333;
}

.input-placeholder {
   color: #333;
}

.xl {
   width: 32rpx;
   height: 30rpx;
}

.picker {
   display: flex;
   align-items: center;
   justify-content: space-between;
}
</style>