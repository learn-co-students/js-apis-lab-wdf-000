//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "public"      : true,
    "description" : description,
    "files"       : {}
  }
  data["files"][file_name] = {"content": content}
  $.ajax({
    url     : 'https://api.github.com/gists',
    type    : 'POST',
    dataType: 'json',
    headers : {
      Authorization: token
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    console.log(response);
    myGists(response["owner"]["login"], token);
  }).fail(function(error) {
    console.log(error);
  });
};

var myGists = function (username, token){
  $.ajax({
    url     : 'https://api.github.com/gists',
    type    : 'GET',
    dataType: 'json',
    headers : {
      Authorization: token
    },
    success: function(data) {
      console.log(data)
    }
  });
};

var bindCreateButton = function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    var token = $('#token').val();
        filename = $('#filename').val();
        description = $('#description').val();
        content = $('#contents').val();
    createGist(filename, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
