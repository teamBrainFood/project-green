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
    "iron": {
      code: "303",
      description: "Iron is an essential element for blood production. About 70 percent of your body's iron is found in the red blood cells of your blood called hemoglobin and in muscle cells called myoglobin. Hemoglobin is essential for transferring oxygen in your blood from the lungs to the tissues. Myoglobin, in muscle cells, accepts, stores, transports and releases oxygen. About 6 percent of body iron is a component of certain proteins, essential for respiration and energy metabolism, and as a component of enzymes involved in the synthesis of collagen and some neurotransmitters. Iron also is needed for proper immune function.About 25 percent of the iron in the body is stored as ferritin, found in cells and circulates in the blood. The average adult male has about 1,000 mg of stored iron (enough for about three years), whereas women on average have only about 300 mg (enough for about six months). When iron intake is chronically low, stores can become depleted, decreasing hemoglobin levels. When iron stores are exhausted, the condition is called iron depletion. Further decreases may be called iron-deficient erythropoiesis and still further decreases produce iron deficiency anemia. Blood loss is the most common cause of iron deficiency. In men and postmenopausal women, iron deficiency is almost always the result of gastrointestinal blood loss. In menstruating women, genitourinary blood loss often accounts for increased iron requirements. Oral contraceptives tend to decrease menstrual blood loss, whereas intrauterine devices tend to increase menstrual bleeding. Other causes of genitourinary bleeding and respiratory tract bleeding also increase iron requirements."
  },
    "calcium": {
      code: "301",
      description: "Calcium, the most abundant mineral in the body, is found in some foods, added to others, available as a dietary supplement, and present in some medicines (such as antacids). Calcium is required for vascular contraction and vasodilation, muscle function, nerve transmission, intracellular signaling and hormonal secretion, though less than 1% of total body calcium is needed to support these critical metabolic functions. Serum calcium is very tightly regulated and does not fluctuate with changes in dietary intakes; the body uses bone tissue as a reservoir for, and source of calcium, to maintain constant concentrations of calcium in blood, muscle, and intercellular fluids. The remaining 99% of the body’s calcium supply is stored in the bones and teeth where it supports their structure and function. Bone itself undergoes continuous remodeling, with constant resorption and deposition of calcium into new bone. The balance between bone resorption and deposition changes with age. Bone formation exceeds resorption in periods of growth in children and adolescents, whereas in early and middle adulthood both processes are relatively equal. In aging adults, particularly among postmenopausal women, bone breakdown exceeds formation, resulting in bone loss that increases the risk of osteoporosis over time."
  },
    "magnesium": {
      code: "304",
      description: "Health benefits of magnesium include prevention of constipation, eclamptic seizures, and asthma. It keeps your nerves, muscles, and bones healthy. It also helps in protein synthesis and cellular metabolism. Magnesium is vital for sustaining a normal heartbeat and is used by doctors to treat irregularities in the heart rhythm. Other health benefits include its positive impact on reducing osteoporosis, and maintenance of sugar level, as well as its favorable effects on diabetes, back pain, and various psychiatric disorders."
  },
    "potassium": {
      code: "306",
      description: "Potassium is very important in the human body. Along with sodium, it regulates the water balance and the acid-base balance in the blood and tissues. Potassium enters the cell more readily than does sodium and instigates the brief sodium-potassium exchange across the cell membranes. In the nerve cells, this sodium-potassium flux generates the electrical potential that aids the conduction of nerve impulses. When potassium leaves the cell, it changes the membrane potential and allows the nerve impulse to progress. This electrical potential gradient, created by the sodium-potassium pump, helps generate muscle contractions and regulates the heartbeat. Another of the pump's most important functions is preventing the swelling of cells. If sodium is not pumped out, water accumulates within the cell causing it to swell and ultimately burst. Potassium is very important in cellular biochemical reactions and energy metabolism; it participates in the synthesis of protein from amino acids in the cell. Potassium also functions in carbohydrate metabolism; it is active in glycogen and glucose metabolism, converting glucose to glycogen that can be stored in the liver for future energy. Potassium is important for normal growth and for building muscle."
  },
    "zinc": {
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
    "copper": {
      code: "312",
      description: "Copper is a mineral that is found throughout the body. It helps your body make red blood cells and keeps nerve cells and your immune system healthy. It also helps form collagen, a key part of bones and connective tissue. Copper may also act as an antioxidant, reducing free radicals that can damage cells and DNA. Copper helps the body absorb iron. Your body also needs copper to make energy. Your body does not need much copper. Many people do not get enough copper in their diet, but it is rare to be truly deficient in copper. Signs of possible copper deficiency include anemia, low body temperature, bone fractures and osteoporosis, low white blood cell count, irregular heartbeat, loss of pigment from the skin, and thyroid problems. People who take high amounts of zinc, iron, or vitamin C may need more copper, but you should ask your health care provider before taking copper supplements. Too much copper can be dangerous."

  },
    "manganese": {
      code: "315",
      description: "Manganese is a trace mineral that is present in the human body in very small amounts, primarily in the bones, liver, kidneys and pancreas, according to the University of Maryland Medical School. It is important in the formation of bones, connective tissues, blood-clotting factors and sex hormones, and also is involved in fat and carbohydrate metabolism, calcium absorption and blood sugar regulation. In addition, it is important for brain and nerve function. Manganese may be helpful in treating osteoporosis, arthritis, premenstrual syndrome, diabetes and epilepsy."
  }};


  // Below is the object containing daily calorie requirements
  // The key is the age range i.e. 4 means under 4 years old
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
    age = $('#age').find(":selected").val();
    gender = $('#chooseGender').find(":selected").val();
    activityLevel = $('#chooseActivityLevel').find(":selected").val();
    nutrient = $('#nutrientSelected').find(":selected").val();


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
    database.ref().set(userInputs);

    //Below code is how we remove the blank UI state when the user pushes submit, so we can populate it with nutrient data
    $(".blank-state").remove();

    // Adding in Headers
    $('.mineral-copy').empty();
    $('.recommended-food-list').empty();
    $('#recipe-div').empty();

    // Adding in Headers
    $('.mineral-copy').html("<h5>" + nutrient + "</h5>")
    $('.recommended-food-list').html("<h5>Superfoods</h5>")
    $('#recipe-div').html("<h5>Recipes</h5>")


    // Below is how we populate the "Learn More" section with the corresponding nutrient info
    var copy = nutrients[nutrient].description;
    $("#mineral-copy").append("<p>" + copy + "</p>");


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

        var foodButton = $("<li>");
            foodButton.addClass("food-button");
            foodButton.attr("data-food", foodArray[i]);
            foodButton.text(foodArray[i]);

        $(".recommended-food-list").append(foodButton);

      }; // end of for loop

    }); // end of nutrition database response

    // Below is the calorie calculation
    var calorieLimit = 2000;

    // if age, gender or activity level information is not provided
     if (age === "Age" || gender === "Gender" || activityLevel === "Activity") {
    
       // empty the div showing calorie requriements 
       $('#calorie-limit').empty();
     }

     else {

    // get the calorie limit from the calories object and display it
       calorieLimit = calories[age][gender][activityLevel];
       $('#calorie-limit').empty();
       $('#calorie-limit').append("<h5>Recommended Calorie Limit</h5>");
       $('#calorie-limit').append("<p>" + calorieLimit + " Calories</p>");
     }

  }); // end of submit button click

  //Below is our onClick function when we click a food button
  $(document.body).on("click", ".food-button", function() {

    $('#recipe-div').empty();
    $('#recipe-div').html("<h5>Recipes</h5>")

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

      for (var i = 0; i < recipeResponse.length; i++) {

        var recipeURL = recipeResponse[i].recipe.url;
        var recipeImage = recipeResponse[i].recipe.image;
        var recipeLabel = recipeResponse[i].recipe.label;

        // Below is how we create our Recipe Card in HTML
        var recipeCard = $('<div>');
          recipeCard.addClass("recipes");
          recipeCard.html('<div class="card"><div class="card-image"><img src="' + recipeImage + '"><span class="card-title">' + recipeLabel + '</span></div><div class="card-action"><a id="recipe-url" href="' + recipeURL + '">View Recipe</a></div></div>');
          $('#recipe-div').append(recipeCard);
      }

    }); // end of recipe ajax function

  }); // end of food button click


}); // end of document.ready
