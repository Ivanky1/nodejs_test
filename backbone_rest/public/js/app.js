/**
 * Created by Ena on 06.10.14.
 */
// js/app.js
var app = app || {};
(function() {
    /*window.app = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {}
    } */

    $( '#releaseDate' ).datepicker();
    new app.LibraryView()
}());

