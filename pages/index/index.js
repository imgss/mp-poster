//index.js
//获取应用实例
const app = getApp()
import posterDrawer from '../lib/canvas'
Page({
  data: {
  },

  onLoad: function () {
    let steps = []
    wx.downloadFile({
      url: 'https://emp2.nncz.cn/static/img/planet/background.png',
      success: (res)=>{
        steps.push({
          type: 'img',
          left: 0,
          top: 0,
          width: 1500,
          height: 2668,
          src: res.tempFilePath
        })
        let ctx = wx.createCanvasContext('app', this);
        posterDrawer(ctx, steps)
      },
      fail: ()=>{}
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
