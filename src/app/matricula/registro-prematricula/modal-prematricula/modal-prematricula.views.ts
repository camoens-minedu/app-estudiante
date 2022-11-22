import { Component, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { SessionService } from 'src/app/libs/services/session.service';
import {
  GetListCursoProgramadosDto,
  GetMatriculaCursoDto,
  GetProgramacionCursoDto,
  ListCourcesNext,
} from 'src/app/models/matricula/matriculaDtos';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-modal-prematricula',
  templateUrl: './modal-prematricula.views.html',
  styles: [],
})
export class ModalPrematriculaViews {
  local_data: GetMatriculaCursoDto;
  vListMatriculaCurso: GetProgramacionCursoDto[] = [];
  dataRetorno!: GetProgramacionCursoDto;
  EsActivo: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalPrematriculaViews>,
    private _matriculaService: MatriculaService,
    private _sesion: SessionService,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: GetMatriculaCursoDto,
  ) {
    this.local_data = data;
    this.getListCursoProgramadoForId(this.local_data);
  }

  doAction(): void {
    this.dialogRef.close({ event: 'Agregar', dataReturn: this.dataRetorno });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  getListCursoProgramadoForId(data: GetMatriculaCursoDto) {
    const request = {
      idInstitucion: this._sesion.objInstitucion.ID_INSTITUCION,
      IdUnidadDidactica: data.IdUnidadDidactica,
    };

    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._matriculaService
      .getCursoProgramados(request.idInstitucion, request.IdUnidadDidactica)
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.vListMatriculaCurso = resp;
      });
  }

  onGetCursoProgramadosDto(value: GetProgramacionCursoDto) {
    this.dataRetorno = value;
    this.EsActivo = value.IdProgramacionClase > 0;
  }
}
