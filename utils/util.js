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

function showToast(msg) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: msg,
      duration: 3000,
      success: resolve,
      fail: reject
    })
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
  get: get,
  post: post,
  showToast: showToast,
  showConfirm: showConfirm
}
