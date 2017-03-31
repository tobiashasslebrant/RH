var http = require("http");
var fs = require("fs");
var rh_cache = require("./cache")
  
module.exports = function CachedClient() {
  var send = (options, filter, callback) => {
    var headers = {};
    var data = "";
    var req = http.request(options, (res) => {
      res.on('data', (chunk) => {
        data += chunk
      });
      res.on('end', () => {
        if(!!filter){
          data = filter(data);
        }
        callback(data);
      });
    });
    req.on('error', (e) => {
        console.log(e.message);
    });
    req.end();
  };
  return {
      get: (options, cacheKey, filter, callback, nocache) => {
        if(nocache){
          send(options,filter,callback);
        }
        else {
          rh_cache.get(cacheKey, (fetch) => send(options,filter,(data) => {
            fetch(data);
          }), callback);
        }
      }
    };
}();