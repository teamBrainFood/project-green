// code snippets for project 1


// BUTTONS AND FORMS ============================================

// get a value from an input box
$(document.body).on("click", "#submitButton", function() {

	// prevent the submit button from trying to submit form data
	event.preventDefault();

	var inputText = $("#inputBox").val().trim();

});


// button click
$(document.body).on("click", ".classButton", function() {

	// get info from the button attributes
	var info = $(this).attr("data-subject");

});




// ADD ELEMENTS TO A PAGE ======================================

// create a div
var newDiv = $("<div>");
	newDiv.addClass("imageDiv");
	newDiv.html("<p>Hello World</p>");
	newDiv.attr("data-subject", "data" );

// add an image to a div
var newImage = $("<img>");
	newImage.attr("src", "../images/image.jpg");
	targetDiv.append(newImage);

// empty a div
$("#targetDiv").empty();

// display the new div
$("#targetDiv").append(newDiv);




// APIs ===================================================================

// AJAX query
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kYICtWZcT1fj7pthCgscE5oHfqWoa3zP&limit=10" + "&q=" + searchTopic;

	// run ajax query
	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
 
 		// assign the data array from the ajax response to a variable
		var results = response.data;
	}




// FIREBASE ===========================================================

// Firebase config
var config = {
    apiKey: "AIzaSyCzznxex6YvP8LM1ZYs1Lo5lUZcJ3YZ-1A",
    authDomain: "heydude-93eb7.firebaseapp.com",
    databaseURL: "https://heydude-93eb7.firebaseio.com",
    projectId: "heydude-93eb7",
    storageBucket: "heydude-93eb7.appspot.com",
    messagingSenderId: "379940276754"
  };

firebase.initializeApp(config);


// Firebase initialise variables
var database = firebase.database();

var employeeName = '';
var role ='';
var startDate = '';


// append data to Firebase
database.ref().push({
employeeName: employeeName,
role: role,
startDate: startDate
});


// Retrieve data from Firebase
database.ref().on("value", function(snapshot) {

	// loop through each item in a Firebase database
	snapshot.forEach(function(childSnapshot){
		employeeName = childSnapshot.val().employeeName;
	    role = childSnapshot.val().role;
	    startDate = childSnapshot.val().startDate;

	    // add a row to a table
	    $("table").append("<tr class='employeeRecord'><td>" + employeeName + "</td><td>" + role + "</td><td>" + startDate + "</td></tr>");
	});
}
