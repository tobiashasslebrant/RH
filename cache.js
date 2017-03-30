var http = require("http");
var fs = require("fs");
  
module.exports = {
  list: (request, response) => {
    fs.readdir("./cache/", (err, files) => {
        response.writeHead(200, {"Content-Type": "application/json"});
        // response.write("<ul>");
        //files.forEach(file => {
            //response.write("<li>");
          //  response.write(file);
            //response.write("</li>");
        //});
        response.write(JSON.stringify(files));
        //response.write("</ul>")
        response.end();
    })
  }
}