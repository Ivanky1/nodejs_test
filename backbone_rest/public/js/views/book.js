/**
 * Created by Ena on 13.01.16.
 */

var app = app || {};
app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    template: _.template($('#bookTemplate').html()),
    initialize: function() {
        this.listenTo( this.model, 'change', this.render );
    },
    render: function() {

        this.$el.html(this.template(this.model.toJSON() ));
        this.$el.find('.edit').attr('id', this.model.id);
        return this;
    },
    events: {
        'click .delete': 'deleteBook',
    },
    deleteBook: function() {
        this.model.destroy();
        this.remove();
    },

})

