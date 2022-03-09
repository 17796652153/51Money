<template>
<view>
<view v-if="list.length==0" style="text-align:center">
 <view style="font-size: 36rpx;color:#999;margin:80rpx 0 60rpx">暂无数据</view>
 <image src="/static/image/wubg.png"></image>  
</view>
<block v-if="list.length>0">
  <view style="margin-top:40rpx">
  <view v-for="(item, index) in list" :key="index" class="content">
  <view class="box boxs">
    <view class="box-left">
      <view v-if="item.large_type==1">提交线索-{{item.tunnel}}</view>
      <view v-else-if="item.large_type==2">问答提交-{{item.tunnel}}</view>
      <view v-else-if="item.large_type==3">文章-{{item.title}}</view>
      <view v-else>发现售货机-{{item.brand}}</view>
      <view class="box-time">{{item.add_time}}</view>
    </view>
    <view class="box-right">
      <view v-if="item.type==0" class="shenhe">审核中</view>
      <view v-else-if="item.type==1">合格</view>
      <view v-else>不合格</view>
    </view>
  </view>
  <view class="bottombox" v-if="item.type==0 || item.type==2">
    <view class="btnbox" v-if="item.type==2" :data-index="item" @tap="getcause">查看原因</view>
    <view class="btnbox" v-if="item.type==2" :data-index="item" @tap="getdetail" style="margin-left: 20px;">重新提交</view>
    <view class="btnbox" v-else="item.type==0" :data-index="item" @tap="getdetail">修改信息</view>
  </view>
</view>
</view>
</block>



<!-- <view class="content">
  <view class="box boxs">
    <view class="box-left">
      <view>签到奖励</view>
      <view class="box-time">6月9日 12:42</view>
    </view>
    <view class="box-right">
      ＋8.88
    </view>
  </view>
  <view class="bottombox">
    <view class="btnbox" wx:if="{{btnindex==1}}">修改信息</view>
    <view class="btnbox" wx:if="{{btnindex==2}}">重新提交</view>
  </view>
</view> -->
</view>
</template>

<script>
// pages/mysubmit/mysubmit.js
var http = require("../../utils/http.js");
const time = require("../../utils/time.js");

export default {
  data() {
    return {
      btnindex: 0,
      list: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uni.setStorageSync('103', 0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getdata();
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
    getcause(e) {
      console.log("data-index值：", e.currentTarget.dataset.index);
      let dataset = e.currentTarget.dataset.index; // 

      uni.navigateTo({
        url: '/pages/mysubmit/cause?id=' + dataset.id
      });
    },

    getdata() {
      var that = this;
      var url = 'api/users/mySubmit';
      var data = {
        openid: uni.getStorageSync('openid')
      };
      http.postReq(url, data, function (res) {
        if (res.code == 200) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].add_time = time.formatTimeTwo(res.data[i].add_time, 'Y-M-D h:m:s');
          }

          that.setData({
            list: res.data
          });
        }
      });
    },

    // 点击跳转到详情并尝试修改
    getdetail(e) {
      var that = this;
      console.log("data-index值：", e.currentTarget.dataset.index);
      let dataset = e.currentTarget.dataset.index; //  1线索,2问答提交,3文章,4售货机

      if (dataset.large_type == 1) {
        uni.navigateTo({
          url: '/pages/clueSubmit/clueSubmit?id=' + dataset.tunnel_id+'&sid='+dataset.id
        });
      } else if (dataset.large_type == 2) {
        uni.navigateTo({
          url: '/pages/stickSubmit/stickSubmit?id=' + dataset.tunnel_id+'&sid='+dataset.id
        });
      } else if (dataset.large_type == 3) {
        uni.navigateTo({
          url: '/pages/signSubmit/signSubmit?id=' + dataset.tunnel_id+'&sid='+dataset.id
        });
      } else if (dataset.large_type == 4) {
        uni.navigateTo({
          url: '/pages/sellSubmit/sellSubmit?id=' + dataset.id
        });
      }
    }

  }
};
</script>
<style>
/* pages/mysubmit/mysubmit.wxss */
page {
  background-color: #f5f5f5;
}
.boxs {
  background: #fff;
  width: 690rpx;
  margin: 0 auto;
}

.btnbox {
  width: 132rpx;
  height: 48rpx;
  line-height: 48rpx;
  opacity: 1;
  background: #00dfd7;
  border-radius: 10rpx;
  font-size: 28rpx;
  font-family: PingFang TC, PingFang TC-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
}
.bottombox{
  display: flex;
  justify-content: flex-end;
  margin-right: 30rpx;
  margin-top:20rpx;
  margin-bottom: 40rpx;
}
.shenhe{
  color: #00dfd7;
}
</style>