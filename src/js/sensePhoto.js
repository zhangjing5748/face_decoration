import VideoToCanvas from './videoToCanvas.js'
export default (function() {
  return class sensePhoto {
    constructor() {}
    changePhoto() {
      return new Promise((resolve, reject) => {
        var input = document.querySelector('input')
        var img = document.getElementById('uploadImg')
        input.onchange = function() {
          var file = input.files[0]
          if (file !== undefined) {
            var reader = new FileReader(file)
            reader.readAsDataURL(file)
            reader.onload = function() {
              img.src = reader.result
              document.getElementById('camera').style.display = 'none'
              img.style.display = 'block'
              var canvas = document.createElement('canvas'),
                height = img.height
              canvas.height = height
              canvas.width = 360
              canvas.getContext('2d').drawImage(img, 0, 0, 360, height)
              var dataURL = canvas.toDataURL('image/png')
              console.log(dataURL)
              resolve(dataURL)
              document.getElementById('photo').appendChild(canvas)
            }
          }
        }
      })
    }
  }
})()
