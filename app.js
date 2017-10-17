//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.request({
          url: 'https://qzt.letsbeta.com/api/wxlogin',
          method: 'POST',
          data: {
            'code': res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            console.log(res);
          },
          fail: res => {
            console.log(res);
          }
        })
      }
    })
    // 获取用户信息
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    endpoint: 'https://qzt.letsbeta.com'
  }
})