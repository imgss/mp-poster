
class Sprite {
  constructor(config) {
    this.x = config.x
    this.y = config.y
    this.width = config.width
    this.height = config.height
  }
}

class Image extends Sprite {
  constructor (config) {
    super(config)
    this.src = config.src
    this.radius = config.radius
  }

  async draw(ctx) {
    ctx.save()
    let src = await downImg(this.src)
    if (this.radius === '50%') {
      this.r = this.width / 2
      ctx.beginPath()
      ctx.arc(this.x + this.r, this.y + this.r, this.r, 0, 2*Math.PI)
      ctx.clip()
    }
    ctx.drawImage(src, this.x, this.y, this.width, this.height)
    ctx.restore()
  }
}


class Text extends Sprite {
  constructor (config) {
    super(config)
    this.text = config.text
    this.color = config.color
    this.font = config.font
    this.fontSize = +this.font.match(/\d+/)[0]
    console.log(this.fontSize)
  }

  async draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.font = this.font
    ctx.fillText(this.text, this.x, this.y + this.fontSize);
    ctx.restore();
  }
}

function downImg(url) {
  return new Promise(function(resolve, reject) {
    wx.downloadFile({
      url: url,
      success: (res)=>{
        resolve(res.tempFilePath)
      },
      fail: ()=>{
        reject(err)
      }
    });
  })
}

class Poster {
  constructor(width, height, scale, canvasId) {
    this.width = width
    this.height = height
    this.scale = scale
    this.canvasId = canvasId
    this.ctx = wx.createCanvasContext(canvasId);
  }
  async draw(steps) {
    console.log(ctx, steps)
    let ctx = this.ctx
    ctx.scale(this.scale, this.scale)
    let omTree = []
    const typeMap = {
      img: Image,
      text: Text
    }
    for (let i = 0, len = steps.length; i < len; i++) {
      let sprite = steps[i];
      if (i > 0 && /^\+\d+$/.test(sprite.x)) {
        sprite.x = steps[i - 1].x + Number(sprite.x.slice(1))
      }
      omTree.push(new typeMap[sprite.type](sprite))
    }

    for (let om of omTree) {
      await om.draw(ctx)
    }
    return new Promise((resolve, reject) => {
      ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: this.width * this.scale,
          height: this.height * this.scale,
          canvasId: this.canvasId,
          quality: 0.8,
          success(res) {
            console.log(res)
            resolve(res.tempFilePath)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    })

  }
  clear() {
    this.ctx.scale(1, 1);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.draw();
  }
}

export default Poster