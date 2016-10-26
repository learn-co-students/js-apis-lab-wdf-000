//define functions here

var createGist = function(file_name, content, description, token){
  var data = { description: description,
    public: true,
    files: {
      [file_name]: { content: content }
    }
  }
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify(data),
    error: function(error) { console.log(error) }
  }).done(function(response) { myGists(response.owner.login, token) });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + "/gists",
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    success: function(response) { showGists(response); },
    error: function() { return "There has been an error." }
  });
};

function showGists(data) {
  data.forEach(function(gist) {
    var description = gist.description;
    var url = gist.html_url;
    var html = "<a href='" + url + "'>" + description +"</a><br>"
    $('body').append(html);
  });
}

var bindCreateButton = function() {
  $('#submit').on('click', (e) => { var file_name = $('#file_name').val();
  var content = $('#content').val();
  var description = $('#description').val();
  var token = $('#token').val();
  e.preventDefault();
  createGist(file_name, content, description, token) })
};

$(document).ready(function(){
   bindCreateButton();
});
