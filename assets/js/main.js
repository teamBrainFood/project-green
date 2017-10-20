$( document ).ready(function() {

  // initialize Firebase ========================================================
  var config = {
    apiKey: "AIzaSyC_JrNTPoPd0yT8XdPkM-TfRRaHRlkxXAQ",
    authDomain: "brain-food-6703e.firebaseapp.com",
    databaseURL: "https://brain-food-6703e.firebaseio.com",
    projectId: "brain-food-6703e",
    storageBucket: "brain-food-6703e.appspot.com",
    messagingSenderId: "26885582351"
  };

  firebase.initializeApp(config);




  // variables ===================================================================

  // variable to reference the firebase database
  var database = firebase.database();


  // object containing information about each nutrient
  var nutrients = {
    "Iron": {
      code: "303",
      description: "Iron is an essential element for blood production. About 70 percent of your body's iron is found in the red blood cells of your blood called hemoglobin and in muscle cells called myoglobin. Hemoglobin is essential for transferring oxygen in your blood from the lungs to the tissues. Myoglobin, in muscle cells, accepts, stores, transports and releases oxygen. About 6 percent of body iron is a component of certain proteins, essential for respiration and energy metabolism, and as a component of enzymes involved in the synthesis of collagen and some neurotransmitters. Iron also is needed for proper immune function.About 25 percent of the iron in the body is stored as ferritin, found in cells and circulates in the blood. The average adult male has about 1,000 mg of stored iron (enough for about three years), whereas women on average have only about 300 mg (enough for about six months). When iron intake is chronically low, stores can become depleted, decreasing hemoglobin levels. When iron stores are exhausted, the condition is called iron depletion. Further decreases may be called iron-deficient erythropoiesis and still further decreases produce iron deficiency anemia. Blood loss is the most common cause of iron deficiency. In men and postmenopausal women, iron deficiency is almost always the result of gastrointestinal blood loss. In menstruating women, genitourinary blood loss often accounts for increased iron requirements. Oral contraceptives tend to decrease menstrual blood loss, whereas intrauterine devices tend to increase menstrual bleeding. Other causes of genitourinary bleeding and respiratory tract bleeding also increase iron requirements."
  },
    "Calcium": {
      code: "301",
      description: "Calcium, the most abundant mineral in the body, is found in some foods, added to others, available as a dietary supplement, and present in some medicines (such as antacids). Calcium is required for vascular contraction and vasodilation, muscle function, nerve transmission, intracellular signaling and hormonal secretion, though less than 1% of total body calcium is needed to support these critical metabolic functions. Serum calcium is very tightly regulated and does not fluctuate with changes in dietary intakes; the body uses bone tissue as a reservoir for, and source of calcium, to maintain constant concentrations of calcium in blood, muscle, and intercellular fluids. The remaining 99% of the body’s calcium supply is stored in the bones and teeth where it supports their structure and function. Bone itself undergoes continuous remodeling, with constant resorption and deposition of calcium into new bone. The balance between bone resorption and deposition changes with age. Bone formation exceeds resorption in periods of growth in children and adolescents, whereas in early and middle adulthood both processes are relatively equal. In aging adults, particularly among postmenopausal women, bone breakdown exceeds formation, resulting in bone loss that increases the risk of osteoporosis over time."
  },
    "Magnesium": {
      code: "304",
      description: "Health benefits of magnesium include prevention of constipation, eclamptic seizures, and asthma. It keeps your nerves, muscles, and bones healthy. It also helps in protein synthesis and cellular metabolism. Magnesium is vital for sustaining a normal heartbeat and is used by doctors to treat irregularities in the heart rhythm. Other health benefits include its positive impact on reducing osteoporosis, and maintenance of sugar level, as well as its favorable effects on diabetes, back pain, and various psychiatric disorders."
  },
    "Potassium": {
      code: "306",
      description: "Potassium is very important in the human body. Along with sodium, it regulates the water balance and the acid-base balance in the blood and tissues. Potassium enters the cell more readily than does sodium and instigates the brief sodium-potassium exchange across the cell membranes. In the nerve cells, this sodium-potassium flux generates the electrical potential that aids the conduction of nerve impulses. When potassium leaves the cell, it changes the membrane potential and allows the nerve impulse to progress. This electrical potential gradient, created by the sodium-potassium pump, helps generate muscle contractions and regulates the heartbeat. Another of the pump's most important functions is preventing the swelling of cells. If sodium is not pumped out, water accumulates within the cell causing it to swell and ultimately burst. Potassium is very important in cellular biochemical reactions and energy metabolism; it participates in the synthesis of protein from amino acids in the cell. Potassium also functions in carbohydrate metabolism; it is active in glycogen and glucose metabolism, converting glucose to glycogen that can be stored in the liver for future energy. Potassium is important for normal growth and for building muscle."
  },
    "Zinc": {
      code: "309",
      description: "Zinc is found in cells throughout the body. It is needed for the body's defensive (immune) system to properly work. It plays a role in cell division, cell growth, wound healing, and the breakdown of carbohydrates. Zinc is also needed for the senses of smell and taste. During pregnancy, infancy, and childhood the body needs zinc to grow and develop properly. Recent information from an expert review on zinc supplements showed that: When taken for at least 5 months, zinc may reduce your risk of becoming sick with the common cold. Starting to take zinc supplements within 24 hours after cold symptoms begin may reduce how long the symptoms last and make the symptoms less severe."
  },
    "Vitamin C": {
      code: "401",
      description: "Vitamins, including vitamin C, are organic compounds. An organic compound is one that exists in living things and contains the elements carbon and oxygen. Vitamin C is water soluble, and the body does not store it. To maintain adequate levels of vitamin C, humans need a daily intake of food that contains it. Vitamin C plays an important role in a number of bodily functions including the production of collagen, L-carnitine, and some neurotransmitters. It helps metabolize proteins and its antioxidant activity may reduce the risk of some cancers. Collagen, which vitamin C helps produce, is the main component of connective tissue and the most abundant protein in mammals. Between 1 and 2 percent of muscle tissue is collagen. It is a vital component in fibrous tissues such as: tendons, ligaments, skin, cornea, cartilage, bones, the gut, blood vessels"
  },
    "Vitamin B12": {
      code: "418",
      description: "Vitamin B12 deficiency causes tiredness, weakness, constipation, loss of appetite, weight loss, and megaloblastic anemia. Nerve problems, such as numbness and tingling in the hands and feet, can also occur. Other symptoms of vitamin B12 deficiency include problems with balance, depression, confusion, dementia, poor memory, and soreness of the mouth or tongue. Vitamin B12 deficiency can damage the nervous system even in people who don’t have anemia, so it is important to treat a deficiency as soon as possible. In infants, signs of a vitamin B12 deficiency include failure to thrive, problems with movement, delays in reaching the typical developmental milestones, and megaloblastic anemia. Large amounts of folic acid can hide a vitamin B12 deficiency by correcting megaloblastic anemia, a hallmark of vitamin B12 deficiency. But folic acid does not correct the progressive damage to the nervous system that vitamin B12 deficiency also causes. For this reason, healthy adults should not get more than 1,000 mcg of folic acid a day."
  },
    "Copper": {
      code: "312",
      description: "Copper is a mineral that is found throughout the body. It helps your body make red blood cells and keeps nerve cells and your immune system healthy. It also helps form collagen, a key part of bones and connective tissue. Copper may also act as an antioxidant, reducing free radicals that can damage cells and DNA. Copper helps the body absorb iron. Your body also needs copper to make energy. Your body does not need much copper. Many people do not get enough copper in their diet, but it is rare to be truly deficient in copper. Signs of possible copper deficiency include anemia, low body temperature, bone fractures and osteoporosis, low white blood cell count, irregular heartbeat, loss of pigment from the skin, and thyroid problems. People who take high amounts of zinc, iron, or vitamin C may need more copper, but you should ask your health care provider before taking copper supplements. Too much copper can be dangerous."
  },
    "Manganese": {
      code: "315",
      description: "Manganese is a trace mineral that is present in the human body in very small amounts, primarily in the bones, liver, kidneys and pancreas, according to the University of Maryland Medical School. It is important in the formation of bones, connective tissues, blood-clotting factors and sex hormones, and also is involved in fat and carbohydrate metabolism, calcium absorption and blood sugar regulation. In addition, it is important for brain and nerve function. Manganese may be helpful in treating osteoporosis, arthritis, premenstrual syndrome, diabetes and epilepsy."
  },
    "Phosphorus": {
      code: "305",
      description: "Next to calcium, phosphorus is the most abundant mineral in the body. These 2 important nutrients work closely together to build strong bones and teeth. About 85% of the body's phosphorus is in bones and teeth. Phosphorous is also present in smaller amounts in cells and tissues throughout the body. Phosphorus helps filter out waste in the kidneys and plays an essential role in how the body stores and uses energy. It also helps reduce muscle pain after a workout. Phosphorus is needed for the growth, maintenance, and repair of all tissues and cells, and for the production of the genetic building blocks, DNA and RNA. Phosphorus is also needed to help balance and use other vitamins and minerals, including vitamin D, iodine, magnesium, and zinc."
  },
    "Selenium": {
      code: "317",
      description: "Selenium is used for diseases of the heart and blood vessels, including stroke and “hardening of the arteries” (atherosclerosis). It is also used for preventing various cancers including cancer of the prostate, stomach, lung, and skin. Some people use selenium for under-active thyroid, osteoarthritis, rheumatoid arthritis (RA), an eye disease called macular degeneration, hay fever, infertility, cataracts, gray hair, abnormal pap smears, chronic fatigue syndrome (CFS), mood disorders, arsenic poisoning, and preventing miscarriage. Selenium is also used for preventing serious complications and death from critical illnesses such as head injury and burns. It is also used for preventing bird flu, treating HIV/AIDS, and reducing side effects from cancerchemotherapy."
  }};


  // object containing daily calorie requirements
  // the object key is the age range i.e. 4 means under 4 years old
  var calories = {
      4: {
        "male": [1000, 1100, 1200, 1300, 1400],
        "female": [1000, 1100, 1200, 1300, 1400]
    },
      9: {
        "male": [1400, 1500, 1600, 1800, 2000],
        "female": [1200, 1400, 1500, 1600, 1800]
    },
      14: {
        "male": [1800, 1900, 2000, 2300, 2600],
        "female": [1600, 1700, 1900, 2000, 2200]
    },
      19: {
        "male": [2200, 2400, 2800, 3000, 3200],
        "female": [1800, 2000, 2100, 2200, 2400]
    },
      31: {
        "male": [2400, 2600, 2800, 2900, 3000],
        "female": [2000, 2100, 2200, 2300, 2400]
    },
      51: {
        "male": [2200, 2400, 2600, 2800, 3000],
        "female": [1800, 2000, 2050, 2100, 2200]
    },
      999: {
        "male": [2000, 2200, 2400, 2500, 2800],
        "female": [1600, 1800, 1900, 2000, 2200]
    }
  };

  // all other variables
  var name = '';                  // user name
  var age = 'Age';                    // user age
  var gender = 'Gender';              // user gender
  var activityLevel = 'Activity';     // user activity level
  var nutrient = 'Nutrients';         // user selected nutrient
  var selectedFood = 'selectedFood';  // user selected food

  var foodResponse = '';              // stores ajax response from nutrition database
  var recipeResponse = '';            // stores ajax response from recipe database





  // functions =======================================================================

  // function to send information to firebase
  function setFirebase() {

    var userInputs = {
        name: name,
        age: age,
        gender: gender,
        activityLevel: activityLevel,
        nutrient: nutrient,
        selectedFood: selectedFood
    };

    // update firebase
    database.ref().set(userInputs);

  }; // end of setFirebase function

  // function that is called when the submit button is clicked
  function userSubmit() {

    // get values from user input form
    name = $("#name").val().trim();
    age = $('#age').find(":selected").val();
    gender = $('#chooseGender').find(":selected").val();
    activityLevel = $('#chooseActivityLevel').find(":selected").val();
    nutrient = $('#nutrientSelected').find(":selected").val();

    //remove the blank UI state
    $(".blank-state").remove();

    // empty the content divs
    $('.mineral-copy').empty();
    $('.recommended-food-list').empty();
    $('.recipe-div').empty();

    // add in headers
    $('.mineral-copy').html("<h5>" + nutrient + "</h5>");
    $('.recommended-food-list').html("<h5>Superfoods</h5>");
    $('.recipe-div').html("<h5>Recipes</h5>");

    // add message to recipes div
    $('.recipe-div').append("<p>Click on a superfood above to see recipes.</p>");    

    // populate the mineral-copy section with the corresponding nutrient info
    var copy = nutrients[nutrient].description;

    $(".mineral-copy").append("<p>" + copy + "</p>");


    // retrieve the nutrient code from the nutrients array
    var nutrientNumber = nutrients[nutrient].code;


    // ajax query to retrieve 25 foods
    $.ajax({
      type: "GET",
      url: "https://api.nal.usda.gov/ndb/nutrients/?api_key=u7cln9dkHVsbUoFLOUKnvEElzjOP58u0CNHWs0SP&max=25&fg=1100&sort=c&nutrients=" + nutrientNumber
    }).done(function(response) {

      // assign the ajax response to a variable
      var foodResponse = response.report.foods;

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

      // create food buttons

      // specify the maximum number of buttons to create
      var numberButtons = 10;

      // reduce the number of buttons to the number of foods in the array if necessary  
      if (foodArray.length < numberButtons) {
        numberButtons = foodArray.length
      };

      // create each button
      for (var i = 0; i < numberButtons; i++) {

        var foodButton = $("<li>");
            foodButton.addClass("food-button");
            foodButton.attr("data-food", foodArray[i]);
            foodButton.text(foodArray[i]);

        $(".recommended-food-list").append(foodButton);

      }; // end of for loop

    }); // end of nutrition database response function


    // display the calorie information

    // initialise variable    
    var calorieLimit = 0;

    // if age, gender or activity level information is not provided
    if (age === "Age" || gender === "Gender" || activityLevel === "Activity") {

      // display a message
      $('.calorie-limit').empty();
      $('.calorie-limit').append("<h5>Recommended Calorie Limit</h5>");
      $('.calorie-limit').append("<p>If you would like to see calorie recommendations, please provide your age, gender and activity level.</p>");
    }

    else {

      // get the calorie limit from the calories object and display it
      calorieLimit = calories[age][gender][activityLevel];
      $('.calorie-limit').empty();
      $('.calorie-limit').append("<h5>Recommended Calorie Limit</h5>");
      $('.calorie-limit').append("<p>The recommended calorie limit for your age, gender and activity level is " + calorieLimit + " calories per day.</p>");
    }

  }; // end of userSubmit function

  //Below is our onClick function when we click "Submit"
  $("#submit-btn").on("click", function() {

    // prevent default functionality on clicking button
    event.preventDefault();

    // Get the nutrient value, which is a required input
    nutrient = $('#nutrientSelected').find(":selected").val();

    // if the nutrient is still the default value, display a message
    if (nutrient == "Nutrients") {
      
      $(".blank-state").empty();
      $(".blank-state").html("<p>Please select a nutrient and click the Submit button</p>");
    }

    else {
      // call the userSubmit function above
      userSubmit();

      // update firebase with user input values
      setFirebase();
    };

  }); // end of submit button onClick function

  // Below is the function to get recipes when a food button is clicked
  function showRecipes(searchTerm) { 

    // clear the recipe div and add a title
    $('.recipe-div').empty();
    $('.recipe-div').html("<h5>Recipes</h5>")


    //Below is the ajax query to the database to retrieve recipes
    var ingredientURL = "https://api.edamam.com/search?" + "&q=" + searchTerm;

    $.ajax({
        url: ingredientURL,
        method: "GET"
      }).done(function(response) {

      // assign the ajax response to a variable
      recipeResponse = response.hits;

      // if there are no recipes, display a message
      if (recipeResponse.length == 0) {
        $('.recipe-div').append("<p>Sorry, there are no recipes available with that ingredient.</p><p>Please try another ingredient.</p>")
      };
  
      // create a recipe card for each recipe in the response
      for (var i = 0; i < recipeResponse.length; i++) {

        // get recipe information from the response object
        var recipeURL = recipeResponse[i].recipe.url;
        var recipeImage = recipeResponse[i].recipe.image;
        var recipeLabel = recipeResponse[i].recipe.label;

        // Below is how we create our Recipe Card in HTML
        var recipeCard = $('<div>');
          recipeCard.addClass("recipes");
          recipeCard.html('<div class="card"><div class="card-image"><img src="' + recipeImage + '"><span class="card-title">' + recipeLabel + '</span></div><div class="card-action"><a id="recipe-url" href="' + recipeURL + '" target="_blank">View Recipe</a></div></div>');
          $('.recipe-div').append(recipeCard);
      }

    }); // end of recipe ajax function

  }; // end of showRecipes function

  //Below is our onClick function when we click a food button
  $(document.body).on("click", ".food-button", function() {
    
    selectedFood = $(this).attr("data-food");

    // update firebase with new selection
    setFirebase();

    // call the showRecipes function above
    showRecipes(selectedFood);

  }); // end of food button onClick function


  // Below is our onClick function when we click the clear button  
  $(document.body).on("click", "#clear-btn", function() {
    
    // prevent default functionality on clicking the clear button
    event.preventDefault();

    // reset variables
    name = '';                  // user name
    age = 'Age';                    // user age
    gender = 'Gender';              // user gender
    activityLevel = 'Activity';     // user activity level
    nutrient = 'Nutrients';         // user selected nutrient
    selectedFood = 'selectedFood';  // user selected food

    foodResponse = '';              // stores ajax response from nutrition database
    recipeResponse = '';            // stores ajax response from recipe database

    // reset the values in firebase
    setFirebase();

    // refresh the page
    location.reload(true);

  });


  // Below occurs when page is first loaded =========================================

  // retrieve data from Firebase
  return firebase.database().ref().once('value').then(function(snapshot) {
        

          databaseName = snapshot.val().name;
          databaseAge = snapshot.val().age;
          databaseGender = snapshot.val().gender;
          databaseActivityLevel = snapshot.val().activityLevel;
          databaseNutrient = snapshot.val().nutrient;
          databaseFood = snapshot.val().selectedFood;

          // if firebase data is not the default data, update variables, input form and content
          if (databaseName !== "") {
              name = databaseName;
              $("#name").val(databaseName);
          };

          if (databaseAge !== "Age") {
              age = databaseAge;
              $("#age").val(databaseAge);
          };

          if (databaseGender !== "Gender") {
              gender = databaseGender;
              $("#chooseGender").val(databaseGender);
          };

          if (databaseAge !== "Activity") {
              activityLevel = databaseActivityLevel
              $("#chooseActivityLevel").val(databaseActivityLevel);
          };

          if (databaseNutrient !== "Nutrients") {
              nutrient = databaseNutrient;
              $("#nutrientSelected").val(databaseNutrient);
              userSubmit(); // runs userSubmit function as if user had clicked the submit button
          };

          if (databaseFood !== "selectedFood") {
              selectedFood = databaseFood;
              showRecipes(selectedFood); // retrieves recipes for selected food
          };

  }); // end of firebase data retrieval

}); // end of document.ready
