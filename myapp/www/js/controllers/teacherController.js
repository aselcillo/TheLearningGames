angular.module('app.teacherController', ['pascalprecht.translate'])

.controller('teacherHomeCtrl', ['$scope', '$stateParams', '$ionicModal', '$http', '$state', '$ionicPopover', '$ionicActionSheet', '$firebaseObject', '$firebaseArray', '$ionicPopup', 'sharedData', '$ionicLoading', 'localStorageService', '$translate', '$rootScope',

function ($scope, $stateParams, $ionicModal, $http, $state, $ionicPopover, $ionicActionSheet, $firebaseObject, $firebaseArray, $ionicPopup, sharedData, $ionicLoading, localStorageService, $translate, $rootScope) {

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
    if ($scope.teacher.name.length > 32) {
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
      titleText: $scope.actionTeacherHomePopover,
      buttons: [
        { text: $scope.archiveClassroomsActionSheetOption },
        { text: $scope.unarchiveClassroomsActionSheetOption },
        { text: $scope.backupActionSheetOption },
      ],
      destructiveText: $scope.deleteClassroomsActionSheetOption,
      cancelText: $scope.cancelText,
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
      titleText: $scope.actionClassroomStudentsActionSheet,
      buttons: [
        { text: $scope.takeAttendanceActionSheetOption },
        { text: $scope.evaluateStudentsActionSheetOption },
        { text: $scope.sendMessageActionSheetOption },
        { text: $scope.randomStudentActionSheetOption },
      ],
      destructiveText: $scope.deleteStudentsActionSheetOption,
      cancelText: $scope.cancelText,
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
          $scope.showInputMessage = true;
          $scope.showSelectStudentsModal();
        } else if (index === 3) {
          //RANDOM STUDENT
          $scope.getRandomStudent();
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
      titleText: $scope.actionClassroomTeamsActionSheet,
      buttons: [
        { text: $scope.evaluateTeamsActionSheetoption },
        { text: $scope.sendMessageActionSheetOption },
        { text: $scope.randomTeamActionSheetOption },
      ],
      destructiveText: $scope.deleteTeamsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
      },
      buttonClicked: function(index) {
        if (index === 0) {
          //EVALUATE TEAMS ACTION
          $scope.actionSheetClassTeamsType = 'evaluate';
          $scope.showSelectTeamsModal();
        } else if (index === 1) {
          //SEND MESSAGE ACTION
          $scope.showInputMessage = true;
          $scope.showSelectTeamsModal();
        } else if (index === 2) {
          //RANDOM TEAM
          $scope.getRandomTeam();
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
      titleText: $scope.actionItemsActionSheet,
      destructiveText: $scope.deleteItemsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
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
      titleText: $scope.actionAchievementsActionSheet,
      destructiveText: $scope.deleteAchievementsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
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
      titleText: $scope.actionRewardsActionSheet,
      destructiveText: $scope.deleteRewardsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
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
      titleText: $scope.actionMissionsActionSheet,
      destructiveText: $scope.deleteMissionsActionSheetOption,
      cancelText: $scope.cancelText,
      cancel: function() {
        //CANCEL ACTION
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
    *************************************SAVE EVERY POPOVER INTO $scope*******************************
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
      '<ion-item class="itemPopover" ng-click="createDemoClassroom()">{{ \'CREATE_DEMO_CLASS\' | translate}}</ion-item>'+
      '<ion-item class="itemPopover">{{ \'IMPORT\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover">{{ \'EXPORT\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-hide="archivedClassroomsToShow" ng-click="showArchivedClassrooms(true)">{{ \'SEE_ARCHIVED_CLASSES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-show="archivedClassroomsToShow" ng-click="showArchivedClassrooms(false)">{{ \'HIDE_ARCHIVED_CLASSES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverTeacherHome()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateClassStudentsPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassStudents()">{{ \'IMPORT\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassStudents()">{{ \'EXPORT\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="showConfigureLevelsModal()">{{ \'CONFIGURE_LEVELS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover item item-input item-select">'+
        '<div class="input-label">{{ \'STUDENTS_VIEW\' | translate }}'+
        '</div>'+
        '<select>'+
          '<option selected>{{ \'AVATAR\' | translate }}</option>'+
          '<option>{{ \'IMAGE\' | translate }}</option>'+
        '</select>'+
      '</ion-item>'+
      '<ion-toggle class="itemPopover" ng-model="checkboxNotifications" ng-checked="classroom.notifications" ng-click="setNotifications(checkboxNotifications)" toggle-class="toggle-calm">{{ \'NOTIFICATIONS\' | translate }}</ion-toggle>'+
      '<ion-toggle class="itemPopover" ng-model="checkboxOpening" ng-checked="classroom.open" ng-click="setOpening(checkboxOpening)" toggle-class="toggle-calm">{{ \'OPENING\' | translate }}</ion-toggle>'+
      '<ion-item class="itemPopover" ng-click="showHashcodePopup()">{{ \'SEE_CLASS_HASHCODE\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rulesForm(); closePopoverClassStudents()">{{ \'SEE_RULES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverClassStudents()">{{ \'SEE_CLASS_SHOP\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverClassStudents()">{{ \'SEE_MISSIONS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverClassStudents()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateClassTeamsPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassTeams()">{{ \'IMPORT\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverClassTeams()">{{ \'EXPORT\' | translate }}</ion-item>'+
      '<ion-toggle class="itemPopover" ng-model="modelcheckboxotifications" ng-checked="classroom.notifications" ng-click="setNotifications(checkboxNotifications)" toggle-class="toggle-calm">{{ \'NOTIFICATIONS\' | translate }}</ion-toggle>'+
      '<ion-item class="itemPopover" ng-click="rulesForm(); closePopoverClassTeams()">{{ \'SEE_RULES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverClassTeams()">{{ \'SEE_CLASS_SHOP\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverClassTeams()">{{ \'SEE_MISSIONS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverClassTeams()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateMissionsPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverMissions()">{{ \'IMPORT\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverMissions()">{{ \'EXPORT\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-hide="finishedMissionsToShow" ng-click="showFinishedMissions(true)">{{ \'SEE_MISSIONS_ENDED\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-show="finishedMissionsToShow" ng-click="showFinishedMissions(false)">{{ \'HIDE_MISSIONS_ENDED\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rulesForm(); closePopoverMissions()">{{ \'SEE_RULES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverMissions()">{{ \'SEE_CLASS_SHOP\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverMissions()">{{ \'SEE_MISSIONS\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="settingsForm(); closePopoverMissions()">{{ \'SETTINGS\' | translate }}</ion-item>'+
    '</ion-list>'+
  '</ion-popover-view>';

  $scope.templateTeacherDefaultPopover = '<ion-popover-view>'+
    '<ion-list class="list-elements">'+
      '<ion-item class="itemPopover" ng-click="closePopoverTeacherDefault()">{{ \'IMPORT\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="closePopoverTeacherDefault()">{{ \'EXPORT\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rulesForm(); closePopoverTeacherDefault()">{{ \'SEE_RULES\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="rewardShopForm(); closePopoverTeacherDefault()">{{ \'SEE_CLASS_SHOP\' | translate }}</ion-item>'+
      '<ion-item class="itemPopover" ng-click="missionsForm(); closePopoverTeacherDefault()">{{ \'SEE_MISSIONS\' | translate }}</ion-item>'+
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
    *************************************SAVE EVERY MODAL INTO $scope*******************************
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
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_CLASSROOMS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkClassroom" ng-repeat="classForSelection in classroomsForSelection" ng-click="changeSelectedClassroom(classForSelection)" ng-checked="classForSelection.selected" ng-hide="classForSelection.archived === toShow">{{classForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectClassroomsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectClassrooms()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectStudentsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<div ng-show="showInputMessage">'+
        '<h3>{{ \'SEND_MESSAGE\' | translate }}</h3>'+
        '<label class="item item-input" id="signUp-input3">'+
          '<span class="inputLabelProfile">'+
            '<i class="icon ion-paper-airplane"></i>&nbsp;&nbsp;{{ \'MESSAGE\' | translate }}:'+
            '<input id="inputMessage" type="text" ng-model="modelSelectStudents.message">'+
          '</span>'+
        '</label>'+
      '</div>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_STUDENTS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkStudent" class="list-student" ng-repeat="studentForSelection in studentsForSelection" ng-click="changeSelectedStudent(studentForSelection)" ng-checked="studentForSelection.selected">'+
          '<p>{{studentForSelection.name}}</p>'+
          '<p>{{studentForSelection.surname}}</p>'+
        '</ion-checkbox>'+  
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectStudentsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-hide="showInputMessage" id="attendance-button123" ng-click="selectStudents()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
        '<button ng-show="showInputMessage" id="attendance-button124" ng-click="selectStudentsForMessage(modelSelectStudents.message)" id="attendance-btn123" class="button button-calm  button-block">{{ \'SEND_MESSAGE\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectItemsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_ITEMS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkItem" ng-repeat="itemForSelection in itemsForSelection" ng-click="changeSelectedItem(itemForSelection)" ng-checked="itemForSelection.selected">{{itemForSelection.name}} {{itemForSelection.score}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
      '<button class="button button-calm  button-block" ng-click="closeSelectItemsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectItems()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectAchievementsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_ACHIEVEMENTS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkAchievement" ng-repeat="achievementForSelection in achievementsForSelection" ng-click="changeSelectedAchievement(achievementForSelection)" ng-checked="achievementForSelection.selected">{{achievementForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectAchievementsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectAchievements()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectTeamsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<div ng-show="showInputMessage">'+
        '<h3>{{ \'SEND_MESSAGE\' | translate }}</h3>'+
        '<label class="item item-input" id="signUp-input3">'+
          '<span class="inputLabelProfile">'+
            '<i class="icon ion-paper-airplane"></i>&nbsp;&nbsp;{{ \'MESSAGE\' | translate }}:'+
            '<input id="inputMessage" type="text" ng-model="modelSelectTeams.message">'+
          '</span>'+
        '</label>'+
      '</div>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_TEAMS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkTeam" ng-repeat="teamForSelection in teamsForSelection" ng-click="changeSelectedTeam(teamForSelection)" ng-checked="teamForSelection.selected">{{teamForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectTeamsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-hide="showInputMessage" id="attendance-button123" ng-click="selectTeams()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
        '<button ng-show="showInputMessage" id="attendance-button124" ng-click="sendMessageTeams(modelSelectTeams.message)" id="attendance-btn123" class="button button-calm  button-block">{{ \'SEND_MESSAGE\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.selectRewardsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
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

  $scope.selectMissionsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 id="attendance-heading3" class="attendance-hdg3">{{classroomName}}</h3>'+
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'SELECT_MISIONS\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-checkbox id="attendance-checkbox2" name="checkMission" ng-repeat="missionForSelection in missionsForSelection" ng-click="changeSelectedMission(missionForSelection)" ng-checked="missionForSelection.selected">{{missionForSelection.name}}</ion-checkbox>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeSelectMissionsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" ng-click="selectMissions()" id="attendance-btn123" class="button button-calm  button-block">{{ \'SELECT\' | translate }}</button>'+
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
            '<span class="input-label">{{ \'COPY_ELEMENTS_FROM_ANOTHER_CLASS\' | translate }}</span>'+
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
      '<h3 id="attendance-heading3" class="attendance-hdg3">{{ \'LEVELS_CONFIGURATION\' | translate }}</h3>'+
      '<ion-list id="attendance-list7" class="list-elements">'+
        '<ion-item id="attendance-checkbox2" name="checkItem" ng-repeat="level in levels" ng-click="setLevel(level)">{{level.level}}. {{level.title}}&nbsp;&nbsp;&nbsp;<i class="icon ion-chevron-left float_right"/>'+
          '<ion-option-button class="button-assertive" ng-click="deleteLevel(level)">{{ \'DELETE\' | translate }}</ion-option-button>'+
        '</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm button-block" ng-click="closeConfigureLevelsModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button id="attendance-button123" id="attendance-btn123" class="button button-calm button-block" ng-click="showNewLevelModal()">{{ \'ADD_LEVEL\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newLevelModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
     '<h3>{{ \'NEW_LEVEL\' | translate }}</h3>'+
      '<form id="newItemForm" class="list list-student fullScreen">'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_TITLE\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'LEVEL_TITLE\' | translate }}" ng-model="modelNewLevel.title">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_LEVEL\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'LEVEL_LEVEL\' | translate }}" ng-model="modelNewLevel.level">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_REQUIRED_POINTS\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'LEVEL_REQUIRED_POINTS\' | translate }}" ng-model="modelNewLevel.requiredPoints">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeNewLevelModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="createLevel(modelNewLevel.title, modelNewLevel.level, modelNewLevel.requiredPoints)" ng-disabled="!modelNewLevel.title || !modelNewLevel.level || !modelNewLevel.requiredPoints">{{ \'ADD_LEVEL\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editLevelModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
     '<h3>{{ \'EDIT_LEVEL\' | translate }}</h3>'+
      '<form id="newItemForm" class="list list-student fullScreen">'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_TITLE\' | translate }}</span>'+
            '<input type="text" placeholder="{{level.title}}" ng-model="modelEditLevel.title">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_LEVEL\' | translate }}</span>'+
            '<input type="number" placeholder="{{level.level}}" ng-model="modelEditLevel.level">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'LEVEL_REQUIRED_POINTS\' | translate }}</span>'+
            '<input type="number" placeholder="{{level.requiredPoints}}" ng-model="modelEditLevel.requiredPoints">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeEditLevelModal()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="editLevel(modelEditLevel.title, modelEditLevel.level, modelEditLevel.requiredPoints)" ng-disabled="!modelEditLevel.title && !modelEditLevel.level && !modelEditLevel.requiredPoints">{{ \'EDIT_LEVEL\' | translate }}</button>'+
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
      '<div class="avatar_margen">'+
        '<div class="teacherAvatar">'+
          '<img src={{defaultAvatar}} class="avatar">'+
        '</div>'+
      '</div>'+
      '<button  class="button button-light  button-block button-outline">{{ \'TAKE_PICTURE\' | translate }}</button>'+
      '<div>'+
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
          '</form>'+
          '<h3>{{ \'EMAI_AUTOGENERATE\' | translate }}</h3>'+
          '<h3>{{ \'PASSWORD\' | translate }}: student</h3>'+
        '</ion-list>'+
      '</div>'+
      '<div>'+
        '<form class="list">'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalNewStudentDialog()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-disabled="!modelNewStudent.name || !modelNewStudent.surname" ng-click="createNewStudent(modelNewStudent.name, modelNewStudent.surname)">{{ \'CREATE\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>)';

  $scope.studentDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{student.name}} {{student.surname}}</h3>'+
      '<div>'+
      '<div class="avatar_margen">'+
        '<div class="teacherAvatar">'+
          '<img src={{student.avatar}} class="avatar">'+
        '</div>'+
      '</div>'+
      '<input class="button button-light button-block button-outline" type="file" id="inputStudentPicture" ng-click="updateStudentPicture()">'+
        '<form id="studentProfileFormData" class="list">'+
          '<ion-list id="signUp-list2">'+
            '<label class="item item-input list-elements" id="signUp-input3">'+
              '<span class="inputLabelProfile">'+
                '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'LEVEL_IN_CLASS\' | translate }}'+
                '<p>{{student.level.level}}&nbsp;({{student.level.title}})</p>'+
              '</span>'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input3">'+
              '<span class="inputLabelProfile">'+
                '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'TOTAL_POINTS_CLASS\' | translate }}'+
                '<p>{{student.classrooms[classroom.id].totalPoints}}</p>'+
              '</span>'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input3">'+
              '<span class="inputLabelProfile">'+
                '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'SCHOOL\' | translate }}'+
                '<p>{{student.school}}</p>'+
              '</span>'+
            '</label>'+
            '<label class="item item-input list-elements" id="signUp-input5">'+
              '<span class="inputLabelProfile">'+
                '<i class="icon ion-at"></i>&nbsp;&nbsp;{{ \'EMAIL\' | translate }}'+
                '<p>{{student.email}}</p>'+
              '</span>'+
            '</label>'+
          '</ion-list>'+
        '</form>'+
      '</div>'+
      '<div ng-show="studentHasItems">'+
        '<h3>{{ \'ITEMS\' | translate }}</h3>'+
        '<ion-list>'+
          '<ion-item class="list-student-dialog" ng-repeat="item in studentItems">'+
            '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{item.name}}'+
            '<span class="item-note">{{item.points}} / {{item.maxScore}}&nbsp;&nbsp;&nbsp;<i class="icon ion-chevron-left float_right"/></span>'+
            '<ion-option-button class="button-assertive" ng-click="removePoints(item)">'+
              '<i class="icon ion-minus-round"></i>'+
            '</ion-option-button>'+
            '<ion-option-button class="button-calm" ng-click="addPoints(item)">'+
              '<i class="icon ion-plus-round"></i>'+
            '</ion-option-button>'+
        '</ion-list>'+
      '</div>'+
      '<div class="button-bar action_buttons">'+
        '<button ng-click="closeModalStudentDialog()" class="button button-light button-block button-outline icon ion-arrow-return-left"></button>'+
        '<button ng-click="showModalSecondary()" class="button button-light button-block button-outline icon ion-android-more-horizontal"></button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.quantityRandomTeamsModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'SELECT_QUANTITY_RANDOM_TEAMS\' | translate }}</h3>'+
	  '<input class="item item-input" id="quantityInput" type="number" ng-model="modelQuantity.quantity">'+
	  '<div class="button-bar action_buttons">'+
		'<button class="button button-calm  button-block" ng-click="closeModalQuantityRandomTeams()">{{ \'CANCEL\' | translate }}</button>'+
		'<button class="button button-calm  button-block" ng-click="createRandomTeams(modelQuantity.quantity)">{{ \'CREATE_RANDOM_TEAMS\' | translate }}</button>'+
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
      '<input class="button button-light button-block button-outline" type="file" id="inputTeamPicture" ng-click="updateTeamPicture()">'+
        '<form id="teamDialogForm">'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{team.name}}" ng-model="modelTeamDialog.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'TEAM_OBJECTIVE\' | translate }}</span>'+
            '<input type="text" placeholder="{{team.objective}}" ng-model="modelTeamDialog.objective">'+
          '</label>'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalTeamDialog()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-disabled="!modelTeamDialog.name && !modelTeamDialog.objective" ng-click="editTeam(modelTeamDialog.name, modelTeamDialog.objective)">{{ \'EDIT_TEAM\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
      '<div>'+
        '<ion-list>'+
          '<ion-item class="list-student" ng-repeat="teamMember in teamMembers">{{teamMember.name}} {{teamMember.surname}}</ion-item>'+
        '</ion-list>'+
      '</div>'+
      '<button ng-click="showModalEditMembers()" class="button button-calm button-block">{{ \'EDIT_MEMBERS\' | translate }}</button>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.newTeamDialogModal = '<ion-modal-view>'+
    '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
      '<h3>New Team</h3>'+
      '<div>'+
        '<div class="avatar_margen">'+
          '<div class="teacherAvatar">'+
            '<img src={{defaultTeamAvatar}} class="avatar">'+
          '</div>'+
        '</div>'+
        '<form id="newTeamForm">'+
          '<button  class="button button-light  button-block button-outline">{{ \'UPLOAD_AVATAR\' | translate }}</button>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewTeamDialog.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'TEAM_OBJECTIVE\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'TEAM_OBJECTIVE\' | translate }}" ng-model="modelNewTeamDialog.objective">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'IMAGE\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'IMAGE\' | translate }}" ng-model="modelNewTeamDialog.picture">'+
          '</label>'+
          '<div class="button-bar action_buttons">'+
            '<button class="button button-calm  button-block" ng-click="closeModalNewTeamDialog()">{{ \'CANCEL\' | translate }}</button>'+
            '<button class="button button-calm  button-block" ng-disabled="!modelNewTeamDialog.name || !modelNewTeamDialog.objective" ng-click="createTeam(modelNewTeamDialog.name, modelNewTeamDialog.objective, modelNewTeamDialog.picture)">{{ \'CREATE\' | translate }}</button>'+
          '</div>'+
        '</form>'+
      '</div>'+
      '<div>'+
        '<h3>{{ \'TEAM_MEMBERS\' | translate}}</h3>'+
        '<ion-list>'+
          '<ion-checkbox class="list-student" ng-repeat="studentForTeamSelection in studentsForTeamSelection" ng-checked="studentForTeamSelection.selected" ng-click="changeSelectedStudentForTeam(studentForTeamSelection)">{{studentForTeamSelection.name}} {{studentForTeamSelection.surname}}</ion-checkbox>'+
        '</ion-list>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMembersModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'EDIT_MEMBERS\' | translate }}</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="studentForTeamSelection in studentsForTeamSelection" ng-checked="studentForTeamSelection.inTeam" ng-click="inTeam(studentForTeamSelection)">{{studentForTeamSelection.name}} {{studentForTeamSelection.surname}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMembers()" class="button button-calm button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editTeamMembers()" class="button button-calm button-block">{{ \'EDIT_MEMBERS\' | translate }}</button>'+
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
              '<span class="input-label">{{ \'ITEMS\' | translate }}</span>'+
              '<input type="text" ng-disabled="mission.finished" placeholder="{{mission.additionalPoints}}" ng-model="modelEditMission.additionalPoints">'+
            '</label>'+
          '</ion-list>'+
        '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalEditMission()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-disabled="!modelEditMission.name && !modelEditMission.additionalPoints" ng-click="editMission(modelEditMission.name, modelEditMission.additionalPoints)">EDITAR MISIÓN</button>'+
      '</div>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'ADDITIONAL_POINTS_MISSION\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="item in missionItems">'+
          '{{item.name}}'+
          '<p>{{ \'NEEDED_POINTS\' | translate }}: {{item.neededPoints}}</p>'+
        '</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="achievements-button91" class="button button-calm button-block" ng-disabled="mission.finished" ng-click="showModalEditMissionItems()">{{ \'EDIT_ITEMS\' | translate }}</button>'+
      '</div>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'REWARDS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="reward in missionRewards">{{reward.name}}</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="achievements-button91" class="button button-calm button-block" ng-disabled="mission.finished" ng-click="showModalEditMissionRewards()">{{ \'EDIT_REWARDS\' | translate }}</button>'+
      '</div>'+
      '<h3 id="teams-heading5" class="teams-hdg5">{{ \'STUDENTS\' | translate }}</h3>'+
      '<ion-list id="items-list9">'+
        '<ion-item id="items-list-item15" class="list-student" ng-repeat="student in missionStudents">{{student.name}}  {{student.surname}}</ion-item>'+
      '</ion-list>'+
      '<div class="button-bar action_buttons">'+
        '<button id="achievements-button91" class="button button-calm button-block" ng-disabled="mission.finished" ng-click="showModalEditMissionMembers()">{{ \'EDIT_STUDENTS\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionItemsModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'EDIT_ITEMS\' | translate }}</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="itemForMissionSelection in itemsForMissionSelection" ng-checked="itemForMissionSelection.inMission" ng-click="inMission(itemForMissionSelection)">{{itemForMissionSelection.name}} {{itemForMissionSelection.score}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMissionItems()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editMissionItems()" class="button button-calm  button-block">{{ \'EDIT_ITEMS\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionRewardsModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'EDIT_REWARDS\' | translate }}</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="rewardForMissionSelection in rewardsForMissionSelection" ng-checked="rewardForMissionSelection.inMission" ng-click="inMission(rewardForMissionSelection)">{{rewardForMissionSelection.name}} {{rewardForMissionSelection.price}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMissionRewards()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editMissionRewards()" class="button button-calm  button-block">{{ \'EDIT_REWARDS\' | translate }}</button>'+
      '</div>'+
    '</ion-content>'+
  '</ion-modal-view>';

  $scope.editMissionMembersModal = '<ion-modal-view>'+
    '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
      '<h3>{{ \'EDIT_STUDENTS\' | translate }}</h3>'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team" ng-repeat="studentForMissionSelection in studentsForMissionSelection" ng-checked="studentForMissionSelection.inMission" ng-click="inMission(studentForMissionSelection)">{{studentForMissionSelection.name}} {{studentForMissionSelection.surname}}</ion-checkbox>'+
      '</ion-list>'+
      '<div>'+
        '<button ng-click="closeModalEditMissionMembers()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
        '<button ng-click="editMissionMembers()" class="button button-calm  button-block">{{ \'EDIT_STUDENTS\' | translate }}</button>'+
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
          '<ion-toggle toggle-class="toggle-calm" ng-model="modelNewItem.useForLevel">{{ \'USE_FOR_LEVEL\' | translate }}</ion-toggle>'+
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
          '<span class="input-label">{{ \'MAX_LEVEL\' | translate }}</span>'+
          '<input type="number" placeholder="{{ \'MAX_LEVEL\' | translate }}" ng-model="modelNewAchievement.maxLevel">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'BADGE\' | translate }}</span>'+
          '<input type="number" placeholder="{{ \'BADGE\' | translate }}" ng-model="modelNewAchievement.badge">'+
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
        '<h3>{{ \'NEW_REWARD\' | translate }}</h3>'+
        '<ion-list>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'NAME\' | translate }}" ng-model="modelNewReward.name">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'DESCRIPTION\' | translate }}" ng-model="modelNewReward.description">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'PERMISSION\' | translate }}</span>'+
            '<input type="text" placeholder="{{ \'PERMISSION\' | translate }}" ng-model="modelNewReward.permission">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'PRICE\' | translate }}</span>'+
            '<input type="number" placeholder="{{ \'PRICE\' | translate }}" ng-model="modelNewReward.price">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalNewReward()" >{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-click="createReward(modelNewReward.name, modelNewReward.description, modelNewReward.permission, modelNewReward.price)" ng-disabled=" !modelNewReward.name || !modelNewReward.description || !modelNewReward.permission || !modelNewReward.price">{{ \'ADD_REWARD\' | translate }}</button>'+
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
            '<span class="input-label">{{ \'PERMISSION\' | translate }}</span>'+
            '<input type="text" placeholder="{{reward.permission}}" ng-model="modelEditReward.permission">'+
          '</label>'+
          '<label class="item item-input list-elements">'+
            '<span class="input-label">{{ \'PRICE\' | translate }}</span>'+
            '<input type="number" placeholder="{{reward.price}}" ng-model="modelEditReward.price">'+
          '</label>'+
        '</ion-list>'+
      '</form>'+
      '<div class="button-bar action_buttons">'+
        '<button class="button button-calm  button-block" ng-click="closeModalEditReward()">{{ \'CANCEL\' | translate }}</button>'+
        '<button class="button button-calm  button-block" ng-disabled="!modelEditReward.name && !modelEditReward.description && !modelEditReward.permission && !modelEditReward.price" ng-click="editReward(modelEditReward.name, modelEditReward.description, modelEditReward.permission, modelEditReward.price)">{{ \'EDIT_REWARD\' | translate }}</button>'+
      '</div>'+
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
  $scope.showAttendanceModal = function() {
    $scope.attendanceModal.show();
    $scope.date = Date.now(); 
  }
  $scope.closeAttendanceModal = function() {
    $scope.attendanceModal.hide();
  }

                                        /* SELECT CLASSROOMS MODAL */

  $scope.selectClassroomsModal = $ionicModal.fromTemplate($scope.selectClassroomsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectClassroomsModal = function() {
    $scope.getClassroomsForSelection();
    $scope.selectClassroomsModal.show();
  }
  $scope.closeSelectClassroomsModal = function() {
    $scope.selectClassroomsModal.hide();
  }

                                        /* SELECT STUDENTS MODAL */

  $scope.selectStudentsModal = $ionicModal.fromTemplate($scope.selectStudentsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectStudentsModal = function() {
    $scope.modelSelectStudents = {};
    $scope.getStudentsForSelection();
    $scope.selectStudentsModal.show();
  }
  $scope.closeSelectStudentsModal = function() {
    $scope.selectStudentsModal.hide();
    $scope.showInputMessage = false;
  }

                                        /* SELECT ITEMS MODAL */

  $scope.selectItemsModal = $ionicModal.fromTemplate($scope.selectItemsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectItemsModal = function() {
    if ($scope.newMissionModal != undefined) {
      if ($scope.newMissionModal.isShown()) {
        $scope.newMissionModal.hide();
        modalMissions = 1;
      }
    }

    if ($scope.editMissionModal != undefined) {
      if ($scope.editMissionModal.isShown()) {
        $scope.editMissionModal.hide();
        modalMissions = 2;
      }
    }
    $scope.getItemsForSelection();
    $scope.selectItemsModal.show();
  }
  $scope.closeSelectItemsModal = function() {
    $scope.selectItemsModal.hide();
    if (modalMissions != undefined) {
      if (modalMissions == 1) {
        $scope.newMissionModal.show();
      }
      if (modalMissions == 2) {
        $scope.editMissionModal.show();
      }
    }
  }

                                        /* SELECT ACHIEVEMENTS MODAL */

  $scope.selectAchievementsModal = $ionicModal.fromTemplate($scope.selectAchievementsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectAchievementsModal = function() {
    $scope.getAchievementsForSelection();
    $scope.selectAchievementsModal.show();
  }
  $scope.closeSelectAchievementsModal = function() {
    $scope.selectAchievementsModal.hide();
  }
  
                                        /* SELECT TEAMS MODAL */

  $scope.selectTeamsModal = $ionicModal.fromTemplate($scope.selectTeamsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectTeamsModal = function() {
    $scope.modelSelectTeams = {};
    $scope.getTeamsForSelection();
    $scope.selectTeamsModal.show();
  } 
  $scope.closeSelectTeamsModal = function() {
    $scope.selectTeamsModal.hide();
    $scope.showInputMessage = false;
  }

                                        /* SELECT REWARDS MODAL */

  $scope.selectRewardsModal = $ionicModal.fromTemplate($scope.selectRewardsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectRewardsModal = function() {
    $scope.getRewardsForSelection();
    $scope.selectRewardsModal.show();
  }
  $scope.closeSelectRewardsModal = function() {
    $scope.selectRewardsModal.hide();
  }

                                        /* SELECT MISSIONS MODAL */

  $scope.selectMissionsModal = $ionicModal.fromTemplate($scope.selectMissionsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showSelectMissionsModal = function() {
    $scope.getMissionsForSelection();
    $scope.selectMissionsModal.show();
  }
  $scope.closeSelectMissionsModal = function() {
    $scope.selectMissionsModal.hide();
  }

                                        /* NEW CLASS MODAL */

  $scope.newClassModal = $ionicModal.fromTemplate($scope.newClassModal, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.showModalNewClass = function() {
    $scope.modelNewClass = {};
    $scope.newClassModal.show();  
  }
  $scope.closeModalNewClass = function() {
    $scope.newClassModal.hide();
  }

                                        /* SECONDARY MENU MODAL */

  $scope.secondaryMenuModal = $ionicModal.fromTemplate( $scope.secondaryMenuModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalSecondary = function() {
    if ($scope.studentDialogModal != undefined) {
      if ($scope.studentDialogModal.isShown()) {
        $scope.studentDialogModal.hide();
        modalFirst = 1;
      }
    }
    if ($scope.newStudentModal != undefined) {
      if ($scope.newStudentModal.isShown()) {
        $scope.newStudentModal.hide();
        modalFirst = 2;
      }
    }
    $scope.secondaryMenuModal.show();  
  }
  $scope.closeModalSecondary = function() {
	$scope.clearFormSecundaryModal();
    $scope.secondaryMenuModal.hide();
    if (modalFirst != undefined) {
      if (modalFirst == 1)
        $scope.studentDialogModal.show(); 
      if (modalFirst == 2)
        $scope.newStudentModal.show();
    }
  }

                                        /* NEW STUDENT DIALOG MODAL */

  $scope.newStudentModal = $ionicModal.fromTemplate($scope.newStudentModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewStudentDialog = function() {
    $scope.modelNewStudent = {};
    $scope.newStudentModal.show();  
  }
  $scope.closeModalNewStudentDialog = function() {
    $scope.newStudentModal.hide();
  }

                                        /* STUDENT DIALOG MODAL */

  $scope.studentDialogModal = $ionicModal.fromTemplate($scope.studentDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalStudentDialog = function() {
    $scope.studentDialogModal.show();  
  }
  $scope.closeModalStudentDialog = function() {
    $scope.studentDialogModal.hide();
  }
  
                                          /* QUANTITY RANDOM TEAMS MODAL */

  $scope.quantityRandomTeamsModal = $ionicModal.fromTemplate($scope.quantityRandomTeamsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalQuantityRandomTeams = function() {
    $scope.modelQuantity = {};
    $scope.quantityRandomTeamsModal.show();  
  }
  $scope.closeModalQuantityRandomTeams = function() {
    $scope.quantityRandomTeamsModal.hide();
  }

                                        /* TEAM DIALOG MODAL */  

  $scope.teamDialogModal = $ionicModal.fromTemplate($scope.teamDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalTeamDialog = function() {
    $scope.modelTeamDialog = {};
    $scope.teamDialogModal.show();  
  }
  $scope.closeModalTeamDialog = function() {
    $scope.teamDialogModal.hide();
  }

                                        /* NEW TEAM DIALOG MODAL */

  $scope.newTeamDialogModal = $ionicModal.fromTemplate($scope.newTeamDialogModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewTeamDialog = function() {
    $scope.modelNewTeamDialog = {};
    $scope.getStudentsForTeamSelection();
    $scope.newTeamDialogModal.show();  
  }
  $scope.closeModalNewTeamDialog = function() {
    $scope.newTeamDialogModal.hide();
  }

                                        /* EDIT TEAM MEMBERS MODAL */

  $scope.editMembersModal = $ionicModal.fromTemplate($scope.editMembersModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMembers = function() {
    $scope.editMembers = true;
    $scope.getStudentsForTeamSelection();
    $scope.editMembersModal.show();  
  }
  $scope.closeModalEditMembers = function() {
    $scope.editMembersModal.hide();
  }

                                        /* EDIT MISSION MODAL */

  $scope.editMissionModal = $ionicModal.fromTemplate($scope.editMissionModal,  {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMission = function() {
    if (modalMissions != undefined) {
      if (modalMissions == 0) {
        $scope.modelEditMission = {};  
      }
    }
    $scope.editMissionModal.show();  
  }
  $scope.closeModalEditMission = function() {
    $scope.editMissionModal.hide();
    modalMissions = 0;
  }

                                            /* EDIT MISSION ITEMS MODAL */

  $scope.editMissionItemsModal = $ionicModal.fromTemplate($scope.editMissionItemsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMissionItems = function() {
    $scope.editingMissionItems = true;
    $scope.getItemsForMissionSelection();
    $scope.editMissionItemsModal.show();  
  }
  $scope.closeModalEditMissionItems = function() {
    $scope.editMissionItemsModal.hide();
  }

                                          /* EDIT MISSION REWARDS MODAL */

  $scope.editMissionRewardsModal = $ionicModal.fromTemplate($scope.editMissionRewardsModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMissionRewards = function() {
    $scope.editingMissionRewards = true;
    $scope.getRewardsForMissionSelection();
    $scope.editMissionRewardsModal.show();  
  }
  $scope.closeModalEditMissionRewards = function() {
    $scope.editMissionRewardsModal.hide();
  }

                                          /* EDIT MISSION MEMBERS MODAL */

  $scope.editMissionMembersModal = $ionicModal.fromTemplate($scope.editMissionMembersModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditMissionMembers = function() {
    $scope.editingMissionMembers = true;
    $scope.getMembersForMissionSelection();
    $scope.editMissionMembersModal.show();  
  }
  $scope.closeModalEditMissionMembers = function() {
    $scope.editMissionMembersModal.hide();
  }

                                        /* NEW ITEM MODAL */

  $scope.newItemModal = $ionicModal.fromTemplate($scope.newItemModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewItem = function() {
    $scope.modelNewItem = {};
    $scope.newItemModal.show();  
  }
  $scope.closeModalNewItem = function() {
    $scope.newItemModal.hide();
  }

                                        /* NEW ACHIEVEMENT MODAL */

  $scope.newAchievementModal = $ionicModal.fromTemplate($scope.newAchievementModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewAchievement = function() {
    $scope.modelNewAchievement = {};
    $scope.newAchievementModal.show();  
  }
  $scope.closeModalNewAchievement = function() {
    $scope.newAchievementModal.hide();
  }

                                       /* NEW REWARD MODAL */
  $scope.newRewardModal = $ionicModal.fromTemplate($scope.newRewardModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalNewReward = function() {
    $scope.modelNewReward = {};
    $scope.newRewardModal.show();  
  } 
  $scope.closeModalNewReward = function() {
    $scope.newRewardModal.hide();
  }

                                        /* EDIT REWARD MODAL */

  $scope.editRewardModal = $ionicModal.fromTemplate($scope.editRewardModal, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.showModalEditReward = function() {
    $scope.modelEditReward = {};
    $scope.editRewardModal.show();  
  }
  $scope.closeModalEditReward = function() {
    $scope.editRewardModal.hide();
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
    *************************************CLEAN FORM FUNCTIONS GOES HERE*******************************
  */

  $scope.clearFormSecundaryModal = function() {
    var selectTeam = document.getElementById("selectTeam").selectedIndex = 0;
    var selectCopy = document.getElementById("selectCopy").selectedIndex = 0;
  }

  /*
    *************************************DECLARE VARIABLES & GIVE TO $scope ALL THE VALUES WE NEED****
  */

  if (firebase.auth().currentUser === null) {
    $state.go('login');
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user && sharedData.getData() === 'teacher') {
      sessionUser = firebase.auth().currentUser;
      firebase.auth().currentUser.getToken(true).then(function(idToken) {
        var userData = {
          'sessionUserId' : sessionUser.uid,
          'token' : idToken,
          'type' : 'teacher',
        };

        localStorageService.set('userCredentials', userData);
      });

      var teachersArray = $firebaseArray(teachersRef);
      teachersArray.$loaded(function() {
        $scope.teacher = teachersArray.$getRecord(sessionUser.uid);
        $scope.teacher.name = CryptoJS.AES.decrypt($scope.teacher.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
        $scope.teacher.surname = CryptoJS.AES.decrypt($scope.teacher.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
        $scope.getClassrooms();
      })
    }
  });

  $translate(['ACTIONS_ACHIEVEMENTS', 'ACTIONS_CLASSROOM_STUDENTS', 'ACTIONS_CLASSROOM_TEAMS', 
    'ACTIONS_ITEMS', 'ACTION_MISSIONS', 'ACTIONS_REWARDS', 'ACTIONS_TEACHER_HOME', 'ACHIEVEMENT', 'ARCHIVE_CLASSES', 
    'BACKUP', 'BECAUSE_COMPLETE_MISSION', 'CANCEL', 'CANT_ASK_MORE_SCORE_THAN_MAX', 'CANT_CREATE_MORE_TEAMS_THAN_STUDENT', 'CHANGE_SCORE', 'CLASS_CODE', 'DATA_CHANGED',
    'DELETE_ACHIEVEMENTS', 'DELETE_CLASSROOMS', 'DELETE_ITEMS', 'DELETE_MISSIONS', 'DELETE_REWARDS', 'DELETE_STUDENTS', 'DELETE_TEAMS', 'EDIT_SCORE', 'EMAIL_ALREADY_USED', 
    'EMAIL_CHANGED', 'EMAIL_INVALID', 'EVALUATE_STUDENTS', 'EVALUATE_TEAMS', 'EXPORT', 'FILE_INVALID', 'IMPORT', 'INTRODUCE_MISSION_NAME', 
    'INTRODUCE_ADDITIONAL_POINTS', 'ERROR_ACCESS_UNKNOW', 'ERROR_WEAK_PASSWORD', 'HAS_FINISHED', 'HAS_FINISHED_MISSION', 'HAS_LOST_ACHIEVEMENT', 'HAS_LOST_MIN_POINTS_IN_ITEM', 'HAS_LOST_MIN_POINTS_IN_ITEM', 
    'HAS_RECIBED_MAX_POINTS_IN_ITEM', 'HAS_UNLOCKED_LEVEL_ACHIEVEMENT', 'HAVE_FINISHED_MISSION', 'HAVE_LOST_ACHIEVEMENT',  'HAVE_UNLOCKED_LEVEL_ACHIEVEMENT', 'IN_THE_ACHIEVEMENT', 
    'INTRODUCE_MISSION_NAME', 'ITEM', 'MAX_SCORE_ESTABLISEHD', 'MAX_SCORE_WILL_ESTABLISH', 'MISSION',
    'NEXT', 'NOTIFICATION_OF_MISSION', 'NOTIFICATION_OF_STUDENT', 'NOTIFICATION_HAS_LOST' , 'NOTIFICATION_HAS_WIN', 'PASSWORD_CHANGED', 'POINTS_ON_THE_ITEM',
    'RANDOM_STUDENT', 'RANDOM_TEAM', 'REWARD', 'SEND_MESSAGE', 'STUDENT_DOESNT_HAVE_ENOUGH_POINTS', 'TAKE_ATTENDANCE', 'TEACHER_MESSAGE', 
    'UNARCHIVE_CLASSES', 'USE_DEFAULT_POINT', 'YOU_WIN_REWARD', 'ZERO_SCORE_ESTABLISHED', 'ZERO_SCORE_WILL_ESTABLISH']).then(function(translations) {
    $scope.actionAchievementsActionSheet = translations.ACTIONS_ACHIEVEMENTS;
    $scope.actionClassroomStudentsActionSheet = translations.ACTIONS_CLASSROOM_STUDENTS;
    $scope.actionClassroomTeamsActionSheet = translations.ACTIONS_CLASSROOM_TEAMS;
    $scope.actionItemsActionSheet = translations.ACTIONS_ITEMS;
    $scope.actionMissionsActionSheet = translations.ACTION_MISSIONS;
    $scope.actionRewardsActionSheet = translations.ACTIONS_REWARDS;
    $scope.actionTeacherHomeActionSheet = translations.ACTIONS_TEACHER_HOME;
    $scope.achievementText = translations.ACHIEVEMENT;
    $scope.archiveClassroomsActionSheetOption = translations.ARCHIVE_CLASSES;
    $scope.backupActionSheetOption = translations.BACKUP;
    $scope.becouseCompleteMission = translations.BECAUSE_COMPLETE_MISSION;
    $scope.cancelText = translations.CANCEL;
    $scope.cantAskMoreScoreAlert = translations.CANT_ASK_MORE_SCORE_THAN_MAX;
    $scope.cantCreateMoreTeamsThanStudentsAlert = translations.CANT_CREATE_MORE_TEAMS_THAN_STUDENT;
    $scope.changeScore = translations.CHANGE_SCORE;
    $scope.classCodePopup = translations.CLASS_CODE;
    $scope.dataChangedAlert = translations.DATA_CHANGED;
    $scope.deleteAchievementsActionSheetOption = translations.DELETE_ACHIEVEMENTS;
    $scope.deleteClassroomsActionSheetOption = translations.DELETE_CLASSROOMS;
    $scope.deleteItemsActionSheetOption = translations.DELETE_ITEMS;
    $scope.deleteMissionsActionSheetOption = translations.DELETE_MISSIONS;
    $scope.deleteRewardsActionSheetOption = translations.DELETE_REWARDS;
    $scope.deleteStudentsActionSheetOption = translations.DELETE_STUDENTS;
    $scope.deleteTeamsActionSheetOption = translations.DELETE_TEAMS;
    $scope.editScoreText = translations.EDIT_SCORE;
    $scope.errorEmailUsedAlert = translations.EMAIL_ALREADY_USED;
    $scope.emailChangedAlert = translations.EMAIL_CHANGED;
    $scope.emailInvalidAlert = translations.EMAIL_INVALID;
    $scope.errorUnknowAlert = translations.ERROR_ACCESS_UNKNOW;
    $scope.evaluateStudentsActionSheetOption = translations.EVALUATE_STUDENTS;
    $scope.evaluateTeamsActionSheetoption = translations.EVALUATE_TEAMS;
    $scope.exportPopoverOption = translations.EXPORT;
    $scope.fileInvalidAlert = translations.FILE_INVALID;
    $scope.hasLostMinPointItemAlert = translations.HAS_LOST_MIN_POINTS_IN_ITEM;
    $scope.hasRecibedMaxPointsItemAlert = translations.HAS_RECIBED_MAX_POINTS_IN_ITEM;
    $scope.importPopoverOption = translations.IMPORT;
    $scope.inTheAchievementText = translations.IN_THE_ACHIEVEMENT;
    $scope.introduceMissionName = translations.INTRODUCE_MISSION_NAME;
    $scope.introduceAdditionalPoints = translations.INTRODUCE_ADDITIONAL_POINTS;
    $scope.maxPointsHasBeenEstablishedAlert = translations.MAX_SCORE_ESTABLISEHD;
    $scope.maxPointsWillEstablishAlert = translations.MAX_SCORE_WILL_ESTABLISH;
    $scope.nextText = translations.NEXT;
    $scope.notificationFinishedMissionStudentSide = translations.HAVE_FINISHED_MISSION;
    $scope.notificationsFinishedMissionTeacherSide = translations.HAS_FINISHED_MISSION;
    $scope.notificationMissionEnded = translations.HAS_FINISHED;
    $scope.notificationOfMission = translations.NOTIFICATION_OF_MISSION;
    $scope.notificationOfStudent = translations.NOTIFICATION_OF_STUDENT;
    $scope.notificationLose = translations.NOTIFICATION_HAS_LOST;
    $scope.notificationTypeItem = translations.ITEM;
    $scope.notificationTypeMission = translations.MISSION;
    $scope.notificationTypeReward = translations.REWARD;
    $scope.notificationUnlockedLevelAchievementStudentSide = translations.HAVE_UNLOCKED_LEVEL_ACHIEVEMENT;
    $scope.notificationUnlockedLevelAchievementTeacherSide = translations.HAS_UNLOCKED_LEVEL_ACHIEVEMENT;
    $scope.notificationLostAchievementStudentSide = translations.HAVE_LOST_ACHIEVEMENT;
    $scope.notificationLostAchievementTeacherSide = translations.HAS_LOST_ACHIEVEMENT;
    $scope.notificationWin = translations.NOTIFICATION_HAS_WIN;
    $scope.passwordChangedAlert = translations.PASSWORD_CHANGED;
    $scope.pointOnTheitemSet = translations.POINTS_ON_THE_ITEM;
    $scope.randomStudentActionSheetOption = translations.RANDOM_STUDENT;
    $scope.randomTeamActionSheetOption = translations.RANDOM_TEAM;
    $scope.sendMessageActionSheetOption = translations.SEND_MESSAGE;
    $scope.studentDoesNotHaveEnougPointsAlert = translations.STUDENT_DOESNT_HAVE_ENOUGH_POINTS;
    $scope.takeAttendanceActionSheetOption = translations.TAKE_ATTENDANCE;
    $scope.teacherMessageNotificationType = translations.TEACHER_MESSAGE;
    $scope.useDefaultPoints = translations.USE_DEFAULT_POINT;
    $scope.unarchiveClassroomsActionSheetOption = translations.UNARCHIVE_CLASSES;
    $scope.weakPasswordAlert = translations.ERROR_WEAK_PASSWORD;
    $scope.youHaveWinTheReward = translations.YOU_WIN_REWARD;
    $scope.zeroPointEstablishedAlert = translations.ZERO_SCORE_ESTABLISHED;
    $scope.zeroPointsWillEstablishAlert = translations.ZERO_SCORE_WILL_ESTABLISH;
  });

  $scope.defaultAvatar = 'img/userDefaultAvatar.png';
  $scope.defaultTeamAvatar = 'img/teamDefaultAvatar.png';
  $scope.defaultAchievementAvatar = 'img/achievementDefaultBadge.png';

  var modalFirst;
  var modalMissions = 0;

  var sessionUser;
  var secondaryConnection = null;

  var demoClassroom = false;

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
      title: $scope.classCodePopup,
      template: $scope.classroom.hashcode,
    });

    alertPopup.then(function(res) {
      $scope.closePopoverClassStudents();
    });
  };




                                        /* FUNCTIONS IN SETTINGS */

  $scope.logOut = function() {
    if (firebase.auth().currentUser) {
      var userData = {};
      localStorageService.set('userCredentials', userData);

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
            if ($scope.classroom != undefined) {
              $scope.getLevels();
            }
            $scope.classrooms.sort(sortByName);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
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
    var classroomsNode = $firebaseArray(classroomsRef);
    classroomsNode.$loaded(function() {
      classroomsNode.$add({
        'name' : name,
        'open' : true,
        'archived' : false,
        'notifications' : true,
        'teacher' : $scope.teacher.$id,
      }).then(function(refNewClassroom) {
        var newClassroomId = refNewClassroom.key;

        var idForClassroomRef = firebase.database().ref('classrooms/' + newClassroomId + '/id');
        idForClassroomRef.set(newClassroomId);

        var a = CryptoJS.SHA1(newClassroomId + Date.now().toString()).toString();
        var hash = a.substr(0, 10).toUpperCase();
        var hashCodeForClassroomRef = firebase.database().ref('classrooms/' + newClassroomId + '/hashcode');
        hashCodeForClassroomRef.set(hash);

        var hashCodeRef = firebase.database().ref('hashcodes/' + hash + '/id');
        hashCodeRef.set(newClassroomId);

        var newteacherClassroomRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/classrooms/' + newClassroomId);
        newteacherClassroomRef.set(true);

        //COPY PREFERENCES FROM OTHER CLASSROOM
        if (document.getElementById("selectClass") != null) {
          var classroomIndex = document.getElementById("selectClass").selectedIndex;
        } else {
          var classroomIndex = 0;
        }
        
        if (classroomIndex != 0) {
        	var classroom = $scope.classrooms[classroomIndex - 1];
          $scope.copyPreferencesFromClassroom(classroom, newClassroomId);
        } else if (demoClassroom) {

          //DEMO CLASSROOM
          $scope.demoClassrooms = [];
          var loopClassroom = firebase.database().ref('classrooms/demoClassroomKey');
          loopClassroom.on('value', function(snapshot) {
            if (snapshot.val() != null) {
              $scope.demoClassrooms.push(snapshot.val());
              $scope.copyPreferencesFromClassroom(snapshot.val(), newClassroomId);
              demoClassroom = false;
            }
          });

        } else {
          //CREATE DEMO LEVEL
          var demoLevel = {
            'title' : 'Beginner',
            'level' : 0,
            'requiredPoints' : 0,
          }
          var classroomLevelRef = firebase.database().ref('classrooms/' + newClassroomId + '/levels');
          var classroomLevelArray = $firebaseArray(classroomLevelRef);
          classroomLevelArray.$loaded(function() {
            classroomLevelArray.$add(demoLevel).then(function(refNewLevel) {
              var levelId = refNewLevel.key;

              var idForLevelRef = firebase.database().ref('classrooms/' + newClassroomId + '/levels/' + levelId + '/id');
              idForLevelRef.set(levelId);
            });
          });

          $scope.getClassrooms();
        }
      });
    });
  }

  $scope.createDemoClassroom = function() {
    $scope.closePopoverTeacherHome();
    demoClassroom = true;
    $scope.createClassroom('Demo Classroom');
  }

  $scope.deleteClassroom = function(classroom) {
    for (var studentId in classroom.students) {
      var studentClassToDeleteRef = firebase.database().ref('students/' + studentId + '/classrooms/' + classroom.id);
      studentClassToDeleteRef.remove();
    }

    var teacherClassToDelefeRef = firebase.database().ref('teachers/' + sessionUser.uid + '/classrooms/' + classroom.id);
    teacherClassToDelefeRef.remove();

    var classroomHascodeRef = firebase.database().ref('hashcodes/' + classroom.hashcode);
    classroomHascodeRef.remove();

    var classToDeleteRef = firebase.database().ref('classrooms/' + classroom.id);
    classToDeleteRef.remove();
    
    for (var itemId in classroom.items) {
      var classItemToDeleteRef = firebase.database().ref('items/' + itemId);
      classItemToDeleteRef.remove();
      for (var studentId in classroom.students) {
        var studentItemToDeleteRef = firebase.database().ref('students/' + studentId + '/items/' + itemId);
        studentItemToDeleteRef.remove();
      }
    }

    for (var rewardId in classroom.rewards) {
      var classRewardToDeleteRef = firebase.database().ref('rewards/' + rewardId);
      classRewardToDeleteRef.remove();
      for (var studentId in classroom.students) {
        var studentRewardToDeleteRef = firebase.database().ref('students/' + studentId + '/rewards/' + rewardId);
        studentRewardToDeleteRef.remove();
      }
    }

    for (var teamId in classroom.teams) {
      var classTeamToDeleteRef = firebase.database().ref('teams/' + teamId);
      classTeamToDeleteRef.remove();
      for (var studentId in classroom.students) {
        var studentTeamToDeleteRef = firebase.database().ref('students/' + studentId + '/teams/' + teamId);
        studentTeamToDeleteRef.remove();
      }
    }

    for (var missionId in classroom.missions) {
      var classMissionToDeleteRef = firebase.database().ref('missions/' + missionId);
      classMissionToDeleteRef.remove();
      for (var studentId in classroom.students) {
        var studentMissionToDeleteRef = firebase.database().ref('students/' + studentId + '/missions/' + missionId);
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
    $scope.getNotifications();
    $scope.classForm();
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

    for (var studentId in originalClassroom.students) {
      var newClassStudentRef = firebase.database().ref('classrooms/' + newClassroomId + '/students/' + studentId);
      newClassStudentRef.set(true);

      var newStudentClassRef = firebase.database().ref('students/' + studentId + '/classrooms/' + newClassroomId);
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
    }
  }

  $scope.changeSelectedClassroom = function(classroom) {
    if (classroom.selected === false) {
      classroom.selected = true;
    } else {
      classroom.selected = false;
    }
  }

  


                                        /* FUNCTIONS IN TEACHER PROFILE */

  $scope.updateTeacherAvatar = function() {
    var downloadURL;
    var fileButton = document.getElementById('inputAvatar');
    
    fileButton.addEventListener('change',function(e) {
      if (e.target.files.length > 0) {
        $ionicLoading.show();
        var file = e.target.files[0];
        var fileExtension = file.name.split('.').pop();
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
          var storageRef = firebase.storage().ref('Profile_Pictures/' + sessionUser.uid + '/profilePicture');
          var task = storageRef.put(file);
          task.on('state_changed', function progress(snapshot) {

          }, function error(error) {
            $ionicLoading.hide();
          }, function complete() {
            downloadURL = task.snapshot.downloadURL;
              
            $scope.teacher.avatar = downloadURL;
            var teacherAvatarToUpdateRef = firebase.database().ref('teachers/' + sessionUser.uid + '/avatar/');
            teacherAvatarToUpdateRef.set(downloadURL);
            sessionUser.updateProfile ({
              photoURL : downloadURL,
            });
            $scope.teacher.name = CryptoJS.AES.decrypt($scope.teacher.name, sessionUser.uid).toString(CryptoJS.enc.Utf8);
            $scope.teacher.surname = CryptoJS.AES.decrypt($scope.teacher.surname, sessionUser.uid).toString(CryptoJS.enc.Utf8);
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

  $scope.editTeacherData = function(name, surname, school) {
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

    $scope.settingsForm();
    alert($scope.dataChangedAlert);
  }

  $scope.updateTeacherPassword = function(newPassword) {
    sessionUser.updatePassword(newPassword).then(function() {
      $scope.settingsForm();
      alert($scope.passwordChangedAlert);
    });
  }

  $scope.updateTeacherEmail = function(email) {
    sessionUser.updateEmail(email).then(function() {
      var teacherEmailRef = firebase.database().ref('teachers/' + sessionUser.uid + '/email');
      teacherEmailRef.set(email);
      $scope.settingsForm();
      alert($scope.emailChangedAlert);
    });
  }




                                        /* FUNCTIONS IN CLASS */

  $scope.getLevels = function() {
    var classroomLevelsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels');
    var classroomLevelsArray = $firebaseArray(classroomLevelsRef);
    classroomLevelsArray.$loaded(function() {
      $scope.levels = [];
        for (var element in classroomLevelsArray) {
          var classroomLevelRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + classroomLevelsArray[element].id);
          classroomLevelRef.on('value', function(snapshot) {
            if (snapshot.val() != null) {
              var change = false;
              var index = -1;
              var level = snapshot.val();

              for (i = 0 ; i < $scope.levels.length ; i++) {
                if ($scope.levels[i].id == level.id) {
                  change = true;
                  index = i;
                  break;
                }
              }

              if (!change) {
                $scope.levels.push(level);
              } else {
                $scope.levels[index] = level
              }
              $scope.levels.sort(sortByLevel);
              if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
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
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
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

    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
      $scope.$apply();
    }
  }

  $scope.setLevel = function(level) {
    $scope.level = level;
    $scope.showEditLevelModal();
  }

  $scope.editLevel = function(title, level, requiredPoints) {
    if (title != undefined && level != undefined && requiredPoints != undefined) {
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

    if (title != undefined) {
      var levelTitleRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id + '/title');
      levelTitleRef.set(title);
    }

    if (level != undefined) {
      var levelLevelRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id + '/level');
      levelLevelRef.set(level);
    }

    if (requiredPoints != undefined) {
      var levelRequiredPointsRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/levels/' + $scope.level.id + '/requiredPoints');
      levelRequiredPointsRef.set(requiredPoints);
    }

    $scope.getLevels();
    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
      $scope.$apply();
    }
    $scope.closeEditLevelModal();
    alert($scope.dataChangedAlert);
  }

  $scope.updateStudentPicture = function() {
    var downloadURL;
    var fileButton = document.getElementById('inputStudentPicture');
    
    fileButton.addEventListener('change',function(e) {
      if (e.target.files.length > 0) {
        $ionicLoading.show();
        var file = e.target.files[0];
        var fileExtension = file.name.split('.').pop();
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
          var storageRef = firebase.storage().ref('Profile_Pictures/' + $scope.student.id + '/' + $scope.classroom.id + '/classroomPicture');
          var task = storageRef.put(file);
          task.on('state_changed', function progress(snapshot) {

          }, function error(error) {
            $ionicLoading.hide();
          }, function complete() {
            downloadURL = task.snapshot.downloadURL;
              
            $scope.student.picture = downloadURL;
            var studentPictureToUpdateRef = firebase.database().ref('students/' + $scope.student.id + '/picture');
            studentPictureToUpdateRef.set(downloadURL);
            
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
              $scope.students[index] = student
            }
            $scope.students.sort(sortBySurname);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
          }
        });
        $scope.getStudentsForSelection();
      }
    });
  }

  $scope.getStudentsForSelection = function() {
    $scope.studentsForSelection = [];
    if ($scope.actionsheetClassStudentsType == 'evaluate') {
      for (var element in $scope.students) {
        if ($scope.students[element].classrooms[$scope.classroom.id].inClass) {
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

  $scope.createNewStudent = function(name, surname) {

    var teacherId = $scope.teacher.$id;
    var a = teacherId.substr(teacherId.length -2).toLowerCase();
    var classroomId = $scope.classroom.id;
    var b = classroomId.substr(classroomId.length -2).toLowerCase();
    var dateTimeHash = Date.now().toString();
    var c = dateTimeHash.substr(dateTimeHash.length -3).toLowerCase();

    var email = (name.replace(/\s/g, '') + surname.replace(/\s/g, '') + '.' + a + b + c + '@student.com').toLowerCase().trim();
    var password = "student";

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
            'emailVerified' : true,
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
        alert($scope.weakPasswordAlert = translations.ERROR_WEAK_PASSWORD);
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
    $scope.studentHasItems = false;
    for (var levelId in $scope.classroom.levels) {
      if (student.classrooms[$scope.classroom.id].totalPoints >= $scope.classroom.levels[levelId].requiredPoints) {
        $scope.student.level = $scope.classroom.levels[levelId];
      }
    }
    $scope.studentItems = [];
    for (var itemId in student.items) {
      for (i = 0 ; i < $scope.items.length ; i++) {
        if (student.items[itemId].id == $scope.items[i].id) {
          $scope.studentHasItems = true;
          if ($scope.items[i].achievements != undefined) {
            $scope.studentItems.push({
              'id' : student.items[itemId].id,
              'points' : student.items[itemId].points,
              'name' : $scope.items[i].name,
              'score' : $scope.items[i].score,
              'maxScore' : $scope.items[i].maxScore,
              'useForLevel' : $scope.items[i].useForLevel,
              'achievements' : $scope.items[i].achievements,
            });
          } else {
            $scope.studentItems.push({
              'id' : student.items[itemId].id,
              'points' : student.items[itemId].points,
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
    if (opening == undefined) {
      opening = false;
    }
    var classOpeningRef = firebase.database().ref('classrooms/' + $scope.classroom.id + '/open');
    classOpeningRef.set(opening);
    $scope.classroom.open = opening;
  }

  $scope.setNotifications = function(notification) {
    if (notification == undefined) {
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

    if (team != undefined && classroom != undefined) {
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

  $scope.selectStudentsForMessage = function(message) {
    $scope.closeSelectStudentsModal();
    for (var element in $scope.studentsForSelection) {
      if ($scope.studentsForSelection[element].selected === true) {
        $scope.sendMessageStudents($scope.studentsForSelection[element].id, message);
      }
    }
  }

  $scope.sendMessageStudents = function(studentId, message) {
    var studentNotificationsRef = firebase.database().ref('students/' + studentId + '/notifications/' + $scope.classroom.id);
    var studentNoticationsArray = $firebaseArray(studentNotificationsRef);
    studentNoticationsArray.$loaded(function() {
      studentNoticationsArray.$add({
        'type' : $scope.teacherMessageNotificationType,
        'message' : message,
        'date' : Date.now(),
      });
    });
  }
  
  $scope.changeSelectedStudent = function(student) {
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

  $scope.getRandomStudent = function() {
    var randomStudent = Math.trunc(Math.random()*$scope.students.length);
    
    var alertPopup = $ionicPopup.alert({
      title: $scope.randomStudentActionSheetOption,
      template: $scope.students[randomStudent].name + ' ' + $scope.students[randomStudent].surname,
    });

    alertPopup.then(function(res) {
    });
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
            for (j = 0 ; j < $scope.items.length ; j++) {
              if (item.id == $scope.items[j].id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.items.push(item);  
            } else {
              $scope.items[index] = item;
            }
            $scope.items.sort(sortByName);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
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
    if (maxScore == undefined || maxScore === 0) {
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

    for (var mission in $scope.missions) {
      var missionItemToDeleteRef = firebase.database().ref('missions/' + $scope.missions[mission].id + '/items/' + item.id);
      missionItemToDeleteRef.remove();
    }
    
    for (var achievementId in item.achievements) {
      var itemAchievementsToDeleteRef = firebase.database().ref('achievements/' + achievementId);
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
    if (name != undefined && description != undefined && requirements != undefined && score != undefined && maxScore != undefined) {
      var itemRef = firebase.database().ref('items/' + $scope.item.id);
      if (useForLevel != $scope.item.useForLevel && useForLevel != undefined) {
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
      if (name != undefined) {
        var itemNameRef = firebase.database().ref('items/' + $scope.item.id + '/name');
        itemNameRef.set(name);
      }

      if (description != undefined) {
        var itemDescriptionRef = firebase.database().ref('items/' + $scope.item.id + '/description');
        itemDescriptionRef.set(description);
      }

      if (requirements != undefined) {
        var itemRequirementsRef = firebase.database().ref('items/' + $scope.item.id + '/requirements');
        itemRequirementsRef.set(requirements);
      }

      if (score != undefined) {
        var itemScoreRef = firebase.database().ref('items/' + $scope.item.id + '/score');
        itemScoreRef.set(score);
      }

      if (maxScore != undefined) {
        var itemMaxScoreRef = firebase.database().ref('items/' + $scope.item.id + '/maxScore');
        itemMaxScoreRef.set(maxScore);
      }

      if (useForLevel != $scope.item.useForLevel && useForLevel != undefined) {
        var itemUseLevelRef = firebase.database().ref('items/' + $scope.item.id + '/useForLevel');
        itemUseLevelRef.set(useForLevel);
      }
    }
    $scope.rulesForm();
    alert($scope.dataChangedAlert);
  }

  $scope.evaluateStudents = function(item) {
    for (var pos in $scope.studentsToEvaluate) {
      if ($scope.studentsToEvaluate[pos].items != undefined) {
        var studentItems = $scope.studentsToEvaluate[pos].items;
        var studentItemRef = firebase.database().ref('students/' + $scope.studentsToEvaluate[pos].id + '/items/' + item.id);
        if (!(item.id in studentItems)) {
          studentItemRef.set({
            'id' : item.id,
            'points' : item.score,
          });
		      $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'win');
          $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], item.score);
          $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);

        } else {
          var studentPoints = $scope.studentsToEvaluate[pos].items[item.id].points;
          if ((Number(studentPoints) + Number(item.score)) > Number(item.maxScore)) {
            studentItemRef.set({
              'id' : item.id,
              'points' : item.maxScore,
            });
            $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'win');
            $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], item.maxScore);
            $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);
            alert($scope.notificationOfStudent + ': ' + $scope.studentsToEvaluate[pos].name + ' ' + $scope.studentsToEvaluate[pos].surname + ' ' + $scope.hasRecibedMaxPointsItemAlert + ': ' + item.name + ', ' + $scope.maxPointsHasBeenEstablishedAlert);
          } else {
            studentItemRef.set({
              'id' : item.id,
              'points' : Number(studentPoints) + Number(item.score),
            });
      			if(Math.sign(item.score) == -1) {
      			  $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'lose');
      			} else {
      			  $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'win');
      			}
            $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], (Number(studentPoints) + Number(item.score)));
            $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);
            if ((Number(studentPoints) + Number(item.score)) < 0) {
              studentItemRef.set({
                'id' : item.id,
                'points' : 0,
              });
              $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'lose');
              $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], 0);
              alert($scope.notificationOfStudent + ': ' + $scope.studentsToEvaluate[pos].name + ' ' + $scope.studentsToEvaluate[pos].surname + ' ' + $scope.hasLostMinPointItemAlert + ': ' + item.name + ', ' + $scope.zeroPointEstablishedAlert);
            }
          }
        }   
      } else {
        var studentItemRef = firebase.database().ref('students/' + $scope.studentsToEvaluate[pos].id + '/items/' + item.id);
        studentItemRef.set({
          'id' : item.id,
          'points' : item.score,
        });
        $scope.createNotificationItems($scope.studentsToEvaluate[pos].id, item, 'win');
        $scope.checkAchievements(item, $scope.studentsToEvaluate[pos], item.score);
        $scope.checkMissions(item, $scope.studentsToEvaluate[pos], item.score);
      }
      if (item.useForLevel) {
        var pointsAdded = Number($scope.studentsToEvaluate[pos].classrooms[$scope.classroom.id].totalPoints) + Number(item.score);
        var studentClassroomTotalPointsRef = firebase.database().ref('students/' + $scope.studentsToEvaluate[pos].id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
        if (pointsAdded < 0) {
          studentClassroomTotalPointsRef.set(0);
        } else {
          studentClassroomTotalPointsRef.set(pointsAdded);  
        }
      }     
    }
    $scope.getNotifications();
  }

  $scope.evaluateTeams = function(item) {
    for (var pos in $scope.teamsToEvaluate) {
      for (var studentId in $scope.teamsToEvaluate[pos].students) {
        for (var studentPos in $scope.students) {
          if ($scope.students[studentPos].id == studentId) {
            if ($scope.students[studentPos].items != undefined) {
              var studentItems = $scope.students[studentPos].items;
              var studentItemRef = firebase.database().ref('students/' + $scope.students[studentPos].id + '/items/' + item.id);
              if (!(item.id in studentItems)) {
                studentItemRef.set({
                  'id' : item.id,
                  'points' : item.score,
                });
                $scope.createNotificationItems($scope.students[studentPos].id, item, 'win');
                $scope.checkAchievements(item, $scope.students[studentPos], item.score);
                $scope.checkMissions(item, $scope.students[studentPos], item.score);
              } else {
                var studentPoints = $scope.students[studentPos].items[item.id].points;
                if ((Number(studentPoints) - Number(item.score)) > Number(item.maxScore)) {
                  studentItemRef.set({
                    'id' : item.id,
                    'points' : item.maxScore,
                  });
                  $scope.createNotificationItems($scope.students[studentPos].id, item, 'win');
                  $scope.checkAchievements(item, $scope.students[studentPos], item.maxScore);
                  $scope.checkMissions(item, $scope.students[studentPos], item.score);
                  alert($scope.notificationOfStudent + ': ' + $scope.students[studentPos].name + ' ' + $scope.students[studentPos].surname  + ' ' + $scope.hasRecibedMaxPointsItemAlert + ': ' + item.name + ', ' + $scope.maxPointsHasBeenEstablishedAlert);
                } else {
                  studentItemRef.set({
                    'id' : item.id,
                    'points' : Number(studentPoints) + Number(item.score),
                  });
        				  if(Math.sign(item.score) == -1) { 
                    $scope.createNotificationItems($scope.students[studentPos].id, item, 'lose');
        				  } else {
                    $scope.createNotificationItems($scope.students[studentPos].id, item, 'win');
        				  }
                  $scope.checkAchievements(item, $scope.students[studentPos], (Number(studentPoints) + Number(item.score)));
                  $scope.checkMissions(item, $scope.students[studentPos], item.score);
                  if ((Number(studentPoints) + Number(item.score)) < 0) {
                    studentItemRef.set({
                      'id' : item.id,
                      'points' : 0,
                    });
                    $scope.createNotificationItems($scope.students[studentPos].id, item, 'lose');
                    $scope.checkAchievements(item, $scope.students[studentPos], 0);
                    alert($scope.notificationOfStudent + ': ' + $scope.students[studentPos].name + ' ' + $scope.students[studentPos].surname + ' ' + $scope.hasLostMinPointItemAlert + ': ' + item.name + ', ' + $scope.zeroPointEstablishedAlert);
                  }
                }
              }
            } else {
              var studentItemRef = firebase.database().ref('students/' + $scope.students[studentPos].id + '/items/' + item.id);
              studentItemRef.set({
                'id' : item.id,
                'points' : item.score,
              });
              $scope.createNotificationItems($scope.students[studentPos].id, item, 'win');
              $scope.checkAchievements(item, $scope.students[studentPos], item.score);
              $scope.checkMissions(item, $scope.students[studentPos], item.score);
            }

            if (item.useForLevel) {
              var pointsAdded = Number($scope.students[studentPos].classrooms[$scope.classroom.id].totalPoints) + Number(item.score);
              var studentClassroomTotalPointsRef = firebase.database().ref('students/' + $scope.students[studentPos].id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
              if (pointsAdded < 0) {
                studentClassroomTotalPointsRef.set(0);
              } else {
                studentClassroomTotalPointsRef.set(pointsAdded);
              }
            }  
          }
        }
      }
    }
    $scope.getNotifications();
  }

  $scope.selectItems = function() {
    $scope.closeSelectItemsModal();
    if ($scope.actionSheetItemsType === 'delete') {
      for (var element in $scope.itemsForSelection) {
        if ($scope.itemsForSelection[element].selected === true) {
          $scope.deleteItem($scope.itemsForSelection[element]);
        }
      }
    } else if ($scope.actionSheetItemsType === 'evaluateStudents') {
      for (var element in $scope.itemsForSelection) {
        if ($scope.itemsForSelection[element].selected === true) {
          $scope.evaluateStudents($scope.itemsForSelection[element]);    
        }
      }
      $scope.getStudents();
    } else if ($scope.actionSheetItemsType === 'evaluateTeams') {
      for (var element in $scope.itemsForSelection) {
        if ($scope.itemsForSelection[element].selected === true) {
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

  $scope.changeSelectedItem = function(item) {
      if (item.selected === false) {
        item.selected = true;
        if ($scope.actionSheetItemsType === 'evaluateStudents' || $scope.actionSheetItemsType === 'evaluateTeams' || $scope.actionSheetItemsType == 'newMissionCreation') { 
        $scope.points = item.score;
        $scope.popupChooseScore = $ionicPopup.show({
          title: $scope.editScoreText,
          template: '<input id="inputScore" type="number" ng-model="points">',
          scope: $scope,
          buttons: [
            {
              text: $scope.cancelText,
              onTap: function() {
                item.selected = false;
              }
            },
            { text: $scope.useDefaultPoints,
              type: 'button-positive',
            },
            {
              text: $scope.changeScore,
              type: 'button-positive',
              onTap: function(e) {
                var actualScore = document.getElementById("inputScore").value;
                if (actualScore > item.maxScore) {
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
      alert ($scope.studentDoesNotHaveEnougPointsAlert + ', ' + $scope.zeroPointsWillEstablishAlert);
      studentItemPointsToRemoveRef.set(0);
      $scope.student.items[item.id].points = 0;
      $scope.createNotificationItems($scope.student.id, item, 'lose');
      $scope.checkAchievements(item, $scope.student, 0);
    } else {
      studentItemPointsToRemoveRef.set((Number($scope.student.items[item.id].points) - Number(item.score)));
      $scope.student.items[item.id].points = (Number($scope.student.items[item.id].points) - Number(item.score));
      $scope.createNotificationItems($scope.student.id, item, 'lose');
      $scope.checkAchievements(item, $scope.student, Number($scope.student.items[item.id].points));
    }

    item.points = $scope.student.items[item.id].points;

    if (item.useForLevel) {
      if (($scope.student.classrooms[$scope.classroom.id].totalPoints - item.score) < 0) {
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
      alert($scope.studentDoesNotHaveEnougPointsAlert + ', ' + $scope.maxPointsWillEstablishAlert);
      studentItemPointsToAddRef.set(item.maxScore);
      $scope.student.items[item.id].points = item.maxScore;
      $scope.createNotificationItems($scope.student.id, item, 'win');
      $scope.checkAchievements(item, $scope.student, item.maxScore);
      for (var element in $scope.items) {
        if ($scope.items[element].id == item.id) {
          $scope.checkMissions($scope.items[element], $scope.student, item.score);
        }
      }
    } else {
      studentItemPointsToAddRef.set((Number($scope.student.items[item.id].points) + Number(item.score)));
      $scope.student.items[item.id].points = (Number($scope.student.items[item.id].points) + Number(item.score));
      $scope.createNotificationItems($scope.student.id, item, 'win');
      $scope.checkAchievements(item, $scope.student, Number($scope.student.items[item.id].points));
      for (var element in $scope.items) {
        if ($scope.items[element].id == item.id) {
          $scope.checkMissions($scope.items[element], $scope.student, item.score);
        }
      }
      $scope.checkMissions(item, $scope.student, item.score);
    }

    item.points = $scope.student.items[item.id].points;

    if (item.useForLevel) {
      studentClassPointsToAddRef.set($scope.student.classrooms[$scope.classroom.id].totalPoints + item.score);
      $scope.student.classrooms[$scope.classroom.id].totalPoints = $scope.student.classrooms[$scope.classroom.id].totalPoints + item.score;
    }
  }

  
  

                                        /* FUNCTIONS IN ACHIEVEMENTS */

  $scope.updateAchievementPicture = function() {
    var downloadURL;
    var fileButton = document.getElementById('inputAchievementPicture');
    
    fileButton.addEventListener('change',function(e) {
      if (e.target.files.length > 0) {
        $ionicLoading.show();
        var file = e.target.files[0];
        var fileExtension = file.name.split('.').pop();
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
          var storageRef = firebase.storage().ref('Achievement_Pictures/' + $scope.achievement.id + '/achievementPicture');
          var task = storageRef.put(file);
          task.on('state_changed', function progress(snapshot) {

          }, function error(error) {
            $ionicLoading.hide();
          }, function complete() {
            downloadURL = task.snapshot.downloadURL;
              
            $scope.achievement.badge = downloadURL;
            var achievementPictureToUpdateRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/badge/');
            achievementPictureToUpdateRef.set(downloadURL);
            
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

  $scope.getAchievements = function() {
    var itemAchievementsRef = firebase.database().ref('items/' + $scope.item.id + '/achievements');
    var achievementKeys = $firebaseArray(itemAchievementsRef);
    achievementKeys.$loaded(function() {
      $scope.achievements = [];
      for (i = 0 ; i < achievementKeys.length ; i++) {
        var achievementKey = achievementKeys.$keyAt(i);
        var loopAchievement = firebase.database().ref('achievements/' + achievementKey);
        loopAchievement.on('value', function(snapshot) {
          if (snapshot.val() != null) {
            var change = false;
            var index = -1;
            var achievement = snapshot.val();
            for (j = 0 ; j < $scope.achievements.length ; j++) {
              if (achievement.id == $scope.achievements[j].id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.achievements.push(achievement);
            } else {
              $scope.achievements[index] = achievement;
            }
            $scope.achievements.sort(sortByName);
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
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
    if (requirements > $scope.item.maxScore) {
      alert($scope.cantAskMoreScoreAlert);
    } else {
      if (badge == undefined) {
        badge = $scope.defaultAchievementAvatar;
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
      if ($scope.students[student].items != undefined && $scope.students[student].items[$scope.item.id] != undefined 
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

  $scope.editAchievement = function(name, description, requirements, maxLevel) {
    if (name != undefined && description != undefined && requirements != undefined && maxLevel != undefined) {
      var achievementRef = firebase.database().ref('achievements/' + $scope.achievement.id);
      var achievementEdit = {
        'id' : $scope.achievement.id,
        'name' : name,
        'description' : description,
        'requirements' : requirements,
        'maxLevel' : maxLevel,
        'badge' : $scope.achievement.badge,
      };
      achievementRef.set(achievementEdit);
    } else {
      if (name != undefined) {
        var achievementNameRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/name');
        achievementNameRef.set(name);
      }

      if (description != undefined) {
        var achievementDescriptionRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/description');
        achievementDescriptionRef.set(description);
      }

      if (requirements != undefined) {
        var achievementRequirementsRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/requirements');
        achievementRequirementsRef.set(requirements);
      }

      if (maxLevel != undefined) {
        var achievementMaxLevelRef = firebase.database().ref('achievements/' + $scope.achievement.id + '/maxLevel');
        achievementMaxLevelRef.set(maxLevel);
      }
    }
    $scope.itemsForm();
    alert($scope.dataChangedAlert);
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
    }
  }
  
  $scope.changeSelectedAchievement = function(achievement) {
    if (achievement.selected === false) {
      achievement.selected = true;
    } else {
      achievement.selected = false;
    }
  }

  $scope.checkAchievements = function(item, student, points) {
    if (item.achievements != undefined) {
      var itemAchievementsRef = firebase.database().ref('items/' + item.id + '/achievements');
      var itemAchievementsArray = $firebaseArray(itemAchievementsRef);
      var achievementsArray = $firebaseArray(achievementsRef);
      itemAchievementsArray.$loaded(function() {
        achievementsArray.$loaded(function() {
          for (i = 0 ; i < itemAchievementsArray.length ; i++) {
            var achievementKey = itemAchievementsArray.$keyAt(i);
            var loopAchievements = firebase.database().ref('achievements/' + achievementKey);
            loopAchievements.on('value', function(snapshot) {
              if (snapshot.val() != null) {
                var achievementToCheck = snapshot.val();
                if (student.items != undefined && student.items[item.id].achievements != undefined && student.items[item.id].achievements[achievementToCheck.id] != undefined) {
                  var studentLevel = student.items[item.id].achievements[achievementToCheck.id].level;
                }
                if (points > achievementToCheck.requirements) {
                  var levelAchievement = points / achievementToCheck.requirements;
                  levelAchievement = Math.trunc(levelAchievement);
                  if (levelAchievement > achievementToCheck.maxLevel) {
                    levelAchievement = achievementToCheck.maxLevel;
                  }
                  var studentItemAchievementRef = firebase.database().ref('students/' + student.id + '/items/' + item.id + '/achievements/' + achievementToCheck.id);
                  studentItemAchievementRef.set({
                    'id' : achievementToCheck.id,
                    'level' : levelAchievement,
                  });
                  if(studentLevel != levelAchievement) {
                    $scope.createNotificationAchievements(student.id, 'student', achievementToCheck, 'win', levelAchievement, null);
                    $scope.createNotificationAchievements($scope.teacher.$id, 'teacher', achievementToCheck, 'win', levelAchievement, student);
                  }
                  /*THINGS TO DO NULL REFERENCE AND UNDEFINED HERE
                  student.items[item.id].achievements[achievementToCheck.id].id = achievementToCheck.id;
                  student.items[item.id].achievements[achievementToCheck.id].level = levelAchievement;*/
                } else {
                  if (student.items != undefined && student.items[item.id].achievements != undefined && student.items[item.id].achievements[achievementToCheck.id] != undefined) {
                    $scope.createNotificationAchievements(student.id, 'student', achievementToCheck, 'lose', levelAchievement, null);
                    $scope.createNotificationAchievements($scope.teacher.$id, 'teacher', achievementToCheck, 'lose', levelAchievement, student);
                  }
                  var studentItemAchievementRef = firebase.database().ref('students/' + student.id + '/items/' + item.id + '/achievements/' + achievementToCheck.id);
                  studentItemAchievementRef.remove();
                  /*delete $scope.student.items[item.id].achievements[achievementToCheck.id];*/
                }
              }
            });
          }
        });
      });
    }
  }




                                       /* FUNCTIONS IN TEAMS */

  $scope.updateTeamPicture = function() {
    var downloadURL;
    var fileButton = document.getElementById('inputTeamPicture');
    
    fileButton.addEventListener('change',function(e) {
      if (e.target.files.length > 0) {
        $ionicLoading.show();
        var file = e.target.files[0];
        var fileExtension = file.name.split('.').pop();
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == 'bmp') {
          var storageRef = firebase.storage().ref('Team_Pictures/' + $scope.team.id + '/teamPicture');
          var task = storageRef.put(file);
          task.on('state_changed', function progress(snapshot) {

          }, function error(error) {
            $ionicLoading.hide();
          }, function complete() {
            downloadURL = task.snapshot.downloadURL;
              
            $scope.team.picture = downloadURL;
            var teamPictureToUpdateRef = firebase.database().ref('teams/' + $scope.team.id + '/picture');
            teamPictureToUpdateRef.set(downloadURL);
            
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
            for (j = 0 ; j < $scope.teams.length ; j++) {
              if ($scope.teams[j].id == team.id) {
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
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
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
    if (picture == undefined) {
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
    if (numEquipos > $scope.students.length) {
      alert($scope.cantCreateMoreTeamsThanStudentsAlert);
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
      for (var teamMemberId in team.students) {
        if ($scope.students[student].id == teamMemberId) {
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

  $scope.editTeam = function(name, objective) {
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
    $scope.closeModalTeamDialog();
    alert($scope.dataChangedAlert);
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
    } else if ($scope.actionSheetClassTeamsType === 'evaluate') {
      $scope.teamsToEvaluate = [];
      for (var element in $scope.teamsForSelection) {
        if ($scope.teamsForSelection[element].selected === true) {
          $scope.teamsToEvaluate.push($scope.teamsForSelection[element]);
        }
      }
      $scope.actionSheetItemsType = 'evaluateTeams';
      $scope.showSelectItemsModal();
    }
  }

  $scope.sendMessageTeams = function(message) {
    $scope.closeSelectTeamsModal();
    for (var teamForSelection in $scope.teamsForSelection) {
      if ($scope.teamsForSelection[teamForSelection].selected === true) {
        for (var team in $scope.teams) {
          if ($scope.teams[team].id == $scope.teamsForSelection[teamForSelection].id) {
            for (var student in $scope.teams[team].students) {
              $scope.sendMessageStudents(student, message);
            }
          }
        }
      }
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

  $scope.getRandomTeam = function() {
    var randomTeam = Math.trunc(Math.random()*$scope.teams.length);
    
    var alertPopup = $ionicPopup.alert({
      title: $scope.randomTeamActionSheetOption,
      template: $scope.teams[randomTeam].name,
    });

    alertPopup.then(function(res) {
    });
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
            for (j = 0 ; j < $scope.rewards.length ; j++) {
              if (reward.id == $scope.rewards[j].id) {
                change = true;
                index = j;
                break;
              }
            }
            if (!change) {
              $scope.rewards.push(reward);  
            } else {
              $scope.rewards[index] = reward;
            }
            $scope.rewards.sort(sortByName);
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

    for (var mission in $scope.missions) {
      var missionRewardToDeleteRef = firebase.database().ref('missions/' + $scope.missions[mission].id + '/rewards/' + reward.id);
      missionRewardToDeleteRef.remove();
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
    alert($scope.dataChangedAlert);
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
    } else if ($scope.actionSheetRewardsType === 'newMissionCreation') {
      $scope.newMission.rewards = $scope.rewardsForSelection;
      $scope.createMission($scope.newMission);
    }
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
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
              $scope.$apply();
            }
            $scope.getMissionsForSelection();
          }
        });
      }
    });
  }

  $scope.getItemsForMissionSelection = function() {
    $scope.itemsForMissionSelection = angular.copy($scope.items);
    if ($scope.editingMissionItems) {
      for (var element in $scope.itemsForMissionSelection) {
        $scope.itemsForMissionSelection[element].inMission = false;
      }
      if ($scope.mission.items != undefined) {
        for (var item in $scope.itemsForMissionSelection) {
          if ($scope.mission.items[$scope.itemsForMissionSelection[item].id] != undefined) {
            $scope.itemsForMissionSelection[item].inMission = true;
            $scope.itemsForMissionSelection[item].score = $scope.mission.items[$scope.itemsForMissionSelection[item].id].neededPoints;
          }
        }
      }
    } else {
      for (var element in $scope.itemsForMissionSelection) {
        $scope.itemsForMissionSelection[element].selected = false;
      }
    }
  }

  $scope.getRewardsForMissionSelection = function() {
    $scope.rewardsForMissionSelection = angular.copy($scope.rewards);
    if ($scope.editingMissionRewards) {
      for (var element in $scope.rewardsForMissionSelection) {
        $scope.rewardsForMissionSelection[element].inMission = false;
      }
      if ($scope.mission.rewards != undefined) {
        for (var reward in $scope.rewardsForMissionSelection) {
          if ($scope.mission.rewards[$scope.rewardsForMissionSelection[reward].id] === true) {
            $scope.rewardsForMissionSelection[reward].inMission = true;
          }
        }
      }
    } else {
      for (var element in $scope.rewardsForMissionSelection) {
        $scope.rewardsForMissionSelection[element].selected = false;
      }
    }
  }

  $scope.getMembersForMissionSelection = function() {
    $scope.studentsForMissionSelection = angular.copy($scope.students);
    if ($scope.editingMissionMembers) {
      for (var element in $scope.studentsForMissionSelection) {
        $scope.studentsForMissionSelection[element].inMission = false;
      }
      if ($scope.mission.students != undefined) {
        for (var student in $scope.studentsForMissionSelection) {
          if ($scope.mission.students[$scope.studentsForMissionSelection[student].id] != undefined) {
            $scope.studentsForMissionSelection[student].inMission = true;
          }
        }
      }
    } else {
      for (var element in $scope.studentsForMissionSelection) {
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

        for (var pos in mission.items) {
          if (mission.items[pos].selected) {
            var missionItemRef = firebase.database().ref('missions/' + id + '/items/' + mission.items[pos].id);
            missionItemRef.set({
              'id' : mission.items[pos].id,
              'neededPoints' : mission.items[pos].score
            });

            var itemMissionRef = firebase.database().ref('items/' + mission.items[pos].id + '/missions/' + id);
            itemMissionRef.set(true);
          }
        }

        for (var pos in mission.students) {
          if (mission.students[pos].selected) {
            var missionStudentRef = firebase.database().ref('missions/' + id + '/students/' + mission.students[pos].id);
            missionStudentRef.set(false);

            var studentMissionRef = firebase.database().ref('students/' + mission.students[pos].id + '/missions/' + id);
            studentMissionRef.set(id);

            for (var element in mission.items) {
              if (mission.items[element].selected) {
                var studentItemsMissionRef = firebase.database().ref('students/' + mission.students[pos].id + '/missions/' + id + '/items/' + mission.items[element].id);
                studentItemsMissionRef.set({
                  'id' : mission.items[element].id,
                  'points' : 0,
                });
              }
            }
          }
        }

        for (var pos in mission.rewards) {
          if (mission.rewards[pos].selected) {
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

    for (var itemId in mission.items) {
      var itemMissionRef = firebase.database().ref('items/' + itemId + '/missions/' + mission.id);
      itemMissionRef.remove();
    }

    for (var studentId in mission.students) {
      var studentMissionToDeleteRef = firebase.database().ref('students/' + studentId + '/missions/' + mission.id);
      studentMissionToDeleteRef.remove();
    }

    $scope.getMissions();
  }

  $scope.setMission = function(mission) {
    $scope.mission = mission;
    $scope.missionItems = [];
    $scope.missionRewards = [];
    $scope.missionStudents = [];
    for (var item in $scope.items) {
      for (var itemMissionId in mission.items) {
        if ($scope.items[item].id === itemMissionId) {
          $scope.items[item].neededPoints = mission.items[itemMissionId].neededPoints;
          $scope.missionItems.push($scope.items[item]);
        }
      }
    }

    for (var reward in $scope.rewards) {
      for (var rewardMissionId in mission.rewards) {
        if ($scope.rewards[reward].id === rewardMissionId) {
          $scope.missionRewards.push($scope.rewards[reward]);
        }
      }
    }

    for (var student in $scope.students) {
      for (var studentMissionId in mission.students) {
        if ($scope.students[student].id === studentMissionId) {
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
    if (name != undefined && additionalPoints != undefined) {
      missionNameRef.set(name);
      missionAdditionalPointsRef.set(additionalPoints);
    } else {
      if (name != undefined) {
        missionNameRef.set(name);
      }
      if (additionalPoints != undefined) {
        missionAdditionalPointsRef.set(additionalPoints);
      }
    }
    $scope.closeModalEditMission();
    alert(alert($scope.dataChangedAlert));
  }

  $scope.editMissionItems = function() {
    $scope.closeModalEditMissionItems();
    for (var element in $scope.itemsForMissionSelection) {
      var missionItemRef = firebase.database().ref('missions/' + $scope.mission.id + '/items/' + $scope.itemsForMissionSelection[element].id);
      var itemMissionRef = firebase.database().ref('items/' + $scope.itemsForMissionSelection[element].id + '/missions/' + $scope.mission.id);
      if ($scope.itemsForMissionSelection[element].inMission === false) {
        missionItemRef.remove();
        itemMissionRef.remove();
        for (var studentId in $scope.mission.students) {
          var studentMissionItemToDelRef  = firebase.database().ref('students/' + studentId + '/missions/' + $scope.mission.id + '/items/' + $scope.itemsForMissionSelection[element].id);
          studentMissionItemToDelRef.remove();
        }
      } else {
        missionItemRef.set({
          'id' : $scope.itemsForMissionSelection[element].id,
          'neededPoints' : $scope.itemsForMissionSelection[element].score
        });
        itemMissionRef.set(true);
        for (var studentId in $scope.mission.students) {
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
    for (var element in $scope.rewardsForMissionSelection) {
      var missionRewardRef = firebase.database().ref('missions/' + $scope.mission.id + '/rewards/' + $scope.rewardsForMissionSelection[element].id);
      if ($scope.rewardsForMissionSelection[element].inMission === false) {
        missionRewardRef.remove();
      } else {
        missionRewardRef.set(true);
      }
    }
    $scope.closeModalEditMission();
  }

  $scope.editMissionMembers = function() {
    $scope.closeModalEditMissionMembers();
    for (var element in $scope.studentsForMissionSelection) {
      var missionStudentRef = firebase.database().ref('missions/' + $scope.mission.id + '/students/' + $scope.studentsForMissionSelection[element].id);
      var studentMissionRef = firebase.database().ref('students/' + $scope.studentsForMissionSelection[element].id + '/missions/' + $scope.mission.id);
      var studentMissionIdRef = firebase.database().ref('students/' + $scope.studentsForMissionSelection[element].id + '/missions/' + $scope.mission.id + '/id');
      if ($scope.studentsForMissionSelection[element].inMission === false) {
        missionStudentRef.remove();
        studentMissionRef.remove();
      } else {
        missionStudentRef.set(false);
        studentMissionIdRef.set($scope.mission.id);
        for (var itemId in $scope.mission.items) {
          var studentItemsMissionRef = firebase.database().ref('students/' + $scope.studentsForMissionSelection[element].id + '/missions/' + $scope.mission.id + '/items/' + itemId);
          if ($scope.studentsForMissionSelection[element].missions == undefined || $scope.studentsForMissionSelection[element].missions[$scope.mission.id].items == undefined) {
            studentItemsMissionRef.set({
              'id' : itemId,
              'points' : 0,
            });
          } else if ($scope.studentsForMissionSelection[element].missions[$scope.mission.id].items[itemId].points > 0 &&
            $scope.studentsForMissionSelection[element].missions[$scope.mission.id].items[itemId] != undefined) {
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
    }
  }

  $scope.inMission = function(object) {
    if (object.inMission === true) {
      object.inMission = false;
    } else {
      object.inMission = true;
      if (object.price == undefined && object.classrooms == undefined) {
        $scope.points = object.score;
        $scope.popupChooseScore = $ionicPopup.show({
          template: '<input id="inputScore" type="number" ng-model="points">',
          scope: $scope,
          buttons: [
            {
              text: $scope.cancelText,
              onTap: function() {
                object.inMission = false;
              }
            },
            { text: $scope.useDefaultPoints,
              type: 'button-positive',
            },
            {
              text: $scope.changeScore,
              type: 'button-positive',
              onTap: function(e) {
                var actualScore = document.getElementById("inputScore").value;
                if (actualScore > object.maxScore) {
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
      title: $scope.introduceMissionName,
      template: '<input type="text" ng-model="newMission.name">',
      scope : $scope,

      buttons: [
        {text: $scope.cancelText},
        {text: $scope.nextText,
         onTap: function(e) {
           var missionAdditionalPointsPopup = $ionicPopup.show({
              title: $scope.introduceAdditionalPoints,
              template: '<input type="number" ng-model="newMission.additionalPoints">',
              scope : $scope,

              buttons: [
                {text: $scope.cancelText},
                {text: $scope.nextText,
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
    if (item.missions != undefined) {
      for (var missionId in item.missions) {
        for (var element in $scope.missions) {
          if ($scope.missions[element].id == missionId) {
            if ($scope.missions[element].finished === false) {
              if (student.missions != undefined) {
                if (missionId in student.missions) {
                  var numItemsToUnlock = Object.keys($scope.missions[element].items).length;
                  var unlockedMissionItems = 0;
                  for (var itemId in $scope.missions[element].items) {
                    var studentMissionItemPointsRef = firebase.database().ref('students/' + student.id + '/missions/' + missionId + '/items/' + itemId + '/points');
                    if (student.missions[missionId].items[itemId] != undefined) {
                      if (item.id == itemId) {
                        if ((Number(student.missions[missionId].items[itemId].points) + Number(points)) < $scope.missions[element].items[itemId].neededPoints) {
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
                  //Student has finished the mission
                  if (numItemsToUnlock == unlockedMissionItems) {
                    var studentMissionToDeleteRef = firebase.database().ref('students/' + student.id + '/missions/' + missionId);
                    studentMissionToDeleteRef.remove();

                    var missionStudentRef = firebase.database().ref('missions/' + missionId + '/students/' + student.id);
                    missionStudentRef.set(true);
                    $scope.missions[element].students[student.id] = true;

                    var studentClassPointsRef = firebase.database().ref('students/' + student.id + '/classrooms/' + $scope.classroom.id + '/totalPoints');
                    studentClassPointsRef.set(Number(student.classrooms[$scope.classroom.id].totalPoints) + $scope.missions[element].additionalPoints);

                    for (var rewardId in $scope.missions[element].rewards) {
                      var rewardForStudentRef = firebase.database().ref('students/' + student.id + '/rewards/' + rewardId);
                      if (student.rewards != undefined && student.rewards[rewardId] != undefined) {
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
                      for (var rewardPos in $scope.rewards) {
                        if($scope.rewards[rewardPos].id == rewardId) {
                          $scope.createNotificationsRewards(student, $scope.rewards[rewardPos], $scope.missions[element]);
                          break;
                        }
                      }
                    }
                    $scope.createNotificationMissions(student.id, 'student', $scope.missions[element], student, false);
                    var studentsToUnlock = Object.keys($scope.missions[element].students).length;
                    var unlockedStudents = 0;
                    for (var studentId in $scope.missions[element].students) {
                      if ($scope.missions[element].students[studentId] == true) {
                        unlockedStudents += 1;
                      }
                    }
                    if (unlockedStudents == studentsToUnlock) {
                      var missionStateRef = firebase.database().ref('missions/' + missionId + '/finished');
                      missionStateRef.set(true);
                      $scope.createNotificationMissions($scope.teacher.$id, 'teacher', $scope.missions[element], student, true);
                    } else {
                      $scope.createNotificationMissions($scope.teacher.$id, 'teacher', $scope.missions[element], student, false);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  


                                        /* FUNCTIONS NOTIFICATIONS */

  $scope.getNotifications = function() {
    var teacherNotificationsRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/notifications/' + $scope.classroom.id);
    var teacherNotificationsArray = $firebaseArray(teacherNotificationsRef);
    teacherNotificationsArray.$loaded(function() {
      $scope.notifications = [];
        for (var element in teacherNotificationsArray) {
          var teacherNotificationRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/notifications/' + $scope.classroom.id + '/' + teacherNotificationsArray[element].$id);
          teacherNotificationRef.on('value', function(snapshot) {
            if (snapshot.val() != null) {
              var change = false;
              var index = -1;
              var notification = snapshot.val();
              $scope.notifications.push(notification);

              $scope.notifications.sort(sortByDate);
              if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
              }
            }
          });
        }
        if ($scope.notifications.length > 0 && $scope.classroom.notifications) {
          $scope.showNotificationsModal();
        }
    });
  }

  $scope.createNotificationItems = function(userId, item, operationType) {
    var studentNotificationsRef = firebase.database().ref('students/' + userId + '/notifications/' + $scope.classroom.id);
    var studentNoticationsArray = $firebaseArray(studentNotificationsRef);
    studentNoticationsArray.$loaded(function() {
      if (operationType == 'win') {
        studentNoticationsArray.$add({
          'type' : $scope.notificationTypeItem,
          'message' : $scope.notificationWin + ' ' + item.score + ' ' + $scope.pointOnTheitemSet + ': ' + item.name,
          'date' : Date.now(),
        });
      } else if (operationType == 'lose') {
        studentNoticationsArray.$add({
          'type' : $scope.notificationTypeItem,
          'message' : $scope.notificationLose + ' ' + Math.abs(item.score) + ' ' + $scope.pointOnTheitemSet + ': ' + item.name,
          'date' : Date.now(),
        });
      }
    });
  }

  $scope.createNotificationAchievements = function(userId, userType, achievement, operationType, levelAchievementReached, studentToEvaluate) {
    if (userType == 'student') {
      var studentNotificationsRef = firebase.database().ref('students/' + userId + '/notifications/' + $scope.classroom.id);
      var studentNoticationsArray = $firebaseArray(studentNotificationsRef);
      studentNoticationsArray.$loaded(function() {
        if (operationType == 'win') {
          studentNoticationsArray.$add({
            'type' : $scope.achievementText,
            'message' : $scope.notificationUnlockedLevelAchievementStudentSide + ' ' + levelAchievementReached + ' ' + $scope.inTheAchievementText + ': ' + achievement.name,
            'date' : Date.now(),
          });
        } else if (operationType == 'lose') {
          studentNoticationsArray.$add({
            'type' : $scope.achievementText,
            'message' : $scope.notificationLostAchievementStudentSide + ': ' + achievement.name,
            'date' : Date.now(),
          });
        }
      });
    } else if (userType == 'teacher') {
      var teacherNotificationsRef = firebase.database().ref('teachers/' + userId + '/notifications/' + $scope.classroom.id);
      var teacherNotificationsArray = $firebaseArray(teacherNotificationsRef);
      teacherNotificationsArray.$loaded(function() {
        if (operationType == 'win') {
          teacherNotificationsArray.$add({
            'type' : $scope.achievementText,
            'message' : $scope.notificationOfStudent + ' ' + studentToEvaluate.name + ' ' + studentToEvaluate.surname + ' ' + $scope.notificationUnlockedLevelAchievementTeacherSide + ' ' + levelAchievementReached + ' ' + $scope.inTheAchievementText + ': ' + achievement.name,
            'date' : Date.now(),
          });
        } else if (operationType == 'lose') {
          teacherNotificationsArray.$add({
            'type' : $scope.achievementText,
            'message' : $scope.notificationOfStudent + ' ' + studentToEvaluate.name + ' ' + studentToEvaluate.surname + ' ' + $scope.notificationLostAchievementTeacherSide + ' ' + achievement.name,
            'date' : Date.now(),
          });
        }
      });
    }
  }

  $scope.createNotificationMissions = function(userId, userType, mission, studentToEvaluate, finished) {
    if(userType == 'student') {
      var studentNotificationsRef = firebase.database().ref('students/' + userId + '/notifications/' + $scope.classroom.id);
      var studentNoticationsArray = $firebaseArray(studentNotificationsRef);
      studentNoticationsArray.$loaded(function() {
        studentNoticationsArray.$add({
          'type' : $scope.notificationTypeMission,
          'message' : $scope.notificationFinishedMissionStudentSide + ': ' + mission.name,
          'date' : Date.now(),
        });
      });
    } else if (userType == 'teacher') {
      var teacherNotificationsRef = firebase.database().ref('teachers/' + userId + '/notifications/' + $scope.classroom.id);
      var teacherNotificationsArray = $firebaseArray(teacherNotificationsRef);
      teacherNotificationsArray.$loaded(function() {
        teacherNotificationsArray.$add({
          'type' : $scope.notificationTypeMission,
          'message' : $scope.notificationOfStudent + ' ' + studentToEvaluate.name + ' ' + studentToEvaluate.surname + ' ' + $scope.notificationFinishedMissionTeacherSide + ': ' + mission.name,
          'date' : Date.now(),
        });
        if(finished) {
          teacherNotificationsArray.$add({
          'type' : $scope.notificationTypeMission,
          'message' : $scope.notificationOfMission + ': ' + mission.name + ' ' + $scope.notificationMissionEnded,
          'date' : Date.now(),
        });
        }
      });
    }
  }

  $scope.createNotificationsRewards = function(student, reward, mission) {
    var studentNotificationsRef = firebase.database().ref('students/' + student.id + '/notifications/' + $scope.classroom.id);
    var studentNoticationsArray = $firebaseArray(studentNotificationsRef);
    studentNoticationsArray.$loaded(function() {
      studentNoticationsArray.$add({
        'type' : $scope.notificationTypeReward,
        'message' : $scope.youHaveWinTheReward + ' ' + reward.name + ' ' + $scope.becouseCompleteMission + ' ' + mission.name,
        'date' : Date.now(),
      });
    });
  }

  $scope.deleteNotifications = function() {
    var notificationToDeleteRef = firebase.database().ref('teachers/' + $scope.teacher.$id + '/notifications/' + $scope.classroom.id);
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
      return -1;
    }
    if (surnameA > surnameB) {
      return 1;
    }
    //surnames must be equal
    return 0;
  }

  var sortByLevel = function(a, b) {
    var levelA = a.level;
    var levelB = b.level;
    if (levelA < levelB) {
      return -1;
    }
    if (levelA > levelB) {
      return 1;
    }
    //levels must be equal
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
    $scope.actionAchievementsActionSheet = $translate.instant('ACTIONS_ACHIEVEMENTS');
    $scope.actionClassroomStudentsActionSheet = $translate.instant('ACTIONS_CLASSROOM_STUDENTS');
    $scope.actionClassroomTeamsActionSheet = $translate.instant('ACTIONS_CLASSROOM_TEAMS');
    $scope.actionItemsActionSheet = $translate.instant('ACTIONS_ITEMS');
    $scope.actionMissionsActionSheet = $translate.instant('ACTION_MISSIONS');
    $scope.actionRewardsActionSheet = $translate.instant('ACTION_REWARDS');
    $scope.actionTeacherHomeActionSheet = $translate.instant('ACTIONS_TEACHER_HOME');
    $scope.achievementText = $translate.instant('ACHIEVEMENT');
    $scope.archiveClassroomsActionSheetOption = $translate.instant('ARCHIVE_CLASSES');
    $scope.backupActionSheetOption = $translate.instant('BACKUP');
    $scope.becouseCompleteMission = $translate.instant('BECAUSE_COMPLETE_MISSION');
    $scope.cancelText = $translate.instant('CANCEL');
    $scope.cantAskMoreScoreAlert = $translate.instant('CANT_ASK_MORE_SCORE_THAN_MAX');
    $scope.cantCreateMoreTeamsThanStudentsAlert = $translate.instant('CANT_CREATE_MORE_TEAMS_THAN_STUDENT');
    $scope.changeScore = $translate.instant('CHANGE_SCORE');
    $scope.classCodePopup = $translate.instant('CLASS_CODE');
    $scope.dataChangedAlert = $translate.instant('DATA_CHANGED');
    $scope.deleteAchievementsActionSheetOption = $translate.instant('DELETE_ACHIEVEMENTS');
    $scope.deleteClassroomsActionSheetOption = $translate.instant('DELETE_CLASSROOMS');
    $scope.deleteItemsActionSheetOption = $translate.instant('DELETE_ITEMS');
    $scope.deleteMissionsActionSheetOption = $translate.instant('DELETE_MISSIONS');
    $scope.deleteRewardsActionSheetOption = $translate.instant('DELETE_REWARDS');
    $scope.deleteStudentsActionSheetOption = $translate.instant('DELETE_STUDENTS');
    $scope.deleteTeamsActionSheetOption = $translate.instant('DELETE_TEAMS');
    $scope.editScoreText = $translate.instant('EDIT_SCORE');
    $scope.errorEmailUsedAlert = $translate.instant('EMAIL_ALREADY_USED');
    $scope.emailChangedAlert = $translate.instant('EMAIL_CHANGED');
    $scope.emailInvalidAlert = $translate.instant('EMAIL_INVALID');
    $scope.errorUnknowAlert = $translate.instant('ERROR_ACCESS_UNKNOW');
    $scope.evaluateStudentsActionSheetOption = $translate.instant('EVALUATE_STUDENTS');
    $scope.evaluateTeamsActionSheetoption = $translate.instant('EVALUATE_TEAMS');
    $scope.exportPopoverOption = $translate.instant('EXPORT');
    $scope.fileInvalidAlert = $translate.instant('FILE_INVALID');
    $scope.hasLostMinPointItemAlert = $translate.instant('HAS_LOST_MIN_POINTS_IN_ITEM');
    $scope.hasRecibedMaxPointsItemAlert = $translate.instant('HAS_RECIBED_MAX_POINTS_IN_ITEM');
    $scope.importPopoverOption = $translate.instant('IMPORT');
    $scope.inTheAchievementText = $translate.instant('IN_THE_ACHIEVEMENT');
    $scope.introduceMissionName = $translate.instant('INTRODUCE_MISSION_NAME');
    $scope.introduceAdditionalPoints = $translate.instant('INTRODUCE_ADDITIONAL_POINTS');
    $scope.maxPointsHasBeenEstablishedAlert = $translate.instant('MAX_SCORE_ESTABLISEHD');
    $scope.maxPointsWillEstablishAlert = $translate.instant('MAX_SCORE_WILL_ESTABLISH');
    $scope.nextText = $translate.instant('NEXT');
    $scope.notificationFinishedMissionStudentSide = $translate.instant('HAVE_FINISHED_MISSION');
    $scope.notificationsFinishedMissionTeacherSide = $translate.instant('HAS_FINISHED_MISSION');
    $scope.notificationMissionEnded = $translate.instant('HAS_FINISHED');
    $scope.notificationOfMission = $translate.instant('NOTIFICATION_OF_MISSION');
    $scope.notificationOfStudent = $translate.instant('NOTIFICATION_OF_STUDENT');
    $scope.notificationLose = $translate.instant('NOTIFICATION_HAS_LOST');
    $scope.notificationTypeItem = $translate.instant('ITEM');
    $scope.notificationTypeMission = $translate.instant('MISSION');
    $scope.notificationTypeReward = $translate.instant('REWARD');
    $scope.notificationUnlockedLevelAchievementStudentSide = $translate.instant('HAVE_UNLOCKED_LEVEL_ACHIEVEMENT');
    $scope.notificationUnlockedLevelAchievementTeacherSide = $translate.instant('HAS_UNLOCKED_LEVEL_ACHIEVEMENT');
    $scope.notificationLostAchievementStudentSide = $translate.instant('HAVE_LOST_ACHIEVEMENT');
    $scope.notificationLostAchievementTeacherSide = $translate.instant('HAS_LOST_ACHIEVEMENT');
    $scope.notificationWin = $translate.instant('NOTIFICATION_HAS_WIN');
    $scope.passwordChangedAlert = $translate.instant('PASSWORD_CHANGED');
    $scope.pointOnTheitemSet = $translate.instant('POINTS_ON_THE_ITEM');
    $scope.randomStudentActionSheetOption = $translate.instant('RANDOM_STUDENT');
    $scope.randomTeamActionSheetOption = $translate.instant('RANDOM_TEAM');
    $scope.sendMessageActionSheetOption = $translate.instant('SEND_MESSAGE');
    $scope.studentDoesNotHaveEnougPointsAlert = $translate.instant('STUDENT_DOESNT_HAVE_ENOUGH_POINTS');
    $scope.takeAttendanceActionSheetOption = $translate.instant('TAKE_ATTENDANCE');
    $scope.teacherMessageNotificationType = $translate.instant('TEACHER_MESSAGE');
    $scope.useDefaultPoints = $translate.instant('USE_DEFAULT_POINT');
    $scope.unarchiveClassroomsActionSheetOption = $translate.instant('UNARCHIVE_CLASSES');
    $scope.weakPasswordAlert = $translate.instant('ERROR_WEAK_PASSWORD');
    $scope.youHaveWinTheReward = $translate.instant('YOU_WIN_REWARD');
    $scope.zeroPointEstablishedAlert = $translate.instant('ZERO_SCORE_ESTABLISHED');
    $scope.zeroPointsWillEstablishAlert = $translate.instant('ZERO_SCORE_WILL_ESTABLISH');
  });

}])