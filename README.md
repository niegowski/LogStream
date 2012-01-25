About
=======

Node wrapper for log file stream with file reopening for log rotators


Installation
==============

$ npm install logstream


Changelog
===========

### 0.1.0 - Jan 25 2012
  - First release 


Example
=========

``` js
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
```

Documentation
===============


License
=========

(The MIT License)

Copyright (c) 2012 Kuba Niegowski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
