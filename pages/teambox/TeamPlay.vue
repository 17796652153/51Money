<template>
  <view style="margin-bottom: 100rpx;">
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
      <view class="page-section page-section-spacing swiper noticeBox2" style="width:690rpx;margin-top: 40rpx;">
        <view class="noticeBox2View">
          <image src="/static/shield.png"></image>
        </view>
        <view class="noticeBox2bottom" style="color: #41B6FB;">
          <swiper autoplay="false" interval="2000" duration="500" circular="true" vertical="true"
            style="height:68rpx;line-height:68rpx">
            <block v-for="(item, index) in background1" :key="index">
              <swiper-item>
                <view class="swiper-item ">公司任务丨长期有效</view>
              </swiper-item>
            </block>
          </swiper>
        </view>
      </view>
    </view>
    <view class="checkM" style="position: relative;top: -40rpx;left:30rpx">
      <view class="checkbox">
        <view style="margin: 30rpx 0 20rpx;">65%</view>
        <view>完成率</view>
      </view>
      <view class="checkbox">
        <view style="margin: 30rpx 0 20rpx;">150</view>
        <view>需完成(条)</view>
      </view>
      <view class="checkbox">
        <view style="margin: 30rpx 0 20rpx;">200</view>
        <view>待完成(条)</view>
      </view>
      <view class="checkbox">
        <view style="margin: 30rpx 0 20rpx;">50</view>
        <view>已完成(条)</view>
      </view>
    </view>

    <view class="missonbgbox" style="position: relative;margin-left:30rpx">
      <view class="subtitle">
        团队目标
      </view>
      <view class="subboxs">
        <view class="subbox">
          <text style="margin-right: 60rpx;">日满足合格任务150条</text>
          <view style="margin-right: 60rpx;">奖励金额<text style="margin-left: 15rpx;color: #FF0000;">188元</text></view>
          <icon type="success" color="#00dfd7"></icon>
          <!-- <icon type="circle" ></icon> -->
        </view>
        <view class="subbox">
          <text style="margin-right: 60rpx;">周满足合格任务150条</text>
          <view style="margin-right: 60rpx;">奖励金额<text style="margin-left: 15rpx;color: #FF0000;">188元</text></view>
          <!-- <icon type="success" color="#00dfd7"></icon> -->
          <icon type="circle"></icon>
        </view>
        <view class="subbox">
          <text style="margin-right: 60rpx;">年满足合格任务150条</text>
          <view style="margin-right: 60rpx;">奖励金额<text style="margin-left: 15rpx;color: #FF0000;">188元</text></view>
          <!-- <icon type="success" color="#00dfd7"></icon> -->
          <icon type="circle"></icon>
        </view>
      </view>

      <!-- er1 -->
      <view class="subtitle" style="margin-top: 40rpx;">
        团队目标
      </view>
      <view class="subboxs" style="padding: 0;">
        <view class="missonbg" v-for="n in 3">
          <view class="mBgTop">
            <text>直购系统任务</text>
            <view class="TopMoney">26元/<text style="font-size: 26rpx">条</text></view>
          </view>
          <view class="mBgmiddele">
            <view class="mbgmbox">
              最新发布
            </view>
            <view class="mbgmbox">
              公司
            </view>
            <view class="mbgmbox">
              售货机
            </view>
          </view>
          <view class="mBgbottom">
            <image src="/static/imgavatr.png" mode="scaleToFill" style="width: 48rpx;
                height: 48rpx;vertical-align: top;margin-right: 10rpx;"></image>
            <text>张三·发布者</text>
          </view>
          <view class="btnpos" @click="getdetail(1)">前往完成</view>
        </view>
      </view>

      <!-- 排行榜 -->
      <view class="rankinglist" style="margin-top: 40rpx;">
        <view style="display: flex;">
          <view class="subtitle1" style="border-top-left-radius:30rpx" @click="rankindex=0"
            :class="[rankindex==0?'subtitleclolor':'']">
            奖励排行榜
          </view>
          <view class="subtitle1" style="border-top-right-radius:30rpx;" @click="rankindex=1"
            :class="[rankindex==1?'subtitleclolor':'']">
            完成率排行榜
          </view>
        </view>
        <view style="display: flex;">
          <view class="subtitle22" @click="changecheckMindex(index)" v-for="(item,index) in checkMt" :key='index'
            :class="checkMindex==index?'subtitletrue':''">
            {{item}}
            <view class="navBtm" v-show="checkMindex==index"></view>
          </view>
        </view>

        <view class="subboxs">
          <view class="subbox" v-for="(n,index) in 5" :key="index" style="justify-content: space-between;">
            <view class="rankleft">
              <image class="rankcrown" src="/static/crown1.png" mode="aspectFit" v-if="index==0"></image>
              <image class="rankcrown" src="/static/crown2.png" mode="aspectFit" v-if="index==1"></image>
              <image class="rankcrown" src="/static/crown3.png" mode="aspectFit" v-if="index==2"></image>
              <view class="rankcrown" v-if="index>2">{{index+1}}</view>
              <image style="width: 52rpx;height: 52rpx;margin:0  20rpx;" src="/static/avater.png" mode="aspectFit">
              </image>
              <text>打工人1号</text>
            </view>
            <view v-if="rankindex==0">奖金<text style="margin-left: 15rpx;color: #FF0000;">188元</text></view>
            <view v-if="rankindex==1">完成率<text style="margin-left: 15rpx;color: #FF0000;">88%</text></view>
          </view>
          <view style="text-align: center;color: #999;">查看更多排名</view>
        </view>

      </view>
    </view>
    <view class="fixedrelease">
      <view class="mb20">
        <image src="/static/image/changeteam.png" mode="aspectFit" style="width: 100rpx;
         height: 100rpx;vertical-align: top;" @click="getnavto(0)"></image>
      </view>
      <view class="mb20">
        <image src="/static/image/jointeam.png" mode="aspectFit" style="width: 100rpx;
      height: 100rpx;vertical-align: top;" @click="getnavto(1)"></image>
      </view>
      <view>
        <image src="/static/image/creatrelease.png" mode="aspectFit" style="width: 100rpx;
        height: 100rpx;vertical-align: top;" @click="getnavto(3)"></image>
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
        rankindex: 0, //排行榜
        checkMindex: 0,
        background: [],
        background1: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500,
        openid: '',
        checkMt: ['周榜', '月榜', '年榜'],
        listbox: ['/pages/statistical/statistical', '/pages/statistical/statistical', '/pages/teambox/newteam',
          '/pages/teambox/release'
        ],
        clue: "",
        stick: "",
        writing: "",
        selling: ""
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(e) {
      uni.setStorageSync('upper_openid', '');
      var upper_openid = e.upper_openid;
      console.log(upper_openid);

      if (upper_openid != '' && upper_openid != undefined) {
        uni.setStorageSync('upper_openid', upper_openid);
      }

      this.gettipsReward();
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    methods: {
      changecheckMindex(e) {
        console.log(e)
        this.checkMindex = e
      },
      getnewteam() {
        uni.navigateTo({
          url: './newteam'
        })
      },
      //扫描二维码
      scanQr() {

      },
      //获取公告
      gettipsReward() {
        const that = this;
        var url = 'api/users/tipsReward';
        http.postReq(url, '', function(res) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].id == 93) {
              //线索
              that.setData({
                clue: res.data[i].value
              });
            } else if (res.data[i].id == 97) {
              //问答提交
              that.setData({
                stick: res.data[i].value
              });
            } else if (res.data[i].id == 102) {
              //文章
              that.setData({
                writing: res.data[i].value
              });
            } else if (res.data[i].id == 106) {
              //售货机
              that.setData({
                selling: res.data[i].value
              });
            }
          }

          console.log(that
            .clue); // {image:'/image/index2.png',name:'数据统计',path:'/pages/statistical/statistical',money:'-1'},

          that.setData({

          });
        });
      },

      gethide() {
        const that = this;
        var url = 'api/users/hide';
        http.postReq(url, '', function(res) {
          console.log(res);

          if (res == 0) {} else {
            that.setData({

            });
            that.gettipsReward();
          } // if (res.code == 200) {
          //   console.log(res)
          // }

        });
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

      getmoneyshow() {
        const that = this;
        var url = 'api/users/describe';
        http.postReq(url, '', function(res) {
          if (res.code == 200) {
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].id == 107) {
                //线索
                uni.setStorageSync('tips1', res.data[i].value);
              } else if (res.data[i].id == 108) {
                //问答提交
                uni.setStorageSync('tips2', res.data[i].value);
              } else if (res.data[i].id == 109) {
                //文章
                uni.setStorageSync('tips3', res.data[i].value);
              } else if (res.data[i].id == 110) {
                //售货机
                uni.setStorageSync('tips4', res.data[i].value);
              }
            }
          }
        });
      },

      getnavto(e) {
        let that = this;
        console.log("data-index值：", e);
        console.log("data-index值：", that.listbox[e]);
        let list = that.listbox[e];
        console.log(list);
        if (e == 0) {
          uni.showModal({
            content: '是否要切换团队',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定');
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
        } else {
          uni.navigateTo({
            url: list
          });
        }
      },


      getdetail(id) {
        uni.navigateTo({
          url: '/pages/teambox/Teamdetail?id=' + id
        });
      },

      // 获取个人数据
      getuserdetail() {
        var that = this;
        var url = 'api/users/userData?openid=' + uni.getStorageSync('openid');
        var data = {
          openid: that.openid
        };
        http.getReq(url, function(res) {
          console.log(res.data);

          if (res.code == 200) {
            // that.setData({
            //   user: res.data,
            //   alipay_name:res.data.alipay_name,
            //   alipay_number:res.data.alipay_number,
            //   wechat_number:res.data.wechat_number,
            // })
            console.log('gerern', res.data);

            if (res.data.phone == null || res.data.phone == "") {
              uni.redirectTo({
                url: '/pages/bindingPhone/bindingPhone?upper_openid=' + res.data.upper_openid
              });
            }
          }
        });
      }

    }
  };
</script>
<style lang="scss">
  page {
    background-color: #f4f6ed;
  }

  .fixedrelease {
    position: fixed;
    right: 30rpx;
    bottom: 80px;

    .mb20 {
      margin-bottom: 20rpx;
    }
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
    width: 690rpx;
    height: 148rpx;
    opacity: 1;
    background: #f1fffe;
    padding: 0 30rpx;
    border-radius: 30rpx;
    display: flex;
    justify-content: space-between;
  }

  .checkbox {
    width: 25%;
    text-align: center;
  }

  .subtitle22 {
    box-sizing: border-box;
    width: 230rpx;
    height: 68rpx;
    padding-top: 15rpx;
    text-align: center;
    color: #999;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
  }

  .subtitletrue {
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #333;
    background: #f1fffe;
  }

  .navBtm {
    width: 20rpx;
    height: 8rpx;
    opacity: 1;
    background: #00dfd7;
    border-radius: 4rpx;
    margin: 0 auto;
  }

  /* 杂乱盒子 */
  .content {
    margin: 0 30rpx;
    position: relative;
    top: -60rpx;
  }

  .topbg {
    width: 750rpx;
    height: 288rpx;
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
  .rankinglist {
    width: 690rpx;
    background-color: #fff;
    border-radius: 30rpx;
  }

  .subtitle {
    width: 690rpx;
    height: 92rpx;
    opacity: 1;
    background: #d4fffd;
    border-radius: 30rpx 30rpx 0 0;
    color: #00dfd7;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    text-align: center;
    line-height: 92rpx;
  }

  .subtitle1 {
    width: 345rpx;
    height: 92rpx;
    opacity: 1;
    background: #fafafa;
    color: #999999;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    text-align: center;
    line-height: 92rpx;

  }

  .subtitleclolor {
    background: #d4fffd;
    color: #00dfd7;
  }

  .subboxs {
    box-sizing: border-box;
    width: 690rpx;
    background: #fff;
    padding: 0 20rpx 20rpx;
    border-radius: 0 0 30rpx 30rpx;
  }

  .subbox1 {
    display: flex;
    align-items: center;
    padding-top: 20rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    color: #333;
  }

  .missonbg {
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


  /* 排名 */
  .rankleft {
    display: flex;
    align-items: center;
  }

  .rankcrown {
    width: 40rpx;
    height: 40rpx;
    text-align: center;
  }
</style>
