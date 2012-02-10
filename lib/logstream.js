// Copyright (c) 2012 Kuba Niegowski
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

"use strict";

var Stream = require("stream").Stream, 
    util = require("util"), 
    fs = require("fs");


var LogStream = exports.LogStream = function(file) {
    Stream.call(this);
    
    this._file = file;

    this._stream = null;
    this._reopening = false;

    this.writable = false;
    
    this.open();
};
util.inherits(LogStream, Stream);

LogStream.prototype.open = function() {
    
    if (this._stream)
        throw new Error("Can't open already opened LogStream");
        
    this.writable = true;
    
    this._stream = fs.createWriteStream(
            this._file, 
            { flags: "a", mode: parseInt("0644", 8), encoding: "utf8" }
        )
        .on("error", this.emit.bind(this, "error"))
        .on("pipe", this.emit.bind(this, "pipe"))
        .on("drain", this.emit.bind(this, "drain"))
        .on("open", function() {
                this._reopening = false;
            }.bind(this)
        )
        .on("close", function() {
                if (!this._reopening)
                    this.emit("close");
            }.bind(this)
        );

    this._stream.write("=== File Opened ===\n");
};

LogStream.prototype.reopen = function() {
    
    this._reopening = true;
    
    if (this._stream) {
        this._stream.end();
        this._stream = null;
    }
    
    this.open();
};

LogStream.prototype._clean = function() {
    
    this.writable = this._reopening = false;
};

LogStream.prototype.end = function(string, encoding) {
    
    if (string)
        this.write(string, encoding);
    
    this._clean();

    if (!this._stream)
        return;

    this._stream.end();
    this._stream = null;
};

LogStream.prototype.destroy = function() {

    this._clean();

    if (!this._stream)
        return;

    this._stream.destroy();
    this._stream = null;
};

LogStream.prototype.destroySoon = function() {

    this._clean();

    if (!this._stream)
        return;

    this._stream.destroySoon();
    this._stream = null;
};

LogStream.prototype.write = function(string, encoding) {
    
    if (!this._stream)
        throw new Error("Can't write to not oppened Stream");

    return this._stream.write(string, encoding);
};
