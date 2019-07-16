var events = require('events');
var EventEmitter = events.EventEmitter;
var test = new EventEmitter();
test.on('MyEvent', eventFunct);

function eventFunct(param) {
    console.log(arguments[0], arguments[1]);
}
test.emit('MyEvent', 'My event one', 'My event two');

var url = require('url');
var p = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
console.log(p);
for(key in p) {
    console.log(p[key]);
}