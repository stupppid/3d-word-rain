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