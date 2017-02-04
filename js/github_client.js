//define functions here
var createGist = function(file_name, content, description, token){
  var gists = {
  "description": description,
  "public": true,
  "files": {
    [file_name]: {
      "content": content
    }
  }
};
  $.ajax({
    url:  'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify(gists)
  }).done(function(response) {
    var username = response.owner.login;
    myGists(username, token);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: "https://api.github.com/users/" + username + "/gists",
    type: 'GET',
    dataType: 'jsonp',
    headers: {
      Authorization: "token " + token
    },
  }).done(function(gists){
    $.each(gists.data, function(index, gist) {
      var gist_link = gist.html_url
      var gdescription = gist.description
      var html = '<li><a href="' + gist_link + '">' + gdescription + '<\/a><\/li>'
      $("#myGists").append(html)
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


$(document).ready(function(){
  bindCreateButton();
});
