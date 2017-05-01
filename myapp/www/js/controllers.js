angular.module('app.controllers', ['pascalprecht.translate'])
     
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
  
  $scope.teacherForm = function(){
    $scope.loginType=true;
    $scope.loginType2=false;
    $scope.modelLoginTeacher = {};
    sharedData.setData('teacher');
  }
  $scope.studentForm = function(){
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



//                                  []
//                                  []
//                                  []
//                                  []
//                        [][][][][][][][][][][]
//                                  []
//                                  []
//                                  []
//                                  []
//                                  []



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



//                                  []
//                                  []
//                                  []
//                                  []
//                        [][][][][][][][][][][]
//                                  []
//                                  []
//                                  []
//                                  []
//                                  []



.controller('teacherHomeCtrl', ['$scope', '$stateParams', '$ionicModal', '$http', '$state', '$ionicPopover', '$ionicActionSheet', '$firebaseObject', '$firebaseArray', '$ionicPopup', 'sharedData', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $http, $state, $ionicPopover, $ionicActionSheet, $firebaseObject, $firebaseArray, $ionicPopup, sharedData) {

  /*
    *************************************DECLARE FUNCTIONS FOR NG-SHOW********************************
  */

  $scope.allFalse = function() {
    $scope.teacherHomeView = false;
    $scope.profileView = false;
    $scope.settingsView = false;
    $scope.classStudentsView = false;
    $scope.classTeamsView = false;
    $scope.rulesView = false;
    $scope.itemsView = false;
    $scope.achievementsView = false;
    $scope.missionsView = false;
    $scope.rewardShopView = false;
    $scope.archivedClassroomsToShow = false;
  }

  $scope.teacherHomeForm = function() {
    $scope.allFalse();
    $scope.teacherHomeView = true;
  }

  $scope.profileForm = function() {
    $scope.allFalse();
    $scope.modelProfile = {};
    $scope.profileView = true;
    if($scope.teacher.name.length > 32){
      $scope.teacher.name = CryptoJS.AES.decrypt($scope.teacher.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
      $scope.teacher.surname = CryptoJS.AES.decrypt($scope.teacher.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
    }
  }

  $scope.settingsForm = function() {
    $scope.allFalse();
    $scope.settingsView = true;
  }

  $scope.classForm = function() {
    $scope.allFalse();
    $scope.classStudentsView = true;
  }

  $scope.teamsForm = function() {
    $scope.allFalse();
    $scope.classTeamsView = true;
  }

  $scope.rulesForm = function() {
    $scope.allFalse();
    $scope.rulesView = true;
  }

  $scope.itemsForm = function() {
    $scope.allFalse();
    $scope.modelItem = {};
    $scope.itemsView = true;
  }

  $scope.achievementsForm = function() {
    $scope.allFalse();
    $scope.modelAchievement = {};
    $scope.achievementsView = true;
  }

  $scope.missionsForm = function() {
    $scope.allFalse();
    $scope.missionsView = true;
  }

  $scope.rewardShopForm = function() {
    $scope.allFalse();
    $scope.rewardShopView = true;
  }

  $scope.teacherHomeForm();

  $scope.loginTypeSelectItem=true;
  $scope.loginTypeSelectStudent=false;

  $scope.selectItemForm = function() {
    $scope.loginTypeSelectItem=true;
    $scope.loginTypeSelectStudent=false;
  }

  $scope.selectStudentForm = function() {
    $scope.loginTypeSelectItem=false;
    $scope.loginTypeSelectStudent=true;
  }

  /*
    *************************************EVERY ACTIONSHEET GOES HERE*******************************
  */

                                        /* TEACHERHOME ACTIONSHEET */

  $scope.showActionsheetTeacherHome = function() {
    $ionicActionSheet.show({
      titleText: 'ACCIONES TEACHERHOME',
      buttons: [
        { text: 'ARCHIVAR CLASES' },
        { text: 'DESARCHIVAR CLASES' },
        { text: 'DUPLICAR CLASES' },
        { text: 'COPIA DE SEGURIDAD' },
      ],
      destructiveText: 'BORRAR CLASE(S)',
      cancelText: 'CANCELAR',
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //ARCHIVE CLASSES ACTION
          $scope.actionSheetTeacherHomeType = 'archive';
          $scope.toShow = true;
          $scope.showSelectClassroomsModal();
        } else if (index === 1) {
          //UNARCHIVE CLASSES ACTION
          $scope.actionSheetTeacherHomeType = 'unArchive';
          $scope.toShow = false;
          $scope.showSelectClassroomsModal();
        } else if (index === 2) {
          //DUPLICATE CLASSES ACTION
          $scope.actionSheetTeacherHomeType = 'duplicate';
          $scope.toShow = true;
          $scope.showSelectClassroomsModal();
        } else if (index === 3) {
          //BACKUP ACTION
        }
        return true;
      },
      destructiveButtonClicked: function() {
        //DELETE CLASSROOMS 
        $scope.actionSheetTeacherHomeType = 'delete';
        $scope.toShow = true;
        $scope.showSelectClassroomsModal();
        return true;
      }
    });
  };

                                          /* CLASS STUDENTS ACTIONSHEET */

  $scope.showActionsheetClassStudents = function() {
    $ionicActionSheet.show({
      titleText: 'ACCIONES CLASS STUDENTS',
      buttons: [
        { text: 'TOMAR ASISTENCIA' },
        { text: 'EVALUAR ESTUDIANTE(S)' },
        { text: 'ENVIAR MENSAJE' },
      ],
      destructiveText: 'BORRAR ESTUDIANTE(S)',
      cancelText: 'CANCELAR',
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //TAKE ATTENDANCE ACTION
          $scope.actionsheetClassStudentsType = 'attendance';
          $scope.showAttendanceModal();
        } else if (index === 1) {
          //EVALUATE STUDENTS ACTION
          $scope.actionsheetClassStudentsType = 'evaluate';
          $scope.showSelectStudentsModal();
        } else if (index === 2) {
          //SEND MESSAGE ACTION
        }
        return true;
      },
      destructiveButtonClicked: function() {
        //DELETE STUDENTS ACTION
        $scope.actionsheetClassStudentsType = 'delete';
        $scope.showSelectStudentsModal();
        return true;
      }
    });
  };

                                          /* CLASS TEAMS ACTIONSHEET */

  $scope.showActionsheetClassTeams = function() {
    $ionicActionSheet.show({
      titleText: 'ACCIONES CLASS TEAMS',
      buttons: [
        { text: 'EVALUAR EQUIPO(S)' },
        { text: 'DUPLICAR EQUIPO(S)' },
        { text: 'ENVIAR MENSAJE' },
      ],
      destructiveText: 'BORRAR EQUIPO(S)',
      cancelText: 'CANCELAR',
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //EVALUATE TEAMS ACTION
          $scope.actionSheetClassTeamsType = 'evaluate';
          $scope.showSelectTeamsModal();
        } else if (index === 1) {
          //DUPLICATE TEAMS ACTION
          $scope.actionSheetClassTeamsType = 'duplicate';
          $scope.showSelectTeamsModal();
        } else if (index === 2) {
          //SEND MESSAGE ACTION
        }
        return true;
      },
      destructiveButtonClicked: function() {
        //DELETE TEAMS ACTION
        $scope.actionSheetClassTeamsType = 'delete';
        $scope.showSelectTeamsModal();
        return true;
      }
    });
  };

                                          /* ITEMS ACTIONSHEET */

  $scope.showActionsheetItems = function() {
    $ionicActionSheet.show({
      titleText: 'ACCIONES ITEMS',
      buttons: [
        { text: 'DUPLICAR ITEM(S)' },
      ],
      destructiveText: 'BORRAR ITEM(S)',
      cancelText: 'CANCELAR',
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //DUPLICATE ITEMS ACTION
          $scope.actionSheetItemsType = 'duplicate';
          $scope.showSelectItemsModal();
        }
        return true;
      },
      destructiveButtonClicked: function() {
        //DELETE ITEMS ACTION
        $scope.actionSheetItemsType = 'delete';
        $scope.showSelectItemsModal();
        return true;
      }
    });
  };

                                          /* ACHIEVEMENT ACTIONSHEET */

  $scope.showActionsheetAchievements = function() {
    $ionicActionSheet.show({
      titleText: 'ACCIONES LOGROS',
      buttons: [
        { text: 'DUPLICAR LOGRO(S)' },
      ],
      destructiveText: 'BORRAR LOGRO(S)',
      cancelText: 'CANCELAR',
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //DUPLICATE ACHIEVEMENT ACTION
          $scope.actionSheetAchievementsType = 'duplicate';
          $scope.showSelectAchievementsModal();
        }
        return true;
      },
      destructiveButtonClicked: function() {
        //DELETE ACHIEVEMENT ACTION
        $scope.actionSheetAchievementsType = 'delete';
        $scope.showSelectAchievementsModal();
        return true;
      }
    });
  };

                                          /* REWARDS ACTIONSHEET */

  $scope.showActionsheetRewards = function() {
    $ionicActionSheet.show({
      titleText: 'ACCIONES RECOMPENSAS',
      buttons: [
        { text: 'DUPLICAR RECOMPENSA(S)' },
      ],
      destructiveText: 'BORRAR RECOMPENSA(S)',
      cancelText: 'CANCELAR',
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //DUPLICATE REWARDS ACTION
          $scope.actionSheetRewardsType = 'duplicate';
          $scope.showSelectRewardsModal();
        }
        return true;
      },
      destructiveButtonClicked: function() {
        //DELETE REWARD ACTION
        $scope.actionSheetRewardsType = 'delete';
        $scope.showSelectRewardsModal();
        return true;
      }
    });
  };

                                          /* MISSIONS ACTIONSHEET */

  $scope.showActionsheetMissions = function() {
    $ionicActionSheet.show({
      titleText: 'ACCIONES MISIONES',
      buttons: [
        { text: 'DUPLICAR MISION(S)' },
      ],
      destructiveText: 'BORRAR MISION(S)',
      cancelText: 'CANCELAR',
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //DUPLICATE MISSION ACTION
          $scope.actionSheetMissionsType = 'duplicate';
          $scope.showSelectMissionsModal();
        }
        return true;
      },
      destructiveButtonClicked: function() {
        //DELETE MISSION ACTION
        $scope.actionSheetMissionsType = 'delete';
        $scope.showSelectMissionsModal();
        return true;
      }
    });
  };

  /*
    *************************************SAVE EVERY POPOVER INTO $SCOPE*******************************
  */

  $scope.templateLanguagesPopover = '<ion-popover-view>'+
    '<div ng-controller="changeLanguageCtrl">'+
      '<ion-list class="list-elements">'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'es\'); closePopoverLanguages()">{{ \'BUTTON_LANG_ES\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'en\'); closePopoverLanguages()">{{ \'BUTTON_LANG_EN\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'it\'); closePopoverLanguages()">{{ \'BUTTON_LANG_IT\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'tr\'); closePopoverLanguages()">{{ \'BUTTON_LANG_TR\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'de\'); closePopoverLanguages()">{{ \'BUTTON_LANG_DE\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'hu\'); closePopoverLanguages()">{{ \'BUTTON_LANG_HU\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'ru\'); closePopoverLanguages()">{{ \'BUTTON_LANG_RU\' | translate }}</ion-item>'+
      '</ion-list>'+
    '</div>'+
  '</ion-popover-view>';

  $scope.templateTeacherHomePopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover">IMPORTAR</ion-item>'+
      '<ion-item class="itemPopover">EXPORTAR</ion-item>'+
      '<ion-item class="itemPopover" ng-hide="archivedClassroomsToShow" ng-click="showArchivedClassrooms(true)">VER ARCHIVADAS</ion-item>'+
      '<ion-item class="itemPopover" ng-show="archivedClassroomsToShow" ng-click="showArchivedClassrooms(false)">OCULTAR ARCHIVADAS</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverTeacherHome()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateClassStudentsPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassStudents()">IMPORTAR</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassStudents()">EXPORTAR</ion-item>'+
      '<ion-item class="itemPopover" ng-click="showConfigureLevelsModal()">CONFIGURAR NIVELES</ion-item>'+
      '<ion-item class="itemPopover item item-input item-select">'+
        '<div class="input-label">VISTA DE ALUMNOS'+
        '</div>'+
        '<select>'+
          '<option selected>AVATAR</option>'+
          '<option>IMAGEN</option>'+
        '</select>'+
      '</ion-item>'+
      '<ion-toggle class="itemPopover" ng-model="checkboxNotifications" ng-checked="classroom.notifications" ng-click="setNotifications(checkboxNotifications)" toggle-class="toggle-calm">NOTIFICACIONES</ion-toggle>'+
      '<ion-toggle class="itemPopover" ng-model="checkboxOpening" ng-checked="classroom.open" ng-click="setOpening(checkboxOpening)" toggle-class="toggle-calm">APERTURA</ion-toggle>'+
      '<ion-item class="itemPopover" ng-click="showHashcodePopup()">VER HASHCODE DE LA CLASE</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rulesForm(); closePopoverClassStudents()">VER REGLAS</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverClassStudents()">VER TIENDA DE CLASE</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverClassStudents()">VER MISIONES</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverClassStudents()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateClassTeamsPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassTeams()">IMPORTAR</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassTeams()">EXPORTAR</ion-item>'+
      '<ion-toggle class="itemPopover" ng-model="modelcheckboxotifications" ng-checked="classroom.notifications" ng-click="setNotifications(checkboxNotifications)" toggle-class="toggle-calm">NOTIFICACIONES</ion-toggle>'+
      '<ion-item class="itemPopover" ng-click="rulesForm(); closePopoverClassTeams()">VER REGLAS</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverClassTeams()">VER TIENDA DE CLASE</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverClassTeams()">VER MISIONES</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverClassTeams()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateMissionsPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverMissions()">IMPORTAR</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverMissions()">EXPORTAR</ion-item>'+
      '<ion-item class="itemPopover" ng-hide="finishedMissionsToShow" ng-click="showFinishedMissions(true)">VER FINALIZADAS</ion-item>'+
      '<ion-item class="itemPopover" ng-show="finishedMissionsToShow" ng-click="showFinishedMissions(false)">OCULTAR FINALIZADAS</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rulesForm(); closePopoverMissions()">VER REGLAS</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverMissions()">VER TIENDA DE CLASE</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverMissions()">VER MISIONES</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverMissions()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateTeacherDefaultPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverTeacherDefault()">IMPORTAR</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverTeacherDefault()">EXPORTAR</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rulesForm(); closePopoverTeacherDefault()">VER REGLAS</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverTeacherDefault()">VER TIENDA DE CLASE</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverTeacherDefault()">VER MISIONES</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverTeacherDefault()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  /*
    *************************************EVERY POPOVER FUNCTION GOES HERE*******************************
  */

                                        /* LANGUAGES POPOVER */

  $scope.popoverLanguages = $ionicPopover.fromTemplate($scope.templateLanguagesPopover, {
    scope: $scope
  });
  $scope.openPopoverLanguages = function($event) {
    $scope.popoverLanguages.show($event);
  };
  $scope.closePopoverLanguages = function() {
    $scope.popoverLanguages.hide();
  }
  $scope.$on('$destroy', function() {
    $scope.popoverLanguages.remove();
  });
  $scope.$on('popoverLanguages.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverLanguages.removed', function() {
    // Execute action
  });

                                        /* TEACHERHOME POPOVER */

  $scope.popoverTeacherHome = $ionicPopover.fromTemplate($scope.templateTeacherHomePopover, {
    scope: $scope
  });
  $scope.openPopoverTeacherHome = function($event) {
    $scope.popoverTeacherHome.show($event);
  };
  $scope.closePopoverTeacherHome = function() {
    $scope.popoverTeacherHome.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverTeacherHome.remove();
  });
  $scope.$on('popoverTeacherHome.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverTeacherHome.removed', function() {
    // Execute action
  });

                                        /* CLASS STUDENTS POPOVER */

  $scope.popoverClassStudents = $ionicPopover.fromTemplate($scope.templateClassStudentsPopover, {
    scope: $scope
  });
  $scope.openPopoverClassStudents = function($event) {
    $scope.popoverClassStudents.show($event);
  };
  $scope.closePopoverClassStudents = function() {
    $scope.popoverClassStudents.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverClassStudents.remove();
  });
  $scope.$on('popoverClassStudents.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverClassStudents.removed', function() {
    // Execute action
  });

                                        /* CLASS TEAMS POPOVER */

  $scope.popoverClassTeams = $ionicPopover.fromTemplate($scope.templateClassTeamsPopover, {
    scope: $scope
  });
  $scope.openPopoverClassTeams = function($event) {
    $scope.popoverClassTeams.show($event);
  };
  $scope.closePopoverClassTeams = function() {
    $scope.popoverClassTeams.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverClassTeams.remove();
  });
  $scope.$on('popoverClassTeams.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverClassTeams.removed', function() {
    // Execute action
  });

                                        /* MISSIONS POPOVER */

  $scope.popoverMissions = $ionicPopover.fromTemplate($scope.templateMissionsPopover, {
    scope: $scope
  });
  $scope.openPopoverMissions = function($event) {
    $scope.popoverMissions.show($event);
  };
  $scope.closePopoverMissions = function() {
    $scope.popoverMissions.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverMissions.remove();
  });
  $scope.$on('popoverMissions.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverMissions.removed', function() {
    // Execute action
  });

                                        /* DEFAULT POPOVER */

  $scope.popoverteacherDefault = $ionicPopover.fromTemplate($scope.templateTeacherDefaultPopover, {
    scope: $scope
  });
  $scope.openPopoverTeacherDefault = function($event) {
    $scope.popoverteacherDefault.show($event);
  };
  $scope.closePopoverTeacherDefault = function() {
    $scope.popoverteacherDefault.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverteacherDefault.remove();
  });
  $scope.$on('popoverteacherDefault.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverteacherDefault.removed', function() {
    // Execute action
  });

  /*
    *************************************SAVE EVERY MODAL INTO $SCOPE*******************************
  */

  $scope.attendanceModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<input class="dateInput" type="text" value="{{date | date:\'dd-MM-yyyy\'}}" readonly />'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkStudent" class="list-student" ng-repeat="student in students" ng-checked="student.classrooms[classroom.id].inClass" ng-click="inClass(student)">{{student.name}} {{student.surname}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="attendance-button123" ng-click="selectStudents()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SET_ATTENDANCE_FOR_TODAY\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectClassroomsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">SELECCIONA CLASES</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkClassroom" ng-repeat="classForSelection in classroomsForSelection" ng-click="changeSelectedClassroom(classForSelection)" ng-checked="classForSelection.selected" ng-hide="classForSelection.archived === toShow">{{classForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectClassroomsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectClassrooms()" id="attendance-btn123" class="button button-calm  button-block">SELECCIONAR CLASES</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectStudentsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">SELECCIONA ESTUDIANTES</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkStudent" class="list-student" ng-repeat="studentForSelection in studentsForSelection" ng-click="changeSelectedStudent(studentForSelection)" ng-checked="studentForSelection.selected">'+
          '<p>{{studentForSelection.name}}</p>'+
          '<p>{{studentForSelection.surname}}</p>'+
        '</ion-checkbox>'+  
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectStudentsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectStudents()" id="attendance-btn123" class="button button-calm  button-block">SELECCIONAR ALUMNOS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectItemsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">SELECCIONA ITEMS</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkItem" ng-repeat="itemForSelection in itemsForSelection" ng-click="changeSelectedItem(itemForSelection)" ng-checked="itemForSelection.selected">{{itemForSelection.name}} {{itemForSelection.score}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
      '<button class="button button-calm  button-block" ng-click="closeSelectItemsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectItems()" id="attendance-btn123" class="button button-calm  button-block">SELECCIONAR ITEMS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectAchievementsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">SELECCIONA LOGROS</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkAchievement" ng-repeat="achievementForSelection in achievementsForSelection" ng-click="changeSelectedAchievement(achievementForSelection)" ng-checked="achievementForSelection.selected">{{achievementForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectAchievementsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectAchievements()" id="attendance-btn123" class="button button-calm  button-block">SELECCIONAR LOGROS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectTeamsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">SELECCIONA EQUIPOS</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkTeam" ng-repeat="teamForSelection in teamsForSelection" ng-click="changeSelectedTeam(teamForSelection)" ng-checked="teamForSelection.selected">{{teamForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectTeamsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectTeams()" id="attendance-btn123" class="button button-calm  button-block">SELECCIONAR EQUIPOS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectRewardsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">SELECCIONA RECOMPENSAS</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkReward" ng-repeat="rewardForSelection in rewardsForSelection" ng-click="changeSelectedReward(rewardForSelection)" ng-checked="rewardForSelection.selected">{{rewardForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectRewardsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectRewards()" id="attendance-btn123" class="button button-calm  button-block">SELECCIONAR RECOMPENSAS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectMissionsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">SELECCIONA MISIONES</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkMission" ng-repeat="missionForSelection in missionsForSelection" ng-click="changeSelectedMission(missionForSelection)" ng-checked="missionForSelection.selected">{{missionForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectMissionsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectMissions()" id="attendance-btn123" class="button button-calm  button-block">SELECCIONAR MISIONES</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newClassModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'NEW_CLASS\' | translate }}</h3>'+
      '<form id="dataClassForm" class="list">'+
        '<label class="item item-input">'+
          '<span class="input-label">{{ \'CLASS_NAME\' | translate }}</span>'+
          '<input type="text" placeholder="{{ \'CLASS_NAME\' | translate }}" ng-model="modelNewClass.name">'+
        "</label>"+
      "</form>"+
      "<div>"+
        '<form class="list">'+
          '<label class="item item-input item-select">'+
            '<span class="input-label">{{ \'IMPORT_PREFERENCES_FROM\' | translate }}</span>'+
            '<select id="selectClass">'+
              '<option>{{ \'NONE\' | translate }}</option>'+
              '<option ng-repeat="class in classrooms">{{class.name}}</option>'+
            '</select>'+
          '</label>'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalNewClass()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-click="createClassroom(modelNewClass.name) ; closeModalNewClass()">{{ \'CREATE\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.configureLevelsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">CONFIGURACION DE NIVELES</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-item id="attendance-checkbox2" name="checkItem" ng-repeat="level in levels" ng-click="setLevel(level)">{{level.level}}. {{level.title}}'+
          '<ion-option-button class="button-assertive" ng-click="deleteLevel(level)">{{ \'DELETE\' | translate }}</ion-option-button>'+
        '</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm button-block" ng-click="closeConfigureLevelsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" id="attendance-btn123" class="button button-calm button-block" ng-click="showNewLevelModal()">AÑADIR NIVELES</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newLevelModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
     '<h3>NUEVO NIVEL</h3>'+
      '<form id="newItemForm" class="list list-student fullScreen">'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">TITULO</span>'+
            '<input type="text" placeholder="TITULO" ng-model="modelNewLevel.title">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">NIVEL</span>'+
            '<input type="number" placeholder="NIVEL" ng-model="modelNewLevel.level">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">PUNTOS REQUERIDOS</span>'+
            '<input type="number" placeholder="PUNTOS REQUERIDOS" ng-model="modelNewLevel.requiredPoints">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeNewLevelModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="createLevel(modelNewLevel.title, modelNewLevel.level, modelNewLevel.requiredPoints)" ng-disabled="!modelNewLevel.title || !modelNewLevel.level || !modelNewLevel.requiredPoints">AÑADIR NIVEL</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editLevelModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
     '<h3>EDITAR NIVEL</h3>'+
      '<form id="newItemForm" class="list list-student fullScreen">'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">TITULO</span>'+
            '<input type="text" placeholder="{{level.title}}" ng-model="modelEditLevel.title">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">NIVEL</span>'+
            '<input type="number" placeholder="{{level.level}}" ng-model="modelEditLevel.level">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">PUNTOS REQUERIDOS</span>'+
            '<input type="number" placeholder="{{level.requiredPoints}}" ng-model="modelEditLevel.requiredPoints">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeEditLevelModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="editLevel(modelEditLevel.title, modelEditLevel.level, modelEditLevel.requiredPoints)" ng-disabled="!modelEditLevel.title && !modelEditLevel.level && !modelEditLevel.requiredPoints">EDITAR NIVEL</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.secondaryMenuModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'ASSIGN_STUDENT_TO_TEAM\' | translate }}</h3>'+
      '<form class="list">'+
        '<label class="item item-input item-select">'+
          '<span class="input-label">{{ \'SELECT\' | translate }}</span>'+
          '<select id="selectTeam">'+
              '<option>{{ \'NONE\' | translate }}</option>'+
              '<option ng-repeat="team in teams">{{team.name}}</option>'+
          '</select>'+
        '</label>'+
        '<h3>{{ \'COPY_STUDENT_TO_ANOTHER_CLASS\' | translate }}</h3>'+
        '<label class="item item-input item-select">'+
          '<span class="input-label">{{ \'SELECT\' | translate }}</span>'+
          '<select id="selectCopy">'+
              '<option>{{ \'NONE\' | translate }}</option>'+
              '<option ng-repeat="class in classrooms">{{class.name}}</option>'+
          '</select>'+
        '</label>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalSecondary()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="secondaryMenuSelection()">{{ \'ACCEPT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
      '</ion-modal-view>';

  $scope.newStudentModal = '<ion-modal-view class="fondo">'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'NEW_STUDENT\' | translate }}</h3>'+
      '<div class="list-student">'+
        '<div class="teacherAvatar">'+
          '<img src={{defaultAvatar}} class="avatar">'+
        '</div>'+
        '<button  class="button button-light  button-block button-outline">{{ \'TAKE_PICTURE\' | translate }}</button>'+
        '<form class="list">'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalNewStudentDialog()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-disabled="!modelNewStudent.name || !modelNewStudent.surname || !modelNewStudent.email || !modelNewStudent.password || modelNewStudent.password != modelNewStudent.passwordRepeat || !modelNewStudent.passwordRepeat" ng-click="createNewStudent(modelNewStudent.name, modelNewStudent.surname, modelNewStudent.email, modelNewStudent.password)">{{ \'GENERATE\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
      '<div class="list-team list-elements">'+
        '<ion-list>'+
          '<form id="newStudentForm" class="list">'+
            '<label class="item item-input list-elements" id="signUp-input3">'+
              '<span class="input-label">'+
                '<i class="icon ion-person"></i>&nbsp;&nbsp;{{ \'NAME\' | translate }}</span>'+
              '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewStudent.name">'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input3">'+
              '<span class="input-label">'+
                '<i class="icon ion-person"></i>&nbsp;&nbsp;{{ \'SURNAME\' | translate }}</span>'+
              '<input type="text" placeholder="{{ \'SURNAME\' | translate }}" ng-model="modelNewStudent.surname">'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input5">'+
              '<span class="input-label">'+
                '<i class="icon ion-at"></i>&nbsp;&nbsp;{{ \'EMAIL\' | translate }}</span>'+
              '<input type="email" placeholder="{{ \'EMAIL\' | translate }}" ng-model="modelNewStudent.email">'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input6">'+
              '<span class="input-label">'+
                '<i class="icon ion-locked"></i>&nbsp;&nbsp;{{ \'PASSWORD\' | translate }}</span>'+
              '<input type="password" placeholder="{{ \'PASSWORD\' | translate }}" ng-model="modelNewStudent.password">'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input7">'+
              '<span class="input-label">'+
                '<i class="icon ion-locked"></i>&nbsp;&nbsp;{{ \'CONFIRM_PASSWORD\' | translate }}</span>'+
                '<input type="password" placeholder="{{ \'CONFIRM_PASSWORD\' | translate }}" ng-model="modelNewStudent.passwordRepeat">'+
            '</label>'+
          '</form>'+
        '</ion-list>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>)';

  $scope.studentDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{student.name}} {{student.surname}}</h3>'+
      '<div class="list-student">'+
        '<div class="teacherAvatar">'+
          '<img src={{student.avatar}} class="avatar">'+
        '</div>'+
        '<button  class="button button-light  button-block button-outline" ng-click="showModalStudentProfile()">{{ \'VIEW_PROFILE\' | translate }}</button>'+
        '<button ng-click="showModalSecondary()" class="button button-positive  button-block icon ion-android-more-horizontal"></button>'+
        '<button ng-click="closeModalStudentDialog()" class="button button-positive  button-block icon ion-arrow-return-left"></button>'+
      '</div>'+
      '<div class="list-student list-elements">'+
        '<ion-list>'+
          '<ion-item class="list-student-dialog" ng-repeat="item in studentItems">'+
            '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{item.name}}'+
            '<span class="item-note">{{item.points}} / {{item.maxScore}}</span>'+
            '<ion-option-button class="button-assertive" ng-click="removePoints(item)">'+
              '<i class="icon ion-minus-round"></i>'+
            '</ion-option-button>'+
            '<ion-option-button class="button-calm" ng-click="addPoints(item)">'+
              '<i class="icon ion-plus-round"></i>'+
            '</ion-option-button>'+
        '</ion-list>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.studentProfileModal = '<ion-modal-view>'+
    '<ion-content>'+
      '<h3 id="teams-heading5" class="teams-hdg5">'+
        '<a id="teacherHome-dropdown" class="button button-light icon ion-home" ng-click="teacherHomeForm() ; closeModalStudentProfile() ; closeModalStudentDialog()"></a>'+
        '<h3>{{student.name}} {{student.surname}}</h3>'+
      '</h3>'+
      '<form id="studentProfileFormData" class="list">'+
        '<ion-list id="signUp-list2">'+
          '<ion-item class ="teacherAvatar">'+
            '<img src={{student.avatar}} class="avatar">'+
          '</ion-item>'+
          '<label class="item item-input list-elements" id="signUp-input3">'+
            '<span class="inputLabelProfile">'+
              '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;ESCUELA'+
              '<p>{{student.school}}</p>'+
            '</span>'+
          '</label>'+
          '<label class="item item-input list-elements" id="signUp-input5">'+
            '<span class="inputLabelProfile">'+
              '<i class="icon ion-at"></i>&nbsp;&nbsp;{{ \'EMAIL\' | translate }}'+
              '<p>{{student.email}}</p>'+
            '</span>'+
          '</label>'+
          '<button id="signUp-button8" class="button button-positive  button-block icon ion-arrow-return-left" ng-click="closeModalStudentProfile()"></button>'+
        '</ion-list>'+
      '</form>'
    '</ion-content>'+
  '</ion-modal-view>'

  $scope.quantityRandomTeamsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>SELECCIONA CANTIDAD DE QUIPOS A CREAR</h3>'+
	  '<input class="item item-input" id="quantityInput" type="number" ng-model="modelQuantity.quantity">'+
	  '<div class="button-bar action_buttons">'+
		'<button class="button button-calm  button-block" ng-click="closeModalQuantityRandomTeams()">{{ \'CANCEL\' | translate }}</button>'+
		'<button class="button button-calm  button-block" ng-click="createRandomTeams(modelQuantity.quantity)">CREAR EQUIPOS ALEATORIOS</button>'+
	  '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.teamDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{team.name}}</h3>'+
      '<div class="list-student">'+
        '<div class="teacherAvatar">'+
          '<img src={{team.picture}} class="avatar">'+
        '</div>'+
        '<form id="teamDialogForm">'+
          '<button class="button button-light  button-block button-outline">{{ \'CHANGE_AVATAR\' | translate }}</button>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{team.name}}" ng-model="modelTeamDialog.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">OBJETIVO</span>'+
            '<input type="text" placeholder="{{team.objective}}" ng-model="modelTeamDialog.objective">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">IMAGEN</span>'+
            '<input type="text" placeholder="{{team.picture}}" ng-model="modelTeamDialog.picture">'+
          '</label>'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalTeamDialog()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-disabled="!modelTeamDialog.name && !modelTeamDialog.objective && !modelTeamDialog.picture" ng-click="editTeam(modelTeamDialog.name, modelTeamDialog.objective, modelTeamDialog.picture)">{{ \'EDIT_TEAM\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
      '<div class="list-team">'+
        '<ion-list>'+
          '<ion-item class="list-student-team" ng-repeat="teamMember in teamMembers">{{teamMember.name}} {{teamMember.surname}}</ion-item>'+
        '</ion-list>'+
        '<button ng-click="showModalEditMembers()" class="button button-calm  button-block">EDITAR MIEMBROS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newTeamDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>New Team</h3>'+
      '<div class="list-student">'+
        '<div class="teacherAvatar">'+
          '<img src={{defaultTeamAvatar}} class="avatar">'+
        '</div>'+
        '<button  class="button button-light  button-block button-outline">{{ \'UPLOAD_AVATAR\' | translate }}</button>'+
        '<form id="newTeamForm" class="list">'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewTeamDialog.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">OBJETIVO</span>'+
            '<input type="text" placeholder="OBJETIVO" ng-model="modelNewTeamDialog.objective">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">IMAGEN</span>'+
            '<input type="text" placeholder="IMAGEN" ng-model="modelNewTeamDialog.picture">'+
          '</label>'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalNewTeamDialog()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-disabled="!modelNewTeamDialog.name || !modelNewTeamDialog.objective" ng-click="createTeam(modelNewTeamDialog.name, modelNewTeamDialog.objective, modelNewTeamDialog.picture)">{{ \'ACCEPT\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
      '<div class="list-team">'+
        '<ion-list>'+
          '<ion-checkbox class="list-student-team" ng-repeat="studentForTeamSelection in studentsForTeamSelection" ng-checked="studentForTeamSelection.selected" ng-click="changeSelectedStudentForTeam(studentForTeamSelection)">{{studentForTeamSelection.name}} {{studentForTeamSelection.surname}}</ion-checkbox>'+
        '</ion-list>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMembersModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>EDITAR MIEMBROS</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="studentForTeamSelection in studentsForTeamSelection" ng-checked="studentForTeamSelection.inTeam" ng-click="inTeam(studentForTeamSelection)">{{studentForTeamSelection.name}} {{studentForTeamSelection.surname}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="list-student">'+
        '<button ng-click="closeModalEditMembers()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editTeamMembers()" class="button button-calm  button-block">EDITAR MIEMBROS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{mission.name}}</h3>'+
        '<form class="list">'+
          '<ion-list>'+
            '<label class="item item-input list-elements">'+
              '<span class="input-label">{{ \'NAME\' | translate }} </span>'+
              '<input type="text" ng-disabled="mission.finished" placeholder="{{mission.name}}" ng-model="modelEditMission.name">'+
            '</label>'+
            '<label class="item item-input list-elements">'+
              '<span class="input-label">PUNTOS ADICIONALES (OPCIONAL)</span>'+
              '<input type="text" ng-disabled="mission.finished" placeholder="{{mission.additionalPoints}}" ng-model="modelEditMission.additionalPoints">'+
            '</label>'+
          '</ion-list>'+
        '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalEditMission()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-disabled="!modelEditMission.name && !modelEditMission.additionalPoints" ng-click="editMission(modelEditMission.name, modelEditMission.additionalPoints)">EDITAR MISIÓN</button>'+
      '</div>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'ITEMS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="item in missionItems">'+
          '{{item.name}}'+
          '<p>PUNTOS NECESARIOS: {{item.neededPoints}}</p>'+
        '</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="achievements-button91" class="button button-calm button-block" ng-disabled="mission.finished" ng-click="showModalEditMissionItems()">EDITAR ITEMS</button>'+
      '</div>'+
      '<h3 id="teams-heading5" class="teams-hdg5">RECOMPENSAS</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="reward in missionRewards">{{reward.name}}</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="achievements-button91" class="button button-calm button-block" ng-disabled="mission.finished" ng-click="showModalEditMissionRewards()">EDITAR RECOMPENSA</button>'+
      '</div>'+
      '<h3 id="teams-heading5" class="teams-hdg5">ESTUDIANTES</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="student in missionStudents">{{student.name}}  {{student.surname}}</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="achievements-button91" class="button button-calm button-block" ng-disabled="mission.finished" ng-click="showModalEditMissionMembers()">EDITAR ESTUDIANTES</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionItemsModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>EDITAR ITEMS</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="itemForMissionSelection in itemsForMissionSelection" ng-checked="itemForMissionSelection.inMission" ng-click="inMission(itemForMissionSelection)">{{itemForMissionSelection.name}} {{itemForMissionSelection.score}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMissionItems()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editMissionItems()" class="button button-calm  button-block">EDITAR ITEMS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionRewardsModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>EDITAR RECOMPENSAS</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="rewardForMissionSelection in rewardsForMissionSelection" ng-checked="rewardForMissionSelection.inMission" ng-click="inMission(rewardForMissionSelection)">{{rewardForMissionSelection.name}} {{rewardForMissionSelection.price}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMissionRewards()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editMissionRewards()" class="button button-calm  button-block">EDITAR RECOMPENSAS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionMembersModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>EDITAR MIEMBROS</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="studentForMissionSelection in studentsForMissionSelection" ng-checked="studentForMissionSelection.inMission" ng-click="inMission(studentForMissionSelection)">{{studentForMissionSelection.name}} {{studentForMissionSelection.surname}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMissionMembers()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editMissionMembers()" class="button button-calm  button-block">EDITAR MIEMBROS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newItemModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
     '<h3>{{ \'NEW_ITEM\' | translate }}</h3>'+
      '<form id="newItemForm" class="list list-student fullScreen">'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewItem.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'DESCRIPTION\' | translate }}" ng-model="modelNewItem.description">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'REQUIREMENTS\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'REQUIREMENTS\' | translate }}" ng-model="modelNewItem.requirements">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'SCORE\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'SCORE\' | translate }}" ng-model="modelNewItem.score">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'MAX_SCORE\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'MAX_SCORE\' | translate }}" ng-model="modelNewItem.maxScore">'+
          '</label>'+
          '<ion-toggle toggle-class="toggle-calm" ng-model="modelNewItem.useForLevel">USAR PARA NIVEL</ion-toggle>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalNewItem()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="createItem(modelNewItem.name, modelNewItem.description, modelNewItem.requirements, modelNewItem.score, modelNewItem.maxScore, modelNewItem.useForLevel)" ng-disabled="!modelNewItem.name || !modelNewItem.description || !modelNewItem.requirements || !modelNewItem.score">{{ \'ADD_ITEM\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newAchievementModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'NEW_ACHIEVEMENT\' | translate }}</h3>'+
      '<form id="newAchievementForm" class="list">'+
        '<ion-list>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
          '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewAchievement.name">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
          '<input type="text" placeholder="{{ \'DESCRIPTION\' | translate }}" ng-model="modelNewAchievement.description">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'REQUIREMENTS\' | translate }}</span>'+
          '<input type="number" placeholder="{{ \'REQUIREMENTS\' | translate }}" ng-model="modelNewAchievement.requirements">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">MÁXIMO NIVEL</span>'+
          '<input type="number" placeholder="MÁXIMO NIVEL" ng-model="modelNewAchievement.maxLevel">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">MEDALLA</span>'+
          '<input type="number" placeholder="MEDALLA" ng-model="modelNewAchievement.badge">'+
        '</label>'+
      '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalNewAchievement()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block"  ng-click="createAchievement(modelNewAchievement.name, modelNewAchievement.description, modelNewAchievement.requirements, modelNewAchievement.maxLevel, modelNewAchievement.badge)" ng-disabled="!modelNewAchievement.name || !modelNewAchievement.description || !modelNewAchievement.requirements || !modelNewAchievement.maxLevel">{{ \'ADD_ACHIEVEMENT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newRewardModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<form id="newRewardForm" class="list">'+
        '<h3>NUEVA RECOMPENSA</h3>'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }} </span>'+
            '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewReward.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'DESCRIPTION\' | translate }}" ng-model="modelNewReward.description">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">PERMISO</span>'+
            '<input type="text" placeholder="PERMISO" ng-model="modelNewReward.permission">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">PRECIO</span>'+
            '<input type="number" placeholder="PRECIO" ng-model="modelNewReward.price">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalNewReward()" >{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="createReward(modelNewReward.name, modelNewReward.description, modelNewReward.permission, modelNewReward.price)" ng-disabled=" !modelNewReward.name || !modelNewReward.description || !modelNewReward.permission || !modelNewReward.price">{{ \'ACCEPT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editRewardModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<form id="editRewardForm" class="list">'+
        '<h3>{{reward.name}}</h3>'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }} </span>'+
            '<input type="text" placeholder="{{reward.name}}" ng-model="modelEditReward.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
            '<input type="text" placeholder="{{reward.description}}" ng-model="modelEditReward.description">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">PERMISO</span>'+
            '<input type="text" placeholder="{{reward.permission}}" ng-model="modelEditReward.permission">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">PRECIO</span>'+
            '<input type="number" placeholder="{{reward.price}}" ng-model="modelEditReward.price">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalEditReward()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-disabled="!modelEditReward.name && !modelEditReward.description && !modelEditReward.permission && !modelEditReward.price" ng-click="editReward(modelEditReward.name, modelEditReward.description, modelEditReward.permission, modelEditReward.price)">EDITAR RECOMPENSA</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  /*
    *************************************EVERY MODAL FUNCTION GOES HERE*******************************
  */

                                        /* CONFIGURE LEVELS MODAL */

  $scope.configureLevelsModal = $ionicModal.fromTemplate($scope.configureLevelsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showConfigureLevelsModal = function() {
    $scope.closePopoverClassStudents();
    $scope.getLevels();
    $scope.configureLevelsModal.show();
  }
  $scope.closeConfigureLevelsModal = function() {
    $scope.closePopoverClassStudents();
    $scope.configureLevelsModal.hide();
  }

                                        /* NEW LEVEL MODAL */

  $scope.newLevelModal = $ionicModal.fromTemplate($scope.newLevelModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showNewLevelModal = function() {
    $scope.modelNewLevel = {};
    $scope.closeConfigureLevelsModal();
    $scope.newLevelModal.show();
  }
  $scope.closeNewLevelModal = function() {
    $scope.newLevelModal.hide();
    $scope.showConfigureLevelsModal();  
  }

                                        /* EDIT LEVEL MODAL */

  $scope.editLevelModal = $ionicModal.fromTemplate($scope.editLevelModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showEditLevelModal = function() {
    $scope.modelEditLevel = {};
    $scope.closeConfigureLevelsModal();
    $scope.editLevelModal.show();
  }
  $scope.closeEditLevelModal = function() {
    $scope.editLevelModal.hide();
    $scope.showConfigureLevelsModal(); 
  }

                                        /* ATTENDANCE MODAL */

  $scope.attendanceModal = $ionicModal.fromTemplate($scope.attendanceModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showAttendanceModal = function(){
    $scope.attendanceModal.show();
    $scope.date = Date.now(); 
  }
  $scope.closeAttendanceModal = function(){
    $scope.attendanceModal.hide();
  }

                                        /* SELECT CLASSROOMS MODAL */

  $scope.selectClassroomsModal = $ionicModal.fromTemplate($scope.selectClassroomsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectClassroomsModal = function(){
    $scope.getClassroomsForSelection();
    $scope.selectClassroomsModal.show();
  }
  $scope.closeSelectClassroomsModal = function(){
    $scope.selectClassroomsModal.hide();
  }

                                        /* SELECT STUDENTS MODAL */

  $scope.selectStudentsModal = $ionicModal.fromTemplate($scope.selectStudentsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectStudentsModal = function(){
    $scope.getStudentsForSelection();
    $scope.selectStudentsModal.show();
  }
  $scope.closeSelectStudentsModal = function(){
    $scope.selectStudentsModal.hide();
  }

                                        /* SELECT ITEMS MODAL */

  $scope.selectItemsModal = $ionicModal.fromTemplate($scope.selectItemsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectItemsModal = function() {
    if($scope.newMissionModal != undefined) {
      if($scope.newMissionModal.isShown()){
        $scope.newMissionModal.hide();
        modalMissions = 1;
      }
    }

    if($scope.editMissionModal != undefined) {
      if($scope.editMissionModal.isShown()){
        $scope.editMissionModal.hide();
        modalMissions = 2;
      }
    }
    $scope.getItemsForSelection();
    $scope.selectItemsModal.show();
  }
  $scope.closeSelectItemsModal = function(){
    $scope.selectItemsModal.hide();
    if(modalMissions != undefined) {
      if(modalMissions == 1) {
        $scope.newMissionModal.show();
      }
      if(modalMissions == 2) {
        $scope.editMissionModal.show();
      }
    }
  }

                                        /* SELECT ACHIEVEMENTS MODAL */

  $scope.selectAchievementsModal = $ionicModal.fromTemplate($scope.selectAchievementsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectAchievementsModal = function(){
    $scope.getAchievementsForSelection();
    $scope.selectAchievementsModal.show();
  }
  $scope.closeSelectAchievementsModal = function(){
    $scope.selectAchievementsModal.hide();
  }
  
                                        /* SELECT TEAMS MODAL */

  $scope.selectTeamsModal = $ionicModal.fromTemplate($scope.selectTeamsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectTeamsModal = function(){
    $scope.getTeamsForSelection();
    $scope.selectTeamsModal.show();
  } 
  $scope.closeSelectTeamsModal = function(){
    $scope.selectTeamsModal.hide();
  }

                                        /* SELECT REWARDS MODAL */

  $scope.selectRewardsModal = $ionicModal.fromTemplate($scope.selectRewardsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectRewardsModal = function(){
    $scope.getRewardsForSelection();
    $scope.selectRewardsModal.show();
  }
  $scope.closeSelectRewardsModal = function(){
    $scope.selectRewardsModal.hide();
  }

                                        /* SELECT MISSIONS MODAL */

  $scope.selectMissionsModal = $ionicModal.fromTemplate($scope.selectMissionsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectMissionsModal = function(){
    $scope.getMissionsForSelection();
    $scope.selectMissionsModal.show();
  }
  $scope.closeSelectMissionsModal = function(){
    $scope.selectMissionsModal.hide();
  }

                                        /* NEW CLASS MODAL */

  $scope.newClassModal = $ionicModal.fromTemplate($scope.newClassModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showModalNewClass = function(){
    $scope.modelNewClass = {};
    $scope.newClassModal.show();  
  }
  $scope.closeModalNewClass = function(){
    $scope.newClassModal.hide();
  }

                                        /* SECONDARY MENU MODAL */

  $scope.secondaryMenuModal = $ionicModal.fromTemplate( $scope.secondaryMenuModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalSecondary = function(){
    if($scope.studentDialogModal != undefined) {
      if ($scope.studentDialogModal.isShown()){
        $scope.studentDialogModal.hide();
        modalFirst = 1;
      }
    }
    if($scope.newStudentModal != undefined) {
      if ($scope.newStudentModal.isShown()){
        $scope.newStudentModal.hide();
        modalFirst = 2;
      }
    }
    $scope.secondaryMenuModal.show();  
  }
  $scope.closeModalSecondary = function(){
	$scope.clearFormSecundaryModal();
    $scope.secondaryMenuModal.hide();
    if(modalFirst != undefined) {
      if(modalFirst == 1)
        $scope.studentDialogModal.show(); 
      if(modalFirst == 2)
        $scope.newStudentModal.show();
    }
  }

                                        /* NEW STUDENT DIALOG MODAL */

  $scope.newStudentModal = $ionicModal.fromTemplate($scope.newStudentModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewStudentDialog = function(){
    $scope.modelNewStudent = {};
    $scope.newStudentModal.show();  
  }
  $scope.closeModalNewStudentDialog = function(){
    $scope.newStudentModal.hide();
  }

                                        /* STUDENT DIALOG MODAL */

  $scope.studentDialogModal = $ionicModal.fromTemplate($scope.studentDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalStudentDialog = function(){
    $scope.studentDialogModal.show();  
  }
  $scope.closeModalStudentDialog = function(){
    $scope.studentDialogModal.hide();
  }

                                        /* STUDENT PROFILE MODAL */

  $scope.studentProfileModal = $ionicModal.fromTemplate($scope.studentProfileModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalStudentProfile = function(){
    $scope.studentProfileModal.show();  
  }
  $scope.closeModalStudentProfile = function(){
    $scope.studentProfileModal.hide();
  }
  
                                          /* QUANTITY RANDOM TEAMS MODAL */

  $scope.quantityRandomTeamsModal = $ionicModal.fromTemplate($scope.quantityRandomTeamsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalQuantityRandomTeams = function(){
    $scope.modelQuantity = {};
    $scope.quantityRandomTeamsModal.show();  
  }
  $scope.closeModalQuantityRandomTeams = function(){
    $scope.quantityRandomTeamsModal.hide();
  }

                                        /* TEAM DIALOG MODAL */  

  $scope.teamDialogModal = $ionicModal.fromTemplate($scope.teamDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalTeamDialog = function(){
    $scope.modelTeamDialog = {};
    $scope.teamDialogModal.show();  
  }
  $scope.closeModalTeamDialog = function(){
    $scope.teamDialogModal.hide();
  }

                                        /* NEW TEAM DIALOG MODAL */

  $scope.newTeamDialogModal = $ionicModal.fromTemplate($scope.newTeamDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewTeamDialog = function(){
    $scope.modelNewTeamDialog = {};
    $scope.getStudentsForTeamSelection();
    $scope.newTeamDialogModal.show();  
  }
  $scope.closeModalNewTeamDialog = function(){
    $scope.newTeamDialogModal.hide();
  }

                                        /* EDIT TEAM MEMBERS MODAL */

  $scope.editMembersModal = $ionicModal.fromTemplate($scope.editMembersModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMembers = function(){
    $scope.editMembers = true;
    $scope.getStudentsForTeamSelection();
    $scope.editMembersModal.show();  
  }
  $scope.closeModalEditMembers = function(){
    $scope.editMembersModal.hide();
  }

                                        /* EDIT MISSION MODAL */

  $scope.editMissionModal = $ionicModal.fromTemplate($scope.editMissionModal,  {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMission = function(){
    if(modalMissions != undefined) {
      if(modalMissions == 0){
        $scope.modelEditMission = {};  
      }
    }
    $scope.editMissionModal.show();  
  }
  $scope.closeModalEditMission = function(){
    $scope.editMissionModal.hide();
    modalMissions = 0;
  }

                                            /* EDIT MISSION ITEMS MODAL */

  $scope.editMissionItemsModal = $ionicModal.fromTemplate($scope.editMissionItemsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMissionItems = function(){
    $scope.editingMissionItems = true;
    $scope.getItemsForMissionSelection();
    $scope.editMissionItemsModal.show();  
  }
  $scope.closeModalEditMissionItems = function(){
    $scope.editMissionItemsModal.hide();
  }

                                          /* EDIT MISSION REWARDS MODAL */

  $scope.editMissionRewardsModal = $ionicModal.fromTemplate($scope.editMissionRewardsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMissionRewards = function(){
    $scope.editingMissionRewards = true;
    $scope.getRewardsForMissionSelection();
    $scope.editMissionRewardsModal.show();  
  }
  $scope.closeModalEditMissionRewards = function(){
    $scope.editMissionRewardsModal.hide();
  }

                                          /* EDIT MISSION MEMBERS MODAL */

  $scope.editMissionMembersModal = $ionicModal.fromTemplate($scope.editMissionMembersModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMissionMembers = function(){
    $scope.editingMissionMembers = true;
    $scope.getMembersForMissionSelection();
    $scope.editMissionMembersModal.show();  
  }
  $scope.closeModalEditMissionMembers = function(){
    $scope.editMissionMembersModal.hide();
  }

                                        /* NEW ITEM MODAL */

  $scope.newItemModal = $ionicModal.fromTemplate($scope.newItemModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewItem = function(){
    $scope.modelNewItem = {};
    $scope.newItemModal.show();  
  }
  $scope.closeModalNewItem = function(){
    $scope.newItemModal.hide();
  }

                                        /* NEW ACHIEVEMENT MODAL */

  $scope.newAchievementModal = $ionicModal.fromTemplate($scope.newAchievementModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewAchievement = function(){
    $scope.modelNewAchievement = {};
    $scope.newAchievementModal.show();  
  }
  $scope.closeModalNewAchievement = function(){
    $scope.newAchievementModal.hide();
  }

                                       /* NEW REWARD MODAL */
  $scope.newRewardModal = $ionicModal.fromTemplate($scope.newRewardModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewReward = function(){
    $scope.modelNewReward = {};
    $scope.newRewardModal.show();  
  } 
  $scope.closeModalNewReward = function(){
    $scope.newRewardModal.hide();
  }

                                        /* EDIT REWARD MODAL */

  $scope.editRewardModal = $ionicModal.fromTemplate($scope.editRewardModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditReward = function(){
    $scope.modelEditReward = {};
    $scope.editRewardModal.show();  
  }
  $scope.closeModalEditReward = function(){
    $scope.editRewardModal.hide();
  }

  /*
    *************************************CLEAN FORM FUNCTIONS GOES HERE*******************************
  */

  $scope.clearFormSecundaryModal = function(){
    var selectTeam = document.getElementById("selectTeam").selectedIndex = 0;
    var selectCopy = document.getElementById("selectCopy").selectedIndex = 0;
  }

  /*
    *************************************DECLARE VARIABLES & GIVE TO $SCOPE ALL THE VALUES WE NEED****
  */

  if (firebase.auth().currentUser === null) {
    $state.go('login');
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user && sharedData.getData() === 'teacher') {
      sessionUser = firebase.auth().currentUser;
      var teachersArray = $firebaseArray(teachersRef);
      teachersArray.$loaded(function() {
        $scope.teacher = teachersArray.$getRecord(sessionUser.uid);
        $scope.teacher.name = CryptoJS.AES.decrypt($scope.teacher.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
        $scope.teacher.surname = CryptoJS.AES.decrypt($scope.teacher.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
        $scope.getClassrooms();
      })
    }
  });

  $scope.defaultAvatar = 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538474-user_512x512.png';
  $scope.defaultTeamAvatar = 'https://www.ecrconsultoria.com.br/temp/backyard/images/icon_team.png';

  var modalFirst;
  var modalMissions = 0;

  var sessionUser;
  var secondaryConnection = null;

  var rootRef = firebase.database().ref();

  var teachersRef = firebase.database().ref('teachers');
  var studentsRef = firebase.database().ref('students');
  var classroomsRef = firebase.database().ref('classrooms');
  var itemsRef = firebase.database().ref('items');
  var achievementsRef = firebase.database().ref('achievements');
  var teamsRef = firebase.database().ref('teams');
  var rewardsRef = firebase.database().ref('rewards');
  var missionsRef = firebase.database().ref('missions');

  /*
    *************************************EVERY FUNCTIONALITY FUNCTION GOES HERE***********************
  */




                                        /* HASHCODE POPUP */

  $scope.showHashcodePopup = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'CODIGO DE LA CLASE',
      template: $scope.classroom.hashcode,
    });

    alertPopup.then(function(res) {
      $scope.closePopoverClassStudents();
    });
  };




                                        /* FUNCTIONS IN SETTINGS */

  $scope.logOut = function() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
      $state.go('login');
      $scope.teacherHomeForm();
    }
  }




                                        /* FUNCTIONS IN TEACHER HOME */

  $scope.getClassrooms = function() {
    var teacherClassroomsRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/classrooms');
    var classroomKeys = $firebaseArray(teacherClassroomsRef);
    classroomKeys.$loaded(function() {
      $scope.classrooms = [];
      for (i = 0 ; i < classroomKeys.length ; i++) {
        var classKey = classroomKeys.$keyAt(i);
        var loopClassroom = firebase.database().ref('classrooms/' + classKey);
        loopClassroom.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            for(j = 0 ; j < $scope.classrooms.length ; j++) {
                if($scope.classrooms[j].id == snapshot.val().id) {
                  change = true;
                  index = j;
                }              
            }
            if(!change) {
              $scope.classrooms.push(snapshot.val());            
            } else {
              $scope.classrooms[index] = snapshot.val();
            }
            if ($scope.classroom != undefined) {
              $scope.getLevels();
            }
            if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getClassroomsForSelection();
          }
        });
      }
    });
  }

  $scope.getClassroomsForSelection = function() {
    $scope.classroomsForSelection = angular.copy($scope.classrooms);
    for (var element in $scope.classroomsForSelection) {
      $scope.classroomsForSelection[element].selected = false;
    }
  }

  $scope.createClassroom = function(name) {
	//THINGS TO DO
	//Añadir niveles a las clases, el profesor es el que va a poder crearlos (numero nivel, nombre)
    var classroomsNode = $firebaseArray(classroomsRef);
    classroomsNode.$loaded(function() {
      classroomsNode.$add({
        'name' : name,
        'open' : true,
        'archived' : false,
        'notifications' : true,
        'teacher' : $scope.teacher.$id,
      }).then(function(ref) {
        var id = ref.key;

        var idForClassroomRef = firebase.database().ref('classrooms/' + id + '/id');
        idForClassroomRef.set(id);

        var a = CryptoJS.SHA1(id + Date.now().toString()).toString();
        var hash = a.substr(0, 10).toUpperCase();
        var hashCodeForClassroomRef = firebase.database().ref('classrooms/' + id + '/hashcode');
        hashCodeForClassroomRef.set(hash);

        var hashCodeRef = firebase.database().ref('hashcodes/' + hash + '/id');
        hashCodeRef.set(id);

        var newteacherClassroomRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/classrooms/' + id);
        newteacherClassroomRef.set(true);

        //COPY PREFERENCES FROM OTHER CLASSROOM
        var classroomIndex = document.getElementById("selectClass").selectedIndex;
        if (classroomIndex != 0) {
        	var classroom = $scope.classrooms[classroomIndex - 1];
          $scope.copyPreferencesFromClassroom(classroom, id);
        } else {
          $scope.getClassrooms();
        }
      });  
    });
  }

  $scope.deleteClassroom = function(classroom) {
    for (var student in classroom.students) {
      var studentClassToDeleteRef = firebase.database().ref('students/' + student + '/classrooms/' + classroom.id);
      studentClassToDeleteRef.remove();
    }

    var teacherClassToDelefeRef = firebase.database().ref('teachers/' + sessionUser.uid + '/classrooms/' + classroom.id);
    teacherClassToDelefeRef.remove();

    var classroomHascodeRef = firebase.database().ref('hashcodes/' + classroom.hashcode);
    classroomHascodeRef.remove();

    var classToDeleteRef = firebase.database().ref('classrooms/' + classroom.id);
    classToDeleteRef.remove();
    
    for (var item in classroom.items) {
      var classItemToDeleteRef = firebase.database().ref('items/' + item);
      classItemToDeleteRef.remove();
      for (var student in classroom.students) {
        var studentItemToDeleteRef = firebase.database().ref('students/' + student + '/items/' + item);
        studentItemToDeleteRef.remove();
      }
    }

    for (var reward in classroom.rewards) {
      var classRewardToDeleteRef = firebase.database().ref('rewards/' + reward);
      classRewardToDeleteRef.remove();
      for (var student in classroom.students) {
        var studentRewardToDeleteRef = firebase.database().ref('students/' + student + '/rewards/' + reward);
        studentRewardToDeleteRef.remove();
      }
    }

    for (var team in classroom.teams) {
      var classTeamToDeleteRef = firebase.database().ref('teams/' + team);
      classTeamToDeleteRef.remove();
      for (var student in classroom.students) {
        var studentTeamToDeleteRef = firebase.database().ref('students/' + student + '/teams/' + team);
        studentTeamToDeleteRef.remove();
      }
    }

    for (var mission in classroom.missions) {
      var classMissionToDeleteRef = firebase.database().ref('missions/' + mission);
      classMissionToDeleteRef.remove();
      for (var student in classroom.students) {
        var studentMissionToDeleteRef = firebase.database().ref('students/' + student + '/missions/' + mission);
        studentMissionToDeleteRef.remove();
      }
    }

    $scope.getClassrooms();
  }

  $scope.setClassroom = function(classroom) {
    $scope.classroom = classroom;
    $scope.getStudents();
    $scope.getLevels();
    $scope.getItems();
    $scope.getTeams();
    $scope.getRewards();
    $scope.getMissions();
  }

  $scope.archiveClassroom = function(classroom) {
    var classroomToArchiveRef = firebase.database().ref('classrooms/' + classroom.id + '/archived');
    classroomToArchiveRef.set(true).then(function() {
    });
  }

  $scope.unArchiveClassroom = function(classroom) {
    var classroomToArchiveRef = firebase.database().ref('classrooms/' + classroom.id + '/archived');
    classroomToArchiveRef.set(false).then(function() {
    });
  }

  $scope.showArchivedClassrooms = function(value) {
    $scope.archivedClassroomsToShow = value;
    $scope.closePopoverTeacherHome();
  }

  $scope.duplicateClassroom = function(classroom) {
    //DUPLICATE ACTION GOES HERE
    //THINGS TO DO
  }

  $scope.copyPreferencesFromClassroom = function(originalClassroom, newClassroomId) {
    $scope.classroom = {};
    $scope.classroom.id = originalClassroom.id;

    var classroomLevelsRef = firebase.database().ref('classrooms/' + newClassroomId + '/levels');
    var classroomLevelsArray = $firebaseArray(classroomLevelsRef);
    classroomLevelsArray.$loaded(function() {
      for (var levelId in originalClassroom.levels) {
        classroomLevelsArray.$add({
          'title' : originalClassroom.levels[levelId].title,
          'level' : originalClassroom.levels[levelId].level,
          'requiredPoints' : originalClassroom.levels[levelId].requiredPoints,
        }).then(function(ref) {
          var id = ref.key;

          var idForLevelRef = firebase.database().ref('classrooms/' + newClassroomId + '/levels/' + id + '/id');
          idForLevelRef.set(id);
        });
      }
    });

    for (var student in originalClassroom.students) {
      var newClassStudentRef = firebase.database().ref('classrooms/' + newClassroomId + '/students/' + student);
      newClassStudentRef.set(true);

      var newStudentClassRef = firebase.database().ref('students/' + student + '/classrooms/' + newClassroomId);
      newStudentClassRef.set({
        'id' : $scope.classroom.id,
        'totalPoints' : 0,
        'inClass' : true,
      });
    }

    var teamsArray = $firebaseArray(teamsRef);
    teamsArray.$loaded(function() {
      for (var teamId in originalClassroom.teams) {
        var loopTeam = firebase.database().ref('teams/' + teamId);
        loopTeam.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var team = snapshot.val();
            teamsArray.$add({
              'name' : team.name,
              'objective' : team.objective,
              'picture' : team.picture,
            }).then(function(ref) {
              var id = ref.key;

              var idForTeamRef = firebase.database().ref('teams/' + id + '/id');
              idForTeamRef.set(id);

              var classroomRef = firebase.database().ref('classrooms/' + newClassroomId  + '/teams/' + id);
              classroomRef.set(true);
            });
          }
        })
      }
    });

    var itemsArray = $firebaseArray(itemsRef);
    var achievementsArray = $firebaseArray(achievementsRef);
    itemsArray.$loaded(function() {
      achievementsArray.$loaded(function() {
        var itemId = 0;
        for (var itemId in originalClassroom.items) {
          var loopItem = firebase.database().ref('items/' + itemId);
          loopItem.on('value', function(snapshotItem) {
            if (snapshotItem.val() != null) {
              var item = snapshotItem.val();
              itemsArray.$add({
                'name' : item.name,
                'description' : item.description,
                'score' : item.score,
                'maxScore' : item.maxScore,
                'useForLevel' : item.useForLevel,
                'requirements' : item.requirements,
              }).then(function(refItem) {
                var newItemId = refItem.key;
  
                var idForItemRef = firebase.database().ref('items/' + newItemId + '/id');
                idForItemRef.set(newItemId);
  
                var classroomItemRef = firebase.database().ref('classrooms/' + newClassroomId + '/items/' + newItemId);
                classroomItemRef.set(newItemId);
  
                if (item.achievements != undefined) {
                  for (var achievementId in item.achievements) {
                    var loopAchievement = firebase.database().ref('achievements/' + achievementId);
                    loopAchievement.on('value', function(snapshotAchievement) {
                      if (snapshotAchievement.val() != null) {
                        var achievement = snapshotAchievement.val();
                        achievementsArray.$add({
                          'name' : achievement.name,
                          'description' : achievement.description,
                          'badge' : achievement.badge,
                          'maxLevel' : achievement.maxLevel,
                          'requirements' : achievement.requirements,
                        }).then(function(refAchievement) {
                          var newAchievementId = refAchievement.key;
  
                          var idForAchievementRef = firebase.database().ref('achievements/' + newAchievementId + '/id');
                          idForAchievementRef.set(newAchievementId);
  
                          var classroomAchievementRef = firebase.database().ref('items/' + newItemId + '/achievements/' + newAchievementId);
                          classroomAchievementRef.set(newAchievementId);
                        });
                      }
                    })
                  }
                }
              });
            }
          });
        }
      });
    });

    var rewardsArray = $firebaseArray(rewardsRef);
    rewardsArray.$loaded(function() {
      for (var rewardId in originalClassroom.rewards) {
        var loopReward = firebase.database().ref('rewards/' + rewardId);
        loopReward.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var reward = snapshot.val();
            rewardsArray.$add({
              'name' : reward.name,
              'description' : reward.description,
              'permission' : reward.permission,
              'price' : reward.price,
            }).then(function(ref) {
              var id = ref.key;

              var idForRewardRef = firebase.database().ref('rewards/' + id + '/id');
              idForRewardRef.set(id);

              var classroomRewardsRef = firebase.database().ref('classrooms/' + newClassroomId + '/rewards/' + id);
              classroomRewardsRef.set(id);
            });
          }
        });
      }
    });

    $scope.getClassrooms();
  }

  $scope.selectClassrooms = function() {
    $scope.closeSelectClassroomsModal();
    if ($scope.actionSheetTeacherHomeType === 'delete') {
      for (var element in $scope.classroomsForSelection) {
        if ($scope.classroomsForSelection[element].selected === true) {
          $scope.deleteClassroom($scope.classroomsForSelection[element]);
        }
      }
      $scope.classroomsForSelection = $scope.classrooms;
    } else if ($scope.actionSheetTeacherHomeType === 'archive') {
      for (var element in $scope.classroomsForSelection) {
        if ($scope.classroomsForSelection[element].selected === true) {
          $scope.archiveClassroom($scope.classroomsForSelection[element]);
        }
      }
    } else if ($scope.actionSheetTeacherHomeType === 'unArchive') {
      for (var element in $scope.classroomsForSelection) {
        if ($scope.classroomsForSelection[element].selected === true) {
          $scope.unArchiveClassroom($scope.classroomsForSelection[element]);
        }
      }
    } else if ($scope.actionSheetTeacherHomeType === 'duplicate') {
      for (var element in $scope.classroomsForSelection) {
        if ($scope.classroomsForSelection[element].selected === true) {
          $scope.duplicateClassroom($scope.classroomsForSelection[element]); //THINGS TO DO
        }
      }
    }
  }

  $scope.changeSelectedClassroom = function(classroom){
    if (classroom.selected === false) {
      classroom.selected = true;
    } else {
      classroom.selected = false;
    }
  }

  


                                        /* FUNCTIONS IN TEACHER PROFILE */

  $scope.editTeacherData = function(name, surname, school, avatar) {
    if (name != undefined) {
      $scope.teacher.name = name;
      var teacherNameRef = firebase.database().ref('teachers/' + sessionUser.uid + '/name');
      teacherNameRef.set(CryptoJS.AES.encrypt(name,sessionUser.uid).toString());
      sessionUser.updateProfile ({
        displayName : name + ' ' + $scope.teacher.surname,
      });
    }

    if (surname != undefined) {
      $scope.teacher.surname = surname;
      var teacherSurnameRef = firebase.database().ref('teachers/' + sessionUser.uid + '/surname');
      teacherSurnameRef.set(CryptoJS.AES.encrypt(surname,sessionUser.uid).toString());
      sessionUser.updateProfile ({
        displayName : $scope.teacher.name + ' ' + surname,
      });
    }

    if (school != undefined) {
      $scope.teacher.school = school;
      var teacherSchoolRef = firebase.database().ref('teachers/' + sessionUser.uid + '/school');
      teacherSchoolRef.set(school);
    }

    if (avatar != undefined) {
      $scope.teacher.avatar = avatar;
      var teacherAvatarRef = firebase.database().ref('teachers/' + sessionUser.uid + '/avatar');
      teacherAvatarRef.set(avatar);
      sessionUser.updateProfile ({
        photoURL : avatar,
      });
    }
    $scope.settingsForm();
    alert('DATOS CAMBIADOS');
  }

  $scope.updateTeacherPassword = function(newPassword) {
    sessionUser.updatePassword(newPassword).then(function() {
      $scope.settingsForm();
      alert('CONTRASEÑA CAMBIADA');
    });
  }

  $scope.updateTeacherEmail = function(email) {
    sessionUser.updateEmail(email).then(function() {
      var teacherEmailRef = firebase.database().ref('teachers/' + sessionUser.uid + '/email');
      teacherEmailRef.set(email);
      $scope.settingsForm();
      alert('EMAIL CAMBIADO');
    });
  }




                                        /* FUNCTIONS IN CLASS */

  $scope.getLevels = function() {
    var classroomLevelsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels');
    var classroomLevelsArray = $firebaseArray(classroomLevelsRef);
    classroomLevelsArray.$loaded(function() {
      $scope.levels = [];
        for(var element in classroomLevelsArray) {
          var classroomLevelRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + classroomLevelsArray[element].id);
          classroomLevelRef.on('value', function(snapshot) {
            if (snapshot.val() != null) {
              var change = false;
              var index = -1;
              var level = snapshot.val();

              for(i = 0 ; i < $scope.levels.length ; i++) {
                if($scope.levels[i].id == level.id) {
                  change = true;
                  index = i;
                }
              }

              if(!change) {
                $scope.levels.push(level);
              } else {
                $scope.levels[index] = level
              }
              if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
              }
            }
          });
        }
    });
  }

  $scope.createLevel = function(title, level, requiredPoints) {
    var newLevel = {
      'title' : title,
      'level' : level,
      'requiredPoints' : requiredPoints,
    }
    var classroomLevelsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels');
    var classroomLevelsArray = $firebaseArray(classroomLevelsRef);
    classroomLevelsArray.$loaded(function() {
      classroomLevelsArray.$add(newLevel).then(function(ref) {
        var id = ref.key;

        var idForLevelRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + id + '/id');
        idForLevelRef.set(id);
        newLevel.id = id;

        $scope.getLevels();
        if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
          $scope.$apply();
        }

        $scope.levels = $scope.levels;
        $scope.closeNewLevelModal();
      });
    });
  }

  $scope.deleteLevel = function(level) {
    var levelToDeleteRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + level.id);
    levelToDeleteRef.remove();

    $scope.getLevels();

    if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
      $scope.$apply();
    }
  }

  $scope.setLevel = function(level) {
    $scope.level = level;
    $scope.showEditLevelModal();
  }

  $scope.editLevel = function(title, level, requiredPoints) {
    if(title != undefined && level != undefined && requiredPoints != undefined) {
      var editLevel = {
        'id' : $scope.level.id,
        'title' : title,
        'level' : level,
        'requiredPoints' : requiredPoints,
      }
      var levelRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id);
      levelRef.set(editLevel);
      $scope.levels[$scope.level.id] = editLevel;
    }

    if(title != undefined) {
      $scope.level.title = title;
      $scope.levels[$scope.level.id].title = title;
      var levelTitleRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id + '/title');
      levelTitleRef.set(title);
    }

    if(level != undefined) {
      $scope.level.level = level;
      $scope.classroom.levels[$scope.level.id].level = level;
      var levelLevelRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id + '/level');
      levelLevelRef.set(level);
    }

    if(requiredPoints != undefined) {
      $scope.level.requiredPoints = requiredPoints;
      $scope.levels[$scope.level.id].requiredPoints = requiredPoints;
      var levelRequiredPointsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id + '/requiredPoints');
      levelRequiredPointsRef.set(requiredPoints);
    }

    $scope.getLevels();
    if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
      $scope.$apply();
    }
    $scope.closeNewLevelModal();
  }

  $scope.getStudents = function() {
    var classroomStudentsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/students');
    var studentKeys = $firebaseArray(classroomStudentsRef);
    studentKeys.$loaded(function() {
      $scope.students = [];
      for (i = 0 ; i < studentKeys.length ; i++) {
        var studentKey = studentKeys.$keyAt(i);
        var loopStudent = firebase.database().ref('students/' + studentKey);
        loopStudent.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var student = snapshot.val();
            student.name = CryptoJS.AES.decrypt(student.name, student.id).toString(CryptoJS.enc.Utf8);
            student.surname =CryptoJS.AES.decrypt(student.surname, student.id).toString(CryptoJS.enc.Utf8);
            for(j = 0 ; j < $scope.students.length ; j++) {
              if($scope.students[j].id == student.id) {
                change = true;
                index = j;
              }
            }
            if(!change) {
              $scope.students.push(student);
            } else {
              $scope.students[index] = student
            }
            if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
          }
        });
        $scope.getStudentsForSelection();
      }
    }).then(function() {
      $scope.classForm();
    });
  }

  $scope.getStudentsForSelection = function() {
    $scope.studentsForSelection = [];
    if($scope.actionsheetClassStudentsType == 'evaluate') {
      for (var element in $scope.students) {
        if($scope.students[element].classrooms[$scope.classroom.id].inClass){
          $scope.studentsForSelection.push($scope.students[element]);
        }
      }
      for (var element in $scope.studentsForSelection) {
        $scope.studentsForSelection[element].selected = false;
      }
    } else {
      $scope.studentsForSelection = angular.copy($scope.students);
      for (var element in $scope.studentsForSelection) {
        $scope.studentsForSelection[element].selected = false;
      }
    }
  }

  $scope.createNewStudent = function(name, surname, email, password) {
    if (secondaryConnection == null) {
      var config = {
        apiKey: "AIzaSyBBKqBEuzK2MF9zm4V6u5BoqWWfdtQEF94",
        authDomain: "thelearninggamesproject-99882.firebaseapp.com",
        databaseURL: "https://thelearninggamesproject-99882.firebaseio.com",
        storageBucket: "thelearninggamesproject-99882.appspot.com",
        messagingSenderId: "451254044984",
      };
      secondaryConnection = firebase.initializeApp(config, "Secondary");
    }

    secondaryConnection.auth().createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {
      var sessionStudent = secondaryConnection.auth().currentUser;
      if (sessionStudent) {
        //User is signed in.
        sessionStudent.updateProfile({
          displayName : name + ' ' + surname,
          photoURL : $scope.defaultAvatar
        }).then(function() {
          //Update successful.
          var newStudentRef = firebase.database().ref('students/'+sessionStudent.uid);
          newStudentRef.set({
            'id' : sessionStudent.uid,
            'name' : CryptoJS.AES.encrypt(name, sessionStudent.uid).toString(),
            'surname' : CryptoJS.AES.encrypt(surname, sessionStudent.uid).toString(),
            'email' : sessionStudent.email,
            'school' : $scope.teacher.school,
            'avatar' : sessionStudent.photoURL,
          }).then(function() {
            var newClassStudentRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/students/' + sessionStudent.uid);
            newClassStudentRef.set(true);

            var newStudentClassRef = firebase.database().ref('students/' + sessionStudent.uid + '/classrooms/' + $scope.classroom.id);
            newStudentClassRef.set({
              'id' : $scope.classroom.id,
              'totalPoints' : 0,
              'usedPoints' : 0,
              'inClass' : true,
            });

            secondaryConnection.auth().signOut();
            $scope.closeModalNewStudentDialog();
            $scope.getStudents();
          });
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

  $scope.deleteStudent = function(student) {
    var studentClassRef = firebase.database().ref('students/' + student.id + '/classrooms/' + $scope.classroom.id);
    studentClassRef.remove();

    var classStudentRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/students/' + student.id);
    classStudentRef.remove();

    for (var item in $scope.items) {
      var studentItemToDeleteRef = firebase.database().ref('students/' + student.id + '/items/' + $scope.items[item].id);
      studentItemToDeleteRef.remove();
    }

    for (var team in $scope.teams) {
      var teamStudentsToDeleteRef = firebase.database().ref('teams/' + $scope.teams[team].id + '/students/' + student.id);
      teamStudentsToDeleteRef.remove();

      var studentTeamsToDeleteRef = firebase.database().ref('students/' + student.id + '/teams/' + $scope.teams[team].id);
      studentTeamsToDeleteRef.remove();
    }

    for (var mission in $scope.missions) {
      var studentMissionsToDeleteRef = firebase.database().ref('students/' + student.id + '/missions/' + $scope.missions[mission].id);
      studentMissionsToDeleteRef.remove();
    }
  }

  $scope.setStudent = function(student) {
    $scope.student = student;
    $scope.studentItems = [];
    for (var item in student.items) {
      for(i = 0 ; i < $scope.items.length ; i++){
        if(student.items[item].id == $scope.items[i].id){
          if($scope.items[i].achievements != undefined) {
            $scope.studentItems.push({
              'id' : student.items[item].id,
              'points' : student.items[item].points,
              'name' : $scope.items[i].name,
              'score' : $scope.items[i].score,
              'maxScore' : $scope.items[i].maxScore,
              'useForLevel' : $scope.items[i].useForLevel,
              'achievements' : $scope.items[i].achievements,
            });
          } else {
            $scope.studentItems.push({
              'id' : student.items[item].id,
              'points' : student.items[item].points,
              'name' : $scope.items[i].name,
              'score' : $scope.items[i].score,
              'maxScore' : $scope.items[i].maxScore,
              'useForLevel' : $scope.items[i].useForLevel,
            });
          }
        }
      }
    }
    $scope.showModalStudentDialog();
  }

  $scope.setOpening = function(opening) {
    if(opening == undefined){
      opening = false;
    }
    var classOpeningRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/open');
    classOpeningRef.set(opening);
    $scope.classroom.open = opening;
  }

  $scope.setNotifications = function(notification) {
    if(notification == undefined){
      notification = false;
    }
    var classNotificationsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/notifications');
    classNotificationsRef.set(notification);
    $scope.classroom.notifications = notification;
  }

  $scope.secondaryMenuSelection = function() {
    var teamIndex = document.getElementById("selectTeam").selectedIndex;
    var classroomIndex = document.getElementById("selectCopy").selectedIndex;

    var team = $scope.teams[teamIndex - 1];
    var classroom = $scope.classrooms[classroomIndex - 1];

    if(team != undefined && classroom != undefined) {
      $scope.addStudentToTeam(team, $scope.student);
      $scope.copyStudentToClass(classroom, $scope.student);
    } else {
      if (team != undefined) {
        $scope.addStudentToTeam(team, $scope.student);
      }

      if (classroom != undefined) {
        $scope.copyStudentToClass(classroom, $scope.student);
      }
    }
    $scope.closeModalSecondary();
  }

  $scope.addStudentToTeam = function(team, student) {
    var studentTeamsRef = firebase.database().ref('students/' + student.id + '/teams/' + team.id);
    studentTeamsRef.set(true);

    var teamStudentsRef = firebase.database().ref('teams/' + team.id + '/students/' + student.id);
    teamStudentsRef.set(true);
  }

  $scope.copyStudentToClass = function(classroom, student) {
    var classStudentRef = firebase.database().ref('classrooms/' + classroom.id + '/students/' + student.id);
    classStudentRef.set(true);

    var studentClassRef = firebase.database().ref('students/' + student.id + '/classrooms/' + classroom.id);
    studentClassRef.set({
      'id' : classroom.id,
      'totalPoints' : 0,
      'inClass' : true,
    });
  }

  $scope.selectStudents = function() {
    $scope.closeSelectStudentsModal();
    $scope.closeAttendanceModal();
    if ($scope.actionsheetClassStudentsType === 'delete') {
      for (var element in $scope.studentsForSelection) {
        if ($scope.studentsForSelection[element].selected === true) {
          $scope.deleteStudent($scope.studentsForSelection[element]);
        }
      }
      $scope.getStudents();
    } else if ($scope.actionsheetClassStudentsType === 'evaluate') {
      $scope.studentsToEvaluate = [];
      for (var element in $scope.studentsForSelection) {
        if ($scope.studentsForSelection[element].selected === true) {
          $scope.studentsToEvaluate.push($scope.studentsForSelection[element]);
        }
      }
      $scope.actionSheetItemsType = 'evaluateStudents';
      $scope.showSelectItemsModal();
    } else if ($scope.actionsheetClassStudentsType === 'attendance') {
      for (var element in $scope.students) {
        $scope.editStudentsAttendance($scope.students[element]);
      }
    } else if ($scope.actionsheetClassStudentsType === 'newMissionCreation') {
      $scope.actionSheetRewardsType = 'newMissionCreation';
      $scope.newMission.students = $scope.studentsForSelection;
      $scope.showSelectRewardsModal();
    }
  }
  
  $scope.changeSelectedStudent = function(student){
    if (student.selected === false) {
      student.selected = true;
    } else {
      student.selected = false;
    }
  }

  $scope.inClass = function(student) {
    if (student.classrooms[$scope.classroom.id].inClass === true) {
      student.classrooms[$scope.classroom.id].inClass = false;
    } else {
      student.classrooms[$scope.classroom.id].inClass = true;
    }
  }

  $scope.editStudentsAttendance = function(student) {
    var studentAttendanceRef = firebase.database().ref('students/' + student.id + '/classrooms/' + $scope.classroom.id + '/inClass');
    studentAttendanceRef.set(student.classrooms[$scope.classroom.id].inClass);
  }  
  
  


                                        /* FUNCTIONS IN ITEMS */

  $scope.getItems = function() {
    var classroomItemsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/items');
    var itemKeys = $firebaseArray(classroomItemsRef);
    itemKeys.$loaded(function() {
      $scope.items = [];
      for (i = 0 ; i < itemKeys.length ; i++) {
        var itemKey = itemKeys.$keyAt(i);
        var loopItem = firebase.database().ref('items/' + itemKey);
        loopItem.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var item = snapshot.val();
            for(j = 0 ; j < $scope.items.length ; j++){
              if(item.id == $scope.items[j].id){
                change = true;
                index = j;
              }
            }
            if(!change){
              $scope.items.push(item);  
            } else {
              $scope.items[index] = item;
            }
            $scope.getItemsForSelection();
          }
        });
      }
    });
  }

  $scope.getItemsForSelection = function() {
    $scope.itemsForSelection = angular.copy($scope.items);
    for (var element in $scope.itemsForSelection) {
      $scope.itemsForSelection[element].selected = false;
    }
  }

  $scope.createItem = function (name, description, requirements, score, maxScore, useForLevel) {
    if (useForLevel == undefined) {
      useForLevel = false;
    }
    if(maxScore == undefined || maxScore === 0) {
      maxScore = '∞';
    }
    var itemsNode = $firebaseArray(itemsRef);
    itemsNode.$loaded(function() {
      itemsNode.$add({
        'name' : name,
        'description' : description,
        'requirements' : requirements,
        'score' : score,
        'maxScore' : maxScore,
        'useForLevel' : useForLevel
      }).then(function(ref) {
        var id = ref.key;

        var idForItemRef = firebase.database().ref('items/' + id + '/id');
        idForItemRef.set(id);

        var classroomRef = firebase.database().ref('classrooms/' + $scope.classroom.id  + '/items/' + id);
        classroomRef.set(true);

        $scope.closeModalNewItem();
        $scope.getItems();
      });  
    });
  }

  $scope.deleteItem = function(item) {
    var itemRef = firebase.database().ref('items/' + item.id);
    itemRef.remove();

    var classItemRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/items/' + item.id);
    classItemRef.remove();

    for (var student in $scope.students) {
      var studentItemsToDeleteRef = firebase.database().ref('students/' + $scope.students[student].id + '/items/' + item.id);
      studentItemsToDeleteRef.remove();
    }

    for(var mission in $scope.missions) {
      var missionItemToDeleteRef = firebase.database().ref('missions/' + $scope.missions[mission].id + '/items/' + item.id);
      missionItemToDeleteRef.remove();
    }
    
    for (var achievement in item.achievements) {
      var itemAchievementsToDeleteRef = firebase.database().ref('achievements/' + achievement);
      itemAchievementsToDeleteRef.remove();
    }

    $scope.getItems();
  }

  $scope.setItem = function(item) {
    $scope.item = item;
    $scope.getAchievements();
    $scope.itemsForm();
  }

  $scope.editItem = function(name, description, requirements, score, maxScore, useForLevel) {
    if(name != undefined && description != undefined && requirements != undefined && score != undefined && maxScore != undefined){
      var itemRef = firebase.database().ref('items/' + $scope.item.id);
      if(useForLevel != $scope.item.useForLevel && useForLevel != undefined) {
        var itemUse = useForLevel
      } else {
        var itemUse = $scope.item.useForLevel
      }
      var itemEdit = {
        'id' : $scope.item.id,
        'name' : name,
        'description' : description,
        'requirements' : requirements,
        'score' : score,
        'maxScore' : maxScore,
        'useForLevel' : itemUse,
      };
      itemRef.set(itemEdit);
    } else {
      if(name != undefined) {
        var itemNameRef = firebase.database().ref('items/' + $scope.item.id + '/name');
        itemNameRef.set(name);
      }

      if(description != undefined) {
        var itemDescriptionRef = firebase.database().ref('items/' + $scope.item.id + '/description');
        itemDescriptionRef.set(description);
      }

      if(requirements != undefined) {
        var itemRequirementsRef = firebase.database().ref('items/' + $scope.item.id + '/requirements');
        itemRequirementsRef.set(requirements);
      }

      if(score != undefined) {
        var itemScoreRef = firebase.database().ref('items/' + $scope.item.id + '/score');
        itemScoreRef.set(score);
      }

      if(maxScore != undefined) {
        var itemMaxScoreRef = firebase.database().ref('items/' + $scope.item.id + '/maxScore');
        itemMaxScoreRef.set(maxScore);
      }

      if(useForLevel != $scope.item.useForLevel && useForLevel != undefined) {
        var itemUseLevelRef = firebase.database().ref('items/' + $scope.item.id + '/useForLevel');
        itemUseLevelRef.set(useForLevel);
      }
    }
    $scope.rulesForm();
  }

  $scope.evaluateStudents = function(item) {
    /*
    **THINGS TO DO
    **Hay que comprobar si con la puntuacion que se le va a asignar al alumno y los logros que quiza desbloquee, completará una mision.
    **(Para la claridad del codigo, todas estas comprobaciones quiza se deberian hacer en diferentes metodos. Con su consiguiente codigo de introduccion en la base de datos en caso de cumplirse las condiciones),
    **/
    for(var pos in $scope.studentsToEvaluate) {
      if($scope.studentsToEvaluate[pos].items != undefined) {
        var studentItems = $scope.studentsToEvaluate[pos].items;
        var studentItemRef = firebase.database().ref('students/' + $scope.studentsToEvaluate[pos].id + '/items/' + item.id);
        if (!(item.id in studentItems)) {
          studentItemRef.set({
            'id' : item.id,
            'points' : item.score,
          });
          $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], item.score);
          $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);

        } else {
          var studentPoints = $scope.studentsToEvaluate[pos].items[item.id].points;
          if((Number(studentPoints) + Number(item.score)) > Number(item.maxScore)) {
            studentItemRef.set({
              'id' : item.id,
              'points' : item.maxScore,
            });
            $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], item.maxScore);
            $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);
            alert('EL ALUMNO: ' + $scope.studentsToEvaluate[pos].name + ' ' + $scope.studentsToEvaluate[pos].surname + ' HA RECIBIDO MAS PUNTUACION DE LA MAXIMA ESTABLECIDA EN EL ITEM: ' + item.name + ', SE HA ESTABLECIDO LA PUNTUACION MAXIMA');
          } else {
            studentItemRef.set({
              'id' : item.id,
              'points' : Number(studentPoints) + Number(item.score),
            });
            $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], (Number(studentPoints) + Number(item.score)));
            $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);
            if ((Number(studentPoints) + Number(item.score)) < 0) {
              studentItemRef.set({
                'id' : item.id,
                'points' : 0,
              });
              $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], 0);
              alert('EL ALUMNO: ' + $scope.studentsToEvaluate[pos].name + ' ' + $scope.studentsToEvaluate[pos].surname + ' HA PERDIDO MAS PUNTUACION DE LA MAXIMA ESTABLECIDA EN EL ITEM: ' + item.name + ', SE HA ESTABLECIDO LA PUNTUACION A 0');
            }
          }
        }   
      } else {
        var studentItemRef = firebase.database().ref('students/' + $scope.studentsToEvaluate[pos].id + '/items/' + item.id);
        studentItemRef.set({
          'id' : item.id,
          'points' : item.score,
        });
        $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], item.score);
        $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);
      }
      if (item.useForLevel) {
        var pointsAdded = Number($scope.studentsToEvaluate[pos].classrooms[$scope.classroom.id].totalPoints) + Number(item.score);
        var studentClassroomTotalPointsRef = firebase.database().ref('students/' + $scope.studentsToEvaluate[pos].id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
        if(pointsAdded < 0){
          studentClassroomTotalPointsRef.set(0);
        } else {
          studentClassroomTotalPointsRef.set(pointsAdded);  
        }
      }
          
    }
       
  }

  $scope.evaluateTeams = function(item) {
    /* THINGS TO DO
    **Hay que comprobar si con la puntuacion que se le va a asignar al alumno y los logros que quiza desbloquee, completará una mision.
    **(Para la claridad del codigo, todas estas comprobaciones quiza se deberian hacer en diferentes metodos. Con su consiguiente codigo de introduccion en la base de datos en caso de cumplirse las condiciones),
    **/
    for(var pos in $scope.teamsToEvaluate) {
      for(var element in $scope.teamsToEvaluate[pos].students) {
        for(var studentPos in $scope.students) {
          if($scope.students[studentPos].id == element) {
            if($scope.students[studentPos].items != undefined) {
              var studentItems = $scope.students[studentPos].items;
              var studentItemRef = firebase.database().ref('students/' + $scope.students[studentPos].id + '/items/' + item.id);
              if(!(item.id in studentItems)) {
                studentItemRef.set({
                  'id' : item.id,
                  'points' : item.score,
                });
                $scope.checkAchievements(item, $scope.students[studentPos], item.score);
                $scope.checkMissions(item, $scope.students[studentPos], item.score);
              } else {
                var studentPoints = $scope.students[studentPos].items[item.id].points;
                if((Number(studentPoints) - Number(item.score)) > Number(item.maxScore)) {
                  studentItemRef.set({
                    'id' : item.id,
                    'points' : item.maxScore,
                  });
                  $scope.checkAchievements(item, $scope.students[studentPos], item.maxScore);
                  $scope.checkMissions(item, $scope.students[studentPos], item.score);
                  alert('EL ALUMNO: ' + $scope.students[studentPos].name + ' ' + $scope.students[studentPos].surname + ' HA RECIBIDO MAS PUNTUACION DE LA MAXIMA ESTABLECIDA EN EL ITEM: ' + item.name + ', SE HA ESTABLECIDO LA PUNTUACION MAXIMA');
                } else {
                  studentItemRef.set({
                    'id' : item.id,
                    'points' : Number(studentPoints) + Number(item.score),
                  });
                  $scope.checkAchievements(item, $scope.students[studentPos], (Number(studentPoints) + Number(item.score)));
                  $scope.checkMissions(item, $scope.students[studentPos], item.score);
                  if((Number(studentPoints) + Number(item.score)) < 0) {
                    studentItemRef.set({
                      'id' : item.id,
                      'points' : 0,
                    });
                    $scope.checkAchievements(item, $scope.students[studentPos], 0);
                    alert('EL ALUMNO: ' + $scope.students[studentPos].name + ' ' + $scope.students[studentPos].surname + ', HA PERDIDO MAS PUNTUACION DE LA MAXIMA ESTABLECIDA EN EL ITEM: ' + item.name + ', SE HA ESTABLECIDO LA PUNTUACION A 0');
                  }
                }
              }
            } else {
              var studentItemRef = firebase.database().ref('students/' + $scope.students[studentPos].id + '/items/' + item.id);
              studentItemRef.set({
                'id' : item.id,
                'points' : item.score,
              });
              $scope.checkAchievements(item, $scope.students[studentPos], item.score);
              $scope.checkMissions(item, $scope.students[studentPos], item.score);
            }
            if(item.useForLevel) {
              var pointsAdded = Number($scope.students[studentPos].classrooms[$scope.classroom.id].totalPoints) + Number(item.score);
              var studentClassroomTotalPointsRef = firebase.database().ref('students/' + $scope.students[studentPos].id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
              if(pointsAdded < 0) {
                studentClassroomTotalPointsRef.set(0);
              } else {
                studentClassroomTotalPointsRef.set(pointsAdded);
              }
            }
            
          }
        }
      }
    }
  }

  $scope.selectItems = function() {
    $scope.closeSelectItemsModal();
    if ($scope.actionSheetItemsType === 'delete') {
      for (var element in $scope.itemsForSelection) {
        if ($scope.itemsForSelection[element].selected === true) {
          $scope.deleteItem($scope.itemsForSelection[element]);
        }
      }
    } else if ($scope.actionSheetItemsType === 'duplicate') {
      for (var element in $scope.itemsForSelection) {
        if ($scope.itemsForSelection[element].selected === true) {
          $scope.duplicateItem($scope.itemsForSelection[element]); //THINGS TO DO
        }
      }
    } else if ($scope.actionSheetItemsType === 'evaluateStudents') {
      for(var element in $scope.itemsForSelection) {
        if($scope.itemsForSelection[element].selected === true) {
          $scope.evaluateStudents($scope.itemsForSelection[element]);    
        }
      }
      $scope.getStudents();
    } else if ($scope.actionSheetItemsType === 'evaluateTeams') {
      for(var element in $scope.itemsForSelection) {
        if($scope.itemsForSelection[element].selected === true) {
          $scope.evaluateTeams($scope.itemsForSelection[element]);
        }
      }
      $scope.getStudents();
      $scope.getTeams();
    } else if ($scope.actionSheetItemsType === 'newMissionCreation') {
      $scope.actionsheetClassStudentsType = 'newMissionCreation';
      $scope.newMission.items = $scope.itemsForSelection;
      $scope.showSelectStudentsModal();
    }
  }

  $scope.changeSelectedItem = function(item){
      if (item.selected === false) {
        item.selected = true;

        if($scope.actionSheetItemsType === 'evaluateStudents' || $scope.actionSheetItemsType === 'evaluateTeams' || $scope.actionSheetItemsType == 'newMissionCreation'){ 
        $scope.points = item.score;
        $scope.popupChooseScore = $ionicPopup.show({
          template: '<input id="inputScore" type="number" ng-model="points">',
          scope: $scope,
          buttons: [
            {
              text: 'CANCELAR',
              onTap: function() {
                item.selected = false;
              }
            },
            { text: 'USAR PUNTOS POR DEFECTO',
              type: 'button-positive',
            },
            {
              text: 'CAMBIAR PUNTUACION',
              type: 'button-positive',
              onTap: function(e) {
                var actualScore = document.getElementById("inputScore").value;
                if(actualScore > item.maxScore){
                  e.preventDefault();
                } else if (-(actualScore) > item.maxScore) {
                  e.preventDefault();
                } else {
                  item.score = actualScore;
                }
              }
            }
          ]
        });
      }
    } else {
      item.selected = false;
    }
  }

  $scope.removePoints = function(item) {
    var studentItemPointsToRemoveRef = firebase.database().ref('students/' + $scope.student.id + '/items/' + item.id + '/points');
    var studentClassPointsToRemoveRef = firebase.database().ref('students/' + $scope.student.id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
    if ((Number($scope.student.items[item.id].points) - Number(item.score)) < 0) {
      alert ('EL ALUMNO NO DISPONE DE SUFICIENTES PUNTOS PARA RESTAR, LA PUNTUACION SERA ESTABLECIDA A 0');
      studentItemPointsToRemoveRef.set(0);
      $scope.student.items[item.id].points = 0;
      $scope.checkAchievements(item, $scope.student, 0);
    } else {
      studentItemPointsToRemoveRef.set((Number($scope.student.items[item.id].points) - Number(item.score)));
      $scope.student.items[item.id].points = (Number($scope.student.items[item.id].points) - Number(item.score));
      $scope.checkAchievements(item, $scope.student, Number($scope.student.items[item.id].points));
    }

    item.points = $scope.student.items[item.id].points;

    if(item.useForLevel) {
      if(($scope.student.classrooms[$scope.classroom.id].totalPoints - item.score) < 0) {
        studentClassPointsToRemoveRef.set(0);
        $scope.student.classrooms[$scope.classroom.id].totalPoints = 0;
      } else {
        studentClassPointsToRemoveRef.set($scope.student.classrooms[$scope.classroom.id].totalPoints - item.score); 
        $scope.student.classrooms[$scope.classroom.id].totalPoints = Number($scope.student.classrooms[$scope.classroom.id].totalPoints) - Number(item.score);
      }
    }
  }

  $scope.addPoints = function(item) {
    var studentItemPointsToAddRef = firebase.database().ref('students/' + $scope.student.id + '/items/' + item.id + '/points');
    var studentClassPointsToAddRef = firebase.database().ref('students/' + $scope.student.id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
    if ((Number($scope.student.items[item.id].points) + Number(item.score)) > item.maxScore) {
      alert('EL ALUMNO HA RECIBIDO MAS PUNTUACION DE LA MAXIMA ESTABLECIDA EN EL ITEM, LA PUNTUACION SERA ESTABLECIDA AL MAXIMO');
      studentItemPointsToAddRef.set(item.maxScore);
      $scope.student.items[item.id].points = item.maxScore;
      $scope.checkAchievements(item, $scope.student, item.maxScore);
      for(var element in $scope.items) {
        if($scope.items[element].id == item.id) {
          $scope.checkMissions($scope.items[element], $scope.student, item.score);
        }
      }
    } else {
      studentItemPointsToAddRef.set((Number($scope.student.items[item.id].points) + Number(item.score)));
      $scope.student.items[item.id].points = (Number($scope.student.items[item.id].points) + Number(item.score));
      $scope.checkAchievements(item, $scope.student, Number($scope.student.items[item.id].points));
      for(var element in $scope.items) {
        if($scope.items[element].id == item.id) {
          $scope.checkMissions($scope.items[element], $scope.student, item.score);
        }
      }
      $scope.checkMissions(item, $scope.student, item.score);
    }

    item.points = $scope.student.items[item.id].points;

    if(item.useForLevel) {
      studentClassPointsToAddRef.set($scope.student.classrooms[$scope.classroom.id].totalPoints + item.score);
      $scope.student.classrooms[$scope.classroom.id].totalPoints = $scope.student.classrooms[$scope.classroom.id].totalPoints + item.score;
    }
  }

  
  

                                        /* FUNCTIONS IN ACHIEVEMENTS */

  $scope.getAchievements = function() {
    var itemAchievementsRef = firebase.database().ref('items/' + $scope.item.id + '/achievements');
    var achievementKeys = $firebaseArray(itemAchievementsRef);
    achievementKeys.$loaded(function() {
      $scope.achievements = [];
      for (i = 0 ; i < achievementKeys.length ; i++) {
        var achievementKey = achievementKeys.$keyAt(i);
        var loopAchievement = firebase.database().ref('achievements/' + achievementKey);
        loopAchievement.on('value', function(snapshot) {
          if(snapshot.val() != null) {
            var change = false;
            var index = -1;
            var achievement = snapshot.val();
            for(j = 0 ; j < $scope.achievements.length ; j++) {
              if(achievement.id == $scope.achievements[j].id) {
                change = true;
                index = j;
              }
            }
            if(!change) {
              $scope.achievements.push(achievement);
            } else {
              $scope.achievements[index] = achievement;
            }
            if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getAchievementsForSelection();
          }
        });
      }
    });
  }

  $scope.getAchievementsForSelection = function() {
    $scope.achievementsForSelection = angular.copy($scope.achievements);
    for (var element in $scope.achievementsForSelection) {
      $scope.achievementsForSelection[element].selected = false;
    }
  }

  $scope.createAchievement = function(name, description, requirements, maxLevel, badge) {
    if(requirements > $scope.item.maxScore) {
      alert('NO PUEDE PEDIR MÁS PUNTUACIÓN DE LA MÁXIMA ESTABLECIDA EN EL ITEM');
    } else {
      if(badge == undefined){
        badge = $scope.defaultAvatar
      }

      var achievementsNode = $firebaseArray(achievementsRef);
      achievementsNode.$loaded(function() {
        achievementsNode.$add({
          'name' : name,
          'description' : description,
          'requirements' : requirements,
          'maxLevel' : maxLevel,
          'badge' : badge,
        }).then(function(ref) {
          var id = ref.key;

          var idForAchievementRef = firebase.database().ref('achievements/' + id + '/id');
          idForAchievementRef.set(id);

          var itemsAchievementsRef = firebase.database().ref('items/' + $scope.item.id + '/achievements/' + id);
          itemsAchievementsRef.set(true);

          $scope.closeModalNewAchievement();
          $scope.getAchievements();
        });  
      });
    }
  }

  $scope.deleteAchievement = function(achievement) {
    var itemAchievementRef = firebase.database().ref('items/' + $scope.item.id + '/achievements/' + achievement.id);
    itemAchievementRef.remove();

    var achievementToDeleteRef = firebase.database().ref('achievements/' + achievement.id);
    achievementToDeleteRef.remove();

    for (var student in $scope.students) {
      if($scope.students[student].items != undefined && $scope.students[student].items[$scope.item.id] != undefined 
        && $scope.students[student].items[$scope.item.id].achievements != undefined) {
        var studentAchievementToDeleteRef = firebase.database().ref('students/' + $scope.students[student].id + '/items/' + $scope.item.id + '/achievements/' + achievement.id);
        studentAchievementToDeleteRef.remove();
      }
    }
    $scope.getAchievements();
  }

  $scope.setAchievement = function(achievement) {
    $scope.achievement = achievement;
    $scope.achievementsForm();
  }

  $scope.editAchievement = function(name, description, requirements, maxLevel, badge) {
    if(name != undefined && description != undefined && requirements != undefined && maxLevel != undefined && badge != undefined){
      var achievementRef = firebase.database().ref('achievements/' + $scope.achievement.id);
      var achievementEdit = {
        'id' : $scope.achievement.id,
        'name' : name,
        'description' : description,
        'requirements' : requirements,
        'maxLevel' : maxLevel,
        'badge' : badge,
      };
      achievementRef.set(achievementEdit);
    } else {
      if(name != undefined) {
        var achievementNameRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/name');
        achievementNameRef.set(name);
      }

      if(description != undefined) {
        var achievementDescriptionRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/description');
        achievementDescriptionRef.set(description);
      }

      if(requirements != undefined) {
        var achievementRequirementsRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/requirements');
        achievementRequirementsRef.set(requirements);
      }

      if(maxLevel != undefined) {
        var achievementMaxLevelRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/maxLevel');
        achievementMaxLevelRef.set(maxLevel);
      }

      if(badge != undefined) {
        var achievementBadgeRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/badge');
        achievementBadgeRef.set(badge);
      }
    }
    $scope.itemsForm();
  }

  $scope.selectAchievements = function() {
    $scope.closeSelectAchievementsModal();
    if ($scope.actionSheetAchievementsType === 'delete') {
      for (var element in $scope.achievementsForSelection) {
        if ($scope.achievementsForSelection[element].selected === true) {
          $scope.deleteAchievement($scope.achievementsForSelection[element]);
        }
      }
    $scope.achievementsForSelection = $scope.achievements;
    } else if ($scope.actionSheetAchievementsType === 'duplicate') {
      for (var element in $scope.achievementsForSelection) {
        if ($scope.achievementsForSelection[element].selected === true) {
          $scope.duplicateAchievement($scope.achievementsForSelection[element]); //THINGS TO DO
        }
      }
    }
  }
  
  $scope.changeSelectedAchievement = function(achievement){
    if (achievement.selected === false) {
      achievement.selected = true;
    } else {
      achievement.selected = false;
    }
  }

  $scope.checkAchievements = function(item, student, points) {
    if(item.achievements != undefined) {
      var itemAchievementsRef = firebase.database().ref('items/' + item.id + '/achievements');
      var itemAchievementsArray = $firebaseArray(itemAchievementsRef);
      var achievementsArray = $firebaseArray(achievementsRef);
      itemAchievementsArray.$loaded(function(){
        achievementsArray.$loaded(function(){
          for(i = 0 ; i < itemAchievementsArray.length ; i++) {
            var achievementKey = itemAchievementsArray.$keyAt(i);
            var loopAchievements = firebase.database().ref('achievements/' + achievementKey);
            loopAchievements.on('value', function(snapshot){
              if(snapshot.val() != null) {
                var achievementToCheck = snapshot.val();
                if(points > achievementToCheck.requirements) {
                  var levelAchievement = points / achievementToCheck.requirements;
                  levelAchievement = Math.trunc(levelAchievement);
                  if(levelAchievement > achievementToCheck.maxLevel) {
                    levelAchievement = achievementToCheck.maxLevel;
                  }
                  var studentItemAchievementRef = firebase.database().ref('students/' + student.id + '/items/' + item.id + '/achievements/' + achievementToCheck.id);
                  studentItemAchievementRef.set({
                    'id' : achievementToCheck.id,
                    'level' : levelAchievement,
                  });
                } else {
                  var studentItemAchievementRef = firebase.database().ref('students/' + student.id + '/items/' + item.id + '/achievements/' + achievementToCheck.id);
                  studentItemAchievementRef.remove();
                }
              }
            });
          }
        });
      });
    }
  }




                                       /* FUNCTIONS IN TEAMS */

  $scope.getTeams = function() {
    var classroomTeamsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/teams');
    var teamKeys = $firebaseArray(classroomTeamsRef);
    teamKeys.$loaded(function() {
      $scope.teams = [];
      for (i = 0 ; i < teamKeys.length ; i++) {
        var teamKey = teamKeys.$keyAt(i);
        var loopTeam = firebase.database().ref('teams/' + teamKey);
        loopTeam.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var team = snapshot.val();
            for(j = 0 ; j < $scope.teams.length ; j++) {
              if($scope.teams[j].id == team.id) {
                change = true;
                index = j;
              }
            }
            if(!change) {
              $scope.teams.push(team);
            } else {
              $scope.teams[index] = team;
            }
            if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getTeamsForSelection();
          }
        });
      }
    });
  }

  $scope.getStudentsForTeamSelection = function() {
    $scope.studentsForTeamSelection = angular.copy($scope.students);
    if ($scope.editMembers) {
      for (var element in $scope.studentsForTeamSelection) {
        $scope.studentsForTeamSelection[element].inTeam = false;
      }
      if ($scope.team.students != undefined) {
        for (var student in $scope.studentsForTeamSelection) {
          if ($scope.team.students[$scope.studentsForTeamSelection[student].id] === true) {
            $scope.studentsForTeamSelection[student].inTeam = true;
          }
        }
      }
      $scope.editMembers = false;
    } else {
      for (var element in $scope.studentsForTeamSelection) {
        $scope.studentsForTeamSelection[element].selected = false;
      }
    }
  }

  $scope.getTeamsForSelection = function() {
    $scope.teamsForSelection = angular.copy($scope.teams);
    for (var element in $scope.teamsForSelection) {
      $scope.teamsForSelection[element].selected = false;
    }
  }

  $scope.createTeam = function(name, objective, picture) {
    if(picture == undefined){
      picture = $scope.defaultTeamAvatar;
    }

    var teamsNode = $firebaseArray(teamsRef);
    teamsNode.$loaded(function() {
      teamsNode.$add({
        'name' : name,
        'objective' : objective,
        'picture' : picture,
      }).then(function(ref) {
        var id = ref.key;

        var idForTeamRef = firebase.database().ref('teams/' + id + '/id');
        idForTeamRef.set(id);

        var classroomRef = firebase.database().ref('classrooms/' + $scope.classroom.id  + '/teams/' + id);
        classroomRef.set(true);

        for (var element in $scope.studentsForTeamSelection) {
          if ($scope.studentsForTeamSelection[element].selected === true) {

            var studentId = $scope.studentsForTeamSelection[element].id;

            var studentTeamsRef = firebase.database().ref('students/' + studentId + '/teams/' + id);
            studentTeamsRef.set(true);

            var teamStudentsRef = firebase.database().ref('teams/' + id + '/students/' + studentId);
            teamStudentsRef.set(true);
          }
        }
        $scope.closeModalNewTeamDialog();
        $scope.getStudentsForTeamSelection();
        $scope.getTeams();
      });  
    });
  }

  $scope.createRandomTeams = function(numEquipos) {
    if(numEquipos > $scope.students.length) {
      alert('NO PUEDES CREAR MAS EQUIPOS QUE ALUMNOS');
    } else {
      var objective = 'Random';
      var picture = $scope.defaultTeamAvatar;
      var numParticipants = $scope.students.length;
      var participantsPerTeam = Math.trunc(numParticipants / numEquipos);
      var lefttovers = numParticipants % numEquipos;
      randomNumberList = [];
      for (i = 0 ; i < numParticipants ; i++) {
        randomNumberList.push(i);
      }
      randomNumberList = randomNumberList.sort(function() { return Math.random() - 0.5 });
      var teamsList = [];
      var teamNamesList = [];
      for (i = 0 ; i < numEquipos ; i++) {
        var team = [];
        for (j = 0 ; j < participantsPerTeam ; j++) {
          team.push($scope.students[randomNumberList[0]]);
          randomNumberList.splice(0, 1);
        }
        teamNamesList.push('Random ' + (i+1));
        teamsList.push(team);
      }
      if (lefttovers > 0) {
        for ( i = 0 ; i < lefttovers ; i++) {
          var randomTeam = Math.trunc(Math.random()*numEquipos);
          teamsList[randomTeam].push($scope.students[randomNumberList[i]]);
        }
      }
      var teamsNode = $firebaseArray(teamsRef);
      teamsNode.$loaded(function() {
        var counter = 0;
        for (i = 0 ; i < numEquipos ; i++) {
          teamsNode.$add({
            'name' : teamNamesList[i],
            'objective' : objective,
            'picture' : picture,
          }).then(function(ref) {
            var id = ref.key;
            
            var idForTeamRef = firebase.database().ref('teams/' + id + '/id');
            idForTeamRef.set(id);

            var classroomRef = firebase.database().ref('classrooms/' + $scope.classroom.id  + '/teams/' + id);
            classroomRef.set(true);

            for (var element in teamsList[counter]) {

              var studentId = teamsList[counter][element].id;

              var studentTeamsRef = firebase.database().ref('students/' + studentId + '/teams/' + id);
              studentTeamsRef.set(true);

              var teamStudentsRef = firebase.database().ref('teams/' + id + '/students/' + studentId);
              teamStudentsRef.set(true);
            }
            counter++;
            $scope.getTeams();
          });
        }
      });
      $scope.closeModalQuantityRandomTeams();
    }
  }

  $scope.deleteTeam = function(team) {
    var teamToDeleteRef = firebase.database().ref('teams/' + team.id);
    teamToDeleteRef.remove();

    for (var student in $scope.students) {
      var studentTeamToDeleteRef = firebase.database().ref('students/' + $scope.students[student].id + '/teams/' + team.id);
      studentTeamToDeleteRef.remove();
    }

    var classroomTeamToDelete = firebase.database().ref('classrooms/' + $scope.classroom.id + '/teams/' + team.id);
    classroomTeamToDelete.remove();

    $scope.getTeams();
  }

  $scope.setTeam = function(team) {
    $scope.team = team;
    $scope.teamMembers = [];
    for (var student in $scope.students) {
      for (var teamMember in team.students) {
        if ($scope.students[student].id == teamMember) {
          $scope.teamMembers.push({
            'id' : $scope.students[student].id,
            'name' : $scope.students[student].name,
            'surname' : $scope.students[student].surname,
            'avatar' : $scope.students[student].avatar,
          });
        }
      }
    }
    $scope.showModalTeamDialog();
  }

  $scope.editTeam = function(name, objective, picture) {
    if (name != undefined && objective != undefined && picture != undefined) {
      var team = {
        'id' : $scope.team.id,
        'name' : name,
        'objective' : objective,
        'picture' : picture,
        'students' : $scope.team.students,
      }
      var teamRef = firebase.database().ref('teams/' + $scope.team.id);
      teamRef.set(team);
    } else {
      if (name != undefined) {
        $scope.team.name = name;
        var teamNameRef = firebase.database().ref('teams/' + $scope.team.id + '/name');
        teamNameRef.set(name);
      }

      if (objective != undefined) {
        $scope.team.objective = objective;
        var teamObjectiveRef = firebase.database().ref('teams/' + $scope.team.id + '/objective');
        teamObjectiveRef.set(objective);
      }

      if (picture != undefined) {
        $scope.team.picture = picture;
        var teamPictureRef = firebase.database().ref('teams/' + $scope.team.id + '/picture');
        teamPictureRef.set(picture);
      }
    }
    $scope.closeModalTeamDialog();
    alert('DATOS CAMBIADOS');
  }

  $scope.editTeamMembers = function() {
    $scope.closeModalEditMembers();
    for (var element in $scope.studentsForTeamSelection) {
      var studentTeamRef = firebase.database().ref('students/' + $scope.studentsForTeamSelection[element].id + '/teams/' + $scope.team.id);
      var teamStudentRef = firebase.database().ref('teams/' + $scope.team.id + '/students/' + $scope.studentsForTeamSelection[element].id);
      if ($scope.studentsForTeamSelection[element].inTeam === false) {
        studentTeamRef.remove();
        teamStudentRef.remove();
      } else {
        studentTeamRef.set(true);
        teamStudentRef.set(true);
      }
    }
    $scope.closeModalTeamDialog();
  }

  $scope.selectTeams = function() {
    $scope.closeSelectTeamsModal();
    if ($scope.actionSheetClassTeamsType === 'delete') {
      for (var element in $scope.teamsForSelection) {
        if ($scope.teamsForSelection[element].selected === true) {
          $scope.deleteTeam($scope.teamsForSelection[element]);
        }
      }
    $scope.teamsForSelection = $scope.teams;
    } else if ($scope.actionSheetClassTeamsType === 'duplicate') {
      for (var element in $scope.teamsForSelection) {
        if ($scope.teamsForSelection[element].selected === true) {
          $scope.duplicateTeam($scope.teamsForSelection[element]); //THINGS TO DO
        }
      }
    } else if ($scope.actionSheetClassTeamsType === 'evaluate') {
      $scope.teamsToEvaluate = [];
      for(var element in $scope.teamsForSelection) {
        if($scope.teamsForSelection[element].selected === true) {
          $scope.teamsToEvaluate.push($scope.teamsForSelection[element]);
        }
      }
      $scope.actionSheetItemsType = 'evaluateTeams';
      $scope.showSelectItemsModal();
    }
  }

  $scope.changeSelectedStudentForTeam = function(student) {
    if (student.selected === false) {
      student.selected = true;
    } else {
      student.selected = false;
    }
  }


  $scope.inTeam = function(student) {
    if (student.inTeam === true) {
      student.inTeam = false;
    } else {
      student.inTeam = true;
    }
  }

  $scope.changeSelectedTeam = function(team) {
    if (team.selected === false) {
      team.selected = true;
    } else {
      team.selected = false;
    }
  }

  


                                        /* FUNCTIONS IN REWARDS */

  $scope.getRewards = function() {
    var classroomRewardsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/rewards');
    var rewardKeys = $firebaseArray(classroomRewardsRef);
    rewardKeys.$loaded(function() {
      $scope.rewards = [];
      for (i = 0 ; i < rewardKeys.length ; i++) {
        var rewardKey = rewardKeys.$keyAt(i);
        var loopReward = firebase.database().ref('rewards/' + rewardKey);
        loopReward.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var reward = snapshot.val();
            for(j = 0 ; j < $scope.rewards.length ; j++){
              if(reward.id == $scope.rewards[j].id){
                change = true;
                index = j;
              }
            }
            if(!change){
              $scope.rewards.push(reward);  
            } else {
              $scope.rewards[index] = reward;
            }
            $scope.getRewardsForSelection();
          }
        });
      }
    });
  }

  $scope.getRewardsForSelection = function() {
    $scope.rewardsForSelection = angular.copy($scope.rewards);
    for (var element in $scope.rewardsForSelection) {
      $scope.rewardsForSelection[element].selected = false;
    }
  }

  $scope.createReward = function(name, description, permission, price) {
    var rewardsNode = $firebaseArray(rewardsRef);
    rewardsNode.$loaded(function() {
      rewardsNode.$add({
        'name' : name,
        'description' : description,
        'permission' : permission,
        'price' : price,
      }).then(function(ref) {
        var id = ref.key;

        var idForRewardRef = firebase.database().ref('rewards/' + id + '/id');
        idForRewardRef.set(id);

        var classroomRewardsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/rewards/' + id);
        classroomRewardsRef.set(id);

        $scope.closeModalNewReward();
        $scope.getRewards();
      });  
    });
  }

  $scope.deleteReward = function(reward) {
    var classroomRewardRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/rewards/' + reward.id);
    classroomRewardRef.remove();

    var rewardToDeleteRef = firebase.database().ref('rewards/' + reward.id);
    rewardToDeleteRef.remove();

    for (var student in $scope.students) {
      var studentRewardToDeleteRef = firebase.database().ref('students/' + $scope.students[student].id + '/rewards/' + reward.id);
      studentRewardToDeleteRef.remove();
    }

    $scope.getRewards();
  }

  $scope.setReward = function(reward) {
    $scope.reward = reward;
    $scope.showModalEditReward();
  }

  $scope.editReward = function(name, description, permission, price) {
    if (name != undefined && description != undefined && permission != undefined && price != undefined) {
      var reward = {
        'id' : $scope.reward.id,
        'name' : name,
        'description' : description,
        'permission' : permission,
        'price' : price,
      }
      var rewardRef = firebase.database().ref('rewards/' + $scope.reward.id);
      rewardRef.set(reward);
    } else {
      if (name != undefined) {
        $scope.reward.name = name;
        var rewardNameRef = firebase.database().ref('rewards/' + $scope.reward.id + '/name');
        rewardNameRef.set(name);
      }

      if (description != undefined) {
        $scope.reward.description = description;
        var rewardDescriptionRef = firebase.database().ref('rewards/' + $scope.reward.id + '/description');
        rewardDescriptionRef.set(description);
      }

      if (permission != undefined) {
        $scope.reward.permission = permission;
        var rewardPermissionRef = firebase.database().ref('rewards/' + $scope.reward.id + '/permission');
        rewardPermissionRef.set(permission);
      }

      if (price != undefined) {
        $scope.reward.price = price;
        var rewardPriceRef = firebase.database().ref('rewards/' + $scope.reward.id + '/price');
        rewardPriceRef.set(price);
      }
    }
    $scope.closeModalEditReward();
    alert('DATOS CAMBIADOS');
  }

  $scope.selectRewards = function() {
    $scope.closeSelectRewardsModal();
    if ($scope.actionSheetRewardsType === 'delete') {
      for (var element in $scope.rewardsForSelection) {
        if ($scope.rewardsForSelection[element].selected === true) {
          $scope.deleteReward($scope.rewardsForSelection[element]);
        }
      }
    $scope.rewardsForSelection = $scope.rewards;
    } else if ($scope.actionSheetRewardsType === 'duplicate') {
      for (var element in $scope.rewardsForSelection) {
        if ($scope.rewardsForSelection[element].selected === true) {
          $scope.duplicateReward($scope.rewardsForSelection[element]); //THINGS TO DO
        }
      }
    } else if ($scope.actionSheetRewardsType === 'newMissionCreation') {
      $scope.newMission.rewards = $scope.rewardsForSelection;
      $scope.createMission($scope.newMission);
    }
  }

  $scope.changeSelectedReward = function(reward){
    if (reward.selected === false) {
      reward.selected = true;
    } else {
      reward.selected = false;
    }
  }

  


                                        /* FUNCTIONS IN MISSIONS */

  $scope.getMissions = function() {
    var classroomMissionsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/missions');
    var missionKeys = $firebaseArray(classroomMissionsRef);
    missionKeys.$loaded(function() {
      $scope.missions = [];
      for(i = 0 ; i < missionKeys.length ; i++) {
        var missionKey = missionKeys.$keyAt(i);
        var loopMission = firebase.database().ref('missions/' + missionKey);
        loopMission.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var mission = snapshot.val();
            for(j = 0 ; j < $scope.missions.length ; j++){
              if(mission.id == $scope.missions[j].id){
                change = true;
                index = j;
              }
            }
            if(!change){
              $scope.missions.push(mission);  
            } else {
              $scope.missions[index] = mission;
            }
            $scope.getMissionsForSelection();
          }
        });
      }
    });
  }

  $scope.getItemsForMissionSelection = function() {
    $scope.itemsForMissionSelection = angular.copy($scope.items);
    if($scope.editingMissionItems) {
      for(var element in $scope.itemsForMissionSelection) {
        $scope.itemsForMissionSelection[element].inMission = false;
      }
      if($scope.mission.items != undefined) {
        for(var item in $scope.itemsForMissionSelection) {
          if($scope.mission.items[$scope.itemsForMissionSelection[item].id] != undefined) {
            $scope.itemsForMissionSelection[item].inMission = true;
            $scope.itemsForMissionSelection[item].score = $scope.mission.items[$scope.itemsForMissionSelection[item].id].neededPoints;
          }
        }
      }
    } else {
      for(var element in $scope.itemsForMissionSelection) {
        $scope.itemsForMissionSelection[element].selected = false;
      }
    }
  }

  $scope.getRewardsForMissionSelection = function() {
    $scope.rewardsForMissionSelection = angular.copy($scope.rewards);
    if($scope.editingMissionRewards) {
      for(var element in $scope.rewardsForMissionSelection) {
        $scope.rewardsForMissionSelection[element].inMission = false;
      }
      if($scope.mission.rewards != undefined) {
        for(var reward in $scope.rewardsForMissionSelection) {
          if($scope.mission.rewards[$scope.rewardsForMissionSelection[reward].id] === true) {
            $scope.rewardsForMissionSelection[reward].inMission = true;
          }
        }
      }
    } else {
      for(var element in $scope.rewardsForMissionSelection) {
        $scope.rewardsForMissionSelection[element].selected = false;
      }
    }
  }

  $scope.getMembersForMissionSelection = function() {
    $scope.studentsForMissionSelection = angular.copy($scope.students);
    if($scope.editingMissionMembers) {
      for(var element in $scope.studentsForMissionSelection) {
        $scope.studentsForMissionSelection[element].inMission = false;
      }
      if($scope.mission.students != undefined) {
        for(var student in $scope.studentsForMissionSelection) {
          if($scope.mission.students[$scope.studentsForMissionSelection[student].id] === true) {
            $scope.studentsForMissionSelection[student].inMission = true;
          }
        }
      }
    } else {
      for(var element in $scope.studentsForMissionSelection) {
        $scope.studentsForMissionSelection[element].selected = false;
      }
    }
  }

  $scope.getMissionsForSelection = function() {
    $scope.missionsForSelection = angular.copy($scope.missions);
    for (var element in $scope.missionsForSelection) {
      $scope.missionsForSelection[element].selected = false;
    }
  }

  $scope.createMission = function(mission) {
    var missionsNode = $firebaseArray(missionsRef);
    missionsNode.$loaded(function() {
      missionsNode.$add({
        'name' : mission.name,
        'additionalPoints' : mission.additionalPoints,
        'finished' : false,
      }).then(function(ref) {
        var id = ref.key;

        var missionIdRef = firebase.database().ref('missions/' + id + '/id');
        missionIdRef.set(id);

        for(var pos in mission.items) {
          if(mission.items[pos].selected) {
            var missionItemRef = firebase.database().ref('missions/' + id + '/items/' + mission.items[pos].id);
            missionItemRef.set({
              'id' : mission.items[pos].id,
              'neededPoints' : mission.items[pos].score
            });

            var itemMissionRef = firebase.database().ref('items/' + mission.items[pos].id + '/missions/' + id);
            itemMissionRef.set(true);
          }
        }

        for(var pos in mission.students) {
          if(mission.students[pos].selected) {
            var missionStudentRef = firebase.database().ref('missions/' + id + '/students/' + mission.students[pos].id);
            missionStudentRef.set(false);

            var studentMissionRef = firebase.database().ref('students/' + mission.students[pos].id + '/missions/' + id);
            studentMissionRef.set(id);

            for(var element in mission.items) {
              if(mission.items[element].selected) {
                var studentItemsMissionRef = firebase.database().ref('students/' + mission.students[pos].id + '/missions/' + id + '/items/' + mission.items[element].id);
                studentItemsMissionRef.set({
                  'id' : mission.items[element].id,
                  'points' : 0,
                });
              }
            }
          }
        }

        for(var pos in mission.rewards) {
          if(mission.rewards[pos].selected) {
            var missionRewardRef = firebase.database().ref('missions/' + id + '/rewards/' + mission.rewards[pos].id);
            missionRewardRef.set(true);
          }
        }

        var classroomMissionsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/missions/' + id);
        classroomMissionsRef.set(true);

        $scope.getMissions();
      });
    });
  }

  $scope.deleteMission = function(mission) {
    var classroomMissionRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/missions/' + mission.id);
    classroomMissionRef.remove();

    var missionToDeleteRef = firebase.database().ref('missions/' + mission.id);
    missionToDeleteRef.remove();

    for(var item in mission.items) {
      var itemMissionRef = firebase.database().ref('items/' + item + '/missions/' + mission.id);
      itemMissionRef.remove();
    }

    for (var student in mission.students) {
      var studentMissionToDeleteRef = firebase.database().ref('students/' + student + '/missions/' + mission.id);
      studentMissionToDeleteRef.remove();
    }

    $scope.getMissions();
  }

  $scope.setMission = function(mission) {
    $scope.mission = mission;
    $scope.missionItems = [];
    $scope.missionRewards = [];
    $scope.missionStudents = [];
    for(var item in $scope.items) {
      for(var itemMission in mission.items){
        if($scope.items[item].id === mission.items[itemMission].id) {
          $scope.items[item].neededPoints = mission.items[itemMission].neededPoints;
          $scope.missionItems.push($scope.items[item]);
        }
      }
    }

    for(var reward in $scope.rewards) {
      for(var rewardMission in mission.rewards) {
        if($scope.rewards[reward].id === rewardMission) {
          $scope.missionRewards.push($scope.rewards[reward]);
        }
      }
    }

    for(var student in $scope.students){
      for(var studentMission in mission.students) {
        if($scope.students[student].id === studentMission) {
          $scope.missionStudents.push($scope.students[student]);
        }
      }
    }
    $scope.showModalEditMission();
  }

  $scope.showFinishedMissions = function(value) {
    $scope.finishedMissionsToShow = value;
    $scope.closePopoverMissions();
  }

  $scope.editMission = function(name, additionalPoints) {
    var missionNameRef = firebase.database().ref('missions/' + $scope.mission.id + '/name');
    var missionAdditionalPointsRef = firebase.database().ref('missions/' + $scope.mission.id + '/additionalPoints');
    if(name != undefined && additionalPoints != undefined) {
      missionNameRef.set(name);
      missionAdditionalPointsRef.set(additionalPoints);
    } else {
      if(name != undefined) {
        missionNameRef.set(name);
      }
      if(additionalPoints != undefined) {
        missionAdditionalPointsRef.set(additionalPoints);
      }
    }
    $scope.closeModalEditMission();
    alert('DATOS CAMBIADOS');
  }

  $scope.editMissionItems = function() {
    $scope.closeModalEditMissionItems();
    for(var element in $scope.itemsForMissionSelection) {
      var missionItemRef = firebase.database().ref('missions/' + $scope.mission.id + '/items/' + $scope.itemsForMissionSelection[element].id);
      var itemMissionRef = firebase.database().ref('items/' + $scope.itemsForMissionSelection[element].id + '/missions/' + $scope.mission.id);
      if($scope.itemsForMissionSelection[element].inMission === false) {
        missionItemRef.remove();
        itemMissionRef.remove();
        for(var studentId in $scope.mission.students) {
          var studentMissionItemToDelRef  = firebase.database().ref('students/' + studentId + '/missions/' + $scope.mission.id + '/items/' + $scope.itemsForMissionSelection[element].id);
          studentMissionItemToDelRef.remove();
        }
      } else {
        missionItemRef.set({
          'id' : $scope.itemsForMissionSelection[element].id,
          'neededPoints' : $scope.itemsForMissionSelection[element].score
        });
        itemMissionRef.set(true);
        for(var studentId in $scope.mission.students) {
          var studentMissionItemRef = firebase.database().ref('students/' + studentId + '/missions/' + $scope.mission.id + '/items/' + $scope.itemsForMissionSelection[element].id);
          studentMissionItemRef.set({
            'id' : $scope.itemsForMissionSelection[element].id,
            'points' : 0,
          });
        }
      }
    }
    $scope.closeModalEditMission();
  }

  $scope.editMissionRewards = function() {
    $scope.closeModalEditMissionRewards();
    for(var element in $scope.rewardsForMissionSelection) {
      var missionRewardRef = firebase.database().ref('missions/' + $scope.mission.id + '/rewards/' + $scope.rewardsForMissionSelection[element].id);
      if($scope.rewardsForMissionSelection[element].inMission === false) {
        missionRewardRef.remove();
      } else {
        missionRewardRef.set(true);
      }
    }
    $scope.closeModalEditMission();
  }

  $scope.editMissionMembers = function() {
    $scope.closeModalEditMissionMembers();
    for(var element in $scope.studentsForMissionSelection) {
      var missionStudentRef = firebase.database().ref('missions/' + $scope.mission.id + '/students/' + $scope.studentsForMissionSelection[element].id);
      var studentMissionRef = firebase.database().ref('students/' + $scope.studentsForMissionSelection[element].id + '/missions/' + $scope.mission.id);
      var studentMissionIdRef = firebase.database().ref('students/' + $scope.studentsForMissionSelection[element].id + '/missions/' + $scope.mission.id + '/id');
      if($scope.studentsForMissionSelection[element].inMission === false) {
        missionStudentRef.remove();
        studentMissionRef.remove();
      } else {
        missionStudentRef.set(false);
        studentMissionIdRef.set($scope.mission.id);
        for(var itemId in $scope.mission.items) {
          var studentItemsMissionRef = firebase.database().ref('students/' + $scope.studentsForMissionSelection[element].id + '/missions/' + $scope.mission.id + '/items/' + itemId);
          if($scope.studentsForMissionSelection[element].missions == undefined || $scope.studentsForMissionSelection[element].missions[$scope.mission.id].items == undefined) {
            studentItemsMissionRef.set({
              'id' : itemId,
              'points' : 0,
            });
          } else if ($scope.studentsForMissionSelection[element].missions[$scope.mission.id].items[itemId].points > 0 &&
            $scope.studentsForMissionSelection[element].missions[$scope.mission.id].items[itemId] != undefined){
            studentItemsMissionRef.set({
              'id' : itemId,
              'points' : $scope.studentsForMissionSelection[element].missions[$scope.mission.id].items[itemId].points,
            });
          }
        }
      }
    }
    $scope.closeModalEditMission();
  }

  $scope.selectMissions = function() {
    $scope.closeSelectMissionsModal();
    if ($scope.actionSheetMissionsType === 'delete') {
      for (var element in $scope.missionsForSelection) {
        if ($scope.missionsForSelection[element].selected === true) {
          $scope.deleteMission($scope.missionsForSelection[element]);
        }
      }
    $scope.missionsForSelection = $scope.rewards;
    } else if ($scope.actionSheetMissionsType === 'duplicate') {
      for (var element in $scope.missionsForSelection) {
        if ($scope.missionsForSelection[element].selected === true) {
          $scope.duplicateMission($scope.missionsForSelection[element]); //THINGS TO DO
        }
      }
    }
  }

  $scope.inMission = function(object) {
    if (object.inMission === true) {
      object.inMission = false;
    } else {
      object.inMission = true;
      if(object.price == undefined && object.classrooms == undefined) {
        $scope.points = object.score;
        $scope.popupChooseScore = $ionicPopup.show({
          template: '<input id="inputScore" type="number" ng-model="points">',
          scope: $scope,
          buttons: [
            {
              text: 'CANCELAR',
              onTap: function() {
                object.inMission = false;
              }
            },
            { text: 'USAR PUNTOS POR DEFECTO',
              type: 'button-positive',
            },
            {
              text: 'CAMBIAR PUNTUACION',
              type: 'button-positive',
              onTap: function(e) {
                var actualScore = document.getElementById("inputScore").value;
                if(actualScore > object.maxScore){
                  e.preventDefault();
                } else if (-(actualScore) > object.maxScore) {
                  e.preventDefault();
                } else {
                  object.score = actualScore;
                }
              }
            }
          ]
        });
      }
    }
  }

  $scope.changeSelectedMission = function(mission) {
    if (mission.selected === false) {
      mission.selected = true;
    } else {
      mission.selected = false;
    }
  }

  $scope.setNewMissionNamePopup = function() {
    $scope.newMission = {};
    var missionNamePopup = $ionicPopup.show({
      title: 'INTRODUZCA UN NOMBRE DE MISION',
      template: '<input type="text" ng-model="newMission.name">',
      scope : $scope,

      buttons: [
        {text: 'CANCELAR'},
        {text: 'SIGUIENTE',
         onTap: function(e) {
           var missionAdditionalPointsPopup = $ionicPopup.show({
              title: 'INTRODUZCA PUNTOS ADICIONALES POR COMPLETAR MISION (OPCIONAL)',
              template: '<input type="number" ng-model="newMission.additionalPoints">',
              scope : $scope,

              buttons: [
                {text: 'CANCELAR'},
                {text: 'SIGUIENTE',
                  onTap : function(e) {
                    $scope.actionSheetItemsType = 'newMissionCreation';
                    $scope.showSelectItemsModal();
                  }},
              ]
            });
         }},
      ]
    });
  };

  $scope.checkMissions = function(item, student, points) {
    if(item.missions != undefined) {
      for(var missionId in item.missions) {
        for(var element in $scope.missions) {
          if($scope.missions[element].id == missionId) {
            if($scope.missions[element].finished === false) {
              if(missionId in student.missions) {
                var numItemsToUnlock = Object.keys($scope.missions[element].items).length;
                var unlockedMissionItems = 0;
                for(var itemId in $scope.missions[element].items) {
                  var studentMissionItemPointsRef = firebase.database().ref('students/' + student.id + '/missions/' + missionId + '/items/' + itemId + '/points');
                  if(student.missions[missionId].items[itemId] != undefined) {
                    if(item.id == itemId) {
                      if((Number(student.missions[missionId].items[itemId].points) + Number(points)) < $scope.missions[element].items[itemId].neededPoints) {
                        //SUMAR PUNTOS AL ESTUDIANTE
                        studentMissionItemPointsRef.set((Number(student.missions[missionId].items[itemId].points) + Number(points)));
                      } else {
                        unlockedMissionItems += 1;
                        var studentMissionItemRef = firebase.database().ref('students/' + student.id + '/missions/' + missionId + '/items/' + itemId);
                        studentMissionItemRef.remove();
                        student.missions[missionId].items[itemId] = undefined;
                      }
                    }
                  } else {
                    unlockedMissionItems += 1;
                  }
                }

                if(numItemsToUnlock == unlockedMissionItems) {
                  var studentMissionToDeleteRef = firebase.database().ref('students/' + student.id + '/missions/' + missionId);
                  studentMissionToDeleteRef.remove();

                  var missionStudentRef = firebase.database().ref('missions/' + missionId + '/students/' + student.id);
                  missionStudentRef.set(true);
                  $scope.missions[element].students[student.id] = true;

                  var studentClassPointsRef = firebase.database().ref('students/' + student.id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
                  studentClassPointsRef.set(Number(student.classrooms[$scope.classroom.id].totalPoints) + $scope.missions[element].additionalPoints);

                  for(var rewardId in $scope.missions[element].rewards) {
                    var rewardForStudentRef = firebase.database().ref('students/' + student.id + '/rewards/' + rewardId);
                    if(student.rewards != undefined && student.rewards[rewardId] != undefined) {
                      rewardForStudentRef.set({
                        'id' : rewardId,
                        'amount' : (Number(student.rewards[rewardId].amount) + 1),
                      });
                    } else {
                      rewardForStudentRef.set({
                        'id' : rewardId,
                        'amount' : 1,
                      });
                    }
                  }
                  var studentsToUnlock = Object.keys($scope.missions[element].students).length;
                  var unlockedStudents = 0;
                  for(var studentId in $scope.missions[element].students) {
                    if($scope.missions[element].students[studentId] == true) {
                      unlockedStudents += 1;
                    }
                  }
                  if(unlockedStudents == studentsToUnlock) {
                    var missionStateRef = firebase.database().ref('missions/' + missionId + '/finished');
                    missionStateRef.set(true);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

}])



//                                  []
//                                  []
//                                  []
//                                  []
//                        [][][][][][][][][][][]
//                                  []
//                                  []
//                                  []
//                                  []
//                                  []



.controller('studentHomeCtrl', ['$scope', '$stateParams', '$http', '$state', '$ionicModal', '$ionicActionSheet', '$ionicPopover', '$firebaseArray', 'sharedData',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state, $ionicModal, $ionicActionSheet, $ionicPopover, $firebaseArray, sharedData) {

  /*
    *************************************DECLARE FUNCTIONS FOR NG-SHOW********************************
  */

  $scope.allFalse = function() {
    $scope.studentHomeView = false;
    $scope.profileView = false;
    $scope.settingsView = false;
    $scope.classView = false;
    $scope.rulesItemsView = false;
    $scope.itemsView = false;
    $scope.teamsView = false;
    $scope.rewardShopView = false;
    $scope.missionsView = false;
    $scope.archivedClassroomsToShow = false;
  }

  $scope.studentHomeForm = function() {
    $scope.allFalse();
    $scope.studentHomeView = true;
  }

  $scope.profileForm = function() {
    $scope.allFalse();
    if($scope.student.name.length > 32){
      $scope.student.name = CryptoJS.AES.decrypt($scope.student.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
      $scope.student.surname = CryptoJS.AES.decrypt($scope.student.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
    }
    $scope.modelProfile = {};
    $scope.profileView = true;
  }

  $scope.settingsForm = function() {
    $scope.allFalse();
    $scope.settingsView = true;
  }

  $scope.rulesItemsForm = function(){
    $scope.allFalse();
    $scope.rulesItemsView = true;
  }

  $scope.itemsForm = function() {
    $scope.allFalse();
    $scope.itemsView = true;
  }

  $scope.teamsForm = function() {
    $scope.allFalse();
    $scope.teamsView = true;
  }

  $scope.rewardShopForm = function() {
    $scope.allFalse();
    $scope.rewardShopView = true;
  }

  $scope.missionsForm = function() {
    $scope.allFalse();
    $scope.missionsView = true;
  }

  $scope.studentHomeForm();

  /*
    *************************************EVERY ACTIONSHEET GOES HERE*******************************
  */

                                          /* REWARDS (STUDENT PART) ACTIONSHEET */

  $scope.showActionsheetRewards = function() {
    $ionicActionSheet.show({
      titleText: 'ACCIONES RECOMPENSAS',
      buttons: [
        { text: 'COMPRAR RECOMPENSA(S)' },
      ],
      cancelText: 'CANCELAR',
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //BUY REWARDS ACTION
          $scope.showSelectRewardsModal();
        }
        return true;
      }
    });
  };

  /*
    *************************************SAVE EVERY POPOVER INTO $SCOPE*******************************
  */

  $scope.templateLanguagesPopover = '<ion-popover-view>'+
    '<div ng-controller="changeLanguageCtrl">'+
      '<ion-list class="list-elements">'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'es\'); closePopoverLanguages()">{{ \'BUTTON_LANG_ES\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'en\'); closePopoverLanguages()">{{ \'BUTTON_LANG_EN\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'it\'); closePopoverLanguages()">{{ \'BUTTON_LANG_IT\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'tr\'); closePopoverLanguages()">{{ \'BUTTON_LANG_TR\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'de\'); closePopoverLanguages()">{{ \'BUTTON_LANG_DE\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'hu\'); closePopoverLanguages()">{{ \'BUTTON_LANG_HU\' | translate }}</ion-item>'+
        '<ion-item class="itemPopover" ng-click="changeLanguage(\'ru\'); closePopoverLanguages()">{{ \'BUTTON_LANG_RU\' | translate }}</ion-item>'+
      '</ion-list>'+
    '</div>'+
  '</ion-popover-view>';

  $scope.templateStudentHomePopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-hide="archivedClassroomsToShow" ng-click="showArchivedClassrooms(true)">VER ARCHIVADAS</ion-item>'+
      '<ion-item class="itemPopover" ng-show="archivedClassroomsToShow" ng-click="showArchivedClassrooms(false)">OCULTAR ARCHIVADAS</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverStudentHome()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateMissionsPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverMissions()">VER FINALIZADAS</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverMissions()">VER TIENDA DE CLASE</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverMissions()">VER MISIONES</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverMissions()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateStudentDefaultPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="teamsForm(); closePopoverStudentDefault()">VER EQUIPOS</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverStudentDefault()">VER TIENDA DE CLASE</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverStudentDefault()">VER MISIONES</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverStudentDefault()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  /*
    *************************************EVERY POPOVER FUNCTION GOES HERE*******************************
  */

                                        /* LANGUAGES POPOVER */

  $scope.popoverLanguages = $ionicPopover.fromTemplate($scope.templateLanguagesPopover, {
    scope: $scope
  });
  $scope.openPopoverLanguages = function($event) {
    $scope.popoverLanguages.show($event);
  };
  $scope.closePopoverLanguages = function() {
    $scope.popoverLanguages.hide();
  }
  $scope.$on('$destroy', function() {
    $scope.popoverLanguages.remove();
  });
  $scope.$on('popoverLanguages.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverLanguages.removed', function() {
    // Execute action
  });

                                        /* STUDENTHOME POPOVER */

  $scope.popoverStudentHome = $ionicPopover.fromTemplate($scope.templateStudentHomePopover, {
    scope: $scope
  });
  $scope.openPopoverStudentHome = function($event) {
    $scope.popoverStudentHome.show($event);
  };
  $scope.closePopoverStudentHome = function() {
    $scope.popoverStudentHome.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverStudentHome.remove();
  });
  $scope.$on('popoverStudentHome.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverStudentHome.removed', function() {
    // Execute action
  });

                                        /* MISSIONS POPOVER */

  $scope.popoverMissions = $ionicPopover.fromTemplate($scope.templateMissionsPopover, {
    scope: $scope
  });
  $scope.openPopoverMissions = function($event) {
    $scope.popoverMissions.show($event);
  };
  $scope.closePopoverMissions = function() {
    $scope.popoverMissions.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverMissions.remove();
  });
  $scope.$on('popoverMissions.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverMissions.removed', function() {
    // Execute action
  });

                                        /* DEFAULT POPOVER */

  $scope.popoverDefault = $ionicPopover.fromTemplate($scope.templateStudentDefaultPopover, {
    scope: $scope
  });
  $scope.openPopoverStudentDefault = function($event) {
    $scope.popoverDefault.show($event);
  };
  $scope.closePopoverStudentDefault = function() {
    $scope.popoverDefault.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popoverDefault.remove();
  });
  $scope.$on('popoverDefault.hidden', function() {
    // Execute action
  });
  $scope.$on('popoverDefault.removed', function() {
    // Execute action
  });

  /*
    *************************************SAVE EVERY MODAL INTO $SCOPE*******************************
  */

  $scope.selectRewardsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">SELECCIONA RECOMPENSAS</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkReward" ng-repeat="rewardForSelection in rewardsForSelection" ng-click="changeSelectedReward(rewardForSelection)" ng-checked="rewardForSelection.selected">{{rewardForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectRewardsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectRewards()" id="attendance-btn123" class="button button-calm  button-block">SELECCIONAR RECOMPENSAS</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.addClassModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">INTRODUCE UN CODIGO DE CLASE</h3>'+
      '<form id="addClassHashCodeForm" class="list">'+
        '<label class="item item-input">'+
          '<input type="text" ng-model="modelAddClass.hashCode" placeholder="CODIGO DE CLASE">'+
        '</label>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalAddClass()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-disabled="!modelAddClass.hashCode" ng-click="addClass(modelAddClass.hashCode)">AÑADIR CLASE</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.achievementDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{achievement.name}}</h3>'+
      '<ion-list>'+
        '<ion-item class ="teacherAvatar">'+
          '<img src={{achievement.badge}} class="avatar">'+
        '</ion-item>'+
        '<label class="item item-input list-elements" id="signUp-input3">'+
          '<span class="inputLabelProfile">'+
            '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;{{ \'DESCRIPTION\' | translate }}'+
            '<p>{{achievement.description}}</p>'+
          '</span>'+
        '</label>'+
        '<label class="item item-input list-elements" id="signUp-input3">'+
          '<span class="inputLabelProfile">'+
            '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;{{ \'REQUIREMENTS\' | translate }}'+
            '<p>{{achievement.requirements}}</p>'+
          '</span>'+
        '</label>'+
        '<label class="item item-input list-elements" id="signUp-input3" ng-show="unlockedAchievement">'+
          '<span class="inputLabelProfile">'+
            '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;TU NIVEL ACTUAL'+
            '<p>{{achievement.level}}</p>'+
          '</span>'+
        '</label>'+
        '<label class="item item-input list-elements" id="signUp-input3">'+
          '<span class="inputLabelProfile">'+
            '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;MAXIMO NIVEL'+
            '<p>{{achievement.maxLevel}}</p>'+
          '</span>'+
        '</label>'+
      '</ion-list>'+
      '<button ng-click="closeModalAchievementDialog()" class="button button-positive button-block icon ion-arrow-return-left"></button>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.teamDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{team.name}}</h3>'+
      '<div class="list-student">'+
        '<div class="teacherAvatar">'+
          '<img src={{team.picture}} class="avatar">'+
        '</div>'+
        '<form id="teamDialogForm">'+
          '<button class="button button-light  button-block button-outline">{{ \'CHANGE_AVATAR\' | translate }}</button>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">'+
              'OBJETIVO'+
              '<p>{{team.objective}}</p>'+
            '</span>'+
          '</label>'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalTeamDialog()">{{ \'CANCEL\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
      '<div class="list-team">'+
        '<ion-list>'+
          '<ion-item class="list-student-team" ng-repeat="teamMember in teamMembers">{{teamMember.name}} {{teamMember.surname}}</ion-item>'+
        '</ion-list>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.rewardDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{reward.name}}</h3>'+
      '<label class="item item-input list-elements">'+
        '<span class="inputLabelProfile">'+
          '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;{{ \'DESCRIPTION\' | translate }}'+
          '<p>{{reward.description}}</p>'+
        '</span>'+
      '</label>'+
      '<label class="item item-input list-elements">'+
        '<span class="inputLabelProfile">'+
          '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;PERMISO'+
          '<p>{{reward.permission}}</p>'+
        '</span>'+
      '</label>'+
      '<label class="item item-input list-elements">'+
        '<span class="inputLabelProfile">'+
          '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;PRECIO'+
          '<p>{{reward.price}}</p>'+
        '</span>'+
      '</label>'+
      '<label class="item item-input list-elements">'+
        '<span class="inputLabelProfile">'+
          '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;CANTIDAD'+
          '<p>{{(student.rewards[reward.id].amount != undefined) ? student.rewards[reward.id].amount : 0}}</p>'+
        '</span>'+
      '</label>'+
      '<button class="button button-positive button-block" ng-show="possessedReward" ng-click="consumeReward(reward)">USAR RECOMPENSA</button>'+
      '<button ng-click="closeModalRewardDialog()" class="button button-positive button-block icon ion-arrow-return-left"></button>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.missionDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{mission.name}}</h3>'+
        '<form class="list">'+
          '<ion-list>'+
            '<label class="item item-input list-elements">'+
              '<span class="input-label">{{ \'NAME\' | translate }} </span>'+
              '<p>{{mission.name}}</p>'+
            '</label>'+
            '<label class="item item-input list-elements">'+
              '<span class="input-label">PUNTOS ADICIONALES (OPCIONAL)</span>'+
              '<p>{{mission.additionalPoints}}</p>'+
            '</label>'+
          '</ion-list>'+
        '</form>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'ITEMS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="item in missionItems">'+
          '{{item.name}}'+
          '<p>PUNTOS NECESARIOS: {{item.neededPoints}}</p>'+
        '</ion-item>'+
      '</ion-list>'+
      '<h3 id="teams-heading5" class="teams-hdg5">RECOMPENSAS</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="reward in missionRewards">{{reward.name}}</ion-item>'+
      '</ion-list>'+
      '<h3 id="teams-heading5" class="teams-hdg5">ESTUDIANTES</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="student in missionStudents">{{student.name}}  {{student.surname}}</ion-item>'+
      '</ion-list>'+
      '<button ng-click="closeModalMissionDialog()" class="button button-positive button-block icon ion-arrow-return-left"></button>'+
    '</ion-content>'+
  '</ion-modal-view>';

  /*
    *************************************EVERY MODAL FUNCTION GOES HERE*******************************
  */

                                        /* SELECT REWARDS MODAL */

  $scope.selectRewardsModal = $ionicModal.fromTemplate($scope.selectRewardsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectRewardsModal = function(){
    $scope.selectRewardsModal.show();
  }
  $scope.closeSelectRewardsModal = function(){
    $scope.selectRewardsModal.hide();
  }

                                        /* ADD CLASS MODAL */

  $scope.addClassModal = $ionicModal.fromTemplate($scope.addClassModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalAddClass = function(){
    $scope.modelAddClass = {};
    $scope.addClassModal.show();  
  }
  $scope.closeModalAddClass = function(){
    $scope.addClassModal.hide();
  }

                                        /* ITEM DIALOG MODAL */

  $scope.itemDialogModal = $ionicModal.fromTemplate($scope.itemDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalItemDialog = function(){
    if($scope.missionDialogModal != undefined && $scope.missionDialogModal.isShown()) {
      $scope.missionDialogModal.hide();
      itemModal = 1;
    }
    $scope.itemDialogModal.show();  
  }
  $scope.closeModalItemDialog = function(){
    if(itemModal != undefined && itemModal == 1) {
      $scope.missionDialogModal.show();
      itemModal = 0;
    }
    $scope.itemDialogModal.hide();
  }

                                        /* ACHIEVEMENT DIALOG MODAL */

  $scope.achievementDialogModal = $ionicModal.fromTemplate($scope.achievementDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalAchievementDialog = function(){
    $scope.achievementDialogModal.show();  
  }
  $scope.closeModalAchievementDialog = function(){
    $scope.achievementDialogModal.hide();
  }

                                        /* TEAM DIALOG MODAL */  

  $scope.teamDialogModal = $ionicModal.fromTemplate($scope.teamDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalTeamDialog = function(){
    $scope.teamDialogModal.show();  
  }
  $scope.closeModalTeamDialog = function(){
    $scope.teamDialogModal.hide();
  }

                                        /* MISSION DIALOG MODAL */

  $scope.missionDialogModal = $ionicModal.fromTemplate($scope.missionDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalMissionDialog = function(){
    $scope.missionDialogModal.show();  
  }
  $scope.closeModalMissionDialog = function(){
    $scope.missionDialogModal.hide();
  }

                                        /* REWARD DIALOG MODAL */

  $scope.rewardDialogModal = $ionicModal.fromTemplate($scope.rewardDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalRewardDialog = function(){
    $scope.getRewardsForSelection();
    $scope.rewardDialogModal.show();  
  }
  $scope.closeModalRewardDialog = function(){
    $scope.rewardDialogModal.hide();
  }
  
  /*
    *************************************DECLARE VARIABLES & GIVE TO $SCOPE ALL THE VALUES WE NEED****
  */
  
  if (firebase.auth().currentUser === null) {
    $state.go('login');
  }
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user && sharedData.getData() === 'student') {
      sessionUser = firebase.auth().currentUser;
      var studentsArray = $firebaseArray(studentsRef);
      studentsArray.$loaded(function() {
        $scope.student = studentsArray.$getRecord(sessionUser.uid);
        $scope.student.name = CryptoJS.AES.decrypt($scope.student.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
        $scope.student.surname = CryptoJS.AES.decrypt($scope.student.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
		    $scope.getClassrooms();
      })
    }
  });
  
  var itemModal;
  var sessionUser
  
  var rootRef = firebase.database().ref();

  var teachersRef = firebase.database().ref('teachers');
  var studentsRef = firebase.database().ref('students');
  var hashcodesRef = firebase.database().ref('hashcodes');
  var classroomsRef = firebase.database().ref('classrooms');

  /*
    *************************************EVERY FUNCTIONALITY FUNCTION GOES HERE***********************
  */




                                          /* FUNCTIONS IN PROFILE */

  $scope.editStudentData = function(name, surname, school, avatar) {
    if (name != undefined) {
      $scope.student.name = name;
      var studentNameRef = firebase.database().ref('students/' + sessionUser.uid + '/name');
      studentNameRef.set(CryptoJS.AES.encrypt(name,sessionUser.uid).toString());
      sessionUser.updateProfile ({
        displayName : name + ' ' + $scope.student.surname,
      });
    }

    if (surname != undefined) {
      $scope.student.surname = surname;
      var studentSurnameRef = firebase.database().ref('students/' + sessionUser.uid + '/surname');
      studentSurnameRef.set(CryptoJS.AES.encrypt(surname,sessionUser.uid).toString());
      sessionUser.updateProfile ({
        displayName : $scope.student.name + ' ' + surname,
      });
    }

    if (school != undefined) {
      $scope.student.school = school;
      var studentSchoolRef = firebase.database().ref('students/' + sessionUser.uid + '/school');
      studentSchoolRef.set(school);
    }

    if (avatar != undefined) {
      $scope.student.avatar = avatar;
      var studentAvatarRef = firebase.database().ref('students/' + sessionUser.uid + '/avatar');
      studentAvatarRef.set(avatar);
      sessionUser.updateProfile ({
        photoURL : avatar,
      });
    }
    $scope.settingsForm();
    alert('DATOS CAMBIADOS');
  }

  $scope.updateStudentPassword = function(newPassword) {
    sessionUser.updatePassword(newPassword).then(function() {
      $scope.settingsForm();
      alert('CONTRASEÑA CAMBIADA');
    });
  }

  $scope.updateStudentEmail = function(email) {
    sessionUser.updateEmail(email).then(function() {
      var studentEmailRef = firebase.database().ref('students/' + sessionUser.uid + '/email');
      studentEmailRef.set(email);
      $scope.settingsForm();
      alert('EMAIL CAMBIADO');
    });
  }




                                        /* FUNCTIONS IN SETTINGS */

  $scope.logOut = function() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
      $state.go('login');
      $scope.studentHomeForm();
    }
  }




                                          /* FUNCTIONS IN HOME */

  $scope.getClassrooms = function() {
    var studentClassroomsRef = firebase.database().ref('students/' + $scope.student.$id + '/classrooms');
    var classroomKeys = $firebaseArray(studentClassroomsRef);
    classroomKeys.$loaded(function() {
      $scope.classrooms = [];
      for (i = 0 ; i < classroomKeys.length ; i++) {
        var classKey = classroomKeys.$keyAt(i);
        var loopClassroom = firebase.database().ref('classrooms/' + classKey);
        loopClassroom.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            for(j = 0 ; j < $scope.classrooms.length ; j++) {
              if($scope.classrooms[j].id == snapshot.val().id) {
                change = true;
                index = j;
              }
            }
            if(!change) {
              $scope.classrooms.push(snapshot.val());            
            } else {
              $scope.classrooms[index] = snapshot.val();
            }
          }
        });
      }
    });
  }

  $scope.addClass = function(hashcode){
    var hashcodesArray = $firebaseArray(hashcodesRef);
    hashcodesArray.$loaded(function() {
      var classToAdd = hashcodesArray.$getRecord(hashcode);
      
      var classesRef = firebase.database().ref('classrooms/');
      var classesArray = $firebaseArray(classesRef);
      classesArray.$loaded(function() {
        var classroom = classesArray.$getRecord(classToAdd.id);
        if(classroom.open){
          var studentToEditRef = firebase.database().ref('students/' + $scope.student.$id + '/classrooms/' + classToAdd.id);
          studentToEditRef.set({
            'id' : classToAdd.id,
            'totalPoints' : 0,
            'usedPoints' : 0,
            'inClass' : true,
          });
          
          var classToEditRef = firebase.database().ref('classrooms/' + classToAdd.id + '/students/' + $scope.student.$id);
          classToEditRef.set(true);
        } else {
          alert('LA CLASE SE ENCUENTRA CERRADA');
        }
      }).then(function(){
        $scope.getClassrooms();
      })
    })
    $scope.closeModalAddClass();
  }

  $scope.setClassroom = function(classroom) {
    $scope.classroom = classroom;
    $scope.classroomData = null;
    var loopClassroom = firebase.database().ref('students/' + sessionUser.uid + '/classrooms/' + $scope.classroom.id);
      loopClassroom.on('value', function(snapshot) {
        $scope.classroomData = snapshot.val();
    });
    $scope.getItems();
    $scope.getTeams()
    $scope.getRewards();
    $scope.getMissions();
    $scope.rulesItemsForm();
    $scope.getClassroomStudents();
    if ($scope.student.classrooms[$scope.classroom.id].usedPoints != undefined) {
      $scope.availablePoints = $scope.student.classrooms[$scope.classroom.id].totalPoints - $scope.student.classrooms[$scope.classroom.id].usedPoints;
    } else {
      $scope.availablePoints = $scope.student.classrooms[$scope.classroom.id].totalPoints;
    }
  }

  $scope.showArchivedClassrooms = function(value) {
    $scope.archivedClassroomsToShow = value;
    $scope.closePopoverStudentHome();
  }
                    
  
  

                                        /* FUNCTIONS IN ITEMS */

  $scope.getItems = function() {
    var classroomItemsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/items');
    var itemKeys = $firebaseArray(classroomItemsRef);
    itemKeys.$loaded(function() {
      $scope.items = [];
      $scope.itemsLocked = [];
      $scope.itemsUnlocked = [];
      for(i = 0 ; i < itemKeys.length ; i++) {
        var itemKey = itemKeys.$keyAt(i);
        var loopItemsRef = firebase.database().ref('items/' + itemKey);
        loopItemsRef.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var item = snapshot.val();
            var change = false;
            var index = -1;
            if($scope.student.items == undefined || !(item.id in $scope.student.items)) {
              for(j = 0 ; j < $scope.itemsLocked.length ; j++){
                if(item.id == $scope.itemsLocked[j].id){
                  change = true;
                  index = j;
                  item.studentPoints = 0;
                }
              }
              if (!change) {
                item.studentPoints = 0;
                $scope.itemsLocked.push(item);
              } else {
                $scope.itemsLocked[index] = item;
              }
            } else {
              for(j = 0 ; j < $scope.itemsUnlocked.length ; j++){
                if(item.id == $scope.itemsUnlocked[j].id){
                  change = true;
                  index = j;
                  item.studentPoints = $scope.student.items[item.id].points;
                }
              }
              if (!change) {
                item.studentPoints = $scope.student.items[item.id].points;
                $scope.itemsUnlocked.push(item);
              } else {
                $scope.itemsUnlocked[index] = item;
              }
            }
          }
          $scope.unlockedItemsExist = $scope.itemsUnlocked.length > 0;
          $scope.lockedItemsExist = $scope.itemsLocked.length > 0;
          if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
          }
          $scope.getStudentLevel();
        });
      }
    });
  }

  $scope.getClassroomItems = function() {
    $scope.itemsClassroom = [];
    $scope.itemsClassroom = $scope.itemsLocked.concat($scope.itemsUnlocked);
  }

  $scope.setItem = function(item) {
    $scope.item = item;
    $scope.unlockedAchievementsExist = false;
    $scope.lockedAchievementsExist = false;
    $scope.getAchievements();
    $scope.itemsForm();
  }

  $scope.getStudentLevel = function() {
    $scope.studentLevel = {};
    var classroomLevelsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/');
    var classroomLevelsArray = $firebaseArray(classroomLevelsRef);
    classroomLevelsArray.$loaded(function() {
      for (var element in classroomLevelsArray) {
        if($scope.student.classrooms[$scope.classroom.id].totalPoints > classroomLevelsArray[element].requiredPoints) {
          $scope.studentLevel = classroomLevelsArray[element];
        }
      }
    });
  }
                    
  
  

                                        /* FUNCTIONS IN ACHIEVEMENTS */

  $scope.getAchievements = function() {
    var itemAchievementsRef = firebase.database().ref('items/' + $scope.item.id + '/achievements');
    var achievementKeys = $firebaseArray(itemAchievementsRef);
    achievementKeys.$loaded(function() {
      $scope.achievements = [];
      $scope.achievementsLocked = [];
      $scope.achievementsUnlocked = [];
      for (i = 0 ; i < achievementKeys.length ; i++) {
        var achievementKey = achievementKeys.$keyAt(i);
        var loopAchievement = firebase.database().ref('achievements/' + achievementKey);
        loopAchievement.on('value', function(snapshot) {
          if(snapshot.val() != null) {
            var change = false;
            var index = -1;
            var achievement = snapshot.val();
            var toLock = false;
            for(h = 0 ; h < $scope.itemsLocked.length ; h++) {
              if($scope.item.id == $scope.itemsLocked[h].id) {
                toLock = true;
              }
            }
            if(toLock) {
              for(j = 0 ; j < $scope.achievementsLocked.length ; j++) {
                if(achievement.id == $scope.achievementsLocked[j].id) {
                  change = true;
                  index = j;
                }
              }
              if(!change) {
                $scope.achievementsLocked.push(achievement);
              } else {
                $scope.achievementsLocked[index] = achievement;
              }
            } else {
              if($scope.student.items[$scope.item.id].achievements == undefined || !(achievement.id in $scope.student.items[$scope.item.id].achievements)) {
                for(j = 0 ; j < $scope.achievementsLocked.length ; j++) {
                  if(achievement.id == $scope.achievementsLocked[j].id) {
                    change = true;
                    index = j;
                  }
                }
                if(!change) {
                  $scope.achievementsLocked.push(achievement);
                } else {
                  $scope.achievementsLocked[index] = achievement;
                }
              } else {
                for(j = 0 ; j < $scope.achievementsUnlocked.length ; j++) {
                  if($scope.item.id == $scope.achievementsUnlocked[j].id) {
                    change = true;
                    index = j;
                    achievement.level = $scope.student.items[$scope.item.id].achievements[achievement.id].level;
                  }
                }
                if (!change) {
                  achievement.level = $scope.student.items[$scope.item.id].achievements[achievement.id].level;
                  $scope.achievementsUnlocked.push(achievement);
                } else {
                  $scope.achievementsUnlocked[index] = achievement;
                }
              }
            }
          }
          $scope.unlockedAchievementsExist = $scope.achievementsUnlocked.length > 0;
          $scope.lockedAchievementsExist = $scope.achievementsLocked.length > 0;
          if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
          }
        });
      }
    });
  }

   $scope.setAchievement = function(achievement) {
    $scope.achievement = achievement;
    $scope.unlockedAchievement = (achievement.level != undefined);
    $scope.showModalAchievementDialog();
  }
                    
  
  

                                        /* FUNCTIONS IN TEAMS */

  $scope.getTeams = function() {
    var studentTeamsRef = firebase.database().ref('students/' + sessionUser.uid + '/teams');
    var teamKeys = $firebaseArray(studentTeamsRef);
    teamKeys.$loaded(function() {
      $scope.teams = [];
      for (i = 0 ; i < teamKeys.length ; i++) {
        var teamKey = teamKeys.$keyAt(i);
        for (var team in $scope.classroom.teams) {
          if (teamKey === team) {
            var loopTeam = firebase.database().ref('teams/' + teamKey);
            loopTeam.on('value', function(snapshot) {
              if (snapshot.val() != null) {
                var change = false;
                var index = -1;
                var team = snapshot.val();
                for(j = 0 ; j < $scope.teams.length ; j++){
                  if(team.id == $scope.teams[j].id){
                    change = true;
                    index = j;
                  }
                }
                if(!change){
                  $scope.teams.push(team);  
                } else {
                  $scope.teams[index] = team;
                }
              }
            });
          }
        }
      }
    });
  }

  $scope.setTeam = function(team) {
    $scope.team = team;
    var teamMembersRef = firebase.database().ref('teams/' + team.id + '/students');
    var teamMembersKeys = $firebaseArray(teamMembersRef);
    teamMembersKeys.$loaded(function() {
      $scope.teamMembers = [];
      for (i = 0 ; i < teamMembersKeys.length ; i++) {
        var teamMemberKey = teamMembersKeys.$keyAt(i);
        var loopTeamMember = firebase.database().ref('students/' + teamMemberKey);
        loopTeamMember.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var teamMember = snapshot.val();
            teamMember.name = CryptoJS.AES.decrypt(teamMember.name, teamMember.id).toString(CryptoJS.enc.Utf8);
            teamMember.surname =CryptoJS.AES.decrypt(teamMember.surname, teamMember.id).toString(CryptoJS.enc.Utf8);
            for(j = 0 ; j < $scope.teamMembers.length ; j++){
              if(teamMember.id == $scope.teamMembers[j].id){
                change = true;
                index = j;
              }
            }
            if(!change){
              $scope.teamMembers.push(teamMember);  
            } else {
              $scope.teamMembers[index] = teamMember;
            }
          }
        });
      }
    });
    $scope.showModalTeamDialog();
  }


                                          /* FUNCTIONS IN REWARDS */

  $scope.getRewards = function() {
    var classroomRewardsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/rewards');
    var rewardKeys = $firebaseArray(classroomRewardsRef);
    rewardKeys.$loaded(function() {
      $scope.rewardsLocked = [];
      $scope.rewardsUnlocked = [];
      for (i = 0 ; i < rewardKeys.length ; i++) {
        var rewardKey = rewardKeys.$keyAt(i); 
        var loopReward = firebase.database().ref('rewards/' + rewardKey);
        loopReward.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var reward = snapshot.val();
            if($scope.student.rewards == undefined || !(reward.id in $scope.student.rewards)){
              for(j = 0 ; j < $scope.rewardsLocked.length ; j++){
                if(reward.id == $scope.rewardsLocked[j].id){
                  change = true;
                  index = j;
                }
              }
              if(!change) {
                $scope.rewardsLocked.push(reward);
              } else {
                $scope.rewardsLocked[index] = reward;
              }
            } else {
              for(j = 0 ; j < $scope.rewardsUnlocked.length ; j++) {
                if(reward.id == $scope.rewardsUnlocked[j].id) {
                  change = true;
                  index = j;
                }
              }
              if(!change) {
                $scope.rewardsUnlocked.push(reward);
              } else {
                $scope.rewardsUnlocked[index] = reward;
              }
            }
            $scope.unlockedRewardsExist = $scope.rewardsUnlocked.length > 0;
            $scope.lockedRewardsExist = $scope.rewardsLocked.length > 0;
            if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getRewardsForSelection();
          }
        });
      }
    });
  }

  $scope.getRewardsForSelection = function() {
    $scope.rewards = $scope.rewardsLocked.concat($scope.rewardsUnlocked);

    $scope.rewards.sort(sortByName);

    $scope.rewardsForSelection = angular.copy($scope.rewards);
    for (var element in $scope.rewardsForSelection) {
      $scope.rewardsForSelection[element].selected = false;
    }
  }

  $scope.setReward = function(reward) {
    $scope.reward = reward;
    if ($scope.student.rewards != undefined) {
      if ($scope.student.rewards[reward.id] != undefined) {
        $scope.possessedReward = true;
      } else {
        $scope.possessedReward = false;
      }
    } else {
      $scope.possessedReward = false;
    }
    $scope.showModalRewardDialog();
  }

  $scope.buyReward = function(reward) {
    if ($scope.availablePoints >= reward.price) {
      var rewardForStudentRef = firebase.database().ref('students/' + $scope.student.id + '/rewards/' + reward.id);

      if ($scope.student.rewards != undefined && $scope.student.rewards[reward.id] != undefined) {
        rewardForStudentRef.set({
          'id' : reward.id,
          'amount' : (Number($scope.student.rewards[reward.id].amount) + 1),
        });
      } else {
        rewardForStudentRef.set({
          'id' : reward.id,
          'amount' : 1,
        });
      }

      var usedPointsForStudentRef = firebase.database().ref('students/' + $scope.student.id + '/classrooms/' + $scope.classroom.id + '/usedPoints');
      if ($scope.student.classrooms[$scope.classroom.id].usedPoints != undefined) {
        usedPointsForStudentRef.set($scope.student.classrooms[$scope.classroom.id].usedPoints + reward.price);
      } else {
        usedPointsForStudentRef.set(reward.price);
      }

      $scope.availablePoints -= reward.price;

      $scope.getRewards();
    } else {
      alert('NO TIENES PUNTOS SUFICIENTES PARA COMPRAR ' + reward.name);
    }
  }

  $scope.consumeReward = function(reward) {
    $scope.closeModalRewardDialog();

    var rewardForStudentRef = firebase.database().ref('students/' + $scope.student.id + '/rewards/' + reward.id);
    if ($scope.student.rewards[reward.id].amount > 1) {
      rewardForStudentRef.set({
        'id': reward.id,
        'amount' : Number($scope.student.rewards[reward.id].amount) - 1,
      });
    } else {
      rewardForStudentRef.remove();
    }

    $scope.getRewards();
  }

  $scope.selectRewards = function() {
    $scope.closeSelectRewardsModal();
      for (var element in $scope.rewardsForSelection) {
        if ($scope.rewardsForSelection[element].selected === true) {
          $scope.buyReward($scope.rewardsForSelection[element]);
        }
      }
    $scope.rewardsForSelection = $scope.rewards;
  }

  $scope.changeSelectedReward = function(reward) {
    if (reward.selected === false) {
      reward.selected = true;
    } else {
      reward.selected = false;
    }
  }

                                            /* FUNCTIONS IN MISSIONS */

  $scope.getMissions = function() {
    var classroomMissionsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/missions');
    var missionKeys = $firebaseArray(classroomMissionsRef);
    missionKeys.$loaded(function() {
      $scope.missions = [];
      for (i = 0 ; i < missionKeys.length ; i++) {
        var missionKey = missionKeys.$keyAt(i);
        var loopMission = firebase.database().ref('missions/' + missionKey);
        loopMission.on('value', function(snapshot) {
          if(snapshot.val() != null) {
            var change = false;
            var index = -1;
            var mission = snapshot.val();
            if(mission.id in $scope.student.missions) {
              for (j = 0 ; j < $scope.missions.length ; j++) {
                if(mission.id == $scope.missions[j].id) {
                  change = true;
                  index = j;
                }
              }
              if(!change) {
                $scope.missions.push(mission);
              } else {
                $scope.missions[index] = mission;
              }
            }
          }
        });
      }
    });
  }

  $scope.getClassroomStudents = function() {
    var classroomStudentsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/students');
    var studentsKeys = $firebaseArray(classroomStudentsRef);
    studentsKeys.$loaded(function() {
      $scope.students = [];
      for(i = 0 ; i < studentsKeys.length ; i++) {
        var studentKey = studentsKeys.$keyAt(i);
        var loopStudent = firebase.database().ref('students/' + studentKey);
        loopStudent.on('value', function(snapshot) {
          if(snapshot.val() != null) {
            var change = false;
            var index = -1;
            var student = snapshot.val();
            student.name = CryptoJS.AES.decrypt(student.name, student.id).toString(CryptoJS.enc.Utf8);
            student.surname = CryptoJS.AES.decrypt(student.surname, student.id).toString(CryptoJS.enc.Utf8);
            for(j = 0 ; j < $scope.students.length ; j++) {
              if($scope.students[j].id == student.id) {
                change = true;
                index = j;
              }
            }
            if(!change) {
              $scope.students.push(student);
            } else {
              $scope.students[index] = student
            }
          }
        });
      }
    });
  }

  $scope.setMission = function(mission) {
    $scope.mission = mission;
    $scope.getClassroomItems();
    $scope.missionItems = [];
    $scope.missionRewards = [];
    $scope.missionStudents = [];
    var classroomItemsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/items');
    var classroomItemsArray = $firebaseArray(classroomItemsRef);
    classroomItemsArray.$loaded(function() {
      for(var item in $scope.itemsClassroom) {
        for(var itemMission in mission.items) {
          if($scope.itemsClassroom[item].id == mission.items[itemMission].id) {
            $scope.itemsClassroom[item].neededPoints = mission.items[itemMission].neededPoints;
            $scope.missionItems.push($scope.itemsClassroom[item]);
          }
        }
      }
    });
    
    var classroomRewardsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/rewards');
    var classroomRewardsArray = $firebaseArray(classroomRewardsRef);
    classroomRewardsArray.$loaded(function() {
      for(var reward in $scope.rewards) {
        for(var rewardMission in mission.rewards) {
          if($scope.rewards[reward].id == rewardMission) {
            $scope.missionRewards.push($scope.rewards[reward]);
          }
        }
      }
    });

    for(var student in  $scope.students) {
      for(var studentMission in mission.students) {
        if( $scope.students[student].id == studentMission) {
          $scope.missionStudents.push($scope.students[student]);
        }
      }
    }
    $scope.showModalMissionDialog();
  }

  var sortByName = function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  }
  
}])



//                                  []
//                                  []
//                                  []
//                                  []
//                        [][][][][][][][][][][]
//                                  []
//                                  []
//                                  []
//                                  []
//                                  []



.controller('settingsCtrl', ['$scope', '$ionicPopup',
  function($scope, $ionicPopup) {

    $scope.showHelpPopup = function() {
      $ionicPopup.alert({
        title: 'AYUDA',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu tristique nulla. Vestibulum nulla risus, tincidunt a ante at, euismod auctor diam. Etiam blandit velit ipsum, non accumsan ligula mattis facilisis. Nulla tristique facilisis nisl. Maecenas venenatis ipsum quis metus ultrices faucibus. Donec arcu risus, mollis facilisis massa sit amet, posuere efficitur mi. Praesent elementum justo nec felis accumsan consectetur. Cras rutrum lacinia magna, eu bibendum erat finibus vitae. Vestibulum iaculis sem sit amet ex ornare ornare. Vestibulum sodales velit non mauris pretium finibus.',
        buttons: [{
            text: 'Okay',
            type: 'button-positive'
          },
        ]
      }).then(function(res) {
        if(res) {
        } else {
        }
      });
    }

    $scope.showTermsPopup = function() {
      $ionicPopup.alert({
        title: 'TERMINOS Y CONDICIONES',
        content: 'Sed cursus rhoncus porta. Aenean sed ante a sem molestie posuere. In maximus sem justo, eu ultrices leo tincidunt sed. Nulla feugiat convallis luctus. Donec vitae sodales augue. Fusce tortor neque, tincidunt id felis vel, tincidunt aliquam nisl. Fusce maximus aliquam sodales.',
        buttons: [{
            text: 'Okay',
            type: 'button-positive'
          },
        ]
      }).then(function(res) {
        if(res) {
        } else {
        }
      });
    }

    $scope.showAboutPopup = function() {
      $ionicPopup.alert({
        title: 'ACERCA DE',
        content: 'Quisque convallis scelerisque lorem, et accumsan erat porttitor quis. Aenean tincidunt iaculis risus, eu aliquet turpis scelerisque at. Etiam est nisi, maximus sed ultricies quis, ornare et ex. Nam at fermentum arcu. Nullam risus ipsum, convallis et tortor in, tempor blandit tortor. Cras non viverra est, vel pellentesque lectus. Sed libero mi, tristique quis interdum sit amet, ornare at libero. Suspendisse cursus rutrum lectus, sit amet interdum nunc egestas in. Maecenas vitae luctus ligula. Donec vehicula mi sed leo elementum dictum. In magna dui, lobortis vitae dui at, viverra mattis erat. Aenean sit amet justo a ex porta scelerisque. Praesent nec rutrum urna, sed accumsan lorem.'
        +''
        +'Nullam ultrices tempor sem, ac lacinia ligula consectetur at. Quisque non elit sit amet dui tincidunt accumsan non ac lectus. Donec sit amet arcu finibus, commodo elit finibus, tincidunt dolor. Cras nec velit eget nibh sodales faucibus a pellentesque diam. Etiam volutpat tortor at varius euismod. Suspendisse eget justo quis enim ornare pellentesque. Vestibulum congue sed orci vel scelerisque. Vivamus ac accumsan nulla. Etiam euismod tortor in velit facilisis tristique.',
        buttons: [{
            text: 'Okay',
            type: 'button-positive'
          },
        ]
      }).then(function(res) {
        if(res) {
        } else {
        }
      });
    }

}])



//                                  []
//                                  []
//                                  []
//                                  []
//                        [][][][][][][][][][][]
//                                  []
//                                  []
//                                  []
//                                  []
//                                  []



.controller('changeLanguageCtrl', ['$translate', '$scope',
  function ($translate, $scope) {
 
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

    $scope.$on('changeLanguageEvent', function(event, args) {
      $scope.changeLanguage(args.language);
    });

}])