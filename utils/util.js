const endpoint = 'https://qzt.letsbeta.com';

const headers = {
  'content-type': 'application/json', // 默认值
  'X-App-Key': 'itisreallyhard2guess!',
  'Accept': 'application/json'
};

function extend(jsonbject1, jsonbject2) {
  var resultJsonObject = {};
  for (var attr in jsonbject1) {
    resultJsonObject[attr] = jsonbject1[attr];
  }
  for (var attr in jsonbject2) {
    resultJsonObject[attr] = jsonbject2[attr];
  }
  return resultJsonObject;
};

function extend2(jsonarray) {
  var resultJsonObject = {};
  for (var i = 0; i < jsonarray.length; i++) {
    for (var attr in jsonarray[i]) {
      resultJsonObject[attr] = jsonarray[i][attr];
    }
  }
  return resultJsonObject;
};

//将2017-10-11T11:00:00这种格式转化成10-11
function truncTime(t) {
  var time_str = t.split('T')[0].split('-');
  var ti = time_str[1] + '-' + time_str[2];
  //console.log(ti);
  return ti;
}

//提示网络异常
function promptNetworkIssue() {
  wx.showToast({
    title: '网络异常',
    icon: 'loading',
    duration: 3000,
    mask: true
  });
}

//提示网络异常
function promptNetworkNotConnect() {
  wx.showToast({
    title: '没有网络',
    icon: 'loading',
    duration: 3000,
    mask: true
  });
}

//判断对象为空
function isEmptyObject(obj) {
  for (var n in obj) {
    return false
  }
  return true;
}

//跳转到补全信息
function jumpToProfile() {
  wx.showModal({
    title: '提示',
    content: '请先补全个人信息',
    showCancel: false,
    success: res => {
      wx.navigateTo({
        url: '/pages/userprofile/userprofile',
      });
    }
  })
}

function get(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: endpoint+url,
      method: 'GET',
      header: headers,
      success: resolve,
      fail: reject
    });
  })
}

function post(url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: endpoint + url,
      method: 'POST',
      header: headers,
      data: data,
      success: resolve,
      fail: reject
    });
  })
}

function showConfirm(msg, goback) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      success: res => {
        if (res.confirm && goback) {
          wx.navigateBack({
          });
        }
      }
    })
  })
}

module.exports = {
  endpoint: endpoint,
  headers: headers,
  extend: extend2,
  truncTime: truncTime,
  promptNetworkIssue: promptNetworkIssue,
  promptNetworkNotConnect: promptNetworkNotConnect,
  jumpToProfile: jumpToProfile,
  isEmptyObject: isEmptyObject,
  get: get,
  post: post,
  showConfirm: showConfirm
}
