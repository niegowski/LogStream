
var http = require("http"), 
    util = require("util"),
    LogStream = require("logstream").LogStream;


var server = http.createServer(function(req, res) {
      
        log.write("Req from " + req.connection.remoteAddress + "\n");
        
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        
        res.end("Hello World");
        
    }).listen(8080);

    
var log = new LogStream("/tmp/test.log");
log.write("Started\n");

process.on("SIGUSR1", function() {
    log.reopen();
});
