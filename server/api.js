var http = require("http");
var rh_statistics = require("./statistics")

 module.exports = {
  route: function (uri, request, response) {
    if(uri.startsWith("/api/test"))  {
      response.write("test");
      response.end();
      return;
    }
    if(uri.startsWith("/api/statistics"))  {
      var round = uri.substring("/api/statistics/".length);
      rh_statistics().get(request, response, round);
      return;
    }
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found\n");
    response.end();
  }
};
