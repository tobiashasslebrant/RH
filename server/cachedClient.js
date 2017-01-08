var http = require("http");
var fs = require("fs");
  
module.exports = {
  get: (options, cacheKey, filter, callback) => {
    var fileName = "./cache/" + cacheKey;
    fs.exists(fileName, (exists) => {
      if(exists) {
        fs.readFile(fileName, "utf8", (e,fileData) => {
          if(e) console.log(e.message);
          callback(fileData);
        });
      }
      else {
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
            fs.writeFile(fileName, data, "utf8", (e)=> {
              callback(data);
            })
          });
        });
        req.on('error', (e) => {
            console.log(e.message);
        });
        req.end();
      }
    });
  }
}