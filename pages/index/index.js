//index.js
//获取应用实例
const app = getApp()
import Poster from '../lib/poster'
Page({
  data: {
    src: ''
  },

  getPoster: function () {
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
      x: 15,
      y: 72,
      text: '认真细心',
      color: '#000000',
      font: '9px sans-serif'
    },{
      type: 'img',
      x: 70,
      y: 64,
      width: 81,
      height: 81,
      src: 'https://nnemp-product-1254101407.cos.ap-shanghai.myqcloud.com/icon/boy.png'
    },{
      draw: function(ctx) {
        
        ctx.fillStyle = '#f00000';
        ctx.fillRect(10, 10, 100, 100);
      }
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
      type: 'img',
      x: '+8',
      y: 317,
      radius: '50%',
      width: 15,
      height: 15,
      src: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJV8b5F5w9TRtnIvZEX0VHYTC8k1icXIkh2eh5dyytRd8Njicld2vFcbBicryLAsibxVEicdvLaE9tc7yQ/132'
    },{
      type: 'text',
      x: '+16',
      y: 317,
      text: '都送出了祝福😊',
      color: '#ffffff',
      font: '10px sans-serif'
    },{
      type: 'text',
      x: 48,
      y: 250,
      width: 142,
      text: '“妈妈希望你在新的一岁平安健康快乐成长！“',
      color: '#222333',
      font: '10px sans-serif'
    })
    let poster = new Poster({
      width: 225, 
      height: 400, 
      scale: 3, 
      canvasId: 'app'
    })
    console.log(poster)
    poster.draw(steps).then((tmpPath) => {
      console.log('success')
      this.setData({
        src: tmpPath
      })
    })
  }
})
