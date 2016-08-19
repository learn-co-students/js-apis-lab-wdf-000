//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "public": true,
    "description": description,
    "files": {}
  }
  data["files"][file_name] = {"content": content}
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
	Authorization: "token " + token
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
    url: 'https://api.github.com/gists',
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    success: function(data) {
      console.log(data)
    }
  });
};

var bindCreateButton = function() {
  $('#gist').on('submit', function(event) {
    event.preventDefault;
    var $token = $('#token').val();
    var $filename = $('#filename').val();
    var $description = $('#description').val();
    var $content = $('#contents').val();
    createGist($filename, $content, $description, $token);
    event.preventDefault();

  });
};

$(document).ready(function(){
  bindCreateButton();
});
