/**
 * Created by Ena on 13.01.16.
 */

var app = app || {};
app.LibraryView = Backbone.View.extend({
    el: '#books',
    initialize: function() {
        this.collection = new app.Library()
        this.collection.fetch({reset: true});
        this.render();
        this.listenTo( this.collection, 'add', this.bookRender );
        this.listenTo( this.collection, 'reset', this.render );
    },
    render: function() {
        this.collection.each(function(item){
            this.bookRender(item)
        }, this)

    },
    bookRender: function(book) {
        var bookView = new app.BookView({model: book})
        this.$el.append(bookView.render().el);

    },
    bookEditRender: function(e) {
        e.preventDefault();
        var bookEditView = new app.BookEditView({model: this.collection.get(e.target.id)})
        $('.form_edit_book').html(bookEditView.render().el);

    },
    events: {
        'click #add': 'addBook',
        'click .edit': 'bookEditRender',
    },
    addBook: function(e) {
        e.preventDefault();

        var picture = $('#coverImage')[0].files[0];

        formData = {};
        $('#addBook div').find('input').each(function(i, el) {
            if ($(el).val() != '') {
                switch (el.id) {
                    case 'releaseDate': formData[el.id] = new Date($(el).val()).getTime(); break;
                    case 'keywords':
                        formData[ el.id ] = [];
                        _.each($(el).val().split(' '), function(keyword) {
                            formData[el.id].push({'keyword': keyword})
                        })
                    ; break;
                    default : formData[el.id] = $(el).val(); break;
                }
            }
        })

        if (!$.isEmptyObject(formData)) {
            this.collection.create(formData);
        }
    },

})


