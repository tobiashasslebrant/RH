var VanillaAjax = function(){
  return {
    get:  (callback) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'api/matches');
      xhr.onload = () => {
          if (xhr.status === 200) {
              callback(xhr.responseText);
          }
      };
      xhr.send();
    }
  }
}();

VanillaAjax.get(data => {
  new Vue({
    el: '#app-4',
    data: {
      matches: JSON.parse(data)
    }
  })
});