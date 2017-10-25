// pages/regcompany/regcompany.js
const common = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'name': '',
    'phone': '',
    'address': '',
    'intro': ''
  
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
    var company = wx.getStorageSync('companyInfo') || {};
    if (! common.isEmptyObject(company)) {
      this.setData({
        name: company.name,
        phone: company.phone,
        address: company.address,
        intro: company.intro
      });
    }
  
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
   * 提交表单
   */
  doSubmit: function(e) {
    //console.log(e.detail.value);
    if (e.detail.value.name.length == 0) {
      common.showConfirm('请填写企业名称', false);
      return;
    }
    else if (e.detail.value.phone.length == 0) {
      common.showConfirm('请正确填写电话号码', false);
      return;
    }
    else if (e.detail.value.address.length == 0) {
      common.showConfirm('请正确填写企业地址', false);
      return;
    }
    else if (e.detail.value.intro.length == 0) {
      common.showConfirm('请正确填写企业简介', false);
      return;
    }

    var dbUser = wx.getStorageSync('dbUserInfo') || {};
    if (common.isEmptyObject(dbUser)) {
      common.jumpToProfile();
    }

    var companyinfo = wx.getStorageSync('companyInfo') || {};

    var data = {'name': e.detail.value.name, 'phone': e.detail.value.phone,
      'address': e.detail.value.address, 'intro': e.detail.value.intro,
      'openid': dbUser.openid};
    if (! common.isEmptyObject(companyinfo)) {
      data = common.extend([data, { 'company_id': companyinfo.id}]);
    }
    
    common.post('/api/company', data).then(res => {
      if (res.statusCode == 200) {
        console.log(res.data);
        wx.setStorageSync('companyInfo', res.data);
        common.showConfirm('信息提交成功', true);
      }
      else {
        common.showConfirm('信息提交失败', false);
      }
    })
  }
})