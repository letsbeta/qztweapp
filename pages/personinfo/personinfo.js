// pages/personinfo/personinfo.js
const app = getApp();

const common = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

    genders: [
      { name: '男', value: 1, checked: true },
      { name: '女', value: 2, checked: false }
    ],
    appendSpace: ' '.repeat(8),
    name: '',
    phone: '',
    birthday: '1980-01-01',
    intro: ''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const dbUser = wx.getStorageSync('dbUserInfo') || {}
    const openid = wx.getStorageSync('openid') || {}
    
    wx.request({
      url: common.endpoint + '/api/getuser/' + openid.openid + '/',
      method: 'GET',
      header: common.headers,
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('save dbUserInfo to local storage');
          var dbUser = res.data;
          wx.setStorageSync('dbUserInfo', dbUser);
          this.setData({
            name: dbUser.name,
            phone: dbUser.phone,
            birthday: dbUser.birthday,
            intro: dbUser.intro
          });
          var genders = this.data.genders;
          for (var i = 0; i < genders.length; i++) {
            genders[i].checked = (dbUser.gender == genders[i].value);
          }
          this.setData({
            genders: genders
          });
        }
      }
    })
  
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

  bindDateChange: function(e) {
    this.setData({birthday: e.detail.value});
  },

  /**
   * form submit
   */

  doSubmit: function(e) {
    var userInfo = wx.getStorageSync('userInfo') || {};
    var openid = wx.getStorageSync('openid') || {};

    //var data = common.extend(e.detail.value, userInfo);
    //var data = common.extend(data, openid);
    var data = common.extend([e.detail.value, userInfo, openid]);
    console.log(data);

    if (e.detail.value.name.length == 0) {
      common.showConfirm('请填写姓名', false);
      return;
    }
    else if (e.detail.value.phone.length != 11) {
      common.showConfirm('请正确填写手机号吗', false);
      return;
    }
    wx.request({
      url: common.endpoint+'/api/adduser',
      method: 'POST',
      data: data,
      header: common.headers,
      success: res => {
        if (res.statusCode == 200) {
          console.log(res.data);
          wx.setStorageSync('dbUserInfo', res.data);
          common.showConfirm('信息提交成功', true);
        }
        else {
          common.showConfirm('信息提交失败', false);
        }
      },
      fail: res => {
        common.showConfirm('信息提交失败', false);
      }
    })
  }
})