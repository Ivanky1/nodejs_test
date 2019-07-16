/**
 * Created by Ena on 13.01.16.
 */
var app = app || {};
app.Library = Backbone.Collection.extend({
    model: app.Book,
    url: '/api/books'
})