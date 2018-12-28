/**
 * 控制文字雨的显示
 */
module.exports = class WordList {
  constructor (opts) {
    this.recordIndex = [0]
    this.words = []
    if (opts) {
      this.minInterval = opts.minInterval || 3
      this.maxInterval = opts.maxInterval || 20
    } else {
      this.minInterval = 3
      this.maxInterval = 20
    }
    this.indent = this.getInterval()
    this.interval = this.getInterval()
  }

  addWord (word) {
    this.words.push(word)
  }

  newWord () {
    return String.fromCharCode(Math.random() * (126 - 33) + 33)
  }

  getInterval (min, max) {
    min = min || this.minInterval || 3
    max = max || this.maxInterval || 20
    return Math.ceil(Math.random() * (max - min) + min)
  }

  goNext (callback) {
    if (this.indent > 0) {
      --this.indent
      return
    }
    let l = this.words.length

    for (let i in this.recordIndex) {
      let index = this.recordIndex[i]++
      if (index >= l - 1) {
        this.recordIndex.pop()
      } else {
        this.words[index].show = !this.words[index].show
        if (callback) {
          callback(this.words[index].el, this.words[index - 1] ? this.words[index - 1].el : undefined, this.words[index].text, index)
        }
      }
    }
    if (this.recordIndex[0] > this.interval) {
      this.recordIndex.unshift(0)
      this.interval = this.getInterval()
    }
  }
}
