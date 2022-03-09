<template>
  <view>
    <view
      style="width: 100%;background-color: #fff;height:104rpx;display: flex;justify-content: center;align-items: center;">
      <view class="search">
        <image src="/static/image/search.png" mode="aspectFit" class="searchimg"></image>
        <input placeholder="请输入团队id" v-model="teamid" confirm-hold="true" confirm-type="search" @confirm="getteam">
      </view>
    </view>
    <view class="missonbgbox" style="margin-left:30rpx;">
      <view class="missonbg" v-for="(item,index) in listbox" :key='index' style="margin-top: 20rpx;">
        <view class="mBgTop">
          <text>{{item.team_name}}</text>
          <view class="TopMoney">{{item.team_count}}/<text
              style="font-size: 26rpx;color: #FF0000;">{{item.people_count}}</text></view>
        </view>
        <view class="mBgmiddele">
          <view class="mbgmbox" style="color: #fff;background: #00dfd7;">
            已完成线索数量{{item.sum_count}}条
          </view>
          <view class="mbgmbox" style="background: #FF2525;color: #fff;">
            已获得奖励{{item.sum_money}}元
          </view>
        </view>
        <view class="mBgbottombox">
          <view class="mBgbottom">
            <text>团队ID：{{item.team_number}}</text>
            <image src="/static/image/Tcode.png" mode="aspectFit" style="width: 28rpx;
                height: 28rpx;vertical-align: top;margin-left: 10rpx;" @click="getinviter(item.id)"></image>
            <image src="/static/copy.png" mode="aspectFit" style="width: 28rpx;
                height: 28rpx;vertical-align: top;margin-left: 10rpx;" @click="getcopy(item.team_number)"></image>
          </view>
          <image src="/static/image/Tadd.png" mode="aspectFit" style="width: 60rpx;
            height: 60rpx;vertical-align: top;" @click="scanjoinTeam(item.id)"></image>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
  const http = require("../../utils/http.js");
  export default {
    data() {
      return {
        listbox:'',
        teamid:'',
      }
    },
    onLoad() {
      this.getteam()
    },
    methods: {
      // 复制id
      getcopy(id) {
        uni.setClipboardData({
          data: id,
          success: function() {
            console.log('success');
          }
        });
      },
      //点击跳转到qrcode页面
      getinviter(id) {
        uni.navigateTo({
          url: '/pages/inviter/teaminviter?id=' + id
        })
      },
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
      //获取团队列表
      getteam() {
        const that = this;
        var url = 'api/team/teamList';
        let data = {
          team_number: that.teamid
        }
        http.postReq(url, data, function(res) {
          console.log('321', res)
          if (res.code == 200) {
            that.listbox = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
    }
  }
</script>

<style>
  page {
    background-color: #f4f6ed;
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
    color: #999999;
  }

  .mBgmiddele {
    display: flex;
    margin: 20rpx 0 40rpx;
  }

  .mbgmbox {
    background: #00DFD7;
    border-radius: 10rpx;
    color: #fff;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    padding: 8rpx 20rpx;
    margin-right: 20rpx;
  }

  .mBgbottom {
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    display: flex;
    align-items: center;
  }

  .mBgbottombox {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .search {
    box-sizing: border-box;
    width: 690rpx;
    height: 64rpx;
    opacity: 1;
    background: #ffffff;
    border: 2rpx solid #00dfd7;
    border-radius: 34rpx;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
  }

  .searchimg {
    width: 44rpx;
    height: 44rpx;
    margin-right: 10rpx;
  }
</style>
