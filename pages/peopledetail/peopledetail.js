// pages/peopledetail/peopledetail.js
const common = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '秦时月',
    area: ['绿点科技', '雅迪电动车', '新伟科技'],
    areaIndex: 0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({userid: options.userid});
    this.setData({name: options.name,
      age: options.age,
      phone: options.phone,
      gender: options.gender,
      openid: options.openid});
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

  /**
   * 用户自定义函数
   */
  onAreaChange: function(e) {
    this.setData({
      areaIndex: e.detail.value
    });
  },

  addToCompany: function(e) {
    var openid = e.currentTarget.dataset.openid;
    var companyinfo = wx.getStorageSync('companyInfo') || {};
    if (common.isEmptyObject(companyinfo)) {
      return;
    }
    var data = {
      'company_id': companyinfo.id,
      'openid': openid
    }
    console.log(data);
    common.post('/api/userjoin', data).then(res => {
      if (res.statusCode == 200) {
        common.showConfirm('添加成功', false);
      }
      else {
        common.showConfirm('添加失败', false);
      }
    }).catch(res => {
      common.promptNetworkNotConnect();
    })
  }
})