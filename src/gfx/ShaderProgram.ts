import Gfx from './Gfx'
import Buffer from './Buffer'
import { GlInfo, getGlInfo } from './GlInfo'

export interface AttribBinding {
  name: string,
  buf: Buffer
}

export default class ShaderProgram {
  public prog: WebGLProgram
  private vertexCompiled: WebGLShader
  private fragmentCompiled: WebGLShader
  private attributes: Map<string, (binding: any) => void> = new Map()
  private uniforms: Map<string, (value: any) => void> = new Map()
  private info: GlInfo
  constructor (
    private gfx: Gfx,
    private vertexText: string,
    private fragmentText: string) {
    this.info = getGlInfo(this.gfx.gl)
    this.compile()
  }

  compile () {
    const gl = this.gfx.gl
    this.fragmentCompiled = createShader(gl, gl.FRAGMENT_SHADER, this.fragmentText)
    this.vertexCompiled = createShader(gl, gl.VERTEX_SHADER, this.vertexText)
    this.prog = makeProgram(gl, this.vertexCompiled, this.fragmentCompiled)
    this.lookupAttribs()
    this.lookupUniforms()
  }

  setFrag (frag: string) {
    this.fragmentText = frag
    this.compile()
  }

  setVert (vert: string) {
    this.vertexText = vert
    this.compile()
  }

  use () {
    this.gfx.gl.useProgram(this.prog)
  }

  bindBuffer (name: string, binding: {
    buffer: Buffer,
    count?: number,
    type?: number,
    normalize?: boolean,
    stride?: number,
    offset?: number
  }) {
    const bind = this.attributes.get(name)
    if (bind) {
      bind(binding)
    } else {
      console.warn('tried to bind missing attrib', name)
    }
  }

  bindUniform (name: string, value: any) {
    const bind = this.uniforms.get(name)
    if (bind) {
      bind(value)
    } else {
      console.warn('tried to bind missing uniform', name)
    }
  }

  private lookupAttribs () {
    let prog = this.prog
    let gl = this.gfx.gl

    let numAttrib = gl.getProgramParameter(prog, gl.ACTIVE_ATTRIBUTES)
    for (let i = 0; i < numAttrib; i++) {
      const attribInfo = gl.getActiveAttrib(prog, i)
      if (!attribInfo) return

      const loc = gl.getAttribLocation(prog, attribInfo.name)
      const typeInfo = this.info.attribs[attribInfo.type]
      this.attributes.set(attribInfo.name, typeInfo.bind(loc))
    }
  }

  private lookupUniforms () {
    let prog = this.prog
    let gl = this.gfx.gl

    let numUniforms = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS)
    for (let i = 0; i < numUniforms; i++) {
      const uniformInfo = gl.getActiveUniform(prog, i)
      if (!uniformInfo) return

      const loc = gl.getUniformLocation(prog, uniformInfo.name)
      if (!loc) continue
      const typeInfo = this.info.uniforms[uniformInfo.type]
      this.uniforms.set(uniformInfo.name, typeInfo.bind(loc))
    }
  }
}

function createShader (gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  let shader = gl.createShader(type)
  if (!shader) throw new Error('unable to create shader')
  gl.shaderSource(shader, src)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error('error compiling shader:' + log)
  }
  return shader
}

function makeProgram (gl: WebGLRenderingContext, vert: WebGLShader, frag: WebGLShader): WebGLProgram {
  const prog = gl.createProgram()
  if (!prog) throw new Error('unable to create program')
  gl.attachShader(prog, vert)
  gl.attachShader(prog, frag)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error('error linking program: ' + gl.getProgramInfoLog(prog))
  }
  return prog
}
