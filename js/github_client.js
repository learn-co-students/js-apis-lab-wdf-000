//define functions here
$(document).ready(function(){
	bindCreateButton()
});

var bindCreateButton = function() {

  $('#submit').on('click', function(e){
	  	var file_name = $('#file_name').val();
		var token = $('#token').val();
		var description = $('#description').val();
		var content = $('#content').val();
	  	createGist(file_name, content, description, token)
	})
};

var createGist = function(file_name, content, description, token){
	var data = {
		'public':   true,
	    'description': description,
	    'files': {
	  		[file_name]: {
	    		'content': content
	    	}
	    },
  };

	$.ajax({
	  	url: 'https://api.github.com/gists',
	  	type: 'POST',
	  	dataType: 'json',
	  	data: JSON.stringify(data),
	  	headers: {
	    	Authorization: `token ${token}`
	  	}
	}).done(function(response){
		var username = response.owner.login
		myGists(username, token)
	})

};

var myGists = function(username, token){
	$.ajax({
		url: `https://api.github.com/users/${username}/gists`,
		type: 'GET',
	  	dataType: 'jsonp',
	  	headers: {
	    	Authorization: `token ${token}`
	  	}
	}).done(function(response){
		// var description = response.data[0].description
		// var comments = response.data[0].comments
		var data = response.data
		parseHTML(data)
	})
}

function parseHTML(data){
	$.each(data, function (index, value){
		// debugger
		// $('#mygist').append(index)
		var para = $("<p>").html(1 + index + ". ")

		$('#mygist').append(para.append(value.description))
	})

	
}




