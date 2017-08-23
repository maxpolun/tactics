
export interface GlInfo {
  uniforms: UniformInfo,
  attribs: AttribInfo
}

interface UniformInfo {
  [type: number]: {
    size: number,
    bind: (loc: WebGLUniformLocation) => (input: any) => void
    bindArray: ((loc: WebGLUniformLocation) => (input: any) => void) | undefined
  }
}

interface AttribInfo {
  [type: number]: {
    size: number,
    bind: (loc: number) => (binding: any) => void
  }
}

let glInfo: GlInfo | null = null

export function getGlInfo (gl: WebGLRenderingContext): GlInfo {
  if (glInfo) return glInfo
  return makeGlInfo(gl)
}

function makeGlInfo (gl: WebGLRenderingContext): GlInfo {
  function bindFloat (loc: number): (binding: any) => void {
    return binding => {
      gl.bindBuffer(gl.ARRAY_BUFFER, binding.buffer.buf)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(
        loc,
        binding.count,
        binding.type || gl.FLOAT,
        binding.normalize || false,
        binding.stride || 0,
        binding.offset || 0
      )
    }
  }
  const info: GlInfo = {
    uniforms: {
      [gl.FLOAT]: {
        size: 4,
        bind: (loc) => (input) => gl.uniform1f(loc, input),
        bindArray: (loc) => (input) => gl.uniform1fv(loc, input)
      },
      [gl.FLOAT_MAT4]: {
        size: 64,
        bind: (loc) => (input) => gl.uniformMatrix4fv(loc, false, input),
        bindArray: undefined
      }
    },
    attribs: {
      [gl.FLOAT]: {
        size: 4,
        bind: bindFloat
      },
      [gl.FLOAT_VEC2]: {
        size: 8,
        bind: bindFloat
      },
      [gl.FLOAT_VEC3]: {
        size: 12,
        bind: bindFloat
      },
      [gl.FLOAT_VEC4]: {
        size: 16,
        bind: bindFloat
      }
    }
  }
  glInfo = info
  return info
}
