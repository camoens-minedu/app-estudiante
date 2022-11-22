// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sessionStorageKeys: {
    applicationState: 'Security.ApplicationState',
    personaEstudianteInstitucion: 'Security.KeyEis',
  },
  api: {
    urlAddress: 'http://localhost:50501/gestion-estudiante/web-apis/api/',
    urlAddressSeguridad: 'http://localhost:50501/gestion-estudiante/webapi-seguridad/api/',
    controllers: {
      informacionPersonal: 'InformacionPersonal',
      seguridad: 'security',
      prematricula: 'prematricula',
      reporte: 'reporte',
      maestra: 'maestra',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
