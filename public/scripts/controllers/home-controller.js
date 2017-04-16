app.controller('HomeController', ['$http', 'DataFactory', '$location', function($http, DataFactory, $location){
  var self = this;

  self.redirectLogin = function () {
    $location.url('/login');
  }

  self.redirectIdea = function () {
    $location.url('/idea');
  }
  
  self.userTally=DataFactory.userTally;

  self.ideasTally=DataFactory.ideasTally;

  self.commentsTally=DataFactory.commentsTally;

  self.likesTally=DataFactory.likesTally;

}]);
