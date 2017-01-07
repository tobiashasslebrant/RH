
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
