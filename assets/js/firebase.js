<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase.js"></script>
<script>
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

  var database = firebase.database();

  // Below are our user input variables that we also need to create in firebase to store
  userInputs = {
      name, name,
      age: age,
      height: height,
      weight: weight,
      gender: gender
    };

    //Below code is how we push iputs to firebase when we click submit
    database.ref().push(userInputs);

</script>
