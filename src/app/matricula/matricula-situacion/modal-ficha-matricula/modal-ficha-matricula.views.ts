import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { SessionService } from 'src/app/libs/services/session.service';
import { GetPdfDto } from 'src/app/models/matricula/matriculaDtos';
import { MatriculaService } from 'src/app/services/matricula.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-modal-ficha-matricula',
  templateUrl: './modal-ficha-matricula.views.html',
  styles: [],
})
export class ModalFichaMatriculaViews implements OnInit {
  idMat: number = 0;
  strPdf!: GetPdfDto;
  pdfSrc: any;

  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _servicioReporte: ReporteService,
    private _sesion: SessionService,

    public dialogRef: MatDialogRef<ModalFichaMatriculaViews>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: number,
  ) {
    this.getFicha(data);
  }
  ngOnInit(): void {
    // console.log('thasdasd', this.strPdf);
    // if (this.strPdf) {
    //   console.log('entro', this.strPdf);
    //   this.pdfSrc = this._base64ToArrayBuffer(this.strPdf?.base64);
    // }
  }
  _base64ToArrayBuffer(base64: string): any {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  getFicha(id: number) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._servicioReporte
      .GetReporteFicha(id)
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
    // var binary_string = base64.replace(/\\n/g, '');
    // binary_string = window.atob(base64);
    // var len = binary_string.length;
    // var bytes = new Uint8Array(len);
    // for (var i = 0; i < len; i++) {
    //   bytes[i] = binary_string.charCodeAt(i);
    // }
    // this.pdfSrc = bytes.buffer;

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

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
