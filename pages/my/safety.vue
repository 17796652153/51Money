<template>
  <view>
    <view class="linebox" @click="navto(1)">
      <text>更换手机号</text>
      <view style="display: flex;align-items: center;">
        <!-- <text>1231231231231</text> -->
        <image src="/static/image/arrow-right.png" class="arrow"></image>
      </view>
    </view>
    <view class="linebox" @click="navto(2)">
      <text>更换密码</text>
      <view style="display: flex;align-items: center;">
        <!-- <text>1231231231231</text> -->
        <image src="/static/image/arrow-right.png" class="arrow"></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      navto(e){
        var url=''
        if(e==1){
          url='/pages/bindingPhone/bindingPhone'
        }else {
          url='/pages/bindingPhone/bindingword'
        }
        uni.navigateTo({
          url
        })
      }
    }
  }
</script>

<style>
  page{
     background-color: #f4f6ed;
  }
  .linebox{
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx;
    
  }
  .arrow{
    width: 25rpx;
    height: 40rpx;
    margin-left: 10rpx;
  }
</style>
