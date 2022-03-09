<template>
  <view>
    <view class="back">
      <image style="width: 750rpx;height: 276rpx;" src="/static/bg1.png" mode="scaleToFill" @tap="previewImg1"></image>
      <image style="width: 750rpx;height: calc(100% - 276rpx);" src="/static/allbg.png" mode="scaleToFill"
        @tap="previewImg1"></image>
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
          <view class="partbox" >
          <!--  <text selectable="true">1231231</text>
                <mp-html :content="channel.content"></mp-html> -->
                 <text style="display: inline-block;" selectable="true">{{channel.content}}</text>
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
            <view class="signBox">
              <view class="title">文章标题</view>
              <input type="text" placeholder="请输入文章标题" placeholder-class="input-placeholder" :value="title"
                @input="gettitle">
            </view>
            <view style="height:60rpx;"></view>
            <view class="signBox">
              <view class="title">文章内容</view>
              <textarea cols="30" rows="10" placeholder-class="input-placeholder" :value="content"
                placeholder="请开始您的创作~" @input="getcontent"></textarea>
            </view>
            <view style="height:60rpx;"></view>
            <view class="signBox">
              <view class="title">备注</view>
              <input type="text" placeholder="请写下您的要求~" placeholder-class="input-placeholder" :value="remark"
                @input="getremark">
            </view>
            <view class="text">温馨提示：{{tips3}}</view>
            <!-- <image class="sendForm" src="/static/image/ljbc.png" @tap="getsubmitbox"></image> -->
          </view>

        </view>

      </view>
      <view class="sendForm" @tap="getsubmit" v-if="sid==''">提交审核</view>
      <view class="sendForm" @tap="getsubmit1" v-if="sid!=''">修改信息</view>
    </view>

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
        title: '',
        content: '',
        remark: '',
        user: '',
        link_id: '',
        link_title: '',
        zw_time: '',
        tips3: "",
        signid: "",
        channel: '',
        sid:''
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      // console.log(options, 'options');
      // this.setData({
      //   id: options.id,
      //   sid: options.sid
      // });
      if('sid' in options){
        console.log(1231)
        this.setData({
          id: options.id,
          sid:options.sid
        });
      }else{
         console.log(2222)
        this.setData({
          id:options.id,
        });
      }
      this.getclueChannel()
      if (this.sid != '') {
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

      this.setData({
        user: uni.getStorageSync('user'),
        tips3: uni.getStorageSync('tips3')
      });
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
      getmostdetail() {
        const that = this
        let url = 'api/users/lookup'
        let data = {
          id: that.sid
        }
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            that.setData({
              title: res.data.title,
              content: res.data.content,
              remark: res.data.remarks,
            })
          }
        })
      },
      //根据id获取提交页的详情
      getclueChannel() {
        const that = this;
        let url = 'api/team/clueChannel3';
        let data = {
          id: that.id
        };
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


      getdata() {
        const that = this;
        let url = 'api/users/lookup';
        let data = {
          id: that.signid
        };
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            that.setData({
              title: res.data.title,
              content: res.data.content,
              remark: res.data.remarks
            });
          }
        });
      },

      gettitle(e) {
        this.setData({
          title: e.detail.value
        });
      },

      getcontent(e) {
        this.setData({
          content: e.detail.value
        });
      },

      getremark(e) {
        this.setData({
          remark: e.detail.value
        });
      },


      // 修改
      getsubmit1() {
        var that = this;
        var url = 'api/users/UpdaSubmit';
        var data = {
          openid: uni.getStorageSync('openid'),
          id: that.sid,
          tunnel_id: that.id,
          remarks: that.remark,
          title: that.title,
          content: that.content,
          province: uni.getStorageSync('province'),
          city: uni.getStorageSync('city'),
          area: uni.getStorageSync('district')
        };
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            soket.send("3");
            uni.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 2000
            });
            setTimeout(function() {
              uni.navigateBack();
            }, 2000);
          }
        });
      },

      // 创建
      getsubmit() {
        var that = this;
        var url = 'api/users/submitClue';

        if (that.title == '') {
          uni.showToast({
            title: '标题不能为空',
            icon: 'none',
            duration: 2000
          });
          return;
        }

        var data = {
          openid: uni.getStorageSync('openid'),
          remarks: that.remark,
          avatar: that.user.avatar,
          nick: that.user.username,
          large_type: 3,
          title: that.title,
          content: that.content,
          tunnel_id: that.id,
          province: uni.getStorageSync('province'),
          city: uni.getStorageSync('city'),
          area: uni.getStorageSync('district')
        };

        if (data.openid == '') {
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
        }

        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            soket.send("3");
            uni.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 2000
            });
            that.setData({
              title: '',
              remark: '',
              content: ''
            });
            setTimeout(function() {
              uni.navigateTo({
                url: '/pages/mysubmit/mysubmit'
              });
            }, 2000);
          }
        });
      }

    }
  };
</script>
<style>
  .back {
    position: absolute;
    z-index: -1;
    height: 2850rpx;
  }

  .clueBox {
    width: 690rpx;
    border-radius: 10px;
    padding: 80rpx 40rpx 20rpx 40rpx;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    background: #FFF;
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

  .clueBox input {
    background: #90fffb;
    margin-top: 30rpx;
    height: 68rpx;
    border-radius: 34rpx;
    padding: 0rpx 20rpx;
    box-sizing: border-box;
  }

  .clueBox textarea {
    width: 100%;
    background: #90fffb;
    margin-top: 30rpx;
    height: 372rpx;
    border-radius: 34rpx;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
  }


  .title {
    font-size: 36rpx;
    color: #333;
    font-weight: 500;
  }

  .line {
    height: 1px;
    background: #ebebeb;
    margin-top: 20rpx;
  }

  .cont {
    font-size: 28rpx;
    color: #333;
    margin-top: 20rpx;
  }

  .text {
    font-size: 28rpx;
    color: #666;
    margin-top: 120rpx;
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
