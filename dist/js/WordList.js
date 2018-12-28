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