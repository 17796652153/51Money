<template>
  <view>
    <view class="topbg">
     <view style="display: flex;justify-content: space-between;align-items: center;">
<!--        <view class="page-section page-section-spacing swiper noticeBox2">
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
        <image src="/static/scan.png" class="scan" mode="scaleToFill" @click="scanQr"></image> -->
      </view>

      <view class="page-section page-section-spacing swiper noticeBox">
        <image :src="background2.image" mode="scaleToFill" style="width:100%;height:256rpx;border-radius: 20rpx;"
          :data-index="background2" @tap="getdetail"></image>
      </view>

      <view class="page-section page-section-spacing swiper noticeBox2" style="width:690rpx">
        <view class="noticeBox2View">
          <image src="/static/shield.png"></image>
        </view>
        <view class="noticeBox2bottom" style="color: #41B6FB;">
          <swiper style="height:68rpx;line-height:68rpx">
            <block v-for="(item, index) in background1" :key="index">
              <swiper-item>
                <view class="swiper-item ">公司任务丨长期有效</view>
              </swiper-item>
            </block>
          </swiper>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="rumbleBox">
        <view class="rumble" v-for="(item,index) in listbox" :key='index' @click="getnavto(index)">
          <image :src="item.image" mode="scaleToFill"></image>
          <view>
            {{item.name}}
          </view>
        </view>
      </view>

      <view class="page-section page-section-spacing swiper noticeBox">
        <swiper indicator-dots="true" interval="5000" autoplay="true" duration="500" style="height:140rpx;">
          <swiper-item v-for="(item, index) in background" :key="index" :data-index="item" @tap="getdetail">
            <image :src="item.image" mode="scaleToFill" style="width:100%;height:140rpx;border-radius: 20rpx;"></image>
          </swiper-item>
        </swiper>
      </view>
      <!-- 精选任务 -->
<!--      <view class="mission">
        <view class="title">
          <image src="/static/misson.png" mode="scaleToFill" style="width: 80rpx;
      height: 80rpx;vertical-align: middle;margin-right: 20rpx;"></image>
          <view>平台协同任务</view>
        </view>
      </view> -->
    </view>
    <view class="checkM" style="position: relative;top: -30px;">
      <view style="display: flex;">
        <view class="subtitle" @click="changecheckMindex(index)" v-for="(item,index) in checkMt" :key='index'
          :class="checkMindex==index?'subtitletrue':''">
          {{item.name}}
          <view class="navBtm" v-show="checkMindex==index"></view>
        </view>
      </view>
      <view style="display: flex;margin-top: 25rpx;">
        <view class="subbox" :class="subboxindex==0?'subboxtrue':''" @click="changesubbox(0)">
          默认
        </view>
        <view class="subbox" :class="subboxindex==1?'subboxtrue':''" @click="changesubbox(1)">
          最新
        </view>
      </view>
    </view>

    <view class="missonbgbox" style="position: relative;top: -30px;margin-left:30rpx">
      <view class="missonbg" v-for="(item,index) in misson" :key='index'>
        <view class="mBgTop">
          <text>{{item.name}}</text>
          <view class="TopMoney">{{item.count_money}}元/<text style="font-size: 26rpx">条</text></view>
        </view>
        <view class="mBgmiddele">
          <view class="mbgmbox" v-for="(n,i) in item.branch" :key='i'>
            {{n}}
          </view>
        </view>
        <view class="mBgbottom">
          <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
              height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
          <text>{{item.username}}·发布者</text>
        </view>
        <view class="btnpos" @click="getTeamdetaill(item.id)">前往完成</view>
      </view>
    </view>
    <view class="fixedrelease">
      <view>
        <image src="/static/image/creatrelease.png" mode="aspectFit" style="width: 100rpx;
        height: 100rpx;vertical-align: top;" @click="getrele"></image>
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
        listbox: [{
            image: "/static/rumble1.png",
            name: '数据统计',
            path: '/pages/statistical/statistical',
          }, {
            image: "/static/rumble2.png",
            name: '线索提交',
            path: '/pages/index/indexdetail?id=0',
          },
          {
            image: "/static/rumble3.png",
            name: '发帖',
            path: '/pages/index/indexdetail?id=1',
          }, {
            image: "/static/rumble4.png",
            name: '有奖征文',
            path: '/pages/index/indexdetail?id=2',
          }, {
            image: "/static/rumble8.png",
            name: '发现售货机',
            path: '/pages/sellSubmit/sellSubmit',
          }, {
            image: "/static/rumble7.png",
            name: '邀请有礼',
            path: '/pages/courtesy/courtesy',
          }, {
            image: "/static/rumble6.png",
            name: '使用教程',
            path: '/pages/course/course',
          }, {
            image: "/static/rumble5.png",
            name: '联系客服',
            path: '/pages/inviterkefu/inviterkefu',
          },
        ],
        clue: "",
        stick: "",
        writing: "",
        selling: "",
        misson: '',
        background2: '',
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
      this.getbannr();
      this.getbannr1();
      this.getmoneyshow();
      this.getuserdetail();
      this.getsubbox()
      this.getbackground2()
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
      setInterval(()=>{
        soket.send('ping');
      },1000)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    methods: {
      getrele(){
        console.log(321)
        uni.navigateTo({
          url:'/pages/teambox/release'
        })
      },
      getbackground2(){
        const that = this;
        var url = 'api/users/noticeInfo';
        var data={
          type:'index'
        }
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            console.log('轮播123', res.data);
              res.data.image = http.rootDocment + res.data.image;
            that.setData({
              background2: res.data
            });
          }
        });
      },
      getTeamdetaill(id) {
        uni.navigateTo({
          url: '/pages/teambox/Teamdetail?id=' + id
        });
      },
      //获取精选任务分类
      getsubbox() {
        const that = this
        var url = 'api/team/teamType';
        http.postReq(url, '', function(res) {
          console.log('兼职要求', res)
          if (res.code == 200) {
            that.checkMt = res.data
            that.getCoordination()
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      //获取精选任务
      getCoordination() {
        const that = this
        let url = 'api/team/selectionCoordination';
        let data = {
          branch_id: that.checkMt[that.checkMindex].id,
          openid: uni.getStorageSync('openid'),
          order: that.subboxindex,
        }
        http.postReq(url, data, function(res) {
          console.log('任务', res)
          if (res.code == 200) {
            res.data.forEach(el => {
              var avatar=el.avatar.charAt(0)
              console.log('21',avatar)
              if(avatar!='h'){
                 el.avatar = http.rootDocment + el.avatar.substr(1)
              }
              el.branch = el.branch.split(',')
            })
            that.misson = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      changesubbox(e) {
        this.subboxindex = e
        this.getCoordination()
      },
      changecheckMindex(e) {
        console.log(e)
        this.checkMindex = e
        this.getCoordination()
      },
      //扫描二维码
      scanQr() {
        var that = this
        // 允许从相机和相册扫码
        uni.scanCode({
          success: function(res) {
            console.log('条码类型：' + res.scanType);
            console.log('条码内容：' + res.result);
            that.scanjoinTeam(res.result)
          }
        });
      },
      // 通过扫码申请加入团队
      //点击加号加入团队
      scanjoinTeam(id) {
        uni.showModal({
          content: '是否申请加入该团队',
          success: function(res) {
            if (res.confirm) {
              const that = this;
              var url = 'api/team/joinTeam';
              var data = {
                team_id: id,
                openid: uni.getStorageSync('openid')
              };
              http.postReq(url, data, function(res) {
                if (res.code == 200) {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none',
                  })
                } else {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none',
                  })
                }
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
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

      //轮播图
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
      //提现金额
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
        let list = that.listbox[e].path;
        console.log(list);
        uni.navigateTo({
          url: list
        });
      },

      getnavto1() {
        uni.navigateTo({
          url: '/pages/statistical/statistical'
        });
      },

      getdetail(e) {
        console.log("data-index值：", e.currentTarget.dataset.index.content);
        var id = e.currentTarget.dataset.index.id;
        uni.navigateTo({
          url: '/pages/bannerdetail/bannerdetail?id=' + id
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
<style>
  page {
    background-color: #f4f6ed;
  }
  .fixedrelease {
    position: fixed;
    right: 30rpx;
    bottom: 80px;
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
    height: 528rpx;
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
    margin-bottom: 20rpx;
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
