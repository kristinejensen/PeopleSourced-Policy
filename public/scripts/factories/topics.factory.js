app.factory('TopicsFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){

  //The active main topic ---- Home View && Admin Topics View
  var mainTopic = {list: []};
  //The upcoming main topic (next trimester) ---- Admin Topics View
  var upcomingMainTopic = {list: []};
  //The list of active subtopics ---- Add Idea Forms && Subtopic Navigation
  var subTopic = {list: []};
  //The list of upcoming subtopics for the admin view (next trimester)
  var upcomingSubTopic = {list: []};
  //One subtopic for subtopic view
  var individualSubTopic = {list: []};

  var noUpcomingTopic = {list: []};

  function adminTopicInit(){
    //finds active topic
    findActiveTopic();
    //finds upcoming topic
    findUpcomingTopic();
    //finds active subtopics
    findActiveSubTopics();
    //finds upcoming subtopics
    findUpcomingSubTopics();
    // //finds individual subtopic
    // thisSubtopic();
  }

 // init();

  //********************************************//
  //         UPDATE CURRENT MAIN TOPIC          //
  //********************************************//
  function updateTopic(title, description, id){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var mainTopic = {title: title, description: description, id: id}
        $http({
          method: 'PUT',
          url: '/admin-topics/updateActiveTopic',
          headers: {
            id_token: idToken
          },
          data: mainTopic
        }).then(function(response) {
          findActiveTopic();
          swal(
            'Success!',
            'The main topic has been updated!',
            'success'
          )
        });
      });
    } else {
      mainTopic.list = [];
    }
  }

  function findActiveTopic(){
    $http({
      method:'GET',
      url: '/public/findActiveTopic'
    }).then(function(response){
      mainTopic.list = response.data[0];
    });
  }
  //********************************************//
  //        ADD/UPDATE UPCOMING MAIN TOPIC      //
  //********************************************//

  function findUpcomingTopic(){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        $http({
          method:'GET',
          url: '/admin-topics/findUpcomingTopic',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          upcomingMainTopic.list = response.data[0];
          if (upcomingMainTopic.list == undefined){
            noUpcomingTopic.list = true;
          } else if (upcomingMainTopic.list !== undefined){
            noUpcomingTopic.list = false;
          }
        });
      });
    }
  }

  function updateUpcomingTopic(title, description, id){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var mainTopic = {title: title, description: description, id: id}
        $http({
          method: 'PUT',
          url: '/admin-topics/updateUpcomingTopic',
          headers: {
            id_token: idToken
          },
          data: mainTopic
        }).then(function(response) {
          findUpcomingTopic();
          swal(
            'Success!',
            'The upcoming main topic has been updated!',
            'success'
          )
        })
      });
    }
  }

  function addUpcomingTopic(title, description){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var mainTopic = {title: title, description: description}
        $http({
          method:'PUT',
          url: '/admin-topics/addUpcomingTopic',
          headers: {
            id_token: idToken
          },
          data: mainTopic
        }).then(function(response){
          findUpcomingTopic();
          swal(
            'Success!',
            'The upcoming subtopic has been added!',
            'success'
          )
        });
      });
    }
  }

  //********************************************//
  //        SET NEW CURRENT MAIN TOPIC          //
  //********************************************//

  //*********************************************//
  //           UPDATE CURRENT SUBTOPICS          //
  //*********************************************//

  function updateSubTopic(title, description, id){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var subTopic = {title: title, description: description, id: id}
        $http({
          method: 'PUT',
          url: '/admin-topics/updateActiveSubTopics',
          headers: {
            id_token: idToken
          },
          data: subTopic
        }).then(function(response) {
          findActiveSubTopics();
          swal(
            'Success!',
            'The subtopic has been updated!',
            'success'
          )
        })
      });
    }
  }

  function findActiveSubTopics(){
    $http({
      method:'GET',
      url: '/public/findActiveSubTopics'
    }).then(function(response){
      subTopic.list = response.data;
    });
  }

  // function findSubTopic(){
  //   $http({
  //     method:'GET',
  //     url: '/public/findActiveSubTopics'
  //   }).then(function(response){
  //     subTopic.list = response.data;
  //   });
  // }
  //*********************************************//
  //          UPDATE UPCOMING SUBTOPICS          //
  //*********************************************//



  function updateUpcomingSubTopic(title, description, id){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var subTopic = {title: title, description: description, id: id}
        $http({
          method: 'PUT',
          url: '/admin-topics/updateUpcomingSubTopics',
          headers: {
            id_token: idToken
          },
          data: subTopic
        }).then(function(response) {
          // findUpcomingSubTopics();
          swal(
            'Success!',
            'The upcoming subtopic has been updated!',
            'success'
          )
        })
      });
    }
  }

  function addUpcomingSubTopic(title, description){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var subTopic = {title: title, description: description}
        $http({
          method: 'POST',
          url: '/admin-topics/addUpcomingSubTopics',
          headers: {
            id_token: idToken
          },
          data: subTopic
        }).then(function(response) {
          // findUpcomingSubTopics();
          swal(
            'Success!',
            'The upcoming subtopic has been added!',
            'success'
          )
        })
      });
    }
  }

  function findUpcomingSubTopics(){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        $http({
          method:'GET',
          url: '/admin-topics/findUpcomingSubTopics',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          if(response.data.length < 5){
            while (response.data.length < 5) {
              response.data.push({noSubTopic: true});
              upcomingSubTopic.list = response.data;
            }
          }else {
            upcomingSubTopic.list = response.data;
          }
        });
      });
    }
  }

  function setNewTrimester(){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        swal({
          title: 'WARNING',
          text: "Are you sure you want to set the new trimester?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, I\'m sure'
        }).then(function(){
          console.log('Right before http.');
          $http({
            method: 'PUT',
            url: '/admin-topics/setNewTrimester',
            headers: {
              id_token: idToken
            }
          }).then(function(response) {
            console.log('updated the trimester!');
            swal(
              'Success!',
              'The new trimester has started!',
              'success'
            )
          })
        });
      });
    }
  }

  function thisSubtopic(index){
    $http({
      method:'GET',
      url: '/public/findSpecificSubTopic',
      headers: {
        id: index
      }
    }).then(function(response){
      individualSubTopic.list = response.data;
    });
  }

  //*********************************************//
  //          SET NEW CURRENT SUBTOPICS          //
  //*********************************************//

  //*********************************************//
  //                     API                     //
  //*********************************************//
  return {
    //the current mainTopic
    mainTopic : mainTopic,
    //next tri's main topic
    upcomingMainTopic : upcomingMainTopic,
    //if next tri doesn't have a main topic yet
    noUpcomingTopic : noUpcomingTopic,
    //add a new upcoming topic,
    addUpcomingTopic : addUpcomingTopic,
    //the current subtopics
    subTopic : subTopic,
    //the upcoming subtopics
    upcomingSubTopic : upcomingSubTopic,
    //updates the main topic
    updateTopic : updateTopic,
    //updates the next tri main topic
    updateUpcomingTopic : updateUpcomingTopic,
    //updates the sub topics
    updateSubTopic : updateSubTopic,
    //updates the upcoming sub topics
    updateUpcomingSubTopic : updateUpcomingSubTopic,
    //adding a new upcoming sub topic
    addUpcomingSubTopic : addUpcomingSubTopic,
    //init
    adminTopicInit: adminTopicInit,
    //this subtopic
    thisSubtopic: thisSubtopic,
    //yup
    individualSubTopic: individualSubTopic,
    setNewTrimester: setNewTrimester,
    //finds active subtopics ---- Subtopic Navigation
    findActiveSubTopics: findActiveSubTopics,
    //finds main topic ---- Home View
    findActiveTopic: findActiveTopic,
  }

}]); // end of app.factory
