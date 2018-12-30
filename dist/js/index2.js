"use strict";

var Word = require('./word');

var WordList = require('./wordList');

var rain = function rain() {
  var wordHeight = 12;
  var wordWidth = 12;
  var rowLength = Math.ceil(window.innerWidth / wordWidth);
  var colLength = Math.ceil(window.innerHeight / wordHeight) + 2;
  var root = document.createElement('div');
  root.classList.add('word', 'nowrap', 'height100');
  var all = [];

  for (var i = 0; i < rowLength; i++) {
    var t = document.createElement('ul');
    var words = new WordList();
    t.classList.add('col');

    for (var j = 0; j < colLength; j++) {
      var sp = document.createElement('li');
      sp.innerText = '';
      t.appendChild(sp);
      var word = new Word(words);
      word.el = sp;
      words.addWord(word);
    }

    all.push(words);
    root.appendChild(t);
  }

  document.body.appendChild(root);

  function animate() {
    for (var _i in all) {
      all[_i].goNext(function (el, preEl, text, index) {
        el.innerText = text;

        if (index > 0) {
          preEl.classList.remove('white');
        }

        el.classList.add('white');
      });
    }
  }

  setInterval(animate, 10);
};

module.exports = {
  rain: rain
};
window.rain = rain;