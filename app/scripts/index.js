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
var editShipTem = require('../templates/editship.handlebars');
//to include an external handlebars template named header.handlebars
//just do a var header = require("./header.handlebars") assuming it is in
//the scripts folder
var ships = new models.Ships();
var submitBtn = new Button();
// $('#ships-holder').on('')
// var view = {
//   clear: function(){
//     $('.container').html('');
//   },
//   render: function(ship){
//     // $('.container').append('<div>' + ship.get("name")  + '</div>');
//     $('.container').append( shipTem( ship.toJSON() ));
//   }
// };
function handleForm ( model, status ){
  if(status === newShipTem){
    if ( model._id === '' ) {
      delete model._id;
    }
  }
  ships.create(model);
}

var modalView = {
  render: function(shipJSON, template){
    $('#modal').html(template(shipJSON));
    $('#post-new-ship').click(function(){
      $('#new-ship-form').submit();
    });
    $('#new-ship-form').on('submit', function(event){
      event.preventDefault();
      var context = {};
      var props = $(this).serializeArray();
      $.each(props, function(index, item){
        context[item.name] = item.value;
      });
      $('.modal').modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      handleForm(context, template );
      console.log('form submission handled');
      console.log(ships);
      shipsView.render(ships);
      modalView.render(ships.slice(0,1)[0].toJSON(), newShipTem);
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
    console.log('rendering ships');
    console.log(ships);
    $('#ships-holder').append( shipsTem( ships.toJSON() ));
    $('.delete-ship').click(function(event){
      var id = $(this).attr('id').slice(7);
      var removed = ships.remove(ships.get(id));
      shipsView.render(ships);
    });
    $('.edit-ship').click(function(event){
      var id = $(this).attr('id').slice(5);
      var model = ships.get(id);
      modalView.render(model.toJSON(), editShipTem );
      $('.modal').modal('toggle');
    });
  }
};

buttonView.render();

function doClick( event ){
  submitBtn.set({'clicked': true});
  buttonView.render();
  ships.fetch().done(function(){
    // ships.url = "http://tiny-lasagna-server.herokuapp.com/collections/newShips";
    // ships.each(function(ship){
    //   ships.create(ship);
    // });
    submitBtn.set({'clicked': false});
    submitBtn.set({'loaded': true });
    modalView.render(ships.slice(0,1)[0].toJSON(), newShipTem );
    buttonView.render();
    shipsView.render(ships);
  });

}
