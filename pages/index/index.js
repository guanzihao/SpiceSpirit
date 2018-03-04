const request = require("../../utils/requestService.js")
const app = getApp()
let height = 0
Page({
  data:{
    foodCategorys:["虾蟹","特色美食","预订商品","主食酒水"],
    current_id:0,
    city:'',
    screenHeight:parseInt(app.globalData.height) * 2,
    hot_goods:[],
    common_goods:[],
    toView: 'red',
    scrollTop: 100,
   goods:{
     pageIndex: 1,
     pageSize: 6
   },
   isData:true,
   isDatas:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let res = wx.getSystemInfoSync()
    height = res.windowHeight
    console.log("app" + app.globalData.height)
  },
  onReady:function(){
    var that = this
    //加载地图
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        request.sendRrquest(app.pathUrl.url + "weixin/location.json", 'POST',
          { latitude: latitude, longitude: longitude })
          .then(function (response) {
            response = response.data
          that.setData({
            city: response.map.result.address_component.city
          })


            
          }, function (error) {
            console.log(error);
          });
      }
    })
    app.showLoading();
    request.sendRrquest(app.pathUrl.url + "goods/index.json", 'POST',this.data.goods)
      .then(function (response) {
        response = response.data;
        if (response.code === 200) {
          that.setData({
            hot_goods: response.goods
          })
        }
        app.hideLoading();
      }, function (error) {
        console.log(error);
      });
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  selectSection:function(event){
      let index = parseInt(event.currentTarget.dataset.index);
      this.setData({ 
        current_id: index,
        goods:{
          pageIndex: 1,
          pageSize: 6
        }
      })
      console.lo
      //特色美食
      if (index === 1){
        var that = this
        request.sendRrquest(app.pathUrl.url + "goods/index.json", 'POST', this.data.goods)
          .then(function (response) {
            response = response.data;
            if (response.code === 200) {
              that.setData({
                common_goods: response.goods
              })
            }
          }, function (error) {
            console.log(error);
          });
      } else if (index === 2) {
        var that = this
        request.sendRrquest(app.pathUrl.url + "goods/index.json", 'POST', this.data.goods)
          .then(function (response) {
            response = response.data;
            if (response.code === 200) {
              that.setData({
                common_goods: response.goods
              })
            }
          }, function (error) {
            console.log(error);
          });
      } else if (index === 3) {
        var that = this
        request.sendRrquest(app.pathUrl.url + "goods/index.json", 'POST', this.data.goods)
          .then(function (response) {
            response = response.data;
            if (response.code === 200) {
              that.setData({
                common_goods: response.goods
              })
            }
          }, function (error) {
            console.log(error);
          });
      }
      
  },
  showdetail:function(event){
      let good = {}
      let index = parseInt(event.currentTarget.dataset.index)
      if(this.data.current_id == 0){
        good = this.data.hot_goods[index]
      }else{
        good = this.data.common_goods[index]
        console.log(good);
      }
      let params = app.objcToString(good)
      wx.navigateTo({
        url: '../shopdetail/shopdetail?' + params,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
  onShareAppMessage: function () {
    return {
      title: '麻小外卖',
      desc: '小程序分享测试',
      path: '/pages/index/index'
    }
  },
  chooseAddress:function(){
    wx.navigateTo({
      url: '../addAddress/addAddress',
      success: function(res){
      },
      fail: function() {
      }
    })
  },
  // 跳转到购物车界面
  showshopcar:function(){
    wx.navigateTo({
         url: '../buycar/buycar'
       })
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
  lower: function (e) {
    if (this.data.isData){
      this.setData({
      pageIndex:this.data.goods.pageIndex++
    })
    var that = this
    request.sendRrquest(app.pathUrl.url + "goods/index.json", 'POST', this.data.goods)
      .then(function (response) {
        response = response.data;
        if (response.goods.length >= 6){
          if (response.code === 200) {
            that.setData({
              hot_goods:that.data.hot_goods.concat(response.goods)
            })
          }
        }else{
          that.setData({
            isData:false
          })
        }
      }, function (error) {
        console.log(error);
      });
    }
  },
  lowers:function(){
    this.setData({
      pageIndex: this.data.goods.pageIndex++
    })
    var that = this
    request.sendRrquest(app.pathUrl.url + "goods/index.json", 'POST', this.data.goods)
      .then(function (response) {
        response = response.data;
        if (response.goods.length >= 6) {
          if (response.code === 200) {
            that.setData({
              common_goods: that.data.common_goods.concat(response.goods)
            })
          }
        } else {
          
        }
      }, function (error) {
        console.log(error);
      });
  }
})
