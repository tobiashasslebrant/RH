var http = require("http");
var rh_statistics = require("./statistics");
var rh_matches = require("./matches");

 module.exports = function() {
   var routes = {
     test: "/api/test",
     matches: "/api/matches",
     statistics: "/api/statistics/"
   };

   return {
     route: function (uri, request, response) {
      var params = r => {
          return uri.substring(r.length).split("/");
      };
      if(uri.startsWith(routes.test))  {
        response.write("test");
        response.end();
        return;
      }

      if(uri.startsWith(routes.matches)) {
        rh_matches().get(request, response);
        return;
      }

      if(uri.startsWith(routes.statistics)) {
        var league = params(routes.statistics)[0];
        var team = params(routes.statistics)[1];
        var division = params(routes.statistics)[2]; 
        var round = params(routes.statistics)[3];
        rh_statistics().get(request, response, league, team, division, round);
        return;
      }
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
    }
   }
};