/**
  THIS IS THE CONTROLLER'S STRUCTURE
    *DECLARATIONS FOR NG-SHOW
    *ACTION SHEETS
    *POPOVERS
    *POPOVERS' FUNCTIONS
      -LANGUAGES POPOVER
      -STUDENT HOME POPOVER
      -DEFAULT POPOVER
    *MODALS
    *MODALS' FUNCTIONS
    *DECLARATIONS OF NEEDED VARIABLES AND FUNCTIONS
    *FUNCTIONS IN THE SCREENS
      -FUNCTIONS IN PROFILE
      -FUNCTIONS IN SETTINGS
      -FUNCTIONS IN HOME
      -FUNCTIONS IN ITEMS
      -FUNCTIONS IN ACHIEVEMENTS
      -FUNCTIONS IN TEAMS
      -FUNCTIONS IN REWARDS
      -FUNCTIONS IN MISSIONS
      -FUNCTIONS NOTIFICATIONS
    *SORT FUNCTIONS
*/

angular.module('app.studentController', ['pascalprecht.translate'])

.controller('studentHomeCtrl', ['$scope', '$stateParams', '$http', '$state', '$ionicModal', '$ionicActionSheet', '$ionicPopover', '$firebaseArray', 'sharedData', '$ionicLoading', '$translate', '$rootScope', '$ionicLoading', 'localStorageService', '$ionicPopup',

function ($scope, $stateParams, $http, $state, $ionicModal, $ionicActionSheet, $ionicPopover, $firebaseArray, sharedData, $ionicLoading, $translate, $rootScope, $ionicLoading, localStorageService, $ionicPopup) {

  /**
    *************************************DECLARE FUNCTIONS FOR NG-SHOW********************************
    They work showing the cointainer that depends on the variable with @value: true.
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
    $scope.inItem = false;
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

  /**
    *************************************EVERY ACTIONSHEET GOES HERE*******************************
    Defines what's going to be shown after press the floating button and it's behaviour.
  */

                                          /* REWARDS (STUDENT PART) ACTIONSHEET */

  $scope.showActionsheetRewards = function() {
    $ionicActionSheet.show({
      titleText: $scope.actionsRewardsActionSheet,
      buttons: [
        { text: '<i class="icon ion-card"></i>' + $scope.buyRewardsActionSheetOption },
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
      '<ion-item class="itemPopover" ng-hide="archivedClassroomsToShow" ng-click="closePopoverStudentHome(); showArchivedClassrooms(true)"><i class="icon ion-eye"></i>&nbsp;&nbsp;{{ \'SEE_ARCHIVED_CLASSES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-show="archivedClassroomsToShow" ng-click="closePopoverStudentHome(); showArchivedClassrooms(false)"><i class="icon ion-eye-disabled"></i>&nbsp;&nbsp;{{ \'HIDE_ARCHIVED_CLASSES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverStudentHome(); settingsForm()"><i class="icon ion-gear-a"></i>&nbsp;&nbsp;{{ \'SETTINGS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover log-out-button" ng-click="closePopoverStudentHome(); logOut()"><i class="icon ion-log-out"></i>&nbsp;&nbsp;{{ \'LOG_OUT\' | translate }}</ion-item>'+

    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateStudentDefaultPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverStudentDefault(); teamsForm()"><i class="icon ion-person-stalker"></i>&nbsp;&nbsp;{{ \'SEE_TEAMS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverStudentDefault(); rewardShopForm()"><i class="icon ion-bag"></i>&nbsp;&nbsp;{{ \'REWARD_SHOP\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverStudentDefault(); missionsForm()"><i class="icon ion-map"></i>&nbsp;&nbsp;{{ \'SEE_MISSIONS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverStudentDefault(); settingsForm()"><i class="icon ion-gear-a"></i>&nbsp;&nbsp;{{ \'SETTINGS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover log-out-button" ng-click="closePopoverStudentDefault(); logOut()"><i class="icon ion-log-out"></i>&nbsp;&nbsp;{{ \'LOG_OUT\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  /**
    *************************************EVERY POPOVER FUNCTION GOES HERE*******************************
    Defines the behaviour of each popover.
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
        '<button id="attendance-button123" ng-disabled="!enableSelectButton" ng-click="selectRewards()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.achievementDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{achievement.name}}</h3>'+
      '<div>'+
        '<div class="avatar_margen">'+
          '<div class="teacherAvatar">'+
            '<img src={{achievement.badge}} class="avatar">'+
          '</div>'+
        '</div>'+
        '<ion-list>'+
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
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.teamDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{team.name}}</h3>'+
      '<div>'+
        '<div class="avatar_margen">'+
          '<div class="teacherAvatar">'+
            '<img src={{team.picture}} class="avatar">'+
          '</div>'+
        '</div>'+
        '<form id="teamDialogForm">'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">'+
              '{{ \'TEAM_OBJECTIVE\' | translate }}'+
              '<p>{{team.objective}}</p>'+
            '</span>'+
          '</label>'+
        '</form>'+
        '<div class="button-bar action_buttons">'+
          '<button ng-click="closeModalTeamDialog()" class="button button-calm button-block icon ion-arrow-return-left"></button>'+
        '</div>'+
      '</div>'+
      '<div>'+
        '<h3>{{ \'TEAM_MEMBERS\' | translate}}</h3>'+
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
      '<button class="button button-positive button-block" ng-show="possessedReward" ng-disabled="isArchivedClassroom" ng-click="consumeReward(reward)">{{ \'USE_REWARD\' | translate }}</button>'+
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
              '<span class="input-label">{{ \'FINISH_DATE\' | translate }}:</span>'+
              '<p>{{mission.date | date:\'dd-MM-yyyy\'}}</p>'+
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
      '<div class="button-bar action_buttons"></div>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'REWARDS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'ADDITIONAL_POINTS_MISSION\' | translate }}:</span>'+
          '<p>{{mission.additionalPoints}}</p>'+
        '</label>'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="reward in missionRewards">{{reward.name}}</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons"></div>'+
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
      '<div class="button-bar action_buttons" ng-show="notifications.length > 25">'+
        '<button class="button button-calm button-block" ng-click="closeNotificationsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm button-block" ng-click="deleteNotifications()">{{ \'CLEAN_NOTIFICATIONS\' | translate }}</button>'+
      '</div>'+
      '<ion-list id="attendance-list7" ng-show="!inItem">'+
        '<ion-item id="attendance-checkbox2" ng-repeat="notification in notifications" ng-class="getNotificationClass(notification.typeCode)">{{notification.message}}'+
          '<p>{{notification.type}}</p>'+
        '</ion-item>'+
      '</ion-list>'+
      '<ion-list id="attendance-list7" ng-show="inItem">'+
        '<ion-item id="attendance-checkbox3" ng-repeat="notification in item.notifications" ng-class="getNotificationClass(notification.typeCode)">{{notification.message}}'+
          '<p>{{notification.type}}</p>'+
        '</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm button-block" ng-click="closeNotificationsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm button-block" ng-click="deleteNotifications()">{{ \'CLEAN_NOTIFICATIONS\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  /**
    *************************************EVERY MODAL FUNCTION GOES HERE*******************************
    Defines the behaviour of each modal.
  */

                                        /* SELECT REWARDS MODAL */

  $scope.selectRewardsModal = $ionicModal.fromTemplate($scope.selectRewardsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectRewardsModal = function() {
    $scope.enableSelectButton = false;
    $scope.selectRewardsModal.show();
  }
  $scope.closeSelectRewardsModal = function() {
    $scope.selectRewardsModal.hide();
    $scope.enableSelectButton = false;
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
    $scope.date = $scope.mission.date.getTime();   
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
  
  /**
    Checks if there is a user signed up in the application.
    It is used to prevent the users to enter this page without.
  */
  if (firebase.auth().currentUser === null) {
    $state.go('login');
  }
  
  /**
    Saves the credentials used to log in in the local storage.
  */
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
      //Saves the student into the session and decrypts the student's name and surname.
      var studentsArray = $firebaseArray(studentsRef);
      studentsArray.$loaded(function() {
        $scope.student = studentsArray.$getRecord(sessionUser.uid);
        $scope.student.name = CryptoJS.AES.decrypt($scope.student.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
        $scope.student.surname = CryptoJS.AES.decrypt($scope.student.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
		    $scope.getClassrooms();
      })
    }
  });

  /**
    Needed for the translations to work in the controller's words.
  */
  $translate(['ACTIONS_REWARDS', 'BUY_REWARDS', 'CANCEL', 'CLASS_CLOSED', 'DATA_CHANGED', 'EMAIL_CHANGED', 'INSERT_CLASS_CODE', 'NOT_VALID_HASHCODE', 'MUST_INTRODUCE_HASHCODE', 'NOT_ENOUGH_POINTS', 
    'NOTIFICATION_OF_STUDENT', 'NOTIFICATION_REWARD_OBTAINED', 'NOTIFICATION_REWARD_SPENT', 'PASSWORD_CHANGED', 'REWARD']).then(function(translations) {
    $scope.actionsRewardsActionSheet = translations.ACTIONS_REWARDS;
    $scope.buyRewardsActionSheetOption = translations.BUY_REWARDS;
    $scope.cancelText = translations.CANCEL;
    $scope.classroomClosedAlert = translations.CLASS_CLOSED;
    $scope.dataChangedAlert = translations.DATA_CHANGED;
    $scope.emailChangedAlert = translations.EMAIL_CHANGED;
    $scope.introduceHashcodeText = translations.INSERT_CLASS_CODE;
    $scope.mustintroduceHashcodeText = translations.MUST_INTRODUCE_HASHCODE;
    $scope.notEnoughPointsAlert = translations.NOT_ENOUGH_POINTS;
    $scope.notValidHashcode = translations.NOT_VALID_HASHCODE;
    $scope.notificationOfStudent = translations.NOTIFICATION_OF_STUDENT;
    $scope.notificationRewardObtained = translations.NOTIFICATION_REWARD_OBTAINED;
    $scope.notificationRewardSpent = translations.NOTIFICATION_REWARD_SPENT;
    $scope.passwordChangedAlert = translations.PASSWORD_CHANGED;
    $scope.rewardNotificationType = translations.REWARD;
  });

  /**
    Needed for the translations to change their value in execution time.
  */
  $rootScope.$on('$translateChangeSuccess', function () {
    $scope.actionsRewardsActionSheet = $translate.instant('ACTIONS_REWARDS');
    $scope.buyRewardsActionSheetOption = $translate.instant('BUY_REWARDS');
    $scope.cancelText = $translate.instant('CANCEL');
    $scope.classroomClosedAlert = $translate.instant('CLASS_CLOSED');
    $scope.dataChangedAlert = $translate.instant('DATA_CHANGED');
    $scope.emailChangedAlert = $translate.instant('EMAIL_CHANGED');
    $scope.introduceHashcodeText = $translate.instant('INSERT_CLASS_CODE');
    $scope.mustintroduceHashcodeText = $translate.instant('MUST_INTRODUCE_HASHCODE');
    $scope.notEnoughPointsAlert = $translate.instant('NOT_ENOUGH_POINTS');
    $scope.notValidHashcode = $translate.instant('NOT_VALID_HASHCODE');
    $scope.notificationOfStudent = $translate.instant('NOTIFICATION_OF_STUDENT');
    $scope.notificationRewardObtained = $translate.instant('NOTIFICATION_REWARD_OBTAINED');
    $scope.notificationRewardSpent = $translate.instant('NOTIFICATION_REWARD_SPENT');
    $scope.passwordChangedAlert = $translate.instant('PASSWORD_CHANGED');
    $scope.rewardNotificationType = $translate.instant('REWARD');
  });

  $scope.defaultAvatar = 'img/userDefaultAvatar.png';

  $scope.isArchivedClassroom = false;
  $scope.isIOS = ionic.Platform.isIOS() || ionic.Platform.isIPad();
  
  var itemModal;
  var sessionUser;

  $scope.hasLevel = false;
  $scope.inItem = false;
  
  var rootRef = firebase.database().ref();

  var teachersRef = firebase.database().ref('teachers');
  var studentsRef = firebase.database().ref('students');
  var hashcodesRef = firebase.database().ref('hashcodes');
  var classroomsRef = firebase.database().ref('classrooms');

  $scope.enableSelectButton = false;

  /*
    *************************************EVERY FUNCTIONALITY FUNCTION GOES HERE***********************
  */





                                          /* ALERTS POPUP */
  /**
    @title: The tile of the popup, either an icon or a text.
    @content: The message of the popup.
    Used to create alert popups
  */
  $scope.popupAlertCreate = function(title, content) {
    $ionicPopup.show({
      title: title,
      template: '<p style="text-align:center;">'+content+'</p>',
      buttons: [
        {text: $scope.okayText,}
      ]
    });
  }



                                          /* FUNCTIONS IN PROFILE */

  /**
    Updates the student's avatar with an image uploaded from the local storage and saves it on the firebase storage.
  */
  $scope.updateStudentAvatar = function() {
    var downloadURL;
    var fileButton = document.getElementById('inputAvatar');
    
    fileButton.addEventListener('change',function(e) {
      if (e.target.files.length > 0) {
        $ionicLoading.show();
        var file = e.target.files[0];
        var fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
          var storageRef = firebase.storage().ref('Profile_Pictures/' + sessionUser.uid + '/profilePicture');
          var task = storageRef.put(file);
          task.on('state_changed', function progress(snapshot) {
            
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
          $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.fileInvalidAlert);
        }
      }
    });
  }

  /**
    Updates the student's profile information with either some or all the fields and saves changes on the firebase database.
  */
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
    $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.fileInvalidAlert);
  }

  /**
    Updates the student's password, sends a confirmation email to the user's email and saves changes on the firebase database.
  */
  $scope.updateStudentPassword = function(newPassword) {
    sessionUser.updatePassword(newPassword).then(function() {
      $scope.settingsForm();
      $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.passwordChangedAlert);
    });
  }

  /**
    Updates the student's email, sends a confirmation email to the user's email and saves changes on the firebase database.
  */
  $scope.updateStudentEmail = function(email) {
    sessionUser.updateEmail(email).then(function() {
      var studentEmailRef = firebase.database().ref('students/' + sessionUser.uid + '/email');
      studentEmailRef.set(email);
      $scope.settingsForm();
      $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.emailChangedAlert);
    });
  }




                                        /* FUNCTIONS IN SETTINGS */

  /**
    Logs out the session user.
  */
  $scope.logOut = function() {
    if (firebase.auth().currentUser) {
      $ionicPopup.show({
        title: $scope.systemWarning,
        template: '<p style="text-align:center;">'+$scope.sureYouWannaExit+'</p>',
        buttons: [{
            text: $scope.cancelText,
          },
          {
            text: $scope.okayText,
            onTap: function() {
              var userData = {};
              localStorageService.set('userCredentials', userData);
              
              firebase.auth().signOut();
              $state.go('login');
              $scope.studentHomeForm();
            }
          },
        ]
      })
    }
  }




                                          /* FUNCTIONS IN HOME */

  /**
    Get all the classrooms that the student is part of and saves them in the session.
    Asks firebase for the correspond classrooms' references
    Defines an event for each classroom's reference which is triggered every time that database reference is modified.
    The event saves every classroom in the session.
  */
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

  /**
    Opens a popup with an input to introduce a classroom's hashcode.
  */
  $scope.showPopupAddClass = function() {
    $ionicPopup.show({
      title: $scope.introduceHashcodeText,
      template: '<input id="hashcodeNewClass" ng-model="hashcode">',
      buttons: [
        {text: $scope.cancelText},
        {text: $scope.okayText,
          onTap: function(e) {
            var hashcode = document.getElementById("hashcodeNewClass").value;
            if(hashcode != undefined && hashcode != "") {
              $scope.addClass(hashcode);
            } else {
              $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.mustintroduceHashcodeText);
              e.preventDefault();
            }
          }
        }
      ]
    });
  }

  /**
    @hashcode: Hashcode of the class where the student is going to be part of.
    Adds the student's reference in the classroom's tree on the firebase database.
    Adds that classroom's reference in the student's tree on the firebase database and all the information needed in any classroom.
  */
  $scope.addClass = function(hashcode) {
    hashcode = hashcode.toUpperCase();
    var hashcodesArray = $firebaseArray(hashcodesRef);
    hashcodesArray.$loaded(function() {
      var classToAdd = hashcodesArray.$getRecord(hashcode);
      if(classToAdd != null) {
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
              'picture': $scope.defaultAvatar,
            });
            
            var classToEditRef = firebase.database().ref('classrooms/' + classToAdd.id + '/students/' + $scope.student.$id);
            classToEditRef.set(true);
          } else {
            $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.classroomClosedAlert);
          }
        }).then(function() {
          $scope.getClassrooms();
        })
      } else {
        $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.notValidHashcode);
      }
    })
    $scope.closeModalAddClass();
  }

  /**
    @classroom: The classroom that is going to be saved in the session.
    Saves the classroom selected in the session and get all from it (items, rewards, missions, rules...)
    Defines an event in the student's classroom's reference to get the total points in the class.
  */
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
  }
                    
  
  

                                        /* FUNCTIONS IN ITEMS */

  /**
    Get all the items that are part of the classroom and saves them in the session.
    Asks firebase for the correspond items' references
    Defines an event for each item's reference which is triggered every time that database reference is modified.
    The event saves the items in the session, either in unlocked or locked depending on the student's history.
  */
  $scope.getItems = function() {
    var classroomItemsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/items');
    var itemKeys = $firebaseArray(classroomItemsRef);
    itemKeys.$loaded(function() {
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
                item.notifications = $scope.student.items[item.id].notifications;
                $scope.itemsUnlocked.push(item);
              } else {
                $scope.itemsUnlocked[index] = item;
              }
              $scope.itemsUnlocked.sort(sortByName);
            }
            $scope.getClassroomItems();
          }
          $scope.unlockedItemsExist = $scope.itemsUnlocked.length > 0;
          $scope.lockedItemsExist = $scope.itemsLocked.length > 0;
          if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
          }
        });
      }
    });
    $scope.getStudentLevel();
  }

  /**
    Add the unlocked and locked items to another array formed by both.
  */
  $scope.getClassroomItems = function() {
    $scope.itemsClassroom = [];
    $scope.itemsClassroom = $scope.itemsLocked.concat($scope.itemsUnlocked);
    $scope.itemsClassroom.sort(sortByName);
  }

  /**
    @item: The item that is going to be saved in the session.
    Saves the item selected in the session and get its achievements.
  */
  $scope.setItem = function(item) {
    $scope.item = item;
    $scope.inItem = true;
    $scope.unlockedAchievementsExist = false;
    $scope.lockedAchievementsExist = false;
    $scope.getAchievements();
    $scope.itemsForm();
  }

  /**
    Gets the student's level in the classroom.
    Asks firebase for the correspond levels' references.
    Then check the student's total points with each level's needed points.
  */
  $scope.getStudentLevel = function() {
    $scope.studentLevel = {};
    var classroomLevelsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/');
    var classroomLevelsArray = $firebaseArray(classroomLevelsRef);
    classroomLevelsArray.$loaded(function() {
      for (var element in classroomLevelsArray) {
        if ($scope.student.classrooms[$scope.classroom.id].totalPoints >= classroomLevelsArray[element].requiredPoints) {
          $scope.studentLevel = classroomLevelsArray[element];
          $scope.hasLevel = true;
        }
      }
      if($scope.studentLevel.title == undefined) {
        $scope.hasLevel = false;
      }
    });
  }
                    
  
  

                                        /* FUNCTIONS IN ACHIEVEMENTS */

  /**
    Get all the achievements that are part of the item in the session.
    Asks firebase for the correspond achievements' references
    Defines an event for each achievement's reference which is triggered every time that database reference is modified.
    The event saves the achievements in the session, either in unlocked or locked depending on the student's history 
    and also check for the student's level in the achievement.
  */
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

  /**
    @achievement: The achievement that is going to be saved in the session.
    Saves the achievement selected in the session.
  */
  $scope.setAchievement = function(achievement) {
    $scope.achievement = achievement;
    $scope.unlockedAchievement = (achievement.level != undefined);
    $scope.showModalAchievementDialog();
  }
                    
  
  

                                        /* FUNCTIONS IN TEAMS */

  /**
    Get all the teams from the classroom that the student is part of and saves them in the session.
    Asks firebase for the correspond teams' references
    Defines an event for each team's reference which is triggered every time that database reference is modified.
    The event saves the teams in the session.
  */
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

  /**
    @team: The team that is going to be saved in the session.
    Saves the team selected in the session.
    Defines an event for each team member's reference which is triggered every time that database reference is modified.
    The event saves the members in the session team.
  */
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

  /**
    Get all the rewards that are part of the classroomand saves them in the session.
    Asks firebase for the correspond rewards' references
    Defines an event for each reward's reference which is triggered every time that database reference is modified.
    The event saves the rewards either in unlocked or locked depending on the student's history in the session.
  */
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

  /**
    Add the unlocked and locked rewards in an array for selection purposes.
  */
  $scope.getRewardsForSelection = function() {
    $scope.rewards = $scope.rewardsLocked.concat($scope.rewardsUnlocked);

    $scope.rewards.sort(sortByName);

    $scope.rewardsForSelection = angular.copy($scope.rewards);
    for (var element in $scope.rewardsForSelection) {
      $scope.rewardsForSelection[element].selected = false;
    }
  }

  /**
    @reward: The reward that is going to be saved in the session.
    Saves the reward selected in the session.
    Checks if the student already has the rewards.
  */
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

  /**
    Buys the selected rewards.
    Removes the correspond total price to the student's available points.
    Adds the bought rewards' references to the stundet's tree on the firebase database.
  */
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
      $ionicPopup.show({
      title: '<i class="icon ion-alert-circled"></i>',
      template: '<p style="text-align:center;">' + $scope.notEnoughPointsAlert + ' ' + reward.name + '</p>',
      buttons: [
        {text: $scope.okayText,
          onTap: function(e) {
            $scope.closeSelectRewardsModal();
          }
        },
      ]
    });
    }
  }

  /**
    @reward: The rewards that is going to be spent.
    Spends the the reward and checks the student's quantity of that reward to remove either its reference or 1 amount.
  */
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

  /**
    Gets all the selected rewards in the modal and then calls the buyReward method to buy them.
  */
  $scope.selectRewards = function() {
    for (var element in $scope.rewardsForSelection) {
      if ($scope.rewardsForSelection[element].selected === true) {
        $scope.buyReward($scope.rewardsForSelection[element]);
      }
    }
    $scope.closeSelectRewardsModal();
    $scope.rewardsForSelection = $scope.rewards;
  }

  /**
    @reward: The reward selected.
    Checks if the selected reward it was already selected or not.
  */
  $scope.changeSelectedReward = function(reward) {
    if (reward.selected === false) {
      reward.selected = true;
    } else {
      reward.selected = false;
    }
    $scope.enableSelectButton = false;
    for (var element in $scope.rewardsForSelection) {
      if ($scope.rewardsForSelection[element].selected) {
        $scope.enableSelectButton = true;
        break;
      }
    }
  }

                                            /* FUNCTIONS IN MISSIONS */

  /**
    Get all the missions from the classroom that the student is part of and saves them in the session.
    Asks firebase for the correspond missions' references
    Defines an event for each mission's reference which is triggered every time that database reference is modified.
    The event saves the missions in the session if the student is part of them.
  */
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

  /**
    Get all the students that are part of the classroom and saves them in the session.
    Asks firebase for the correspond students' references
    Defines an event for each student's reference which is triggered every time that database reference is modified.
    The event saves the students in the session.
  */
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

  /**
    @mission: The mission that is going to be saved in the session.
    Saves the mission selected in the session.
    Also checks and retrieves all the mission's items, students and rewards.
  */
  $scope.setMission = function(mission) {
    $scope.mission = mission;
    var dateTimeStamp = new Date($scope.mission.date);
    $scope.mission.date = dateTimeStamp;  
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

  /**
  */
  $scope.getNotificationClass = function(number) {
    var className = '';
    switch (parseInt(number)) {
      case 0:
        className = 'notifi-item';
        break;
      case 1:
        className = 'notifi-achievement';
        break;
      case 2:
        className = 'notifi-mission';
        break;
      case 3:
        className = 'notifi-reward';
        break;
    }
    return className;
  };

  /**
    Get all the notifications from the student in the classroom.
    Asks firebase for the correspond notifications' references
    Defines an event for each notification's reference which is triggered every time that database reference is modified.
    The event saves the notifications in the session.
    Also show the notifications modal to the student if he has any.
  */
  $scope.getNotifications = function() {
    var studentNotificationsRef = firebase.database().ref('students/' + $scope.student.id + '/notifications/' + $scope.classroom.id);
    var studentNotificationsArray = $firebaseArray(studentNotificationsRef);
    studentNotificationsArray.$loaded(function() {
      $scope.notifications = [];
        for (var element in studentNotificationsArray) {
          var notificationKey = studentNotificationsArray[element].$id;
          var studentNotificationRef = firebase.database().ref('students/' + $scope.student.id + '/notifications/' + $scope.classroom.id + '/' + notificationKey);
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

  /**
    @reward: The rewards that the student buyed or consumed.
    @operationType: Buy or consume. Tells the method what message send
    @student: The student that buyed or consumed the reward.
    Creates a notification for the teacher to inform that the student either buyed or consumed the reward.
  */
  $scope.createNotificationRewards = function(reward, operationType, student) {
    var teacherNotificationsRef = firebase.database().ref('teachers/' + $scope.classroom.teacher + '/notifications/' + $scope.classroom.id);
    var teacherNotificationsArray = $firebaseArray(teacherNotificationsRef);
    teacherNotificationsArray.$loaded(function() {
      if (operationType == 'buy') {
        teacherNotificationsArray.$add({
          'type' : $scope.rewardNotificationType,
          'message' : $scope.notificationOfStudent + ' ' + CryptoJS.AES.decrypt(student.name, student.id).toString(CryptoJS.enc.Utf8) + ' ' + CryptoJS.AES.decrypt(student.surname, student.id).toString(CryptoJS.enc.Utf8) + ' ' + $scope.notificationRewardObtained + ' \"' + reward.name + '\"',
          'date' : Date.now(),
          'typeCode': 3,
        });
      } else if (operationType == 'consume') {
        teacherNotificationsArray.$add({
          'type' : $scope.rewardNotificationType,
          'message' : $scope.notificationOfStudent + ' ' + CryptoJS.AES.decrypt(student.name, student.id).toString(CryptoJS.enc.Utf8) + ' ' + CryptoJS.AES.decrypt(student.surname, student.id).toString(CryptoJS.enc.Utf8) + ' ' + $scope.notificationRewardSpent + ' \"' + reward.name + '\" x1',
          'date' : Date.now(),
          'typeCode': 3,
        });
      }
    });
  }

  /**
    Removes all the notifications from the student's tree.
  */
  $scope.deleteNotifications = function() {
    if($scope.inItem) {
      var notificationItemToDelete = firebase.database().ref('students/' + $scope.student.id + '/items/' + $scope.item.id + '/notifications');
      notificationItemToDelete.remove();
      $scope.item.notifications = undefined;
    } else {
      var notificationToDeleteRef = firebase.database().ref('students/' + $scope.student.id + '/notifications/' + $scope.classroom.id);
      notificationToDeleteRef.remove();
      $scope.getNotifications();
    }
    $scope.closeNotificationsModal();
  }

  /*
    *************************************EVERY SORT FUNCTION GOES HERE***********************
  */

  /**
    Sorts an array by name.
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

  /**
    Sorts an array by surname.
  */
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

  /**
    Sorts an array by date.
  */
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
}])