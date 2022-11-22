export interface GetPreMatriculaCabeceraListCursoDto {
  cabecera: GetCabeceraDto;
  listaCursos: GetMatriculaCursoDto[];
}

export interface GetCabeceraDto {
  TotalCreditos: number;
  NumeroMaximoCreditosAdicionales: number;
  ProgramacionMatricula: ProgramacionMatricula;
}

export interface ProgramacionMatricula {
  ID_PROGRAMACION_MATRICULA: number;
  ID_PERIODOS_LECTIVOS_POR_INSTITUCION: number;
  ID_TIPO_MATRICULA: number;
  FECHA_INICIO: string;
  FECHA_FIN: string;
  ES_ACTIVO: boolean;
  ESTADO: number;
  USUARIO_CREACION: null;
  FECHA_CREACION: string;
  USUARIO_MODIFICACION: null;
  FECHA_MODIFICACION: null;
  CERRADO: boolean;
}

export interface GetMatriculaCursoDto {
  IdUnidadDidactica: number;
  IdTipoUnidadDidactica: number;
  NombreTipoUnidadDidactica: string;
  IdModulo: number;
  NombreModulo: string;
  IdSemestreAcademico: number;
  CodigoUnidadDidactica: number;
  NombreUnidadDidactica: string;
  Horas: number;
  Creditos: number;
  SemestreAcademico: string;
  Estado: string;
  NroClasesProgramadas: number;
  IdCierreEvaluacion: number;
  IdEstadoUnidadDidactica: number;
  IdMatriculaEstudiante: number;
  IdEvaluacionExperienciaFormativa: number;
  Nota: number;
  PermiteEditar: number;
  Row: number;
  Total: number;
}

export interface GetProgramacionCursoDto {
  IdProgramacionClase: number;
  IdUnidadDidactica: number;
  IdSedeInstitucion: number;
  SedeInstitucion: string;
  Seccion: string;
  NombreClase: string;
  Turno: string;
  IdPersonalInstitucion: number;
  Docente: string;
  Aulas: string;
  Horarios: string;
  Vacante: number;
  VacantesDisp: number;
  Row: number;
}

/*********************** */

export class ListCourcesNext {
  id: number = 0;
  codigo: string = '';
  curso: string = '';
  ciclo: number = 0;
  credito: number = 0;
  EsMatriculado: boolean = false;
}

export class GetListCursoProgramadosDto {
  id: number = 0;
  sede: string = '';
  clase: string = '';
  turno: string = '';
  seccion: string = '';
  docente: string = '';
  aula: string = '';
  horario: string = '';
  vacante: number = 0;
}

export class GetListMatriculasRegistradaDto {
  id: number = 0;
  idSemestre: number = 0;
  codSemestre: string = '';
  fechaMatricula!: Date;
  nroCursoMatriculado!: number;
  nroCreditoMatriculado!: number;
  nroCursoAprobado!: number;
  nroCreditoAprobado!: number;
  EsMatriculado: boolean = false;
}

/**requeste create */

export interface CreateOrUpdateMatriculaDto {
  iD_MATRICULA_ESTUDIANTE: number;
  iD_PROGRAMACION_MATRICULA: number;
  iD_ESTUDIANTE_INSTITUCION: number;
  iD_PERIODOS_LECTIVOS_POR_INSTITUCION: number;
  iD_PERIODO_ACADEMICO: number;
  iD_SEMESTRE_ACADEMICO: number;
  eS_ACTIVO: boolean;
  estado: number;
  USUARIO_CREACION: string;
  getProgramacionClasePorMatriculaEstudianteDtos: GetProgramacionClasePorMatriculaEstudianteDto[];
}

export interface GetProgramacionClasePorMatriculaEstudianteDto {
  iD_PROGRAMACION_CLASE_POR_MATRICULA_ESTUDIANTE: number;
  iD_PROGRAMACION_CLASE: number;
  iD_MATRICULA_ESTUDIANTE: number;
  iD_ESTADO_UNIDAD_DIDACTICA: number;
  eS_ACTIVO: boolean;
  estado: number;
}

/** reportes* */

export interface GetListMatriculasDto {
  ID_MATRICULA_ESTUDIANTE: number;
  ID_PROGRAMACION_MATRICULA: number;
  ID_ESTUDIANTE_INSTITUCION: number;
  ID_PERIODOS_LECTIVOS_POR_INSTITUCION: number;
  ID_PERIODO_ACADEMICO: number;
  ID_SEMESTRE_ACADEMICO: number;
  ES_ACTIVO: boolean;
  ESTADO: number;
  USUARIO_CREACION: string;
  FECHA_MATRICULA: Date;
  periodoAcademico: PeriodoAcademico;
}

export interface GetPdfDto {
  base64: string;
}

export interface PeriodoAcademico {
  ID_PERIODO_ACADEMICO: number;
  ID_PERIODOS_LECTIVOS_POR_INSTITUCION: number;
  NOMBRE_PERIODO_ACADEMICO: string;
  FECHA_INICIO: string;
  FECHA_FIN: string;
}
