<template>
  <view>
    <view class="topbg">
      <view class="page-section page-section-spacing swiper noticeBox2" style="width:690rpx">
        <view class="noticeBox2View">
          <image src="/static/image/laba.png"></image>
        </view>
        <view class="noticeBox2bottom">
          <swiper autoplay="true" interval="2000" duration="500" circular="true" vertical="true"
            style="height:68rpx;line-height:68rpx">
            <block v-for="(item, index) in background1" :key="index">
              <swiper-item>
                <view class="swiper-item ">最新动态：{{item.username}} {{item.carry_add_time}} 提现{{item.carry_money}}元
                </view>
              </swiper-item>
            </block>
          </swiper>
        </view>
      </view>

      <view class="page-section page-section-spacing swiper noticeBox">
        <swiper indicator-dots="true" interval="5000" autoplay="true" duration="500" style="height: 256rpx;">
          <swiper-item v-for="(item, index) in background" :key="index" :data-index="item" @tap="getdetail">
            <image :src="item.image" mode="scaleToFill" style="width:100%;height:256rpx;border-radius: 20rpx;"></image>
          </swiper-item>
        </swiper>
      </view>

      <view class="page-section page-section-spacing swiper noticeBox2" style="width:690rpx">
        <view class="noticeBox2View">
          <image src="/static/shield.png"></image>
        </view>
        <view class="noticeBox2bottom" style="color: #41B6FB;">
          <swiper style="height:68rpx;line-height:68rpx">
            <block v-for="(item, index) in background1" :key="index">
              <swiper-item>
                <view class="swiper-item ">公司任务丨安全可靠丨长期有效</view>
              </swiper-item>
            </block>
          </swiper>
        </view>
      </view>
    </view>

    <view class="missonbgbox">
      <view class="missonbg" v-for="(item,index) in checkMt" :key='index'>
        <view class="mBgTop">
          <text v-if="navid==0||navid==2">{{item.title}}</text>
          <text v-if="navid==1">{{item.name}}</text>
          <view class="TopMoney">{{item.money}}元/<text style="font-size: 26rpx">条</text></view>
        </view>
        <view class="mBgmiddele">
          <view class="mbgmbox">
            平台认证
          </view>
          <view class="mbgmbox" style="background: #e0ffeb" v-if="navid==0">
            线索提交
          </view>
          <view class="mbgmbox" style="background: #e0ffeb" v-else-if="navid==1">
            发帖
          </view>
          <view class="mbgmbox" style="background: #e0ffeb" v-else>
            有奖征文
          </view>
        </view>
        <view class="mBgbottom">
          <image src="/static/misson.png" mode="scaleToFill" style="width: 48rpx;
              height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
          <text>平台·发布者</text>
        </view>
        <view class="btnpos" @click="getnavto(item.id)">前往完成</view>
      </view>
    </view>
  </view>
</template>

<script>
  const http = require("../../utils/http.js");
  const app = getApp();
  const time = require("../../utils/time.js");
  var soket = require("../../utils/soket.js");

  export default {
    data() {
      return {
        subboxindex: 0,
        checkMindex: 0,
        background: [],
        background1: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500,
        openid: '',
        checkMt: [],
        listbox: ['/pages/clueSubmit/clueSubmit', '/pages/stickSubmit/stickSubmit', '/pages/signSubmit/signSubmit', ],
        navid: 0
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(e) {
      console.log(e)
      this.navid = e.id
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
        openid: uni.getStorageSync('openid')
      });
      this.getbannr();
      this.getbannr1();
      this.getchannel()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    methods: {
      //获取渠道 根据不同的navid请求不同的接口
      getchannel(){
        var that=this
        var url = '';
        var data = {
        }
        if(this.navid==0){
          url='api/users/channel'
        }else if(this.navid==1){
          url='api/users/channelBank'
        }else{
          url='api/users/writingList'
        }

        http.postReq(url,data,function(res){
        	console.log('渠道信息',res);
        	if(res.code == 200){
            that.checkMt=res.data
        	}else{
        		uni.showToast({
        			title:res.msg,
        			icon:'none',
        		})
        	}
        })
      },
      // 任务跳转
      getnavto(i) {
        console.log(this.listbox)
        let url = `${this.listbox[this.navid]}?id=${i}`
        console.log(url)
        uni.navigateTo({
          url
        })
      },
      getbannr() {
        const that = this;
        var url = 'api/users/noticeList';
        http.postReq(url, '', function(res) {
          if (res.code == 200) {
            console.log('轮播', res.data);

            for (var i = 0; i < res.data.length; i++) {
              res.data[i].image = http.rootDocment + res.data[i].image;
            }

            that.setData({
              background: res.data
            });
          }
        });
      },

      getbannr1() {
        const that = this;
        var url = 'api/users/presentNotice';
        http.postReq(url, '', function(res) {
          if (res.code == 200) {
            console.log('1', res.data);

            for (var i = 0; i < res.data.length; i++) {
              res.data[i].carry_add_time = time.formatTimeTwo(res.data[i].carry_add_time, 'M-D');
            }

            that.setData({
              background1: res.data
            });
          }
        });
      },


    }
  };
</script>
<style>
  page {
    background-color: #f4f6ed;
  }

  /* 精选任务 */
  .mission .title {
    font-size: 36rpx;
    color: #333;
    display: flex;
    align-items: center;
  }

  .checkM {
    box-sizing: border-box;
    margin: 20rpx 0;
    width: 750rpx;
    height: 148rpx;
    opacity: 1;
    background: #ffffff;
    padding: 0 30rpx;
  }

  .subtitle {
    color: #999;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    margin-right: 40rpx;
    margin-top: 28rpx;
  }

  .subtitletrue {
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #333;
    margin-top: 20rpx;
  }

  .navBtm {
    width: 20rpx;
    height: 8rpx;
    opacity: 1;
    background: #00dfd7;
    border-radius: 4rpx;
    margin: 0 auto;
  }

  .subbox {
    width: 88rpx;
    height: 40rpx;
    opacity: 1;
    background: #f0f0f0;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #999;
    line-height: 40rpx;
    text-align: center;
    margin-right: 20rpx;
  }

  .subboxtrue {
    background: #bffffd;
    color: #333
  }

  /* 杂乱盒子 */
  .content {
    margin: 0 30rpx;
    position: relative;
    top: -60rpx;
  }

  .rumbleBox {
    width: 690rpx;
    height: 364rpx;
    opacity: 1;
    background: #ffffff;
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .rumble {
    width: 25%;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #333;
    text-align: center;
  }

  .rumble image {
    width: 72rpx;
    height: 72rpx;
    margin-bottom: 12rpx;
    vertical-align: middle;
  }

  .scan {
    width: 60rpx;
    height: 60rpx;
    margin-right: 30rpx;
  }

  .topbg {
    width: 750rpx;
    height: 484rpx;
    opacity: 1;
    background: #00dfd7;
    border-radius: 0rpx 0rpx 40rpx 40rpx;
  }

  .noticeBox {
    width: 690rpx;
    margin: 20rpx auto;
    border-radius: 20rpx;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.15);
    font-size: 28rpx;
    color: #333;
    box-sizing: border-box;
  }

  .noticeBox2 {
    height: 68rpx;
    background: #fff;
    border-radius: 34rpx;
    font-size: 24rpx;
    color: #00dfd7;
    display: flex;
    width: 610rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    align-items: center;
    margin-left: 30rpx;
  }

  .noticeBox2bottom {
    width: 90%;
    overflow: hidden;
    padding-left: 20rpx;
  }

  .noticeBox2View {
    display: flex;
    align-items: center;
  }

  .noticeBox2View image {
    width: 48rpx;
    height: 48rpx;
  }

  .indexViewBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 92%;
    margin: 30rpx auto 0rpx;
    border-radius: 20px;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.08);
    padding: 42rpx 40rpx;
    box-sizing: border-box;
  }

  .indexViewBox:last-child {
    margin: 30rpx auto 20rpx;
  }

  .indexViewBoxView1 {
    display: flex;
    align-items: center;
  }

  .indexViewBoxImage1 {
    width: 76rpx;
    height: 76rpx;
  }

  .indexViewBoxImage2 {
    width: 40rpx;
    height: 40rpx;
  }

  .indexViewBoxView1 text {
    margin-left: 20rpx;
  }

  .buttonmoney {
    background: linear-gradient(291deg, #ff3e32 0%, #fb822a);
    border: 4rpx solid linear-gradient(291deg, #ff3e32 0%, #fb822a);
    height: 56rpx;
    border-radius: 50rpx;
    color: #FFF;
    padding: 0 10rpx;
    text-align: center;
    line-height: 56rpx;
    margin-right: 20rpx;
  }

  /* 最后结束的表 */
  .missonbg {
    box-sizing: border-box;
    background: url(../../static/missonbg.png) no-repeat;
    width: 690rpx;
    height: 280rpx;
    background-size: contain;
    padding: 40rpx 20rpx 0;
    position: relative;
    margin-left: 30rpx;
    margin-top: 20rpx;
  }

  .mBgTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Regular;
  }

  .TopMoney {
    color: #ff0000;
  }

  .mBgmiddele {
      display: flex;
      margin: 20rpx 0 40rpx;
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
</style>
