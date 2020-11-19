import './assets/css/index.css'
import Vue from 'vue'
import App from '../src/view/App.vue'
Vue.component(App.name, App)
new Vue({
  el: '#app'
})
function initAR() {
  var SenseAR = require('./js/senseAR').default
  var senseAR = new SenseAR()
  console.log('senseAR', senseAR)
  senseAR
    .init()
    .then(res => {
      if (res) {
        console.log('res111', res)
      }
    })
    .catch(err => {
      throw err
    })
}
// 获取photo
function initARPhoto() {
  var sensePhoto = require('./js/sensePhoto').default
  document.getElementById('loading').style.display = 'none'
  var sensephoto = new sensePhoto(document.querySelector('input'))
  sensephoto
    .changePhoto()
    .then(res => {
      //获得上传图片的url
      console.log('upload==>>', res)
    })
    .catch(err => {
      console.log(err)
    })
}
function initDom() {
  initARPhoto()
  var cameraBtn = document.getElementById('cameraBtn')
  cameraBtn.addEventListener('click', function() {
    console.log('123')
    document.getElementById('uploadImg').style.display = 'none'
    document.getElementById('loading').style.display = 'block'
    document.getElementById('camera').style.display = 'block'
    initAR()
  })
}
initDom()
