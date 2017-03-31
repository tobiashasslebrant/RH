var http = require("http");
var fs = require("fs");
  
module.exports = function Cache(){
  return {
    get: (cacheKey, fetch, callback) => {
      var fileName = "./cache/" + cacheKey;
      fs.exists(fileName, (exists) => {
        if(exists) {
          fs.readFile(fileName, "utf8", (e,fileData) => {
            if(e) console.log(e.message);
            callback(fileData);
          });
        }
        else {
          fetch((data) =>  {
            fs.writeFile(fileName, data, "utf8", (e)=> {
              callback(data);
            })
          });
          
        }
      });
    },

    list: (request, response) => {
      fs.readdir("./cache/", (err, files) => {
          response.writeHead(200, {"Content-Type": "application/json"});
          response.write(JSON.stringify(files));
          response.end();
      })
    }
  };
}();