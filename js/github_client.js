//define functions here
var createGist = function(file_name, content, description, token){
    var data = {
          'public':   true,
          'description': description,
          'files': {}
        };

    data['files'][file_name] = {
      'content': content
    };

    $.ajax({
      url: 'https://api.github.com/gists',
      type: 'POST',
      dataType: 'JSON', 
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + token);
      },
      data: JSON.stringify(data)
    }).done(function(response) {
      myGists(response.owner.login, token);
    });
};

var myGists = function (username, token){
    var uri = `https://api.github.com/users/${username}/gists`
    $.ajax({
    url: uri,
    type: 'GET',
    dataType: 'jsonp', 
    success: function(gists) {
      console.log(gists)
        $('#myGists').html('');

        $.each(gists.data, function(index, gist) {
        var link = $('<a>')
            .attr('href', gist.html_url)
            .text(gist.description);

        var listItem = $('<li>')
            .append(link);

        $('#myGists').append(listItem);
      })
    }
  })
};

var bindCreateButton = function() {
  $('#create').on('click', function() {
  var file_name = $('#file_name').val()
  var content = $('#content').val()
  var description = $('#description').val()
  var token = $('#token').val()

  createGist(token, file_name, content, description);
  });
};

$(document).ready(function(){
  var token = 'f98666a568fc5c0b55e90cc458a95833e8dbcec9f'
  bindCreateButton()
  myGists('ckshei',token) 
});

