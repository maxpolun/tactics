export default class Gfx {
  public gl: WebGLRenderingContext
  constructor (canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) throw new Error('could not initialize gl context')
    this.gl = gl
  }

  clear () {
    const gl = this.gl
    gl.clearColor(0, 0, 0, 1)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }

  fullsizeViewport () {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
  }

  draw (start: number, end: number) {
    const gl = this.gl

    gl.drawArrays(gl.TRIANGLES, start, end)
  }
}
