var testData = {
  homeTeam: "Rockhangers"
};

Vue.component('matches-list', {
  template: '<match-item></match-item>',
 
});

Vue.component('match-item', {
  template: '<p>hej</p>',
  props: {
    item: {
      type: Object,
      default: function () {
        return { message: 'no data' }
      }
    }
  }
});




new Vue({
  el: '#matches-id'
})


var VanillaAjax = function(){
  return {
    get:  (url,callback) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
          if (xhr.status === 200) {
              callback(xhr.responseText);
          }
      };
      xhr.send();
    }
  }
}();

VanillaAjax.get('api/matches', data => {
  new Vue({
    el: '#app-4',
    data: {
      matches: JSON.parse(data)
    }
  })
});