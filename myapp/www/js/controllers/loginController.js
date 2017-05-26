angular.module('app.loginController', ['pascalprecht.translate'])
     
.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$state', 'sharedData', '$firebaseArray', '$ionicPopup', '$ionicLoading', '$translate', '$rootScope', 'localStorageService',
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state, sharedData, $firebaseArray, $ionicPopup, $ionicLoading, $translate, $rootScope, localStorageService) {

  /**
    *************************************DECLARE FUNCTIONS FOR NG-SHOW********************************
    They work showing the cointainer that depends on the variable with @value: true.
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

  /**
    Needed for the translations to work in the controller's words.
  */
  $translate(['ACCEPT', 'ACCOUNT_STUDENT_NOT_EXIST', 'ACCOUNT_TEACHER_NOT_EXIST', 'CANCEL', 'CHECK_EMAIL_TO_VERIFY', 'EMAIL_INVALID', 'EMAIL_OF_ACCOUNT', 'ERROR_ACCESS_UNKNOW', 'INSERT_EMAIL_CORRECT', 'USER_NOT_FOUND', 'VERIFY_EMAIL', 'WRONG_CREDENTIALS']).then(function(translations) {
    $scope.acceptText = translations.ACCEPT;
    $scope.accountStudentNotExistAlert = translations.ACCOUNT_STUDENT_NOT_EXIST;
    $scope.accountTeacherNotExistAlert = translations.ACCOUNT_TEACHER_NOT_EXIST;
    $scope.cancelText = translations.CANCEL;
    $scope.checkEmailToVerify = translations.CHECK_EMAIL_TO_VERIFY;
    $scope.emailInvalidAlert = translations.EMAIL_INVALID;
    $scope.emailOfAccountText = translations.EMAIL_OF_ACCOUNT;
    $scope.errorUnknowAlert = translations.ERROR_ACCESS_UNKNOW;
    $scope.insertEmailValidAlert = translations.INSERT_EMAIL_CORRECT;
    $scope.userNotFoundAlert = translations.USER_NOT_FOUND;
    $scope.verifyEmailAlert = translations.VERIFY_EMAIL;
    $scope.wronCredentialsAlert = translations.WRONG_CREDENTIALS;
  });

  /**
    Needed for the translations to change their value in execution time.
  */
  $rootScope.$on('$translateChangeSuccess', function () {
    $scope.acceptText = $translate.instant('ACCEPT');
    $scope.accountStudentNotExistAlert = $translate.instant('ACCOUNT_STUDENT_NOT_EXIST');
    $scope.accountTeacherNotExistAlert = $translate.instant('ACCOUNT_TEACHER_NOT_EXIST');
    $scope.cancelText = $translate.instant('CANCEL');
    $scope.checkEmailToVerify = $translate.instant('CHECK_EMAIL_TO_VERIFY');
    $scope.emailInvalidAlert = $translate.instant('EMAIL_INVALID');
    $scope.emailOfAccountText = $translate.instant('EMAIL_OF_ACCOUNT');
    $scope.errorUnknowAlert = $translate.instant('ERROR_ACCESS_UNKNOW');
    $scope.insertEmailValidAlert = $translate.instant('INSERT_EMAIL_CORRECT');
    $scope.userNotFoundAlert = $translate.instant('USER_NOT_FOUND');
    $scope.verifyEmailAlert = $translate.instant('VERIFY_EMAIL');
    $scope.wronCredentialsAlert = $translate.instant('WRONG_CREDENTIALS');
  });

  /**
    Checks if there was any user's credentials in the local storage and (if true) determinates the user's type 
    (teacher or student) to send them to their home screen.
  */
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userData = localStorageService.get('userCredentials');
      if (userData.type === 'teacher') {
        $state.go('teacherHome');
      } else if (userData.type === 'student') {
        $state.go('studentHome');
      }
      $ionicLoading.hide();
    }
  });
  var userData = localStorageService.get('userCredentials');
  if (userData != null && Object.keys(userData).length > 0) {
    $ionicLoading.show();
    sharedData.setData(userData.type);
    firebase.auth().signInWithCustomToken(userData.token).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  var rootRef = firebase.database().ref();

  var teachersRef = firebase.database().ref('teachers');
  var studentsRef = firebase.database().ref('students');

  /*
    *************************************EVERY FUNCTIONALITY FUNCTION GOES HERE***********************
  */

  /**
    Logs a user with teacher role if the credentials (email and password) are correct else shows an alert with the error.
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
          } else if (sessionUser.emailVerified == false && teachersArray.$getRecord(sessionUser.uid)){
            $ionicPopup.alert({
              template: $scope.verifyEmailAlert,
            });
            firebase.auth().signOut();
            $ionicLoading.hide();
          } else {
            $ionicPopup.alert({
              template: $scope.accountTeacherNotExistAlert,
            });
            firebase.auth().signOut();
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
            $ionicPopup.alert({
              template: $scope.wronCredentialsAlert,
            });
    				break;
    			case "auth/user-not-found":
            $ionicPopup.alert({
              template: $scope.userNotFoundAlert,
            });
    				break;
    			case "auth/invalid-email":
            $ionicPopup.alert({
              template: $scope.emailInvalidAlert,
            });
    				break;
    			default:
            $ionicPopup.alert({
              template: scope.errorUnknowAlert,
            });
    				break;
  			}
        $ionicLoading.hide();
		  }
    });
  }

  /**
    Logs a user with student role if the credentials (email and password) are correct else shows an alert with the error.
  */
  $scope.logInStudent = function(email, password) {

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
              $ionicPopup.alert({
                template: $scope.verifyEmailAlert,
              });
              firebase.auth().signOut();
              $ionicLoading.hide();
            }
          } else {
            $ionicPopup.alert({
              template: $scope.accountStudentNotExistAlert,
            });
            firebase.auth().signOut();
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
            $ionicPopup.alert({
              template: $scope.wronCredentialsAlert,
            });
    				break;
    			case "auth/user-not-found":
            $ionicPopup.alert({
              template: $scope.userNotFoundAlert,
            });
    				break;
    			case "auth/invalid-email":
            $ionicPopup.alert({
              template: $scope.emailInvalidAlert,
            });
    				break;
    			default:
            $ionicPopup.alert({
              template: $scope.errorUnknowAlert,
            });
    				break;
    		}
        $ionicLoading.hide();
		  }
    });
  }

  /**
    Shows a popup asking for a valid email to reset that user's password with an email.
  */
  $scope.showResetPasswordPopup = function() {
    $scope.emailUser = {};
    var ressetPasswordPopup = $ionicPopup.alert({
      title: $scope.emailOfAccountText,
      template: '<input type="text" ng-model="emailUser.mail">',
      scope : $scope,

      buttons : [
        {text: $scope.cancelText},
        {text: $scope.acceptText,
          onTap: function(e) {
            firebase.auth().sendPasswordResetEmail($scope.emailUser.mail).then(function() {
              alert($scope.checkEmailToVerify);
            }).catch(function(error) {
              if (error) {
                switch (error.code) {
                  case "auth/argument-error":
                    alert($scope.insertEmailValidAlert);
                    break;
                  default:
                    alert($scope.insertEmailValidAlert);
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