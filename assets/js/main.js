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

  // Below is our variable to reference the firebase database
  var database = firebase.database();


  // Below is the object containing information about each nutrient
  var nutrients = {
      iron: {
        code: "303",
        description: "Iron is an essential element for blood production. About 70 percent of your body's iron is found in the red blood cells of your blood called hemoglobin and in muscle cells called myoglobin. Hemoglobin is essential for transferring oxygen in your blood from the lungs to the tissues. Myoglobin, in muscle cells, accepts, stores, transports and releases oxygen. About 6 percent of body iron is a component of certain proteins, essential for respiration and energy metabolism, and as a component of enzymes involved in the synthesis of collagen and some neurotransmitters. Iron also is needed for proper immune function.About 25 percent of the iron in the body is stored as ferritin, found in cells and circulates in the blood. The average adult male has about 1,000 mg of stored iron (enough for about three years), whereas women on average have only about 300 mg (enough for about six months). When iron intake is chronically low, stores can become depleted, decreasing hemoglobin levels. When iron stores are exhausted, the condition is called iron depletion. Further decreases may be called iron-deficient erythropoiesis and still further decreases produce iron deficiency anemia. Blood loss is the most common cause of iron deficiency. In men and postmenopausal women, iron deficiency is almost always the result of gastrointestinal blood loss. In menstruating women, genitourinary blood loss often accounts for increased iron requirements. Oral contraceptives tend to decrease menstrual blood loss, whereas intrauterine devices tend to increase menstrual bleeding. Other causes of genitourinary bleeding and respiratory tract bleeding also increase iron requirements."
      },
      calcium: {
        code: "301",
        description: "Calcium, the most abundant mineral in the body, is found in some foods, added to others, available as a dietary supplement, and present in some medicines (such as antacids). Calcium is required for vascular contraction and vasodilation, muscle function, nerve transmission, intracellular signaling and hormonal secretion, though less than 1% of total body calcium is needed to support these critical metabolic functions. Serum calcium is very tightly regulated and does not fluctuate with changes in dietary intakes; the body uses bone tissue as a reservoir for, and source of calcium, to maintain constant concentrations of calcium in blood, muscle, and intercellular fluids. The remaining 99% of the body’s calcium supply is stored in the bones and teeth where it supports their structure and function. Bone itself undergoes continuous remodeling, with constant resorption and deposition of calcium into new bone. The balance between bone resorption and deposition changes with age. Bone formation exceeds resorption in periods of growth in children and adolescents, whereas in early and middle adulthood both processes are relatively equal. In aging adults, particularly among postmenopausal women, bone breakdown exceeds formation, resulting in bone loss that increases the risk of osteoporosis over time."
      },
      magnesium: {
        code: "304",
        description: "still to be added"
      },
      potassium: {
        code: "306",
        description: "still to be added"
      }}; 

  // all other variables
  var name = '';
  var age = '';
  var gender = '';
  var activityLevel = '';
  var nutrient = '';

  var foodResponse = '';    // used to store ajax response from nutrition database
  var recipeResponse = '';  // used to store ajax response from recipe database

  //Below is our onClick function when we click "Submit"
  $("#submit-btn").on("click", function() {

    // Below prevents default functionality on clicking submit button
    event.preventDefault();

    name = $("#name").val().trim();
    age = $("#age").val().trim();
    gender = $("input[name=gender]:checked").val();
    activityLevel = $("input[name=activity]:checked").val();
    // nutrient = $("input[name=nutrient]:checked").val();

    console.log("name " + name);
    console.log("age " + age);
    console.log("gender " + gender);
    console.log("activityLevel " + activityLevel);
    console.log("nutrient " + nutrient);

    // Below are our user input variables that we also need to create in firebase to store
    var userInputs = {
        name: name,
        age: age,
        gender: gender,
        activityLevel: activityLevel,
        nutrient: nutrient
    };

    //Below code is how we push inputs to firebase when we click submit
    database.ref().push(userInputs);

    //Below is retrieving the nutrient code from the nutrients array
    var nutrientNumber = nutrients[nutrient].code;

    console.log("nutrientNumber " + nutrientNumber);

    //Below is the ajax query to the database to retrieve 25 foods
    $.ajax({
      type: "GET",
      url: "https://api.nal.usda.gov/ndb/nutrients/?api_key=u7cln9dkHVsbUoFLOUKnvEElzjOP58u0CNHWs0SP&max=25&fg=1100&sort=c&nutrients=" + nutrientNumber
    }).done(function(response) {

      // assign the ajax response to a variable
      var foodResponse = response.report.foods;
      console.log(foodResponse);

      // initialise the food array
      var foodArray = [];

      // for each food in the response, check it is unique and add it to foodArray
      for (var i = 0; i < foodResponse.length; i++) {
        
        var foodString = foodResponse[i].name;

        // get the first part of the food name before the comma
        var foodName = foodString.split(",",1)[0];

        // if the food name has brackets get the first part of the food name before the brackets
        if (foodName.indexOf('(') > -1) {
            foodName = foodName.split("(",1)[0];
        };

        // if foodName is not already in foodArray, add it
        if (foodArray.indexOf(foodName) == -1) {
          foodArray.push(foodName);
        };

      }; // end of adding foods to array
      
      console.log(foodArray);

      var numberButtons = 10; // specifies the number of buttons to create

      // create buttons

      // if there are less than 10 items in the array, only create that number of buttons  
      if (foodArray.length < 10) {
        numberButtons = foodArray.length
      };

      // create each button
      for (var i = 0; i < numberButtons; i++) {

        var foodButton = $("<button>");
            foodButton.addClass("btn waves-effect waves-light food-button");
            foodButton.attr("data-food", foodArray[i]);
            foodButton.text(foodArray[i]);

        $("#explanation").prepend(foodButton);

      }; // end of for loop

    }); // end of nutrition database response

  }); // end of submit button click

  //Below is our onClick function when we click a food button
  $(document.body).on("click", ".food-button", function() {

    var selectedFood = $(this).attr("data-food");

    console.log("selectedFood " + selectedFood);

    //Below is the ajax query to the database to retrieve recipes
    var ingredientURL = "https://api.edamam.com/search?" + "&q=" + selectedFood;

    $.ajax({
        url: ingredientURL,
        method: "GET"
      }).done(function(response) {
   
      // assign the ajax response to a variable
      recipeResponse = response.hits;

      console.log(recipeResponse);
    });

  }); // end of food button click


}); // end of document.ready
