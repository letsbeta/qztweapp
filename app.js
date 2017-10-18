//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.request({
          url: this.globalData.endpoint+'/api/wxlogin',
          method: 'POST',
          data: {
            'code': res.code
          },
          header: {
            'content-type': 'application/json', // 默认值
            'X-App-Key': this.globalData.secretKey
          },
          success: res => {
            console.log(res.data);
            if (res.statusCode == 200) {
              wx.setStorageSync('openid', res.data);  //保存openid到本地storage
            }
          },
          fail: res => {
            console.log(res);
          }
        })
      }
    })
    // 获取用户信息
    wx.getUserInfo({
      lang: 'zh_CN',
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        wx.setStorageSync('userInfo', res.userInfo);  //保存用户数据到storage

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
    endpoint: 'https://qzt.letsbeta.com',
    secretKey: 'itisreallyhard2guess!'
  }
})