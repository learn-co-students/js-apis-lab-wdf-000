//define functions here
var createGist = function(file_name, content, description, token){

  var gist = {
    'public': true,
    'files': {},
    'description': description,
  };

  gist['files'][file_name] = {'content': content};

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "cf77ee050679aba9e3110d91a5fd59bb93dbc4a6"
    },
    data: JSON.stringify(gist)
  }).done(function(response) {
    var user = response.owner.login;
    myGists(user, token);
  });

};

var myGists = function (username, token){

  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp',
  }).done(function(response) {
    $.each(response.data, function(i, g) {
      var link = g.html_url;
      var desc = g.description;
      var html = `<li><a href="${link}">` + desc + '</a></li>'
    })
  })

};

var bindCreateButton = function() {
  // call functions here
  $("#newGist").submit(function(event) {
    event.preventDefault();

    var file_name = $("#fileName").val();
    var content = $("#content").val();
    var description = $("#description").val();
    var token = $("#token").val();

    createGist(file_name, content, description, token);
  });

};

$(document).ready(function(){
});
