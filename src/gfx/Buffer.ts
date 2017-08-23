import Gfx from './Gfx'
export default class Buffer {
  public buf: WebGLBuffer
  constructor (private gfx: Gfx) {
    const buf = gfx.gl.createBuffer()
    if (!buf) throw new Error('Could not create buffer')
    this.buf = buf
  }

  setData (data: Float32Array, usage: number = this.gfx.gl.STATIC_DRAW) {
    const gl = this.gfx.gl
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf)
    gl.bufferData(gl.ARRAY_BUFFER, data, usage)
  }
}
