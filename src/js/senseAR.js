import CameraApi from './mediaApi.js'
import VideoToCanvas from './videoToCanvas.js'
export default (function() {
  var getZipBinaryPromise = Symbol('getZipBinaryPromise')
  return class SenseAR {
    constructor() {
      this.camera = new CameraApi(360, 500)
      this.canvas = null
      this.loading = document.getElementById('loading')
    }

    [getZipBinaryPromise](url) {
      return fetch(url, {
        credentials: 'same-origin'
      })
        .then(function(response) {
          if (!response['ok']) {
            throw "failed to load binary file at '" + url + "'"
          }
          return response['arrayBuffer']()
        })
        .catch(function() {
          throw "failed to load binary file at '" + url + "'"
        })
    }
    init(productType) {
      return new Promise((resolve, reject) => {
        let video
        let p1 = new Promise((resolve1, reject1) => {
          this.camera.init().then(res => {
            this.loading.style.display = 'none'
            console.log('camera init', res)
            video = res.video
            var stream = res.stream
            video.srcObject = stream
            video.addEventListener('pause', () => {
              video.play()
            })
            video.addEventListener('loadedmetadata', () => {
              this.canvas = new VideoToCanvas(video)
              console.log(this.canvas)
              this.canvas.play.call(this.canvas)
              resolve1(true)
            })
          })
        })
      })
    }
  }
})()
