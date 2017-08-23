declare module '*.glsl' {
  const shader: string
  export = shader
}

declare module '*.json' {
  const json: any
  export = json
}

declare module 'three-orbit-controls' {
  const fn: (three: any) => any
  export = fn
}
