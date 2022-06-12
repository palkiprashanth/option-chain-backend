var fs = require("fs");

var Logger = (exports.Logger = {});

var infoStream = fs.createWriteStream("logs/info.txt");

Logger.info = function(msg) {
    var message = new Date().toISOString() + " : " + msg + "\n";
    infoStream.write(message);
};