# 3d-word-rain
文字雨3d版(网页)

先添加了2D版本，使用http-server运行该目录后，打开localhost:8080/index2

3D的也写好了，使用http-server运行该目录后，打开localhost:8080/index2
ps : 可能有点不协调，有比较熟练的UI看到的话，请一定要告诉我怎么调整样式~~

## 若要运行源文件，可以通过http-server 运行，同时运行gulp(用来转换node -> 浏览器es5)
## 如果不用npm包引入，而用script标签引入，请直接用dist/js/bundle.js，否则gulp运行之后会改变这个文件

# cmd:
`npm i 3d-word-rain`

# js:
npm引入：
````
const wordRain = require('3d-word-rain')
wordRain.rain()
````

script标签引入（路径要根据项目放的地方写）：
````
<script src="dist/js/bundle.js"></script>
````

script标签引入2d文字雨版本（路径要根据项目放的地方写）：
````
<script src="dist/js/bundle2.js"></script>
````

