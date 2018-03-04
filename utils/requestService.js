var sendRrquest = function (url, method, objc) {
  let objcString = ''
  for (let key in objc) {
    objcString = objcString.concat(key, "=", objc[key], "&")
  }
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url + "?" + objcString,
      data: {},
      method: method,
      header: 'application/x-www-form-urlencoded',
      success: resolve,
      fail: reject
    })
  });
  return promise;
};

module.exports.sendRrquest = sendRrquest 