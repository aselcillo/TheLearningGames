angular.module('app.settingsController', ['pascalprecht.translate'])

.controller('settingsCtrl', ['$scope', '$ionicPopup', '$translate', '$rootScope',
  function($scope, $ionicPopup, $translate, $rootScope) {

    /**
      Needed for the translations to work in the controller's words.
    */
    $translate(['ABOUT', 'HELP', 'OKAY', 'TERMS_CONDITIONS']).then(function(translations) {
      $scope.about = translations.ABOUT;
      $scope.helpText = translations.HELP;
      $scope.okayText = translations.OKAY;
      $scope.termsAndConditions = translations.TERMS_CONDITIONS;
    });

    /**
      Needed for the translations to change their value in execution time.
    */
    $rootScope.$on('$translateChangeSuccess', function () {
      $scope.about = $translate.instant('ABOUT');
      $scope.helpText = $translate.instant('HELP');
      $scope.okayText = $translate.instant('OKAY');
      $scope.termsAndConditions = $translate.instant('TERMS_CONDITIONS');
    });

    /**
      Shows a popup that contains help's information.
    */
    $scope.showHelpPopup = function() {
      $ionicPopup.alert({
        title: $scope.helpText,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu tristique nulla. Vestibulum nulla risus, tincidunt a ante at, euismod auctor diam. Etiam blandit velit ipsum, non accumsan ligula mattis facilisis. Nulla tristique facilisis nisl. Maecenas venenatis ipsum quis metus ultrices faucibus. Donec arcu risus, mollis facilisis massa sit amet, posuere efficitur mi. Praesent elementum justo nec felis accumsan consectetur. Cras rutrum lacinia magna, eu bibendum erat finibus vitae. Vestibulum iaculis sem sit amet ex ornare ornare. Vestibulum sodales velit non mauris pretium finibus.',
        buttons: [{
            text: $scope.okayText,
            type: 'button-positive'
          },
        ]
      }).then(function(res) {
        if (res) {
        } else {
        }
      });
    }

    /**
      Shows a popup that contains terms and conditions' information.
    */
    $scope.showTermsPopup = function() {
      $ionicPopup.alert({
        title: $scope.termsAndConditions,
        content: 'Sed cursus rhoncus porta. Aenean sed ante a sem molestie posuere. In maximus sem justo, eu ultrices leo tincidunt sed. Nulla feugiat convallis luctus. Donec vitae sodales augue. Fusce tortor neque, tincidunt id felis vel, tincidunt aliquam nisl. Fusce maximus aliquam sodales.',
        buttons: [{
            text: $scope.okayText,
            type: 'button-positive'
          },
        ]
      }).then(function(res) {
        if (res) {
        } else {
        }
      });
    }

    /**
      Shows a popup that contains about's information.
    */
    $scope.showAboutPopup = function() {
      $ionicPopup.alert({
        title: $scope.about,
        content: 'Quisque convallis scelerisque lorem, et accumsan erat porttitor quis. Aenean tincidunt iaculis risus, eu aliquet turpis scelerisque at. Etiam est nisi, maximus sed ultricies quis, ornare et ex. Nam at fermentum arcu. Nullam risus ipsum, convallis et tortor in, tempor blandit tortor. Cras non viverra est, vel pellentesque lectus. Sed libero mi, tristique quis interdum sit amet, ornare at libero. Suspendisse cursus rutrum lectus, sit amet interdum nunc egestas in. Maecenas vitae luctus ligula. Donec vehicula mi sed leo elementum dictum. In magna dui, lobortis vitae dui at, viverra mattis erat. Aenean sit amet justo a ex porta scelerisque. Praesent nec rutrum urna, sed accumsan lorem.'
        +''
        +'Nullam ultrices tempor sem, ac lacinia ligula consectetur at. Quisque non elit sit amet dui tincidunt accumsan non ac lectus. Donec sit amet arcu finibus, commodo elit finibus, tincidunt dolor. Cras nec velit eget nibh sodales faucibus a pellentesque diam. Etiam volutpat tortor at varius euismod. Suspendisse eget justo quis enim ornare pellentesque. Vestibulum congue sed orci vel scelerisque. Vivamus ac accumsan nulla. Etiam euismod tortor in velit facilisis tristique.',
        buttons: [{
            text: $scope.okayText,
            type: 'button-positive'
          },
        ]
      }).then(function(res) {
        if (res) {
        } else {
        }
      });
    }
}])