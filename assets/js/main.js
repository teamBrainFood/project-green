$( document ).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_JrNTPoPd0yT8XdPkM-TfRRaHRlkxXAQ",
    authDomain: "brain-food-6703e.firebaseapp.com",
    databaseURL: "https://brain-food-6703e.firebaseio.com",
    projectId: "brain-food-6703e",
    storageBucket: "brain-food-6703e.appspot.com",
    messagingSenderId: "26885582351"
  };
  firebase.initializeApp(config);
  // Below is our variable to refrence the firebase database
  var database = firebase.database();

  // all other variales
  var name = '';
  var age = '';
  var gender = '';
  var activityLevel = '';
  var nutrient = '';

  //Below is our onClick function when we click "Submit"
  $("#submit-btn").on("click", function() {
    // Below prevents default functionality on clicking submit button
    event.preventDefault();

    name = $("#name").val();
    age = $("#age").val();
    gender = $("input[name=gender]:checked").val();
    activityLevel = $("input[name=activity]:checked").val();
    nutrient = $("input[name=nutrient]:checked").val();

    console.log(name);
    console.log(age);
    console.log(gender);
    console.log(activityLevel);
    console.log(nutrient);

  // Below are our user input variables that we also need to create in firebase to store
  userInputs = {
      name, name,
      age: age,
      gender: gender,
      activityLevel: activityLevel,
      nutrient: nutrient
    };

    //Below code is how we push iputs to firebase when we click submit
    database.ref().push(userInputs);

  });
});
