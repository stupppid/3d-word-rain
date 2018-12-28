"use strict";

var _Word = _interopRequireDefault(require("./Word"));

var _WordList = _interopRequireDefault(require("./WordList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wordHeight = 12;
var wordWidth = 12;
var rowLength = Math.ceil(window.innerWidth / wordWidth);
var colLength = Math.ceil(window.innerHeight / wordHeight) + 2;
var root = document.createElement('div');
root.classList.add('word');
root.classList.add('nowrap');
root.classList.add('height100');
var all = [];

for (var i = 0; i < rowLength; i++) {
  var t = document.createElement('ul');
  var words = new _WordList.default();
  t.classList.add('col');

  for (var j = 0; j < colLength; j++) {
    var sp = document.createElement('li');
    sp.innerText = '';
    t.appendChild(sp);
    var word = new _Word.default(words);
    word.el = sp;
    words.addWord(word);
  }

  all.push(words);
  root.appendChild(t);
}

document.body.appendChild(root);

function animate() {
  for (var _i in all) {
    all[_i].goNext();
  }
}

setInterval(animate, 10);