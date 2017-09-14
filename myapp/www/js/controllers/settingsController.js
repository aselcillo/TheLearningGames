angular.module('app.settingsController', ['pascalprecht.translate'])

.controller('settingsCtrl', ['$scope', '$ionicPopup', '$translate', '$rootScope',
  function($scope, $ionicPopup, $translate, $rootScope) {

    /**
      Needed for the translations to work in the controller's words.
    */
    $translate(['ABOUT', 'HELP', 'OKAY', 'TERMS_CONDITIONS', 'PRIVACY_POLICY']).then(function(translations) {
      $scope.about = translations.ABOUT;
      $scope.helpText = translations.HELP;
      $scope.okayText = translations.OKAY;
      $scope.termsAndConditions = translations.TERMS_CONDITIONS;
      $scope.privacyPolicy = translations.PRIVACY_POLICY;
    });

    /**
      Needed for the translations to change their value in execution time.
    */
    $rootScope.$on('$translateChangeSuccess', function () {
      $scope.about = $translate.instant('ABOUT');
      $scope.helpText = $translate.instant('HELP');
      $scope.okayText = $translate.instant('OKAY');
      $scope.termsAndConditions = $translate.instant('TERMS_CONDITIONS');
      $scope.privacyPolicy = $translate.instant('PRIVACY_POLICY');
    });

    /**
      Shows a popup that contains privacy policy.
    */
    $scope.showPrivacyPolicyPopup = function() {
      $ionicPopup.alert({
        title: $scope.privacyPolicy,
        content: ($translate.proposedLanguage() === 'en') ? $scope.privacyPolicyEN : $scope.privacyPolicyES,
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
      Shows a popup that contains help's information.
    */
    $scope.showHelpPopup = function() {
      $ionicPopup.alert({
        title: $scope.helpText,
        content: ($translate.proposedLanguage() === 'en') ? $scope.helpEN : $scope.helpES,
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
        content: ($translate.proposedLanguage() === 'en') ? $scope.termsAndConditionsTextEN : $scope.termsAndConditionsTextES,
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
        content: ($translate.proposedLanguage() === 'en') ? $scope.aboutEN : $scope.aboutES,
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

    $scope.helpEN = 'Help is available at <a href="http://www.thelearninggames.eu">www.thelearninggames.eu</a>';

    $scope.helpES = 'La ayuda está disponible en <a href="http://www.thelearninggames.eu">www.thelearninggames.eu</a>';

    $scope.aboutEN = 'Classquest version 1.0'+ '</br>'+
      '</br>'+
      '(C)2017 The Learning Games.';

    $scope.aboutES = 'Classquest versión 1.0'+ '</br>'+
      '</br>'+
      '(C)2017 The Learning Games.';

    $scope.termsAndConditionsTextEN = '<b>Terms & Conditions</b>'+ '</br>'+
      '</br>'+
      'The Learning Games is a project funded by the European Union under the Erasmus+ '+
      'KA2 framework and developed collectively by the following educational entities to '+
      'provide teachers with a tool to apply their gamification models in the classroom and '+
      'keep track of their students’ performance within the model, being Mr. Asel Acebedo '+
      'Romalde and Elvis Alonso Lueje the main programmers:'+ '</br>'+
      '</br>'+
      '<ul>'+ '<li>' + '- IES Juan José Calvo Miguel. Avda. Constitución 1. 33950 Sotrondio '+
      '(Asturias, Spain)'+ '</li>' + '</br>'+
      '<li>' +'- CEPA Río Tajo. Avda. Pío XII 2 bis. 45600 Talavera de la Reina (Castilla-La '+
      'Mancha, Spain)'+ '</li>' + '</br>'+
      '<li>' +'- St. John’s Central College. Sawmill Street. Cork (Ireland)'+ '</br>'+
      '<li>' +'- Budapesti Metropolitan Egyetem. Nagy Lajos király útja 1-9. 1148 Budapest '+
      '(Hungary)'+ '</li>' + '</br>'+
      '<li>' +'- Volkshochschule für den Landkreis Regen. Amtsgerichtsstraße 6 – 8. 94209 '+
      'Regen (Germany)'+ '</li>' + '</br>'+
      '<li>' +'- Hasan Fatma Önal Anadolu Lisesi. Uydukent Altı, Yavansu Mevkii. 09400 '+
      'Kusadasi (Aydin, Turkey)'+ '</li>' + '</ul>' + '</br>'+
      '</br>'+
      'By downloading or using the app, these terms will automatically apply to you – you '+
      'should make sure, therefore, that you read them carefully before using the app. You’re '+
      'not allowed to copy, or modify the app, any part of the app, or our trademarks in any '+
      'way. You’re not allowed to attempt to extract the source code of the app, or make '+
      'derivative versions. The app itself, and all the trade marks, copyright, database rights '+
      'and other intellectual property rights related to it, still belong to The Learning Games. If '+
      'you want to translate the app to any language not included, please contact '+
      'thelearninggamesproject@gmail.com with the subject “New translation” and we will '+
      'include it in a future update.'+ '</br>'+
      '</br>'+
      'The Learning Games is committed to ensuring that the app is as useful and efficient as '+
      'possible. For that reason, we reserve the right to make changes to the app to include '+
      'new functionalities, bugfixes, performance developments and include new operating '+
      'systems. The app, however, will remain free of charge.'+ '</br>'+
      '</br>'+
      'The Classquest app stores personal data that you have provided to us, in order to '+
      'provide our Service. It’s your responsibility to keep your phone and access to the app '+
      'secure. We therefore recommend that you do not jailbreak or root your phone, which is '+
      'the process of removing software restrictions and limitations imposed by the official '+
      'operating system of your device. It could make your phone vulnerable to '+
      'malware/viruses/malicious programs, compromise your phone’s security features and it '+
      'could mean that the Classquest app won’t work properly or at all.'+ '</br>'+
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
      'payer for using the app.'+ '</br>'+
      '</br>'+
      'Along the same lines, The Learning Games cannot always take responsibility for the '+
      'way you use the app i.e. You need to make sure that your device stays charged – if it '+
      'runs out of battery and you can’t turn it on to avail the Service, The Learning Games '+
      'cannot accept responsibility.'+ '</br>'+
      '</br>'+
      'With respect to The Learning Games’ responsibility for your use of the app, when '+
      'you’re using the app, it’s important to bear in mind that although we endeavour to '+
      'ensure that it is updated and correct at all times, we do rely on third parties to provide '+
      'information to us so that we can make it available to you. The Learning Games accepts '+
      'no liability for any loss, direct or indirect, you experience as a result of relying wholly '+
      'on this functionality of the app.'+ '</br>'+
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
      'you must stop using the app, and (if needed) delete it from your device.'+ '</br>'+
      '</br>'+
      '<b>Changes to This Terms and Conditions</b>'+ '</br>'+
      '</br>'+
      'We reserve the right to update our Terms and Conditions from time to time. Thus, you '+
      'are advised to review this page with any new version for any changes. Changes to '+
      'Terms and Conditions may also be notified in our website thelearninggames.eu. These '+
      'changes are effective immediately after they are included in the app.'+ '</br>'+
      '</br>'+
      '<b>Contact Us</b>'+ '</br>'+
      '</br>'+
      'If you have any questions or suggestions about our Terms and Conditions, do not '+
      'contact us at <a href="mailto:thelearninggamesproject@gmail.com?Subject=The%20Learning%20Games" target="_top">thelearninggamesproject@gmail.com</a>';

    $scope.termsAndConditionsTextES = '<b>Términos y condiciones de uso</b>'+ '</br>'+
      '</br>'+
      'The Learning Games es un proyecto cofinanciado por la Unión Europea dentro del '+
      'marco del Programa Erasmus+, Acción Clave 2 de Asociaciones Estratégicas de '+
      'Formación Profesional, que tiene como objetivo proveer al profesorado de una '+
      'herramienta para aplicar sus modelos de gamificación en el aula y realizar el '+
      'seguimiento de la evolución de sus alumnas y alumnos dentro de dicho modelo, y que '+
      'ha sido desarrollado colectivamente por las siguientes entidades educativas, siendo los '+
      'principales desarrolladores Elvis Alonso Lueje y Asel Acebedo Romalde:'+ '</br>'+
      '</br>'+
      '<ul>'+ '<li>' + '- IES Juan José Calvo Miguel. Avda. Constitución 1. 33950 Sotrondio '+
      '(Asturias, España)'+ '</li>' + '</br>'+
      '<li>' +'- CEPA Río Tajo. Avda. Pío XII 2 bis. 45600 Talavera de la Reina (Castilla-La '+
      'Mancha, España)'+ '</li>' + '</br>'+
      '<li>' +'- St. John’s Central College. Sawmill Street. Cork (Irlanda)'+ '</br>'+
      '<li>' +'- Budapesti Metropolitan Egyetem. Nagy Lajos király útja 1-9. 1148 Budapest '+
      '(Hungría)'+ '</li>' + '</br>'+
      '<li>' +'- Volkshochschule für den Landkreis Regen. Amtsgerichtsstraße 6 – 8. 94209 '+
      'Regen (Baviera, Alemania)'+ '</li>' + '</br>'+
      '<li>' +'- Hasan Fatma Önal Anadolu Lisesi. Uydukent Altı, Yavansu Mevkii. 09400 '+
      'Kusadasi (Aydin, Turquía)'+ '</li>' + '</ul>' + '</br>'+
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
      'autoría.'+ '</br>'+
      '</br>'+
      'The Learning Games se compromete a que la aplicación es tan útil y eficiente como sea '+
      'posible. Por esa razón, nos reservamos el derecho de realizar cambios a la misma para '+
      'añadir nuevas funcionalidades, corregir errores, mejorar el rendimiento y/o incluir '+
      'versiones para nuevos sistemas operativos. En todo caso, la aplicación continuará '+
      'siendo gratuita.'+ '</br>'+
      '</br>'+
      'La aplicación Classquest almacena la información personal mínima para poder realizar '+
      'el servicio en forma encriptada en Firebase (https://firebase.google.com, os '+
      'recomendamos leer su política de privacidad de datos). Es responsabilidad del usuario '+
      'mantener la seguridad tanto del dispositivo electrónico utilizado como del acceso a la '+
      'aplicación. Así, recomendamos no realizar jailbreak o root en el teléfono, procesos que '+
      'eliminan las restricciones y limitaciones del sistema operativo impuestas por el '+
      'fabricante del mismo. Podría aumentar la vulnerabilidad del dispositivo y comprometer '+
      'sus funciones de seguridad, lo que podría implicar que Classquest no funcionara '+
      'correctamente, de lo que, en ese caso, no nos podemos responsabilizar.'+ '</br>'+
      '</br>'+
      'Asimismo, existen otros supuestos de los que The Learning Games no se puede hacer '+
      'responsable. En la presente versión, Classquest requiere una conexión activa a Internet '+
      'para poder funcionar. La conexión puede ser tanto Wi-Fi como los datos móviles de la '+
      'operadora del dispositivo electrónico (si los tuviera). Por lo tanto, The Learning Games '+
      'no se responsabilizará que la aplicación no funcione correctamente en caso de que el '+
      'dispositivo no disponga de una conexión activa a Internet.'+
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
      'se apaga por falta de batería.'+ '</br>'+
      '</br>'+
      'The Learning Games no se responsabiliza del uso que el usuario pueda darle a la '+
      'aplicación. Intentamos mantener el servicio actualizado y activo continuamente, pero '+
      'dependemos de terceras partes para almacenar la información y poder dar acceso al '+
      'usuario a su información almacenada. No nos responsabilizamos de la pérdida, directa o '+
      'indirecta de datos que el usuario pueda experimentar como resultado de la utilización de '+
      'esta funcionalidad de la aplicación.'+ '</br>'+
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
      'continuar utilizando la aplicación.'+ '</br>'+
      '</br>'+
      '<b>Cambios en los Términos y Condiciones de Uso</b>'+ '</br>'+
      '</br>'+
      'Nos reservamos el derecho de actualizar estos Términos y Condiciones de Uso en '+
      'versiones futuras, respetando siempre los principios de gratuidad y no cesión de datos '+
      'bajo ningún concepto. Se recomienda revisar consultar la presente sección con cada '+
      'nueva versión por si hubiera habido cambios. Los cambios en los Términos y '+
      'Condiciones de Uso se podrán notificar también a través de nuestra página web '+
      'www.thelearniggames.eu. Los cambios serán efectivos con su inclusión en la '+
      'aplicación.'+ '</br>'+
      '</br>'+
      'El uso de la aplicación indebido, fraudulento o con fines contrarios a las disposiciones '+
      'legales vigentes implicará la terminación inmediata del derecho de uso de la misma, sin '+
      'perjuicio de las acciones legales que se pudieran emprender.'+ '</br>'+
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
      'exigir que los pongan a disposición de la otra parte tras dicha terminación.'+ '</br>'+
      '</br>'+
      '<b>Contacta con nosotros</b>'+ '</br>'+
      '</br>'+
      'Si tienes alguna pregunta, duda, sugerencia o detectas un error en relación a estos '+
      'Términos y Condiciones de Uso, no dudes en contactar con nosotros en '+
      '<a href="mailto:thelearninggamesproject@gmail.com?Subject=The%20Learning%20Games" target="_top">thelearninggamesproject@gmail.com.</a>';

    $scope.privacyPolicyEN = '<b>Privacy Policy</b>'+ '</br>'+
      '</br>'+
      'The Learning Games is a project funded by the European Union under the Erasmus+ '+
      'KA2 framework and developed collectively by the following educational entities to '+
      'provide teachers with a tool to apply their gamification models in the classroom and '+
      'keep track of their students’ performance within the model: '+ '</br>'+
      '</br>'+
      '<ul>'+ '<li>' +'- IES Juan José Calvo Miguel. Avda. Constitución 1. 33950 Sotrondio '+
      '(Asturias, Spain)'+ '</li>' + '</br>'+
      '<li>' +'- CEPA Río Tajo. Avda. Pío XII 2 bis. 45600 Talavera de la Reina (Castilla-La '+
      'Mancha, Spain)'+ '</li>' + '</br>'+
      '<li>' +'- St. John’s Central College. Sawmill Street. Cork (Ireland)'+ '</br>'+
      '<li>' +'- Budapesti Metropolitan Egyetem. Nagy Lajos király útja 1-9. 1148 Budapest '+
      '(Hungary)'+ '</li>' + '</br>'+
      '<li>' +'- Volkshochschule für den Landkreis Regen. Amtsgerichtsstraße 6 – 8. 94209 '+
      'Regen (Germany)'+ '</li>' + '</br>'+
      '<li>' +'- Hasan Fatma Önal Anadolu Lisesi. Uydukent Altı, Yavansu Mevkii. 09400 '+
      'Kusadasi (Aydin, Turkey)'+ '</li>' + '</ul>' + '</br>'+
      'This policy applies the Classquest app developed by the aforementioned entities (“The '+
      'Learning Games”, “we”, “us”, “our”).'+ '</br>'+
      'The Learning Games built the Classquest app as a Free app. This SERVICE is provided '+
      'by The Learning Games at no cost and is intended for use as is.'+ '</br>'+
      'This page is used to inform users regarding our policies with the collection, use, and '+
      'disclosure of Personal Information if anyone decided to use this Service. '+
      'If you choose to use our Service, then you agree to the collection and use of information '+
      'in relation to this policy. The Personal Information we collect is used for providing and '+
      'improving the Service. We will not use or share your information with anyone except as '+
      'described in this Privacy Policy.'+ '</br>'+
      '</br>'+
      'The terms used in this Privacy Policy have the same meanings as in our Terms and '+
      'Conditions, which is accessible at Classquest unless otherwise defined in this Privacy '+
      'Policy.'+ '</br>'+
      '</br>'+
      'Classquest is a communication platform that helps teachers encourage students in class '+
      'and engage parents. In the classroom, teachers use Classquest to give students '+
      'encouragement (or “points”) for showing critical skills or strengths. '+
      'Students can also create their own account, but can only tie that account to a class after '+
      'they receive a unique code from their teacher; if they’re under 13, they’ll need to have '+
      'parental consent or notice (as applicable) in order to access certain features of their '+
      'account. In the student account, students can, for example, see feedback given by their '+
      'teacher as well as customize their avatar.'+ '</br>'+
      '</br>'+
      'When students set up a Classquest account, they create a unique username and '+
      'password. **We don’t ask students to enter any other personal information when setting '+
      'up an account.**'+ '</br>'+
      '</br>'+
      '<b>Information Collection and Use</b>'+ '</br>'+
      '</br>'+
      'Classquest collects the minimal amount of information necessary to create accounts on '+
      'our Service:'+ '</br>'+
      '</br>'+
      '- We ask teachers to provide a name and surname (which need not be their real '+
      'names), unique email address, a password and their school; '+
      '- we ask students to provide a unique email address, a password, and the unique code '+
      'they have been given by their teacher to connect with a class. '+
      'The information requested is stored on Firebase additionally encrypted form with the '+
      'solely purpose of offering teachers and their students a means of communication within '+
      'the scope of the Classquest app.'+ '</br>'+
      'The information collected by the app will only be stored as long as the user is active in '+
      'the platform and The Learning Games will never disclose it or transfer it by any means '+
      'to third parties whatsoever.'+ '</br>'+
      '</br>'+
      '<b>Cookies</b>'+ '</br>'+
      '</br>'+
      'Cookies are files with small amount of data that is commonly used an anonymous '+
      'unique identifier. These are sent to your browser from the website that you visit and are '+
      'stored on your device internal memory. This Service uses these or similar “cookies” to '+
      'store your preferences in your device in order to provide a better user experience.'+ '</br>'+
      '</br>'+
      '<b>Service Providers</b>'+ '</br>'+
      '</br>'+
      'We may employ third-party companies and individuals due to the following reasons:'+ '</br>'+
      '</br>'+
      '<ul>' + '<li>' + '- To facilitate our Service.'+ '</li>' +'</br>'+
      '<li>' +'- To provide the Service on our behalf.'+ '</li>' +'</br>'+
      '<li>' +'- To perform Service-related services.'+ '</li>' +'</br>'+
      '<li>' +'- To assist us in analyzing how our Service is used.'+ '</li>' + '</ul>' + '</br>'+
      'We want to inform users of this Service that these third parties have limited access to '+
      'your Personal Information. The reason is to perform the tasks assigned to them on our '+
      'behalf. However, they are obligated not to disclose or use the information for any other '+
      'purpose.'+ '</br>'+
      '</br>'+
      '<b>Security</b>'+ '</br>'+
      '</br>'+
      'We value your trust in providing us your Personal Information, thus we are striving to '+
      'use commercially acceptable means of protecting it. We use every security measure '+
      'available in Firebase and we additionally custom encrypt Personal Information as a '+
      'further security layer. But remember that no method of transmission over the internet, or '+
      'method of electronic storage is 100% secure and reliable, and we cannot guarantee its '+
      'absolute security.'+ '</br>'+
      '</br>'+
      '<b>Children’s Privacy</b>'+ '</br>'+
      '</br>'+
      'These Services do not address anyone under the age of 13. The Learning Games does '+
      'not knowingly collect personally identifiable information from children under 13 '+
      'without their parents’ consent. In the case we discover that a child under 13 has '+
      'provided us with personal information without their parents’ prior consent, we will '+
      'immediately delete this from our servers. If you are a parent or guardian and you are '+
      'aware that your child has provided us with personal information without your consent, '+
      'please contact us so that we will be able to take necessary actions. '+
      'Changes to This Privacy Policy'+ '</br>'+
      '</br>'+
      'We may update our Privacy Policy from time to time. Thus, you are advised to review '+
      'this page periodically for any changes. We will notify you of any changes by posting '+
      'the new Privacy Policy on this page. These changes are effective immediately after they '+
      'are posted on this page.'+ '</br>'+
      '</br>'+
      '<b>Contact Us</b>'+ '</br>'+
      '</br>'+
      'If you have any questions or suggestions about our Privacy Policy, do not hesitate to '+
      'contact us at <a href="mailto:thelearninggamesproject@gmail.com?Subject=The%20Learning%20Games" target="_top">thelearninggamesproject@gmail.com.</a>';

    $scope.privacyPolicyES = '<b>Política de Privacidad</b>'+ '</br>'+
      '</br>'+
      'The Learning Games es un proyecto financiado por la Unión Europea en el marco del'+
      'programa Erasmus+, Acción Clave 2 y desarrollado colaborativamente por los'+
      'siguientes centros educativos para dotar a los profesores con una herramienta que'+
      'sustente sus modelos de gamificación en el aula y llevar un seguimiento de la evolución'+
      'de los alumnos'+ '</br>'+
      '</br>'+
      '<ul>' + '<li>' +'- IES Juan José Calvo Miguel. Avda. Constitución 1. 33950 Sotrondio'+
      '(Asturias, España)'+ '</li>' + '</br>'+
      '<li>' +'- CEPA Río Tajo. Avda. Pío XII 2 bis. 45600 Talavera de la Reina (Castilla-La'+
      'Mancha, España)'+ '</li>' + '</br>'+
      '<li>' +'- St. John’s Central College. Sawmill Street. Cork (Irlanda)'+ '</li>' + '</br>'+
      '<li>' +'- Budapesti Metropolitan Egyetem. Nagy Lajos király útja 1-9. 1148 Budapest'+
      '(Hungría)'+ '</li>' + '</br>'+
      '<li>' +'- Volkshochschule für den Landkreis Regen. Amtsgerichtsstraße 6 – 8. 94209'+
      'Regen (Alemania)'+ '</li>' + '</br>'+
      '<li>' +'- Hasan Fatma Önal Anadolu Lisesi. Uydukent Altı, Yavansu Mevkii. 09400'+
      'Kusadasi (Aydin, Turquía)'+ '</li>' + '</ul>' + '</br>'+
      'Esta política se refiere a la aplicación Classquest desarrollada por las entidades'+
      'anteriormente mencionadas.'+ '</br>'+
      '</br>'+
      'The Learning Games creó la aplicación Classquest como una aplicación gratuita. Este'+
      'SERVICIO es facilitado por The Learning Games sin coste alguno para su uso como tal.'+
      'Esta página es utilizada para informar a los usuarios en cuanto a nuestras políticas de'+
      'uso colectivo y divulgación de información personal si alguien decidiera utilizar este'+
      'servicio.'+ '</br>'+
      '</br>'+
      'Si se decide por la utilización de nuestro servicio, acepta nuestra recogida y uso de la'+
      'información con respecto a esta política. La información personal que recogemos se'+
      'utilizará para mejorar el servicio. No utilizaremos ni compartiremos su información con'+
      'nadie fuera de lo recogido en esta política de privacidad.'+ '</br>'+
      '</br>'+
      'Los términos utilizados en esta política de privacidad tienen el mismo sentido que en'+
      'nuestros Términos y Condiciones a los que se accede en Classquest a menos que se'+
      'especifique de otra forma en esta Política de Privacidad.'+ '</br>'+
      '</br>'+
      'Classquest es una plataforma de comunicación que ayuda al profesor a motivar a los'+
      'alumnos en clase y a la implicación de los padres. En la clase, los profesores utilizan'+
      'Classquest para dar a los alumnos refuerzo positivo (o “puntos”) por mostrar'+
      'capacidades y destrezas críticas.'+ '</br>'+
      '</br>'+
      'Los alumnos pueden crear su propia cuenta que sólo puede ser asociada a una clase'+
      'después de haber recibido un código de su profesor. Si son menores de 13 años,'+
      'necesitarán tener consentimiento paterno o una notificación (según las circunstancias)'+
      'para poder acceder a ciertos datos de su cuenta. En la cuenta del alumno, los estudiantes'+
      'pueden, por ejemplo, ver el feedback dado por el profesor así como personalizar su'+
      'avatar.'+ '</br>'+
      '</br>'+
      'Cuando los alumnos abren una cuenta de Classquest crean un usuario y una contraseña'+
      'únicos **No se pedirá a los alumnos que faciliten ninguna otra información personal a'+
      'la hora de abrir una cuenta.**'+ '</br>'+
      '</br>'+
      '<b>Recogida y Uso de la Información</b>'+ '</br>'+
      '</br>'+
      'Classquest recoge la mínima cantidad de información necesaria para crear cuentas en'+
      'nuestro servicio:'+ '</br>'+
      '</br>'+
      '- Solicitamos al profesor que proporcione un nombre y apellido (no siendo necesario'+
      'que sean los reales), una dirección de correo electrónico única, una contraseña y su'+
      'escuela;'+ '</br>'+
      '- Solicitamos a los alumnos que proporcionen una dirección de correo electrónico'+
      'única, una contraseña, y la clave que su profesor les ha dado para conectarse con la'+
      'clase.'+ '</br>'+
      'La información solicitada queda guardada en Firebase y además en forma codificada'+
      'con el propósito exclusivamente de ofrecer a profesores y alumnos un medio de'+
      'comunicación dentro del ámbito de la aplicación Classquest.'+ '</br>'+
      '</br>'+
      'La información recogida por la aplicación se guardará solamente mientras el usuario'+
      'esté activo en la plataforma, y The Learning Games nunca la divulgará en absoluto ni la'+
      'transferirá a terceras personas en modo alguno.'+ '</br>'+
      '</br>'+
      '<b>Cookies</b>'+ '</br>'+
      '</br>'+
      'Las Cookies son archivos con una pequeña información utilizadas normalmente como'+
      'un identificador anónimo único. Se envian a su navegador desde un sitio web que usted'+
      'visita y se guardan en la memoria interna de su dispositivo. Este Servicio utiliza estas o'+
      '“cookies” parecidas para guardar sus preferencias en su dispositivo con el fin de'+
      'proporcionar una mejor experiencia al usuario.'+ '</br>'+
      '</br>'+
      '<b>Proveedores del Servicio</b>'+ '</br>'+
      '</br>'+
      'Podemos contratar otras terceras personas y empresas por los siguientes motivos:'+ '</br>'+
      '<ul>' + '<li>' +'- Para facilitar nuestro Servicio.'+ '</li>' + '</br>'+
      '<li>' +'- Para proporcionar el Servicio en nuestro nombre.'+ '</li>' + '</br>'+
      '<li>' +'- Para llevar a cabo labores relacionadas con el Servicio.'+ '</li>' + '</br>'+
      '<li>' +'- Para ayudarnos a analizar cómo se utiliza nuestro Servicio.'+ '</li>' + '</ul>' + '</br>'+
      'Queremos informar a los usuarios de este Servicio que estas terceras personas tienen un'+
      'acceso limitado a su información personal. La razón es la de llevar a cabo tareas'+
      'asignadas en nuestro nombre. Sin embargo, están obligadas a no divulgar ni usar la'+
      'información para ningún otro propósito.'+ '</br>'+
      '</br>'+
      '<b>Seguridad</b>'+ '</br>'+
      '</br>'+
      'Valoramos su confianza al proporcionarnos su información personal, por lo que nos'+
      'esforzamos en utilizar medios comercialmente aceptables para protegerla. Empleamos '+
      'todas las medidas de seguridad disponibles en Firebase y además encriptación de los'+
      'datos con un algoritmo propietario como capa extra de seguridad. Pero recuerde que'+
      'ninguna forma de transmisión en Internet ni ningún método de almacenaje electrónico'+
      'es 100% seguro and fiable, y no podemos garantizar su seguridad absoluta. '+ '</br>'+
      '</br>'+
      '<b>Privacidad de los niños</b>'+ '</br>'+
      '</br>'+
      'Estos Servicios no se dirigen a menores de 13 años. The Learning Games no recoge'+
      'intencionadamente información personal identificable de niños menores de 13 años sin'+
      'el consentimiento de sus padres. En el caso de que descubramos que un niño menor de'+
      '13 años nos ha facilitado información personal sin el consentimiento previo de sus'+
      'padres, inmediatamente la suprimiremos de nuestros servidores. Si usted es padre o'+
      'tutor y es consciente de que su hijo nos ha proporcionado información personal sin su'+
      'consentimiento, póngase por favor en contacto con nosotros de modo que podamos'+
      'actuar como sea necesario.'+ '</br>'+
      '</br>'+
      '<b>Cambios en esta Política de Privacidad</b>'+ '</br>'+
      '</br>'+
      'Puede que cada cierto tiempo actualicemos nuestra Política de Privacidad. Así pues, se'+
      'le aconseja revisar esta página periódicamente por si se hubieran producido variaciones.'+
      'Le notificaremos sobre cualquier cambio publicando en esta página la nueva Política de'+
      'Privacidad. Estos cambios son vigentes inmediatamente después de ser publicados en'+
      'esta página.'+ '</br>'+
      '</br>'+
      '<b>Contacte con nosotros</b>'+ '</br>'+
      '</br>'+
      'Si tiene alguna pregunta o sugerencia sobre nuestra Política de Privacidad, no dude en'+
      'ponerse en contacto con nosotros en thelearninggamesproject@gmail.com';

}])