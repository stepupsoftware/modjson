var JSONListener = require('./JSONListener').JSONListener,
    _ = require("underscore");
Listener = function () {
    JSONListener.call(this); // inherit default listener
    return this;
};
//you could use this.output to build up a new JSON object
this.output = "";
// inherit default listener
Listener.prototype = Object.create(JSONListener.prototype);
Listener.prototype.constructor = Listener;

function funkyThingWithAtSymbol(str) {
    if (str.charAt(0) === str.charAt(0).toUpperCase()) {
        str = str.replace('"',''); //str has quotes lets remove em first
        return '"@' + str + '"';
    }
    return str;
}
Listener.prototype.exitPair = function (ctx) {
    //see JSON.g4 a pair has a string and a value
    
    //console.log(ctx.STRING().getText());
    //console.log(ctx.value().getText());

    //just a simple example
    this.output = `${ctx.STRING().getText()}:${ctx.value().getText()}`
};

Listener.prototype.exitJson = function (ctx) {
    //console.log(ctx.object().getText());
};

module.exports = Listener;