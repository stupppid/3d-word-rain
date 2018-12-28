"use strict";

var THREE = require('three');

var Word = require('./word');

var WordList = require('./wordList');

var rain = function rain(fontPath) {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var greenMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  var whiteMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  var loader = new THREE.FontLoader();
  var textGeometry = null;
  var text = null;
  var font = null;
  var geometrys = [];
  var matrixLength = 25;
  var fontSize = 10;
  var matrixSpaceInterval = 70;
  var cameraInit = (matrixSpaceInterval + fontSize) * matrixLength / 2;
  camera.position.x = cameraInit;
  camera.position.y = -cameraInit;
  camera.position.z = cameraInit; // 每秒10帧

  var keyframeInterval = 60 / 6;
  loader.load(fontPath || 'fonts/Arial_Bold.json', function (f) {
    font = f;
    init();
  });

  function getTextGeometry(text) {
    if (!geometrys[text]) {
      geometrys[text] = new THREE.TextGeometry(text, {
        font: font,
        size: fontSize,
        height: 1,
        curveSegments: 1
      });
    }

    return geometrys[text];
  }

  var all = []; // 等待字体加载完毕执行

  function init() {
    textGeometry = getTextGeometry('');
    text = new THREE.Mesh(textGeometry, greenMaterial);
    var textColne = null;

    for (var i = 0; i < matrixLength; i++) {
      var dim = [];

      for (var j = 0; j < matrixLength; j++) {
        var words = new WordList();

        for (var k = 0; k < matrixLength; k++) {
          var word = new Word(words);
          textColne = text.clone();
          textColne.geometry = getTextGeometry('');
          textColne.position.x += matrixSpaceInterval * i;
          textColne.position.z += matrixSpaceInterval * j; // 必须是最底层循环设置y

          textColne.position.y -= matrixSpaceInterval * k;
          word.el = textColne;
          scene.add(textColne);
          words.addWord(word);
        }

        dim.push(words);
      }

      all.push(dim);
    }

    console.log(all);
  }

  var mx = 0;
  var my = 0;
  var wheel = 0; // 添加事件

  function addEvents() {
    document.addEventListener('mousemove', function (event) {
      if (event.buttons === 1) {
        mx += event.movementX / window.innerWidth;
        my += event.movementY / window.innerHeight;
      }
    });
    document.addEventListener('mousewheel', function (event) {
      wheel += event.deltaY * 0.05;
    }, {
      passive: false
    });
  } // 渲染镜头


  function renderCamera() {
    var cameraMoveInterval = 0.08;
    var minRotationInterval = 0.001;
    var minScrollInterval = 0.1;

    function calValue(val, min, interval) {
      return Math.abs(val) < min ? 0 : val * (1 - interval);
    }

    return function () {
      camera.rotation.y += mx * cameraMoveInterval;
      camera.rotation.x += my * cameraMoveInterval;
      camera.position.z += wheel * cameraMoveInterval;
      mx = calValue(mx, minRotationInterval, cameraMoveInterval);
      my = calValue(my, minRotationInterval, cameraMoveInterval);
      wheel = calValue(wheel, minScrollInterval, cameraMoveInterval);
    };
  } // 渲染mesh


  function renderMesh() {
    if (keyframeInterval >= 5) {
      for (var i = 0; i < all.length; i++) {
        for (var j = 0; j < all[i].length; j++) {
          all[i][j].goNext(function (el, preEl, text) {
            try {
              el.geometry = getTextGeometry(text);

              if (preEl) {
                preEl.material = greenMaterial;
              }

              el.material = whiteMaterial;
            } catch (e) {
              console.log(e);
            }
          });
        }
      }

      keyframeInterval = 0;
    }

    keyframeInterval++;
  } // 动画


  function animate() {
    window.requestAnimationFrame(animate);
    renderCamera()();
    renderMesh();
    renderer.render(scene, camera);
  }

  animate();
  addEvents();
};

module.exports = {
  rain: rain // 如果不用npm包引入，而用script标签引入，加入这一行

};
rain();