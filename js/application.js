data = [
  { name: "Mark-Paul Gosselaar", photo_url: "" },
  { name: "Delta Burke", photo_url: "img/avatars/delta.png" },
  { name: "Alf", photo_url: "img/avatars/alf.png" },
  { name: "Jaleel White", photo_url: "img/avatars/jaleel.png" },
  { name: "Ralph Macchio", photo_url: "img/avatars/ralph.png" },
  { name: "Candace Cameron", photo_url: "img/avatars/candace.png" },
  { name: "Patrick Duffy", photo_url: "img/avatars/pduff.png" },
  { name: "Arnold Schwartzengger", photo_url: "img/avatars/arnold.png" }
];

// New Code
function jsBuild(){
  data = data.reverse();
  appendDiv('#main-content', addDiv("id", "people"));
  loadDataBlock();
  appendDiv('#main-content', addDiv("class", "clear"));
  divFunctions();
}

function refresh(){
  $('form input').val("");
  $('#people').text("");
  loadDataBlock();
  divFunctions();
}

function addDiv(type, name){
  return '<div ' +type+ '="' +name+ '"></div>';
}

function appendDiv(target, html){
  $(target).append(html);
}

function loadDataBlock(){
  for(i=0; i<data.length; i++) {
    if (data[i].photo_url.trim() == "") {
      var image = "img/default.png";
    } else {
      var image = data[i].photo_url;
    }
    writePersonDiv(i, image);
  }
}

function writePersonDiv(i, img){
  var dataBlock = addDiv("class", "person");    
  var divSelect = '.person:nth-child(' +eval(i+1)+ ')';

  appendDiv('#people', dataBlock);
  appendDiv(divSelect, '<img src="' +img+ '" align="left">');
  appendDiv(divSelect, addDiv("class", "close"));
  appendDiv(divSelect + ' .close', '<img src="img/close.png">');
  appendDiv(divSelect, '<p>' +data[i].name+ '</p>');
}

function divFunctions(){
  divHover();
  divClose();
}

function divHover(){
  $('.person').hover(function(){
    $('.close', this).toggle();
  });
}

function divClose(){
  $('.person .close').on('click', function(){
    var selectedPerson = $(this).closest('.person').index();
    console.log(data[selectedPerson]);
    data.splice(selectedPerson, 1);
    $(this).closest('.person').remove();
  });
}

$(document).ready(function(){
  jsBuild();

  $('form').submit(function(e){
    e.preventDefault();
    var inputName = $('input[name=name]').val();
    var inputImg = $('input[name=photo_url]').val();
    data.unshift({name: inputName, photo_url: inputImg});
    refresh();
  });

});