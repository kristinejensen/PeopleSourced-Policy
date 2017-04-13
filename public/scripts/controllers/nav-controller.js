app.controller('NavCtrl', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){

  var self = this;

      this.isActive = function (viewLocation) { 
          return viewLocation === $location.path();
      };


}]);
