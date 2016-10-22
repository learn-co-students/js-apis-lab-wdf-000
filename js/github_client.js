//define functions here
var createGist = function(file_name, content, description, token){
  let url = 'https://api.github.com/gists';
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: `token ${token}`
    },
    data: JSON.stringify({
      'public': true,
      'description': description,
      'files': {
        [`${file_name}`]: {
          "content": content
        }
      },
    })
  }).done(function( response ) {
    // console.log( response );
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  let url = `https://api.github.com/users/${username}/gists`;
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    headers: {
      Authorization: `token ${token}`
    },
    success: function(jsonData) {
      console.log('success');
      console.log(jsonData);
      displayResults(jsonData);
    },
    error: function() {
      console.log('failure');
    }
  });
};

var bindCreateButton = function() {
  // call functions here
  let inputs = collectInputs();
  let values = Object.keys(inputs).map(key => inputs[key]);
  if (values.includes("")) {
    console.log("Empty fields present!")
    return;
  } else {
    createGist(inputs.file_name, inputs.content, inputs.description, inputs.token);
  }
};

var collectInputs = function() {
  let inputs = {};
  $('form :input').each(function (el) {
    inputs[$(this).attr('name')] = $(this).val();
  });
  return inputs;
};

var displayResults = function(data) {
  let gists = $('<ul></ul>');
  data.forEach(function(element, index) {
    gists.append($(`<li><a href=${element.html_url}>${element.description}</a></li>`));
  });
  $('#myGists').html(gists);
};

$(document).ready(function(){
  $('#create').on('click', bindCreateButton);
});
