<template>
  <view>
    <view class="swiper-tab " >
      <view :class="'swiper-tab-list ' + (currentTab==0 ? 'on' : '')" data-current="0" @tap="swichNav">团队信息
        <view class="navBtm"></view>
      </view>
      <view  :class="'swiper-tab-list ' + (currentTab==1 ? 'on' : '')" data-current="1" @tap="swichNav">审核信息
        <view class="navBtm"></view>
      </view>
    </view>
    <swiper :current="currentTab" class="swiper-box" duration="300" :style="'height:' + (winHeight - 62) + 'rpx;'"
      @change="bindChange">
      <swiper-item>
        <view class="bindingBox">
          <text>团队名称</text>
          <view class="bindingBoxInputView">
            <input type="text" placeholder="请输入团队名称" :disabled="istrue" :value="teamname" @input="getteamname">
          </view>
        </view>
        <view class="bindingBox">
          <text>团队人数</text>
          <view class="bindingBoxInputView">
            <input type="text" placeholder="请规定团队人数" :disabled="istrue" :value="teamcount" @input="getteamcount">
          </view>
        </view>
        <view class="bindingBox" style="border: none;">
          <text>团队ID号</text>
          <view class="bindingBoxInputView" style="display: flex;align-items: center;height: 130rpx;border: none;">
            <text>{{teamnum}}</text>
            <image src="/static/copy.png" mode="aspectFit" style="width: 28rpx;
                height: 28rpx;vertical-align: top;margin-left: 50rpx;" @click="getcopy(teamnum)"></image>
          </view>
        </view>
        <view class="btnbox">
          <image src="../../static/creatqrcode.png" mode="aspectFit" @click="getinviter(id)"></image>
          <image src="../../static/invietuser.png" mode="aspectFit" @click="invteropen"></image>
        </view>
        <view class="sendForm" @click="scatteredTeam" v-if="istrue==false">解散团队</view>
      </swiper-item>
      <swiper-item >
        <view class="missonbg" v-for="(item,index) in audit" :key='index'>
          <view class="mBgbottom">
            <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
                    height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
            <text>{{item.username}} <text v-if="item.is_yao==1">申请</text><text v-if="item.is_yao==2">邀请</text>加入团队</text>
          </view>
          <view style="display: flex; justify-content: flex-end;margin-top: 52rpx;" v-if="item.type==0">
            <view class="btnpos" style="margin-right: 20rpx;" @click="RefuseTeam(item.id,1)">同意</view>
            <view class="btnpos" @click="RefuseTeam(item.id,2)">拒绝</view>
          </view>
          <view style="display: flex; justify-content: flex-end;margin-top: 52rpx;" v-if="item.type==1">
            您同意申请
          </view>
          <view style="display: flex; justify-content: flex-end;margin-top: 52rpx;" v-if="item.type==2">
            您已经拒绝了
          </view>
        </view>
      </swiper-item>
    </swiper>
    <image src="/static/image/changeteam.png" mode="aspectFit" style="width: 100rpx;
         height: 100rpx;vertical-align: top;position: absolute;right: 0;bottom: 150rpx;" @click="changeteam"></image>
    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog ref="inputClose" mode="input" title="邀请用户" value="" :beforeClose="true" placeholder="请输入邀请人的手机号"
        @confirm="dialogInputConfirm" @close='close'></uni-popup-dialog>
    </uni-popup>
  </view>

</template>

<script>
  // pages/bindingPhone/bindingPhone.js
  var http = require("../../utils/http.js");

  export default {
    data() {
      return {
        id: '',
        num: 60,
        hide: 2,
        teamname: '',
        teamnum: '',
        teamcount: '',
        addTeam: '',
        joinTeam: '',
        istrue: true,
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        phone: '',
        audit: '' ,//入团审核
        changeteams:false,  //切换团队
      };
    },

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
      this.jointeam()
      this.teamJoinList()
      uni.setStorageSync('102', 0)
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
     * 监听原生标题栏按钮点击事件
     */
    onNavigationBarButtonTap: function() {
      const that = this;
      var url = 'api/team/editTeam';
      var data = {
        openid: uni.getStorageSync('openid'),
        id: this.id,
        team_name: this.teamname,
        team_count: this.teamcount,
        team_number: this.teamnum
      };
      http.postReq(url, data, function(res) {
        console.log(res);
        if (res.code == 200) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
      });
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    methods: {
      //点击跳转到qrcode页面
      getinviter(id) {
        uni.navigateTo({
          url: '/pages/inviter/teaminviter?id=' + id
        })
      },
      changeteam(){
        var that=this
        uni.showModal({
          content: '是否要切换团队',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.changeteams=!that.changeteams
              that.jointeam()
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
      //同意加入团队或者拒绝加入
      RefuseTeam(id, type) {
        const that = this;
        var url = 'api/team/agreeRefuseTeam';
        var data = {
          openid: uni.getStorageSync('openid'),
          id,
          type
        };
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            console.log('审核同意', res);
            that.teamJoinList()
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      //获取团队申请列表
      teamJoinList() {
        const that = this;
        var url = 'api/team/teamJoinList';
        var data = {
          openid: uni.getStorageSync('openid'),
        };
        http.postReq(url, data, function(res) {
          console.log('队伍审核信息', res);
          if (res.code == 200) {
            res.data.forEach(el => {
              var avatar = el.avatar.charAt(0)
              if (avatar != 'h') {
                el.avatar = http.rootDocment + el.avatar.substr(1)
              }
            })
            that.audit = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      //解散团队
      scatteredTeam() {
         const that = this;
        uni.showModal({
          content: '您是否解散团队',
          success: function(res) {
            if (res.confirm) {
              var url = 'api/team/scatteredTeam';
              var data = {
                id: that.id,
                openid: uni.getStorageSync('openid'),
              };
              http.postReq(url, data, function(res) {
                console.log(res);
                if (res.code == 200) {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                  });
                  uni.navigateBack({
                    delta:1
                  })
                } else {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                  });
                }
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });

      },

      //邀请人
      invteropen() {
        this.$refs.inputDialog.open()
      },
      close() {
        this.$refs.inputDialog.close()
      },
      dialogInputConfirm(val) {
        console.log(val)
        this.phone = val
        this.close()
        this.InviteTeam()
      },
      InviteTeam() {
        const that = this;
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

        if (!myreg.test(that.phone)) {
          uni.showToast({
            title: '号码不符合规范',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        var url = 'api/team/InviteTeam';
        var data = {
          team_id: this.id,
          phone: this.phone,
        };
        http.postReq(url, data, function(res) {
          console.log(res);
          if (res.code == 200) {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },

      //获取输入框的信息
      getteamname(e) {
        const that = this;
        that.setData({
          teamname: e.detail.value
        });
      },
      getteamcount(e) {
        const that = this;
        that.setData({
          teamcount: e.detail.value
        });
      },
      // 我加入的团队
      async jointeam() {
        var url1 = http.rootDocment + 'api/team/myTeam'
        const [err, res1] = await uni.request({
          url: url1,
          header: {
            'content-type': 'application/x-www-form-urlencoded' //post
          },
          method: 'POST',
          data: {
            openid: uni.getStorageSync('openid')
          }
        });
        if (err) {
          console.log('request fail', err);
          uni.showModal({
            content: err.errMsg,
            showCancel: false
          });
        } else {
          console.log('request success', res1)
          this.res = '请求结果 : ' + JSON.stringify(res1.data);
        }
        console.log(err, res1.data)
        const that = this;
        var url = 'api/team/joinYourTeam'; // 正则判断手机号是否符合规范
        var data = {
          openid: uni.getStorageSync('openid')
        };
        http.postReq(url, data, function(res) {
          console.log(res);
          if (res.code == 200) {
            res.data.forEach(element => {
              if(that.changeteams&&element.id != res1.data.data.id){
                console.log('id不相同')
                that.id = element.id
                that.teamname = element.team_name
                that.teamcount = element.team_count
                that.teamnum = element.team_number
                that.istrue = true
              }
              if(res1.data.data==null){   //为null代表自己没有团队看是否有加入团队，有的话展示没得话这个页面就进不来吧 
              console.log('为空没有团队')
               that.id = element.id
               that.teamname = element.team_name
               that.teamcount = element.team_count
               that.teamnum = element.team_number
               that.istrue = true
              }else if (element.id == res1.data.data.id &&that.changeteams==false) {
                console.log('自己拿团队')
                that.id = element.id
                console.log(that.id)
                that.teamname = element.team_name
                that.teamcount = element.team_count
                that.teamnum = element.team_number
                that.istrue = false
              }
            })
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      // 监听离开界面
      //  tab切换逻辑
      swichNav: function(e) {
        var that = this;
        // if(that.istrue){
        //   uni.showToast({
        //     title: '您不是团长，无法查看审核信息',
        //     icon: 'none',
        //     duration: 2000
        //   });
        //   return false;
        // }
        if (this.currentTab === e.target.dataset.current) {
          return false;
        }else {
          that.setData({
            currentTab: e.target.dataset.current
          });
          // this.getdata();
        }
      },
      bindChange: function(e) {
        var that = this;
   //      if(that.istrue){
   //        uni.showToast({
   //          title: '您不是团长，无法查看审核信息',
   //          icon: 'none',
   //          duration: 2000
   //        });
   //        return false;
   //      }else{
   
   //      }
        that.setData({
          currentTab: e.detail.current
        });

        // this.getdata();
      },

    }
  };
</script>
<style>
  page {
    background-color: #f4f6ed;
  }
  .activeClass{
    justify-content: center !important;
  }
  .bindingBox {
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0rpx 4%;
    box-sizing: border-box;
    align-items: center;
  }

  .bindingBox text {
    font-size: 32rpx;
    color: #333;
    display: inline-block;
    width: 31%;
    text-align: left;
  }

  .bindingBox .bindingBoxInputView {
    width: 69%;
    border-bottom: 1rpx solid #e5e5e5;
  }

  .bindingBox input {
    height: 130rpx;
  }

  .sendPhone {
    display: inline-block;
    width: 180rpx;
    height: 48rpx;
    background: #00DFD7;
    color: #FFF;
    font-size: 24rpx;
    text-align: center;
    line-height: 48rpx;
    border-radius: 24rpx;
  }

  .hide {
    display: none;
  }

  .btnbox {
    padding: 50rpx 30rpx;
    display: flex;
    justify-content: space-between;
  }


  .btnbox image {
    width: 330rpx;
    height: 140rpx;
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



  /* 最后结束的表 */
  .missonbg {
    box-sizing: border-box;
    background: url(../../static/myteambg.png) no-repeat;
    width: 690rpx;
    height: 216rpx;
    background-size: contain;
    padding: 40rpx 20rpx 0;
    position: relative;
    margin-top: 20rpx;
    margin-left: 30rpx;
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
    width: 136rpx;
    height: 60rpx;
    background: #f8efd0;
    border-radius: 30rpx;
    line-height: 60rpx;
    text-align: center;
    opacity: 1;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #ff9213;
  }

  .sendForm {
    position: absolute;
    left: 0;
    bottom: 50rpx;
    margin-top: 40rpx;
    width: 750rpx;
    height: 108rpx;
    opacity: 1;
    background: #fff;
    color: #ff0000;
    line-height: 108rpx;
    text-align: center;
  }
</style>
