<template>
  <view>
    <view style="background-color: #FFFFFF;">
      <view
        style="padding: 40rpx 30rpx 0;  color: #333333;font-size: 32rpx;font-family: PingFang SC, PingFang SC-Regular;">
        兼职要求
      </view>
      <view class="topbox">
        <view class="subbox" v-for="(item,index) in teamType" :key='index' :class="item.select?'subboxtrue':''"
          @click="changesubbox(item.id)">
          {{item.name}}
        </view>
      </view>
    </view>

    <view style="background-color: #FFFFFF;margin-top: 20rpx;">
      <view class="bindingBox">
        <text>任务名称</text>
        <view class="bindingBoxInputView">
          <input type="text" placeholder="请输入任务名称" v-model='name' :disabled="desabled">
        </view>
      </view>
      <view class="bindingBox">
        <text>技能要求</text>
        <view class="bindingBoxInputView">
          <input type="text" placeholder="请输入技能要求" v-model='skill' :disabled="desabled">
        </view>
      </view>
      <view class="bindingBox">
        <text>工作经验</text>
        <view class="bindingBoxInputView">
          <input type="text" placeholder="请输入工作经验要求" v-model='work' :disabled="desabled">
        </view>
      </view>
      <view class="bindingBox" style="border: none;">
        <text>设备要求</text>
        <view class="bindingBoxInputView">
          <input type="text" placeholder="请输入设备要求" v-model='prepare' :disabled="desabled">
        </view>
      </view>
    </view>

    <view style="background-color: #FFFFFF;margin-top: 20rpx;">
      <view class="bindingBox" :style="{border:[centerbox==1?'none':'']}">
        <text>任务单量</text>
        <view class="bindingBoxInputView">
          <input type="text" placeholder="请输入单量" v-model='task' @input="changetask" disabled="true">
        </view>
      </view>
      <view class="bindingBox" v-if='centerbox!=1'>
        <text>任务金额</text>
        <view class="bindingBoxInputView">
          <input type="text" placeholder="请输入任务金额" v-model='count_money' @input="changecount_money" disabled="true">
        </view>
      </view>
      <view class="bindingBox" style="border: none;" v-if='centerbox!=1'>
        <text>总金额</text>
        <view class="bindingBoxInputView">
          <input type="text" placeholder="请输入任务金额" v-model='money' disabled="true">
        </view>
      </view>
    </view>

    <view style="background-color: #FFFFFF;margin-top: 20rpx;">
      <view class="bindingBox" :style="{border:[centerbox==2?'none':'']}">
        <text>发布渠道</text>
        <view class="bindingBoxInputView">
          <input type="text"  v-model='centername' disabled="true" >  
        </view>
<!--        <view class="picker myPicker">
          <view class="flex" style="margin-right: 40rpx;" >
            <icon type="success" color="#00dfd7" style="margin-right: 10rpx;" v-if="centerbox==2"></icon>
            <icon type="circle" style="margin-right: 10rpx;" v-else @click="changecenter(2)"></icon>
            <text @click="changecenter(2)" style="width: 80%;">平台大厅</text>
          </view>
          <view class="flex">
            <icon type="success" color="#00dfd7" style="margin-right: 10rpx;" v-if="centerbox==1"></icon>
            <icon type="circle" style="margin-right: 10rpx;" v-else @click="changecenter(1)"></icon>
            <text @click="changecenter(1)" style="width: 80%;">团队大厅</text>
          </view>
        </view> -->
      </view>
<!--      <view class="bindingBox" style="border: none;" v-if='centerbox!=2&&desabled==false'>
        <text>团队选择</text>
        <picker class="myPicker" @change="bindPickerChange" :value="index" range-key='team_name' :range="array">
          <view class="picker" style="justify-content: space-between;">
            {{array[index].team_name}}
            <image class="xl" src="/static/image/xl.png"></image>
          </view>
        </picker>
      </view> -->
      <view class="bindingBox" style="border: none;" v-if='centerbox!=2'>
        <text>团队</text>
        <view class="bindingBoxInputView">
          <input type="text"  v-model='tname' disabled="true">
        </view>
      </view>
    </view>

    <view style="background-color: #FFFFFF;margin-top: 20rpx;">
      <view class="bindingBox" style="border: none;">
        <text>任务说明</text>
        <view class="bindingBoxInputView">
          <input type="text" placeholder="请输入任务说明" v-model="explain" :disabled="desabled">
        </view>
      </view>
      <!-- 上传图片 -->
      <view class="uploader-img  flex justify-content-start" v-if="pics">
        <view class="upAdd" @tap="chooseImg">
          <image style="width:160rpx;height:160rpx;" src="/static/uploads_image1.png" mode="widthFix"></image>
        </view>
        <view v-for="(item, index) in pics" :key="index" class="uploader-list">
          <image style="width:160rpx;height:160rpx;" :src="item" :data-index="index" mode="scaleToFill"
            @tap="previewImg1"></image>
          <image class="delete" style="width:52rpx;height:52rpx;" :data-index="index" src="/static/image/gb.png"
            mode="widthFix" @tap="deleteImg" v-if="desabled==false"></image>
        </view>
      </view>
    </view>

    <view class="deal">
      <icon type="success" color="#00dfd7" style="margin-right: 10rpx;" @click="changedealshow" v-if="dealshow"></icon>
      <icon type="circle" style="margin-right: 10rpx;" @click="changedealshow" v-else="dealshow==false"></icon>
      <view @click="changedealshow">我已认真阅读并同意遵守<text style="color:#00DFD7" @click.stop="getdeal">《发布协议》</text>全部规则
      </view>
    </view>

    <view class="sendForm" @click="getsubmit" v-if="desabled==false">修改发布</view>
  </view>
</template>

<script>
  // pages/bindingPhone/bindingPhone.js
  var http = require("../../utils/http.js");
  import {
    pathToBase64,
    base64ToPath
  } from '../../components/image-tools/index.js'
  export default {
    data() {
      return {
        centername:'',
        centerbox:2,
        dealshow: false,
        pics: [],
        index: 0,
        array: [1, 2, 3, 4],
        subboxlist: [],
        teamType: [],
        name: '', //名字 
        skill: '', //技能 
        work: '', //工作经验 
        prepare: '', //设备要求 
        task: '', //任务单量 
        count_money: '', //单个金额 
        money: '', //总金额 
        explain: '', //任务说明
        tname: '', //团队名字
        id: '' ,//团队id
        type:'',
        desabled:false
        
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log(options)
      this.id=options.id
      this.type=options.type
      if(options.type<=3){
        console.log(1231)
        this.desabled=true
      }
      this.getsubbox()
      this.getmyteam()
      
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    methods: {
      //获取发布的数据
   //根据id获取任务详情
      gettaskDetails() {
        const that = this;
        var url = 'api/team/taskDetails';
        let data = {
          id: this.id
        }
        http.postReq(url, data, function(res) {
          console.log(res)
          if (res.code == 200) {
            res.data.branch = res.data.branch.split(',')
            var avatar=res.data.avatar.charAt(0)
            console.log('21',avatar)
            if(avatar!='h'){
              res.data.avatar=http.rootDocment+res.data.avatar.substr(1)
            }
            that.teamType.forEach(el => {
              res.data.branch.forEach(e => {
                if (el.name == e) {
                  el.select = !el.select
                }
              })
            })
            if(res.data.image!=''){
              res.data.image = res.data.image.split(',')
               that.pics=res.data.image
            }
            
            that.name=res.data.name //名字
            that.skill=res.data.skill //技能 
            that.work=res.data.work//工作经验 
            that.prepare=res.data.prepare//设备要求 
            that.task=res.data.task //任务单量 
            that.count_money=res.data.count_money //单个金额 
            that.money=res.data.money //总金额 
            that.explain=res.data.explain //任务说明
            that.tname=res.data.team_name //团队名字
            that.centerbox=res.data.is
            that.dealshow=true
            if(that.centerbox==2){
              that.centername='平台大厅'
            }else{
              that.centername='团队大厅'
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
      changetask(e){
        if(this.count_money!=''){
          this.money=(Number(this.count_money)*Number(this.task)).toFixed(2)
        }
      },
      changecount_money(e){
        if(this.task!=''){
          this.money=(Number(this.count_money)*Number(this.task)).toFixed(2)
        }
      },
      changecenter(e){
        this.centerbox=e
      },
      //获取我的团队
      getmyteam(){
        var that=this
        var url = 'api/team/joinYourTeam';
          var data = {
            openid: uni.getStorageSync('openid')
          };
          http.postReq(url, data, function(res) {
            console.log(res);
            if (res.code == 200) {
              that.array=res.data
            } else {
              uni.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000
              });
            }
          });
      },
      //获取兼职要求
      getsubbox() {
        const that = this
        var url = 'api/team/teamType';
        http.postReq(url, '', function(res) {
          console.log('兼职要求', res)
          if (res.code == 200) {
            res.data.forEach(el => {
              el.select = false
            })
            that.teamType = res.data
            that.gettaskDetails()
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      // 查看协议
      getdeal() {
        console.log(1)
      },
      changedealshow() {
        this.dealshow = !this.dealshow
      },
      // 选择兼职要求
      changesubbox(e) {
        this.teamType.forEach(el => {
          if (el.id == e) {
            el.select = !el.select
          }
        })
      },
      bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
          index: e.detail.value
        });
      },
      
      // 发布任务
      getsubmit(){
        const that=this
        if(!that.dealshow){
          uni.showToast({
            title: '请同意发布协议准则',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        let url='api/team/TasksIssued',
            branch=[],
            branch_id=[]
        this.teamType.forEach(el => {
          if (el.select) {
            branch.push(el.name)
            branch_id.push(el.id)
          }
        })
        console.log(that.centerbox)
        if(branch.length==0){
          uni.showToast({
            title: '请选择兼职要求',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        let data = {}
        if (that.centerbox == 1) {
          data = {
            id:that.id,
            name: that.name,
            skill: that.skill,
            work: that.work,
            prepare: that.prepare,
            task: that.task,
            money: that.money || 0,
            count_money: that.count_money || 0,
            team_name: that.array[that.index].team_name,
            team_id: that.array[that.index].id,
            explain: that.explain,
            image: that.pics,
            openid: uni.getStorageSync('openid'),
            branch: String(branch),
            branch_id: String(branch_id),
            is: that.centerbox
          }
        } else {
          data = {
            id:that.id,
            name: that.name,
            skill: that.skill,
            work: that.work,
            prepare: that.prepare,
            task: that.task,
            money: that.money,
            count_money: that.count_money,
            // team_name: '',
            // team_id: '',
            explain: that.explain,
            image: that.pics,
            openid: uni.getStorageSync('openid'),
            branch: String(branch),
            branch_id: String(branch_id),
            is: that.centerbox
          }
        }
        // let data={
        //   id:that.id,
        //   name:that.name,
        //   skill:that.skill,
        //   work:that.work,
        //   prepare:that.prepare,
        //   task:that.task,
        //   money:that.money,
        //   count_money:that.count_money,
        //   team_name:that.array[that.index].team_name,
        //   team_id:that.array[that.index].id,
        //   explain:that.explain,
        //   image:that.pics,
        //   openid:uni.getStorageSync('openid'),
        //   branch:String(branch),
        //   branch_id:String(branch_id),
        //   is:that.centerbox
        // }
        http.postReq(url, data, function(res) {
          console.log('发布完成', res)
          if (res.code == 200) {
            uni.showToast({
              title: '修改成功,等待审核',
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
          sizeType: ['compressed'],
          // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'],
          // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;

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
  page {
    background-color: #f4f6ed;
  }

  .bindingBox {
    display: flex;
    justify-content: center;
    width: calc(100% - 60rpx);
    border-bottom: 1rpx solid #e5e5e5;
    margin: 0 30rpx;
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
  }

  .bindingBox input {
    height: 130rpx;
  }

  .topbox {
    margin: 0 30rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 20rpx;
  }

  .subbox {
    margin: 20rpx 0;
    width: 142rpx;
    height: 44rpx;
    opacity: 1;
    background: #e0fffe;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #999;
    line-height: 44rpx;
    text-align: center;
  }

  .subboxtrue {
    background: #00dfd7;
    color: #ffffff
  }

  .myPicker {
    width: 69%;
  }

  .xl {
    width: 32rpx;
    height: 30rpx;
  }

  .picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 130rpx;
  }

  .picker .flex {
    display: flex;
    align-items: center;
  }

  /* 上传图片 */
  .uploader-img {
    display: flex;
    flex-wrap: wrap;
    /* margin-top: 30rpx; */
    margin: 0 30rpx;
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

  .deal {
    display: flex;
    margin: 30rpx;
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
