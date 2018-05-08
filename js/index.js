(function($, window, document) {
  var zipInput = $('#zipInput');
  var zipSubmit = $('.zipSubmit');
  var storesDisplay = $('#stores-display');
  var storesDisplayContainer = $('#stores-display-container');
  var errorMessage = $('#errorMessage');
  var zipAPI = "https://shipt-zip-code-test-api.herokuapp.com/api/zip_codes/";

  //click handler for the button on the zip code input
  zipSubmit.click(function() {
    var zipCode = $('#zipInput').val();

    //clear the stores display div
    storesDisplay.empty();

    //ajax request to the shipt zipcode api
    $.ajax({
      method: "GET",
      url: zipAPI + zipCode
    }).done(function(result) {
      var stores = result.stores;
      storesDisplayContainer.css("display", "block");

      //sorts through the stores array alphabetically
      stores.sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });

      //iterate through each store object in the array
      $.each(stores, function(index, value) {
        var storeName = value.name;
        var launchDate = new Date(value.launch_date);
        var currentDate = new Date();
        var availability = ( currentDate < launchDate ) ?
          "Coming " + (launchDate.getMonth() + 1) + "/" + launchDate.getDate()
          :
          "Now Available";

        //create a div that displays store name and availability
        var storeDiv = $("<div class='col-md-2 d-flex flex-column justify-content-between text-center'>" +
          "<h5 class='text-bold store-name mb-4'>" +
          storeName +
          "</h5>" +
          "<p class='text-small availability'>" +
          availability +
          "</p>" +
          "</div>");

        //appends a div for each store object to the storesDisplay div
        storesDisplay.append(storeDiv);
      })

    }).fail(function(error) {

      //hides the storesDisplayContainer div in case of error
      storesDisplayContainer.css("display", "none");

      //displays the error message underneath the input and button
      errorMessage.css("display", "block");

      //applies error styling to the zip input
      zipInput.css({
        "color": "#ef7b41",
      "background": "url('../img/locationalerticon.png') left 15px top 15px no-repeat, url('../img/AlertNormal.png') right 15px top 10px no-repeat",
      "background-color" : "#ffffff"
      });
    });
  });

  //if the error message is displayed, putting the input on focus reverts styling and hides the error message
  zipInput.focus(function() {
    errorMessage.css("display", "none");
    zipInput.css({
      "color": "#414041",
      "background": "url('../img/locationfocusedicon.png') no-repeat scroll 15px 15px",
      "background-color": "#ffffff"
    });
  });
}(window.jQuery, window, document));