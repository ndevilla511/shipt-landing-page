(function($, window, document){
  var stores = {
    stores: [],
    init: function() {
      this.cacheDom();
      this.bindEvents();
      this.render();
    },
    cacheDom: function() {
      this.$zipInput = $('#zipInput');
      this.$zipSubmit = $('.zipSubmit');
      this.$storesDisplay = $('#stores-display');
      this.$storesDisplayContainer = $('#stores-display-container');
      this.$errorMessage = $('#errorMessage');
    },
    bindEvents: function() {
      this.$zipSubmit.click(this.getStoresData.bind(this));
      this.$zipInput.focus(this.removeErrorState.bind(this));
    },
    addErrorState: function(error) {
      this.$storesDisplayContainer.css("display", "none");
      this.$errorMessage.css("display", "block");
      this.$zipInput.css({
        "color": "#ef7b41",
        "background": "url('../img/locationalerticon.png') left 15px top 15px no-repeat, url('../img/AlertNormal.png') right 15px top 10px no-repeat",
        "background-color" : "#ffffff"
      })
    },
    removeErrorState: function() {
      this.$errorMessage.css("display", "none");
      this.$zipInput.css({
        "color": "#414041",
        "background": "url('../img/locationfocusedicon.png') no-repeat scroll 15px 15px",
        "background-color": "#ffffff"
      });
    },
    addStoresData: function(result) {
      this.stores = result.stores.sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
      this.$storesDisplayContainer.css("display", "block");
      this.render();
    },
    getUrl: function() {
      return  "https://shipt-zip-code-test-api.herokuapp.com/api/zip_codes/"
    },
    getZipCode: function() {
      return this.$zipInput.val();
    },
    clearStoresDisplay: function() {
      this.$storesDisplay.empty();
    },
    getStoresData: function() {
      var _this = this;
      _this.clearStoresDisplay();
      $.ajax({
        method: "GET",
        url: _this.getUrl() + _this.getZipCode()
      })
        .done(_this.addStoresData.bind(this))
        .fail(_this.addErrorState.bind(this));
    },

    render: function() {
      var _this = this;
      $.each(_this.stores, function(index, value) {
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
        _this.$storesDisplay.append(storeDiv);
      })
    }
  };
  stores.init();
}(window.jQuery, window, document));

