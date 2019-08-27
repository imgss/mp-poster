// 下载图片
function downImg(url) {
  if (!url) {
    console.error('图片url 不能为空');
    throw new Error('图片url 不能为空');
  }
  if (/wxfile\:\/\//.test(url)) {
    return cache[url];
  }
  if (cache[url]) {
    return cache[url];
  }
  return new Promise(function(resolve, reject) {
    wx.downloadFile({
      url: url,
      success: (res)=>{
        resolve(res.tempFilePath);
        cache[url] = res.tempFilePath;
      },
      fail: (err)=>{
        reject(err);
      }
    });
  });
}
// 图片临时地址缓存
const cache = {};

class Sprite {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
  }
}

class Image extends Sprite {
  constructor (config) {
    super(config);
    this.src = config.src;
    this.radius = config.radius;
  }

  async draw(ctx) {
    ctx.save();
    let src = await downImg(this.src);
    if (this.radius === '50%') {
      this.r = this.width / 2;
      ctx.beginPath();
      ctx.arc(this.x + this.r, this.y + this.r, this.r, 0, 2*Math.PI);
      ctx.clip();
    }
    ctx.drawImage(src, this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}


class Text extends Sprite {
  constructor (config) {
    super(config);
    this.text = config.text;
    this.color = config.color;
    this.font = config.font || '12px sans-serif';
    this.width = config.width;
    this.fontSize = +this.font.match(/\d+/)[0];
  }

  async draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    // 判断是否需要折行
    let multiLine = false;

    if (/\n/.test(this.text)) {
      multiLine = true;
    }

    if (this.width || multiLine) {
      let len = Math.floor(this.width / this.fontSize);
      let row = null;
      let arr = [];
      if (multiLine) {
        arr = this.text.split('\n');
        row = arr.length;
      } else {
        row = Math.ceil(this.width / len);
      }

      if (row === 1) {
        ctx.fillText(this.text, this.x, this.y + this.fontSize);
      } else {
        if (!multiLine) {
          for (let i = 0; i < row; i++) {
            arr.push(this.text.substr(i * len, len));
          }
        }
        arr.forEach((str, i) => ctx.fillText(str, this.x, this.y + this.fontSize * (i + 1) * 1.2));
      }

    } else {
      ctx.fillText(this.text, this.x, this.y + this.fontSize);
    }

    ctx.restore();
  }
}

class Poster {
  constructor({width, height, scale, canvasId}) {
    if (!canvasId) {
      throw new Error('请传入canvasId');
    }
    this.width = width;
    this.height = height;
    this.scale = scale || 1;
    this.canvasId = canvasId;
    this.ctx = wx.createCanvasContext(canvasId);
  }
  async draw(steps) {
    let ctx = this.ctx;
    ctx.scale(this.scale, this.scale);
    let omTree = [];
    const typeMap = {
      img: Image,
      text: Text
    };
    for (let i = 0, len = steps.length; i < len; i++) {
      let sprite = steps[i];
      // 如果step中有draw方法，直接调用
      if (sprite.draw && Object.prototype.toString.call(sprite.draw) === '[object Function]') {
        sprite.type = 'custom';
        omTree.push(sprite);
        continue;
      }
      // 解析简单的表达式
      if (i > 0 && /^\+\d+$/.test(sprite.x)) {
        if (!steps[i - 1].x && steps[i - 1].x !== 0) {
          throw  new Error(i + '节点的上一个节点没有x坐标值');
        }
        sprite.x = steps[i - 1].x + Number(sprite.x.slice(1));
      }

      if (i > 0 && /^\+\d+$/.test(sprite.y)) {
        if (!steps[i - 1].y && steps[i - 1].y !== 0) {
          throw  new Error(i + '节点的上一个节点没有y坐标值');
        }
        sprite.y = steps[i - 1].y + Number(sprite.y.slice(1));
      }

      omTree.push(new typeMap[sprite.type](sprite));
    }

    for (let om of omTree) {
        await om.draw(ctx);
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
            console.log(res);
            resolve(res.tempFilePath);
          },
          fail(err) {
            reject(err);
          }
        });
      });
    });

  }
  clear() {
    this.ctx.scale(1, 1);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.draw();
  }
}

export default Poster;