//index.js
//获取应用实例
const app = getApp()
import Poster from '../lib/canvas'
Page({
  data: {
    src: ''
  },

  onLoad: function () {
    let steps = []
    steps.push({
      type: 'img',
      x: 0,
      y: 0,
      width: 225,
      height: 400,
      src: 'https://emp2.nncz.cn/static/img/planet/background.png'
    }, {
      type: 'text',
      x: 13,
      y: 75,
      text: '认真细心',
      color: '#000000',
      font: '7px sans-serif'
    },{
      type: 'img',
      x: 70,
      y: 64,
      width: 81,
      height: 81,
      src: 'https://nnemp-product-1254101407.cos.ap-shanghai.myqcloud.com/icon/boy.png'
    },{
      type: 'img',
      x: 20,
      y: 317,
      radius: '50%',
      width: 15,
      height: 15,
      src: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJV8b5F5w9TRtnIvZEX0VHYTC8k1icXIkh2eh5dyytRd8Njicld2vFcbBicryLAsibxVEicdvLaE9tc7yQ/132'
    },{
      type: 'img',
      x: '+8',
      y: 317,
      radius: '50%',
      width: 15,
      height: 15,
      src: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJV8b5F5w9TRtnIvZEX0VHYTC8k1icXIkh2eh5dyytRd8Njicld2vFcbBicryLAsibxVEicdvLaE9tc7yQ/132'
    },{
      type: 'text',
      x: 69,
      y: 317,
      text: '都送出了祝福',
      color: '#ffffff',
      font: '10px sans-serif'
    })
    let poster = new Poster(225, 400, 3, 'app')
    console.log(poster)
    poster.draw(steps).then((tmpPath) => {
      console.log('success')
      this.setData({
        src: tmpPath
      })
      // wx.saveImageToPhotosAlbum({
      //   filePath: tmpPath,
      //   success: ()=>{},
      //   fail: ()=>{}
      // });
    })
  }
})
