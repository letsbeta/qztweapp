// pages/clients/clients.js
const common = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    client_name: '',
    clients: []

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
    var companyinfo = wx.getStorageSync('companyInfo') || {};
    if (common.isEmptyObject(companyinfo)) {
      return;
    }
    common.get('/api/yourclients/' + companyinfo.id + '/').then(res => {
      if (res.statusCode == 200) {
        this.setData({ clients: res.data });
        console.log(res.data);
        wx.setNavigationBarTitle({ title: '我的客户' });
      }
      else {
        console.log('failed to get your clients info');
        common.promptNetworkIssue();
      }
    }).catch(res => {
      common.promptNetworkNotConnect();
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

  },

  /**
   * 提交表单
   */
  doSubmit: function (e) {
    console.log(e.detail.value);
    var companyinfo = wx.getStorageSync('companyInfo') || {};
    if (common.isEmptyObject(companyinfo)) {
      common.showConfirm('请先完成企业入住或加入到现有企业');
      return;
    }
    if (e.detail.value.name.length == 0) {
      common.showConfirm('请填写客户名称');
      return;
    }

    common.post('/api/client', { 'name': e.detail.value.name, 'company_id': companyinfo.id }).then(res => {
      if (res.statusCode == 200) {
        console.log('client add success');
        common.showConfirm('添加成功');
        this.setData({ client_name: '' });  //clear input
        this.setData({ clients: res.data });
      }
      else {
        common.promptNetworkIssue();
      }
    }).catch(res => {
      common.promptNetworkNotConnect();
    });
  },

  onDelete: function (e) {
    //actually it is hidden
    var client_id = e.currentTarget.dataset.id;
    var companyinfo = wx.getStorageSync('companyInfo') || {};
    if (common.isEmptyObject(companyinfo)) {
      common.showConfirm('请先完成企业入住或加入到现有企业');
      return;
    }
    console.log('hidden client ' + client_id);
    common.post('/api/clientstatus/' + client_id + '/', { 'status': 0, 'company_id': companyinfo.id }).then(res => {
      if (res.statusCode == 200) {
        console.log('client hidden success');
        this.setData({ clients: res.data });
      }
      else {
        common.promptNetworkIssue();
      }
    }).catch(res => {
      common.promptNetworkNotConnect();
    });
  }
})