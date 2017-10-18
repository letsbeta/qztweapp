// pages/personinfo/personinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    genders: [
      { name: '男', value: '1', checked: true },
      { name: '女', value: '2', checked: false }
    ],
    appendSpace: '        '
  
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
  
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var genders = this.data.genders;
    for (var i = 0, len = genders.length; i < len; ++i) {
      genders[i].checked = genders[i].value == e.detail.value;
    }

    this.setData({
      genders: genders
    });
  },
})