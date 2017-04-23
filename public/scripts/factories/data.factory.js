
app.factory('DataFactory', ['$http', '$firebaseAuth', '$routeParams', function($http, $firebaseAuth, $routeParams){
  //must have variable for notyf
  var notyf = new Notyf();
  //source in auth
  var auth = $firebaseAuth();

  var subtopicIdeas = { list : [] };
  var commentsObject = { list : [] };
  var userMatchObject = { list : [] };
  var allSubcommentsObject = { list : [] }
  var getIdeaIdObject = { list : [] }
  var getCommentIdObject = { list : [] }
  var userTally = {};
  var ideasTally = {};
  var commentsTally = {};
  var likesTally = {};
  var likes = {};

  function deactivateUser(userId) {
    swal({
      title: 'Deactivate User',
      text: "Are you sure you want to deactivate this user?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I\'m sure'
    }).then(function() {
      $http({
        method: 'PUT',
        url: '/admin/deactivateUser/' + userId
      }).then(function(response) {
        console.log('user marked as inactive');
        swal(
          'Success',
          'The user has been deactivated.',
          'success'
        )
        init()
      });
    })
    getSubtopicIdeas();
    getComments();
    getUserMatch();
    getTallyInfo();
    getLikes();
  }


  //add new user to DB from login view button click
  function addNewUser(newUser){
    // firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/login/newUser',
        data: newUser
        // headers: {
          // id_token: idToken
        // }
      }).then(function(response){
        notyf.confirm('You are now a registered user!');
        // swal("User Added To Database", "", "success");
        self.newUser = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your address.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    // });//end of firebase.auth()
  }//end of addNewUser()

  //add new idea to DB from button click from idea view
  function addNewIdea(newIdea){
    return firebase.auth().currentUser.getToken().then(function(idToken) {
      return $http({
        method: 'POST',
        url: '/engagement/newIdea',
        data: newIdea,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        // getSubtopicIdeas();
        notyf.confirm('Your idea was added!');
        // swal("Idea Added To Database", "", "success");
        self.newIdea = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addNewUser()

  //adds ideas to subtopic views
  function getSubtopicIdeas(id) {
    $http({
      method: 'GET',
      url: '/public/subtopicIdeas',
      headers: {
        id : id
      }
    }).then(function(response) {
      subtopicIdeas.list = response.data;
    });
  }//end of getSubTopicIdeas()

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
        // self.subtopicIdeas = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
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
        // self.subtopicIdeas = {};
      }).catch(function(error) {
        swal("Sorry, we couldn't process your request.", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of getSubTopicIdeas


  //gets all comments for comment view
  function getComments() {
    $http({
      method: 'GET',
      url: '/public/allComments'
    }).then(function(response) {
      commentsObject.list = response.data;
    });
  }//end of getComments()

  //adds loved/idea to DB
  function addComment(newComment){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/engagement/addComment',
        data: newComment,
        headers: {
          id_token: idToken
        }
      }).then(function(response){

        notyf.confirm('Your comment was added!');
        self.addComment = {};
      }).catch(function(error) {
        swal("Values Are Incorrect", "Try Again!", "error");
        console.log('error authenticating', error);
      });
    });//end of firebase.auth()
  }//end of addComment()

getUserMatch()
  function getUserMatch() {
    $http({
      method: 'GET',
      url: '/data/getUserMatch',
    }).then(function(response) {
      userMatchObject.list = response.data;
      // console.log('getusermatch response: ', response);
    }).catch(function(error) {
      console.log('error on get user match', error);
      return 403;
    });
  }//end of getAllUsers()

  getTallyInfo();

  //function to display tallies on home page
  function getTallyInfo() {
    // console.log('inside of get tally?');
    $http({
      method: 'GET',
      url: '/public/userTally'
    }).then(function(response){
      userTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/public/ideasTally'
    }).then(function(response){
      ideasTally.count = response.data;
    });
    $http({
      method: 'GET',
      url: '/public/commentsTally'
    }).then(function(response){
      commentsTally.count = response.data;
    });
    $http({
         method: 'GET',
         url: '/public/likesTally'
       }).then(function(response){
         likesTally.count = response.data;
       });
  };//end of firebase.auth()


  //adds like to DB
  function addLike(ideaId){
    // console.log(ideaId);
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'POST',
        url: '/data/addLike/' + ideaId,
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        // console.log(response);
      }).catch(function(error) {
        console.log('error adding like to database', error);
      });
    });
  }

//adds loved/idea to DB
function addNewSubComment(newSubComment){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'POST',
      url: '/engagement/addNewSubComment',
      data: newSubComment,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      notyf.confirm('Your comment was added');
      getAllSubcomments();
      // swal("Comment Added To Database", "", "success");
      self.newSubComment = {};
    }).catch(function(error) {
      swal("Values Are Incorrect", "Try Again!", "error");
      console.log('error authenticating', error);
    });
  });//end of firebase.auth()
}//end of addComment()

//gets all subcomments for comments view
function getAllSubcomments() {
    $http({
      method: 'GET',
      url: '/data/allSubcomments'
    }).then(function(response) {
      allSubcommentsObject.list = response.data;
    });
}//end of getAllUsers()

//gets all subcomments for comments view
function getIdeaId(subtopicIdea) {
    $http({
      method: 'GET',
      url: '/data/getIdeaId',
      headers: subtopicIdea
    }).then(function(response) {
      getIdeaIdObject.list = response.data;
    });

    $http({
      method: 'GET',
      url: '/data/getCommentId',
      headers: subtopicIdea
    }).then(function(response) {
      getCommentIdObject.list = response.data;
    });

}//end of getAllUsers()


var email = {};

function checkUserStatus(){
  return firebase.auth().currentUser.getToken().then(function(idToken) {
    var firebaseUser = auth.$getAuth();
    return $http({
      method: 'GET',
      url: '/login/checkUserStatus',
      headers: {
        id_token: idToken,
        user_email: firebaseUser.email,
      }
    }).then(function(response){
      return response;
    });
});
};

//redirection after login
function loginView() {
  $location.path('/login');
}


  return {
    userTally: userTally,
    ideasTally: ideasTally,
    commentsTally: commentsTally,
    likesTally: likesTally,
    likes: likes,
    addLike: addLike,
//new user object from add address button click
    addNewUser : addNewUser,
//new idea object from idea button click
    addNewIdea : addNewIdea,
//adds ideas to subtopic1 view
    subtopicIdeas : subtopicIdeas,
//adds comment to DB
    addComment : addComment,
//gets comments to comment view
    commentsObject : commentsObject,
    // allUsers: allUsers,
    deactivateUser: deactivateUser,
//checks user for axisting account at login
    getUserMatch : getUserMatch,
//all existing users object
    userMatchObject : userMatchObject,
//adds sub-comments to DB
    addNewSubComment : addNewSubComment,
//adds sub-comments to view
    allSubcommentsObject : allSubcommentsObject,
//gets specific idea id from DB
    getIdeaId : getIdeaId,
//current subtopic ideas
    getSubtopicIdeas : getSubtopicIdeas,
//specifid idea from DB for comment view
    getIdeaIdObject : getIdeaIdObject,
//specified comments from DB for comment view
    getCommentIdObject : getCommentIdObject,
// <<<<<<< HEAD
    //checks to see if the user exists in the database
    checkUserStatus: checkUserStatus,
    email: email,
// =======
//gets all subcomments
    getAllSubcomments : getAllSubcomments
// >>>>>>> remotes/origin/feature-chris-subcomment

  }//end of return

}]); // end of app.factory
