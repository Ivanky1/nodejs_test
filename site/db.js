/**
 * Created by Ena on 17.04.15.
 */

var User = require('./shema/user').User;

var admin = new User(
    {
      name: 'fedya',
      password: '321'
    }
);
admin.save(function (err) {
    if (err) // ...
        console.log('admin error');
});

