<template>
  <view>
    <view class="back">
      <image style="width: 750rpx;height: 276rpx;" src="/static/bg1.png" mode="scaleToFill" ></image>
      <image style="width: 750rpx;height: calc(100% - 276rpx);" src="/static/allbg.png" mode="scaleToFill"
       ></image>
    </view>

    <view style="position: absolute;z-index: 1;top: 210rpx;width: 750rpx;overflow: hidden;">
      <view style="width: 690rpx;left: 30rpx;position: relative;">
        <view class="missonbg">
          <view class="mBgTop">
            <text>{{channel.name}}</text>
            <view class="TopMoney" v-if="channel.count_money!=0">{{channel.count_money}}元/<text style="font-size: 26rpx">条</text></view>
          </view>
          <view class="mBgmiddele">
            <view class="mbgmbox" v-for="(n,i) in channel.branch" :key='i'>
              {{n}}
            </view>
          </view>
          <view class="mBgbottom" style="position: relative;" v-if="channel.clueCount!=0">
            <image :src="item" mode="scaleToFill" class="bottomposimg"
              style="width: 40rpx;height: 40rpx;position: absolute;border-radius: 50%;"
              v-for="item in channel.clueAvatar" :key='item'></image>
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
                <view>{{channel.work}}</view>
              </view>
            </view>
            <view class="part">
              <image class="partL" src="/static/zisetting.png" mode="scaleToFill"></image>
              <view class="partR">
                <view class="subtitile">设备要求</view>
                <view>{{channel.prepare}}</view>
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
            <view class="explainimgbox">
              <image class="explainimg" :src="item" mode="scaleToFill" v-for="(item,index) in imgList" :key="index" @tap="previewImg1"></image>
            </view>
             
            <text style="display: inline-block;" selectable="true">{{channel.explain}}</text>
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
            
              <image class="issimg" :src="channel.avatar" mode="scaleToFill"></image>
              <view>{{channel.username}}</view>
            </view>
          </view>
        </view>
        <!-- 任务提交 -->
        <view style="width: 690rpx;">
          <view
            style="margin: 40rpx 0 20rpx;  color: #333333;font-size: 32rpx;font-family: PingFang SC, PingFang SC-Regular;">
            大家都看
          </view>
          <!-- 任务 -->
          <view class="subboxs" style="padding: 0;">
            <view class="missonbg1" v-for="(item,index) in watch" :key='index'>
              <view class="mBgTop1">
                <text>{{item.name}}</text>
                <view class="TopMoney">{{item.count_money}}元/<text style="font-size: 26rpx">条</text></view>
              </view>
              <view class="mBgmiddele1">
                <view class="mbgmbox1" v-for="(n,i) in item.branch" :key='i'>
                  {{n}}
                </view>
              </view>
              <view class="mBgbottom1">
                <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
                    height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
                <text>{{item.username}}·发布者</text>
              </view>
              <view class="btnpos1" @click="getTeamdetaill(item.id)">前往完成</view>
            </view>
          </view>
        </view>


      </view>
      <!-- <view class="sendForm">提交审核</view> -->
    </view>
    <view class="sendForm" style="position: fixed;bottom:0;left:0;z-index: 999;" @click="gettask()">领取任务</view>
    <view style="height:100rpx;"></view>
  </view>
</template>

<script>
  var http = require("../../utils/http.js");
  var soket = require("../../utils/soket.js");
  var webSocketUrl = 'wss://51.zhongyigames.com:4567';

  export default {
    data() {
      return {
        id: "",
        channel: "",
        watch: "",
        imgList:[],
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log(options, 'options');
      this.id = options.id
      this.gettaskDetails()
      this.getWatch()
    },
    methods: {
      getTeamdetaill(id) {
        uni.redirectTo({
          url: '/pages/teambox/Teamdetail?id=' + id
        });
      },
      //根据id获取任务详情
      gettaskDetails() {
        const that = this;
        var url = 'api/team/taskDetails';
        let data = {
          id: this.id
        }
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            console.log(res)
            res.data.branch = res.data.branch.split(',')
            var avatar=res.data.avatar.charAt(0)
            console.log('21',avatar)
            if(avatar!='h'){
              res.data.avatar=http.rootDocment+res.data.avatar.substr(1)
            }
            
            if(res.data.image!=''){
              that.imgList = res.data.image.split(',');
            }
            that.channel = res.data
            console.log(that.imgList)
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            }); 
          }
        });
      },
      //接去对应的任务，并跳转到去完成页面
      gettask(){
          const that = this;
          var url = 'api/team/receiveTask';
          let data = {
            id: this.id,
            openid:uni.getStorageSync('openid')
          }
          http.postReq(url, data, function(res) {
            console.log('321', res)
            if (res.code == 200) {
             //跳转到我的任务列表页面
             uni.showToast({
               title: res.msg,
               icon: 'none',
               duration: 2000
             });
             setTimeout(function() {
               uni.navigateTo({
                 url: '/pages/my/missionlist'
               })
             }, 2000);
             
            } else {
              uni.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000
              });
            }
          });
      },
      //获取大家都看任务
      getWatch() {
        const that = this;
        var url = 'api/team/everyoneIsWatching';
        let data = {
          openid: uni.getStorageSync('openid')
        }
        http.postReq(url, data, function(res) {
          console.log('Watch', res)
          if (res.code == 200) {
            res.data.forEach(el => {
              el.branch = el.branch.split(',')
            })
            that.watch = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
			
			// 预览图片
			previewImg1: function(e) {
			  //获取当前图片的下标
			  var index = e.currentTarget.dataset.index; //所有图片
			
			  var pics = this.imgList;
			  uni.previewImage({
			    //当前显示图片
			    current: pics[index],
			    //所有图片
			    urls: pics
			  });
			}
    },

  };
</script>
<style>
  .explainimgbox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .explainimg{
    width: 180rpx;
    height: 180rpx;
    margin-bottom: 20rpx;
  }
  .back {
    position: absolute;
    z-index: -1;
    height: 2600rpx;
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

  .subboxs {
    box-sizing: border-box;
    width: 690rpx;
    background: #fff;
    padding: 0 20rpx 20rpx;
    border-radius: 0 0 30rpx 30rpx;
  }

  .subbox {
    display: flex;
    align-items: center;
    padding-top: 20rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    color: #333;
  }

  .missonbg1 {
    box-sizing: border-box;
    background: url(../../static/missonbg.png) no-repeat;
    width: 690rpx;
    height: 280rpx;
    background-size: contain;
    padding: 40rpx 20rpx 0;
    position: relative;
    box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.10);
    margin-bottom: 20rpx;
    border-radius: 0 0 30rpx 30rpx;
  }

  .mBgTop1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Regular;
  }

  .TopMoney1 {
    color: #ff0000;
  }

  .mBgmiddele1 {
    display: flex;
    margin: 20rpx 0 40rpx;
  }

  .mbgmbox1 {
    background: #e0fffe;
    border-radius: 10rpx;
    color: #666666;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    padding: 8rpx 20rpx;
    margin-right: 20rpx;
  }

  .mBgbottom1 {
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    line-height: 48rpx;
  }

  .btnpos1 {
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


  .sendForm {
    margin-top: 40rpx;
    width: 750rpx;
    height: 108rpx;
    opacity: 1;
    background: #00dfd7;
    color: #fff;
    line-height: 108rpx;
    text-align: center;
  }
</style>
