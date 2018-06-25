var animalArray = ["bird", "dog", "cat", "fox", "chicken", "zebra", "lion", "turtle", "llama", "snake", "frog"];

for(var i = 0; i < animalArray.length;i++){
   var animalBtn = $("<button>");
   animalBtn.attr("data-name",animalArray[i]);
   animalBtn.addClass("animalButton");
   animalBtn.text(animalBtn[0].dataset.name);
//    console.log(animalBtn);
   $("#animalButtons").append(animalBtn);
}
function guacamole () {
$(".animalButton").on("click",function(){
   var animal = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
   animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    // console.log(animal);
   $.ajax({
   url: queryURL,
   method: "GET"
   })
   .then(function(response) {
       var results = response.data;
       for (var i = 0; i < results.length; i++) {
           var gifDiv = $("<div class='item'>");
        // console.log(response.data);
           var rating = results[i].rating;

           var p = $("<p>").text("Rating: " + rating);

           var animalImage = $("<img>");
           animalImage.attr("src", results[i].images.fixed_height_still.url);
           animalImage.attr("data-still", results[i].images.fixed_height_still.url);
           animalImage.attr("data-animate", results[i].images.fixed_height.url);
           animalImage.attr("data-state", "still");
           animalImage.addClass("gif");
           animalImage.attr("data-state", "still");
           gifDiv.prepend(p);
           gifDiv.prepend(animalImage);
           $("#animals").prepend(gifDiv);
       }
    $(".gif").on("click", function (){
        event.preventDefault();
        var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    })   
    console.log(animalImage.data-state)
   });
});
};

guacamole();

$("#addAnimal").on("click" , function () {
    event.preventDefault();
    var newName = $("#animal-input").val().trim();
    var newAnimalBtn = $("<button>");
    // console.log(newName);
   newAnimalBtn.attr("data-name", newName);
   newAnimalBtn.addClass("animalButton");
   newAnimalBtn.text(newName);
   $("#animalButtons").append(newAnimalBtn);
//    console.log(newAnimalBtn);
    guacamole();
});

