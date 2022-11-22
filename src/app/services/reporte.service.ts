import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetPdfDto } from '../models/matricula/matriculaDtos';
import { GenericRepositoryService } from './generic-repository.service';

@Injectable({
  providedIn: 'root',
})
export class ReporteService extends GenericRepositoryService {
  private urlAddress?: string;
  private controller: string = '';

  constructor(http: HttpClient) {
    super(http);
    const {
      urlAddress,
      controllers: { reporte },
    } = environment.api;
    this.urlAddress = urlAddress ? urlAddress : '';
    this.controller = reporte;
  }

  GetReporteFicha(idMatricula: number) {
    return this.get<GetPdfDto>(`${this.urlAddress}${this.controller}/${idMatricula}`);
  }

  getReporteHistorial(
    idPeriodoLectivoByInstituto: number,
    idEstudiante: number,
    idEvaluacionExtra: number,
  ) {
    return this.get<GetPdfDto>(
      `${this.urlAddress}${this.controller}/${idPeriodoLectivoByInstituto}/${idEstudiante}/${idEvaluacionExtra}`,
    );
  }

  getReporteHistorialVfinal(
    ID_INSTITUCION: number,
    ID_TIPO_DOCUMENTO: number,
    ID_NUMERO_DOCUMENTO: string,
    ID_SEDE_INSTITUCION: number,
    ID_CARRERA: number,
    ID_PLAN_ESTUDIO: number,
    ID_PERIODO_LECTIVO_INSTITUCION: number,
  ) {
    return this.get<GetPdfDto>(
      `${this.urlAddress}${this.controller}/${ID_INSTITUCION}/${ID_TIPO_DOCUMENTO}/${ID_NUMERO_DOCUMENTO}/${ID_SEDE_INSTITUCION}/${ID_CARRERA}/${ID_PLAN_ESTUDIO}/${ID_PERIODO_LECTIVO_INSTITUCION}`,
    );
  }

  getReporteBoletaNotas(idPeriodoLectivoByInstituto: number, idMatricula: number) {
    return this.get<GetPdfDto>(
      `${this.urlAddress}${this.controller}/${idMatricula}/${idPeriodoLectivoByInstituto}`,
    );
  }
}
