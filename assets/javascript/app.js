let bandNames = ["incubus", "greenday", "red hot chili peppers"]

$(".search").on("click", function () {
    let searchTerm = $("#user-search").val().trim();
    bandNames.push(searchTerm);
    renderButtons();
    // console.log(bandNames);

    // Constructing a queryURL using the music name
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=10`;
    fetchGiphy(queryURL);

});

$(document).on("click", ".music-btn", function (e) {

    let dataName = $(e.target).attr("data-name");
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${dataName}&api_key=dc6zaTOxFJmzC&limit=10`;
    fetchGiphy(queryURL);
});

$(document).on("click", ".gif-image", function (e) {
    console.log(e.target);
    let currentState = $(e.target).attr("currentState");
    let animatedState = $(e.target).attr("animatedState");
    let stillState = $(e.target).attr("stillState");
    if (currentState === stillState) {
        $(e.target).attr("src", animatedState);
        $(e.target).attr("currentState", animatedState);
    } else {
        $(e.target).attr("src", stillState);
        $(e.target).attr("currentState", stillState);
    }

});

function renderButtons() {
    $("#buttonStorage").empty();
    for (let i = 0; i < bandNames.length; i++) {
        let buttonCreater = $("<button>");
        buttonCreater.addClass("music-btn btn btn-secondary my-1 mx-1");
        // Adding a data-attribute
        buttonCreater.attr("data-name", bandNames[i]);
        // Providing the initial button text
        buttonCreater.text(bandNames[i]);
        $("#buttonStorage").append(buttonCreater);
    }
}

function fetchGiphy(queryURL) {
    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
            console.log(response.data);
            $("#gifs-go-here").html("");
            response.data.forEach(datum => {
                let stillImgURL = datum.images.downsized_still.url;
                let animatedImgURL = datum.images.downsized.url;
                let imageDiv = $("<div class = 'col-md-8'>").text(datum.rating)
                let image = $("<img class = 'img-fluid mt-2 gif-image'>")
                console.log(datum.rating);
                image.attr("src", stillImgURL);
                image.attr("currentState", $(image).attr("src"));
                image.attr("animatedState", animatedImgURL);
                image.attr("stillState", stillImgURL);
                $(imageDiv).prepend(image);
                $("#gifs-go-here").prepend(imageDiv);
            });
        });

}