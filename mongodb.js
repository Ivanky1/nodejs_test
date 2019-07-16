/**
 * Created by Ena on 17.04.15.
 */

var conf = require('./config/config');

var mongoose = require('mongoose');
mongoose.connect(conf.dbcnn);

var shemaCat = mongoose.Schema({
    name: String,
    age: Number
})

shemaCat.methods.say = function() {
    console.log('Hello from' + this.get('name'));
}

var Cat = mongoose.model('Cat', shemaCat);

var murzik = new Cat({ name: ' New Murka', age: 11 });
murzik.save(function (err) {
    if (err) // ...
        console.log('Murzik2 meow');
    else
        murzik.say();
});

