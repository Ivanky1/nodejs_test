/**
 * Created by Ena on 26.06.15.
 */
var User = require('../shema/user').User;
module.exports = function(app) {
    app.get('/', function(req, res){
        if (req.session.user) {
            User.findById(req.session.user, function(err, users) {
                res.render('index', {title: users.name});
            })
        } else {
            res.render('index', {title: 'Гость'});
        }
    });

    app.get('/login', function(req, res){
        res.render('login', {title: 'Login'});
    });
    app.post('/login', function(req, res){
        var login = req.body.login;
        var pass = req.body.pass;
        User.findOne({name: login}, function(err, curUser) {
            if (err) console.dir(err);
            if (curUser) {
                if (curUser.checkPassword(pass)) {
                    req.session.user = curUser._id;
                    res.status(302);
                    res.setHeader("Location", "/");
                    res.end();
                } else {
                    res.end('Пароль не тот');
                }
            } else {
                res.end('Ошибка');
            }

        })
    });

    app.get('/register', function(req, res) {

        if (req.param('error')) {

            res.render(req.param('error'));
            //res.render('register', {title: 'Зарегистрироваться'});
        }
        if (!req.session.user) {
            res.render('register', {title: 'Зарегистрироваться'});
        } else {
            res.render('index', {title: users.name});
        }
    })
    app.post('/register', function(req, res) {
        var userNew = new User(
            {
                name: req.body.login,
                password: req.body.pass
            }
        );
        userNew.save(function (err, curUser) {
            if (err) {
                req.params.error = 'error';
                console.log('Users registration error');
                res.status(302);
                res.setHeader("Location", "/register/"+req.params.error);
                res.end();
            } else {
                req.session.user = curUser._id;
                res.status(302);
                res.setHeader("Location", "/");
                res.end();
            }
        });
    })

    app.get('/logout', function(req, res){
        delete req.session.user;
        res.status(302);
        res.setHeader("Location", "/");
        res.end();
    });

    app.get('/users', function(req, res){
        User.find({}, function(err, users) {
            if (err) console.dir(err);
            res.json(users);
        })
    });
    app.get('/user/:id', function(req, res){
        User.findById(req.params.id, function(err, users) {
            if (err) console.dir(err);
            res.json(users);
        })
    });

}
