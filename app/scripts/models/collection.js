var Backbone = require('backbone');

var Ship = Backbone.Model.extend({
  idAttribute: "_id",
  // urlRoot: 'http://tiny-lasagna-server.herokuapp.com/collections/pizzaShips'
});

var Ships = Backbone.Collection.extend({
  model: Ship,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/pizzaShips/',
  // url: 'http://swapi.co/api/starships/',
  // parse: function(data){
  //   return data.results;
  // }
});

module.exports = {
  Ship: Ship,
  Ships: Ships
};
