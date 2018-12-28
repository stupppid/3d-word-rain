import Word from './Word'
import WordList from './WordList'


let wordHeight = 12
let wordWidth = 12
let rowLength = Math.ceil(window.innerWidth / wordWidth)
let colLength = Math.ceil(window.innerHeight / wordHeight) + 2

let root = document.createElement('div')
root.classList.add('word')
root.classList.add('nowrap')
root.classList.add('height100')

let all = []
for(let i = 0;i < rowLength;i++){
    let t = document.createElement('ul')
    let words = new WordList()
    t.classList.add('col')
    for(let j = 0;j < colLength;j++){
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

function animate(){
    for(let i in all){
        all[i].goNext()
    }
}

setInterval(animate,10)
