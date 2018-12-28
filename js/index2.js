let Word = require('./word')
let WordList = require('./wordList')

let rain = function () {
  let wordHeight = 12
  let wordWidth = 12
  let rowLength = Math.ceil(window.innerWidth / wordWidth)
  let colLength = Math.ceil(window.innerHeight / wordHeight) + 2

  let root = document.createElement('div')
  root.classList.add('word', 'nowrap', 'height100')

  let all = []
  for (let i = 0; i < rowLength; i++) {
    let t = document.createElement('ul')
    let words = new WordList()
    t.classList.add('col')
    for (let j = 0; j < colLength; j++) {
      let sp = document.createElement('li')
      sp.innerText = ''
      t.appendChild(sp)
      let word = new Word(words)
      word.el = sp
      words.addWord(word)
    }
    all.push(words)
    root.appendChild(t)
  }
  document.body.appendChild(root)

  function animate () {
    for (let i in all) {
      all[i].goNext(function (el, preEl, text, index) {
        el.innerText = text
        if (index > 0) {
          preEl.classList.remove('white')
        }
        el.classList.add('white')
      })
    }
  }
  setInterval(animate, 10)
}

module.exports = {
  rain: rain
}

// 如果不用npm包引入，而用script标签引入，请直接用dist/js/bundle.js
// rain()
