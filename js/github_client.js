//define functions here
var createGist = function(file_name, content, description, token){
  var sourceData = {
    description: description,
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
    data: JSON.stringify(sourceData),
    success: function(response) {
      myGists(response.owner.login, token); 
    },
    error: function(error) { 
      console.log("The request has" + error);
    }
  });
}

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
    headers: {
      Authorization: "token " + token
    },
    dataType: 'jsonp',
    success: function(response) {
      displayGist(response);
    },
    error: function(error) {
    }
  });
};

var bindCreateButton = function() {
  // call functions here
  $('#create').click(function(el) {
    let fileName = $('#file_name').val();
    let content = $('#content').val();
    let description = $('#description').val();
    let token = $('#token').val();
    el.preventDefault();
    
    createGist(fileName, content, description, token);
  });
};

 var displayGist = function(response) {
    let html = ''
    $.each(response.data, function(index, gist){
      html += `<li><a href=${gist.html_url}>${gist.description}</a></li>`;
    });
    $('#myGists').append(html);
  };


$(document).ready(function(){
  bindCreateButton();
});
