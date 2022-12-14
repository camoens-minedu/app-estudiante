import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  GetListMatriculasDto,
  GetListMatriculasRegistradaDto,
  GetMtatriculaConsolidadDto,
} from 'src/app/models/matricula/matriculaDtos';

@Component({
  selector: 'app-grilla-matricula-situacion',
  templateUrl: './grilla-matricula-situacion.views.html',
  styles: [],
})
export class GrillaMatriculaSituacionViews {
  listaMatriculaRegistrada!: MatTableDataSource<GetMtatriculaConsolidadDto>;
  displayedColumns: string[] = [
    'id',
    'codSemestre',
    'fechaMatricula',
    'nroCursoMatriculado',
    'nroCreditoMatriculado',
    'nroCursoAprobado',
    'nroCreditoAprobado',
    'EsMatriculado',
    'action',
  ];

  @Output() onGetFicha = new EventEmitter<number>();

  @Input()
  set setListMatriculaRegistrado(value: GetMtatriculaConsolidadDto[]) {
    this.listaMatriculaRegistrada = new MatTableDataSource(value);
  }

  constructor() {}

  getFicha(idMatricula: number) {
    this.onGetFicha.emit(idMatricula);
  }
}
