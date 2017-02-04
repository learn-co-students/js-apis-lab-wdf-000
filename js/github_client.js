//define functions here

var createGist = function(file_name, content, description, token){

  var data = {
    "public": true,
    "description": description,
    "files": {}
  }
  data['files'][file_name] = {"content": content}

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: token
    },
    data: JSON.stringify(data)
  }).done(function(response) {
      myGists(response["owner"]["login"], token)
    });
};


var myGists = function (username, token){

    $.ajax({

    url: 'https://api.github.com/gists',
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: token
    }.done(function(data) {
       console.log(data)
    })
  });
};

var bindCreateButton = function() {
  $('#create').click(function() {
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();

    createGist(file_name, content, description, token);
  });

};

$(document).ready(function(){
});


