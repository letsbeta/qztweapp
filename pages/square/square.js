// pages/square/square.js
const common = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    next: "",
    default_intro: "岁月在我脸上留下了不灭的痕迹，而我却什么也没有留下。",
    persons: [
      {
        id: 1,
        openid: 0,
        avatar: '../../asset/avatar/male.png',
        name: '张三',
        age: 28,
        gender: '男',
        intro: '岁月在我脸上留下了不灭的痕迹，而我却什么也没有留下。',
        phone: '13182762105',
        update_at: '10-13'
      },
      {
        id: 2,
        openid: 0,
        avatar: '../../asset/avatar/male.png',
        name: '李四',
        age: 32,
        gender: '男',
        intro: '三年以上电焊经验，熟练掌握鱼鳞焊等工艺，吃苦耐劳 . .',
        phone: '13182762105',
        update_at: '10-12'
      },
      {
        id: 3,
        openid: 0,
        avatar: '../../asset/avatar/male.png',
        name: '王五',
        age: 32,
        gender: '男',
        intro: '三年以上电焊经验，熟练掌握鱼鳞焊等工艺，吃苦耐劳 . .',
        phone: '13182762105',
        update_at: '10-12'
      }
    ]

  },

  /**
   * 自定义函数，searchBar使用这些函数
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

  tabMakePhoneCall: function (e) {
    var phone = e.currentTarget.dataset.phone;
    console.log('call ' + phone);
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },


  /**
   * 页面加载和下拉刷新时调用，回去最新的用户信息
   * q: query string: ?offset=10
   */

  fetchLatestUserInfo: function (q, append = false) {
    common.get('/api/users' + q).then(res => {
      if (res.statusCode == 200) {
        var users = res.data.users;
        var next = res.data.next;
        for (var i = 0; i < users.length; i++) {
          var update_at = common.truncTime(users[i].update_at);
          users[i].update_at = update_at;
          if (users[i].intro.length == 0) {
            users[i].intro = this.data.default_intro;
          }
        }
        console.log(users);
        this.setData({
          next: next
        });
        if (append) {
          this.setData({
            persons: this.data.persons.concat(users)
          })
        }
        else {
          this.setData({
            persons: users
          })
        }
      }
      else {
        console.log('get user list failed');
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
    console.log('square loaded');
    this.fetchLatestUserInfo('');
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
    console.log('pull down refresh triggered.');
    this.fetchLatestUserInfo('');
    wx.stopPullDownRefresh();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("bottom is reached.");
    if (this.data.next.length != 0) {
      this.fetchLatestUserInfo(this.data.next, true);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户自定义函数
   */
  gotoDetail: function (e) {
    console.log(e.currentTarget.dataset);
    var openid = e.currentTarget.dataset.openid;
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var age = e.currentTarget.dataset.age;
    var gender = e.currentTarget.dataset.gender;
    var phone = e.currentTarget.dataset.phone;
    console.log('detail for openid ' + openid + ' userid ' + id);

    var query = '?userid=' + id + '&openid=' + openid + '&name=' + name + '&age=' + age + '&gender=' + gender + '&phone=' + phone;
    
    wx.navigateTo({
      url: '/pages/peopledetail/peopledetail' + query,
    });
  }
})