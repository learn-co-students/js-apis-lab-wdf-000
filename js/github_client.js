//define functions here
var createGist = function(file_name, content, description, token){
  var gistFile = {
    public: true,
    description: description,
    files: {
      [file_name]: {
        content: content
      }
    }
  }

  var url = "https://api.github.com/gists"

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },

    data: JSON.stringify(gistFile)
  }).done(function(response){
    myGists(response.owner.login, token)
  }).fail(function(error){
    return "Something went Wrong. please try again."
  });




};

var myGists = function (username, token){

};

var bindCreateButton = function() {
  $('form').on('submit', function(event){

    event.stopPropagation();
    event.preventDefault()
  var token = $('input[name=token]').val();
  var fileName = $('input[name=file_name]').val();
  var description = $('input[name=description]').val();
  var content = $('input[name=content]').val();

  createGist(fileName, content, description, token)
  // call functions here
})
};

$(document).ready(function(){
  bindCreateButton();
});
