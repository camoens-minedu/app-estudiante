import { Component, Input, OnInit } from '@angular/core';
import { GetCabeceraDto } from 'src/app/models/matricula/matriculaDtos';

@Component({
  selector: 'app-matricula-cabecera',
  templateUrl: './matricula-cabecera.views.html',
  styles: [],
})
export class MatriculaCabeceraViews implements OnInit {
  nroCursosMatriculado: number = 0;
  nroCreditos: number = 0.0;

  @Input() dataCabecera!: GetCabeceraDto;

  @Input() set setCount(value: number) {
    this.nroCursosMatriculado = value;
  }

  @Input() set setCredito(value: number) {
    this.nroCreditos = value;
  }

  constructor() {}

  ngOnInit(): void {}

  get getNroCurso() {
    return this.nroCursosMatriculado;
  }

  get getNroCreditos() {
    return this.nroCreditos;
  }
}
