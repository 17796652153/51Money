<template>
  <view>
    <!--pages/clueSubmit/clueSubmit.wxml-->
    <view class="back">
      <image style="width: 750rpx;height: 276rpx;" src="/static/bg1.png" mode="scaleToFill"></image>
      <image style="width: 750rpx;height: calc(100% - 276rpx);" src="/static/allbg.png" mode="scaleToFill"></image>
    </view>
    <view style="position: absolute;z-index: 1;top: 210rpx;width: 750rpx;overflow: hidden;">
      <view style="width: 690rpx;left: 30rpx;position: relative;">
        <view class="missonbg">
          <view class="mBgTop">
            <text>{{channel.title}}</text>
            <view class="TopMoney">{{channel.money}}元/<text style="font-size: 26rpx">条</text></view>
          </view>
          <view class="mBgmiddele">
            <view class="mbgmbox">
              平台认证
            </view>
            <view class="mbgmbox" style="background: #e0ffeb">
              线索提交
            </view>
          </view>
          <view class="mBgbottom" style="position: relative;">
            <image :src="item" mode="scaleToFill" class="bottomposimg"
              style="width: 40rpx;height: 40rpx;position: absolute;border-radius: 50%;" v-for="item in channel.avatar"
              :key='item'></image>
            <text
              style="position: absolute;left: 140rpx;font-size: 24rpx;color: #999;line-height: 40rpx;">已有{{channel.clueCount}}人完成该任务</text>
          </view>
        </view>
        <!-- 兼职要求 -->
        <view style="width: 690rpx;">
          <view
            style="margin: 40rpx 0 20rpx;  color: #333333;font-size: 32rpx;font-family: PingFang SC, PingFang SC-Regular;">
            兼职要求
          </view>
          <view class="partbox">
            <view class="part">
              <image class="partL" src="/static/zizuan.png" mode="scaleToFill"></image>
              <view class="partR">
                <view class="subtitile">技能要求</view>
                <view>{{channel.skill}}</view>
              </view>
            </view>
            <view class="part">
              <image class="partL" src="/static/worktime.png" mode="scaleToFill"></image>
              <view class="partR">
                <view class="subtitile">工作经验</view>
                <view>{{channel.exp}}</view>
              </view>
            </view>
            <view class="part">
              <image class="partL" src="/static/zisetting.png" mode="scaleToFill"></image>
              <view class="partR">
                <view class="subtitile">设备要求</view>
                <view>{{channel.dev}}</view>
              </view>
            </view>
          </view>
        </view>
        <!--任务说明  -->
        <view style="width: 690rpx;">
          <view
            style="margin: 40rpx 0 20rpx;  color: #333333;font-size: 32rpx;font-family: PingFang SC, PingFang SC-Regular;">
            任务说明
          </view>
          <view class="partbox">
             <text style="display: inline-block;" selectable="true">{{channel.description}}</text>
          </view>
        </view>
        <!-- 发布者 -->
        <view style="width: 690rpx;">
          <view
            style="margin: 40rpx 0 20rpx;  color: #333333;font-size: 32rpx;font-family: PingFang SC, PingFang SC-Regular;">
            发布者
          </view>
          <view class="partbox">
            <view style="display: flex;align-items: center;">
              <image class="issimg" src="/static/misson.png" mode="scaleToFill"></image>
              <view>平台</view>
            </view>
          </view>
        </view>
        <!-- 任务提交 -->
        <view style="width: 690rpx;">
          <view
            style="margin: 40rpx 0 20rpx;  color: #333333;font-size: 32rpx;font-family: PingFang SC, PingFang SC-Regular;">
            任务提交
          </view>
          <view class="clueBox">
            <input type="text" placeholder="请备注联系人电话" placeholder-class="input-placeholder" :value="tel"
              @input="gettel">
            <input type="text" placeholder="请输入详细地址" placeholder-class="input-placeholder" :value="address"
              @input="getaddress">
            <input type="text" placeholder="请输入售货机品牌" placeholder-class="input-placeholder" :value="shop"
              @input="getshop">
            <view class="uploader-img  flex justify-content-start" v-if="pics">
              <view class="upAdd" @tap="chooseImg">
                <image style="width:160rpx;height:160rpx;" src="/static/uploads_image.png" mode="widthFix">
                </image>
              </view>
              <view v-for="(item, index) in pics" :key="index" class="uploader-list">
                <image style="width:160rpx;height:160rpx;" :src="item" :data-index="index" mode="scaleToFill"
                  @tap="previewImg1"></image>
                <image class="delete" style="width:52rpx;height:52rpx;" :data-index="index" src="/static/image/gb.png"
                  mode="widthFix" @tap="deleteImg"></image>
              </view>
            </view>
            <view class="text">温馨提示：{{tips4}}</view>
          </view>
        </view>

      </view>
      <view class="sendForm" @click="getsubmit" v-if='id==""'>提交审核</view>
      <view class="sendForm" @click="getsubmit1" v-if='id!=""'>修改信息</view>
    </view>


    <!-- <view style="height:100rpx;"></view> -->
  </view>
</template>

<script>
  // pages/opinion/opinion.js
  var http = require("../../utils/http.js");
  var soket = require("../../utils/soket.js");
  const app = getApp();
  import {
    pathToBase64,
    base64ToPath
  } from '../../components/image-tools/index.js'
  export default {
    data() {
      return {
        pics: [],
        //图片
        items: [{
          name: '紧急联系',
          value: '紧急联系',
          checked: 'true'
        }, {
          name: '一般',
          value: '一般'
        }],
        array: ['渠道1', '渠道2'],
        tel: '',
        address: '',
        shop: '',
        user: '',
        tips4: "",
        channel: '',
        id: '',

      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.getlocation()
      if('id' in options){
        console.log(1231)
        this.setData({
          id: options.id,
        });
      }
      this.getclueChannel()
      if (this.id != '') {
        this.getmostdetail()
      }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      app.globalData.banned();
      this.setData({
        user: uni.getStorageSync('user'),
        tips4: uni.getStorageSync('tips4')
      });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
      console.log('页面消失了');
    },

    methods: {
      getlocation() {
        uni.getLocation({
          type: 'wgs84',
          // #ifdef APP-PLUS
          geocode: true,
          // #endif
          success: function(res) {
            console.log(res)
            console.log('当前位置的经度：' + res.longitude);
            console.log('当前位置的纬度：' + res.latitude);
            // {
            //   "type": "WGS84",
            //   "altitude": 0,
            //   "latitude": 34.756715,
            //   "longitude": 113.770471,
            //   "speed": 0,
            //   "accuracy": 25,
            //   "address": {
            //     "country": "中国",
            //     "province": "河南省",
            //     "city": "郑州市",
            //     "district": "管城回族区",
            //     "street": "榆林北路",
            //     "streetNum": "67号",
            //     "poiName": "升龙广场",
            //     "cityCode": "0371"
            //   },
            //   "errMsg": "getLocation:ok"
            // }
      
            // #ifdef APP-PLUS
            console.log(res.address.province)
            console.log(res.address.city)
            console.log(res.address.district)
            uni.setStorageSync("province", res.address.province);
            uni.setStorageSync("city", res.address.city);
            uni.setStorageSync("district", res.address.district);
            // #endif
          },
          fail(err) {
            console.log('四百', err)
          }
        });
      },
           
      getmostdetail() {
        const that = this;
        let url = 'api/users/lookup';
        let data = {
          id: that.id
        };
        http.postReq(url, data, function(res) {
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
      //根据id获取提交页的详情
      getclueChannel() {
        const that = this;
        let url = 'api/team/clueChannel4';
        let data = {};
        http.postReq(url, data, function(res) {
          console.log('Channel', res)
          if (res.code == 200) {
            that.channel = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
            })
          }
        });
      },


      bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
          index: e.detail.value
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
      getsubmit1() {
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
      // 提交售货机
      getsubmit() {
        //  api/users/submitClue
        const that = this;
        let url = 'api/users/submitClue';
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        let date = {
          openid: uni.getStorageSync('openid'),
          phone: that.tel,
          image: that.pics,
          address: that.address,
          brand: that.shop,
          avatar: that.user.avatar,
          nick: that.user.username,
          large_type: 4,
          province: uni.getStorageSync('province'),
          city: uni.getStorageSync('city'),
          area: uni.getStorageSync('district')
        };

        if (date.openid == '') {
          uni.showModal({
            title: '警告',
            content: '请您登陆后在进行提交',
            showCancel: false,
            confirmText: '确定',
            success: function(res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              uni.switchTab({
                url: '/pages/my/my'
              });
            }
          });
          return;
        } else if (!myreg.test(that.tel)) {
          uni.showToast({
            title: '号码不符合规范',
            icon: 'none',
            duration: 2000
          });
          return;
        } //console.log('接口数据',date)


        http.postReq(url, date, function(res) {
          soket.send("4");

          if (res.code == 200) {
            uni.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 2000
            });
            that.setData({
              tel: '',
              pics: [],
              address: '',
              shop: ''
            });
            setTimeout(function() {
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
      previewImg: function(e) {
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
      chooseImg: function(e) {
        var that = this,
          pics = this.pics;
        console.log(pics);
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
                    pics.push(http.rootDocment + res.data);
                    that.setData({
                      pics: pics
                    });
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
      // 删除图片
      deleteImg: function(e) {
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
      previewImg1: function(e) {
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
    position: absolute;
    z-index: -1;
    height: 2600rpx;
  }

  .clueBox {
    width: 690rpx;
    border-radius: 10px;
    padding: 80rpx 40rpx 20rpx 40rpx;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    background: #FFF;
  }

  .clueBox input {
    background: #90fffb;
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
    margin-top: 40rpx;
    width: 750rpx;
    height: 108rpx;
    opacity: 1;
    background: #00dfd7;
    color: #fff;
    line-height: 108rpx;
    text-align: center;
    position: relative;
    left: 0;
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


  /* 最后结束的表 */
  .missonbg {
    box-sizing: border-box;
    background: #fff;
    width: 690rpx;
    height: 280rpx;
    border-radius: 20rpx;
    padding: 20rpx 20rpx;
    box-shadow: 0rpx 0rpx 12rpx 4rpx rgba(0, 0, 0, 0.08);
    /*    position: absolute;
    z-index: 1; */
  }

  .mBgTop {
    /*   display: flex;
    justify-content: space-between;
    align-items: center; */
    color: #333333;
    font-size: 36rpx;
    font-family: PingFang SC, PingFang SC-Regular;
  }

  .TopMoney {
    font-size: 32rpx;
    color: #ff0000;
  }

  .mBgmiddele {
    display: flex;
    margin: 40rpx 0 20rpx;
  }

  .mbgmbox {
    background: #e0fffe;
    border-radius: 10rpx;
    color: #666666;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    padding: 8rpx 20rpx;
    margin-right: 20rpx;
  }

  .mbgmbox:nth-child(1),
  .mbgmbox:nth-child(4) {
    background: #e0fffe;
  }

  .mbgmbox:nth-child(2),
  .mbgmbox:nth-child(5) {
    background: #e0ffeb;
  }

  .mbgmbox:nth-child(3),
  .mbgmbox:nth-child(6) {
    background: #fffae0;
  }

  .mBgbottom {
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    line-height: 48rpx;
  }

  .btnpos {
    position: absolute;
    right: 0;
    bottom: 20rpx;
    width: 168rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    opacity: 1;
    background: #d7fffe;
    border-radius: 30rpx 0rpx 0rpx 30rpx;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #00dfd7;
  }

  .bottomposimg:nth-child(1) {
    left: 0;
  }

  .bottomposimg:nth-child(2) {
    left: 20rpx;
  }

  .bottomposimg:nth-child(3) {
    left: 40rpx;
  }

  .bottomposimg:nth-child(4) {
    left: 60rpx;
  }

  .bottomposimg:nth-child(5) {
    left: 80rpx;
  }

  /* part */
  .partbox {
    color: #333333;
    box-sizing: border-box;
    width: 690rpx;
    /* height: 378rpx; */
    opacity: 1;
    background: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 12rpx 4rpx rgba(0, 0, 0, 0.08);
    padding: 40rpx;
  }

  .part {
    display: flex;
  }

  .partL {
    width: 40rpx;
    height: 40rpx;
    vertical-align: middle;
    margin-right: 20rpx;
  }

  .partR {
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #333;
  }

  .partR .subtitile {
    color: #999999;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    margin-bottom: 20rpx;
  }

  .issimg {
    width: 34px;
    height: 34px;
    opacity: 1;
    border-radius: 50%;
    margin-right: 20rpx;
  }

  .sendForm {
    margin-top: 40rpx;
    width: 750rpx;
    height: 108rpx;
    opacity: 1;
    background: #00dfd7;
    color: #fff;
    line-height: 108rpx;
    text-align: center;
    position: relative;
    left: 0;
  }
</style>
