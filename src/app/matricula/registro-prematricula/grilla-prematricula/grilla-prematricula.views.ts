import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetMatriculaCursoDto, ListCourcesNext } from 'src/app/models/matricula/matriculaDtos';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-grilla-prematricula',
  templateUrl: './grilla-prematricula.views.html',
  styleUrls: ['./grilla-prematricula.views.scss'],
})
export class GrillaPrematriculaViews implements AfterViewInit {
  allComplete: boolean = false;
  cursosList!: MatTableDataSource<GetMatriculaCursoDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onGetCursoSeleccionado = new EventEmitter<any>();
  @Output() onDeleteCursoSeleccionado = new EventEmitter<any>();

  displayedColumns: string[] = [
    'id',
    'SemestreAcademico',
    'NombreTipoUnidadDidactica',
    'NombreUnidadDidactica',
    'Creditos',
    'Horas',
    'Estado',
    'action',
  ];

  @Input() set setListCursoMatricula(value: GetMatriculaCursoDto[]) {
    this.cursosList = new MatTableDataSource(value);
    this.cursosList.paginator = this.paginator;
    this.cursosList.sort = this.sort;
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.cursosList.paginator = this.paginator;
    this.cursosList.sort = this.sort;
  }

  getCurso(row: GetMatriculaCursoDto) {
    this.onGetCursoSeleccionado.emit(row);
  }

  deleteInvoice(row: GetMatriculaCursoDto) {
    this.onDeleteCursoSeleccionado.emit(row);
  }
}
