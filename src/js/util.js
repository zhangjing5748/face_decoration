function getHashParameter(key) {
  var params = getHashParameters()
  return params[key]
}

function getHashParameters() {
  var arr = (location.hash || '').replace(/^\#/, '').split('&')
  var params = {}
  for (var i = 0; i < arr.length; i++) {
    var data = arr[i].split('=')
    if (data.length == 2) {
      params[data[0]] = data[1]
    }
  }
  return params
}

function getCurrentProd() {
  let pathname = window.location.pathname
  let curProd = products.find(prod => {
    return pathname.indexOf(prod.name) !== -1
  })
  return curProd
}

function createUUID() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

const products = [
  {
    name: 'gugong_calendar',
    appId: '9911599547432961',
    pathname: '/webar/gugong_calendar',
    appletQr: 'applet_gugong_calendar.png',
    origin: 'https://arhello.sensetime.com',
    h5Url: 'https://arhello.sensetime.com/webar/gugong_calendar/',
    appletQrUrl: 'https://arhello.sensetime.com/webar?type=gugong_calendar'
  },
  {
    name: 'gugong_calendar_st',
    appId: '9911599547432961',
    pathname: '/webar/gugong_calendar_st',
    appletQr: 'applet_gugong_calendar_st.png',
    origin: 'https://arhello.sensetime.com',
    h5Url: 'https://arhello.sensetime.com/webar/gugong_calendar_st/',
    appletQrUrl: 'https://arhello.sensetime.com/webar?type=gugong_calendar_st'
  },
  {
    name: 'wishes',
    appId: '9911599547432961',
    pathname: '/webar/wishes',
    appletQr: 'applet_wishes.png',
    origin: 'https://arhello.sensetime.com',
    h5Url: 'https://arhello.sensetime.com/webar/wishes/',
    appletQrUrl: 'https://arhello.sensetime.com/webar?type=wishes'
  },
  {
    name: 'webartest',
    appId: '9911599547432961',
    pathname: '/webar/webartest',
    appletQr: 'applet_wishes.png',
    origin: 'https://arhello.sensetime.com',
    h5Url: 'https://arhello.sensetime.com/webar/webartest/',
    appletQrUrl: 'https://arhello.sensetime.com/webar?type=webartest'
  },
  {
    name: '',
    appId: '9321598253369805',
    pathname: '/',
    appletQr: 'applet_wishes.png',
    origin: 'https://10.4.205.78:9209/'
  }
]
const socketResponseTypes = new Map([
  ['WEBSOCKET_RESPONSE_FINISH', 0], // wss响应成功
  ['WEBSOCKET_RESPONSE_CLOSE', -2], // wss连接被关闭
  ['WEBSOCKET_RESPONSE_ERROR', -3], // wss连接错误
  ['WEBSOCKET_RESPONSE_INVALID', -4] // 响应格式不合法
])
const createModuleResponseTypes = new Map([
  ['VERIFICATION_PASSED', 1],
  ['DOMAIN_NAME_MISMATCH', -1],
  ['APPID_HAS_EXPIRED', -2],
  ['DOMAIN_HAS_EXPIRED', -3]
])

let utils = {
  getHashParameter,
  socketResponseTypes,
  createModuleResponseTypes,
  getCurrentProd,
  createUUID
}
export default utils
