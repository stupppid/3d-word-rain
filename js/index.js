import * as THREE from 'three'
import Word from './Word'
import WordList from './WordList'

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 20000)
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
let geometry = new THREE.BoxGeometry(1, 1, 1)
let mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

let texts = []
var loader = new THREE.FontLoader()
let textGeometry = null
let text = null
loader.load('fonts/Arial_Bold.json', function (font) {
  textGeometry = new THREE.TextGeometry('Hello three.js!', {
    font: font,
    size: 100,
    height: 10,
    curveSegments: 10
  })
  text = new THREE.Mesh(textGeometry, material)
  scene.add(text)
})

camera.position.z = 10000

function animate () {
  window.requestAnimationFrame(animate)
  mesh.rotation.x += 0.1
  renderer.render(scene, camera)
}
animate()
