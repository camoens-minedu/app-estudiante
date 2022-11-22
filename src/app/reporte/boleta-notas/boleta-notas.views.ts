import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { SessionService } from 'src/app/libs/services/session.service';
import { GetListMatriculasDto, GetPdfDto } from 'src/app/models/matricula/matriculaDtos';
import { MatriculaService } from 'src/app/services/matricula.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-boleta-notas',
  templateUrl: './boleta-notas.views.html',
  styles: [],
})
export class BoletaNotasViews implements OnInit {
  strPdf!: GetPdfDto;
  pdfSrc: any;

  comboSemestre!: GetListMatriculasDto[];
  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _servicioReporte: ReporteService,
    private _sesion: SessionService,
    private _matriculaService: MatriculaService,
  ) {}

  ngOnInit(): void {
    this.getComboMatricula();
  }
  onSelectSemestre(idMaestricula: number) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    const idPeriodoLectivoByInstituto =
      this._sesion.objInstitucion.ID_PERIODOS_LECTIVOS_POR_INSTITUCION_main;

    this._servicioReporte
      .getReporteBoletaNotas(idPeriodoLectivoByInstituto, idMaestricula)
      .pipe(finalize(() => loading.close()))
      .subscribe(
        (resp) => {
          this.strPdf = resp;
          this.createPDF(this.strPdf.base64);
        },
        (err) => {
          console.log(err);
        },
      );
  }

  getComboMatricula() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    const idEstudiante = this._sesion.sesionPersonaEstudianteInstitucion.idEstudianteInstitucion;

    this._matriculaService
      .GetListMatriculasRegistradas(idEstudiante)
      .pipe(finalize(() => loading.close()))
      .subscribe(
        (resp) => {
          this.comboSemestre = resp;
        },
        (err) => {
          console.log(err);
        },
      );
  }

  createPDF(base64: string) {
    const byteArray = new Uint8Array(
      atob(base64)
        .split('')
        .map((char) => char.charCodeAt(0)),
    );

    const file = new Blob([byteArray], { type: 'application/pdf' });
    // const fileURL = URL.createObjectURL(file);
    const fileURL = window.URL.createObjectURL(file);

    this.pdfSrc = fileURL;
  }
}
