import * as THREE from 'three'

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight)
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let meterial = new THREE.Material({color: 0xff2222})
let geometry = new THREE.BoxGeometry(1,1)
let mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

function animate(){
    requestAnimationFrame(animate)
    mesh.rotation.x += .1
    renderer.render(scene,camera)
}

