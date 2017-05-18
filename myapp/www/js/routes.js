angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Each state's controller can be found in controllers/
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