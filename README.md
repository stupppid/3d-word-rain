# 3d-word-rain
made by threejs

- Hold down the left mouse button and drag to rotate. The center of rotation is the center of the text rain
- Mouse wheel control camera's movement
- the main body of the text rain is 25 * 25 * 25 text geometries, so maybe you can see the edge of the rain
- To run the source file, you can run it through `http-server` ,and run `gulp` meanwhile(to convert node - > browser es5)
- the bundle.js is not be uglified, it's really a big file
- Maybe it's a little incongruous. If you are good at UI design, please tell me how to adjust the style~~

# cmd:
`npm i 3d-word-rain`

# js:
## import by npm
````
const wordRain = require('3d-word-rain')
wordRain.rain('path/to/font.json')
````
if you dont know what's the font.json file,
you can see `/fonts/Arial_Bold.json` in the node_modules,
and copy it to a static file to use by url(that you can request by a browser), 
must be a json file, not ttf/woff file! it can be searched by google or 百度. 

## import by script tag
````
<script src="dist/js/bundle.js"></script>
<script>
    rain('path/to/font.json')
</script>
````

## import 2d version by script tag
````
<script src="dist/js/bundle2.js"></script>
<script>
    rain()
</script>
````

