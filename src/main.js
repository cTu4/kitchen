import Vue from 'vue'
import App from './kitchen.vue'

Vue.use(require('vue-moment'));

new Vue({
  el: '#app',
  render: h => h(App)
})

$(document).mouseup(function (e) {
  var container = $(".dish.active");
  var container_btn = $(".wrap .buttons");
  if (container_btn.has(e.target).length === 0 && container.has(e.target).length === 0){
    container.toggleClass('active');
    container.next().toggleClass('active');
    container.parent().siblings('.wrap').find('.dish').toggleClass('blur');
  }
});
