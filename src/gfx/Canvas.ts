import Gfx from './Gfx'
export default class Canvas {
  private canvas: HTMLCanvasElement

  constructor () {
    const canvas = document.createElement('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    document.body.appendChild(canvas)
    document.body.style.margin = '0'
    this.canvas = canvas
  }

  get context (): Gfx {
    return new Gfx(this.canvas)
  }

  fitWindow () {
    const displayHeight = this.canvas.clientHeight
    const displayWidth = this.canvas.clientWidth

    if (this.canvas.height !== displayHeight ||
        this.canvas.width !== displayWidth) {
      this.canvas.height = displayHeight
      this.canvas.width = displayWidth
    }
  }
}
