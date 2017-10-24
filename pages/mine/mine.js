// pages/mine/mine.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    extraInfo: {
      phone: '13182762105',
      age: 33
    },
    name: '未知',
    phone: '未知',
    age: '未知'
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    });
    //console.log(this.data.userInfo);
    var dbUser = wx.getStorageSync('dbUserInfo') || {};
    var name = dbUser.name ? dbUser.name : this.data.userInfo.nickName;
    var age = dbUser.age ? dbUser.age : this.data.age;
    this.setData({
      name: name,
      phone: (dbUser.phone ? dbUser.phone : this.data.phone),
      age: age
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})