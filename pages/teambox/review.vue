<template>
  <view>
    <view class="swiper-tab">
      <view :class="'swiper-tab-list ' + (currentTab==0 ? 'on' : '')" @click="swichNav(0)">任务审核
        <view class="navBtm"></view>
      </view>
      <view :class="'swiper-tab-list ' + (currentTab==1 ? 'on' : '')" @click="swichNav(1)">领取任务
        <view class="navBtm"></view>
      </view>
    </view>

    <swiper :current="currentTab" class="swiper-box" duration="300" :style="'height:' + (winHeight - 62) + 'rpx;'"
      @change="bindChange(currentTab)">
      <swiper-item>
				<view style="margin-bottom: 50rpx;">
					<view class="missonbg" v-for="(item,index) in auditlist" :key='index'
					  @click="gettodetail(item.task_id,item.id)">
					  <view class="mBgbottom" >
					    <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
					        height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
					    <text v-if="item.type==2">{{item.task_name}}任务已完成请审核</text>
					    <text v-if="item.type==3">{{item.task_name}}任务已完成</text>
					    <text v-if="item.type==4">{{item.task_name}}任务已拒绝</text>
					  </view>
						      <!-- // 2审核中,3已完成,4拒绝 -->
					  <view style="display: flex; justify-content: flex-end;margin-top: 52rpx;" v-if="item.type==2">
					    <view class="btnpos" style="margin-right: 20rpx;" @click.stop="confirmbtn(item.id)">同意</view>
					    <view class="btnpos" @click.stop="open(item.id)">拒绝</view>
					  </view>
					</view>
					     
				</view>

			</swiper-item>
      <swiper-item>
        <view class="missonbg" v-for="(item,index) in auditlist1" :key='index' >
          <view class="mBgbottom">
            <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
                  height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
            <text>{{item.username}}领取{{item.task_name}}任务</text>
          </view>
          <view style="display: flex; justify-content: flex-end;margin-top: 30rpx;padding-bottom: 20rpx;">
            <!-- 1已接单,2审核中,3已完成,4拒绝 -->	
            <view v-if="item.type==1">已接单</view>
            <view v-if="item.type==2">审核中</view>
            <view v-if="item.type==3">已完成</view>
            <view v-if="item.type==4">拒绝</view>
          </view>
        </view>
      </swiper-item>
    </swiper>


    <!--    <view class="missonbg" v-for="(item,index) in auditlist" :key='index' @click="gettodetail(item.task_id,item.id)">
      <view class="mBgbottom">
        <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
                height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
        <text>{{item.task_name}}任务已完成请审核</text>
      </view>
      <view style="display: flex; justify-content: flex-end;margin-top: 52rpx;">
        <view class="btnpos" style="margin-right: 20rpx;" @click.stop="confirmbtn(item.id)">同意</view>
        <view class="btnpos" @click.stop="open(item.id)">拒绝</view>
      </view>
    </view> -->

    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog ref="inputClose" mode="input" title="拒绝原因" value="" :beforeClose="true" placeholder="请输入拒绝原因"
        @confirm="dialogInputConfirm" @close='close'></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  var http = require("../../utils/http.js");

  export default {
    data() {
      return {
        auditlist: "",
        auditlist1:'',
        maskdetail: '',
        id: '',
        currentTab: 0,
        winWidth: 0,
        winHeight: 0,
      }
    },
    onLoad() {
      var that = this
      this.getaudit()
      this.getqueryTaskList()
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
      uni.setStorageSync('106', 0)
    },
    methods: {
      //  tab切换逻辑
      swichNav: function(e) {
        var that = this;
        if (this.currentTab === e) {
          return false;
        } else {
          that.setData({
            currentTab: e
          });
          // this.getdata();
        }
      },
      bindChange: function(e) {
        var that = this;
        that.setData({
          currentTab: e
        });
        if(e==0){
          this.getaudit()
        }else{
          this.getqueryTaskList()
        }
        // this.getdata();
      },
      //查看任务详情
      gettodetail(id, subid) {
        console.log(id)
        uni.navigateTo({
          url: '/pages/Mission/Mission?id=' + id + '&subid=' + subid + '&type=' + 3
        })
      },
      //获取任务审核列表
      // 2审核中,3已完成,4拒绝
      getaudit() {
        const that = this;
        var url = 'api/team/auditTaskList';
        let data = {
          openid: uni.getStorageSync('openid')

        }
        http.postReq(url, data, function(res) {
          console.log('321', res)
          if (res.code == 200) {
            that.auditlist = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      // 领取任务
      getqueryTaskList() {
        const that = this;
        var url = 'api/team/queryTaskList';
        let data = {
          openid: uni.getStorageSync('openid')
        }
        http.postReq(url, data, function(res) {
          console.log('领取任务', res)
          if (res.code == 200) {
            that.auditlist1 = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      /* 审核任务同意与拒绝*/
      open(id) {
        this.id = id
        this.$refs.inputDialog.open()
      },
      close() {
        this.$refs.inputDialog.close()
      },
      dialogInputConfirm(val) {
        console.log(val)
        this.maskdetail = val
        this.close()
        this.submit(2, this.id)
      },
      confirmbtn(id) {
        this.submit(1, id)
      },
      submit(is, id) {
        const that = this;
        var url = 'api/team/auditTask';
        let data = {
          openid: uni.getStorageSync('openid'),
          id,
          is,
          mark: that.maskdetail
        }
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
            that.getaudit()
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
    width: 690rpx;
    background: url(../../static/myteambg1.png) no-repeat;
    background-size: 100% 100%;
    padding: 30rpx 20rpx ;
    position: relative;
    margin-top: 20rpx;
    margin-left: 30rpx;
  }

  .mBgbottom {
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    line-height: 48rpx;
  }

  .btnpos {
    width: 136rpx;
    height: 60rpx;
    background: #d0d6f8;
    border-radius: 30rpx;
    line-height: 60rpx;
    text-align: center;
    opacity: 1;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #8913ff;
    margin-bottom: 20rpx;
  }


  /* swiper */
  .swiper-tab {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    line-height: 80rpx;
    display: flex;
    justify-content: space-between;
    background: #d4fffd;
    padding: 0 150rpx;
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
</style>
