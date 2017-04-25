angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signUp', {
    url: '/signUp',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('teacherHome', {
    url: '/teacherHome',
    templateUrl: 'templates/teacherHome.html',
    controller: 'teacherHomeCtrl'
  })

  .state('studentHome', {
    url: '/studentHome',
    templateUrl: 'templates/studentHome.html',
    controller: 'studentHomeCtrl'
  })

$urlRouterProvider.otherwise('/login')

});