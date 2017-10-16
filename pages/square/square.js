// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    persons: [
      {
        avatar: '../../asset/avatar/male.png',
        name: '张三',
        age: 28,
        desc: '岁月在我脸上留下了不灭的痕迹，而我却什么也没有留下。',
        phone: '13182762105',
        update: '10-13'
      },
      {
        avatar: '../../asset/avatar/male.png',
        name: '李四',
        age: 32,
        desc: '三年以上电焊经验，熟练掌握鱼鳞焊等工艺，吃苦耐劳 . .',
        phone: '13182762105',
        update: '10-12'
      },
      {
        avatar: '../../asset/avatar/male.png',
        name: '王五',
        age: 32,
        desc: '三年以上电焊经验，熟练掌握鱼鳞焊等工艺，吃苦耐劳 . .',
        phone: '13182762105',
        update: '10-12'
      }
    ]
  
  },

  /**
   * 自定义函数
   */
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  inputConfirm: function (e) {
    /**
     * 会在这里提交数据
     */
    console.log(e.detail.value);
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
  
  }
})