import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  GetListCursoProgramadosDto,
  GetProgramacionCursoDto,
} from 'src/app/models/matricula/matriculaDtos';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-grilla-curso-programado',
  templateUrl: './grilla-curso-programado.views.html',
  styleUrls: ['./grilla-curso-programado.views.scss'],
})
export class GrillaCursoProgramadoViews implements OnInit {
  listCursoProgramado!: MatTableDataSource<GetListCursoProgramadosDto>;
  selectedRow!: GetProgramacionCursoDto;

  @Output() onGetCursoProgramadoDto = new EventEmitter<GetProgramacionCursoDto>();

  displayedColumns: string[] = [
    'sede',
    'clase',
    'turno',
    'seccion',
    'docente',
    'aula',
    'horario',
    'vacante',
    'action',
  ];

  @Input()
  set setCursosProgramados(value: GetListCursoProgramadosDto[]) {
    this.listCursoProgramado = new MatTableDataSource(value);
  }

  constructor() {}

  ngOnInit(): void {}

  getCurso() {
    this.onGetCursoProgramadoDto.emit(this.selectedRow);
  }
}
