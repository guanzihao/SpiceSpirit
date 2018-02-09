//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let res = wx.getSystemInfoSync()
    this.globalData.height = res.windowHeight
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求 将code传给服务器
          wx.request({
            url: this.pathUrl.url + 'weixin/getUserInFoOpenId.json', //仅为示例，并非真实的接口地址
            data: {
              code: res.code
            },
            method: 'GET',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              console.log(res.data)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    height:0
  },
  //把对象转为符合页面参数传递的函数  
  // 类型为key=valuev&key=value
  objcToString:function(objc){
    let objcString = ''
    for(let key in objc){
       objcString = objcString.concat(key,"=",objc[key],"&")        
    }
    if(objcString.length > 0){
      return objcString.slice(0,objcString.length - 1)
    }else{
      return ""
    }
  },pathUrl: {
    url: 'http://192.168.0.117:8081/'
  },
  uploadFile: function (url, file, i) {//递归调用
    console.log("file路径为" + file);
    var that = this;
    wx.uploadFile({
      url: this.pathUrl.url + url, //仅为示例，非真实的接口地址
      filePath: file[i],

      name: 'wxfile',
      header: { "Content-Type": "multipart/form-data" },

      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'session_token': wx.getStorageSync('session_token')
      },

      success: function (res) {
        if (!((i + 1) == file.length)) {
          that.uploadFile(url, file, i + 1);
        }
      }
    })
  }
})