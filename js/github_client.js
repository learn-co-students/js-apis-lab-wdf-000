$(document).ready(bindCreateButton);

//define functions here

var bindCreateButton = function() {
  // call functions here
  $('button#create_gist').click(function(e) {
    var file_name = $('input#file_name').val();
    var content = $('textarea#content').val();
    var description = $('input#description').val();
    var token = $('input#token').val();
    createGist(file_name, content, description, token);
  })
};

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
    dataType: 'json',
    headers: { 'Authorization': token },
    data: JSON.stringify(data)
  }).done( function(gists) {
    myGists(gists.owner.login, token);
  });
};

var myGists = function (username, token){
  var url = 'https://api.github.com/users/' + username + '/gists'
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp'
  }).done( function(gists) {
    $('#myGists').html('');

    $.each(gists.data, function(index, gist) {
      addGistToHTML(gist);
    })
  })
};

var addGistToHTML = function(gist) {
  var GISTS = $('div#gists');
  var para = $("<p>");
  var link = $("<a>").attr('href', gist.html_url).text(gist.description);
  GISTS.html('').append( para.append(link) );
}
// //define functions here
// var createGist = function(file_name, content, description, token){
//      var info = {
//       "description": description,
//       "public": true,
//       "files": {}
//     };
//
//     info["files"][file_name] = {
//       "content": content
//     };
//
//
//     $.ajax({
//       url: 'https://api.github.com/gists',
//       type: 'POST',
//       dataType: 'json',
//       headers: {
//       Authorization: `token ${token}`
//     },
//       data: JSON.stringify(info)
//   }).done(function(response) {
//     myGists(response.owner.login, token);
//   });
//
// };
//
//
//
// var myGists = function (username, token){
//      $.ajax({
//       url: 'https://api.github.com/users/'+ username + '/gists',
//      type: 'GET',
//       dataType: 'jsonp'
//     }).done
//
//
//
//     (function(gists) {
//
//       $.each(gists.data, function(index, gist) {
//         var link = $('<a>').attr('href', gist.html_url).text(gist.description);
//
//         var listItem = $('<li>').append(link);
//
//         $('#my-gists').append(listItem);
//       })
//     });
// };
//
//
//
// var bindCreateButton = function() {
//   // call functions here
//     // $('#create').click(function(event) {
//     $('#create').on("click", function() {
//
//       var token = $('#token').val();
//       var fileName = $('#fileName').val();
//       var description = $('#description').val();
//       var content = $('#content').val();
//       createGist(fileName, content, description, token);
//     });
// };
//
//
//
// $(document).ready(function(){
//   bindCreateButton();
// });
