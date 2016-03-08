var $;
window.jQuery = $ = require('jquery');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js');
window._ = require('underscore');
var Handlebars = require('handlebars');
var Backbone = require('backbone');
var Button = require('./models/button');
var models = require('./models/collection');
var buttonTem = require('../templates/button.handlebars');
var shipTem = require('../templates/ship.handlebars');
var shipsTem = require('../templates/ships.handlebars');
var newShipTem = require('../templates/newship.handlebars');
//to include an external handlebars template named header.handlebars
//just do a var header = require("./header.handlebars") assuming it is in
//the scripts folder
var ships = new models.Ships();
var submitBtn = new Button();
// var view = {
//   clear: function(){
//     $('.container').html('');
//   },
//   render: function(ship){
//     // $('.container').append('<div>' + ship.get("name")  + '</div>');
//     $('.container').append( shipTem( ship.toJSON() ));
//   }
// };
var modalView = {
  render: function(shipJSON){
    $('#modal').html(newShipTem(shipJSON));
    $('#post-new-ship').click(function(){
      $('#new-ship-form').submit();
    });
    $('#new-ship-form').on('submit', function(event){
      event.preventDefault();
      console.log($(this).serializeArray().toJSON());
      console.log(event);
    });
  }
};
var buttonView = {
  render: function(){
    $('#button-holder').html(buttonTem(submitBtn.toJSON()));
    $('#submit').click( doClick );
    $('#new-ship').click(function(){
      $('.modal').modal('toggle');
    });
  }
};
var shipsView = {
  clear: function(){
    $('#ships-holder').html('');
  },
  render: function(ships){
    shipsView.clear();
    // buttonView.render();
    $('#ships-holder').append( shipsTem( ships.toJSON() ));
    // ships.each(function(ship){
    //   view.render(ship);
    // });
    $('.delete-ship').click(function(event){
      var id = $(this).attr('id');
      var removed = ships.remove(ships.get(id));
      shipsView.render(ships);
    });
  }
};

buttonView.render();

function doClick( event ){
  console.log(event);
  submitBtn.set({'clicked': true});
  ships.fetch().done(function(){
    submitBtn.set({'clicked': false});
    submitBtn.set({'loaded': true });
    console.log(ships.slice(0,1)[0].toJSON());
    modalView.render(ships.slice(0,1)[0].toJSON());
    buttonView.render();
    shipsView.render(ships);
  });
  // $('#button-holder').html(buttonTem(submitBtn.toJSON()));
  // Backbone.sync("create", submitBtn.toJSON() );
}
