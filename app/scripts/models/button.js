var Backbone = require('backbone');

var Button = Backbone.Model.extend({
  defaults: {
    label: 'Load Ships',
    replace: 'Loading...',
    disable: 'disable',
    clicked: false,
    loaded: false
  }
});

module.exports = Button;
