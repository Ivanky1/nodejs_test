/**
 * Created by Ena on 23.04.15.
 */
var conf = require('../config/config');
var db = require('mongoose');
db.connect(conf.db_cnn);
module.exports = db;