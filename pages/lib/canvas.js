class Sprite {
  constructor(config) {
    this.left = config.left
    this.top = config.top
    this.width = config.width
    this.height = config.height
  }
}
class Image extends Sprite {
  constructor (config) {
    super(config)
    this.src = config.src
  }

  draw(ctx) {
    ctx.drawImage(this.src, 0, 0, this.width, this.height)
  }
}


class Text extends Sprite {
  constructor (config) {
    super(config)
    this.text = config.text
  }
}
export default function(ctx, steps) {
  console.log(ctx, steps)
  let omTree = []
  const typeMap = {
    img: Image,
    text: Text
  }
  for (let step of steps) {
    omTree.push(new typeMap[step.type](step))
  }

  for (let om of omTree) {
    om.draw(ctx)
  }
  ctx.draw()

}