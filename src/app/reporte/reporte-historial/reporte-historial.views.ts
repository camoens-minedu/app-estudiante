import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { SessionService } from 'src/app/libs/services/session.service';
import { GetPdfDto } from 'src/app/models/matricula/matriculaDtos';
import { ReporteService } from 'src/app/services/reporte.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-reporte-historial',
  templateUrl: './reporte-historial.views.html',
  styles: [],
})
export class ReporteHistorialViews implements OnInit {
  strPdf!: GetPdfDto;
  pdfSrc: any;

  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _servicioReporte: ReporteService,
    private _sesion: SessionService,
  ) {}

  ngOnInit(): void {}

  getReporteHistorial() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    const ID_INSTITUCION = this._sesion.objInstitucion.ID_INSTITUCION;
    const ID_TIPO_DOCUMENTO = this._sesion.persona.IdTipoDocumento;
    const ID_NUMERO_DOCUMENTO = this._sesion.persona.NumeroDocumentoPersona;
    const ID_SEDE_INSTITUCION = this._sesion.objCarreraSelect.ID_SEDE_INSTITUCION;
    const ID_CARRERA = this._sesion.objCarreraSelect.ID_CARRERA;
    const ID_PLAN_ESTUDIO = this._sesion.objCarreraSelect.ID_PLAN_ESTUDIO;
    const ID_PERIODO_LECTIVO_INSTITUCION =
      this._sesion.objInstitucion.ID_PERIODOS_LECTIVOS_POR_INSTITUCION_main;

    this._servicioReporte
      .getReporteHistorialVfinal(
        ID_INSTITUCION,
        ID_TIPO_DOCUMENTO,
        ID_NUMERO_DOCUMENTO,
        ID_SEDE_INSTITUCION,
        ID_CARRERA,
        ID_PLAN_ESTUDIO,
        ID_PERIODO_LECTIVO_INSTITUCION,
      )
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
