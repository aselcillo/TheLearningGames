angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBBKqBEuzK2MF9zm4V6u5BoqWWfdtQEF94",
  	authDomain: "thelearninggamesproject-99882.firebaseapp.com",
  	databaseURL: "https://thelearninggamesproject-99882.firebaseio.com",
  	storageBucket: "thelearninggamesproject-99882.appspot.com",
  	messagingSenderId: "451254044984",
  };
  firebase.initializeApp(config);

})