var fs = require("fs");


module.exports = function Matches() {
  return {
    get: (request, response) => {
        fs.readFile("./data/matches.json", "utf8", (e,data) => {
            if(e) throw e;
            var headers = {};
            headers["Content-Type"] = "application/json";
            response.writeHead(200, headers);
            response.write(data);
            response.end();
        });
    }
  };
}();





