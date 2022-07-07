import request from '../utils/request'

const getCaptcha = () => {
  return request({ url: '/captcha', method: 'GET' })
}

const login = () => {
  return request({
    url: `/login?username=${data.username}&password=${data.password}&code=${data.code}&token=${data.token}`,
    method: 'POST'
  })
}

const getUserInfo = () => {
  return request({ url: '/sys/userInfo', method: 'GET' })
}

const logout = () => {
  return request({ url: '/logout', method: 'POST' })
}
export default {
  getCaptcha,
  login,
  getUserInfo,
  logout
}
