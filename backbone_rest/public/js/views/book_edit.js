/**
 * Created by Ena on 13.01.16.
 */

var app = app || {};
app.BookEditView = Backbone.View.extend({
    template: _.template( $('#editTaskTpl').html()+'<script>$(".key").val( $.trim($(".key").val()) ); $(".release_date").datepicker();</script>'),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .book_edit_submit': 'editBook',
        'click .book_edit_cancel': 'cancelBook',
    },
    editBook: function(e) {
        e.preventDefault()
        var keys = [];
        _.each($.trim(this.$el.find('input[name="keywords"]').val()).split(' '),
            function(keyword) {
                keys.push({'keyword':keyword});
            })
      this.model.save({
            title: this.$el.find('input[name="title"]').val(),
            author: this.$el.find('input[name="author"]').val(),
            releaseDate: new Date(this.$el.find('input[name="releaseDate"]').val()).getTime(),
            keywords:  keys
      });
      this.remove()
    },
    cancelBook: function(e) {
        e.preventDefault()
        this.remove()
    }

})


