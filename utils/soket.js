module.exports = (function() {
  var webSocketUrl = 'wss://oa.zhigoukeji.com:4567',
    socketOpened = false,
    // 标记websocket是否已经打开

    socketMsgQueue = [],
    connCallback = null,
    msgReceived = {};

  function connect(callback) {
    // 发起链接
    // var app = getApp(),
    //     roomNo = app.getRoomNo();
    uni.connectSocket({
      url: webSocketUrl
    });
    connCallback = callback;
  }

  function initEvent() {
    
    // 初始化一些webSocket事件
    uni.onSocketOpen(function(res) {
      console.log('12',res)
      // webSocket打开事件处理
      socketOpened = true;
      console.log('websocket opened.'); // 处理一下没发出去的消息
      openid = uni.getStorageSync('openid');
      sendSocketMessage('user:' + openid);
      // while (socketMsgQueue.length > 0) {
      //   var msg = socketMsgQueue.pop();
      //   sendSocketMessage(msg);
      // } // sendSocketMessage('after');
      // // connection callback


      connCallback && connCallback.call(null);
    });
    uni.onSocketMessage(function(res) {
      // 收到服务器消息时的处理
      switch (res.data) {
        case '101':
          var num = uni.getStorageSync('101')
          var nums = num + 1
          uni.setStorageSync('101', nums);
          break;
        case '102':
          var num = uni.getStorageSync('102')
          var nums = num + 1
          uni.setStorageSync('102', nums);
          break;
        case '103':
          var num = uni.getStorageSync('103')
          var nums = num + 1
          uni.setStorageSync('103', nums);
          break;
        case '104':
          var num = uni.getStorageSync('104')
          var nums = num + 1
          uni.setStorageSync('104', nums);
          break;
        case '105':
          var num = uni.getStorageSync('105')
          var nums = num + 1
          uni.setStorageSync('105', nums);
          break;
        case '106':
          var num = uni.getStorageSync('106')
          var nums = num + 1
          uni.setStorageSync('106', nums);
          break;
        case '107':
          var num = uni.getStorageSync('107')
          var nums = num + 1
          uni.setStorageSync('107', nums);
          break;
      }
      // console.log('received msg: ' + res.data);
      msgReceived.callback && msgReceived.callback.call(null, res.data, ...msgReceived.params);
    });
    uni.onSocketError(function(res) {
      // 链接出错时的处理
      console.log('webSocket fail');
    });
    uni.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！');
      socketOpened = false;
      connect()
        // init();

    });
  }

  function sendSocketMessage(msg) {
    if (typeof msg === 'object') {
      msg = JSON.stringify(msg);
    }

    if (socketOpened) {
      uni.sendSocketMessage({
        data: msg
      });
    } else {
      // 发送的时候，链接还没建立 
      socketMsgQueue.push(msg);
    }
  }

  function setReceiveCallback(callback, ...params) {
    if (callback) {
      msgReceived.callback = callback;
      msgReceived.params = params;
    }
  }

  function init() {
    initEvent();
    console.log(12312)
  }

  init();
  return {
    connect: connect,
    send: sendSocketMessage,
    setReceiveCallback: setReceiveCallback,
    socketOpened: socketOpened
  };
})();
