app.controller('AdminTopicsController', ['$http', '$location', 'AdminFactory', function($http, $location, AdminFactory){
  const self = this;

  //********************************************//
  //         UPDATE CURRENT MAIN TOPIC          //
  //********************************************//
  self.mainTopic = AdminFactory.mainTopic;

  self.updateTopic = function(title, description, id) {
    AdminFactory.updateTopic(title, description, id);
  };

  //********************************************//
  //        UPDATE UPCOMING MAIN TOPIC          //
  //********************************************//
  self.upcomingMainTopic = AdminFactory.upcomingMainTopic;
  self.noUpcomingTopic = AdminFactory.noUpcomingTopic;

  self.updateUpcomingTopic = function(title, description, id) {
    AdminFactory.updateUpcomingTopic(title, description, id);
  };

  self.addUpcomingTopic = function(title, description) {
    AdminFactory.addUpcomingTopic(title, description);
  };

  //********************************************//
  //        SET NEW CURRENT MAIN TOPIC          //
  //********************************************//


  //*********************************************//
  //           UPDATE CURRENT SUBTOPICS          //
  //*********************************************//
  self.subTopic = AdminFactory.subTopic;

  self.updateSubTopic = function(title, description, id) {
    AdminFactory.updateSubTopic(title, description, id);
  };
  //*********************************************//
  //           UPDATE UPCOMING SUBTOPICS         //
  //*********************************************//
  self.upcomingSubTopic = AdminFactory.upcomingSubTopic;

  self.updateUpcomingSubTopic = function(title, description, id) {
    AdminFactory.updateUpcomingSubTopic(title, description, id);
  };

  //*********************************************//
  //          SET NEW CURRENT SUBTOPICS          //
  //*********************************************//


  self.update = true;

  self.updateView = function(){
    self.update = true;
  }

  self.newTriView = function(){
    self.update = false;
  }

}]);
