//define functions here
var createGist = function(file_name, content, description, token){
  $.ajax({
   url: 'https://api.github.com/gists',
   type: 'POST',
   dataType: 'json',
   headers:{
     Authorization:"token " + token
   },
   data: JSON.stringify({ description:description, public:true, files:{
     filename:{content:content}
   } })
 }).done(function(response) {
   myGists(response.owner.login, token);
 });
}


var myGists = function(username, token){
  $.ajax({
   url: `https://api.github.com/users/${username}/gists`,
   type: 'GET',
   dataType: 'json',
   headers:{
     Authorization:"token " + token
   }
 }).done(function(response) {
   $.map(response,function(x){
     $('div#gist ul').append(`<li><a href="${x.html_url}">${x.description}</a></li>`)
   })
 });

};

var bindCreateButton = function() {
  // call functions here
  var fileName = $('input#file_name').val();
  var content = $('input#content').val();
  var description = $('input#description').val();
  var token = $('input#token_input').val();
  createGist(fileName, content, description, token);
};

$(document).ready(function(){
  bindCreateButton();
});
