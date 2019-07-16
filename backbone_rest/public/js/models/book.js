/**
 * Created by Ena on 13.01.16.
 */

var app = app || {};
app.Book = Backbone.Model.extend({
    default: {
        title: 'No title',
        author: 'Unknown',
        releaseDate: 'Unknown',
        keywords: 'None',
        coverImage: 'None',

    },
    parse: function( response ) {
        response.id = response._id;
        return response;
    },
    fileAttribute: 'attachment'

})