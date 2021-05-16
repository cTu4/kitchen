import Vue from 'vue'
import App from './kitchen.vue'
import Auth from './auth.vue'
import ProgressBar from 'vuejs-progress-bar'
import Notifications from 'vue-notification'

Vue.use(ProgressBar);
Vue.use(Notifications);

Vue.use(require('vue-moment'));

if($('#app').length){
  new Vue({
    el: '#app',
    render: h => h(App)
  })
}

if($('#auth').length){
  new Vue({
    el: '#auth',
    render: h => h(Auth)
  })
}



$(document).mouseup(function (e) {
  var container = $(".dish.active");
  var container_btn = $(".wrap .buttons");
  if (container_btn.has(e.target).length === 0 && container.has(e.target).length === 0){
    container.toggleClass('active');
    container.next().toggleClass('active');
    container.parent().siblings('.wrap').find('.dish').toggleClass('blur');
  }
});
