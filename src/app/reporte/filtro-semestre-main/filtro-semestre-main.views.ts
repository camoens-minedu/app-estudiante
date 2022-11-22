import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetListMatriculasDto } from 'src/app/models/matricula/matriculaDtos';

@Component({
  selector: 'app-filtro-semestre-main',
  templateUrl: './filtro-semestre-main.views.html',
  styles: [],
})
export class FiltroSemestreMainViews implements OnInit {
  comboSemestre!: GetListMatriculasDto[];
  idEstudianteSelect!: number;

  @Input() set setValue(value: GetListMatriculasDto[]) {
    if (value) {
      this.comboSemestre = value;
    }
  }

  @Output() onSelect: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onSelectSemestre() {
    // console.log(this.idEstudianteSelect);
    this.onSelect.emit(this.idEstudianteSelect);
  }
}
