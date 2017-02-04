//define functions here

function createGist(file_name, content, description, token) {
  var data = {'public': true, 'description': description, 'files': {}};
  data['files'][file_name] = {};
  data['files'][file_name]['content'] = content;
  $.ajax({
  url: 'https://api.github.com/gists',
  type: 'POST',
  headers: {
    Authorization: token
  },
  data: JSON.stringify(data)
}).done(function(response){
  myGists(response['owner']['login'], token)
});
}

var myGists = function (username, token){
  $.ajax({
  url: '/users/' + username + '/gists',
  type: 'GET',
  dataType: 'json',
  headers: {
    Authorization: token
  }
  }).done(function(response) {
    console.log(response)
  });
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});
