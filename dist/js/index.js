"use strict";

var THREE = require('three');

var Word = require('./word');

var WordList = require('./wordList');

var rain = function rain(fontPath) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  var scene = rain.scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  var cameraMaster = rain.cameraMaster = new THREE.Object3D();
  cameraMaster.add(camera);
  scene.add(cameraMaster);
  var renderer = rain.renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  root.appendChild(renderer.domElement);
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
  var matrixSpaceInterval = 70; // 设置摄像头位置

  var cameraInit = (matrixSpaceInterval + fontSize) * matrixLength / 2;
  cameraMaster.position.x = cameraInit;
  cameraMaster.position.y = -cameraInit;
  cameraMaster.position.z = cameraInit;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 0;
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
  }

  var mx = 0;
  var my = 0;
  var wheel = 0; // 添加事件

  function addEvents() {
    renderer.domElement.addEventListener('mousemove', function (event) {
      event.preventDefault();

      if (event.buttons === 1) {
        mx += event.movementX * 2 / window.innerWidth;
        my += event.movementY * 2 / window.innerHeight;
      }
    });
    renderer.domElement.addEventListener('mousewheel', function (event) {
      event.preventDefault();
      wheel += event.deltaY;
    });
    var cx, cy, length, toFingerFlag;
    renderer.domElement.addEventListener('touchstart', function (e) {
      e.preventDefault();

      if (e.targetTouches.length === 1) {
        var t = e.targetTouches[0];
        cx = t.clientX;
        cy = t.clientY;
      }
    }, false);
    renderer.domElement.addEventListener('touchend', function (e) {
      if (e.targetTouches.length === 1) {
        length = 0;
        toFingerFlag = false;
      }
    }, false);
    root.addEventListener('touchmove', function (e) {
      e.preventDefault();

      if (e.targetTouches.length === 2) {
        toFingerFlag = true;
        var t1 = e.targetTouches[0];
        var t2 = e.targetTouches[1];
        var len = Math.sqrt(Math.pow(t2.clientX - t1.clientX, 2) + Math.pow(t2.clientY - t1.clientY, 2));

        if (length) {
          wheel += length - len;
        }

        length = len;
      } else if (e.targetTouches.length === 1 && !toFingerFlag) {
        var t = e.targetTouches[0];
        mx += (t.clientX - cx) / window.innerWidth;
        my += (t.clientY - cy) / window.innerHeight;
        cx = t.clientX;
        cy = t.clientY;
        length = 0;
      }
    }, false);
  } // 渲染镜头


  function renderCamera() {
    var cameraMoveInterval = 0.08;
    var minRotationInterval = 0.001;
    var minScrollInterval = 0.1;

    function calValue(val, min, interval) {
      return Math.abs(val) < min ? 0 : val * (1 - interval);
    }

    return function () {
      cameraMaster.rotation.y += mx * cameraMoveInterval;
      cameraMaster.rotation.x += my * cameraMoveInterval;
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
  } // add stop function


  rain.stopFlag = false;

  rain.stop = function () {
    rain.stopFlag = true;
  };

  rain.start = function () {
    rain.stopFlag = false;
    animate();
  }; // 动画


  function animate() {
    if (rain.stopFlag) {
      return;
    }

    window.requestAnimationFrame(animate);
    renderCamera()();
    renderMesh();
    renderer.render(scene, camera);
  }

  animate();
  addEvents();
};

module.exports = {
  rain: rain
};
window.rain = rain;