
Vue.component('match', {
  template: "#match-template",
  props: ['match']
});

VanillaAjax.get('api/matches', json => {
  var result = JSON.parse(json);
  new Vue({
    el: '#app',
    data: {
      matches: result
    }
  });
});