import { Mat4, Vec3 } from './math'
import { WebGLRenderer } from 'three'

import TestScene from './scenes/TestScene/TestScene'

let renderer = new WebGLRenderer()

document.body.style.margin = '0'
document.body.appendChild(renderer.domElement)
let reactMain = document.createElement('div')
reactMain.id = 'react-main'
reactMain.style.position = 'absolute'
reactMain.style.zIndex = '1'
reactMain.style.top = '0'
reactMain.style.left = '0'
reactMain.style.height = '100%'
reactMain.style.width = '100%'
document.body.appendChild(reactMain)

let scene = new TestScene(renderer)
scene.load().then(() => {
  scene.start()
})
