//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
        'public': true,
        'description': description,
        'files': {
          }
      };

  data['files'][file_name] = {
      'content': content
    };

  data = JSON.stringify(data);

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
      beforeSend: function(xhr) { 
        xhr.setRequestHeader("Authorization", "token " + token); 
      },
    data: data
 }).done(function(response) {
    myGists(response.owner.login, token);
    console.log(response);
  });
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username  + '/gists',
    type: 'GET',
  }).done(function(data) {
    $.each(data, function(index, gist){
      str = '<p>';
      str += gist.html_url || 'html_url is undefined';
      str += '<br><br>Description: ' + gist.description;
      str += '</p>'

      $('#display').append(str);
    });
  });
};

var bindCreateButton = function() {
  // call functions here
  $('form').on('submit', function(event){
    event.preventDefault();

    var file_name = $('#file_name').val(), 
        content = $('#content').val(), 
        description = $('#description').val(), 
        token = $('#token').val();

    createGist(file_name, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
