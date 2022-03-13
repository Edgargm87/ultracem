// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



export const environment = {
  production: false,
  // urlApi: 'http://192.168.190.237:8010/api-fintra/api/',
  // urlApi: 'https://prometheus.fintra.co:8443/api-fintra/api/',
  // urlApi: 'https://ultracem.ngrok.io/api-fintra/api/',
  urlApi: 'https://tefy.ngrok.io/api-fintra/api/',
  // urlApi2: 'https://ultracem.ngrok.io/api-fintra/api/archivos/guardar/',
  // urlApi: 'https://ultracem.ngrok.io/api-fintra/api/',
  userName: "APPWEB",
  password: btoa("123456"),
  reconocer:"https://recidaw.olimpiait.com",
  apiCredit: "http://demo.fintra.co:8084/fintracredit",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
