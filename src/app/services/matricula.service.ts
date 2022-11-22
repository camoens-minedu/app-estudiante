import {
  GetCabeceraDto,
  GetListCursoProgramadosDto,
  GetListMatriculasDto,
  GetListMatriculasRegistradaDto,
  GetMatriculaCursoDto,
  GetPreMatriculaCabeceraListCursoDto,
  GetProgramacionCursoDto,
  ListCourcesNext,
} from '../models/matricula/matriculaDtos';
import { Injectable } from '@angular/core';
import { GenericRepositoryService } from './generic-repository.service';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../libs/services/session.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService extends GenericRepositoryService {
  private urlAddress?: string;
  private controller: string = '';

  constructor(
    http: HttpClient,
    private dialogService: DialogService,
    private _sessionService: SessionService,
  ) {
    super(http);
    const {
      urlAddress,
      controllers: { prematricula },
    } = environment.api;
    this.urlAddress = urlAddress ? urlAddress : '';
    this.controller = prematricula;
  }

  GetCabecera(
    idPlan: number,
    idSemestre: number,
    idPeriodoLectivo: number,
  ): Observable<GetCabeceraDto> {
    return this.get<GetCabeceraDto>(
      `${this.urlAddress}${this.controller}/${idPlan}/${idSemestre}/${idPeriodoLectivo}`,
    );
  }
  GetListMatriculasRegistradas(idEstudianteInstitucion: number) {
    return this.get<GetListMatriculasDto[]>(
      `${this.urlAddress}${this.controller}/${idEstudianteInstitucion}`,
    );
  }
  GetListMatriculaCurso(request: any): Observable<GetPreMatriculaCabeceraListCursoDto> {
    //const params = Object.assign({}, filter) as any;
    return this.get<GetPreMatriculaCabeceraListCursoDto>(
      `${this.urlAddress}${this.controller}/GetListMatriculaCurso`,
      request,
    );
  }

  getCursoProgramados(idInstitucion: number, IdUnidadDidactica: number) {
    return this.get<GetProgramacionCursoDto[]>(
      `${this.urlAddress}${this.controller}/GetListProgramacionCurso/${idInstitucion}/0/${IdUnidadDidactica}`,
    );
  }

  CreateOrUpdatePreMatricula(request: any) {
    return this.post<boolean>(
      `${this.urlAddress}${this.controller}/CreateOrUpdatePreMatricula`,
      request,
    );
  }

  public getCourse(): ListCourcesNext[] {
    return this.listCursosNext;
  }

  // public getCursoProgramados(): GetListCursoProgramadosDto[] {
  //   return this.listCursoProgramadoDto;
  // }

  public getListMatriculaRegistrada(): GetListMatriculasRegistradaDto[] {
    return this.listMartriculaRegistrada;
  }

  listMartriculaRegistrada: GetListMatriculasRegistradaDto[] = [
    {
      id: 1,
      idSemestre: 1,
      codSemestre: '2020-1',
      fechaMatricula: new Date(2020, 1, 19),
      nroCursoMatriculado: 8,
      nroCreditoMatriculado: 22,
      nroCursoAprobado: 8,
      nroCreditoAprobado: 22,
      EsMatriculado: false,
    },
    {
      id: 2,
      idSemestre: 2,
      codSemestre: '2020-2',
      fechaMatricula: new Date(2020, 8, 20),
      nroCursoMatriculado: 8,
      nroCreditoMatriculado: 22,
      nroCursoAprobado: 8,
      nroCreditoAprobado: 22,
      EsMatriculado: true,
    },
    {
      id: 3,
      idSemestre: 3,
      codSemestre: '2021-1',
      fechaMatricula: new Date(2021, 1, 5),
      nroCursoMatriculado: 8,
      nroCreditoMatriculado: 22,
      nroCursoAprobado: 8,
      nroCreditoAprobado: 22,
      EsMatriculado: true,
    },
    {
      id: 4,
      idSemestre: 4,
      codSemestre: '2021-2',
      fechaMatricula: new Date(2021, 10, 10),
      nroCursoMatriculado: 8,
      nroCreditoMatriculado: 22,
      nroCursoAprobado: 8,
      nroCreditoAprobado: 22,
      EsMatriculado: true,
    },
    {
      id: 5,
      idSemestre: 5,
      codSemestre: '2022-1',
      fechaMatricula: new Date(2022, 1, 20),
      nroCursoMatriculado: 8,
      nroCreditoMatriculado: 22,
      nroCursoAprobado: 8,
      nroCreditoAprobado: 22,
      EsMatriculado: true,
    },
    {
      id: 6,
      idSemestre: 6,
      codSemestre: '2022-2',
      fechaMatricula: new Date(2022, 8, 20),
      nroCursoMatriculado: 8,
      nroCreditoMatriculado: 22,
      nroCursoAprobado: 8,
      nroCreditoAprobado: 22,
      EsMatriculado: true,
    },
  ];

  listCursoProgramadoDto: GetListCursoProgramadosDto[] = [
    {
      id: 1,
      sede: 'IESTP GILDA LILIANA BALLIVIAN ROSADO',
      clase: 'LOGICA Y FUNCIONES',
      turno: 'MAÑANA',
      seccion: 'A',
      docente: 'BENIGNO PEBE, GUIDO RUBEN',
      aula: '11',
      horario: 'JUEVES 09:30 - 11:00',
      vacante: 34,
    },
    {
      id: 2,
      sede: 'IESTP GILDA LILIANA BALLIVIAN ROSADO',
      clase: 'LOGICA Y FUNCIONES',
      turno: 'NOCHE',
      seccion: 'A',
      docente: 'PAREJA PINTO, FEDERICO ANTONIO',
      aula: '11',
      horario: 'JUEVES 09:30 - 11:00',
      vacante: 39,
    },
  ];

  listCursosNext: ListCourcesNext[] = [
    {
      id: 1,
      codigo: '001',
      curso: 'MATENATICA 01',
      ciclo: 5,
      credito: 3,
      EsMatriculado: true,
    },
    {
      id: 2,
      codigo: '002',
      curso: 'ALGORITMO INTERMEDIO',
      ciclo: 5,
      credito: 3,
      EsMatriculado: false,
    },
    {
      id: 3,
      codigo: '003',
      curso: 'FUNDAMENTOS DE ENERGIA HIDRÁULICA',
      ciclo: 5,
      credito: 3,
      EsMatriculado: false,
    },
    {
      id: 4,
      codigo: '004',
      curso: 'LIDERAZGO',
      ciclo: 5,
      credito: 3,
      EsMatriculado: false,
    },
    {
      id: 5,
      codigo: '005',
      curso: 'INTEGRAGLES',
      ciclo: 5,
      credito: 3,
      EsMatriculado: false,
    },
    {
      id: 6,
      codigo: '006',
      curso: 'CALCULO DIFERENCIAL',
      ciclo: 4,
      credito: 3,
      EsMatriculado: false,
    },
    {
      id: 7,
      codigo: '007',
      curso: 'CABLEADO ESTRUCTURADO',
      ciclo: 7,
      credito: 3,
      EsMatriculado: false,
    },
    {
      id: 8,
      codigo: '008',
      curso: 'GESTION DE PROYECTOS',
      ciclo: 4,
      credito: 3,
      EsMatriculado: false,
    },
    {
      id: 9,
      codigo: '009',
      curso: 'EDUCACION FÍSICA',
      ciclo: 3,
      credito: 3,
      EsMatriculado: false,
    },
    {
      id: 10,
      codigo: '010',
      curso: 'MUSICA Y DANZA',
      ciclo: 3,
      credito: 3,
      EsMatriculado: false,
    },
    {
      id: 11,
      codigo: '011',
      curso: 'FUNDAMENTOS DE ENERGÍA CINÉTICA',
      ciclo: 4,
      credito: 3,
      EsMatriculado: false,
    },
    {
      id: 12,
      codigo: '012',
      curso: 'TERMICA I',
      ciclo: 5,
      credito: 3,
      EsMatriculado: false,
    },
  ];
}
