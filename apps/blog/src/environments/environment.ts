// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "__API_KEY__",
    authDomain: "__AUTH_DOMAIN__",
    projectId: "__PROJECT_ID__",
    storageBucket: "__STORAGE_BUCKET__",
    messagingSenderId: "__MASSAGING_SENDER_ID__",
    appId: "__APP_ID__",
    measurementId: "__MEASUREMENT_ID__"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
