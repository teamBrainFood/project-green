<!DOCTYPE html>
<html>
<html lang ="en">
  <head>
    <meta charset="utf-8">
<title>ajax</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script type = "text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
</head>
<body>

<script>
var nutrientNumber = "303";
$.ajax({
  type: "GET",
  url: "https://api.nal.usda.gov/ndb/nutrients/?api_key=u7cln9dkHVsbUoFLOUKnvEElzjOP58u0CNHWs0SP&max=10&fg=1100&sort=c&nutrients=" + nutrientNumber,
}).done(function(response) {
 
    // assign the data array from the ajax response to a variable
    var foodResponse = response.report.foods;
    console.log(foodResponse);
  });
</script>

</body>
</html>

