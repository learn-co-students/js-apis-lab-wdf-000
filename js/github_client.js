//define functions here


var createGist = function(fileName, content, description, token){
  var creativeInput = {
      "description": description,
      "public": true,
      "files": {}
    };
    creativeInput["files"][fileName] = {"content": content};
  // create a public gist
  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(creativeInput),
    headers: {
      Authorization: "token " + token
    }
  }).done(function(response){
    myGists(response.owner.login, token);
  });

};

var myGists = function (username, token){
  // console.log("I'm here!")
  var html = "";
  // return gists for a user
  $.ajax({
    url: "https://api.github.com/users/" + username + '/gists',
    type: 'GET',
    dataType: 'json',
  }).done(function(reply){

    $.each(reply, function(index, gisty){
      html = html + `<li><a href="${gisty.html_url}">${gisty.description}</a></li>`
    });
    // console.log(html);
    $('#myGists').append(html);
  });
};

var bindCreateButton = function() {

  $('#create').bind("click", function(event){
    event.preventDefault();
    var  token = $('#token').val();
    var  fileName = $('#file_name').val();
    var  description = $('#description').val();
    var  content = $('#content').val();

    createGist(fileName, content, description, token);
  });

};

$(document).ready(function(){
  bindCreateButton();
});
