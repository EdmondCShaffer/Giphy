
var topics = ["Jiu-jitsu", "Judo", "Mma", "Boxing", "Football", "BasketBall", "Baseball", "Hockey", "Golf", "Snowboarding", "Skateboarding",];


function displayGiphy() {
    var sport = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=ShmCQ8Tb12t1UwqnlhJ79TmM2YsovaWM&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#gif-placeholder").empty();
        
        var result = response.data;
        console.log(result);
        for (var i = 0; i < result.length; i++) {

            

            var sportDiv = $("<div class = 'sport'>");

            var rating = result[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var sportImage = $("<img>");
            sportImage.attr("data-state","still");
            sportImage.attr("src", result[i].images.fixed_height_still.url);
            sportImage.attr("data-still", result[i].images.fixed_height_still.url);
            sportImage.attr("data-animate", result[i].images.fixed_height.url);
            sportImage.addClass("image");
            sportDiv.append(p);
            sportDiv.append(sportImage);

            $("#gif-placeholder").prepend(sportDiv);
            
        }




    });
}


function makeButtons() {
    $("#buttons-view").empty();
    

    for (var i = 0; i < topics.length; i++) {

        var btn = $("<button>");

        btn.addClass("sport-btn");

        btn.attr("data-name", topics[i]);

        btn.text(topics[i]);

        $("#buttons-view").append(btn);

    }
}

$("#add-sport").on("click", function(event) {
    event.preventDefault();

    var sport = $("#sport-input").val().trim();
    topics.push(sport);

    makeButtons();

});

$(document).on("click",".image", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr('src', $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log(this);
    }

});

$(document).on("click", ".sport-btn", displayGiphy);

makeButtons();








