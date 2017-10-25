//app.js
const common = require('./utils/util.js');

App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        common.post('/api/wxlogin', {'code': res.code}).then(res => {
          console.log(res.data);
          if (res.statusCode == 200) {
            wx.setStorageSync('openid', res.data);  //保存openid到本地storage
            //获取数据库中用户的详细信息
            common.get('/api/user/'+res.data.openid+'/').then(res => {
              if (res.statusCode == 200) {
                console.log('save dbUserInfo to local storage');
                wx.setStorageSync('dbUserInfo', res.data);
              }
            });
            //获取用户公司信息
            common.get('/api/yourcompany/'+res.data.openid+'/').then(res => {
              if (res.statusCode == 200) {
                console.log('save company info to local storage');
                wx.setStorageSync('companyInfo', res.data);
              }
            });
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
    userInfo: null
  }
})