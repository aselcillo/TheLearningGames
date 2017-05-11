// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.loginController', 'app.settingsController', 'app.signUpController', 'app.studentController', 'app.teacherController', 'app.translationsController', 'app.routes', 'app.directives', 'app.services', 'ngCookies', 'pascalprecht.translate', 'ui.router', 'firebase', 'firebaseConfig'])

.config(function($ionicConfigProvider, $sceDelegateProvider, $translateProvider){
  
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
  $translateProvider.translations('en', translationsEN);
  $translateProvider.translations('es', translationsES);
  $translateProvider.translations('it', translationsIT);
  $translateProvider.translations('tr', translationsTR);
  $translateProvider.translations('de', translationsDE);
  $translateProvider.translations('hu', translationsHU);
  $translateProvider.translations('ru', translationsRU);
  $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage('en');
  $translateProvider.useLocalStorage();
  $translateProvider.useSanitizeValueStrategy('escape');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      cordova.plugins.Keyboard.disableScroll(true);
    }
  });
})

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});

var translationsEN = {
  
  ABOUT: 'About',
  ACCEPT: 'Accept',
  ACCOUNT_STUDENT_NOT_EXIST: 'It doesn\'t exist an student\'s account like that',
  ACCOUNT_TEACHER_NOT_EXIST: 'It doesn\'t exist an teacher\'s account like that',
  ACTIONS_ACHIEVEMENTS: 'Actions achievements',
  ACTIONS_CLASSROOM_STUDENTS: 'Actions students',
  ACTIONS_CLASSROOM_TEAMS: 'Actions teams',
  ACTIONS_ITEMS: 'Actions items',
  ACTION_MISSIONS: 'Actions missions',
  ACTIONS_TEACHER_HOME: 'Actions teacher home',
  ACTIONS_REWARDS: 'Actions rewards',
  ADD_ACHIEVEMENT: 'Add achievement',
  ADD_CLASS: 'Add class',
  ADD_LEVEL: 'Add level',
  ADD_REWARD: 'Añadir recompensa',
  ADD_STUDENT: 'Add student',
  ADD_TEAM: 'Add team',
  ADDITIONAL_POINTS_MISSION: 'Additional points (Optional)',
  ALREADY_HAVE_AN_ACCOUNT: 'Already have an account?',
  ARCHIVE_CLASSES: 'Archive classrooms',
  AVAILABLE_POINTS: 'Available points',
  AVATAR: 'Avatar',
  BACKUP: 'Backup',
  BADGE: 'Badge',
  BUTTON_LANG_DE: 'German',
  BUTTON_LANG_EN: 'English',
  BUTTON_LANG_ES: 'Spanish',
  BUTTON_LANG_HU: 'Hungarian',
  BUTTON_LANG_IT: 'Italian',
  BUTTON_LANG_RU: 'Russian',
  BUTTON_LANG_TR: 'Turkish',
  BUY_REWARDS: 'Buy rewards',
  CANCEL: 'Cancel',
  CLASS_NAME: 'Class name',
  CHECK_EMAIL_TO_VERIFY: 'Check your email\'s inbox to restore your password',
  CLASS_CODE: 'Classroom\'s code',
  CLASS_CLOSED: 'The classroom is closed',
  CLASSES_ARCHIVED: 'Archived classrooms',
  CLEAR_NOTIFICATIONS: 'Clear notifications',
  CONFIGURE_LEVELS: 'Configure levels',
  CONFIRM_PASSWORD: 'Confirm password',
  CREATE: 'Create',
  CREATE_RANDOM_TEAMS: 'Create random teams',
  CREATE_DEMO_CLASS: 'Create demo classroom',
  DATA_CHANGED: 'Data changed',
  DELETE: 'Delete',
  DELETE_ACHIEVEMENTS: 'Delete achievement(s)',
  DELETE_CLASSROOMS: 'Delete classroom(s)',
  DELETE_ITEMS: 'Delete item(s)',
  DELETE_MISSIONS: 'Delete mission(s)',
  DELETE_REWARDS: 'Delete rewards(s)',
  DELETE_STUDENTS: 'Delete student(s)',
  DELETE_TEAMS: 'Delete team(s)',
  DESCRIPTION: 'Description',
  DONT_HAVE_ACCOUNT: 'Don\'t have an account?',
  EDIT: 'Edit',
  EDIT_ACHIEVEMENT: 'Edit achievement',
  EDIT_LEVEL: 'Edit level',
  EMAIL: 'Email',
  EMAIL_CHANGED: 'Email changed',
  EMAIL_EXAMPLE: 'example@example.com',
  EMAIL_INVALID: 'Invalid email',
  EMAIL_OF_ACCOUNT: 'Your email',
  ERROR_ACCESS_UNKNOW: 'Unknow access error',
  ERROR_EMAIL_ALREADY_USED: 'Email indicated is already in use',
  ERROR_WEAK_PASSWORD: 'Password must be at least of 6 characters',
  EVALUATE_STUDENTS: 'Evaluate student(s)',
  EVALUATE_TEAMS: 'Evaluate team(s)',
  EXPORT: 'Export',
  FILE_INVALID: 'The file is not a valid image',
  FORGOT_PASSWORD: 'Forgot password?',
  HELP: 'Help',
  HIDE_ARCHIVED_CLASSES: 'Hide archived',
  HIDE_MISSIONS_ENDED: 'Hide ended',
  IMPORT: 'Import',
  IMAGE: 'Image',
  INSERT_CLASS_CODE: 'Insert a class code',
  INSERT_EMAIL_CORRECT: 'Insert an email valid',
  LEVEL_IN_CLASS: 'Level in class',
  LEVEL_TITLE: 'Title',
  LEVEL_LEVEL: 'Level',
  LEVEL_REQUIRED_POINTS: 'Required points',
  LEVELS_CONFIGURATION: 'Levels configuration',
  LOCKED_ACHIVEMENTS: 'Locked achievements',
  LOCKED_ITEMS: 'Locked items',
  LOCKED_REWARDS: 'Locked rewards',
  LOG_OUT: 'Log out', 
  LOG_STUDENT: 'Log in as student',
  LOG_TEACHER: 'Log in as teacher',
  MAX_LEVEL: 'Max level',
  MAX_SCORE: 'Max score',
  MESSAGE: 'Message',
  MISSIONS: 'Missions',
  MISSIONS_ENDED: 'Missions ended',
  NAME: 'Name ',
  NEEDED_POINTS: 'Needed points',
  NEW_CLASS: 'New class',
  NEW_LEVEL: 'New level',
  NONE: 'None',
  NOTIFICATION_OF_STUDENT: 'The student',
  NOTIFICATION_REWARD_OBTAINED: 'has obtained the reward',
  NOTIFICATION_REWARD_SPENT: 'has used the reward',
  NOTIFICATIONS: 'Notifications',
  NOT_ENOUGH_POINTS: 'You don\'t have enough point to buy',
  OPENING: 'Opening',
  PASSWORD: 'Password',
  PASSWORD_CHANGED: 'Password changed',
  PENDING_MISSIONS: 'Pending missions',
  PERMISSION: 'Permission',
  POINTS_IN_ITEM: 'Item\'s points',
  PRICE: 'Price',
  PROFILE: 'Profile',
  QUANTITY: 'Quantity',
  RANDOM_STUDENT: 'Random student',
  RANDOM_TEAM: 'Random team',
  REQUIREMENTS: 'Requirements',
  REWARD: 'Reward',
  REWARDS: 'Rewards',
  REWARD_SHOP: 'Rewards shop',
  RULES: 'Rules',
  SAVE_CHANGES: 'Save changes',
  SCORE: 'Score',
  SEE_ARCHIVED_CLASSES: 'Show archived',
  SEE_CLASS_HASHCODE: 'See classroom\'s hashcode',
  SEE_CLASS_SHOP: 'Show classroom\'s shop',
  SEE_MISSIONS: 'Show misions',
  SEE_MISSIONS_ENDED: 'Show ended',
  SEE_RULES: 'Show rules',
  SEE_TEAMS: 'Show teams',
  SELECT: 'Select',
  SELECT_ACHIEVEMENTS: 'Select achievements',
  SELECT_CLASSROOMS: 'Select classrooms',
  SELECT_ITEMS: 'Select items',
  SELECT_MISIONS: 'Select missions',
  SELECT_REWARDS: 'Select rewards',
  SELECT_TEAMS: 'Select teams',
  SELECT_YOUR_CLASS: 'Select your class',
  SEND_MESSAGE: 'Enviar mensaje',
  SET_ATTENDANCE_FOR_TODAY: 'Set attendance for today',
  SETTINGS: 'Settings',
  SCHOOL: 'School',
  SCHOOL_NOT_ESTABLISHED: 'Not established',
  SIGN_UP: 'Sign up',
  STUDENTS: 'Students',
  STUDENTS_VIEW: 'Student\'s view',
  SURNAME: 'Surname',
  TAKE_ATTENDANCE: 'Take attendance',
  TAKE_PICTURE: 'Take picture',
  TEAMS: 'Teams',
  TEAM_OBJECTIVE: 'Objective',
  TERMS_CONDITIONS: 'Terms and conditions',
  TOTAL_POINTS_CLASS: 'Total points',
  UNARCHIVE_CLASSES: 'Unarchive classrooms',
  UNLOCKED_ACHIEVEMENTS: 'Unlocked achievements',
  UNLOCKED_ITEMS: 'Unlocked items',
  UNLOCKED_REWARDS: 'Unlocked rewards',
  USE_FOR_LEVEL: 'Use for level',
  USER_NOT_FOUND: 'User not found',
  USE_REWARD: 'Use reward',
  VERIFY_EMAIL: 'Verify your email to get access to your account',
  WRONG_CREDENTIALS: 'Email or password is wrong',
  YOU_HAVE_NOTIFICATIONS: 'You have notifications',
  YOUR_ACTUAL_LEVEL: 'Your actual level',
  YOUR_PASSWORD: 'Your Password',
  

  
  
  
  HOME: 'Home',
  
  CLASS: 'Class',
  ATTENDANCE: 'Attendance',
  
  
  
  ACHIEVEMENT_NAME: 'Achievement name',
  ACHIEVEMENT_DESCRIPTION: 'Achievement description',
  
  
  NEW_ACHIEVEMENT: 'New Achievement',
  
  NEW_BADGE: 'New Badge',
  ADD_BADGE: 'Add badge',
  NEW_ITEM: 'New Item',
  ADD_ITEM: 'Add Item',
  ITEM_DESCRIPTION: 'Item description',
  ITEM_NAME: 'Item name',
  ADD_STUDENTS: 'Add students',
  
  BADGE_DESCRIPTION: 'Badge description',
  BADGE_NAME: 'Badge name',
  
  
  UPLOAD_AVATAR: 'Upload avatar',
  ADD_MISSION: 'Add mission',
  
  
  IMPORT_PREFERENCES_FROM: 'Import preferences from',
  
  
  NEW_MISSION: 'New Mission',
  PHASES: 'Phases: ',
  NUMBER_OF_PHASES: 'Number of phases',
  SCORES: 'Scores: ',
  SCORES_DESCRIPTION: 'Score1, Score2, Score3',
  GENERATE: 'Generate',
  
  STREET: 'Street',
  STUDENT_NAME: 'Student name',
  CLASSROOM_NAME: 'Classroom name',
  ASSIGN_STUDENT_TO_TEAM: 'Assign student to team...',
  
  COPY_STUDENT_TO_ANOTHER_CLASS: 'Copy student to another class',
  FULL_NAME: 'Full name',
  BADGE: 'BADGE',
  VIEW_PROFILE: 'View profile',
   
  ADRESS: 'Adress',
  
  CHANGE_AVATAR: 'Change avatar',
  EDIT_TEAM: 'Edit team',
  
  
  ARCHIVE: 'Archive',
  ACHIEVEMENTS: 'Achievements',
  ITEMS: 'Items',
  BADGES: 'Badges',
  
  ITEM: 'Item',
  LANGUAGES: 'Languages',
  NEW_STUDENT: 'New Student',
  EMAIL_ALREADY_USED: 'Email already used',
  CODE: 'Code',
  YOUR_CODE: 'Your code',
  LOGIN: 'Log in',
  
  
  EVALUATE: 'Evaluate',
  SET_ITEM: 'Set score',
  POINTS: 'Points',
  SELECT_ITEM: 'Select an item',
  DEFAULT_POINTS: 'Default points',
};
 
var translationsES= {
  
  ABOUT: 'Acerca de',
  ACCEPT: 'Aceptar',
  ACCOUNT_STUDENT_NOT_EXIST: 'No existe esa cuenta de alumno',
  ACCOUNT_TEACHER_NOT_EXIST: 'No existe esa cuenta de profesor',
  ACTIONS_ACHIEVEMENTS: 'Acciones logros',
  ACTIONS_CLASSROOM_STUDENTS: 'Acciones estudiantes',
  ACTIONS_CLASSROOM_TEAMS: 'Aciones equipos',
  ACTIONS_ITEMS: 'Acciones items',
  ACTION_MISSIONS: 'Acciones misiones',
  ACTIONS_TEACHER_HOME: 'Acciones página principal',
  ACTIONS_REWARDS: 'Acciones recompensas',
  ADD_ACHIEVEMENT: 'Añadir logro',
  ADD_CLASS: 'Añadir clase',
  ADD_LEVEL: 'Añadir nivel',
  ADD_REWARD: 'Añadir recompensa',
  ADD_STUDENT: 'Añadir estudiante',
  ADD_TEAM: 'Añadir equipo',
  ADDITIONAL_POINTS_MISSION: 'Puntos adicionales (Opcional)',
  ALREADY_HAVE_AN_ACCOUNT: '¿Ya tienes cuenta?',
  ARCHIVE_CLASSES: 'Archivar clases',
  AVAILABLE_POINTS: 'Puntos disponibles',
  AVATAR: 'Avatar',
  BACKUP: 'Copia de seguridad',
  BADGE: 'Medalla',
  BUTTON_LANG_DE: 'Alemán',
  BUTTON_LANG_EN: 'Inglés',
  BUTTON_LANG_ES: 'Español',
  BUTTON_LANG_HU: 'Hungaro',
  BUTTON_LANG_IT: 'Italiano',
  BUTTON_LANG_RU: 'Ruso',
  BUTTON_LANG_TR: 'Turco',
  BUY_REWARDS: 'Comprar recompensas',
  CANCEL: 'Cancelar',
  CLASS_NAME: 'Nombre de la clase',
  CHECK_EMAIL_TO_VERIFY: 'Revisa tu correo electronico para restablecer tu contraseña',
  CLASS_CODE: 'Código de la clase',
  CLASS_CLOSED: 'La clase se encuentra cerrada',
  CLASSES_ARCHIVED: 'Clases archivadas',
  CLEAR_NOTIFICATIONS: 'Limpiar notificaciones',
  CONFIGURE_LEVELS: 'Configurar niveles',
  CONFIRM_PASSWORD: 'Confirmar contraseña',
  CREATE: 'Crear',
  CREATE_RANDOM_TEAMS: 'Create random teams',
  CREATE_DEMO_CLASS: 'Crear clase demo',
  DATA_CHANGED: 'Datos cambiados',
  DELETE: 'Eliminar',
  DELETE_ACHIEVEMENTS: 'Borrar logro(s)',
  DELETE_CLASSROOMS: 'Borrar clase(s)',
  DELETE_ITEMS: 'Borrar item(s)',
  DELETE_MISSIONS: 'Borrar mision(es)',
  DELETE_REWARDS: 'Borrar recompensas(s)',
  DELETE_STUDENTS: 'Borrar alomno(s)',
  DELETE_TEAMS: 'Borrar equipo(s)',
  DESCRIPTION: 'Descripción',
  DONT_HAVE_ACCOUNT: '¿No tienes una cuenta?',
  EDIT: 'Editar',
  EDIT_ACHIEVEMENT: 'Editar logro',
  EDIT_LEVEL: 'Editar nivel',
  EMAIL: 'Correo',
  EMAIL_CHANGED: 'Email cambiado',
  EMAIL_EXAMPLE: 'ejemplo@ejemplo.com',
  EMAIL_INVALID: 'Email invalido',
  EMAIL_OF_ACCOUNT: 'Tu email',
  ERROR_ACCESS_UNKNOW: 'Error desconocido',
  ERROR_EMAIL_ALREADY_USED: 'El correo indicado ya se encuentra en uso',
  ERROR_WEAK_PASSWORD: 'La contraseña debe ser de al menos 6 caracteres',
  EVALUATE_STUDENTS: 'Evaluar estudiante(s)',
  EVALUATE_TEAMS: 'Evaluar estudiante(s)',
  EXPORT: 'Exportar',
  FILE_INVALID: 'El archivo no es una imagen válida',
  FORGOT_PASSWORD: '¿Se te olvidó tu contraseña?',
  HELP: 'Ayuda',
  HIDE_ARCHIVED_CLASSES: 'Ocultar archivadas',
  HIDE_MISSIONS_ENDED: 'Ocultar finalizadas',
  IMAGE: 'Imagen',
  IMPORT: 'Importar',
  INSERT_CLASS_CODE: 'Introduzca un código de clase',
  INSERT_EMAIL_CORRECT: 'Introduzca un email correcto',
  LEVEL_IN_CLASS: 'Nivel en clase',
  LEVEL_TITLE: 'Título',
  LEVEL_LEVEL: 'Nivel',
  LEVEL_REQUIRED_POINTS: 'Puntos requeridos',
  LEVELS_CONFIGURATION: 'Configuración de niveles',
  LOCKED_ACHIVEMENTS: 'Logros bloqueados',
  LOCKED_ITEMS: 'Items bloqueados',
  LOCKED_REWARDS: 'Recompensas bloqueadas',
  LOG_OUT: 'Cerrar sesión',
  LOG_STUDENT: 'Iniciar sesión como estudiante',
  LOG_TEACHER: 'Ingresar como profesor',
  MAX_LEVEL: 'Máximo nivel',
  MAX_SCORE: 'Puntuación máxima',
  MESSAGE: 'Mensaje',
  MISSIONS: 'Misiones',
  MISSIONS_ENDED: 'Missiones terminadas',
  NAME: 'Nombre ',
  NEEDED_POINTS: 'Puntos necesarios',
  NEW_CLASS: 'Nueva clase',
  NEW_LEVEL: 'Nuevo nivel',
  NONE: 'Ninguna',
  NOTIFICATION_OF_STUDENT: 'El alumno',
  NOTIFICATION_REWARD_OBTAINED: 'ha obtenido la recompensa',
  NOTIFICATION_REWARD_SPENT: 'ha usado la recompensa',
  NOTIFICATIONS: 'Notificaciones',
  NOT_ENOUGH_POINTS: 'No tienes puntos suficientes para comprar',
  OPENING: 'Apertura',
  PASSWORD: 'Contraseña',
  PASSWORD_CHANGED: 'Contraseña cambiada',
  PENDING_MISSIONS: 'Misiones pendientes',
  PERMISSION: 'Permiso',
  POINTS_IN_ITEM: 'Puntos del item',
  PRICE: 'Precio',
  PROFILE: 'Perfil',
  QUANTITY: 'Cantidad',
  RANDOM_STUDENT: 'Estudiante aleatorio',
  RANDOM_TEAM: 'Equipo aleatorio',
  REQUIREMENTS: 'Requisitos',
  REWARD: 'Recompensa',
  REWARDS: 'Recompensas',
  REWARD_SHOP: 'Tienda de recompensas',
  RULES: 'Reglas',
  SAVE_CHANGES: 'Salvar cambios',
  SCORE: 'Puntuación',
  SEE_ARCHIVED_CLASSES: 'Ver archivadas',
  SEE_CLASS_HASHCODE: 'Ver hashcode de la clase',
  SEE_CLASS_SHOP: 'Ver tienda de clase',
  SEE_MISSIONS: 'Ver misiones',
  SEE_MISSIONS_ENDED: 'Ver finalizadas',
  SEE_RULES: 'Ver reglas',
  SEE_TEAMS: 'Ver equipos',
  SELECT: 'Seleccionar',
  SELECT_ACHIEVEMENTS: 'Selecciona logros',
  SELECT_CLASSROOMS: 'Selecciona clases',
  SELECT_ITEMS: 'Selecciona items',
  SELECT_MISIONS: 'Selecciona misiones',
  SELECT_REWARDS: 'Selecciona recompensas',
  SELECT_TEAMS: 'Selecciona equipos',
  SELECT_YOUR_CLASS: 'Selecciona tu clase',
  SEND_MESSAGE: 'Enviar mensaje',
  SET_ATTENDANCE_FOR_TODAY: 'Fijar la asistencia para hoy',
  SETTINGS: 'Ajustes',
  SCHOOL: 'Escuela',
  SCHOOL_NOT_ESTABLISHED: 'No establecida',
  SIGN_UP: 'Registrarse',
  STUDENTS: 'Estudiantes',
  STUDENTS_VIEW: 'Viste de alumnos',
  SURNAME: 'Apellido',
  TAKE_ATTENDANCE: 'Tomar asistencia',
  TAKE_PICTURE: 'Seleccionar foto',
  TEAMS: 'Equipos',
  TEAM_OBJECTIVE: 'Objetivo',
  TERMS_CONDITIONS: 'Términos y condiciones',
  TOTAL_POINTS_CLASS: 'Puntos totales',
  UNARCHIVE_CLASSES: 'Desarchivar clases',
  UNLOCKED_ACHIEVEMENTS: 'Logros desbloqueados',
  UNLOCKED_ITEMS: 'Items desbloqueados',
  UNLOCKED_REWARDS: 'Recompensas desbloqueadas',
  USE_FOR_LEVEL: 'Usar para nivel',
  USER_NOT_FOUND: 'Usuario no encontrado',
  USE_REWARD: 'Usar recompensa',
  WRONG_CREDENTIALS: 'Email o contraseña son incorrectos',
  VERIFY_EMAIL: 'Verifique su correo para poder acceder a su cuenta',
  YOU_HAVE_NOTIFICATIONS: 'Tienes notificaciones',
  YOUR_ACTUAL_LEVEL: 'Tu nivel actual',
  YOUR_PASSWORD: 'Tu contraseña',

  
  HOME: 'Inicio',
  
  
  CLASS: 'Clase',
  ATTENDANCE: 'Asistencia',
  
  
  
  ACHIEVEMENT_NAME: 'Nombre del logro',
  ACHIEVEMENT_DESCRIPTION: 'Descripción del logro',
  
  
  NEW_ACHIEVEMENT: 'Nuevo logro',
  
  NEW_BADGE: 'Nueva medalla',
  ADD_BADGE: 'Añadir medalla',
  NEW_ITEM: 'Nuevo item',
  ADD_ITEM: 'Añadir item',
  ITEM_DESCRIPTION: 'Descripción del item',
  ITEM_NAME: 'Nombre del item',
  ADD_STUDENTS: 'Añadir estudiantes',
  
  BADGE_DESCRIPTION: 'Descripción de medalla',
  BADGE_NAME: 'Nombre de la medalla',
  
  
  UPLOAD_AVATAR: 'Subir avatar',
  ADD_MISSION: 'Añadir misión',
  
  
  IMPORT_PREFERENCES_FROM: 'Importar preferencias de',
  
  
  NEW_MISSION: 'Nueva Misión',
  PHASES: 'Fases: ',
  NUMBER_OF_PHASES: 'Numero de fases',
  SCORES: 'Puntuaciones: ',
  SCORES_DESCRIPTION: 'Puntuación1, Puntuación2, Puntuación3',
  GENERATE: 'Generar',
  
  STREET: 'Calle',
  STUDENT_NAME: 'Nombre estudiante',
  CLASSROOM_NAME: 'Nombre de clase',
  ASSIGN_STUDENT_TO_TEAM: 'Asignar a un estudiante al equipo...',
  
  COPY_STUDENT_TO_ANOTHER_CLASS: 'Copiar estudiante a otra clase',
  FULL_NAME: 'Nombre entero',
  BADGE: 'Medalla',
  VIEW_PROFILE: 'Ver perfil',
    
  ADRESS: 'Dirección',
  
  CHANGE_AVATAR: 'Cambiar avatar',
  EDIT_TEAM: 'Editar equipo',
  
  
  ARCHIVE: 'Archivar',
  ACHIEVEMENTS: 'Logros',
  BADGES: 'Medallas',
  ITEMS: 'Items',
  
  ITEM: 'Item',
  LANGUAGES: 'Idiomas',
  NEW_STUDENT: 'Nuevo Estudiante',
  EMAIL_ALREADY_USED: 'Email already used',
  CODE: 'Código',
  YOUR_CODE: 'Tu código',
  LOGIN: 'Entrar',
  
  
  EVALUATE: 'Evaluar',
  SET_ITEM: 'Puntuar',
  POINTS: 'Puntos',
  SELECT_ITEM: 'Selecciona un item',
  DEFAULT_POINTS: 'Puntos por defecto',
};

var translationsIT= {
  
  ACCEPT: 'Accetta',
  ADD_STUDENT: 'Aggiungi studente',
  ADD_TEAM: 'Aggiungi squadra',
  ALREADY_HAVE_AN_ACCOUNT: 'Hai già un account?',
  AVATAR: 'Immagine profilo',
  BUTTON_LANG_DE: 'Tedesco',
  BUTTON_LANG_EN: 'Inglese',
  BUTTON_LANG_ES: 'Spagnolo',
  BUTTON_LANG_HU: 'Ungherese',
  BUTTON_LANG_IT: 'Italiano',
  BUTTON_LANG_RU: 'Russo',
  BUTTON_LANG_TR: 'Turco',
  CANCEL: 'Annulla',
  CLASS_NAME: 'Nome della classe',
  CONFIRM_PASSWORD: 'Conferma password',
  CREATE: 'Crea',
  DELETE: 'Elimina',
  DESCRIPTION: 'Descrizione',
  DONT_HAVE_ACCOUNT: 'Non hai un account?',
  EMAIL: 'Email',
  EMAIL_EXAMPLE: 'esempio@esempio.com',
  EXPORT: 'Esporta',
  FORGOT_PASSWORD: 'Hai dimenticato la password?',
  IMPORT: 'Importa',
  LOG_OUT: 'Esci', 
  LOG_STUDENT: 'Entra come studente',
  LOG_TEACHER: 'Entra come professore',
  MAX_SCORE: 'Punteggio massimo',
  MISSIONS: 'Missioni',
  NAME: 'Nome ',
  NEW_CLASS: 'Nuova classe',
  NONE: 'Nessuna',
  PASSWORD: 'Password',
  PROFILE: 'Profilo',
  REQUIREMENTS: 'Requisiti',
  RULES: 'Regole',
  SAVE_CHANGES: 'Salva cambiamenti',
  SCORE: 'Punteggio',
  SELECT: 'Seleziona',
  SELECT_YOUR_CLASS: 'Seleziona la tua classe',
  SET_ATTENDANCE_FOR_TODAY: 'Imposta la frequenza di oggi',
  SETTINGS: 'Impostazioni',
  SIGN_UP: 'Registrati',
  SURNAME: 'Cognome',
  TEAMS: 'Squadre',
  YOUR_PASSWORD: 'La tua password',

  
  
  HOME: 'Home',
  
  
  CLASS: 'Classe',
  ATTENDANCE: 'Frequenza',
  
  
  
  ACHIEVEMENT_NAME: 'Nomde del traguardo',
  ACHIEVEMENT_DESCRIPTION: 'Descrizione del traguardo',
  
  
  NEW_ACHIEVEMENT: 'Nuovo traguardo',
  
  NEW_BADGE: 'Nuova medaglia',
  ADD_BADGE: 'Aggiungi medaglia',
  NEW_ITEM: 'Nuovo oggetto',
  ADD_ITEM: 'Aggiungi oggetto',
  ITEM_DESCRIPTION: 'Descrizione dell\'oggetto',
  ITEM_NAME: 'Nome dell\'oggetto',
  ADD_STUDENTS: 'Aggiungi studente',
  
  BADGE_DESCRIPTION: 'Descrizione della medaglia',
  BADGE_NAME: 'Nome della medaglia',
  
  
  UPLOAD_AVATAR: 'Carica avatar',
  ADD_MISSION: 'Aggiungi missione',
  
  
  IMPORT_PREFERENCES_FROM: 'Importa preferenze da...',
  
  
  NEW_MISSION: 'Nuova missione',
  PHASES: 'Fasi: ',
  NUMBER_OF_PHASES: 'Numero di fasi',
  SCORES: 'Punteggi: ',
  SCORES_DESCRIPTION: 'Punteggio1, Punteggio2, Punteggio3',
  GENERATE: 'Genera',
  TAKE_PICTURE: 'Seleziona foto',
  STREET: 'Via',
  STUDENT_NAME: 'Nome studente',
  CLASSROOM_NAME: 'Nome della classe',
  ASSIGN_STUDENT_TO_TEAM: 'Assegna studente a squadra...',
  
  COPY_STUDENT_TO_ANOTHER_CLASS: 'Copia studente su un\'altra classe',
  FULL_NAME: 'Nome completo',
  BADGE: 'Medaglia',
  VIEW_PROFILE: 'Visualizza profilo',
   
  ADRESS: 'Indirizzo',
  
  CHANGE_AVATAR: 'Cambia avatar',
  EDIT_TEAM: 'Modifica squadra',
  
  
  ARCHIVE: 'Archivia',
  ACHIEVEMENTS: 'Traguardi',
  BADGES: 'Medaglie',
  ITEMS: 'Oggetti',
  
  ITEM: 'Oggetto',
  LANGUAGES: 'Lingue',
  NEW_STUDENT: 'Nuovo Studente',
  EMAIL_ALREADY_USED: 'Email già in uso',
  CODE: 'Codice',
  YOUR_CODE: 'Il tuo codice',
  LOGIN: 'Entra',
  
  
  EVALUATE: 'Valuta',
  SET_ITEM: 'Imposta oggetto',
  POINTS: 'Punti',
  SELECT_ITEM: 'Seleziona oggetto',
  DEFAULT_POINTS: 'Punti base',
};

var translationsTR = {
  
  ACCEPT: 'Onayla',
  ADD_ACHIEVEMENT: 'Kazanım Ekle',

  ADD_STUDENT: 'Öğrenci Ekle',
  ADD_TEAM: 'Ekip Ekle',
  ALREADY_HAVE_AN_ACCOUNT: 'Hesabınız Var mı?',
  AVATAR: 'Avatar',
  BUTTON_LANG_DE: 'Almanca',
  BUTTON_LANG_EN: 'İngilizce',
  BUTTON_LANG_ES: 'İspanyolca',
  BUTTON_LANG_HU: 'Macarca',
  BUTTON_LANG_IT: ' İtalyanca',
  BUTTON_LANG_RU: 'Rus',
  BUTTON_LANG_TR: 'Türkçe',
  CANCEL: 'İptal',
  CLASS_NAME: 'Sınıf Adı',
  CONFIRM_PASSWORD: 'Şifreyi Tekrar et',
  CREATE: 'Yarat',
  DELETE: 'Sil',
  DESCRIPTION: 'Açıklama',
  DONT_HAVE_ACCOUNT: ' Hesabınız Yok mu?',
  EMAIL: 'E-Posta',
  EMAIL_EXAMPLE: 'example@example.com',
  EXPORT: 'Dışarı Aktar',
  FORGOT_PASSWORD: 'Şifremi Unuttum',
  IMPORT: 'İçeri Aktar',
  LOG_OUT: 'Çıkış', 
  LOG_STUDENT: ' Öğrenci Girişi',
  LOG_TEACHER: ' Öğretmen Girişi ',
  MAX_SCORE: 'Maksimum Skor',
  MISSIONS: 'Görevler',
  NAME: 'İsim',
  NEW_CLASS: 'Yeni Sınıf',
  NONE: 'Yok',
  PASSWORD: ' Şifre ',
  PROFILE: 'Profil',
  REQUIREMENTS: 'Gereksinimler',
  RULES: 'Kurallar',
  SAVE_CHANGES: 'Değişiklikleri Kaydet',
  SCORE: 'Skor',
  SELECT: 'Seç',
  SELECT_YOUR_CLASS: 'Sınıf Seç',
  SET_ATTENDANCE_FOR_TODAY: 'Günlük Katılım Düzenle',
  SETTINGS: 'Ayarlar',
  SIGN_UP: 'Kayıt Ol',
  SURNAME: 'Soyadı',
  TEAMS: 'Ekipler',
  YOUR_PASSWORD: 'Şifreniz',

  
  
  
  HOME: 'Ana Sayfa ',
  
  
  CLASS: 'Sınıf',
  ATTENDANCE: 'Devam-Devamsızlık',
  
  
  
  ACHIEVEMENT_NAME: 'Kazanım Adı',
  ACHIEVEMENT_DESCRIPTION: 'Kazanım Açıklaması',
  
  NEW_ACHIEVEMENT: 'Yeni Kazanım',
  
  NEW_BADGE: 'Yeni Rozet',
  ADD_BADGE: 'Rozet Ekle',
  NEW_ITEM: 'Yeni Öğe',
  ADD_ITEM: 'Öğe Ekle',
  ITEM_DESCRIPTION: 'Öğe Açıklaması',
  ITEM_NAME: 'Öğe Adı',
  ADD_STUDENTS: 'Öğrenci Ekle',
  
  BADGE_DESCRIPTION: 'Rozet Açıklaması',
  BADGE_NAME: 'Rozet Adı',
  
  
  UPLOAD_AVATAR: 'Avatar Yükle',
  ADD_MISSION: 'Görev Ekle',
  
  
  IMPORT_PREFERENCES_FROM: 'Tercihleri İçeri Aktar',
  
  
  NEW_MISSION: 'Yeni Görev',
  PHASES: 'Aşamalar',
  NUMBER_OF_PHASES: 'Aşama Sayısı',
  SCORES: 'Skorlar',
  SCORES_DESCRIPTION: 'Skor1, Skor2, Skor3',
  GENERATE: 'Oluştur',
  TAKE_PICTURE: 'Fotoğraf Çek',
  STREET: 'Sokak',
  STUDENT_NAME: 'Öğrenci Adı',
  CLASSROOM_NAME: 'Sınıf Adı',
  ASSIGN_STUDENT_TO_TEAM: 'Öğrenciyi bir ekipte görevlendir',
  
  COPY_STUDENT_TO_ANOTHER_CLASS: 'Öğrenciyi başka sınıfa kopyala',
  FULL_NAME: 'Tam Adı',
  BADGE: 'Rozet',
  VIEW_PROFILE: 'Profil görüntüle',
   
  ADRESS: 'Adres',
  
  CHANGE_AVATAR: 'Avatar Değiştir',
  EDIT_TEAM: 'Ekibi Düzenle',
  
  
  ARCHIVE: 'Arşivle',
  ACHIEVEMENTS: 'Kazanımlar',
  ITEMS: 'Maddeler',
  BADGES: 'Rozetler',
  
  ITEM: 'Öğe',
  LANGUAGES: 'Diller',
  NEW_STUDENT: 'Yeni Öğrenci',
  EMAIL_ALREADY_USED: 'E-posta zaten kullanılmış',
  CODE: 'Kod',
  YOUR_CODE: 'Kodunuz',
  LOGIN: 'Giriş Yap',
  
  
  EVALUATE: 'Degerlendir',
  SET_ITEM: 'Puan ekle',
  POINTS: 'Puanlar',
  SELECT_ITEM: 'Öge seç',
  DEFAULT_POINTS: 'Standard Puanlar'
};

var translationsDE = {
  
  ACCEPT: 'Annehmen',
  ADD_ACHIEVEMENT: 'Leistung hinzufuegen',
  ADD_STUDENT: 'Schueler hinzufuegen',
  ADD_TEAM: 'Team hinzufuegen',
  ALREADY_HAVE_AN_ACCOUNT: 'Account vorhanden?',
  AVATAR: 'Avatar',
  BUTTON_LANG_DE: ' Deutsch',
  BUTTON_LANG_EN: 'Englisch',
  BUTTON_LANG_ES: 'Spanisch',
  BUTTON_LANG_HU: ' Ungarisch',
  BUTTON_LANG_IT: ' Italienisch',
  BUTTON_LANG_RU: 'Russisch',
  BUTTON_LANG_TR: ' Tuerkisch',
  CANCEL: 'Loeschen',
  CLASS_NAME: 'Name der Klasse',
  CONFIRM_PASSWORD: 'Passwort bestaetigen',
  CREATE: 'Erstellen',
  DELETE: 'Loeschen',
  DESCRIPTION: 'Beschreibung',
  DONT_HAVE_ACCOUNT: ' Noch keinen Account?',
  EMAIL: 'E-Mail',
  EMAIL_EXAMPLE: 'example@example.com',
  FORGOT_PASSWORD: ' Passwort vergessen?',
  LOG_OUT: 'Abmelden', 
  LOG_STUDENT: ' Als Schueler anmelden',
  LOG_TEACHER: ' Als Lehrer anmelden',
  MAX_SCORE: 'Max Punkte',
  MISSIONS: 'Auftraege',
  NAME: 'Name',
  NEW_CLASS: 'Neue Klasse',
  NONE: 'Keine',
  PASSWORD: 'Passwort',
  PROFILE: 'Profil',
  REQUIREMENTS: 'Voraussetzungen',
  RULES: 'Regeln',
  SAVE_CHANGES: 'Aenderungen sichern',
  SCORE: 'Punkte',
  SELECT: 'Auswaehlen',
  SELECT_YOUR_CLASS: 'Klasse auswaehlen',
  SET_ATTENDANCE_FOR_TODAY: 'Anwesenheit fuer heute festlegen',
  SETTINGS: 'Einstellungen',
  SIGN_UP: 'Anmelden',
  SURNAME: 'Nachname',
  TEAMS: 'Teams',
  YOUR_PASSWORD: 'Dein Passwort',

  
  
  
  HOME: ' Startseite',
  
  
  CLASS: 'Klasse',
  ATTENDANCE: 'Anwesenheit',
  
  
  
  ACHIEVEMENT_NAME: 'Bezeichnung der Leistung',
  ACHIEVEMENT_DESCRIPTION: 'Leistungsbeschreibung',
  
  
  NEW_ACHIEVEMENT: 'Neue Leistung',
  
  NEW_BADGE: 'Neue Auszeichnung',
  ADD_BADGE: 'Auszeichnung hinzufuegen',
  NEW_ITEM: 'Neues Element',
  ADD_ITEM: 'Element hinzufuegen',
  ITEM_DESCRIPTION: 'Elementbeschreibung',
  ITEM_NAME: 'Name des Elements',
  ADD_STUDENTS: 'Schueler nizufuegen',
  
  BADGE_DESCRIPTION: 'Beschreibung der Auszeichnung',
  BADGE_NAME: 'Bezeichnung der Auszeichnung',
  
  
  UPLOAD_AVATAR: 'Avatar hochladen',
  ADD_MISSION: 'Auftrag hinzufuegen',
  
  
  IMPORT_PREFERENCES_FROM: 'Einstellungen importieren von',
  
  
  NEW_MISSION: 'Neuer Auftrag',
  PHASES: 'Phasen',
  NUMBER_OF_PHASES: 'Anzahl der Phasen',
  SCORES: 'Punkte',
  SCORES_DESCRIPTION: 'Punkte1, Punkte2, Punkte3',
  GENERATE: 'Erstellen',
  TAKE_PICTURE: 'Foto aufnehmen',
  STREET: 'Strasse',
  STUDENT_NAME: 'Name des Schuelers',
  CLASSROOM_NAME: 'Name des Klassenzimmers',
  ASSIGN_STUDENT_TO_TEAM: 'Schueler zum Team… hinzufuegen',
  
  COPY_STUDENT_TO_ANOTHER_CLASS: 'Schueler zu einer anderen Klasse hinzufuegen',
  FULL_NAME: 'Vollstaendiger Name',
  BADGE: 'Auszeichnung',
  VIEW_PROFILE: 'Profil ansehen',
   
  ADRESS: 'Adresse',
  
  CHANGE_AVATAR: 'Avatar wechslen',
  EDIT_TEAM: 'Team bearbeiten',
  EXPORT: 'Export',
  IMPORT: 'Import',
  ARCHIVE: 'Archiv',
  ACHIEVEMENTS: 'Leistungen',
  ITEMS: 'Elemente',
  BADGES: 'Auszeichnungen',
  
  ITEM: 'Element',
  LANGUAGES: 'Sprache',
  NEW_STUDENT: 'Neuer Schueler',
  EMAIL_ALREADY_USED: 'E-Mail Adresse wird bereit benutzt',
  CODE: 'Code',
  YOUR_CODE: 'Dein Code',
  LOGIN: 'Anmelden',
  
  
  EVALUATE: 'Evaluieren',
  SET_ITEM: 'Punkte festlegen',
  POINTS: 'Punkte',
  SELECT_ITEM: 'Element auswählen',
  DEFAULT_POINTS: 'Standardpunktezahl'
};


var translationsHU = {

  ACCEPT: 'Elfogadás',
  ADD_ACHIEVEMENT: 'Új cél hozzáadása',
  ADD_STUDENT: 'Hallgató hozzáadása',
  ADD_TEAM: 'Csoport hozzáadása',
  ALREADY_HAVE_AN_ACCOUNT: 'Már van fiókja?',
  AVATAR: 'Avavtár',
  BUTTON_LANG_DE: 'Német',
  BUTTON_LANG_EN: 'Angol',
  BUTTON_LANG_ES: 'Spanyol',
  BUTTON_LANG_HU: 'Magyar',
  BUTTON_LANG_IT: 'Olasz',
  BUTTON_LANG_RU: 'Orosz',
  BUTTON_LANG_TR: 'Török',
  CANCEL: 'Mégse',
  CLASS_NAME: 'Csoport neve',
  CONFIRM_PASSWORD: 'Jelszó megerősítése',
  CREATE: 'Létrehozás',
  DELETE: 'Törlés',
  DESCRIPTION: 'Leírás',
  DONT_HAVE_ACCOUNT: 'Új fiók létrehozása',
  EMAIL: 'E-mail',
  EMAIL_EXAMPLE: 'pelda@pelda.com',
  EXPORT: 'Exportálás',
  FORGOT_PASSWORD: 'Elfelejtett jelszó',
  IMPORT: 'Importálás',
  LOG_OUT: 'Kilépés',
  LOG_STUDENT: 'Belépés hallgatóként',
  LOG_TEACHER: 'Belépés tanárként',
  MAX_SCORE: 'Maximum pontszám',
  MISSIONS: 'Feladatok',
  NAME: 'Név',
  NEW_CLASS: 'Új csoport',
  NONE: 'Nincs',
  PASSWORD: 'Jelszó',
  PROFILE: 'Profil',
  REQUIREMENTS: 'Feltételek',
  RULES: 'Szabályok',
  SAVE_CHANGES: 'Változtatások mentése',
  SCORE: 'Pontszám',
  SELECT: 'Kiválaszt',
  SELECT_YOUR_CLASS: 'Csoport kiválasztása',
  SET_ATTENDANCE_FOR_TODAY: 'Jelenléti ív létrehozása mára',
  SETTINGS: 'Beállítások',
  SIGN_UP: 'Feliratkozás',
  SURNAME: 'Vezetéknév',
  TEAMS: 'Csoportok',
  YOUR_PASSWORD: 'Jelszó',

  
  HOME: 'Kezdőlap',
  
  CLASS: 'Osztály',
  ATTENDANCE: 'Részvétel',
  
  
  
  ACHIEVEMENT_NAME: 'Cél neve',
  ACHIEVEMENT_DESCRIPTION: 'Cél leírása',
  
  
  NEW_ACHIEVEMENT: 'Új célok',
  
  NEW_BADGE: 'Új jelvény',
  ADD_BADGE: 'Jelvény hozzáadása',
  NEW_ITEM: 'Új elem',
  ADD_ITEM: 'Elem hozzáadása',
  ITEM_DESCRIPTION: 'Elem leírása',
  ITEM_NAME: 'Elem neve',
  ADD_STUDENTS: 'Hallgatók hozzáadása',
  
  BADGE_DESCRIPTION: 'Jelvény leírása',
  BADGE_NAME: 'Jelvény neve',
  
  
  UPLOAD_AVATAR: 'Avatár feltöltése',
  ADD_MISSION: 'Feladat hozzáadása',
  
  
  IMPORT_PREFERENCES_FROM: 'Beállítások importálása',
  
  
  NEW_MISSION: 'Új feladat',
  PHASES: 'Időszak',
  NUMBER_OF_PHASES: 'Időszakok száma',
  SCORES: 'Pontszámok',
  SCORES_DESCRIPTION: 'Pontszám1, Pontszám2, Pontszám3',
  GENERATE: 'Generálás',
  TAKE_PICTURE: 'Fénykép hozzáadása',
  STREET: 'utca',
  STUDENT_NAME: 'Hallgató neve',
  CLASSROOM_NAME: 'Csoport neve',
  ASSIGN_STUDENT_TO_TEAM: 'Hallgató hozzáadása ehhez a csoporthoz...',
  
  COPY_STUDENT_TO_ANOTHER_CLASS: 'Hallgató másolása másik csoporthoz',
  FULL_NAME: 'Teljes név',
  BADGE: 'Jelvény',
  VIEW_PROFILE: 'Profil megtekintése',
    
  ADRESS: 'Cím',
  
  CHANGE_AVATAR: 'Avatár megváltoztatása',
  EDIT_TEAM: 'Csoport szerkesztése',
  
  
  ARCHIVE: 'Archív',
  ACHIEVEMENTS: 'Célok',
  ITEMS: 'Elemek',
  BADGES: 'Jelvények',
  
  ITEM: 'Elem',
  LANGUAGES: 'Nyelvek',
  NEW_STUDENT: 'Új hallgató',
  EMAIL_ALREADY_USED: 'A megadott email cím már használatban van',
  CODE: 'Kód',
  YOUR_CODE: 'Saját kód',
  LOGIN: 'Belépés',
  
  
  EVALUATE: 'Kiértékelés', 
  SET_ITEM: 'Pontszám megadása',
  POINTS: 'Pontok', 
  SELECT_ITEM: 'Elem kiválasztása', 
  DEFAULT_POINTS: 'Alapértelmezett pontszám',
};

var translationsRU = {

  ACCEPT: 'Принимать',
  ADD_ACHIEVEMENT: 'Добавить достижение',
  ADD_STUDENT: 'Добавить студента',
  ADD_TEAM: 'Добавить команду',
  ALREADY_HAVE_AN_ACCOUNT: 'Уже есть учетная запись?',
  AVATAR: 'Аватар',
  BUTTON_LANG_DE: 'Немецкий',
  BUTTON_LANG_EN: 'Английский',
  BUTTON_LANG_ES: 'Испанский',
  BUTTON_LANG_HU: 'венгерский',
  BUTTON_LANG_IT: 'Итальянский',
  BUTTON_LANG_RU: 'Русский',
  BUTTON_LANG_TU: 'Tурецкий',
  CANCEL: 'Отмена',
  CLASS_NAME: 'Имя класса',
  CONFIRM_PASSWORD: 'Подтвердите Пароль',
  CREATE: 'Создавать',
  DELETE: 'Удалить',
  DESCRIPTION: 'Описание',
  DONT_HAVE_ACCOUNT: 'Не имеет счёт?',
  EMAIL: 'Электронная почта',
  EMAIL_EXAMPLE: 'Пример@пример.com',
  EXPORT: 'Экспорт',
  FORGOT_PASSWORD: 'Забыли пароль?',
  IMPORT: 'Импорт',
  LOG_OUT: 'Выйти',  
  LOG_STUDENT: 'Войти как студент',
  LOG_TEACHER: 'Войти как учитель',
  MAX_SCORE: 'Макс оценка',
  MISSIONS: 'Задании',
  NAME: 'Имя ',
  NEW_CLASS: 'Новый класс',
  NONE: 'Никакой',
  PASSWORD: 'Пароль',
  PROFILE: 'Профиль',
  REQUIREMENTS: 'Требовании',
  RULES: 'Правила',
  SAVE_CHANGES: 'Сохранить изменения',
  SCORE: 'Oценка',
  SELECT: 'Выбрать',
  SELECT_YOUR_CLASS: 'Выберите класс',
  SET_ATTENDANCE_FOR_TODAY: 'Набор посещаемости на сегодняшний день',
  SETTINGS: 'Настройки',
  SIGN_UP: 'Зарегистрироваться',
  SURNAME: 'Фамилия',
  TEAMS: 'Команды',
  YOUR_PASSWORD: 'Ваш пароль',

  
  
  
  HOME: 'Дом',
  
  CLASS: 'Класс',
  ATTENDANCE: 'Посещаемость',
  
  
  
  ACHIEVEMENT_NAME: 'Имя достижения',
  ACHIEVEMENT_DESCRIPTION: 'Описание достижений',
  
  
  NEW_ACHIEVEMENT: 'новое достижение',
  
  NEW_BADGE: 'Новый знак',
  ADD_BADGE: 'Добавить знак',
  NEW_ITEM: 'Новый пункт',
  ADD_ITEM: 'Добавить пункт',
  ITEM_DESCRIPTION: 'Описание пункта',
  ITEM_NAME: 'Название знака',
  ADD_STUDENTS: 'Добавить студентов',
  
  BADGE_DESCRIPTION: 'Описание знакa',
  BADGE_NAME: 'Имя знака',
  
  
  UPLOAD_AVATAR: 'Загрузить аватар',
  ADD_MISSION: 'Добавить задание',
  
  
  IMPORT_PREFERENCES_FROM: 'Важные предпочтения из',
  
  
  NEW_MISSION: 'Новая задание',
  PHASES: 'Фазы: ',
  NUMBER_OF_PHASES: 'Число фаз',
  SCORES: 'Множество: ',
  SCORES_DESCRIPTION: '1 балла, 2 балла, 3 балла',
  GENERATE: 'Производить',
  TAKE_PICTURE: 'Сделать фотографию',
  STREET: 'Улица',
  STUDENT_NAME: 'Имя ученика',
  CLASSROOM_NAME: 'Имя классa',
  ASSIGN_STUDENT_TO_TEAM: 'Назначить студента к команде...',
  
  COPY_STUDENT_TO_ANOTHER_CLASS: 'Копия студента к другому классу',
  FULL_NAME: 'Полное имя',
  BADGE: 'Знак',
  VIEW_PROFILE: 'Просмотреть профиль',
  
  ADRESS: 'Адрес',
  
  CHANGE_AVATAR: 'Измененит аватар',
  EDIT_TEAM: 'Редактировать команда',
  
  
  ARCHIVE: 'Архив',
  ACHIEVEMENTS: 'Достижения',
  ITEMS: 'Пункты',
  BADGES: 'Знаки',
  
  ITEM: 'Пункт',
  LANGUAGES: 'Языки',
  NEW_STUDENT: 'Новый студент',
  EMAIL_ALREADY_USED: 'Электронная почта уже используется',
  CODE: 'Код',
  YOUR_CODE: 'Ваш код',
  LOGIN: 'Войти',
  
  
  EVALUATE: 'Оценивать',
  SET_ITEM: 'Набор оценка',
  POINTS: 'Набор пунктов',
  SELECT_ITEM: 'Выбрать пункты',
  DEFAULT_POINTS: 'Баллы по умолчанию',

};