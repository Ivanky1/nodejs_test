/**
 * Created by Ena on 05.05.15.
 */
/*
window.unload = function() {
    socket.disconnect();
}
*/
var socket;
window.onunload = function() {
    socket.disconnect();
}

window.onload = function() {
    var field = document.getElementById('field');
    var form = document.getElementById('form');
    var content = document.getElementById('content');
    socket = io.connect('http://localhost:4027');
    hello = prompt('Представьтесь', 'Гость');
    socket.emit('hello', {name: hello});

    form.onsubmit = function() {
        var text = field.value;
        socket.emit('send', {message: text});
        return false;
    }

    var messages = [];
    socket.on('message', function(data) {
        if (data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br/>';
            }
            content.innerHTML = html;
        } else {
            console.log('Error');
        }

    })
}

