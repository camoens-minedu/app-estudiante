export const environment = {
  production: true,
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