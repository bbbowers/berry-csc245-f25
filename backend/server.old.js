// server.js
const http = require("http");

num_visits = 0;
http.createServer(function(request, response) {  
    
   console.log(request.method);
   console.log(request.url);
   ip = request.socket.remoteAddress;
   if(request.url.contains('/chicken')) {
    num_visits += 1;
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(`<h1>Bawk${" Bawk".repeat(num_visits)}! <(')3</h1>`);    
    response.end();
   } else if(request.url === '/dog') {
      response.writeHead(200, {"Content-Type": "text/html"});
    response.write(`<h1>Look at that dog</h1>`);    
    response.end();
   }
   else if(request.url === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(`<h1>Hello, welcome to the Hen House!</h1>`);    
    response.end();
   } else {
      response.writeHead(400, {"Content-Type": "text/html"});
      response.write("<h1>That URL doesn't exist here</h1>");
      response.end();
   }
   
}).listen(3000);
