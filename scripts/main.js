Vue.component('shortDate', {
  template: "<span>{{date.substring(5,10)}}<span>",
  props: ['date']
});


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