import {
  Renderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  WireframeGeometry,
  JSONLoader,
  Mesh,
  LineSegments,
  Object3D,
  Vector3,
  CylinderGeometry
} from 'three'
import * as THREE from 'three'
import * as makeOrbit from 'three-orbit-controls'
let OrbitControls = makeOrbit(THREE)

import { createElement } from 'react'
import { render } from 'react-dom'

import IScene from '../Scene'
import { Loop } from '../../loop'
import TestSceneUi from './TestSceneUi'

export default class TestScene implements IScene {
  private loop: Loop
  private scene = new Scene()
  private camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
  private terrain: LineSegments
  private pawn = new Mesh(new CylinderGeometry(0.5, 1, 4))
  constructor (private renderer: Renderer) {}

  async load (): Promise<any> {
    let json = await import('./terrain.json')
    let loader = new JSONLoader()
    let {geometry} = loader.parse(json, '')
    this.terrain = new Mesh(geometry)
  }

  start () {
    this.scene.add(this.terrain)
    this.pawn.position.y = 2
    this.scene.add(this.pawn)
    this.camera.position.z = 12
    this.camera.position.y = 5
    let controls = new OrbitControls(this.camera)
    let time = 0
    let frames = 0

    let paused = false
    let elem = render(createElement(TestSceneUi, {
      pause: () => {
        paused ? this.unpause() : this.pause();
        paused = !paused
        elem.setState({paused})
      }
    }), document.getElementById('react-main'))

    this.loop = new Loop(dt => {
      time += dt
      frames ++
      this.pawn.position.x = 5 * Math.cos(time / 500)
      this.pawn.position.z = 5 * Math.sin(time / 500)
      this.draw(dt)
      if (frames % 100 === 0) {
        elem.setState({fps: frames / time * 1000})
      }
    })

    this.loop.loop()
  }

  draw (dt: number) {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.render(this.scene, this.camera)
  }

  pause () {
    this.loop.pause()
  }

  unpause () {
    this.loop.unpause()
  }

  onChange (cb: any) {
    // do nothing
  }
}
