// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDA52qapBEX_PuB0o72238ABwiayDB2F7g",
    authDomain: "appstrophe-test.firebaseapp.com",
    projectId: "appstrophe-test",
    storageBucket: "appstrophe-test.appspot.com",
    messagingSenderId: "735948884316",
    appId: "1:735948884316:web:b231733b3dd7e252cb9999",
    measurementId: "G-8NE5ZG27G5"
  },
  host: {
    auth: 'http://localhost:4201/remoteEntry.js',
    blog: 'http://localhost:4202/remoteEntry.js'
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
