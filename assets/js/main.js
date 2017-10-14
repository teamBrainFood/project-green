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
    discription: "Iron is an essential element for blood production. About 70 percent of your body's iron is found in the red blood cells of your blood called hemoglobin and in muscle cells called myoglobin. Hemoglobin is essential for transferring oxygen in your blood from the lungs to the tissues. Myoglobin, in muscle cells, accepts, stores, transports and releases oxygen. About 6 percent of body iron is a component of certain proteins, essential for respiration and energy metabolism, and as a component of enzymes involved in the synthesis of collagen and some neurotransmitters. Iron also is needed for proper immune function.About 25 percent of the iron in the body is stored as ferritin, found in cells and circulates in the blood. The average adult male has about 1,000 mg of stored iron (enough for about three years), whereas women on average have only about 300 mg (enough for about six months). When iron intake is chronically low, stores can become depleted, decreasing hemoglobin levels. When iron stores are exhausted, the condition is called iron depletion. Further decreases may be called iron-deficient erythropoiesis and still further decreases produce iron deficiency anemia. Blood loss is the most common cause of iron deficiency. In men and postmenopausal women, iron deficiency is almost always the result of gastrointestinal blood loss. In menstruating women, genitourinary blood loss often accounts for increased iron requirements. Oral contraceptives tend to decrease menstrual blood loss, whereas intrauterine devices tend to increase menstrual bleeding. Other causes of genitourinary bleeding and respiratory tract bleeding also increase iron requirements."
},
  calcium: {
    code: "301",
    discription: "Calcium, the most abundant mineral in the body, is found in some foods, added to others, available as a dietary supplement, and present in some medicines (such as antacids). Calcium is required for vascular contraction and vasodilation, muscle function, nerve transmission, intracellular signaling and hormonal secretion, though less than 1% of total body calcium is needed to support these critical metabolic functions. Serum calcium is very tightly regulated and does not fluctuate with changes in dietary intakes; the body uses bone tissue as a reservoir for, and source of calcium, to maintain constant concentrations of calcium in blood, muscle, and intercellular fluids. The remaining 99% of the body’s calcium supply is stored in the bones and teeth where it supports their structure and function. Bone itself undergoes continuous remodeling, with constant resorption and deposition of calcium into new bone. The balance between bone resorption and deposition changes with age. Bone formation exceeds resorption in periods of growth in children and adolescents, whereas in early and middle adulthood both processes are relatively equal. In aging adults, particularly among postmenopausal women, bone breakdown exceeds formation, resulting in bone loss that increases the risk of osteoporosis over time."
},
  magnesium: {
    code: "304",
    discription: "Health benefits of magnesium include prevention of constipation, eclamptic seizures, and asthma. It keeps your nerves, muscles, and bones healthy. It also helps in protein synthesis and cellular metabolism. Magnesium is vital for sustaining a normal heartbeat and is used by doctors to treat irregularities in the heart rhythm. Other health benefits include its positive impact on reducing osteoporosis, and maintenance of sugar level, as well as its favorable effects on diabetes, back pain, and various psychiatric disorders."
},
  potassium: {
    code: "306",
    discription: "Potassium is very important in the human body. Along with sodium, it regulates the water balance and the acid-base balance in the blood and tissues. Potassium enters the cell more readily than does sodium and instigates the brief sodium-potassium exchange across the cell membranes. In the nerve cells, this sodium-potassium flux generates the electrical potential that aids the conduction of nerve impulses. When potassium leaves the cell, it changes the membrane potential and allows the nerve impulse to progress. This electrical potential gradient, created by the sodium-potassium pump, helps generate muscle contractions and regulates the heartbeat. Another of the pump's most important functions is preventing the swelling of cells. If sodium is not pumped out, water accumulates within the cell causing it to swell and ultimately burst. Potassium is very important in cellular biochemical reactions and energy metabolism; it participates in the synthesis of protein from amino acids in the cell. Potassium also functions in carbohydrate metabolism; it is active in glycogen and glucose metabolism, converting glucose to glycogen that can be stored in the liver for future energy. Potassium is important for normal growth and for building muscle."
},
  zinc: {
    code: "309",
    discription: "Zinc is found in cells throughout the body. It is needed for the body's defensive (immune) system to properly work. It plays a role in cell division, cell growth, wound healing, and the breakdown of carbohydrates. Zinc is also needed for the senses of smell and taste. During pregnancy, infancy, and childhood the body needs zinc to grow and develop properly. Recent information from an expert review on zinc supplements showed that: When taken for at least 5 months, zinc may reduce your risk of becoming sick with the common cold. Starting to take zinc supplements within 24 hours after cold symptoms begin may reduce how long the symptoms last and make the symptoms less severe."
},
  Vitamin C: {
    code: "401",
    discription: "Vitamins, including vitamin C, are organic compounds. An organic compound is one that exists in living things and contains the elements carbon and oxygen. Vitamin C is water soluble, and the body does not store it. To maintain adequate levels of vitamin C, humans need a daily intake of food that contains it. Vitamin C plays an important role in a number of bodily functions including the production of collagen, L-carnitine, and some neurotransmitters. It helps metabolize proteins and its antioxidant activity may reduce the risk of some cancers. Collagen, which vitamin C helps produce, is the main component of connective tissue and the most abundant protein in mammals. Between 1 and 2 percent of muscle tissue is collagen. It is a vital component in fibrous tissues such as: tendons, ligaments, skin, cornea, cartilage, bones, the gut, blood vessels"
},
  Vitamin B12: {
    code: "418",
    discription: "Vitamin B12 deficiency causes tiredness, weakness, constipation, loss of appetite, weight loss, and megaloblastic anemia. Nerve problems, such as numbness and tingling in the hands and feet, can also occur. Other symptoms of vitamin B12 deficiency include problems with balance, depression, confusion, dementia, poor memory, and soreness of the mouth or tongue. Vitamin B12 deficiency can damage the nervous system even in people who don’t have anemia, so it is important to treat a deficiency as soon as possible. In infants, signs of a vitamin B12 deficiency include failure to thrive, problems with movement, delays in reaching the typical developmental milestones, and megaloblastic anemia. Large amounts of folic acid can hide a vitamin B12 deficiency by correcting megaloblastic anemia, a hallmark of vitamin B12 deficiency. But folic acid does not correct the progressive damage to the nervous system that vitamin B12 deficiency also causes. For this reason, healthy adults should not get more than 1,000 mcg of folic acid a day."
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
    database.ref().set(userInputs);

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

        $("#superfoods").prepend(foodButton);

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

      var recipeURL = recipeResponse[0].recipe.url;

      var recipeImage = recipeResponse[0].recipe.image;
      
      var recipeLabel = recipeResponse[0].recipe.label;

      console.log(recipeURL);
      console.log(recipeImage);
      console.log(recipeLabel);
    });

  }); // end of food button click


}); // end of document.ready
