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
  CylinderGeometry,
  MeshStandardMaterial,
  AmbientLight,
  PointLight,
  Color,
  Raycaster
} from 'three'
import * as THREE from 'three'
import * as makeOrbit from 'three-orbit-controls'
let OrbitControls = makeOrbit(THREE)

import { createElement } from 'react'
import { render } from 'react-dom'

import IScene from '../Scene'
import { Loop } from '../../loop'
import TestSceneUi from './TestSceneUi'
import { default as Grid, GridCell } from '../../util/Grid'

function gridColor (row: number, col: number): Color {
  return new Color(row / 20, col / 20, 1)
}

function resetColor (cell: GridCell) {
  if (!cell.mesh) return
  let mat = cell.mesh.material as MeshStandardMaterial
  let color = gridColor(cell.row, cell.col)
  mat.color = color
}

export default class TestScene implements IScene {
  private loop: Loop
  private scene = new Scene()
  private camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
  private terrain: Grid
  private pawn = new Mesh(new CylinderGeometry(0.5, 1, 4), new MeshStandardMaterial({
    color: '#fff'
  }))
  private raycaster = new Raycaster()
  constructor (private renderer: Renderer) {}

  async load (): Promise<any> {
    this.terrain = Grid.empty(20, 20)
    for (let cell of this.terrain) {
      cell.mesh = new Mesh(new BoxGeometry(5, 1, 5), new MeshStandardMaterial({
        color: gridColor(cell.row, cell.col).getStyle()
      }))
      cell.mesh.position.x = cell.row * 5 - 50
      cell.mesh.position.z = cell.col * 5 - 50
      cell.mesh.position.y = -1
      cell.mesh.userData.row = cell.row
      cell.mesh.userData.col = cell.col
    }
  }

  start () {
    this.scene.add(new AmbientLight('#fff'))
    let light = new PointLight('#fff', 0.2, 100)
    light.position.set(0, 10, 0)
    this.scene.add(light)
    this.terrain.addToScene(this.scene)
    this.pawn.position.y = 2
    this.scene.add(this.pawn)
    this.camera.position.z = 12
    this.camera.position.y = 5
    let controls = new OrbitControls(this.camera)
    let time = 0
    let frames = 0

    let paused = false
    let reactMain = document.getElementById('react-main')
    if (!reactMain) return
    let elem = render(createElement(TestSceneUi, {
      pause: () => {
        paused ? this.unpause() : this.pause()
        paused = !paused
        elem.setState({paused})
      },
      move: () => {
        if (this.terrain.selectedCell && this.terrain.selectedCell.mesh) {
          this.pawn.position.x = this.terrain.selectedCell.mesh.position.x
          this.pawn.position.z = this.terrain.selectedCell.mesh.position.z
          resetColor(this.terrain.selectedCell)
          this.terrain.unselectCell()
        }
      }
    }), reactMain)

    reactMain.addEventListener('click', (event) => {
      let mouse = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: - (event.clientY / window.innerHeight) * 2 + 1
      }

      this.raycaster.setFromCamera(mouse, this.camera)
      let objs = this.raycaster.intersectObjects(this.scene.children, true)

      if (objs.length) {
        let target = objs[0].object
        let oldSelected = this.terrain.selectedCell
        if (oldSelected && oldSelected.mesh) {
          resetColor(oldSelected)

          if (oldSelected.row === target.userData.row && oldSelected.col === target.userData.col) {
            elem.setState({selectedCell: false})
            return
          }
        }
        this.terrain.selectCell(target.userData.row, target.userData.col)
        let selectedCell = this.terrain.selectedCell
        if (selectedCell) {
          (selectedCell.mesh && (selectedCell.mesh.material as MeshStandardMaterial).color.setHex(0x00ff00))
          elem.setState({selectedCell: true})
        }
      }
    })

    this.loop = new Loop(dt => {
      time += dt
      frames ++
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
