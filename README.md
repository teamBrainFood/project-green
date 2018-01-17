# project-green

Concept:

An app that calls the USDA’s API to find foods with a high concentration of a user chosen mineral or vitamin.

The app will then call a separate API to retrieve recipes based upon the food results and the choice of food that the user decides to research.

The app also provides data about suggested calorie consumption based on the user entering their gender, age and activity level. 


Function:

User fills out a form on the main page providing their name, age, gender, activity level, and the mineral or vitamin they are interested in. Aside from the name, the options are listed in a drop down menu form to provide a more pleasant UI experience.

The app will work without the user providing name, age, gender and activity level. It will maintain all functionality aside from calorie count.

User details are stored to firebase to allow for easier access to previous sessions, requests, and searches.

Once data is provided the app makes a call to the USDA API to pull the top ten vegetable sources based on that particular mineral or vitamin content. 

The other details provided on the original form are used to search stored object in the code and provide a suggest calorie content for the individual. 

The app also provides a description of the mineral or vitamin and its effects and benefits in the human body. This information also comes from an object stored in the app code.

Once the call has been returned the app shows a list of 10 vegetables (superfoods) for the user to choose from. These appear as a list on the page and function as links. When the user chooses a superfood an API call is made to Edamam to return a list of 10 recipe that feature that food as the main ingredient. These recipes are then displayed on the page as recipe cards including a photo and a title, and again function as links. 

When a user chooses a recipe from the page the browser then opens a new window to display the full recipe. 


Future Opportunities 

In the next iteration we would have a function to store favorite recipes, and previous searches. There is a great opportunity to place another API call to a grocery retailer to begin a shopping list.
Oppertunity to add a search for vegetables you do not recognize.

