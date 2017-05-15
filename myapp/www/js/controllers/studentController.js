angular.module('app.studentController', ['pascalprecht.translate'])

.controller('studentHomeCtrl', ['$scope', '$stateParams', '$http', '$state', '$ionicModal', '$ionicActionSheet', '$ionicPopover', '$firebaseArray', 'sharedData', '$ionicLoading', '$translate', '$rootScope', '$ionicLoading', 'localStorageService',

function ($scope, $stateParams, $http, $state, $ionicModal, $ionicActionSheet, $ionicPopover, $firebaseArray, sharedData, $ionicLoading, $translate, $rootScope, $ionicLoading, localStorageService) {

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
    if ($scope.student.name.length > 32) {
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

  $scope.rulesItemsForm = function() {
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
      titleText: $scope.actionsRewardsActionSheet,
      buttons: [
        { text: $scope.buyRewardsActionSheetOption },
      ],
      cancelText: $scope.cancelText,
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
      '<ion-item class="itemPopover" ng-hide="archivedClassroomsToShow" ng-click="showArchivedClassrooms(true)">{{ \'SEE_ARCHIVED_CLASSES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-show="archivedClassroomsToShow" ng-click="showArchivedClassrooms(false)">{{ \'HIDE_ARCHIVED_CLASSES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverStudentHome()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateStudentDefaultPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="teamsForm(); closePopoverStudentDefault()">{{ \'SEE_TEAMS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverStudentDefault()">{{ \'SEE_CLASS_SHOP\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverStudentDefault()">{{ \'SEE_MISSIONS\' | translate }}</ion-item>'+
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
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_REWARDS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkReward" ng-repeat="rewardForSelection in rewardsForSelection" ng-click="changeSelectedReward(rewardForSelection)" ng-checked="rewardForSelection.selected">{{rewardForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectRewardsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectRewards()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.addClassModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'INSERT_CLASS_CODE\' | translate }}</h3>'+
      '<form id="addClassHashCodeForm" class="list">'+
        '<label class="item item-input">'+
          '<input type="text" ng-model="modelAddClass.hashCode" placeholder="{{ \'CLASS_CODE\' | translate }}">'+
        '</label>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalAddClass()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-disabled="!modelAddClass.hashCode" ng-click="addClass(modelAddClass.hashCode)">{{ \'ADD_CLASS\' | translate }}</button>'+
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
            '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;{{ \'YOUR_ACTUAL_LEVEL\' | translate }}'+
            '<p>{{achievement.level}}</p>'+
          '</span>'+
        '</label>'+
        '<label class="item item-input list-elements" id="signUp-input3">'+
          '<span class="inputLabelProfile">'+
            '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;{{ \'MAX_LEVEL\' | translate }}'+
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
              '{{ \'TEAM_OBJECTIVE\' | translate }}'+
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
          '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;{{ \'PERMISSION\' | translate }}'+
          '<p>{{reward.permission}}</p>'+
        '</span>'+
      '</label>'+
      '<label class="item item-input list-elements">'+
        '<span class="inputLabelProfile">'+
          '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;{{ \'PRICE\' | translate }}'+
          '<p>{{reward.price}}</p>'+
        '</span>'+
      '</label>'+
      '<label class="item item-input list-elements">'+
        '<span class="inputLabelProfile">'+
          '<i class="icon ion-minus-round"></i>&nbsp;&nbsp;{{ \'QUANTITY\' | translate }}'+
          '<p>{{(student.rewards[reward.id].amount != undefined) ? student.rewards[reward.id].amount : 0}}</p>'+
        '</span>'+
      '</label>'+
      '<button class="button button-positive button-block" ng-show="possessedReward" ng-click="consumeReward(reward)">{{ \'USE_REWARD\' | translate }}</button>'+
      '<button ng-click="closeModalRewardDialog()" class="button button-positive button-block icon ion-arrow-return-left"></button>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.missionDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{mission.name}}</h3>'+
        '<form class="list">'+
          '<ion-list>'+
            '<label class="item item-input list-elements">'+
              '<span class="input-label">{{ \'NAME\' | translate }}:</span>'+
              '<p>{{mission.name}}</p>'+
            '</label>'+
            '<label class="item item-input list-elements">'+
              '<span class="input-label">{{ \'ADDITIONAL_POINTS_MISSION\' | translate }}:</span>'+
              '<p>{{mission.additionalPoints}}</p>'+
            '</label>'+
          '</ion-list>'+
        '</form>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'ITEMS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="item in missionItems">'+
          '{{item.name}}'+
          '<p>{{ \'NEEDED_POINTS\' | translate }}: {{item.neededPoints}}</p>'+
        '</ion-item>'+
      '</ion-list>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'REWARDS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="reward in missionRewards">{{reward.name}}</ion-item>'+
      '</ion-list>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'STUDENTS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="student in missionStudents">{{student.name}}  {{student.surname}}</ion-item>'+
      '</ion-list>'+
      '<button ng-click="closeModalMissionDialog()" class="button button-positive button-block icon ion-arrow-return-left"></button>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.notificationsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'NOTIFICATIONS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7">'+
        '<ion-item id="attendance-checkbox2" ng-repeat="notification in notifications">{{notification.message}}'+
          '<p>{{notification.type}}</p>'+
        '</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeNotificationsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="deleteNotifications()">{{ \'CLEAN_NOTIFICATIONS\' | translate }}</button>'+
      '</div>'+
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
  $scope.showSelectRewardsModal = function() {
    $scope.selectRewardsModal.show();
  }
  $scope.closeSelectRewardsModal = function() {
    $scope.selectRewardsModal.hide();
  }

                                        /* ADD CLASS MODAL */

  $scope.addClassModal = $ionicModal.fromTemplate($scope.addClassModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalAddClass = function() {
    $scope.modelAddClass = {};
    $scope.addClassModal.show();  
  }
  $scope.closeModalAddClass = function() {
    $scope.addClassModal.hide();
  }

                                        /* ITEM DIALOG MODAL */

  $scope.itemDialogModal = $ionicModal.fromTemplate($scope.itemDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalItemDialog = function() {
    if ($scope.missionDialogModal != undefined && $scope.missionDialogModal.isShown()) {
      $scope.missionDialogModal.hide();
      itemModal = 1;
    }
    $scope.itemDialogModal.show();  
  }
  $scope.closeModalItemDialog = function() {
    if (itemModal != undefined && itemModal == 1) {
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
  $scope.showModalAchievementDialog = function() {
    $scope.achievementDialogModal.show();  
  }
  $scope.closeModalAchievementDialog = function() {
    $scope.achievementDialogModal.hide();
  }

                                        /* TEAM DIALOG MODAL */  

  $scope.teamDialogModal = $ionicModal.fromTemplate($scope.teamDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalTeamDialog = function() {
    $scope.teamDialogModal.show();  
  }
  $scope.closeModalTeamDialog = function() {
    $scope.teamDialogModal.hide();
  }

                                        /* MISSION DIALOG MODAL */

  $scope.missionDialogModal = $ionicModal.fromTemplate($scope.missionDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalMissionDialog = function() {
    $scope.missionDialogModal.show();  
  }
  $scope.closeModalMissionDialog = function() {
    $scope.missionDialogModal.hide();
  }

                                        /* REWARD DIALOG MODAL */

  $scope.rewardDialogModal = $ionicModal.fromTemplate($scope.rewardDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalRewardDialog = function() {
    $scope.getRewardsForSelection();
    $scope.rewardDialogModal.show();  
  }
  $scope.closeModalRewardDialog = function() {
    $scope.rewardDialogModal.hide();
  }

                                        /* NOTIFICATIONS MODAL */

  $scope.notificationsModal = $ionicModal.fromTemplate($scope.notificationsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showNotificationsModal = function() {
    $scope.notificationsModal.show();
  }
  $scope.closeNotificationsModal = function() {
    $scope.notificationsModal.hide();
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
      firebase.auth().currentUser.getToken(true).then(function(idToken) {
        var userData = {
          'sessionUserId' : sessionUser.uid,
          'token' : idToken,
          'type' : 'student',
        };

        localStorageService.set('userCredentials', userData);
      });

      var studentsArray = $firebaseArray(studentsRef);
      studentsArray.$loaded(function() {
        $scope.student = studentsArray.$getRecord(sessionUser.uid);
        $scope.student.name = CryptoJS.AES.decrypt($scope.student.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
        $scope.student.surname = CryptoJS.AES.decrypt($scope.student.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
		    $scope.getClassrooms();
      })
    }
  });

  $translate(['ACTIONS_REWARDS', 'BUY_REWARDS', 'CANCEL', 'CLASS_CLOSED', 'DATA_CHANGED', 'EMAIL_CHANGED', 'NOT_ENOUGH_POINTS', 'NOTIFICATION_OF_STUDENT', 'NOTIFICATION_REWARD_OBTAINED', 'NOTIFICATION_REWARD_SPENT', 'PASSWORD_CHANGED', 'REWARD']).then(function(translations) {
    $scope.actionsRewardsActionSheet = translations.ACTIONS_REWARDS;
    $scope.buyRewardsActionSheetOption = translations.BUY_REWARDS;
    $scope.cancelText = translations.CANCEL;
    $scope.classroomClosedAlert = translations.CLASS_CLOSED;
    $scope.dataChangedAlert = translations.DATA_CHANGED;
    $scope.emailChangedAlert = translations.EMAIL_CHANGED;
    $scope.notEnoughPointsAlert = translations.NOT_ENOUGH_POINTS;
    $scope.notificationOfStudent = translations.NOTIFICATION_OF_STUDENT;
    $scope.notificationRewardObtained = translations.NOTIFICATION_REWARD_OBTAINED;
    $scope.notificationRewardSpent = translations.NOTIFICATION_REWARD_SPENT;
    $scope.passwordChangedAlert = translations.PASSWORD_CHANGED;
    $scope.rewardNotificationType = translations.REWARD;
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

  $scope.updateStudentAvatar = function() {
    var downloadURL;
    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('inputAvatar');
    
    fileButton.addEventListener('change',function(e) {
      $scope.uploadingPicture = true;
      if (e.target.files.length > 0) {
        $ionicLoading.show();
        var file = e.target.files[0];
        var fileExtension = file.name.split('.').pop();
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
          var storageRef = firebase.storage().ref('Profile_Pictures/' + sessionUser.uid + '/profilePicture');
          var task = storageRef.put(file);
          task.on('state_changed', function progress(snapshot) {
            uploader.value = (snapshot.bytesTransferred/ snapshot.totalBytes)*100;
          }, function error(error) {
            $ionicLoading.hide();
          }, function complete() {
            downloadURL = task.snapshot.downloadURL;
              
            $scope.student.avatar = downloadURL;
            var studentAvatarToUpdateRef = firebase.database().ref('students/' + sessionUser.uid + '/avatar/');
            studentAvatarToUpdateRef.set(downloadURL);
            sessionUser.updateProfile ({
              photoURL : downloadURL,
            });
            $scope.student.name = CryptoJS.AES.decrypt($scope.student.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
            $scope.student.surname = CryptoJS.AES.decrypt($scope.student.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
            $ionicLoading.hide();

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
          });
        } else {
          alert($scope.fileInvalidAlert);
        }
      }
    });
  }

  $scope.editStudentData = function(name, surname, school) {
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

    $scope.settingsForm();
    alert($scope.dataChangedAlert);
  }

  $scope.updateStudentPassword = function(newPassword) {
    sessionUser.updatePassword(newPassword).then(function() {
      $scope.settingsForm();
      alert($scope.passwordChangedAlert);
    });
  }

  $scope.updateStudentEmail = function(email) {
    sessionUser.updateEmail(email).then(function() {
      var studentEmailRef = firebase.database().ref('students/' + sessionUser.uid + '/email');
      studentEmailRef.set(email);
      $scope.settingsForm();
      alert($scope.emailChangedAlert);
    });
  }




                                        /* FUNCTIONS IN SETTINGS */

  $scope.logOut = function() {
    if (firebase.auth().currentUser) {
      var userData = {};
      localStorageService.set('userCredentials', userData);
      
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
            for (j = 0 ; j < $scope.classrooms.length ; j++) {
              if ($scope.classrooms[j].id == snapshot.val().id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.classrooms.push(snapshot.val());            
            } else {
              $scope.classrooms[index] = snapshot.val();
            }
            $scope.classrooms.sort(sortByName);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
          }
        });
      }
    });
  }

  $scope.addClass = function(hashcode) {
    var hashcodesArray = $firebaseArray(hashcodesRef);
    hashcodesArray.$loaded(function() {
      var classToAdd = hashcodesArray.$getRecord(hashcode);
      
      var classesRef = firebase.database().ref('classrooms/');
      var classesArray = $firebaseArray(classesRef);
      classesArray.$loaded(function() {
        var classroom = classesArray.$getRecord(classToAdd.id);
        if (classroom.open) {
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
          alert($scope.classroomClosedAlert);
        }
      }).then(function() {
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
    $scope.getNotifications();
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
      for (i = 0 ; i < itemKeys.length ; i++) {
        var itemKey = itemKeys.$keyAt(i);
        var loopItemsRef = firebase.database().ref('items/' + itemKey);
        loopItemsRef.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var item = snapshot.val();
            var change = false;
            var index = -1;
            if ($scope.student.items == undefined || !(item.id in $scope.student.items)) {
              for (j = 0 ; j < $scope.itemsLocked.length ; j++) {
                if (item.id == $scope.itemsLocked[j].id) {
                  change = true;
                  index = j;
                  item.studentPoints = 0;
                  break;
                }
              }
              if (!change) {
                item.studentPoints = 0;
                $scope.itemsLocked.push(item);
              } else {
                $scope.itemsLocked[index] = item;
              }
              $scope.itemsLocked.sort(sortByName);
            } else {
              for (j = 0 ; j < $scope.itemsUnlocked.length ; j++) {
                if (item.id == $scope.itemsUnlocked[j].id) {
                  change = true;
                  index = j;
                  item.studentPoints = $scope.student.items[item.id].points;
                  break;
                }
              }
              if (!change) {
                item.studentPoints = $scope.student.items[item.id].points;
                $scope.itemsUnlocked.push(item);
              } else {
                $scope.itemsUnlocked[index] = item;
              }
              $scope.itemsUnlocked.sort(sortByName);
            }
          }
          $scope.unlockedItemsExist = $scope.itemsUnlocked.length > 0;
          $scope.lockedItemsExist = $scope.itemsLocked.length > 0;
          if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
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
    $scope.itemsClassroom.sort(sortByName);
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
        if ($scope.student.classrooms[$scope.classroom.id].totalPoints > classroomLevelsArray[element].requiredPoints) {
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
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var achievement = snapshot.val();
            var toLock = false;
            for (h = 0 ; h < $scope.itemsLocked.length ; h++) {
              if ($scope.item.id == $scope.itemsLocked[h].id) {
                toLock = true;
                break;
              }
            }
            if (toLock) {
              for (j = 0 ; j < $scope.achievementsLocked.length ; j++) {
                if (achievement.id == $scope.achievementsLocked[j].id) {
                  change = true;
                  index = j;
                  break;
                }
              }
              if (!change) {
                $scope.achievementsLocked.push(achievement);
              } else {
                $scope.achievementsLocked[index] = achievement;
              }
              $scope.achievementsLocked.sort(sortByName);
            } else {
              if ($scope.student.items[$scope.item.id].achievements == undefined || !(achievement.id in $scope.student.items[$scope.item.id].achievements)) {
                for (j = 0 ; j < $scope.achievementsLocked.length ; j++) {
                  if (achievement.id == $scope.achievementsLocked[j].id) {
                    change = true;
                    index = j;
                  }
                }
                if (!change) {
                  $scope.achievementsLocked.push(achievement);
                } else {
                  $scope.achievementsLocked[index] = achievement;
                }
                $scope.achievementsLocked.sort(sortByName);
              } else {
                for (j = 0 ; j < $scope.achievementsUnlocked.length ; j++) {
                  if ($scope.item.id == $scope.achievementsUnlocked[j].id) {
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
                $scope.achievementsUnlocked.sort(sortByName);
              }
            }
          }
          $scope.unlockedAchievementsExist = $scope.achievementsUnlocked.length > 0;
          $scope.lockedAchievementsExist = $scope.achievementsLocked.length > 0;
          if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
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
        for (var teamId in $scope.classroom.teams) {
          if (teamKey === teamId) {
            var loopTeam = firebase.database().ref('teams/' + teamKey);
            loopTeam.on('value', function(snapshot) {
              if (snapshot.val() != null) {
                var change = false;
                var index = -1;
                var team = snapshot.val();
                for (j = 0 ; j < $scope.teams.length ; j++) {
                  if (team.id == $scope.teams[j].id) {
                    change = true;
                    index = j;
                    break;
                  }
                }
                if (!change) {
                  $scope.teams.push(team);  
                } else {
                  $scope.teams[index] = team;
                }
                $scope.teams.sort(sortByName);
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
            for (j = 0 ; j < $scope.teamMembers.length ; j++) {
              if (teamMember.id == $scope.teamMembers[j].id) {
                change = true;
                index = j;
              }
            }
            if (!change) {
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
            if ($scope.student.rewards == undefined || !(reward.id in $scope.student.rewards)) {
              for (j = 0 ; j < $scope.rewardsLocked.length ; j++) {
                if (reward.id == $scope.rewardsLocked[j].id) {
                  change = true;
                  index = j;
                  break;
                }
              }
              if (!change) {
                $scope.rewardsLocked.push(reward);
              } else {
                $scope.rewardsLocked[index] = reward;
              }
              $scope.rewardsLocked.sort(sortByName);
            } else {
              for (j = 0 ; j < $scope.rewardsUnlocked.length ; j++) {
                if (reward.id == $scope.rewardsUnlocked[j].id) {
                  change = true;
                  index = j;
                  break;
                }
              }
              if (!change) {
                $scope.rewardsUnlocked.push(reward);
              } else {
                $scope.rewardsUnlocked[index] = reward;
              }
              $scope.rewardsUnlocked.sort(sortByName);
            }
            $scope.unlockedRewardsExist = $scope.rewardsUnlocked.length > 0;
            $scope.lockedRewardsExist = $scope.rewardsLocked.length > 0;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
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

      $scope.createNotificationRewards(reward, 'buy', $scope.student);

      $scope.getRewards();
    } else {
      alert($scope.notEnoughPointsAlert + ' ' + reward.name);
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
    $scope.createNotificationRewards(reward, 'consume', $scope.student);

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
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var mission = snapshot.val();
            if ($scope.student.missions != undefined) {
              if (mission.id in $scope.student.missions) {
                for (j = 0 ; j < $scope.missions.length ; j++) {
                  if (mission.id == $scope.missions[j].id) {
                    change = true;
                    index = j;
                    break;
                  }
                }
                if (!change) {
                  $scope.missions.push(mission);
                } else {
                  $scope.missions[index] = mission;
                }
                $scope.missions.sort(sortByName);
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
      for (i = 0 ; i < studentsKeys.length ; i++) {
        var studentKey = studentsKeys.$keyAt(i);
        var loopStudent = firebase.database().ref('students/' + studentKey);
        loopStudent.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var student = snapshot.val();
            student.name = CryptoJS.AES.decrypt(student.name, student.id).toString(CryptoJS.enc.Utf8);
            student.surname = CryptoJS.AES.decrypt(student.surname, student.id).toString(CryptoJS.enc.Utf8);
            for (j = 0 ; j < $scope.students.length ; j++) {
              if ($scope.students[j].id == student.id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.students.push(student);
            } else {
              $scope.students[index] = student;
            }
            $scope.students.sort(sortBySurname);
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
      for (var item in $scope.itemsClassroom) {
        for (var itemMissionId in mission.items) {
          if ($scope.itemsClassroom[item].id == itemMissionId) {
            $scope.itemsClassroom[item].neededPoints = mission.items[itemMissionId].neededPoints;
            $scope.missionItems.push($scope.itemsClassroom[item]);
          }
        }
      }
    });
    
    var classroomRewardsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/rewards');
    var classroomRewardsArray = $firebaseArray(classroomRewardsRef);
    classroomRewardsArray.$loaded(function() {
      for (var reward in $scope.rewards) {
        for (var rewardMissionId in mission.rewards) {
          if ($scope.rewards[reward].id == rewardMissionId) {
            $scope.missionRewards.push($scope.rewards[reward]);
          }
        }
      }
    });

    for (var student in  $scope.students) {
      for (var studentMissionId in mission.students) {
        if ( $scope.students[student].id == studentMissionId) {
          $scope.missionStudents.push($scope.students[student]);
        }
      }
    }
    $scope.showModalMissionDialog();
  }

  


                                        /* FUNCTIONS NOTIFICATIONS */

  $scope.getNotifications = function() {
    var studentNotificationsRef = firebase.database().ref('students/' + $scope.student.id + '/notifications/' + $scope.classroom.id);
    var studentNotificationsArray = $firebaseArray(studentNotificationsRef);
    studentNotificationsArray.$loaded(function() {
      $scope.notifications = [];
        for (var element in studentNotificationsArray) {
          var studentNotificationRef = firebase.database().ref('students/' + $scope.student.id + '/notifications/' + $scope.classroom.id + '/' + studentNotificationsArray[element].$id);
          studentNotificationRef.on('value', function(snapshot) {
            if (snapshot.val() != null) {
              var change = false;
              var index = -1;
              var notification = snapshot.val();
              $scope.notifications.push(notification);

              if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
              }
              $scope.notifications.sort(sortByDate);
            }
          });
        }
        if ($scope.notifications.length > 0) {
          $scope.showNotificationsModal();
        }
    });
  }

  $scope.createNotificationRewards = function(reward, operationType, student) {
    var teacherNotificationsRef = firebase.database().ref('teachers/' + $scope.classroom.teacher + '/notifications/' + $scope.classroom.id);
    var teacherNotificationsArray = $firebaseArray(teacherNotificationsRef);
    teacherNotificationsArray.$loaded(function() {
      if (operationType == 'buy') {
        teacherNotificationsArray.$add({
          'type' : $scope.rewardNotificationType,
          'message' : $scope.notificationOfStudent + ' ' + CryptoJS.AES.decrypt(student.name, student.id).toString(CryptoJS.enc.Utf8) + ' ' + CryptoJS.AES.decrypt(student.surname, student.id).toString(CryptoJS.enc.Utf8) + ' ' + $scope.notificationRewardObtained + ' \"' + reward.name + '\"',
          'date' : Date.now(),
        });
      } else if (operationType == 'consume') {
        teacherNotificationsArray.$add({
          'type' : $scope.rewardNotificationType,
          'message' : $scope.notificationOfStudent + ' ' + CryptoJS.AES.decrypt(student.name, student.id).toString(CryptoJS.enc.Utf8) + ' ' + CryptoJS.AES.decrypt(student.surname, student.id).toString(CryptoJS.enc.Utf8) + ' ' + $scope.notificationRewardSpent + ' \"' + reward.name + '\" x1',
          'date' : Date.now(),
        });
      }
    });
  }

  $scope.deleteNotifications = function() {
    var notificationToDeleteRef = firebase.database().ref('students/' + $scope.student.id + '/notifications/' + $scope.classroom.id);
    notificationToDeleteRef.remove();
    $scope.closeNotificationsModal();
    $scope.getNotifications();
  }

  /*
    *************************************EVERY SORT FUNCTION GOES HERE***********************
  */

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

  var sortBySurname = function(a, b) {
    var surnameA = a.surname.toUpperCase();
    var surnameB = b.surname.toUpperCase();
    if (surnameA < surnameB) {
      return -12;
    }
    if (surnameA > surnameB) {
      return 1;
    }
    //surnames must be equal
    return 0;
  }

  var sortByDate = function(a, b) {
    var dateA = a.date;
    var dateB = b.date;
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }
    //dates must be equal
    return 0;
  }

  $rootScope.$on('$translateChangeSuccess', function () {
    $scope.actionsRewardsActionSheet = $translate.instant('ACTIONS_REWARDS');
    $scope.buyRewardsActionSheetOption = $translate.instant('BUY_REWARDS');
    $scope.cancelText = $translate.instant('CANCEL');
    $scope.classroomClosedAlert = $translate.instant('CLASS_CLOSED');
    $scope.dataChangedAlert = $translate.instant('DATA_CHANGED');
    $scope.emailChangedAlert = $translate.instant('EMAIL_CHANGED');
    $scope.notEnoughPointsAlert = $translate.instant('NOT_ENOUGH_POINTS');
    $scope.notificationOfStudent = $translate.instant('NOTIFICATION_OF_STUDENT');
    $scope.notificationRewardObtained = $translate.instant('NOTIFICATION_REWARD_OBTAINED');
    $scope.notificationRewardSpent = $translate.instant('NOTIFICATION_REWARD_SPENT');
    $scope.passwordChangedAlert = $translate.instant('PASSWORD_CHANGED');
    $scope.rewardNotificationType = $translate.instant('REWARD');
  });
  
}])