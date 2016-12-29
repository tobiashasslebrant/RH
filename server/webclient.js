var http = require("http");
  
module.exports = {
  get: function(options, callback){
    var headers = {};
    var data = "";
    var req = http.request(options, function (res) {
      res.on('data', function (chunk) {
        data += chunk
      });
      res.on('end', function () {
        callback(data);
      });
    });
    req.on('error', function (e) {
        console.log(e.message);
    });
    req.end();
  }
}





