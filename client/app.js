var app = angular.module("movieDB", []);
app.controller("MainCtrl", function($q, $http) {
  var vm = this;
  vm.apiKey = "";
  vm.isError = false;
  var pattern = new RegExp("^[A-z0-9]+$");

  /**
   * Retrieves search results from the MovieDB API using the apiGet function.
   * Params are retrieved from the view model (vm).
   * @param {String} vm.apiKey - The required key to retrieve data from the MovieDB API.
   * @param {String} vm.searchCriteria - The search criteria for the MovieDB API.
   */
  vm.search = function() {
    if (pattern.test(vm.apiKey + vm.searchCriteria)) {
      let searchUrl =
        "https://api.themoviedb.org/3/search/movie?api_key=" +
        vm.apiKey +
        "&language=en-US&query=" +
        vm.searchCriteria +
        "&page=1&include_adult=false";
      var searchPromise = apiGet(searchUrl);
      searchPromise.then(
        function success(response) {
          vm.isError = false;
          vm.searchResults = response.data.results;
          vm.totalResults = response.data.total_results;
          vm.searchResults.splice(10);
        },
        function error(reason) {
          vm.isError = reason.data.status_message;
        }
      );
    } else {
      vm.isError = "Only enter letters or numbers";
    }
  };

  //Calls MongoDB API for list of watched movies
  function getWatchedList() {
    let watchListUrl = "/api/movies";
    var searchPromise = apiGet(watchListUrl);
    searchPromise.then(
      function success(response) {
        vm.watchedList = response.data;
      },
      function error(reason) {
        vm.isError = reason.data.status_message;
      }
    );
  }
  getWatchedList();

  //TODO PUT
  vm.updateWatchedList = function(idToAdd) {
    //TODO
  };

  /**
   * Performs a GET call to a provided URL.
   * @param {String} url - The URL to be used in the GET call.
   * @returns {Array} The search result data, or reason for failure if call fails.
   */
  function apiGet(url) {
    var deferred = $q.defer();
    $http.get(url).then(
      function success(response) {
        deferred.resolve(response);
      },
      function error(reason) {
        deferred.reject(reason);
      }
    );
    return deferred.promise;
  }

  /**
   * Performs a PUT call to a provided URL.
   * @param {String} url - The URL to be used in the GET call.
   * @returns {Array} The resulting data, or reason for failure if call fails.
   */
  function apiPut(url, data) {
    var deferred = $q.defer();
    $http.put(url).then(
      function success(response) {
        deferred.resolve(response);
      },
      function error(reason) {
        deferred.reject(reason);
      }
    );
    return deferred.promise;
  }
});
