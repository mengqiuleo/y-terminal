/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 20:48:53
 * @LastEditTime: 2022-11-02 22:50:37
 */
/**
 * 接口路由
 * @author pjy
 */
const routes = [
  // {
  //   path: "/user/register",
  //   handler: require("./controller/userController").userRegisterApi,
  // },
  // {
  //   path: "/user/login",
  //   handler: require("./controller/userController").userLoginApi,
  // },
  // {
  //   path: "/user/logout",
  //   handler: require("./controller/userController").userLogoutApi,
  // },
  // {
  //   path: "/user/current",
  //   handler: require("./controller/userController").getLoginUserApi,
  // },
  {
    path: '/music/get',
    handler: require('./controller/musicController').getSingleMusicApi
  },
  {
    path: '/music/list/hot',
    handler: require('./controller/musicController').getPlaylistDetailApi
  },
  {
    path: '/fanyi/translate',
    handler: require('./controller/fanyiController').translateApi
  },
  {
    path: '/background/get/random',
    handler: require('./controller/backgroundController').getRandomBackgroundApi
  },
  {
    path: '/weather',
    handler: require('./controller/weatherController').getWeatherApi
  },
  {
    path: '/article',
    handler: require('./controller/articleController').getArticleApi
  }
]

module.exports = routes
