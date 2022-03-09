<template>
	<view>
		<view class="back">
			<image style="width: 750rpx;height: 276rpx;" src="/static/bg1.png" mode="scaleToFill" @tap="previewImg1">
			</image>
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
							style="width: 40rpx;height: 40rpx;position: absolute;border-radius: 50%;"
							v-for="item in avatarbox" :key='item'></image>
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
					<view class="partbox">
						<text style="display: inline-block;" selectable="true">{{channel.description}}</text>
						<!-- {{channel.description}} -->
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
						<input type="text" placeholder="客户手机号" placeholder-class="input-placeholder" :value="tel"
							@input="gettel">
						<input type="text" placeholder="客户姓名（选填）" placeholder-class="input-placeholder" :value="name"
							@input="getname">
						<input type="text" placeholder="微信号" placeholder-class="input-placeholder" :value="wxtext"
							@input="getwx">
						<textarea cols="30" rows="10" placeholder-class="input-placeholder" :value="detail"
							placeholder="客户需求" @input="getdetail"></textarea>
						<input type="text" placeholder="备注" placeholder-class="input-placeholder" :value="remark"
							@input="getremark">

						<view class="uploader-img  flex justify-content-start" v-if="pics">
							<view class="upAdd" @tap="chooseImg">
								<image style="width:160rpx;height:160rpx;" src="/static/uploads_image.png"
									mode="widthFix"></image>
							</view>
							<view v-for="(item, index) in pics" :key="index" class="uploader-list">
								<image style="width:160rpx;height:160rpx;" :src="item" :data-index="index"
									mode="scaleToFill" @tap="previewImg1"></image>
								<image class="delete" style="width:52rpx;height:52rpx;" :data-index="index"
									src="/static/image/gb.png" mode="widthFix" @tap="deleteImg"></image>
							</view>
						</view>
						<radio-group class="radio-group" @change="radioChange">
							<label v-for="(item, index) in items" :key="index" class="radio">
								<radio color="#00DFD7" :value="item.value" :checked="item.checked"></radio>
								{{item.value}}
							</label>
						</radio-group>

						<view class="text">温馨提示：{{tips1}}</view>
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
				// statusBarHeight: getApp().globalData.statusBarHeight,
				tel: "",
				name: "",
				remark: "",
				detail: "",
				user: '',
				state: '一般',
				wxtext: "",
				index: '',
				agins: true,
				tips1: "",
				id: "",
				channel: '',
				sid: '', //任务回显id
				avatarbox: [],
			};
		},


		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			if ('sid' in options) {
				this.setData({
					id: options.id,
					sid: options.sid
				});
			} else {
				this.setData({
					id: options.id,
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
			console.log("页面显示");
			this.setData({
				user: uni.getStorageSync('user'),
				tips1: uni.getStorageSync('tips1')
			});
		},

		methods: {
			// 复制任务说明

			getmostdetail() {
				const that = this;
				let url = 'api/users/lookup';
				let data = {
					id: that.sid
				};
				http.postReq(url, data, function(res) {
					if (res.code == 200) {
						var imgList = [];
						if (res.data.image != '') {
							imgList = res.data.image.split(',');
						}
						that.setData({
							tel: res.data.phone,
							address: res.data.address,
							shop: res.data.brand,
							pics: imgList
						});
					}
				});
			},


			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value);
				this.setData({
					index: e.detail.value
				});
			},
			//根据id获取提交页的详情
			getclueChannel() {
				const that = this;
				let url = 'api/team/clueChannel';
				let data = {
					id: that.id
				};
				http.postReq(url, data, function(res) {
					console.log('Channel1', res)
					if (res.code == 200) {
						that.channel = res.data

						res.data.avatar.forEach(el => {
							var avatar = el.charAt(0)
							if (avatar != 'h') {
								el = http.rootDocment + el.substr(1)
							}
							console.log(el)
							that.avatarbox.push(el)
							// var avatar=res.data.avatar
							// console.log('21',avatar)
							// if(avatar!='h'){
							//   res.data.avatar=http.rootDocment+res.data.avatar.substr(1)
							// }
						})
						console.log(that.avatarbox)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
						})
					}
				});
			},

			// 根据id进行获取数据
			getmostdetail() {
				const that = this
				let url = 'api/users/lookup'
				let data = {
					id: that.sid
				}
				http.postReq(url, data, function(res) {
					if (res.code == 200) {
						console.log('任务111', res)

						var imgList = []
						if (res.data.image != '') {
							imgList = res.data.image.split(',');
						}
						console.log(imgList)
						for (let i = 0; i < that.items.length; i++) {
							delete that.items[i].checked
							if (that.items[i].name == res.data.state) {
								that.items[i].checked = "true"
							}
							console.log('data', that.items)
							that.setData({
								items: that.items,
							})
						}
						that.setData({
							wxtext: res.data.wx,
							tel: res.data.phone,
							name: res.data.name,
							remark: res.data.remarks,
							detail: res.data.demand,
							pics: imgList,
							state: res.data.state,
							agins: false
						})
					}
				})
			},


			// gettel getname getdetail getremark 获取填写的信息
			getwx(e) {
				this.setData({
					wxtext: e.detail.value
				});
			},

			gettel(e) {
				this.setData({
					tel: e.detail.value
				});
			},

			getname(e) {
				this.setData({
					name: e.detail.value
				});
			},

			getdetail(e) {
				this.setData({
					detail: e.detail.value
				});
			},

			getremark(e) {
				this.setData({
					remark: e.detail.value
				});
			},

			radioChange(e) {
				console.log('radio发生change事件，携带value值为：', e.detail.value);
				this.setData({
					state: e.detail.value
				});
			},

			// 修改
			getsubmit1() {
				const that = this;
				if (that.tel == "" && that.wxtext == "") {
					uni.showToast({
						title: '请填写手机号或者微信号',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if (that.detail == '') {
					uni.showToast({
						title: '客户需求不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				var tunnel = that.channel.title;
				var url = 'api/users/UpdaSubmit';
				var data = {
					openid: uni.getStorageSync('openid'),
					phone: that.tel,
					image: that.pics,
					name: that.name,
					wx: that.wxtext,
					tunnel: tunnel,
					tunnel_id: that.id,
					demand: that.detail,
					remarks: that.remark,
					state: that.state,
					id: that.sid,
					province: uni.getStorageSync('province'),
					city: uni.getStorageSync('city'),
					area: uni.getStorageSync('district')
				};
				http.postReq(url, data, function(res) {
					if (res.code == 200) {
						console.log(res.data);

						if (that.state == '一般') {
							soket.send("1");
						} else {
							soket.send("5");
						}

						uni.showToast({
							title: '提交成功',
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateBack();
						}, 2000);
					} else {
						uni.showModal({
							title: '警告',
							content: res.msg,
							showCancel: false,
							confirmText: '确定',
							success: function(res) {}
						});
					}
				});
			},

			getsubmit() {
				const that = this;
				if (that.tel == '' && that.wxtext == '') {
					uni.showToast({
						title: '请填写手机号或者微信号',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if (that.detail == '') {
					uni.showToast({
						title: '客户需求不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				var tunnel = that.channel.title;
				let url = 'api/users/submitClue';
				let date = {
					openid: uni.getStorageSync('openid'),
					large_type: 1,
					phone: that.tel,
					image: that.pics,
					name: that.name,
					wx: that.wxtext,
					tunnel: tunnel,
					tunnel_id: that.id,
					demand: that.detail,
					remarks: that.remark,
					state: that.state,
					avatar: that.user.avatar,
					nick: that.user.username,
					province: uni.getStorageSync('province'),
					city: uni.getStorageSync('city'),
					area: uni.getStorageSync('district')
				};

				if (date.openid == '') {
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

				http.postReq(url, date, function(res) {
					if (res.code == 200) {
						if (that.state == '一般') {
							soket.send("1");
						} else {
							soket.send("5");
						}

						uni.showToast({
							title: '提交成功',
							icon: 'none',
							duration: 2000
						});
						var items1 = [{
							name: '紧急联系',
							value: '紧急联系'
						}, {
							name: '一般',
							value: '一般',
							checked: 'true'
						}];
						that.setData({
							index: '',
							tel: "",
							pics: [],
							name: '',
							detail: '',
							remark: '',
							items: items1
						});
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/mysubmit/mysubmit'
							});
						}, 2000);
					} else {
						uni.showModal({
							title: '提示',
							content: res.msg,
							showCancel: false,
							confirmText: '确定',
							success: function(res) {
								// 用户没有授权成功，不需要改变 isHide 的值
								that.setData({
									index: '',
									tel: '',
									pics: [],
									name: '',
									detail: '',
									remark: ''
								});
							}
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
						uni.showLoading({
							title: '上传中···'
						});
						pathToBase64(tempFilePaths[0])
							.then(base64 => {
								console.log(base64)
								let url = 'api/users/upload';
								var data = {
									base64
								}
								http.postReq(url, data, function(res) {
									if (res.code == 200) {
										pics.push(http.rootDocment + res.data);
										that.setData({
											pics: pics
										});
										uni.hideLoading();
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
		height: 3000rpx;
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
