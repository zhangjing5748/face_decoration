export default (function() {
  let u = navigator.userAgent
  let device_type = window.navigator.userAgent
  let ua = device_type.toLowerCase()
  let isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1
  let isIOS = u.indexOf('iPhone') > -1
  return class CameraApi {
    constructor(width, height) {
      this.constraints = {
        video: {
          facingMode: 'environment',
          width: {
            ideal: 360
          },
          height: {
            ideal: 500
          }
          // facingMode: (front ? "user" : "environment")
        }
      }
      this.option = {
        facingMode: 'environment',
        width: 360,
        height: 500
      }
      this.backVideoInputs = []
      this.videoInputIndex = 0
      this.videoInputs = []
    }
    _getUserMedia(constrains) {
      console.log(navigator)
      if (navigator.mediaDevices.getUserMedia) {
        //最新标准API
        // console.log('getUserMedia', navigator.mediaDevices.getUserMedia)
        return navigator.mediaDevices.getUserMedia(constrains)
      } else if (navigator.webkitGetUserMedia) {
        // console.log('webkitGetUserMedia', navigator.webkitGetUserMedia)
        //webkit内核浏览器
        return navigator.webkitGetUserMedia(constrains)
      } else if (navigator.mozGetUserMedia) {
        // console.log()
        //Firefox浏览器
        return navigator.mozGetUserMedia(constrains)
      } else if (navigator.getUserMedia) {
        //旧版API
        return navigator.getUserMedia(constrains)
      }
    }
    _getUserMeidaPromise(resolve) {
      if (isAndroid && !isIOS) {
        if (this.backVideoInputs.length) {
          this.option.deviceId = this.backVideoInputs.pop().deviceId
        } else if (this.videoInputs.length) {
          this.option.deviceId = this.videoInputs.pop().deviceId
        }
      }

      let constraints = {
        audio: false,
        video: this.option
      }
      this._getUserMedia(constraints).then(
        stream => {
          var video = document.getElementById('userVideo')
          console.log('video')
          resolve({
            video,
            stream
          })
        },
        err => {
          if (
            isAndroid &&
            !isIOS &&
            (this.backVideoInputs.length || this.videoInputs.length)
          ) {
            this._getUserMeidaPromise(resolve)
          } else if (isIOS) {
            this.option.width = 360
            this.option.height = 500
            this._getUserMeidaPromise(resolve)
          } else {
            console.log(err)
          }
        }
      )
    }
    init() {
      return new Promise((resolve, reject) => {
        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.enumerateDevices
        ) {
          console.log('不支持 enumerateDevices() .')
          let constraints = {
            audio: false,
            video: this.option
          }
          this._getUserMedia(constraints).then(
            stream => {
              var video = document.getElementById('userVideo')
              resolve({
                video,
                stream
              })
            },
            err => {
              reject(err)
              console.log(err)
            }
          )
        }
        let mediaDevices = navigator.mediaDevices
        console.log('mediaDevices', mediaDevices)
        mediaDevices
          .enumerateDevices()
          .then(devices => {
            console.log('devices', devices)
            devices.forEach(device => {
              if (device.kind === 'videoinput') {
                this.videoInputs.push(device)
                if (device.label.toLowerCase().search('back') > -1) {
                  this.backVideoInputs.push(device)
                }
              }
            })
            this._getUserMeidaPromise(resolve)
          })
          .catch(function(err) {
            reject(err.name + ': ' + err.message)
          })
      })
    }
  }
})()
