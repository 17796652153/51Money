<template>
<view>
<!--pages/bindingPhone/bindingPhone.wxml-->

<view class="bindingBox">
     <text>姓名</text>
     <view class="bindingBoxInputView">
          <input type="text" placeholder-class="placeholder" placeholder="请输入姓名" :value="name" @input="nameInput">
     </view>
</view>
<view class="bindingBox">
     <text>手机号</text>
     <view class="bindingBoxInputView">
          <input type="text" placeholder-class="placeholder" placeholder="请输入手机号" :value="tel" @input="telInput">
     </view>
</view>
<view class="bindingBox">
     <text>地区：</text>
     <view class="bindingBoxInputView" @tap="showDistpickerFun">
          <view class="input">
               <block>{{province}} {{city}} {{district}}</block>
          </view>
          <input type="text" name="province" :value="province" class="hidden">
          <input type="text" name="city" :value="city" class="hidden">
          <input type="text" name="district" :value="district" class="hidden">
     </view>
</view>
<view class="bindingBox">
     <text>详细地址</text>
     <view class="bindingBoxInputView">
          <input type="text" placeholder-class="placeholder" :value="address" @input="addressInput" placeholder="请输入详细地址">
     </view>
</view>


<image class="myClick" src="/static/image/bc.png" @tap="savePersonInfo"></image>

<view :class="'distpicker ' + (showDistpicker ? '' : 'hidden')">
     <view class="distpicker-btn">
          <view class="distpicker-cancel-btn" @tap="distpickerCancel">取消</view>
          <view class="distpicker-sure-btn" @tap="distpickerSure">确定</view>
     </view>
     <picker-view indicator-style="height: 40px;" class="distpicker-content" :value="value" @change="changeArea">
          <!-- 省 -->
          <picker-view-column>
               <view v-for="(item, index) in provinceName" :key="index" class="area-item">{{item}}</view>
          </picker-view-column>
          <!-- 市 -->
          <picker-view-column>
               <view v-for="(item, index) in cityName" :key="index" class="area-item">{{item}}</view>
          </picker-view-column>
          <!-- 区 -->
          <picker-view-column>
               <view v-for="(item, index) in districtName" :key="index" class="area-item">{{item}}</view>
          </picker-view-column>
     </picker-view>
</view>
<view class="mask" @tap.stop="distpickerCancel" :hidden="!showDistpicker"></view>
<view :class="'message ' + (showMessage ? 'fade-in' : '')" :hidden="!showMessage">{{messageContent}}</view>
</view>
</template>

<script>
var area = require("../../utils/area.js");
const app = getApp();
var p = 0,
    c = 0,
    d = 0;
var http = require("../../utils/http.js");

export default {
  data() {
    return {
      provinceName: [],
      provinceCode: [],
      provinceSelIndex: '',
      cityName: [],
      cityCode: [],
      citySelIndex: '',
      districtName: [],
      districtCode: [],
      districtSelIndex: '',
      showMessage: false,
      messageContent: '',
      showDistpicker: false,
      name: '',
      tel: '',
      address: '',
      id: '',
      province: '',
      city: '',
      district: '',
      value: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    // 载入时要显示再隐藏一下才能显示数据，如果有解决方法可以在issue提一下，不胜感激:-)
    // 初始化数据
    var that = this;
    this.setData({
      id: options.id
    });
    this.setAreaData();
    this.getdata();
  },
  methods: {
    getdata() {
      var that = this;
      var url = 'api/users/addressFind';
      var data = {
        address_id: that.id
      };
      http.postReq(url, data, function (res) {
        if (res.code == 200) {
          that.setData({
            province: res.data.address_province,
            city: res.data.address_city,
            district: res.data.address_area,
            name: res.data.address_name,
            tel: res.data.address_phone,
            address: res.data.address_details
          });
          console.log(that.province);
        }
      });
    },

    setAreaData: function (p, c, d) {
      var p = p || 0; // provinceSelIndex

      var c = c || 0; // citySelIndex

      var d = d || 0; // districtSelIndex
      // 设置省的数据

      var province = area['100000'];
      var provinceName = [];
      var provinceCode = [];

      for (var item in province) {
        provinceName.push(province[item]);
        provinceCode.push(item);
      }

      this.setData({
        provinceName: provinceName,
        provinceCode: provinceCode
      }); // 设置市的数据

      var city = area[provinceCode[p]];
      var cityName = [];
      var cityCode = [];

      for (var item in city) {
        cityName.push(city[item]);
        cityCode.push(item);
      }

      this.setData({
        cityName: cityName,
        cityCode: cityCode
      }); // 设置区的数据

      var district = area[cityCode[c]];
      var districtName = [];
      var districtCode = [];

      for (var item in district) {
        districtName.push(district[item]);
        districtCode.push(item);
      }

      this.setData({
        districtName: districtName,
        districtCode: districtCode
      });
    },
    changeArea: function (e) {
      p = e.detail.value[0];
      c = e.detail.value[1];
      d = e.detail.value[2];
      this.setAreaData(p, c, d);
    },
    showDistpickerFun: function () {
      this.setData({
        showDistpicker: true
      });
    },
    distpickerCancel: function () {
      var province = this.provinceName[this.provinceSelIndex];
      var city = this.cityName[this.citySelIndex];
      var district = this.districtName[this.districtSelIndex];
      this.setData({
        showDistpicker: false,
        province: province,
        city: city,
        district: district
      });
    },
    distpickerSure: function () {
      this.setData({
        provinceSelIndex: p,
        citySelIndex: c,
        districtSelIndex: d
      });
      this.distpickerCancel();
    },
    // getsubmit
    //获取用户输入的用户名
    nameInput: function (e) {
      this.setData({
        name: e.detail.value
      });
    },
    //获取用户输入的用户名
    telInput: function (e) {
      this.setData({
        tel: e.detail.value
      });
    },
    //获取用户输入的用户名
    addressInput: function (e) {
      this.setData({
        address: e.detail.value
      });
    },
    savePersonInfo: function () {
      var that = this;
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

      if (this.name == '') {
        this.showMessageFun('请输入姓名');
      } else if (!myreg.test(this.tel)) {
        uni.showToast({
          title: '号码不符合规范',
          icon: 'none',
          duration: 2000
        });
        return false;
      } else if (this.province == '') {
        this.showMessageFun('请选择所在地区');
      } else if (this.address == '') {
        this.showMessageFun('请输入详细地址');
      } else {
        // 对接接口
        let url = 'api/users/addressUpdate';
        let date = {
          openid: uni.getStorageSync('openid'),

          /*收货人*/
          address_name: this.name,

          /*手机*/
          address_phone: this.tel,

          /*省*/
          address_province: this.province,

          /*市*/
          address_city: this.city,

          /*区县*/
          address_area: this.district,

          /*地址*/
          address_details: this.address,
          address_id: this.id
        }; //console.log('接口数据',date)

        http.postReq(url, date, function (res) {
          if (res.code == 200) {
            uni.showToast({
              title: '修改成功',
              icon: 'none',
              duration: 2000
            });
            setTimeout(function () {
              uni.navigateBack();
            }, 2000);
          }
        }, err => {
          console.log(err.errMsg);
        }); //   this.showMessage(' 保存成功')
        //   console.log(data)
      }
    },
    showMessageFun: function (text) {
      var that = this;
      that.setData({
        showMessage: true,
        messageContent: text
      });
      setTimeout(function () {
        that.setData({
          showMessage: false,
          messageContent: ''
        });
      }, 3000);
    }
  }
};
</script>
<style>
/* pages/bindingPhone/bindingPhone.wxss */
.bindingBox{
  display:flex;
  /* justify-content: center; */
  width:100%;
  padding:0rpx 4%;
  box-sizing: border-box;
  align-items: center;
}  
.bindingBox2{
   justify-content: space-between;
   margin-top:20rpx;
}
.bindingBox text{
    font-size:32rpx;
    color:#333;
    display: inline-block;
    width:27%;
    text-align:left;
}
.avatar{
   width:72rpx;
   height:72rpx;
   border-radius:50%;
}
.bindingBox .bindingBoxInputView{
   width:69%;
   border-bottom:1rpx solid #e5e5e5;
}
.bindingBox input{
   height:112rpx;
   color:#333;
}
/* .bindingBoxInputView .input{
   height:112rpx;
   color:#333;
}   */
.sendPhone{
  display: inline-block;
  width:180rpx;
  height:48rpx;
  background:#00DFD7;
  color:#FFF;
  font-size:24rpx;
  text-align: center;
  line-height:48rpx;
  border-radius:24rpx;
}
.hide{
 display:none;
}
.myClick{
    width:400rpx;
    height:100rpx;
    display:block;
    margin:160rpx auto 0rpx;
}


/*省市区*/
 .input {
   box-sizing: border-box;
   width: 100%;
   height: 112rpx;
   line-height: 112rpx;
   background-color: #fff;
   /* padding: 0 15rpx; */
}
.input-placeholder {
   color: #ccc;
}
.btn{
 width: 686rpx !important;
 height: 80rpx;
 background: linear-gradient(270deg,#ffb800 0%, #ffcc48);
 border-radius: 42rpx;
 color: #333333;
 margin-top: 10rpx !important;
}
.button-hover{
 background: #cfcfcf;
 color: #ffffff;
}
.hidden {
  display: none;
  opacity: 0;
}
.message {
   position: fixed;
   top: 80%;
   left: 50%;
   width: 400rpx;
   height: 80rpx;
   margin-left: -200rpx;
   background-color: rgba(0, 0, 0, .75);
   border-radius: 20px;
   text-align: center;
   line-height: 80rpx;
   color: #fff;
   opacity: 0;
}

.fade-in {
   animation: fadeIn .3s forwards;
}

@keyframes fadeIn {
 from {
   opacity: 0;
   -webkit-transform: translate3d(0, 100%, 0);
   transform: translate3d(0, 100%, 0);
 }

 to {
   opacity: 1;
   -webkit-transform: none;
   transform: none;
 }
}

.area-item {
   line-height: 40px;
   text-align: center;
}

.distpicker {
   position: fixed;
   bottom: 0;
   left: 0;
   z-index: 999;
   width: 100%;
   height: 560rpx;
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   background-color: #fff;
}

.distpicker-btn {
   display: flex;
   justify-content: space-between;
   box-sizing: border-box;
   width: 100%;
   padding: 0 40rpx;
   height: 80rpx;
   line-height: 80rpx;
   background-color: #fafafa;
   color: #586C94;
}

.distpicker-content {
   box-sizing: border-box;
   width: 100%;
   height: 560rpx;
   background-color: #fff;
}

.mask {
   position: fixed;
   left: 0;
   top: 0;/*  #ifdef  H5  */
   top:calc(88rpx + constant(safe-area-inset-top));
   top:calc(88rpx + env(safe-area-inset-top));/*  #endif  */
   z-index: 998;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, .4);
}

</style>