var http = require("http");
var rh_statistics = require("./statistics")

 module.exports = function() {
   var routes = {
     test: "/api/test",
     statistics: "/api/statistics/"
   };

   return {
     route: function (uri, request, response) {
       var params = function(r){
          return uri.substring(r.length).split("/");
       };

      if(uri.startsWith(routes.test))  {
        response.write("test");
        response.end();
        return;
      }
      if(uri.startsWith(routes.statistics)) {
        var round = params(routes.statistics)[0];
        rh_statistics().get(request, response, round);
        return;
      }
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
    }
   }
};