import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import 'common/stylus/index.styl';
import 'common/js/common.js';
// 全局注册VueRouter和VueResource
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes: [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ],
  linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
