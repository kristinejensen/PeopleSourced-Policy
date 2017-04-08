app.factory('DataFactory', ['$http', function($http){

//add new user to DB from button click
function addNewUser(newUser){
console.log(newUser);
}


  return {
//new user object from add address button click
    addNewUser : addNewUser

  }

}]); // end of app.factory
