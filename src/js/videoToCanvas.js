// const Stats = require('stats-js')
export default (function() {
  var createCanvasWrapper = Symbol('createCanvasWrapper')
  var initCoverOrigin = Symbol('initCoverOrigin')
  var drawCanvas = Symbol('drawCanvas')
  var updateVideo = Symbol('updateVideo')
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame
  requestAnimationFrame = requestAnimationFrame.bind(window)
  var videoPlay = false
  var imageDataCanvas = document.createElement('canvas')
  var imageDataCtx = imageDataCanvas.getContext('2d')
  var guide = document.getElementById('guide')
  var loadingTxt = document.getElementById('loadingTxt')
  return class VideoToCanvas {
    constructor(videoElement) {
      this.videoElement = videoElement
      this.canvasWrapper = this[createCanvasWrapper](videoElement, 360, 500)
      this.canvasOrigin = this[initCoverOrigin](this.videoElement)
      this.ctx = this.canvasOrigin.getContext('2d')
      this.coverElement = document.getElementById('cover')
      this.fps = 40
    }

    [createCanvasWrapper](videoElement, width, height) {
      var canvasWrapper = document.createElement('div')
      canvasWrapper.className = 'canvas__wrapper'
      canvasWrapper.setAttribute(
        'style',
        `width:${width}px;height:${height}px;overflow:hidden;position:absolute;top:0;left:0;`
      )
      videoElement.parentNode.appendChild(canvasWrapper)
      return canvasWrapper
    }
    [initCoverOrigin](videoElement) {
      var canvasOrigin = document.createElement('canvas')
      canvasOrigin.className = 'canvasOrigin'
      canvasOrigin.width = 360
      canvasOrigin.height = 500
      canvasOrigin.setAttribute('style', `width:${360}px;height:${500}px`)
      return canvasOrigin
    }
    _initStats(videoElement) {
      var stats
      stats = new Stats()
      stats.setMode(0)
      stats.domElement.style.position = 'absolute'
      stats.domElement.style.left = '0px'
      stats.domElement.style.top = '0px'
      videoElement.parentNode.parentNode.appendChild(stats.domElement)
      return stats
    }
    [drawCanvas](canvasOrigin) {
      this[updateVideo].call(this, 360, 500)
    }
    //实时获取video的url
    [updateVideo](width, height) {
      this.ctx.drawImage(this.videoElement, 0, 0, 360, 500)
      var src = this.canvasOrigin.toDataURL('image/png')
      // console.log('src', src)
      requestAnimationFrame(timestamp => {
        this[updateVideo](360, 500)
      })
    }
    play() {
      this.canvasWrapper.appendChild(this.canvasOrigin)
      setTimeout(() => {
        if (!videoPlay) {
          this.videoElement.play().then(() => {
            videoPlay = true
            this[drawCanvas](this.canvasOrigin)
            console.timeEnd('initAR')
            loadingTxt.innerHTML = '加载模型内容...'
          })
        }
      })
    }
  }
})()
