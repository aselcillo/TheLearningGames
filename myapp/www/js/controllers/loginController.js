angular.module('app.loginController', ['pascalprecht.translate'])
     
.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$state', 'sharedData', '$firebaseArray', '$ionicPopup', '$ionicLoading',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state, sharedData, $firebaseArray, $ionicPopup, $ionicLoading) {

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

    if (email != undefined && email.includes('@')) {
      $ionicLoading.show();
    }

    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
      $ionicLoading.hide();
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
      var sessionUser = firebase.auth().currentUser;
      if (sessionUser) {
        //User is signed in.
        var teachersArray = $firebaseArray(teachersRef);
        teachersArray.$loaded(function() {
          if (teachersArray.$getRecord(sessionUser.uid) && sessionUser.emailVerified == true) {
            $state.go('teacherHome');
            $scope.modelLoginTeacher = {};
            $scope.allFalseForm();
            $ionicLoading.hide();
          } else if (sessionUser.emailVerified == false){
            alert('VERIFIQUE SU CORREO PARA PODER ACCEDER A SU CUENTA');
            firebase.auth().signOut();
            $ionicLoading.hide();
          } else {
            alert('NO EXISTE ESA CUENTA DE PROFESOR');
            $ionicLoading.hide();
          }
        });
      } else {
        //No user is signed in.
        $ionicLoading.hide();
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
        $ionicLoading.hide();
		  }
    });
  }

  $scope.logInStudent = function(email, password) {

    if (email != undefined && email.includes('@')) {
      $ionicLoading.show();
    }

    if (firebase.auth().currentUser) {
      $ionicLoading.hide();
      firebase.auth().signOut();
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
      var sessionUser = firebase.auth().currentUser;
      if (sessionUser) {
        //User is signed in.
        var studentsArray = $firebaseArray(studentsRef);
        studentsArray.$loaded(function() {
          if (studentsArray.$getRecord(sessionUser.uid)) {
            var student = studentsArray.$getRecord(sessionUser.uid);
            if(student.emailVerified == true || sessionUser.emailVerified == true) {
              $state.go('studentHome');
              $scope.modelLoginStudent = {};
              $scope.allFalseForm();
              $ionicLoading.hide();
            } else {
              alert('VERIFIQUE SU CORREO PARA PODER ACCEDER A SU CUENTA');
              firebase.auth().signOut();
              $ionicLoading.hide();
            }
          } else {
            alert('NO EXISTE ESA CUENTA DE ALUMNO');
            $ionicLoading.hide();
          }
        });
      } else {
        //No user is signed in.
        $ionicLoading.hide();
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
        $ionicLoading.hide();
		  }
    });
  }

  $scope.showResetPasswordPopup = function() {
    $scope.emailUser = {};
    var ressetPasswordPopup = $ionicPopup.alert({
      title: 'CODIGO DE LA CLASE',
      template: '<input type="text" ng-model="emailUser.mail">',
      scope : $scope,

      buttons : [
        {text: 'CANCELAR'},
        {text: 'ACEPTAR',
          onTap: function(e) {
            firebase.auth().sendPasswordResetEmail($scope.emailUser.mail).then(function() {
              alert('REVISA TU CORREO ELECTRONICO PARA RESTABLECER TU CONTRASEÑA');
            }).catch(function(error) {
              if (error) {
                switch (error.code) {
                  case "auth/argument-error":
                    alert("INTRODUZCA UN EMAIL CORRECTO");
                    break;
                  default:
                    alert("INTRODUZCA UN EMAIL CORRECTO");
                    break;
                }
              }
            });
          }
        },
      ] 
    });     
  };

}])