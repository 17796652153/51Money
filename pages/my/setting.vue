<template>
  <view>
    <view class="linebox" @click="navto">
      <text>账户与安全</text>
      <image src="/static/image/arrow-right.png" class="arrow"></image>
    </view>
    <view class="linebox" @click="clearStorage">
      <text>清空缓存</text>
      <view style="display: flex;align-items: center;">
        <text>{{storageSize}}</text>
        <image src="/static/image/arrow-right.png" class="arrow"></image>
      </view>
    </view>
    <view class="linebox" @click="getto(1)">
      <text>用户协议</text>
      <!-- <image src="/static/image/arrow-right.png" class="arrow"></image> -->
    </view>
    <view class="linebox" @click="getto(2)">
      <text>隐私政策</text>
      <!-- <image src="/static/image/arrow-right.png" class="arrow"></image> -->
    </view>
    <view class="linebox" @click="getlogin">
      <text>退出登陆</text>
      <!-- <image src="/static/image/arrow-right.png" class="arrow"></image> -->
    </view>
    <view class="linebox" @click="logoutcard">
      <text>注销账户</text>
      <!-- <image src="/static/image/arrow-right.png" class="arrow"></image> -->
    </view>
  </view>
</template>

<script>
  var http = require("../../utils/http.js");
  export default {
    data() {
      return {
        storageSize: '',
        id:'',
      }
    },
    onLoad(options) {
      this.id=options.id
      this.getStorageSize();
    },
    methods: {
      getto(n) {
        var url = ''
        if (n == 1) {
          // url = "/pages/login/loginreg"
          url = "/pages/login/loginweb?id="+n
        } else {
          // url = "/pages/login/loginyinsi"
          url = "/pages/login/loginweb?id="+n
        }
        uni.navigateTo({
          url: url
        })
      },
      logoutcard(){
          let that = this;
          uni.showModal({
            title: '警告',
            content: '您账号绑定的手机号,金钱等信息都将被清空无法恢复,确定清除注销账户么。',
            success(res) {
              if (res.confirm) {
                  // 执行清空接口
                  that.logouthttp()
              }
            }
          })
      },
      logouthttp(){
        var url = 'api/users/delUser';
        var data = {
          id: this.id
        };
        http.postReq(url, data, function (res) {
          if (res.code == 200) {
            uni.showToast({
              title: '注销成功',
              icon: 'none',
              duration: 2000
            });
            setTimeout(()=>{
              uni.reLaunch({
                url:'/pages/login/login'
              })
            },2000)
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      getlogin(){
        uni.clearStorage();
        uni.reLaunch({
          url:'/pages/login/login'
        })
      },
      getStorageSize: function() {
        let that = this;
        uni.getStorageInfo({
          success(res) {
            //console.log(res.keys);
            //console.log(res.limitSize);
            let size = res.currentSize;
            if (size < 1024) {
              that.storageSize = size + ' B';
            } else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
              that.storageSize = Math.floor(size / 1024 * 100) / 100 + ' KB';
            } else if (size / 1024 / 1024 >= 1) {
              that.storageSize = Math.floor(size / 1024 / 1024 * 100) / 100 + ' M';
            }
          }
        })
      },
      clearStorage: function() {
        let that = this;
        uni.showModal({
          title: '提示',
          content: '确定清除缓存吗?',
          confirmText: '立即清除',
          success(res) {
            if (res.confirm) {
              uni.clearStorageSync();
              //重新获取并显示清除后的缓存大小
              that.getStorageSize();
              uni.showToast({
                title: '清除成功',
                icon:'none',
                duration:2000
              })
              setTimeout(()=>{
                uni.reLaunch({
                  url:'/pages/login/login'
                })
              },2000)

            }
          }
        })
      },
      navto() {
        uni.navigateTo({
          url: './safety'
        })
      }
    }
  }
</script>

<style>
  page {
    background-color: #f4f6ed;
  }

  .linebox {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx;
  }

  .arrow {
    width: 25rpx;
    height: 40rpx;
  }
</style>
