//define functions here
var createGist = function(file_name, content, description, token){
  var info = {
    "description": description,
    "public": true,
    "files": {}
  };

  info["files"][file_name] = {
    "content": content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify(info)
  }).then(function(response) {
    myGists(response.owner.login, token);
  });

};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/'+ username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {

    $.each(gists.data, function(index, gist) {
      var link = $('<a>')
      .attr('href', gist.html_url)
      .text(gist.description);

      var listItem = $('<li>')
      .append(link);

      $('#my-gists').append(listItem);
    })
  });

};

var bindCreateButton = function() {
  // call functions here
  $('#create').click(function(event) {
    var token = $('#token').val();
    var fileName = $('#fileName').val();
    var description = $('#description').val();
    var content = $('#content').val();
    createGist(fileName, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
