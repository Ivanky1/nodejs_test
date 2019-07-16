/**
 * Created by Ena on 05.05.15.
 */
var //ejs = require('ejs'),
    express = require('express'),
    app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('page');
    res.end();
});


var io = require('socket.io').listen(app.listen(4027));

var users = {}
function getUsers(obj) {
    var tmp = [];
    for(var i in obj) {
        tmp.push(obj[i]);
    }
    return tmp.join(', ');
}

io.sockets.on('connection', function(client) {
 //   client.emit('message', {message: 'Добро пожаловать в чат'});
    client.on('send', function(data) {
        io.sockets.emit('message', {message: data.message})
    })
    client.on('hello', function(data) {
        client.emit('message', {message: 'Добро пожаловать в чат '+ data.name});
        client.broadcast.emit('message', {message: data.name + ' присоединился к чату!'});

        if (Object.keys(users).length > 0) {
            client.emit('message', {message: 'Еще в чате '+ getUsers(users)});
        } else {
            client.emit('message', {message: 'Кроме вас в чате никого нету!'});
        }

        users[client.id] = data.name;
    })

    client.on('disconnect', function(data) {
        if (Object.keys(users).length > 0) {
            client.broadcast.emit('message', {message: users[client.id] + ' покинул чат!'});
        }
        delete users[client.id];
    })

})