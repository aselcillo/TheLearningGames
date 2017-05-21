angular.module('app.signUpController', ['pascalprecht.translate'])

.controller('signUpCtrl', ['$scope', '$stateParams', '$http', '$state', 'sharedData', '$ionicLoading', '$translate', '$rootScope',
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state, sharedData, $ionicLoading, $translate, $rootScope) {

  /**
    *************************************CLEAN FORM FUNCTIONS GOES HERE*******************************
    Cleans the form used by the users to introduce their sign up information.
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

  /**
    Needed for the translations to work in the controller's words.
  */
  $translate(['CHECK_EMAIL_TO_VERIFY', 'EMAIL_INVALID', 'ERROR_ACCESS_UNKNOW', 'EMAIL_ALREADY_USED', 'ERROR_WEAK_PASSWORD', 'SCHOOL_NOT_ESTABLISHED']).then(function(translations) {
    $scope.checkEmailToVerify = translations.CHECK_EMAIL_TO_VERIFY;
    $scope.emailInvalidAlert = translations.EMAIL_INVALID;
    $scope.errorEmailUsedAlert = translations.EMAIL_ALREADY_USED;
    $scope.errorUnknowAlert = translations.ERROR_ACCESS_UNKNOW;
    $scope.schholNotEstablished = translations.SCHOOL_NOT_ESTABLISHED;
    $scope.weakPasswordAlert = translations.ERROR_WEAK_PASSWORD;
  });

  /**
    Needed for the translations to change their value in execution time.
  */
  $rootScope.$on('$translateChangeSuccess', function () {
    $scope.checkEmailToVerify = $translate.instant('CHECK_EMAIL_TO_VERIFY');
    $scope.emailInvalidAlert = $translate.instant('EMAIL_INVALID');
    $scope.errorEmailUsedAlert = $translate.instant('EMAIL_ALREADY_USED');
    $scope.errorUnknowAlert = $translate.instant('ERROR_ACCESS_UNKNOW');
    $scope.schholNotEstablished = $translate.instant('SCHOOL_NOT_ESTABLISHED');
    $scope.weakPasswordAlert = $translate.instant('ERROR_WEAK_PASSWORD');
  });

  $scope.modelSignUp = {};

  $scope.defaultAvatar = 'img/userDefaultAvatar.png';

  var rootRef = firebase.database().ref();

  var teachersRef = firebase.database().ref('teachers');
  var studentsRef = firebase.database().ref('students');

  /*
    *************************************EVERY FUNCTIONALITY FUNCTION GOES HERE***********************
  */

  /**
    Checks the sign up type and then signs up the user with their correspond account's type on the firebase database.
  */
  $scope.registerUser = function(name, surname, email, password, school, avatar) {

    if (email.includes('@')) {
      $ionicLoading.show();
    }

    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
      $ionicLoading.hide();
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
          school = $scope.schholNotEstablished;
        }
        sessionUser.updateProfile({
          displayName : name + ' ' + surname,
          photoURL : avatar
        }).then(function() {
          //Update successful.
          if (signUpType === 'teacher') { //TEACHER
            var newTeacherRef = firebase.database().ref('teachers/' + sessionUser.uid);
            newTeacherRef.set({
              'name' : CryptoJS.AES.encrypt(name, sessionUser.uid).toString(),
              'surname' : CryptoJS.AES.encrypt(surname, sessionUser.uid).toString(),
              'email' : sessionUser.email,
              'school' : school,
              'avatar' : avatar,
            }).then(function() {
              sessionUser.sendEmailVerification();
              alert($scope.checkEmailToVerify);
              $state.go('login');
              firebase.auth().signOut();
              $scope.modelSignUp = {};
              $ionicLoading.hide();
            });
          } else if (signUpType === 'student') { //STUDENT
            var newStudentRef = firebase.database().ref('students/' + sessionUser.uid);
            newStudentRef.set({
              'id' : sessionUser.uid,
              'name' : CryptoJS.AES.encrypt(name, sessionUser.uid).toString(),
              'surname' : CryptoJS.AES.encrypt(surname, sessionUser.uid).toString(),
              'email' : sessionUser.email,
              'school' : school,
              'avatar' : avatar,
              'emailVerified' : false,
            }).then(function() {
              sessionUser.sendEmailVerification();
              alert($scope.checkEmailToVerify);
              $state.go('login');
              firebase.auth().signOut();
              $scope.modelSignUp = {};
              $ionicLoading.hide();
            });
          }
        });
      }
    }).catch(function(error) {
      if (error) {
        switch (error.code) {
    			case "auth/weak-password":
    				alert($scope.weakPasswordAlert);
    				break;
    			case "auth/email-already-in-use":
    				alert($scope.errorEmailUsedAlert);
    				break;
    			case "auth/invalid-email":
    				alert($scope.emailInvalidAlert);
    				break;
    			default:
    				alert($scope.errorUnknowAlert);
        }
        $ionicLoading.hide();
		  }
    });
  }
}])