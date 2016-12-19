//define functions here
var createGist = function(fileName, content, description, token){

  var data = {
    "description": description,
    "public": true,
    "files": {}
  }
  data["files"][fileName] = {
    "content":content
  }

  $.ajax({
    url: "https://api.github.com/gists",
    type: "POST",
    dataType: "json",
    headers:{
      Authorization: "token " + token
    },
    data: JSON.stringify(data)
  }).then(response=>{
    myGists(response.owner.login, token);
  })

};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/'+ username + '/gists',
    type: 'GET',
    dataType: 'jsonp'
  }).done(function(gists) {
    
    $.each(gists.data, function(index, gist) {
      var link = $('<a>')
      .attr('href', gist.html_url)
      .text(gist.description);

      var listItem = $('<li>')
      .append(link);

      $('#myGists').append(listItem);
    })
  });

};

var bindCreateButton = function() {
  // call functions here
  $('#create').click(()=>{
    var token = $('#token').val();
    var fileName = $('#fileName').val();
    var content = $('#content').val();
    var description = $('#description').val();

    createGist(fileName, content, description, token);
  })
};

$(document).ready(function(){
  bindCreateButton();
});
