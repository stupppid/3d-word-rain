let THREE = require('three')
let Word = require('./word')
let WordList = require('./wordList')

let rain = function (fontPath) {
  let scene = new THREE.Scene()
  let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
  let cameraMaster = new THREE.Object3D()
  cameraMaster.add(camera)
  scene.add(cameraMaster)
  let renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  let greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  let whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  let loader = new THREE.FontLoader()
  let textGeometry = null
  let text = null
  let font = null
  let geometrys = []
  let matrixLength = 25
  let fontSize = 10
  let matrixSpaceInterval = 70
  // 设置摄像头位置
  let cameraInit = (matrixSpaceInterval + fontSize) * matrixLength / 2
  cameraMaster.position.x = cameraInit
  cameraMaster.position.y = -cameraInit
  cameraMaster.position.z = cameraInit
  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 0
  let keyframeInterval = 60 / 6
  loader.load(fontPath || 'fonts/Arial_Bold.json', function (f) {
    font = f
    init()
  })
  function getTextGeometry (text) {
    if (!geometrys[text]) {
      geometrys[text] = new THREE.TextGeometry(text, {
        font: font,
        size: fontSize,
        height: 1,
        curveSegments: 1
      })
    }
    return geometrys[text]
  }
  let all = []
  // 等待字体加载完毕执行
  function init () {
    textGeometry = getTextGeometry('')
    text = new THREE.Mesh(textGeometry, greenMaterial)
    let textColne = null
    for (let i = 0; i < matrixLength; i++) {
      let dim = []
      for (let j = 0; j < matrixLength; j++) {
        let words = new WordList()
        for (let k = 0; k < matrixLength; k++) {
          let word = new Word(words)
          textColne = text.clone()
          textColne.geometry = getTextGeometry('')
          textColne.position.x += matrixSpaceInterval * i
          textColne.position.z += matrixSpaceInterval * j
          // 必须是最底层循环设置y
          textColne.position.y -= matrixSpaceInterval * k
          word.el = textColne
          scene.add(textColne)
          words.addWord(word)
        }
        dim.push(words)
      }
      all.push(dim)
    }
    console.log(all)
  }

  let mx = 0
  let my = 0
  let wheel = 0
  // 添加事件
  function addEvents () {
    document.addEventListener('mousemove', function (event) {
      if (event.buttons === 1) {
        mx += event.movementX * 2 / window.innerWidth
        my += event.movementY * 2 / window.innerHeight
      }
    })

    document.addEventListener('mousewheel', function (event) {
      wheel += event.deltaY
    })
  }
  // 渲染镜头
  function renderCamera () {
    let cameraMoveInterval = 0.08
    let minRotationInterval = 0.001
    let minScrollInterval = 0.1
    function calValue (val, min, interval) {
      return Math.abs(val) < min ? 0 : val * (1 - interval)
    }
    return function () {
      cameraMaster.rotation.y += mx * cameraMoveInterval
      cameraMaster.rotation.x += my * cameraMoveInterval
      camera.position.z += wheel * cameraMoveInterval
      mx = calValue(mx, minRotationInterval, cameraMoveInterval)
      my = calValue(my, minRotationInterval, cameraMoveInterval)
      wheel = calValue(wheel, minScrollInterval, cameraMoveInterval)
    }
  }
  // 渲染mesh
  function renderMesh () {
    if (keyframeInterval >= 5) {
      for (let i = 0; i < all.length; i++) {
        for (let j = 0; j < all[i].length; j++) {
          all[i][j].goNext(function (el, preEl, text) {
            try {
              el.geometry = getTextGeometry(text)
              if (preEl) {
                preEl.material = greenMaterial
              }
              el.material = whiteMaterial
            } catch (e) {
              console.log(e)
            }
          })
        }
      }
      keyframeInterval = 0
    }
    keyframeInterval++
  }
  // 动画
  function animate () {
    window.requestAnimationFrame(animate)
    renderCamera()()
    renderMesh()
    renderer.render(scene, camera)
  }
  animate()
  addEvents()
}

module.exports = {
  rain: rain
}

window.rain = rain
