<template>
  <view>
    <!--pages/order/order.wxml-->
    <view class="swiper-tab">
      <view :class="'swiper-tab-list ' + (currentTab==0 ? 'on' : '')" data-current="0" @tap="swichNav">全部
        <view class="navBtm"></view>
      </view>
      <view :class="'swiper-tab-list ' + (currentTab==1 ? 'on' : '')" data-current="1" @tap="swichNav">待提交
        <view class="navBtm"></view>
      </view>
      <view :class="'swiper-tab-list ' + (currentTab==2 ? 'on' : '')" data-current="2" @tap="swichNav">审核中
        <view class="navBtm"></view>
      </view>
      <view :class="'swiper-tab-list ' + (currentTab==3 ? 'on' : '')" data-current="3" @tap="swichNav">不合格
        <view class="navBtm"></view>
      </view>
      <view :class="'swiper-tab-list ' + (currentTab==4 ? 'on' : '')" data-current="4" @tap="swichNav">已完成
        <view class="navBtm"></view>
      </view>
    </view>

    <swiper :current="currentTab" class="swiper-box" duration="300"
      :style="'height:' + (winHeight - 62) + 'rpx;padding-bottom:30rpx;'" @change="bindChange">
      <swiper-item>
        <view style="text-align:center" v-if='datalist.length==0'>
          <view style="font-size: 36rpx;color:#999;margin:80rpx 0 60rpx">暂无数据</view>
          <image src="/static/wubg.png"></image>
        </view>
        <view v-if='datalist.length>0'>
          <view v-for="(item, index) in datalist" :key="index" class="shoplist">
            <view class="missonbg1">
              <view class="mBgTop">
                <text>{{item.task_name}}</text>
                <view class="TopMoney">{{item.count_money}}元/<text style="font-size: 26rpx">条</text></view>
              </view>
              <view class="mBgmiddele">
                <view class="mbgmbox" v-for="(n,i) in item.task_branch" :key='i'>
                  {{n}}
                </view>
              </view>
              <view class="mBgbottom">
                <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
              height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
                <text>{{item.username}}·发布者</text>
              </view>
              <view class="btnpos" v-if="item.type==1" @click="getsubmit(item.task_id,item.id,item.type)">待提交</view>
              <view class="btnpos" v-if="item.type==2" @click="getsubmit(item.task_id,item.id,item.type)">审核中</view>
              <view class="btnpos1" v-if="item.type==4" @click="getsubmit(item.task_id,item.id,item.type)">不合格</view>
              <view class="refused" v-if="item.type==4">
                <view>查看不合格原因</view>
                <view v-show="item.refusedtrue" @click="refusedtrue(index)" style="color: #FF0000;margin: 30rpx 0;">
                  {{item.mark}}
                </view>
                <image class="xl" :class="[item.refusedtrue==true?'xlrote':'']" src="/static/xl.png" mode="aspectFit"
                  @click="refusedtrue(index)"></image>
              </view>
              <view class="btnpos" v-if="item.type==3" @click="getsubmit(item.task_id,item.id,item.type)"
                style="background-color: #e5e5e5;color: #999999">已完成</view>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view style="text-align:center" v-if='datalist.length==0'>
          <view style="font-size: 36rpx;color:#999;margin:80rpx 0 60rpx">暂无数据</view>
          <image src="/static/wubg.png"></image>
        </view>
        <view v-if='datalist.length>0'>
          <view v-for="(item, index) in datalist" :key="index" class="shoplist">
            <view class="missonbg">
              <view class="mBgTop">
                <text>{{item.task_name}}</text>
                <view class="TopMoney">{{item.count_money}}元/<text style="font-size: 26rpx">条</text></view>
              </view>
              <view class="mBgmiddele">
                <view class="mbgmbox" v-for="(n,i) in item.task_branch" :key='i'>
                  {{n}}
                </view>
              </view>
              <view class="mBgbottom">
                <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
              height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
                <text>{{item.username}}·发布者</text>
              </view>
              <view class="btnpos" v-if="item.type==1" @click="getsubmit(item.task_id,item.id,item.type)">待提交</view>
              <view class="btnpos" v-if="item.type==2" @click="getsubmit(item.task_id,item.id,item.type)">审核中</view>
              <view class="btnpos1" v-if="item.type==4" @click="getsubmit(item.task_id,item.id,item.type)">不合格</view>
              <view class="refused" v-if="item.type==4" @click="getsubmit(item.task_id,item.id,item.type)">
                <view>查看不合格原因</view>
                <view v-show="item.refusedtrue" @click="refusedtrue(index)" style="color: #FF0000;margin: 30rpx 0;">
                  因为这些内容导致你的任务不能发布，请修改后再次提交审核， 谢谢您的配合！</view>
                <image class="xl" :class="[item.refusedtrue==true?'xlrote':'']" src="/static/xl.png" mode="aspectFit"
                  @click="refusedtrue(index)"></image>
              </view>
              <view class="btnpos" v-if="item.type==3" @click="getsubmit(item.task_id,item.id,item.type)"
                style="background-color: #e5e5e5;color: #999999">已完成</view>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view style="text-align:center" v-if='datalist.length==0'>
          <view style="font-size: 36rpx;color:#999;margin:80rpx 0 60rpx">暂无数据</view>
          <image src="/static/wubg.png"></image>
        </view>
        <view v-if='datalist.length>0'>
          <view v-for="(item, index) in datalist" :key="index" class="shoplist">
            <view class="missonbg">
              <view class="mBgTop">
                <text>{{item.task_name}}</text>
                <view class="TopMoney">{{item.count_money}}元/<text style="font-size: 26rpx">条</text></view>
              </view>
              <view class="mBgmiddele">
                <view class="mbgmbox" v-for="(n,i) in item.task_branch" :key='i'>
                  {{n}}
                </view>
              </view>
              <view class="mBgbottom">
                <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
                height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
                <text>{{item.username}}·发布者</text>
              </view>
              <view class="btnpos" v-if="item.type==1" @click="getsubmit(item.task_id,item.id,item.type)">待提交</view>
              <view class="btnpos" v-if="item.type==2" @click="getsubmit(item.task_id,item.id,item.type)">审核中</view>
              <view class="btnpos1" v-if="item.type==4" @click="getsubmit(item.task_id,item.id,item.type)">不合格</view>
              <view class="refused" v-if="item.type==4">
                <view>查看不合格原因</view>
                <view v-show="item.refusedtrue" @click="refusedtrue(index)" style="color: #FF0000;margin: 30rpx 0;">
                  因为这些内容导致你的任务不能发布，请修改后再次提交审核， 谢谢您的配合！</view>
                <image class="xl" :class="[item.refusedtrue==true?'xlrote':'']" src="/static/xl.png" mode="aspectFit"
                  @click="refusedtrue(index)"></image>
              </view>
              <view class="btnpos" v-if="item.type==3" @click="getsubmit(item.task_id,item.id,item.type)"
                style="background-color: #e5e5e5;color: #999999">已完成</view>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view style="text-align:center" v-if='datalist.length==0'>
          <view style="font-size: 36rpx;color:#999;margin:80rpx 0 60rpx">暂无数据</view>
          <image src="/static/wubg.png"></image>
        </view>
        <view v-if='datalist.length>0'>
          <view v-for="(item, index) in datalist" :key="index" class="shoplist">
            <view class="missonbg1">
              <view class="mBgTop">
                <text>{{item.task_name}}</text>
                <view class="TopMoney">{{item.count_money}}元/<text style="font-size: 26rpx">条</text></view>
              </view>
              <view class="mBgmiddele">
                <view class="mbgmbox" v-for="(n,i) in item.task_branch" :key='i'>
                  {{n}}
                </view>
              </view>
              <view class="mBgbottom">
                <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
                height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
                <text>{{item.username}}·发布者</text>
              </view>
              <view class="btnpos" v-if="item.type==1" @click="getsubmit(item.task_id,item.id,item.type)">待提交</view>
              <view class="btnpos" v-if="item.type==2" @click="getsubmit(item.task_id,item.id,item.type)">审核中</view>
              <view class="btnpos1" v-if="item.type==4" @click="getsubmit(item.task_id,item.id,item.type)">不合格</view>
              <view class="refused" v-if="item.type==4">
                <view>查看不合格原因</view>
                <view v-show="item.refusedtrue" @click="refusedtrue(index)" style="color: #FF0000;margin: 30rpx 0;">
                  {{item.mark}}
                </view>
                <image class="xl" :class="[item.refusedtrue==true?'xlrote':'']" src="/static/xl.png" mode="aspectFit"
                  @click="refusedtrue(index)"></image>
              </view>
              <view class="btnpos" v-if="item.type==3" @click="getsubmit(item.task_id,item.id,item.type)"
                style="background-color: #e5e5e5;color: #999999">已完成</view>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view style="text-align:center" v-if='datalist.length==0'>
          <view style="font-size: 36rpx;color:#999;margin:80rpx 0 60rpx">暂无数据</view>
          <image src="/static/wubg.png"></image>
        </view>
        <view v-if='datalist.length>0'>
          <view v-for="(item, index) in datalist" :key="index" class="shoplist">
            <view class="missonbg">
              <view class="mBgTop">
                <text>{{item.task_name}}</text>
                <view class="TopMoney">{{item.count_money}}元/<text style="font-size: 26rpx">条</text></view>
              </view>
              <view class="mBgmiddele">
                <view class="mbgmbox" v-for="(n,i) in item.task_branch" :key='i'>
                  {{n}}
                </view>
              </view>
              <view class="mBgbottom">
                <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
                height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
                <text>{{item.username}}·发布者</text>
              </view>
              <view class="btnpos" v-if="item.type==1" @click="getsubmit(item.task_id,item.id,item.type)">待提交</view>
              <view class="btnpos" v-if="item.type==2" @click="getsubmit(item.task_id,item.id,item.type)">审核中</view>
              <view class="btnpos1" v-if="item.type==4" @click="getsubmit(item.task_id,item.id,item.type)">不合格</view>
              <view class="refused" v-if="item.type==4" @click="getsubmit(item.task_id,item.id,item.type)">
                <view>查看不合格原因</view>
                <view v-show="item.refusedtrue" @click="refusedtrue(index)" style="color: #FF0000;margin: 30rpx 0;">
                  因为这些内容导致你的任务不能发布，请修改后再次提交审核， 谢谢您的配合！</view>
                <image class="xl" :class="[item.refusedtrue==true?'xlrote':'']" src="/static/xl.png" mode="aspectFit"
                  @click="refusedtrue(index)"></image>
              </view>
              <view class="btnpos" v-if="item.type==3" @click="getsubmit(item.task_id,item.id,item.type)"
                style="background-color: #e5e5e5;color: #999999">已完成</view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  // pages/order/order.js
  var http = require("../../utils/http.js");

  export default {
    data() {
      return {
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        datalist: [{
          refusedtrue: false,
          name: 1
        }, {
          refusedtrue: false,
          name: 1
        }, {
          refusedtrue: false,
          name: 1
        }, ]
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      var that = this;
      console.log(options.index);
      that.setData({
        currentTab: options.index || 0
      });
      /**
       * 获取当前设备的宽高
       */

      uni.getSystemInfo({
        success: function(res) {
          var height = res.windowWidth * 2;
          that.setData({
            winWidth: res.windowWidth * 2,
            winHeight: res.windowHeight * 2
          });
        }
      });
      this.getdata();
      uni.setStorageSync('107', 0)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      //

      this.getdata();
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    methods: {
      // getsubmit(id,subid){
      //   console.log(id)
      //   uni.navigateTo({
      //     url: '/pages/Mission/Mission?id=' + id+'&subid='+subid
      //   })
      // },
      getsubmit(id, subid, type) {
        console.log(type)
        uni.navigateTo({
          url: '/pages/Mission/Mission?id=' + id + '&subid=' + subid + '&type=' + type
        })
      },
      refusedtrue(e) {
        this.datalist[e].refusedtrue = !this.datalist[e].refusedtrue
      },
      // 获取数据
      getdata() {
        const that = this;
        let url = 'api/team/myMission';
        let currentTab = that.currentTab
        if (that.currentTab == 3) {
          console.log(1)
          currentTab = 4
        } else if (that.currentTab == 4) {
          console.log(2)
          currentTab = 3
        }
        let data = {
          type: currentTab,
          openid: uni.getStorageSync('openid')
        };
        http.postReq(url, data, function(res) {
          console.log('myMission', res);
          if (res.code == 200) {
            res.data.forEach(el => {
              el.refusedtrue = false
              el.task_branch = el.task_branch.split(',')
            })
            that.datalist = res.data
          } else if (res.code == 400) {
            uni.showToast({
              title: res.msg,
              icon: 'none',
            })
          }
        });
      },

      copydan(e) {
        const that = this;
        console.log(e.currentTarget.dataset.dan);
        uni.setClipboardData({
          data: e.currentTarget.dataset.dan,
          success: function(res) {
            uni.showToast({
              title: '复制成功',
              icon: 'none',
              duration: 2000
            });
          }
        });
      },


      //  tab切换逻辑
      swichNav: function(e) {
        var that = this;

        if (this.currentTab === e.target.dataset.current) {
          return false;
        } else {
          that.setData({
            currentTab: e.target.dataset.current
          });
          // this.getdata();
        }
      },
      bindChange: function(e) {
        var that = this;
        that.setData({
          currentTab: e.detail.current
        });
        this.getdata();
      },

      gettolist() {
        console.log("占位：函数 gettolist 未声明");
      }

    }
  };
</script>
<style>
  /* pages/order/order.wxss */
  page {
    background-color: #f4f6ed;
  }

  .xl {
    width: 32rpx;
    height: 30rpx;
  }

  .xlrote {
    transform: rotate(180deg)
  }

  .swiper-tab {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    line-height: 80rpx;
    display: flex;
    justify-content: space-between;
    background: #d4fffd;
    padding: 0 40rpx;
    padding-bottom: 10rpx;
  }

  .swiper-tab-list {
    font-size: 30rpx;
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
    padding-bottom: 60rpx;
  }

  /* itemdetail */
  .shoplist {
    margin-left: 30rpx;
    margin-bottom: 40rpx;
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
    margin-top: 20rpx;
  }

  .missonbg1 {
    box-sizing: border-box;
    background: url(../../static/missonbg.png) no-repeat;
    width: 690rpx;
    background-size: 100% 100%;
    padding: 40rpx 20rpx 20rpx;
    position: relative;
    margin-top: 20rpx;
  }

  .refused {
    text-align: center;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #999999;
    margin-top: 40rpx;
  }

  .btnpos1 {
    position: absolute;
    right: 0;
    top: 200rpx;
    width: 168rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    opacity: 1;
    background: #ffd7d7;
    border-radius: 30rpx 0rpx 0rpx 30rpx;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #df0000;
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
