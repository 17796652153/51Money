<template>
  <view>
    <view v-if="teamplay==false" style="margin-bottom: 150rpx;">
      <view class="topbg">
        <view style="display: flex;justify-content: space-between;align-items: center;">
          <view class="page-section page-section-spacing swiper noticeBox2" style="width:690rpx">
            <view class="noticeBox2View">
              <image src="/static/image/laba.png"></image>
            </view>
            <view class="noticeBox2bottom">
              <swiper autoplay="true" interval="2000" duration="500" circular="true" vertical="true"
                style="height:68rpx;line-height:68rpx">
                <block v-for="(item, index) in background1" :key="index">
                  <swiper-item>
                    <view class="swiper-item ">最新动态：{{item.username}} {{item.carry_add_time}} 提现{{item.carry_money}}元
                    </view>
                  </swiper-item>
                </block>
              </swiper>
            </view>
          </view>
          <!-- <image src="/static/scan.png" class="scan" mode="scaleToFill" @click="scanQr"></image> -->
        </view>

        <view class="page-section page-section-spacing swiper noticeBox">
          <image :src="background2.image" mode="scaleToFill" style="width:100%;height:256rpx;border-radius: 20rpx;"
            :data-index="background2" @tap="getdetail"></image>
        </view>

        <view class="page-section page-section-spacing swiper noticeBox2" style="width:690rpx">
          <view class="noticeBox2View">
            <image src="/static/shield.png"></image>
          </view>
          <view class="noticeBox2bottom" style="color: #41B6FB;">
            <swiper style="height:68rpx;line-height:68rpx">
              <block v-for="(item, index) in background1" :key="index">
                <swiper-item>
                  <view class="swiper-item ">团队任务丨安全可靠丨奖励多多</view>
                </swiper-item>
              </block>
            </swiper>
          </view>
        </view>
      </view>
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

      <image src="/static/image/creatteam.png" mode="aspectFit" style="width: 100rpx;
        height: 100rpx;vertical-align: top;position: fixed;right: 30rpx;bottom:80rpx" @click="getnewteam"></image>
    </view>
    <view v-if='teamplay' style="margin-bottom: 100rpx;">
      <view class="topbg" style="height: 288rpx;box-sizing: border-box;padding-top: 60rpx;">
<!--       <view class="page-section page-section-spacing swiper noticeBox2" style="width:690rpx">
          <view class="noticeBox2View">
            <image src="/static/image/laba.png"></image>
          </view>
          <view class="noticeBox2bottom">
            <swiper autoplay="true" interval="2000" duration="500" circular="true" vertical="true"
              style="height:68rpx;line-height:68rpx">
              <block v-for="(item, index) in background1" :key="index">
                <swiper-item>
                  <view class="swiper-item ">最新动态：{{item.username}} {{item.carry_add_time}} 提现{{item.carry_money}}元
                  </view>
                </swiper-item>
              </block>
            </swiper>
          </view>
        </view> -->
        <view class="page-section page-section-spacing swiper noticeBox2" style="width:690rpx;">
          <view class="noticeBox2View">
            <image src="/static/shield.png"></image>
          </view>
          <view class="noticeBox2bottom" style="color: #41B6FB;">
            <swiper style="height:68rpx;line-height:68rpx">
              <block v-for="(item, index) in background1" :key="index">
                <swiper-item>
                  <view class="swiper-item ">公司任务丨长期有效</view>
                </swiper-item>
              </block>
            </swiper>
          </view>
        </view>
      </view>
      <view class="checkM" style="position: relative;top: -40rpx;left:30rpx">
        <view class="checkbox">
          <view style="margin: 30rpx 0 20rpx;">{{Volume.rate}}%</view>
          <view>完成率</view>
        </view>
        <view class="checkbox">
          <view style="margin: 30rpx 0 20rpx;">{{Volume.needCount}}</view>
          <view>需完成(条)</view>
        </view>
        <view class="checkbox">
          <view style="margin: 30rpx 0 20rpx;">{{Volume.stay}}</view>
          <view>待完成(条)</view>
        </view>
        <view class="checkbox">
          <view style="margin: 30rpx 0 20rpx;">{{Volume.completeCount}}</view>
          <view>已完成(条)</view>
        </view>
      </view>

      <view class="missonbgbox" style="position: relative;margin-left:30rpx">
        <view class="subtitle">
          团队目标
        </view>
        <view class="subboxs" v-if="teamGoal.length>0">
          <view class="subbox1">
            <text style="width: 350rpx;">日满足合格任务{{teamGoal[0].value}}条</text>
            <view style="margin-right: 60rpx;">奖励金额<text
                style="margin-left: 15rpx;color: #FF0000;">{{teamGoal[1].value}}元</text></view>

            <icon type="success" v-if="teamGoalresult.day==1" color="#00dfd7"></icon>
            <icon type="circle" v-else></icon>
          </view>
          <view class="subbox1">
            <text style="width: 350rpx;">周满足合格任务{{teamGoal[2].value}}条</text>
            <view style="margin-right: 60rpx;">奖励金额<text
                style="margin-left: 15rpx;color: #FF0000;">{{teamGoal[3].value}}元</text></view>
            <icon type="success" v-if="teamGoalresult.week==1" color="#00dfd7"></icon>
            <icon type="circle" v-else></icon>
          </view>
          <view class="subbox1">
            <text style="width: 350rpx;">年满足合格任务{{teamGoal[4].value}}条</text>
            <view style="margin-right: 60rpx;">奖励金额<text
                style="margin-left: 15rpx;color: #FF0000;">{{teamGoal[5].value}}元</text></view>
            <icon type="success" v-if="teamGoalresult.week==1" color="#00dfd7"></icon>
            <icon type="circle" v-else></icon>
          </view>
        </view>

        <!-- er1 -->
        <view class="subtitle" style="margin-top: 40rpx;">
          团队协作任务
        </view>
        <view class="subboxs" style="padding: 0;">
          <view v-for="(item, index) in halltask" :key="index" class="shoplist">
            <view class="missonbg">
              <view class="mBgTop">
                <text>{{item.name}}</text>
                <view class="TopMoney" v-if="item.count_money!=0">{{item.count_money}}元/<text style="font-size: 26rpx">条</text></view>
              </view>
              <view class="mBgmiddele">
                <view class="mbgmbox" v-for="(n,i) in item.branch" :key='i'>
                  {{n}}
                </view>
              </view>
              <view class="mBgbottom">
                <image :src="item.avatar" mode="scaleToFill" style="width: 48rpx;
              height: 48rpx;vertical-align: top;margin-right: 10rpx;border-radius: 50%;"></image>
                <text>{{item.username}}·发布者</text>
              </view>
              <view class="btnpos" @click="getTeamdetaill(item.id)">前往完成</view>
            </view>
          </view>
        </view>

        <!-- 排行榜 -->
        <view class="rankinglist" style="margin-top: 40rpx;">
          <view style="display: flex;">
            <view class="subtitle1" style="border-top-left-radius:30rpx" @click="changerank(0)"
              :class="[rankindex==0?'subtitleclolor':'']">
              奖励排行榜
            </view>
            <view class="subtitle1" style="border-top-right-radius:30rpx;" @click="changerank(1)"
              :class="[rankindex==1?'subtitleclolor':'']">
              完成率排行榜
            </view>
          </view>
          <view style="display: flex;">
            <view class="subtitle22" @click="changecheckMindex(index)" v-for="(item,index) in checkMt" :key='index'
              :class="checkMindex==index?'subtitletrue':''">
              {{item}}
              <view class="navBtm" v-show="checkMindex==index"></view>
            </view>
          </view>

          <view class="subboxs">
            <view class="subbox1" v-for="(n,index) in ranklist" :key="index" style="justify-content: space-between;">
              <view class="rankleft">
                <image class="rankcrown" src="/static/crown1.png" mode="aspectFit" v-if="index==0"></image>
                <image class="rankcrown" src="/static/crown2.png" mode="aspectFit" v-if="index==1"></image>
                <image class="rankcrown" src="/static/crown3.png" mode="aspectFit" v-if="index==2"></image>
                <view class="rankcrown" v-if="index>2">{{index+1}}</view>
                <image style="width: 52rpx;height: 52rpx;margin:0  20rpx;border-radius: 50%;" :src="n.avatar"
                  mode="aspectFit">
                </image>
                <text>{{n.username}}</text>
              </view>
              <view v-if="rankindex==0">奖金<text style="margin-left: 15rpx;color: #FF0000;">{{n.money}}元</text></view>
              <view v-if="rankindex==1">完成率<text style="margin-left: 15rpx;color: #FF0000;">{{n.rate}}%</text></view>
            </view>
            <view style="text-align: center;color: #999;">查看更多排名</view>
          </view>

        </view>
      </view>
      <view class="fixedrelease">
        <view class="mb20">
          <image src="/static/image/changeteam.png" mode="aspectFit" style="width: 100rpx;
           height: 100rpx;vertical-align: top;" @click="getnavto(0)"></image>
        </view>
        <view class="mb20" v-if="istrue==false&&joinTeam.length<2">
          <image src="/static/image/jointeam.png" mode="aspectFit" style="width: 100rpx;
        height: 100rpx;vertical-align: top;" @click="getnavto(1)"></image>
        </view>
        <view class="mb20" v-if="istrue&&joinTeam.length<2">
          <image src="/static/image/creatteam.png" mode="aspectFit" style="width: 100rpx;
        height: 100rpx;vertical-align: top;" @click="getnavto(2)"></image>
        </view>
        <view>
          <image src="/static/image/creatrelease.png" mode="aspectFit" style="width: 100rpx;
          height: 100rpx;vertical-align: top;" @click="getnavto(3)"></image>
        </view>


      </view>
    </view>
  </view>

</template>

<script>
  const http = require("../../utils/http.js");
  const app = getApp();
  const time = require("../../utils/time.js");
  var soket = require("../../utils/soket.js");

  export default {
    data() {
      return {
        rankindex: 0, //排行榜
        checkMindex: 0,

        background: [],
        background1: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500,
        openid: '',
        checkMt: ['周榜', '月榜', '年榜'],
        listbox: [],
        listbox1: ['/pages/statistical/statistical', '/pages/teambox/teamlist', '/pages/teambox/newteam',
          '/pages/teambox/release'
        ],
        clue: "",
        stick: "",
        writing: "",
        selling: "",
        teamplay: false,
        team: '', //团队数据
        ranklist: '',
        teamGoal: [], //团队目标
        Volume: '', //团队任务完成最上面
        halltask: '', //团队协作任务
        teamid: "",
        teamGoalresult: '', //完成度
        istrue: false, //判断打开的是自己团队还是加入团队   false 自己
        changeteam: false, //切换团队
        joinTeam: '',
        background2: '',
      };
    },

    components: {},
    props: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(e) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      app.globalData.banned();
      this.setData({
        openid: uni.getStorageSync('openid')
      });
      this.getbannr();
      this.getbannr1();
      this.getteam();
      this.jointeam()
      // teamplay
      this.getbackground2()
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    methods: {
      getbackground2() {
        const that = this;
        var url = 'api/users/noticeInfo';
        var data = {
          type: 'team'
        }
        http.postReq(url, data, function(res) {
          if (res.code == 200) {
            console.log('轮播123', res.data);

            res.data.image = http.rootDocment + res.data.image;

            that.setData({
              background2: res.data
            });
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
      //团队协作任务
      hallTeamTask() {
        const that = this
        var url = 'api/team/hallTeamTask';
        let data = {
          team_id: that.team.id,
          openid: uni.getStorageSync('openid')
        }
        http.postReq(url, data, function(res) {
          console.log('团队协作任务', res)
          if (res.code == 200) {
            res.data.forEach(el => {
              var avatar=el.avatar.charAt(0)
              // console.log('21',avatar)
              if(avatar!='h'){
                 el.avatar = http.rootDocment + el.avatar.substr(1)
              }
              el.branch = el.branch.split(',')
            })
            that.halltask = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      //团队任务比例 最上面
      TeamTask() {
        const that = this
        var url = 'api/team/TeamTaskVolume';
        let data = {
          team_id: that.team.id
        }
        http.postReq(url, data, function(res) {
          console.log('团队任务', res)
          if (res.code == 200) {
            that.Volume = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      //团队目标
      teamGoals() {
        const that = this
        var url = 'api/team/teamGoals';
        var data = {
          team_id: that.team.id
        }
        http.postReq(url, data, function(res) {
          console.log('团队目标', res)
          if (res.code == 200) {
            that.teamGoal = res.data
            that.teamGoalresult = res.result
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      //获取榜单的年月日
      Ranking() {
        const that = this
        var url = '';
        if (this.rankindex == 0) {
          url = 'api/team/rewardRanking2'
        } else {
          url = 'api/team/rewardRanking'
        }
        console.log('id', this.team.id)
        let data = {
          type: Number(this.checkMindex) + 1,
          team_id: this.team.id
        }
        http.postReq(url, data, function(res) {
          console.log('排行榜', res)
          if (res.code == 200) {
            res.data.forEach(el => {
              var avatar = el.avatar.charAt(0)
              if (avatar != 'h') {
                el.avatar = http.rootDocment + el.avatar.substr(1)
              }
            })
            that.ranklist = res.data
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        });
      },
      changerank(e) {
        this.rankindex = e
        this.checkMindex = 0
        this.Ranking()
      },
      //切换年月日
      changecheckMindex(e) {
        this.checkMindex = e
        this.Ranking()
      },
      // 复制id
      getcopy(id) {
        uni.setClipboardData({
          data: id,
          success: function() {
            console.log('success');
          }
        });
      },
      //跳转
      getnewteam() {
        uni.navigateTo({
          url: './newteam'
        })
      },
      getTeamdetaill(id) {
        uni.navigateTo({
          url: '/pages/teambox/Teamdetail?id=' + id
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
      //获取自己有团队么，有的话直接到详情
      // 我加入的团队
      async jointeam() {
        const that = this;
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
        // if(that.changeteam==false){
        //   if (res1.data.data != '' && res1.data.data != null) {
        //     console.log(231)
        //     that.teamplay = true
        //     that.istrue=false
        //     that.team = res1.data.data
        //     this.Ranking()
        //     this.TeamTask()
        //     this.hallTeamTask()
        //     this.teamGoals()
        //     return;
        //   }
        // }
        var url = 'api/team/joinYourTeam';
        var data = {
          openid: uni.getStorageSync('openid')
        };
        http.postReq(url, data, function(res) {
          console.log('团队res', res);
          if (res.code == 200) {
            if (res.data.length > 0) {
              that.joinTeam = res.data
              console.log('团队',res1.data.data)
              res.data.forEach(element => {
                if (res1.data.data == null) {
                  that.teamplay = true //为null代表自己没有团队看是否有加入团队，有的话展示没得话这个页面就进不来吧
                  that.team = element
                  that.istrue = true
                } else if (that.changeteam & element.id != res1.data.data.id) {
                  that.teamplay = true //为null代表自己没有团队看是否有加入团队，有的话展示没得话这个页面就进不来吧
                  that.team = element
                  that.istrue = true
                } else if (element.id == res1.data.data.id && that.changeteam == false) {
                  that.teamplay = true
                  that.team = element
                  that.istrue = false
                }
              })

              that.Ranking()
              that.TeamTask()
              that.hallTeamTask()
              that.teamGoals()
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
      // swiper
      getbannr() {
        const that = this;
        var url = 'api/users/noticeList';
        http.postReq(url, '', function(res) {
          if (res.code == 200) {
            console.log('轮播', res.data);

            for (var i = 0; i < res.data.length; i++) {
              res.data[i].image = http.rootDocment + res.data[i].image;
            }

            that.setData({
              background: res.data
            });
          }
        });
      },

      getbannr1() {
        const that = this;
        var url = 'api/users/presentNotice';
        http.postReq(url, '', function(res) {
          if (res.code == 200) {
            console.log('1', res.data);

            for (var i = 0; i < res.data.length; i++) {
              res.data[i].carry_add_time = time.formatTimeTwo(res.data[i].carry_add_time, 'M-D');
            }

            that.setData({
              background1: res.data
            });
          }
        });
      },


      getnavto(e) {
        let that = this;
        console.log("data-index值：", e);
        console.log("data-index值：", that.listbox1[e]);
        let list = that.listbox1[e];
        if (e == 3) {
          list = that.listbox1[e] + '?id=' + that.team.id + '&tname=' + that.team.team_name
        }
        console.log(list);
        if (e == 0) {
          uni.showModal({
            content: '是否要切换团队',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                that.changeteam = !that.changeteam
                that.jointeam()
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
        } else {
          uni.navigateTo({
            url: list
          });
        }
      },

      getnavto1() {
        uni.navigateTo({
          url: '/pages/statistical/statistical'
        });
      },

      getdetail(e) {
        console.log("data-index值：", e.currentTarget.dataset.index.content);
        var id = e.currentTarget.dataset.index.id;
        uni.navigateTo({
          url: '/pages/bannerdetail/bannerdetail?id=' + id
        });
      },


    }
  };
</script>
<style>
  page {
    background-color: #f4f6ed;
  }

  /* 精选任务 */
  .mission .title {
    font-size: 36rpx;
    color: #333;
    display: flex;
    align-items: center;
  }

  .checkM {
    box-sizing: border-box;
    margin: 20rpx 0;
    width: 750rpx;
    height: 148rpx;
    opacity: 1;
    background: #ffffff;
    padding: 0 30rpx;
  }

  .subtitle {
    color: #999;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    margin-right: 40rpx;
    margin-top: 28rpx;
  }


  .navBtm {
    width: 20rpx;
    height: 8rpx;
    opacity: 1;
    background: #00dfd7;
    border-radius: 4rpx;
    margin: 0 auto;
  }

  .subbox {
    width: 88rpx;
    height: 40rpx;
    opacity: 1;
    background: #f0f0f0;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #999;
    line-height: 40rpx;
    text-align: center;
    margin-right: 20rpx;
  }

  .subboxtrue {
    background: #bffffd;
    color: #333
  }

  /* 杂乱盒子 */
  .content {
    margin: 0 30rpx;
  }

  .rumbleBox {
    width: 690rpx;
    height: 364rpx;
    opacity: 1;
    background: #ffffff;
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .rumble {
    width: 25%;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #333;
    text-align: center;
  }

  .rumble image {
    width: 72rpx;
    height: 72rpx;
    margin-bottom: 12rpx;
    vertical-align: middle;
  }

  .scan {
    width: 60rpx;
    height: 60rpx;
    margin-right: 30rpx;
  }

  .topbg {
    width: 750rpx;
    height: 528rpx;
    opacity: 1;
    background: #00dfd7;
    border-radius: 0rpx 0rpx 40rpx 40rpx;
  }

  .noticeBox {
    width: 690rpx;
    margin: 20rpx auto;
    border-radius: 20rpx;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.15);
    font-size: 28rpx;
    color: #333;
    box-sizing: border-box;
  }

  .noticeBox2 {
    height: 68rpx;
    background: #fff;
    border-radius: 34rpx;
    font-size: 24rpx;
    color: #00dfd7;
    display: flex;
    width: 610rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    align-items: center;
    margin-left: 30rpx;
  }

  .noticeBox2bottom {
    width: 90%;
    overflow: hidden;
    padding-left: 20rpx;
  }

  .noticeBox2View {
    display: flex;
    align-items: center;
  }

  .noticeBox2View image {
    width: 48rpx;
    height: 48rpx;
  }

  .indexViewBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 92%;
    margin: 30rpx auto 0rpx;
    border-radius: 20px;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.08);
    padding: 42rpx 40rpx;
    box-sizing: border-box;
  }

  .indexViewBox:last-child {
    margin: 30rpx auto 20rpx;
  }

  .indexViewBoxView1 {
    display: flex;
    align-items: center;
  }

  .indexViewBoxImage1 {
    width: 76rpx;
    height: 76rpx;
  }

  .indexViewBoxImage2 {
    width: 40rpx;
    height: 40rpx;
  }

  .indexViewBoxView1 text {
    margin-left: 20rpx;
  }

  .buttonmoney {
    background: linear-gradient(291deg, #ff3e32 0%, #fb822a);
    border: 4rpx solid linear-gradient(291deg, #ff3e32 0%, #fb822a);
    height: 56rpx;
    border-radius: 50rpx;
    color: #FFF;
    padding: 0 10rpx;
    text-align: center;
    line-height: 56rpx;
    margin-right: 20rpx;
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

  /* true */

  .fixedrelease {
    position: fixed;
    right: 30rpx;
    bottom: 80px;
    .mb20 {
      margin-bottom: 20rpx;
    }
  }

  /* 精选任务 */
  .mission .title {
    font-size: 36rpx;
    color: #333;
    display: flex;
    align-items: center;
  }

  .checkM {
    box-sizing: border-box;
    width: 690rpx;
    height: 148rpx;
    opacity: 1;
    background: #f1fffe;
    padding: 0 30rpx;
    border-radius: 30rpx;
    display: flex;
    justify-content: space-between;
  }

  .checkbox {
    width: 25%;
    text-align: center;
  }

  .subtitle22 {
    box-sizing: border-box;
    width: 230rpx;
    height: 68rpx;
    padding-top: 15rpx;
    text-align: center;
    color: #999;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC-Regular;
  }

  .subtitletrue {
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    color: #333;
    background: #f1fffe;
  }

  .navBtm {
    width: 20rpx;
    height: 8rpx;
    opacity: 1;
    background: #00dfd7;
    border-radius: 4rpx;
    margin: 0 auto;
  }

  /* 最后结束的表 */
  .rankinglist {
    width: 690rpx;
    background-color: #fff;
    border-radius: 30rpx;
  }

  .subtitle {
    width: 690rpx;
    height: 92rpx;
    opacity: 1;
    background: #d4fffd;
    border-radius: 30rpx 30rpx 0 0;
    color: #00dfd7;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    text-align: center;
    line-height: 92rpx;
  }

  .subtitle1 {
    width: 345rpx;
    height: 92rpx;
    opacity: 1;
    background: #fafafa;
    color: #999999;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    text-align: center;
    line-height: 92rpx;

  }

  .subtitleclolor {
    background: #d4fffd;
    color: #00dfd7;
  }

  .subboxs {
    box-sizing: border-box;
    width: 690rpx;
    background: #fff;
    padding: 0 20rpx 20rpx;
    border-radius: 0 0 30rpx 30rpx;
  }

  .subbox1 {
    display: flex;
    align-items: center;
    padding-top: 20rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    color: #333;
  }

  .missonbg {
    box-sizing: border-box;
    background: url(../../static/missonbg.png) no-repeat;
    width: 690rpx;
    height: 280rpx;
    background-size: contain;
    padding: 40rpx 20rpx 0;
    position: relative;
    box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.10);
    margin-bottom: 20rpx;
    border-radius: 0 0 30rpx 30rpx;
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


  /* 排名 */
  .rankleft {
    display: flex;
    align-items: center;
  }

  .rankcrown {
    width: 40rpx;
    height: 40rpx;
    text-align: center;
  }
</style>
