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
import { IUbigeoDto } from 'src/app/models/maestra/IUbigeoDto';

@Component({
  selector: 'app-grilla-ubigeo',
  templateUrl: './grilla-ubigeo.views.html',
  styles: [],
})
export class GrillaUbigeoViews implements AfterViewInit {
  allComplete: boolean = false;
  cursosList!: MatTableDataSource<IUbigeoDto>;
  selectedRow!: IUbigeoDto;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onGetCursoSeleccionado = new EventEmitter<any>();
  @Output() onDeleteCursoSeleccionado = new EventEmitter<any>();

  displayedColumns: string[] = ['CodigoUbigeo', 'nombreFull', 'Estado'];

  @Input() set setListCursoMatricula(value: IUbigeoDto[]) {
    this.cursosList = new MatTableDataSource(value);
    this.cursosList.paginator = this.paginator;
    this.cursosList.sort = this.sort;
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.cursosList.paginator = this.paginator;
    this.cursosList.sort = this.sort;
  }

  getCurso(row: IUbigeoDto) {
    this.onGetCursoSeleccionado.emit(this.selectedRow);
  }

  deleteInvoice(row: IUbigeoDto) {
    this.onDeleteCursoSeleccionado.emit(row);
  }
}
