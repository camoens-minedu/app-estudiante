// export class GetPersonaEstudianteDto {
//   constructor(
//     public Persona: Persona,
//     public tipoDocumento: enumerado[],
//     public sexo: enumerado[],
//     public tipoLenguaMaterna: enumerado[],
//   ) {}
// }

export interface GetPersonaEstudianteDto {
  Persona: Persona;
  tipoDocumento: enumerado[];
  sexo: enumerado[];
  tipoLenguaMaterna: enumerado[];
  paises: Paise[];
}

export interface Persona {
  ID_PERSONA: number;
  ID_TIPO_DOCUMENTO: number;
  NUMERO_DOCUMENTO_PERSONA: string;
  NOMBRE_PERSONA: string;
  APELLIDO_PATERNO_PERSONA: string;
  APELLIDO_MATERNO_PERSONA: string;
  FECHA_NACIMIENTO_PERSONA: Date;
  SEXO_PERSONA: number;
  ID_LENGUA_MATERNA: number;
  ES_DISCAPACITADO: null;
  UBIGEO_NACIMIENTO: string;
  PAIS_NACIMIENTO: number;
  ESTADO: number;
  UbigeoNacimientoFull: null;
  ListPersonaInstitucion: ListPersonaInstitucion[];
}

export interface ListPersonaInstitucion {
  ID_PERSONA_INSTITUCION: number;
  ID_INSTITUCION: number;
  ESTADO_CIVIL: number;
  UBIGEO_PERSONA: string;
  DIRECCION_PERSONA: string;
  TELEFONO: string;
  CELULAR: string;
  CELULAR2: string;
  CORREO: string;
  ID_TIPO_DISCAPACIDAD: number;
  UbigeoFull: null;
  ESTADO: number;
}

export interface Paise {
  Codigo: number;
  Dscpais: string;
  Dsccontinente: Dsccontinente;
}

export enum Dsccontinente {
  Africa = 'AFRICA',
  America = 'AMERICA',
  Asia = 'ASIA',
  Europa = 'EUROPA',
  Oceania = 'OCEANIA',
}

export interface enumerado {
  ID_ENUMERADO: number;
  VALOR_ENUMERADO: string;
}
