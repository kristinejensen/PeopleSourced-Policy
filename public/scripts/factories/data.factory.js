app.factory('DataFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){

//containers
var subTopicObject = { list:[] };
var subtopicIdeas = { list:[] };

//calls startup functions
init();

function init() {
  getSubTopics();
  getSubtopicIdeas();
}

//add new user to DB from login view button click
function addNewUser(newUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/newUser',
      data: newUser,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      swal("User Added To Database", "", "success");
      self.newUser = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addNewUser()

//add new idea to DB from button click from idea view
function addNewIdea(newIdea){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/newIdea',
      data: newIdea,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      getSubtopicIdeas();
      swal("Idea Added To Database", "", "success");
      self.newIdea = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addNewUser()

//adds subtopics to idea view select element
function getSubTopics() {
    $http({
      method: 'GET',
      url: '/data/getSubTopics'
    }).then(function(response) {
      subTopicObject.list = response.data;
    });
}//end of getSubTopics()

//adds ideas to subtopic views
function getSubtopicIdeas() {
    $http({
      method: 'GET',
      url: '/data/subtopicIdeas'
    }).then(function(response) {
      subtopicIdeas.list = response.data;
    });
}//end of getSubTopics()

//adds liked/idea to DB
function addLiked(subtopicIdeas){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/addLiked',
      data: subtopicIdeas,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      swal("Liked Added To Database", "", "success");
      self.subtopicIdeas = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addNewUser()

//adds loved/idea to DB
function addLoved(subtopicIdeas){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/addLoved',
      data: subtopicIdeas,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      swal("Loved Added To Database", "", "success");
      self.subtopicIdeas = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addNewUser()

//adds flag/idea to DB
function addFlag(subtopicIdeas){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/login/addFlag',
      data: subtopicIdeas,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      // notyf.confirm('Blank Submitted For Approval');
      swal("flag Added To Database", "", "success");
      self.subtopicIdeas = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addNewUser()






  return {
//new user object from add address button click
    addNewUser : addNewUser,
//new idea object from idea button click
    addNewIdea : addNewIdea,
//sends current subtopics to add idea view option element
    subTopicObject : subTopicObject,
//adds ideas to subtopic views
    subtopicIdeas : subtopicIdeas,
//adds liked to comment at DB
    addLiked : addLiked,
//adds loved to comment at DB
    addLoved : addLoved,
//adds flag to comment at DB
    addFlag : addFlag
  }

}]); // end of app.factory




// //checks for admin rights
// function getAdmin() {
//   auth.$onAuthStateChanged(function(firebaseUser){
// //firebaseUser will be null if not logged in
//     if(firebaseUser) {
// //This is where we make our call to our server
//       firebaseUser.getToken().then(function(idToken){
//         $http({
//           method: 'GET',
//           url: '/login/admin',
//           headers: {
//             id_token: idToken
//           }
//         }).then(function(response){
//           var secretUser = response.data;
//         });
//       });
//     } else {
//       console.log('Not logged in or not authorized.');
//       var secretData = [];
//       console.log("secretData: ", secretData);
//     }
//   });//end of auth.$onAuthStateChanged
// }//end of getAdmin()
