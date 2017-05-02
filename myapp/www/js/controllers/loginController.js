angular.module('app.loginController', ['pascalprecht.translate'])
     
.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$state', 'sharedData', '$firebaseArray',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state, sharedData, $firebaseArray) {

  /*
    *************************************DECLARE FUNCTIONS FOR NG-SHOW********************************
  */

  $scope.loginType=false;
  $scope.loginType2=false;

  $scope.allFalseForm = function() {
    $scope.loginType=false;
    $scope.loginType2=false;
  }
  
  $scope.teacherForm = function() {
    $scope.loginType=true;
    $scope.loginType2=false;
    $scope.modelLoginTeacher = {};
    sharedData.setData('teacher');
  }
  $scope.studentForm = function() {
    $scope.loginType=false;
    $scope.loginType2=true;
    $scope.modelLoginStudent = {};
    sharedData.setData('student');
  }

  /*
    *************************************DECLARE VARIABLES & GIVE TO $SCOPE ALL THE VALUES WE NEED****
  */

  var rootRef = firebase.database().ref();

  var teachersRef = firebase.database().ref('teachers');
  var studentsRef = firebase.database().ref('students');

  /*
    *************************************EVERY FUNCTIONALITY FUNCTION GOES HERE***********************
  */

  $scope.logInTeacher = function(email, password) {

    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
      var sessionUser = firebase.auth().currentUser;
      if (sessionUser) {
        //User is signed in.
        var teachersArray = $firebaseArray(teachersRef);
        teachersArray.$loaded(function() {
          if (teachersArray.$getRecord(sessionUser.uid)) {
            $state.go('teacherHome');
            $scope.modelLoginTeacher = {};
            $scope.allFalseForm();
          } else {
            alert('NO EXISTE CUENTA DE PROFESOR');
          }
        });
      } else {
        //No user is signed in.
      }
    }).catch(function(error) {
      if (error) {
        switch (error.code) {
			case "auth/wrong-password":
				alert("EL EMAIL O CONTRASEÑA SON INCORRECTOS");
				break;
			case "auth/user-not-found":
				alert("EL EMAIL O CONTRASEÑA NO SON INCORRECTOS");
				break;
			case "auth/invalid-email":
				alert("EMAIL INVALIDO");
				break;
			default:
				alert("ERROR DESCONOCIDO");
				break;
			}
		}
    });
  }

  $scope.logInStudent = function(email, password) {

    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
      var sessionUser = firebase.auth().currentUser;
      if (sessionUser) {
        //User is signed in.
        var studentsArray = $firebaseArray(studentsRef);
        studentsArray.$loaded(function() {
          if (studentsArray.$getRecord(sessionUser.uid)) {
            $state.go('studentHome');
            $scope.modelLoginStudent = {};
            $scope.allFalseForm();
          } else {
            alert('NO EXISTE CUENTA DE ALUMNO');
          }
        });
      } else {
        //No user is signed in.
      }
    }).catch(function(error) {
      if (error) {
        switch (error.code) {
			case "auth/wrong-password":
				alert("EL EMAIL O CONTRASEÑA SON INCORRECTOS");
				break;
			case "auth/user-not-found":
				alert("EL EMAIL O CONTRASEÑA NO SON INCORRECTOS");
				break;
			case "auth/invalid-email":
				alert("EMAIL INVALIDO");
				break;
			default:
				alert("ERROR DESCONOCIDO");
				break;
			}
		}
    });
  }

}])