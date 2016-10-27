//define functions here
var createGist = function(file_name, content, description, token){

  // var data = {
  //   'public' : true,
  //   'description' : description,
  //   'files' : { file_name : { 'content' : content } }
  // };

  var data = {
  'public':   true,
  'description': description,
  'files': {}
  };
  data['files'][file_name] = { 'content': content };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: token
},
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  // var token = 'ad4c5a546b78fa1cb652db42f50aeb2227162138'
  $.ajax({
  url: 'https://api.github.com/users/' + username + '/gists',
  type: 'GET',
  dataType: 'jsonp'
}).done(function(response){
  $('.gists').html('');
$.each(response.data, function(index, gist){
  var link = $('<a>')
    .attr('href', gist.html_url)
    .text(gist.description);

  var gistList = $('<li>').append(link);

    $('.gists').append('gistList');
})
});
};

var bindCreateButton = function() {
  // call functions here
  $('.button').on('click', function() {
    var fileName = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    var token = $('#token').val();
    createGist(fileName, content, description, token);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
