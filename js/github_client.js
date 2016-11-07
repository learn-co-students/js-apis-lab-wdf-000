//define functions here

var createGist = function(file_name, content, description, token){
  
  var gist = {
    "description": description,
    "public": true,
    "files": {
      [file_name]: {
        "content": content
      }
    }
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify(gist)
  }).done(function(response) {
    var username = response.owner.login;
    myGists(username, token);
  });

};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {
    $.each(gists.data, function(index, gist) {
      var gist_link = gist.html_url
      var gdescription = gist.description
      var html = '<a href="' + gist_link + '">' + gdescription + '<\/a>'
      $("myGists").append(html)
    });
  });
};

var bindCreateButton = function() {
  // call functions here
  $("form#newGist").submit(function(event) {
    event.preventDefault();

    var file_name = $("#fileName").val();
    var content = $("#content").val();
    var description = $("#description").val();
    var token = $("#token").val();

    createGist(file_name, content, description, token);
  });
};

$(document).ready(function() {
  bindCreateButton();
});
