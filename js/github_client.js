//define functions here
var createGist = function(file_name, content, description, token) {
  var data = {
    'description' : description,
    'public' : true,
    'files' : {}
  };
  data['files'][file_name] = {
    'content' : content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: token
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    var username = response.owner.login;
    myGists(username, token);
  });
};

var myGists = function (username, token) {
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp',
    headers: {
      Authorization: token
    },
  }).done(function(response) {
    $.each(response.data, function(index, gist) {
      var gLink = gist.html_url, gDescription = gist.description, html = '<li><a href="' + gLink + '">' + dDescription + '</a></li>';
      $('#myGists').append(html);
    });
  });
};


var bindCreateButton = function() {
  // call functions here
  $('#create').click(function() {
    var file_name = $('#file_name').val(), content = $('#content').val(), description = $('#description').val(), token = $('#token').val();
    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton()
});
