var fs = require("fs");

var client = require("./cachedClient");

module.exports = function Statistics() {
  var nthIndex =  (str, pat, n) =>{
      var L= str.length, i= -1;
      while(n-- && i++<L){
          i= str.indexOf(pat, i);
          if (i < 0) break;
      }
      return i;
  };

  return {
    get: (request, response, league, team, division, round) => {
      //http://www.dartstatistik.se/league/stdf/1617/statistics/3D_11_ROCKH.php
      //http://localhost:888/api/statistics/1617/ROCKH/3D/11
      var options = {
            host: 'www.dartstatistik.se',
            path: '/league/stdf/' + league + '/statistics/'+ division +'_' + round + '_'+ team +'.php'
      };

      var cacheKey = "statistics_" + league + "_" + division + "_" + round + "_" + team;
      client.get(options, cacheKey,
        data => {
          var firstpos = nthIndex(data, "<table", 6);
          var lastpos = nthIndex(data, "</table", 6) + 7;
          return data.substring(firstpos, lastpos)
        },
        data => {
          var headers = {};
          headers["Content-Type"] = "text/html";//"application/json";
          response.writeHead(200, headers);
          response.write(data);
          response.end();
      });
    }
  };
}





