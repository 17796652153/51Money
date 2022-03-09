<script>
	// app.js
	const http = require("./utils/http.js");
	const soket = require("./utils/soket.js");
	export default {
		
		onLaunch() {
			soket.connect()
			uni.setStorageSync('101', 0);
			uni.setStorageSync('102', 0);
			uni.setStorageSync('103', 0);
			uni.setStorageSync('104', 0);
			uni.setStorageSync('105', 0);
			uni.setStorageSync('106', 0);
			uni.setStorageSync('107', 0);
			uni.getSystemInfo({
				success: (res) => {
					//检测当前平台，如果是安卓则启动安卓更新 
					console.log(http.rootDocment)
					
					var version=plus.runtime.version
					if (res.platform == "android") {
						this.AndroidCheckUpdate(version);
					}
				}
			})
			// const updateManager = uni.getUpdateManager();
			// updateManager.onCheckForUpdate(function(res) {
			//   // 请求完新版本信息的回调
			//   console.log(res.hasUpdate);
			//   if (res.hasUpdate) {
			//     updateManager.onUpdateReady(function() {
			//       uni.showModal({
			//         title: '更新提示',
			//         content: '新版本已经准备好，是否重启应用？',
			//         success: function(res) {
			//           if (res.confirm) {
			//             // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			//             updateManager.applyUpdate();
			//           }
			//         }
			//       });
			//     });
			//   }
			// });
			// updateManager.onUpdateFailed(function() {
			//   // 新版本下载失败
			//   uni.showModal({
			//     title: '已经有新版本了哟~',
			//     content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
			//   });
			// });
		},

		globalData: {
			banned() {
				var that = this;
				var url = 'api/users/userData?openid=' + uni.getStorageSync('openid');
				http.getReq(url, function(res) {
					console.log(res.data);

					if (res.code == 200) {
						if (res.data.status == 0) {
							uni.redirectTo({
								url: '/pages/banned/banned'
							});
						}
					}
				});
			},

			userInfo: null
		},
		methods: {
			/**
			 * 安卓应用的检测更新实现
			 */
			AndroidCheckUpdate: function(version) {
				var that = this;
				  var url = 'api/index/getAppVersion';
				  var data = {};
					// plus.runtime.version
				  http.postReq(url, data, function (res) {
				    if (res.code == 200) {
							var server_version = res.data.version;
							console.log(version,server_version)
							that.checkVersionToLoadUpdate(server_version, version);
				    }
				  });
				},
				// uni.request({
				// 	//请求地址，设置为自己的服务器链接
				// 	url: GLOBAL.DOMAIN_URL + '/uniapi/checkAndroidVersion.html',
				// 	//method: 'GET',  
				// 	data: {},
				// 	success: resMz => {
				// 		var server_version = resMz.data.data.version;
				// 		var currTimeStamp = resMz.data.data.timestamp;
				// 		// 判断缓存时间
				// 		uni.getStorage({
				// 			key: 'tip_version_update_time',
				// 			success: function(res) {
				// 				var lastTimeStamp = res.data;
				// 				//定义提醒的时间间隔，避免烦人的一直提示，一个小时：3600；一天：86400
				// 				var tipTimeLength = 3600;
				// 				if ((lastTimeStamp + tipTimeLength) > currTimeStamp) {
				// 					//避免多次提醒，不要更新
				// 					console.log("避免多次提醒，不要更新");
				// 				} else {
				// 					//重新设置时间戳
				// 					_this.setStorageForAppVersion(currTimeStamp);
				// 					//进行版本型号的比对 以及下载更新请求
				// 					_this.checkVersionToLoadUpdate(server_version, _this
				// 						.version);
				// 				}
				// 			},
				// 			fail: function(res) {
				// 				_this.setStorageForAppVersion(currTimeStamp);
				// 			}
				// 		});
				// 	},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
				
				
				/**
				 * //设置应用版本号对应的缓存信息
				 * @param {Object} currTimeStamp 当前获取的时间戳
				 */
				setStorageForAppVersion: function(currTimeStamp) {
					uni.setStorage({
						key: 'tip_version_update_time',
						data: currTimeStamp,
						success: function() {
							console.log('setStorage-success');
						}
					});
				},
				/**
				 * 进行版本型号的比对 以及下载更新请求 
				 * @param {Object} server_version 服务器最新 应用版本号
				 * @param {Object} curr_version 当前应用版本号
				 */
				checkVersionToLoadUpdate: function(server_version, curr_version) {
					if (server_version > curr_version) {
						//TODO 此处判断是否为 WIFI连接状态
						if (plus.networkinfo.getCurrentType() != 3) {
							uni.showToast({
								title: '有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新',
								mask: true,
								duration: 5000,
								icon: "none"
							});
							return;
						} else {
							uni.showModal({
								title: "版本更新",
								content: '有新的版本发布，检测到您当前为Wifi连接，是否立即进行新版本下载？',
								confirmText: '立即更新',
								showCancel:false,
								// cancelText: '稍后进行',
								success: function(res) {
									if (res.confirm) {
										uni.showToast({
											icon: "none",
											mask: true,
											title: '有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序',
											duration: 5000,
										});
										//设置 最新版本apk的下载链接
										var downloadApkUrl = http.rootDocment + "app/app.apk";
										console.log(downloadApkUrl)
										var dtask = plus.downloader.createDownload(downloadApkUrl, {},
											function(d, status) {
												// 下载完成  
												console.log(d,status)
												if (status == 200) {
													plus.runtime.install(plus.io.convertLocalFileSystemURL(
														d.filename), {}, {}, function(error) {
														uni.showToast({
															title: '安装失败',
															duration: 1500
														});
													})
												} else {
													uni.showToast({
														title: '更新失败',
														duration: 1500
													});
												}
											});
										dtask.start();
									} else if (res.cancel) {
										console.log('稍后更新');
									}
								}
							});
						}
					}
				},
			},
		
	};
</script>
<style lang="scss">
	@import "uview-ui/index.scss";

	[v-cloak] {
		display: none;
	}

	.mt20 {
		margin-top: 20rpx;
	}

	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 200rpx 0;
		box-sizing: border-box;
	}

	view,
	text {
		font-family: OPPOSans, OPPOSans-Medium;
	}


	/* 暂无账单 */
	.no-bill {
		width: 574rpx;
		margin: 186rpx auto;
	}

	.no-bill-img {
		width: 574rpx;
		height: 488rpx;
	}

	.no-bill-txt {
		margin-top: 24rpx;
		font-size: 28rpx;
		font-family: OPPOSans, OPPOSans-Regular;
		font-weight: 400;
		text-align: CENTER;
		color: #999999;
	}

	.no-data {
		margin-top: 30rpx;
		font-size: 28rpx;
		color: #999;
		text-align: center;
	}

	/* 左二右中布局 */
	.box {
		box-sizing: border-box;
		width: 100%;
		height: 108rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.box-left {
		font-size: 28rpx;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: LEFT;
		color: #333333;
	}

	.box-right {
		font-size: 28rpx;
		font-family: Roboto, Roboto-Regular;
		font-weight: 400;
		text-align: RIGHT;
		color: #ff0000;
	}

	.box-time {
		font-size: 24rpx;
		font-family: Roboto, Roboto-Regular;
		font-weight: 400;
		text-align: LEFT;
		color: #999999;
		margin-top: 12rpx;
	}
</style>
