(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./word":2,"./wordList":3}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 文字雨的单个文字
 */
module.exports =
/*#__PURE__*/
function () {
  function Word(parent) {
    _classCallCheck(this, Word);

    this.text = '';

    if (parent) {
      this.parent = parent || null;
      this.nextText = this.parent.newWord();
    } else {
      this.nextText = this.newWord();
    }

    this.defineShow(this);
  }

  _createClass(Word, [{
    key: "newWord",
    value: function newWord() {
      return String.fromCharCode(Math.random() * (126 - 33) + 33);
    }
  }, {
    key: "setText",
    value: function setText(show) {
      if (show) {
        this.text = this.nextText;
      } else {
        if (this.parent && typeof this.parent.newWord === 'function') {
          this.nextText = this.parent.newWord();
        } else {
          this.nextText = this.newWord();
        }

        this.text = '';
      }
    }
  }, {
    key: "defineShow",
    value: function defineShow(obj) {
      var t = false;
      Object.defineProperty(obj, 'show', {
        get: function get() {
          return t;
        },
        set: function set(value) {
          if (value === t || typeof value !== 'boolean') {
            return;
          }

          this.setText(value);
          t = value;
        }
      });
    }
  }]);

  return Word;
}();
},{}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 控制文字雨的显示
 */
module.exports =
/*#__PURE__*/
function () {
  function WordList(opts) {
    _classCallCheck(this, WordList);

    this.recordIndex = [0];
    this.words = [];

    if (opts) {
      this.minInterval = opts.minInterval || 3;
      this.maxInterval = opts.maxInterval || 20;
    } else {
      this.minInterval = 3;
      this.maxInterval = 20;
    }

    this.indent = this.getInterval();
    this.interval = this.getInterval();
  }

  _createClass(WordList, [{
    key: "addWord",
    value: function addWord(word) {
      this.words.push(word);
    }
  }, {
    key: "newWord",
    value: function newWord() {
      return String.fromCharCode(Math.random() * (126 - 33) + 33);
    }
  }, {
    key: "getInterval",
    value: function getInterval(min, max) {
      min = min || this.minInterval || 3;
      max = max || this.maxInterval || 20;
      return Math.ceil(Math.random() * (max - min) + min);
    }
  }, {
    key: "goNext",
    value: function goNext(callback) {
      if (this.indent > 0) {
        --this.indent;
        return;
      }

      var l = this.words.length;

      for (var i in this.recordIndex) {
        var index = this.recordIndex[i]++;

        if (index >= l - 1) {
          this.recordIndex.pop();
        } else {
          this.words[index].show = !this.words[index].show;

          if (callback) {
            callback(this.words[index].el, this.words[index - 1] ? this.words[index - 1].el : undefined, this.words[index].text, index);
          }
        }
      }

      if (this.recordIndex[0] > this.interval) {
        this.recordIndex.unshift(0);
        this.interval = this.getInterval();
      }
    }
  }]);

  return WordList;
}();
},{}]},{},[1]);
