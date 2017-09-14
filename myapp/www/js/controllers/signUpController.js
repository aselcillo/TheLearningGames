angular.module('app.signUpController', ['pascalprecht.translate'])

.controller('signUpCtrl', ['$scope', '$stateParams', '$http', '$state', 'sharedData', '$ionicLoading', '$translate', '$rootScope', '$ionicPopup',
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state, sharedData, $ionicLoading, $translate, $rootScope, $ionicPopup) {

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
  $translate(['EMAIL_INVALID', 'ERROR_ACCESS_UNKNOW', 'EMAIL_ALREADY_USED', 'ERROR_WEAK_PASSWORD', 'SCHOOL_NOT_ESTABLISHED', 'VERIFY_EMAIL', 'TERMS_CONDITIONS']).then(function(translations) {
    $scope.emailInvalidAlert = translations.EMAIL_INVALID;
    $scope.errorEmailUsedAlert = translations.EMAIL_ALREADY_USED;
    $scope.errorUnknowAlert = translations.ERROR_ACCESS_UNKNOW;
    $scope.schholNotEstablished = translations.SCHOOL_NOT_ESTABLISHED;
    $scope.weakPasswordAlert = translations.ERROR_WEAK_PASSWORD;
    $scope.checkEmailToVerify = translations.VERIFY_EMAIL;
    $scope.termsAndConditions = translations.TERMS_CONDITIONS;
  });

  /**
    Needed for the translations to change their value in execution time.
  */
  $rootScope.$on('$translateChangeSuccess', function () {
    $scope.emailInvalidAlert = $translate.instant('EMAIL_INVALID');
    $scope.errorEmailUsedAlert = $translate.instant('EMAIL_ALREADY_USED');
    $scope.errorUnknowAlert = $translate.instant('ERROR_ACCESS_UNKNOW');
    $scope.schholNotEstablished = $translate.instant('SCHOOL_NOT_ESTABLISHED');
    $scope.weakPasswordAlert = $translate.instant('ERROR_WEAK_PASSWORD');
    $scope.checkEmailToVerify = $translate.instant('VERIFY_EMAIL');
    $scope.termsAndConditions = $translate.instant('TERMS_CONDITIONS');
  });

  $scope.modelSignUp = {};

  $scope.defaultAvatar = 'img/userDefaultAvatar.png';

  var rootRef = firebase.database().ref();

  var teachersRef = firebase.database().ref('teachers');
  var studentsRef = firebase.database().ref('students');

  $scope.termsAndConditionsTextEN = '<b>Terms & Conditions</b>'+ '</br>'+
      '</br>'+
      'The Learning Games is a project funded by the European Union under the Erasmus+ '+
      'KA2 framework and developed collectively by the following educational entities to '+
      'provide teachers with a tool to apply their gamification models in the classroom and '+
      'keep track of their students’ performance within the model, being Mr. Asel Acebedo '+
      'Romalde and Elvis Alonso Lueje the main programmers: '+ '</br>'+
      '</br>'+
      '<ul>'+ '<li>' + '- IES Juan José Calvo Miguel. Avda. Constitución 1. 33950 Sotrondio '+
      '(Asturias, Spain) '+ '</li>' + '</br>'+
      '<li>' +'- CEPA Río Tajo. Avda. Pío XII 2 bis. 45600 Talavera de la Reina (Castilla-La '+
      'Mancha, Spain) '+ '</li>' + '</br>'+
      '<li>' +'- St. John’s Central College. Sawmill Street. Cork (Ireland) '+ '</br>'+
      '<li>' +'- Budapesti Metropolitan Egyetem. Nagy Lajos király útja 1-9. 1148 Budapest '+
      '(Hungary) '+ '</li>' + '</br>'+
      '<li>' +'- Volkshochschule für den Landkreis Regen. Amtsgerichtsstraße 6 – 8. 94209 '+
      'Regen (Germany) '+ '</li>' + '</br>'+
      '<li>' +'- Hasan Fatma Önal Anadolu Lisesi. Uydukent Altı, Yavansu Mevkii. 09400 '+
      'Kusadasi (Aydin, Turkey) '+ '</li>' + '</ul>' + '</br>'+
      '</br>'+
      'By downloading or using the app, these terms will automatically apply to you – you '+
      'should make sure, therefore, that you read them carefully before using the app. You’re '+
      'not allowed to copy, or modify the app, any part of the app, or our trademarks in any '+
      'way. You’re not allowed to attempt to extract the source code of the app, or make '+
      'derivative versions. The app itself, and all the trade marks, copyright, database rights '+
      'and other intellectual property rights related to it, still belong to The Learning Games. If '+
      'you want to translate the app to any language not included, please contact '+
      'thelearninggamesproject@gmail.com with the subject “New translation” and we will '+
      'include it in a future update. '+ '</br>'+
      '</br>'+
      'The Learning Games is committed to ensuring that the app is as useful and efficient as '+
      'possible. For that reason, we reserve the right to make changes to the app to include '+
      'new functionalities, bugfixes, performance developments and include new operating '+
      'systems. The app, however, will remain free of charge. '+ '</br>'+
      '</br>'+
      'The Classquest app stores personal data that you have provided to us, in order to '+
      'provide our Service. It’s your responsibility to keep your phone and access to the app '+
      'secure. We therefore recommend that you do not jailbreak or root your phone, which is '+
      'the process of removing software restrictions and limitations imposed by the official '+
      'operating system of your device. It could make your phone vulnerable to '+
      'malware/viruses/malicious programs, compromise your phone’s security features and it '+
      'could mean that the Classquest app won’t work properly or at all. '+ '</br>'+
      '</br>'+
      'You should be aware that there are certain things that The Learning Games will not take '+
      'responsibility for. As of this version, Classquest will require the app to have an active '+
      'internet connection. The connection can be Wi-Fi, or provided by your mobile network '+
      'provider, but The Learning Games cannot take responsibility for the app not working at '+
      'full functionality if you don’t have access to a working internet connection. '+
      'If you’re using the app outside of an area with Wi-Fi, you should remember that your '+
      'terms of the agreement with your mobile network provider will still apply. As a result, '+
      'you may be charged by your mobile provider for the cost of data for the duration of the '+
      'connection while accessing the app, or other third party charges. In using the app, '+
      'you’re accepting responsibility for any such charges, including roaming data charges if '+
      'you use the app outside of your home territory (i.e. region or country) without turning '+
      'off data roaming. If you are not the bill payer for the device on which you’re using the '+
      'app, please be aware that we assume that you have received permission from the bill '+
      'payer for using the app. '+ '</br>'+
      '</br>'+
      'Along the same lines, The Learning Games cannot always take responsibility for the '+
      'way you use the app i.e. You need to make sure that your device stays charged – if it '+
      'runs out of battery and you can’t turn it on to avail the Service, The Learning Games '+
      'cannot accept responsibility. '+ '</br>'+
      '</br>'+
      'With respect to The Learning Games’ responsibility for your use of the app, when '+
      'you’re using the app, it’s important to bear in mind that although we endeavour to '+
      'ensure that it is updated and correct at all times, we do rely on third parties to provide '+
      'information to us so that we can make it available to you. The Learning Games accepts '+
      'no liability for any loss, direct or indirect, you experience as a result of relying wholly '+
      'on this functionality of the app. '+ '</br>'+
      '</br>'+
      'At some point, we may wish to update the app. The app is currently available on '+
      'Android and iOS under Ionic View emulator– the requirements for both systems (and '+
      'for any additional systems we decide to extend the availability of the app to) may '+
      'change, and you’ll need to download the updates if you want to keep using the app. The '+
      'Learning Games does not promise that it will always update the app so that it is relevant '+
      'to you and/or works with the iOS/Android version that you have installed on your '+
      'device. However, you promise to always accept updates to the application when offered '+
      'to you, We may also wish to stop providing the app, and may terminate use of it at any '+
      'time without giving notice of termination to you. Unless we tell you otherwise, upon '+
      'any termination, (a) the rights and licenses granted to you in these terms will end; (b) '+
      'you must stop using the app, and (if needed) delete it from your device. '+
      'Changes to This Terms and Conditions '+ '</br>'+
      '</br>'+
      'We reserve the right to update our Terms and Conditions from time to time. Thus, you '+
      'are advised to review this page with any new version for any changes. Changes to '+
      'Terms and Conditions may also be notified in our website thelearninggames.eu. These '+
      'changes are effective immediately after they are included in the app. '+ '</br>'+
      '</br>'+
      '<b>Contact Us </b>'+ '</br>'+
      '</br>'+
      'If you have any questions or suggestions about our Terms and Conditions, do not '+
      'contact us at <a href="mailto:thelearninggamesproject@gmail.com?Subject=The%20Learning%20Games" target="_top">thelearninggamesproject@gmail.com</a> ';

  $scope.termsAndConditionsTextES = '<b>Términos y condiciones de uso</b> '+ '</br>'+
      '</br>'+
      'The Learning Games es un proyecto cofinanciado por la Unión Europea dentro del '+
      'marco del Programa Erasmus+, Acción Clave 2 de Asociaciones Estratégicas de '+
      'Formación Profesional, que tiene como objetivo proveer al profesorado de una '+
      'herramienta para aplicar sus modelos de gamificación en el aula y realizar el '+
      'seguimiento de la evolución de sus alumnas y alumnos dentro de dicho modelo, y que '+
      'ha sido desarrollado colectivamente por las siguientes entidades educativas, siendo los '+
      'principales desarrolladores Elvis Alonso Lueje y Asel Acebedo Romalde: '+ '</br>'+
      '</br>'+
      '<ul>'+ '<li>' + '- IES Juan José Calvo Miguel. Avda. Constitución 1. 33950 Sotrondio '+
      '(Asturias, España) '+ '</li>' + '</br>'+
      '<li>' +'- CEPA Río Tajo. Avda. Pío XII 2 bis. 45600 Talavera de la Reina (Castilla-La '+
      'Mancha, España) '+ '</li>' + '</br>'+
      '<li>' +'- St. John’s Central College. Sawmill Street. Cork (Irlanda) '+ '</br>'+
      '<li>' +'- Budapesti Metropolitan Egyetem. Nagy Lajos király útja 1-9. 1148 Budapest '+
      '(Hungría) '+ '</li>' + '</br>'+
      '<li>' +'- Volkshochschule für den Landkreis Regen. Amtsgerichtsstraße 6 – 8. 94209 '+
      'Regen (Baviera, Alemania) '+ '</li>' + '</br>'+
      '<li>' +'- Hasan Fatma Önal Anadolu Lisesi. Uydukent Altı, Yavansu Mevkii. 09400 '+
      'Kusadasi (Aydin, Turquía) '+ '</li>' + '</ul>' + '</br>'+
      '</br>'+
      'Al descargar e instalar la aplicación, el usuario automáticamente acepta estas '+
      'condiciones, por lo tanto, recomendamos encarecidamente leerlas antes de utilizar la '+
      'aplicación. El uso de la aplicación no permite la copia ni la modificación de una parte o '+
      'su totalidad. No se permite intento alguno de extraer código fuente de la aplicación ni '+
      'desarrollar versiones derivadas de la misma. La aplicación, todas las marcas registradas, '+
      'derechos de autor y propiedad intelectual relacionados con la misma pertenecen a The '+
      'Learning Games. Se permite la traducción a idiomas no incluidos en la misma. Si el '+
      'usuario tiene interés en traducir la aplicación a algún idioma, puede contactar con '+
      'nosotros a través de thelearninggamesproject@gmail.com con el asunto “Nueva '+
      'traducción”. Dicha traducción será incluida en una versión futura mencionando su '+
      'autoría. '+ '</br>'+
      '</br>'+
      'The Learning Games se compromete a que la aplicación es tan útil y eficiente como sea '+
      'posible. Por esa razón, nos reservamos el derecho de realizar cambios a la misma para '+
      'añadir nuevas funcionalidades, corregir errores, mejorar el rendimiento y/o incluir '+
      'versiones para nuevos sistemas operativos. En todo caso, la aplicación continuará '+
      'siendo gratuita. '+ '</br>'+
      '</br>'+
      'La aplicación Classquest almacena la información personal mínima para poder realizar '+
      'el servicio en forma encriptada en Firebase (https://firebase.google.com, os '+
      'recomendamos leer su política de privacidad de datos). Es responsabilidad del usuario '+
      'mantener la seguridad tanto del dispositivo electrónico utilizado como del acceso a la '+
      'aplicación. Así, recomendamos no realizar jailbreak o root en el teléfono, procesos que '+
      'eliminan las restricciones y limitaciones del sistema operativo impuestas por el '+
      'fabricante del mismo. Podría aumentar la vulnerabilidad del dispositivo y comprometer '+
      'sus funciones de seguridad, lo que podría implicar que Classquest no funcionara '+
      'correctamente, de lo que, en ese caso, no nos podemos responsabilizar. '+ '</br>'+
      '</br>'+
      'Asimismo, existen otros supuestos de los que The Learning Games no se puede hacer '+
      'responsable. En la presente versión, Classquest requiere una conexión activa a Internet '+
      'para poder funcionar. La conexión puede ser tanto Wi-Fi como los datos móviles de la '+
      'operadora del dispositivo electrónico (si los tuviera). Por lo tanto, The Learning Games '+
      'no se responsabilizará que la aplicación no funcione correctamente en caso de que el '+
      'dispositivo no disponga de una conexión activa a Internet. '+
      'La utilización de la aplicación fuera de un área con Wi-Fi puede acarrear gastos '+
      'adicionales en función de los términos de contrato con la operadora telefonía móvil del '+
      'dispositivo. Como resultado, la operadora de telefonía móvil del usuario podría '+
      'realizarle cargos por la duración de la conexión mientras accede a la aplicación, u otro '+
      'tipo de cargos. Al utilizar la aplicación, el usuario acepta la responsabilidad por dichos '+
      'cargos, incluyendo los cargos de datos móviles en itinerancia si utilizara la aplicación '+
      'fuera de la cobertura nacional de su operadora de telefonía móvil sin desconectar la '+
      'itinerancia de datos. Si el contrato con la operadora de telefonía móvil del dispositivo no '+
      'está a nombre del usuario, entendemos que ha obtenido permiso previamente por parte '+
      'del titular de dicho contrato para la utilización de la aplicación. '+
      'Asimismo, The Learning Games no asume la responsabilidad en caso de pérdida de '+
      'datos si el dispositivo electrónico no funciona correctamente, si pierde la conexión o si '+
      'se apaga por falta de batería. '+ '</br>'+
      '</br>'+
      'The Learning Games no se responsabiliza del uso que el usuario pueda darle a la '+
      'aplicación. Intentamos mantener el servicio actualizado y activo continuamente, pero '+
      'dependemos de terceras partes para almacenar la información y poder dar acceso al '+
      'usuario a su información almacenada. No nos responsabilizamos de la pérdida, directa o '+
      'indirecta de datos que el usuario pueda experimentar como resultado de la utilización de '+
      'esta funcionalidad de la aplicación. '+ '</br>'+
      '</br>'+
      'Probablemente, en algún momento queramos o necesitemos actualizar la aplicación. '+
      'Actualmente, la aplicación funciona de forma nativa en Android 5.0 y superioress y en '+
      'iOS a través de la aplicación Ionic View (recomendamos, asimismo, leer sus políticas '+
      'de privacidad y términos y condiciones de uso, que será necesario aceptar para poder '+
      'utilizar Classquest en iOS). Es posible que los requisitos de funcionamiento de ambos '+
      'sistemas operativos (y de otros sistemas, si se extendiera el desarrollo de la aplicación a '+
      'otros sistemas) y, en caso de actualización, puede ser necesaria su descarga para '+
      'continuar utilizando la aplicación. The Learning Games no se responsabiliza de los '+
      'cambios de requisites de los sistemas operativos. Tampoco se responsabiliza de que el '+
      'cambio de dispositivo del usuario implique no poder seguir utilizando la aplicación. La '+
      'no aceptación de una actualización por parte del usuario puede implicar no poder '+
      'continuar utilizando la aplicación. '+ '</br>'+
      '</br>'+
      '<b>Cambios en los Términos y Condiciones de Uso</b> '+ '</br>'+
      '</br>'+
      'Nos reservamos el derecho de actualizar estos Términos y Condiciones de Uso en '+
      'versiones futuras, respetando siempre los principios de gratuidad y no cesión de datos '+
      'bajo ningún concepto. Se recomienda revisar consultar la presente sección con cada '+
      'nueva versión por si hubiera habido cambios. Los cambios en los Términos y '+
      'Condiciones de Uso se podrán notificar también a través de nuestra página web '+
      'www.thelearniggames.eu. Los cambios serán efectivos con su inclusión en la '+
      'aplicación. '+ '</br>'+
      '</br>'+
      'El uso de la aplicación indebido, fraudulento o con fines contrarios a las disposiciones '+
      'legales vigentes implicará la terminación inmediata del derecho de uso de la misma, sin '+
      'perjuicio de las acciones legales que se pudieran emprender. '+ '</br>'+
      '</br>'+
      'En el momento de terminación de esto Términos y Condiciones de Uso por cualquier '+
      'motivo, el derecho del usuario a utilizar la aplicación cesará de forma inmediata. '+
      'Cualquier terminación por cualquier parte, de su acceso a Classquest o uso del mismo '+
      'puede llevarse a cabo sin aviso previo a la otra parte. En caso de terminación por '+
      'cualquier motivo, The Learning Games puede desactivar o eliminar de forma inmediata '+
      'cualquier nombre de usuario y/o contraseña que usted utilice o que se le haya '+
      'proporcionado, y toda la información y archivos relacionados y/o impedir cualquier '+
      'acceso adicional a esta información o archivos. Ninguna de las partes será responsable '+
      'frente a la otra o frente a terceros por la terminación del acceso al Classquest o a '+
      'cualquier información o archivos relacionados con dicho acceso y tampoco se les podrá '+
      'exigir que los pongan a disposición de la otra parte tras dicha terminación. '+ '</br>'+
      '</br>'+
      '<b>Contacta con nosotros</b> '+ '</br>'+
      '</br>'+
      'Si tienes alguna pregunta, duda, sugerencia o detectas un error en relación a estos '+
      'Términos y Condiciones de Uso, no dudes en contactar con nosotros en '+
      '<a href="mailto:thelearninggamesproject@gmail.com?Subject=The%20Learning%20Games" target="_top">thelearninggamesproject@gmail.com.</a>';

  $scope.termsAndConditionsLabel = '';
  if($translate.proposedLanguage() === 'en'){
    $scope.termsAndConditionsLabel = 'By signing up you agree to our terms of service';
  } else if($translate.proposedLanguage() === 'es') {
    $scope.termsAndConditionsLabel = 'Al registrarse acepta los términos y condiciones de uso';
  }


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

  /**
  */
  $scope.showTermsPopup = function() {
      $ionicPopup.alert({
        title: $scope.termsAndConditions,
        content: ($translate.proposedLanguage() === 'en') ? $scope.termsAndConditionsTextEN : $scope.termsAndConditionsTextES,
        buttons: [{
            text: $scope.okayText,
            type: 'button-positive'
          },
        ]
      });
    }

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
              $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.checkEmailToVerify);
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
              $scope.popupAlertCreate('<i class="icon ion-information-circled"></i>', $scope.checkEmailToVerify);
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
            $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.weakPasswordAlert);
    				break;
    			case "auth/email-already-in-use":
            $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.errorEmailUsedAlert);
    				break;
    			case "auth/invalid-email":
            $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.emailInvalidAlert);
    				break;
    			default:
            $scope.popupAlertCreate('<i class="icon ion-alert-circled"></i>', $scope.errorUnknowAlert);
        }
        $ionicLoading.hide();
		  }
    });
  }
}])