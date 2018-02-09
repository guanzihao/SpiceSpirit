var sendRrquest = function (url, method, data) {
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: 'application/x-www-form-urlencoded',
      success: resolve,
      fail: reject
    })
  });
  return promise;
};

module.exports.sendRrquest = sendRrquest 