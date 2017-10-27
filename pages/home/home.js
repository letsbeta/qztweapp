// pages/home/home.js
//获取应用实例
const app = getApp();
const common = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    endpoint: common.endpoint,

    imgUrls: [
      { id: 1, url: common.endpoint + '/resource/banner/aimabanner.jpg'},
      { id: 2, url: common.endpoint + '/resource/banner/xinribanner.jpg'},
      { id: 3, url: common.endpoint + '/resource/banner/yadibanner.jpg'}
    ],

    jobs: [
      {
        id: 1,
        name: '安能物流',
        low: 4000,
        high: 6000,
        title: '搬运工',
        city: '无锡',
        district: '新区',
        intro: '环境好，待遇优。提供住宿，公司食堂。工资月结。好机会不等人，欲投从速。',
        by_company: '顶呱呱劳务',
        phone: '0510-88888888',
        short_date: '2017-10-13'
      },
      {
        id: 2,
        name: '绿点精密厂',
        low: 5000,
        high: 8000,
        title: '操作员',
        city: '无锡',
        district: '新区',
        intro: '环境好，待遇优。提供住宿，公司食堂。工资月结。好机会不等人，欲投从速。',
        by_company: '顶呱呱劳务',
        phone: '0510-88888888',
        short_date: '2017-10-12'
      },
      {
        id: 3,
        name: '绿点塑胶厂',
        low: 5000,
        high: 8000,
        title: '操作员',
        city: '无锡',
        district: '新区',
        intro: '环境好，待遇优。提供住宿，公司食堂。工资月结。好机会不等人，欲投从速。',
        by_company: '顶呱呱劳务',
        phone: '0510-88888888',
        short_date: '2017-10-11'
      }
    ]
  },

  fetchLatestJobsInfo: function (q = '', append = false) {
    common.get('/api/jobs' + q).then(res => {
      if (res.statusCode == 200) {
        var jobs = res.data.jobs;
        var next = res.data.next;
        console.log(jobs);
        this.setData({
          next: next
        });
        if (append) {
          this.setData({
            jobs: this.data.jobs.concat(jobs)
          })
        }
        else {
          this.setData({
            jobs: jobs
          })
        }
      }
      else {
        console.log('get jobs list failed');
        common.promptNetworkIssue();
      }
    }).catch(res => {
      common.promptNetworkNotConnect();
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('home page loaded');
    this.fetchLatestJobsInfo();
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