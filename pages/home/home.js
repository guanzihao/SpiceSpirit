// pages/home/home.js
const app = getApp()
const request = require("../../utils/requestService.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    imgUrls: [
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/3.jpg',
      '/images/4.jpg',
      '/images/5.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: false,
    indicatorcolor:'rgba(0,0,0,3)',
    encryptedData:null,
    messsges: ['1']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.onSocketMessage(function (res) {
      var msg = that.data.messsges
      msg.push(res.data)
      that.setData({ messsges: msg })
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  formSubmit:function(e){
    console.log(e.detail.value.input)
    var that = this
    request.sendRrquest(app.pathUrl.url + "weixin/getUserInFoOpenId.json", 'GET', { 'input': e.detail.value.input, 'formId': e.detail.formId })
      .then(function (response) {
        console.log(response)
      }, function (error) {
        console.log(error);
      });
  },
  sendMess:function(){
    // wx.openSetting({
    //   success: (res) => {
    //     /*
    //      * res.authSetting = {
    //      *   "scope.userInfo": true,
    //      *   "scope.userLocation": true
    //      * }
    //      */
    //   }
    // })
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  getPhoneNumber: function (e) {
    wx.login({
      success: function (res) {
        console.log(res)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
      }
    });
  },
  authorize:function(){
    
  },
  sendMesss:function(){
    wx.startWifi({
      success: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  sendMess1:function(){
    wx.vibrateLong(200000)
  },
  openBtnClick: function () {
    wx.connectSocket({
      url: "ws://192.168.0.117:8081/websocket",
      data: {
        message:123
      },
      // header: {}, // 设置请求的 header
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  sendBtnClick: function () {
    wx.sendSocketMessage({
      data: "{name: '关自豪',sex: '男'}",
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  closeBtnClick: function () {
    wx.closeSocket()
  },
  startWifi:function(){
    console.log('=================================')
    wx.startWifi({
      success: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  getWifiList:function(){
    wx.getWifiList();
  },
  showModal:function(){
    wx.showModal({
      title: '微信支付',
      content: '确定发起支付吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showActionSheet:function(){
    wx.showActionSheet({
      itemList: ['银行卡支付', '支付宝支付', '微信支付'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  showToast:function(){
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  setNavigationBarTitle:function(){
    wx.showNavigationBarLoading()
    for(var i=0;i<6000;i++){
      console.log(i)
    }
    wx.setNavigationBarTitle({
      title: '当前页面'
    })
    wx.hideNavigationBarLoading()
  },
  setNavigationBarColor:function(){
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 4000,
        timingFunc: 'easeIn'
      }
    })
  },
  setTabBarBadge:function(){
    wx.setTabBarBadge({
      index: 0,
      text: '100'
    })

  },
  removeTabBarBadge:function(){
    wx.removeTabBarBadge({
      index: 0,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  showTabBarRedDot:function(){
    wx.showTabBarRedDot({
      index: 0,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  setTabBarStyle:function(){
    wx.setTabBarStyle({
      color: '#FF0000',
      selectedColor: '#00FF00',
      backgroundColor: '#0000FF',
      borderStyle: 'white'
    })
  },
  setTabBarItem:function(){
    // wx.setTabBarItem({
    //   index: 1,
    //   text: 'text'
    // })
  },
  setTopBarText:function(){
    wx.setTopBarText({
      text: 'hello, world!'
    })
  },
  navigateTo:function(){
    wx.navigateTo({
      url: '/pages/home_test/home_test?id=1'
    })
  },
  redirectTo:function(){
    wx.redirectTo({
      url: '/pages/home_test/home_test?id=1'
    })
  },
  messsges:function(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  addCard:function(){
    wx.addCard({
      cardList: [
        {
          cardId: '',
          cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
        }, {
          cardId: '',
          cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
        }
      ],
      success: function (res) {
        console.log(res.cardList) // 卡券添加结果
      }
    })
  },
  openSetting:function(){
    // wx.openSetting({
    //   success: (res) => {
        
    //       res.authSetting = {
    //         "scope.userInfo": true,
    //         "scope.userLocation": true
    //       }
         
    //   }
    // })
  }
})