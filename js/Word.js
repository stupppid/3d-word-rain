/**
 * 文字雨的单个文字
 */
module.exports = class Word {
  constructor (parent) {
    this.text = ''
    if (parent) {
      this.parent = parent || null
      this.nextText = this.parent.newWord()
    } else {
      this.nextText = this.newWord()
    }
    this.defineShow(this)
  }

  newWord () {
    return String.fromCharCode(Math.random() * (126 - 33) + 33)
  }

  setText (show) {
    if (show) {
      this.text = this.nextText
    } else {
      if (this.parent && typeof this.parent.newWord === 'function') {
        this.nextText = this.parent.newWord()
      } else {
        this.nextText = this.newWord()
      }
      this.text = ''
    }
  }

  defineShow (obj) {
    let t = false
    Object.defineProperty(obj, 'show', {
      get: function () {
        return t
      },
      set: function (value) {
        if (value === t || typeof value !== 'boolean') {
          return
        }
        this.setText(value)
        t = value
      }
    })
  }
}
