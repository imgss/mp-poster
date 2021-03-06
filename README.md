# 一个绘制小程序分享海报的库

看一个例子：

```html
<view style="position:fixed;top:0;left:-2000px">
  <canvas canvas-id="app" style='width:1000px;height:2000px'></canvas>
</view>
```

```js
    // 创建一个poster实例
    let poster = new Poster({
      width: 225, 
      height: 400, 
      scale: 3, // 会生成675x1200的图像
      canvasId: 'app'
    }) // 海报的长度，高度， 缩放比，canvasId


    // 绘制步骤
    /*
    * 目前支持普通图片，圆形图片，单行文字，多行文字的绘制
    *
    */
    let steps = []
    steps.push({
      type: 'img', //一个图片
      x: 0,
      y: 0,
      width: 225,
      height: 400,
      src: 'https://emp2.nncz.cn/static/img/planet/background.png'
    }, {
      type: 'text', //一行文字
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
      type: 'img',
      x: 20,
      y: 317,
      radius: '50%', // 一个圆形图片
      width: 15,
      height: 15,
      src: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJV8b5F5w9TRtnIvZEX0VHYTC8k1icXIkh2eh5dyytRd8Njicld2vFcbBicryLAsibxVEicdvLaE9tc7yQ/132'
    },{
      type: 'img',
      x: '+8', // 在前一个的x坐标基础上+8
      y: 317,
      radius: '50%',
      width: 15,
      height: 15,
      src: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJV8b5F5w9TRtnIvZEX0VHYTC8k1icXIkh2eh5dyytRd8Njicld2vFcbBicryLAsibxVEicdvLaE9tc7yQ/132'
    },{
      type: 'img',
      x: '+0',
      y: '+8', // 在前一个的y坐标基础上+8
      radius: '50%',
      width: 15,
      height: 15,
      src: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJV8b5F5w9TRtnIvZEX0VHYTC8k1icXIkh2eh5dyytRd8Njicld2vFcbBicryLAsibxVEicdvLaE9tc7yQ/132'
    },{
      type: 'text',
      x: 48,
      y: 250,
      width: 142, // 超过了文字宽度时，超出宽度会折行，\n可以强制换行
      text: '“妈妈希望你在新的一岁平安健康快乐成长！“',
      color: '#222333',
      font: '10px sans-serif'
    },{
      draw: function(ctx) { // 传入一个有draw方法的object
        ctx.fillStyle = '#f00000';
        ctx.fillRect(10, 10, 100, 100);
      }
    })


    poster.draw(steps).then((tmpPath) => {
      console.log(tmpPath) //绘制完成后会拿到tmpPath
      this.setData({
        src: tmpPath
      })
      // 保存海报
      wx.saveImageToPhotosAlbum({
        filePath: tmpPath,
        success: ()=>{},
        fail: ()=>{}
      });
    })

```

## TODO

- 完善对形状的支持
- 完善文档
- 希望可以通过拖放界面生成steps

## Lisence

MIT

## 注意⚠️

由于使用到了 async 函数，在原生小程序使用时，项目中需要配置增强编译
