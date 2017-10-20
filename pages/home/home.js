// pages/home/home.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    endpoint: app.globalData.endpoint,

    imgUrls: [
      app.globalData.endpoint + '/static/banner/aimabanner.jpg',
      app.globalData.endpoint + '/static/banner/xinribanner.jpg',
      app.globalData.endpoint + '/static/banner/yadibanner.jpg'
    ],

    jobs: [
      {
        company: '安能物流',
        salaryMin: 4000,
        salaryMax: 6000,
        jobName: '搬运工',
        city: '无锡',
        district: '新区',
        desc: '环境好，待遇优。提供住宿，公司食堂。工资月结。好机会不等人，欲投从速。',
        by: '顶呱呱劳务',
        tel: '0510-88888888',
        date: '2017-10-13'
      },
      {
        company: '绿点精密厂',
        salaryMin: 5000,
        salaryMax: 8000,
        jobName: '操作员',
        city: '无锡',
        district: '新区',
        desc: '环境好，待遇优。提供住宿，公司食堂。工资月结。好机会不等人，欲投从速。',
        by: '顶呱呱劳务',
        tel: '0510-88888888',
        date: '2017-10-12'
      },
      {
        company: '绿点塑胶厂',
        salaryMin: 5000,
        salaryMax: 8000,
        jobName: '操作员',
        city: '无锡',
        district: '新区',
        desc: '环境好，待遇优。提供住宿，公司食堂。工资月结。好机会不等人，欲投从速。',
        by: '顶呱呱劳务',
        tel: '0510-88888888',
        date: '2017-10-11'
      },
      {
        company: '绿点塑胶厂',
        salaryMin: 5000,
        salaryMax: 8000,
        jobName: '操作员',
        city: '无锡',
        district: '新区',
        desc: '环境好，待遇优。提供住宿，公司食堂。工资月结。好机会不等人，欲投从速。',
        by: '顶呱呱劳务',
        tel: '0510-88888888',
        date: '2017-10-11'
      }
    ]

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