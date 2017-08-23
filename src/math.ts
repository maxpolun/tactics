import { vec3, mat4 } from 'gl-matrix'

type Radians = number

export function fromDegrees (degrees: number): Radians {
  return degrees / 360 * 2 * Math.PI
}

export function fromRadians (radians: number): Radians {
  return radians
}

export class Vec3 {

  constructor (public data: vec3) {
  }

  static fromParts (x: number, y: number, z: number): Vec3 {
    return new Vec3(vec3.fromValues(x, y, z))
  }

  static fromVec (vec: Vec3) {
    return new Vec3(vec3.clone(vec.data))
  }

  static fromArr (arr: Float32Array) {
    return new Vec3(arr as vec3)
  }

  clone (): Vec3 {
    return Vec3.fromVec(this)
  }

  add (other: Vec3): Vec3 {
    return this.clone().addEq(other)
  }

  addEq (other: Vec3): Vec3 {
    vec3.add(this.data, this.data, other.data)
    return this
  }

  negEq (): Vec3 {
    vec3.negate(this.data, this.data)
    return this
  }

  neg (): Vec3 {
    return this.clone().negEq()
  }

  subEq (other: Vec3): Vec3 {
    vec3.sub(this.data, this.data, other.data)
    return this
  }

  sub (other: Vec3): Vec3 {
    return this.clone().subEq(other)
  }

  mag2 (): number {
    return vec3.sqrLen(this.data)
  }

  mag (): number {
    return vec3.len(this.data)
  }

  norm (): Vec3 {
    return this.clone().normEq()
  }

  normEq (): Vec3 {
    vec3.normalize(this.data, this.data)
    return this
  }

  scaleEq (factor: number): Vec3 {
    vec3.scale(this.data, this.data, factor)
    return this
  }

  scale (factor: number): Vec3 {
    return this.clone().scaleEq(factor)
  }

  dot (other: Vec3): number {
    return vec3.dot(this.data, other.data)
  }

  crossEq (other: Vec3): Vec3 {
    vec3.cross(this.data, this.data, other.data)
    return this
  }

  cross (other: Vec3): Vec3 {
    return this.clone().crossEq(other)
  }
}

export class Mat4 {
  constructor (public data: mat4) {}

  static fromParts (c1r1: number, c1r2: number, c1r3: number, c1r4: number,
         c2r1: number, c2r2: number, c2r3: number, c2r4: number,
         c3r1: number, c3r2: number, c3r3: number, c3r4: number,
         c4r1: number, c4r2: number, c4r3: number, c4r4: number): Mat4 {
    let data = mat4.fromValues(
    c1r1, c1r2, c1r3, c1r4,
    c2r1, c2r2, c2r3, c2r4,
    c3r1, c3r2, c3r3, c3r4,
    c4r1, c4r2, c4r3, c4r4)
    return new Mat4(data)
  }

  static Identity (): Mat4 {
    return new Mat4(mat4.create())
  }

  static fromMat (m: Mat4): Mat4 {
    return new Mat4(mat4.clone(m.data))
  }

  clone () {
    return Mat4.fromMat(this)
  }

  addEq (other: Mat4): Mat4 {
    mat4.add(this.data, this.data, other.data)
    return this
  }

  add (other: Mat4): Mat4 {
    return this.clone().addEq(other)
  }

  scaleEq (factor: number): Mat4 {
    mat4.multiplyScalar(this.data, this.data, factor)
    return this
  }

  mult (other: Mat4): Mat4 {
    let newM = this.clone()
    mat4.multiply(newM.data, this.data, other.data)

    return newM
  }

  translateEq (v: Vec3): Mat4 {
    mat4.translate(this.data, this.data, v.data)
    return this
  }

  translate (v: Vec3): Mat4 {
    return this.clone().translateEq(v)
  }

  frustrumEq (
      left: number,
      right: number,
      bottom: number,
      top: number,
      near: number,
      far: number): Mat4 {
    mat4.frustum(this.data, left, right, bottom, top, near, far)
    return this
  }

  lookAtEq (
    cameraPos: Vec3,
    targetPos: Vec3,
    up: Vec3): Mat4 {
    mat4.lookAt(this.data, cameraPos.data, targetPos.data, up.data)
    return this
  }

  // sets the matrix to be a bare rotation matrix
  setRotation (angle: Radians, axis: Vec3) {
    mat4.fromRotation(this.data, angle, axis.data)
  }

  // rotates matrix, without resetting other properties
  rotateEq (angle: Radians, axis: Vec3) {
    mat4.rotate(this.data, this.data, angle, axis.data)
  }

  multVec (v: Vec3): Vec3 {
    let ret = Vec3.fromParts(0, 0, 0)
    vec3.transformMat4(ret.data, v.data, this.data)
    return ret
  }
}
