//define functions here
var createGist = function(file_name, content, description, token) {
  const url = 'https://api.github.com/gists';
  let data = {
      'description': description,
      'public': true,
      'files': {
        [`${file_name}`]: {
          'content': content
        }
      }
    };

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: 'token ' + token,
    }, 
    data: JSON.stringify(data),
    error: function(data) {
      console.log(data);
    }
  }).done(function(response) {
    // console.log(response);
    let username = response.owner.login;
    myGists(username, token);
  });
};

var myGists = function(username, token) {
  const url = 'https://api.github.com/users/' + username + '/gists';

  $.ajax({
    url: url,
    headers: {
      Authorization: 'token ' + token
    }
  }).done(function(response) {
    console.log(response);
    response.forEach(function(gist) {
      if (gist.public) {
        let html = `<li><a href=${gist.html_url}>${gist.description}</a></li>`;
        $('#public-gists').append(html);
      }
    });
  });
};

var bindCreateButton = function() {
  $('#create-gist').on('click', function(e) {
    let token = $('#token').val();
    let fileName = $('#file-name').val();
    let description = $('#description').val();
    let content = $('#contents').val();

    e.preventDefault();
    createGist(fileName, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
