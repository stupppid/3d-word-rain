"use strict";

var THREE = _interopRequireWildcard(require("three"));

var _Word = _interopRequireDefault(require("./Word"));

var _WordList = _interopRequireDefault(require("./WordList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 20000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});
var geometry = new THREE.BoxGeometry(1, 1, 1);
var mesh = new THREE.Mesh(geometry, material); // scene.add(mesh)

var texts = [];
var loader = new THREE.FontLoader();
var textGeometry = null;
var text = null;
loader.load('fonts/Arial_Bold.json', function (font) {
  textGeometry = new THREE.TextGeometry('Hello three.js!', {
    font: font,
    size: 100,
    height: 10,
    curveSegments: 10
  });
  text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});
camera.position.z = 10000;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += .1;
  renderer.render(scene, camera);
}

animate();