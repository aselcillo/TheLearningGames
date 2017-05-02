angular.module('app.signUpController', ['pascalprecht.translate'])

.controller('signUpCtrl', ['$scope', '$stateParams', '$http', '$state', 'sharedData',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state, sharedData) {

  /*
    *************************************CLEAN FORM FUNCTIONS GOES HERE*******************************
  */

  $scope.clearForm = function() {
    $scope.modelSignUp = {};
    $state.go('login');
  }

  /*
    *************************************DECLARE VARIABLES & GIVE TO $SCOPE ALL THE VALUES WE NEED****
  */

  var signUpType = sharedData.getData();

  if (signUpType != 'teacher' && signUpType != 'student') {
    $state.go('login');
  }

  $scope.modelSignUp = {};

  $scope.defaultAvatar = 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538474-user_512x512.png';

  var rootRef = firebase.database().ref();

  var teachersRef = firebase.database().ref('teachers');
  var studentsRef = firebase.database().ref('students');

  /*
    *************************************EVERY FUNCTIONALITY FUNCTION GOES HERE***********************
  */

  $scope.registerUser = function(name, surname, email, password, school, avatar) {

    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {
      var signUpType = sharedData.getData();
      var sessionUser = firebase.auth().currentUser;
      if (sessionUser) {
        //User is signed in.
        if (avatar == null) {
          avatar = $scope.defaultAvatar;
        }
        if (school === ' ' || school === '' || school == null) {
          school = 'Not established';
        }
        sessionUser.updateProfile({
          displayName : name + ' ' + surname,
          photoURL : avatar
        }).then(function() {
          //Update successful.
          if (signUpType === 'teacher') { //TEACHER
            var newTeacherRef = firebase.database().ref('teachers/'+sessionUser.uid);
            newTeacherRef.set({
              'name' : CryptoJS.AES.encrypt(name, sessionUser.uid).toString(),
              'surname' : CryptoJS.AES.encrypt(surname, sessionUser.uid).toString(),
              'email' : sessionUser.email,
              'school' : school,
              'avatar' : avatar,
            }).then(function() {
              $state.go('teacherHome');
              $scope.modelSignUp = {};
            });
          } else if (signUpType === 'student') { //STUDENT
            var newStudentRef = firebase.database().ref('students/'+sessionUser.uid);
            newStudentRef.set({
              'id' : sessionUser.uid,
              'name' : CryptoJS.AES.encrypt(name, sessionUser.uid).toString(),
              'surname' : CryptoJS.AES.encrypt(surname, sessionUser.uid).toString(),
              'email' : sessionUser.email,
              'school' : school,
              'avatar' : avatar,
            }).then(function() {
              $state.go('studentHome');
              $scope.modelSignUp = {};
            });
          }
        });
      }
    }).catch(function(error) {
      if (error) {
        switch (error.code) {
			case "auth/weak-password":
				alert("LA CONTRASEÑA DEBE SER DE AL MENOS 6 CARACTERES");
				break;
			case "auth/email-already-in-use":
				alert("EL CORREO INDICADO YA SE ENCUETNRA EN USO");
				break;
			case "auth/invalid-email":
				alert("EL CORREO INDICADO NO ES VALIDO");
				break;
			default:
				alert("ERROR DESCONOCIDO");
			}
		}
    });
  }

}])