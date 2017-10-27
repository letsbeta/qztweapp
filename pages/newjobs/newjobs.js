// pages/newjobs/ewjobs.js
const common = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRegister: true,
    myjobs: []
  
  },

  /**
   * 用户自定义函数
   */

  showMyJobs: function() {
    var companyinfo = wx.getStorageSync('companyInfo') || {};
    if (common.isEmptyObject(companyinfo)) {
      return;
    }
    this.setData({ isRegister: false });
    common.get('/api/yourjobs/'+companyinfo.id).then(res => {
      if (res.statusCode == 200) {
        this.setData({myjobs: res.data});
        console.log(res.data);
        wx.setNavigationBarTitle({title: '我发布的职位'});
      }
      else {
        console.log('failed to get your company info');
        common.promptNetworkIssue();
      }
    }).catch(res => {
      common.promptNetworkNotConnect();
    })
  },

  toggleSwitch: function(e) {
    var jobid = e.currentTarget.dataset.id;
    common.post('/api/jobstatus/'+jobid+'/', {'status': 0}).then(res => {
      if (res.statusCode == 200) {
        console.log('job close success');
        //pop the closed job
        var jobs = this.data.myjobs;
        for (var i = 0; i < jobs.length; i++) {
          if (jobs[i].id == jobid) {
            jobs.splice(i, 1);
            //console.log(jobs);
            this.setData({ myjobs: jobs});
            break;
          }
        }
      }
      else {
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
   * 提交表单
   */
  doSubmit: function(e) {
    //检查企业是否已经入住
    var companyinfo = wx.getStorageSync('companyInfo') || {};
    if (common.isEmptyObject(companyinfo)) {
      common.showConfirm('请先完成企业入住或加入到现有企业');
      return;
    }
    if (companyinfo.status != 2) {
      common.showConfirm('您的企业尚未通过审核');
      return;
    }
    if (e.detail.value.name.length == 0) {
      common.showConfirm('请填写招聘企业', false);
      return;
    }
    else if (e.detail.value.low.length == 0) {
      common.showConfirm('请填写最低薪资', false);
      return;
    }
    else if (e.detail.value.high.length == 0) {
      common.showConfirm('请填写最高薪资', false);
      return;
    }
    else if (e.detail.value.city.length == 0) {
      common.showConfirm('请填写城市', false);
      return;
    }
    else if (e.detail.value.district.length == 0) {
      common.showConfirm('请填写所在区', false);
      return;
    }
    else if (e.detail.value.title.length == 0) {
      common.showConfirm('请填写职位名称', false);
      return;
    }
    else if (e.detail.value.phone.length < 11) {
      common.showConfirm('请正确填写联系电话', false);
      return;
    }
    else if (e.detail.value.intro.length == 0) {
      common.showConfirm('请填写职位描述', false);
      return;
    }
    var data = common.extend([e.detail.value, { 'company_id': companyinfo.id}]);
    common.post('/api/job', data).then(res => {
      if (res.statusCode == 200) {
        console.log(res.data);
        common.showConfirm('信息提交成功', true);
      }
      else {
        common.showConfirm('信息提交失败', false);
      }
    })

  }
})