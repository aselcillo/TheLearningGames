angular.module('app.translationsController', ['pascalprecht.translate'])

.controller('changeLanguageCtrl', ['$translate', '$scope',
  function ($translate, $scope) {
 
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

    $scope.$on('changeLanguageEvent', function(event, args) {
      $scope.changeLanguage(args.language);
    });

}])