app.factory('DataFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){

//containers
var subTopicObject = { list:[] };
var subtopicIdeas1 = { list:[] };
var subtopicIdeas2 = { list:[] };
var subtopicIdeas3 = { list:[] };
var subtopicIdeas4 = { list:[] };
var subtopicIdeas5 = { list:[] };

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

//adds subtopics1 to idea view select element
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
      url: '/data/subtopicIdeas1'
    }).then(function(response) {
      subtopicIdeas1.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/data/subtopicIdeas2'
    }).then(function(response) {
      subtopicIdeas2.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/data/subtopicIdeas3'
    }).then(function(response) {
      subtopicIdeas3.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/data/subtopicIdeas4'
    }).then(function(response) {
      subtopicIdeas4.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/data/subtopicIdeas5'
    }).then(function(response) {
      subtopicIdeas5.list = response.data;
    });
}//end of getSubTopicIdeas()

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

//left off here.  Finish 
//adds loved/idea to DB
function addComment(subtopicIdeas){
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




  return {
//new user object from add address button click
    addNewUser : addNewUser,
//new idea object from idea button click
    addNewIdea : addNewIdea,
//sends current subtopics to add idea view option element
    subTopicObject : subTopicObject,
//adds ideas to subtopic1 view
    subtopicIdeas1 : subtopicIdeas1,
//adds ideas to subtopic2 view
    subtopicIdeas2 : subtopicIdeas2,
//adds ideas to subtopic3 view
    subtopicIdeas3 : subtopicIdeas3,
//adds ideas to subtopic4 view
    subtopicIdeas4 : subtopicIdeas4,
//adds ideas to subtopic5 view
    subtopicIdeas5 : subtopicIdeas5,
//adds liked to comment at DB
    addLiked : addLiked,
//adds loved to comment at DB
    addLoved : addLoved,
//adds flag to comment at DB
    addFlag : addFlag,
//adds comment to DB
    addComment : addComment
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
