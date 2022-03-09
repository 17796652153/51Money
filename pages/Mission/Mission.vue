<template>
  <view>
    <view class="back">
      <image style="width: 750rpx;height: 276rpx;" src="/static/bg1.png" mode="scaleToFill" @tap="previewImg1"></image>
      <image style="width: 750rpx;" :style="{height:contentheight}" src="/static/allbg.png" mode="scaleToFill"
        @tap="previewImg1"></image>
    </view>
    <view  class="content" style="position: absolute;z-index: 1;top: 210rpx;width: 750rpx;overflow: hidden;">
      <view style="width: 690rpx;left: 30rpx;position: relative;margin-bottom: 30rpx;">
        <view class="missonbg">
          <view class="mBgTop">
            <text>{{channel.name}}</text>
            <view class="TopMoney">{{channel.count_money}}元/<text style="font-size: 26rpx">条</text></view>
          </view>
          <view class="mBgmiddele">
            <view class="mbgmbox" v-for="(n,i) in channel.branch" :key='i'>
              {{n}}
            </view>
          </view>
          <view class="mBgbottom" style="position: relative;">
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
            {{channel.explain}}
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
            任务提交
          </view>
          <view class="clueBox">
            <textarea cols="30" rows="10" placeholder-class="input-placeholder" v-model='detail'
              placeholder="任务描述" :desabled='disa'></textarea>

            <view class="uploader-img  flex justify-content-start" v-if="pics">
              <view class="upAdd" @tap="chooseImg">
                <image style="width:160rpx;height:160rpx;" src="/static/uploads_image.png" mode="widthFix" v-if="disa==false"></image>
              </view>
              <view v-for="(item, index) in pics" :key="index" class="uploader-list">
                <image style="width:160rpx;height:160rpx;" :src="item" :data-index="index" mode="scaleToFill"
                  @tap="previewImg1"></image>
                <image class="delete" style="width:52rpx;height:52rpx;" :data-index="index" src="/static/image/gb.png"
                  mode="widthFix" @tap="deleteImg" v-if="disa==false"></image>
              </view>
            </view>
          </view>
        </view>

      </view>
      <view class="sendForm" @click="getsubmit()" v-if="disa==false">提交审核</view>
    </view>
  </view>
</template>

<script>
  // pages/opinion/opinion.js
  var http = require("../../utils/http.js");
  var soket = require("../../utils/soket.js");
  import {
    pathToBase64,
    base64ToPath
  } from '../../components/image-tools/index.js'
  export default {
    data() {
      return {
        pics: [],
        //图片
        items: [{
          name: '紧急联系',
          value: '紧急联系'
        }, {
          name: '一般',
          value: '一般',
          checked: 'true'
        }],
        array: ['渠道1', '渠道2'],
        tel: "",
        name: "",
        remark: "",
        detail: "",
        user: '',
        state: '一般',
        wxtext: '',
        index: '',
        agins: true,
        tips1: "",
        id: "",    //查询信息的id
        subid:'', //提交的id
        channel:"",
        contentheight: "",
        type:'',
        disa:false  //是否可以修改
      };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log(options, 'options');
      this.id = options.id
      this.subid=options.subid
      this.type=options.type
      if(this.type==2|| this.type==3){
        this.disa=true
      }
      this.gettaskDetails()
      this.gettaskDetails1()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    mounted() {
      this.getcontent()
    },
    methods: {

      //计算获取页面数据高度
      getcontent() {
        var that = this
        uni.getSystemInfo({
          success: function(res) { // res - 各种参数
            let obj = uni.createSelectorQuery().select('.content')
            obj.boundingClientRect(function(data) { // data - 各种参数
              console.log('123',data,data.height)
              that.contentheight = data.bottom + 'px'
            }).exec()
          }
        })
      },
      //根据id获取任务详情
      gettaskDetails() {
        const that = this;
        var url = 'api/team/taskDetails';
        let data = {
          id: this.id,
        }
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            res.data.branch = res.data.branch.split(',')
            var avatar=res.data.avatar.charAt(0)
            if(avatar!='h'){
              res.data.avatar=http.rootDocment+res.data.avatar.substr(1)
            }
            that.channel = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      gettaskDetails1() {
        const that = this;
        var url = 'api/team/getTaskUserInfo';
        let data = {
          openid:uni.getStorageSync('openid'),
          id: this.subid
        }
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
              console.log(1231,res.data)
              that.detail=res.data.submit_text
              if (res.data.submit_images != ''&& res.data.submit_images != null) {
                that.pics= res.data.submit_images.split(',');
              }

          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      // 提交任务
      getsubmit() {
        const that = this;
        if (that.detail == '') {
          uni.showToast({
            title: '任务描述不能为空',
            icon: 'none',
            duration: 2000
          });
          return false;
        }

        let url = 'api/team/SubmitAuditTask';
        let date = {
          openid: uni.getStorageSync('openid'),
          id:that.subid,
          submit_text: that.detail,
          submit_images:String(that.pics)
        };
        http.postReq(url, date, function(res) {
          if (res.code == 200) {
            uni.showToast({
              title: '提交成功,请等待审核',
              icon: 'none',
              duration: 2000
            });
            setTimeout(function() {
              uni.navigateBack({
                delta:1
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

      /**
       * 图片上传
       * 
       */
      //上传图片开始
      chooseImg: function(e) {
        var that = this,
          pics = this.pics;
        console.log(pics);
        uni.chooseImage({
          count: 1,
          // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'],
          // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'],
          // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            uni.showLoading({
                title: '上传中···'
            });
            var tempFilePaths = res.tempFilePaths;
            let url = 'api/users/upload';
            pathToBase64(tempFilePaths[0])
              .then(base64 => {
                console.log(base64)
                let url = 'api/users/upload';
                var data={
                  base64
                }
                http.postReq(url, data, function(res) {
                  if (res.code == 200) {
                    pics.push(http.rootDocment + res.data);
                    that.setData({
                      pics: pics
                    });
                    uni.hideLoading()
                  }
                });
              })
              .catch(error => {
                console.error(error)
              })
          }
        });
      },
      // 删除图片
      deleteImg: function(e) {
        var that = this;
        var pics = this.pics;
        var index = e.currentTarget.dataset.index;
        pics.splice(index, 1);
        console.log(pics);
        this.setData({
          pics: pics
        });
      },
      // 预览图片
      previewImg1: function(e) {
        //获取当前图片的下标
        var index = e.currentTarget.dataset.index; //所有图片

        var pics = this.pics;
        uni.previewImage({
          //当前显示图片
          current: pics[index],
          //所有图片
          urls: pics
        });
      }
    }
  };
</script>
<style>
  /* pages/clueSubmit/clueSubmit.wxss */
  .back {
    position: absolute;
    z-index: -1;
  }

  .clueBox {
    width: 690rpx;
    border-radius: 10px;
    padding: 80rpx 40rpx 20rpx 40rpx;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    background: #FFF;
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
    height: 160rpx;
    border-radius: 34rpx;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
  }

  .uploader-img {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30rpx;
  }

  .uploader-list {
    width: 160rpx;
    position: relative;
    /* float:left; */
    margin-left: 14rpx;
  }

  .uploader-list:nth-child(1) {
    margin-left: 0rpx;
  }

  .uploader-list:nth-child(4) {
    margin-left: 0rpx;
  }

  .uploader-list:nth-child(7) {
    margin-left: 0rpx;
  }

  .uploader-list:nth-child(10) {
    margin-left: 0rpx;
  }

  .delete {
    position: absolute;
    right: 0rpx;
  }

  .weui-input {
    background: #f0f2f4;
    height: 84rpx;
    padding-left: 30rpx;
    box-sizing: border-box;
    border-radius: 16rpx;
    margin-top: 20rpx;
  }

  .radio-group {
    margin-top: 30rpx;
  }

  .radio {
    font-size: 32rpx;
    color: #333;
  }

  .radio:nth-child(2) {
    margin-left: 80rpx;
  }

  .text {
    font-size: 28rpx;
    color: #666;
    margin-top: 120rpx;
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

  .myPicker {
    background: #ebebeb;
    margin-top: 30rpx;
    height: 68rpx;
    border-radius: 34rpx;
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    line-height: 60rpx;
    /* color: #333; */
  }

  .input-placeholder {
    color: #333;
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
</style>
