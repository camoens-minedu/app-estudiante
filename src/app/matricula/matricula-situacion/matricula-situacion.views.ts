import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { SessionService } from 'src/app/libs/services/session.service';
import {
  GetListMatriculasDto,
  GetMtatriculaConsolidadDto,
  GetPdfDto,
} from 'src/app/models/matricula/matriculaDtos';
import { MatriculaService } from 'src/app/services/matricula.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { ModalFichaMatriculaViews } from './modal-ficha-matricula/modal-ficha-matricula.views';

@Component({
  selector: 'app-matricula-situacion',
  templateUrl: './matricula-situacion.views.html',
  styles: [],
})
export class MatriculaSituacionViews implements OnInit {
  @ViewChild('pdfViewer') public pdfViewer: any;

  pdfSrc: any;

  strPdf!: GetPdfDto;

  listMatriculaRegistrada: GetMtatriculaConsolidadDto[] = [];

  constructor(
    private _matriculaService: MatriculaService,
    public dialog: MatDialog,
    private _sesion: SessionService,
    private _servicioReporte: ReporteService,
  ) {
    this.getMatriculasRegistradas();
  }
  getMatriculasRegistradas() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._matriculaService
      .GetListMatriculasRegistradas(
        this._sesion.sesionPersonaEstudianteInstitucion.idEstudianteInstitucion,
        this._sesion.objInstitucion.ID_PERIODOS_LECTIVOS_POR_INSTITUCION_main,
      )
      .pipe(finalize(() => loading.close()))
      .subscribe(
        (resp) => {
          this.listMatriculaRegistrada = resp;
        },
        (err) => {
          console.log(err);
        },
      );
  }

  ngOnInit(): void {
    // this.pdfViewer.pdfSrc = this._base64ToArrayBuffer(this.baseDato);
    // this.pdfViewer.refresh();
  }

  onGetFicha(idMatricula: number) {
    // const loading = this.dialog.open(LoadingViews, { disableClose: true });

    // this._servicioReporte
    //   .GetReporteFicha(idMatricula)
    //   .pipe(finalize(() => loading.close()))
    //   .subscribe(
    //     (resp) => {
    //       this.strPdf = resp;
    //       // this.createPDF(this.strPdf.base64);
    //     },
    //     (err) => {
    //       console.log(err);
    //     },
    //   );

    const dialogRef = this.dialog.open(ModalFichaMatriculaViews, {
      data: idMatricula,
    });
  }

  createPDF(base64: string) {
    // console.log('createPDF', base64);
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
    console.log('url', fileURL);
    // window.open(fileURL);

    this.pdfSrc = fileURL;
  }

  _base64ToArrayBuffer(base64: any) {
    // var binary_string = base64.replace(/\\n/g, '');
    // binary_string = window.atob(base64);
    // var len = binary_string.length;
    // var bytes = new Uint8Array(len);
    // for (var i = 0; i < len; i++) {
    //   bytes[i] = binary_string.charCodeAt(i);
    // }
    // return bytes.buffer;

    const byteArray = new Uint8Array(
      atob(base64)
        .split('')
        .map((char) => char.charCodeAt(0)),
    );

    const file = new Blob([byteArray], { type: 'application/pdf' });
    // const fileURL = URL.createObjectURL(file);
    const fileURL = window.URL.createObjectURL(file);
    console.log('url', fileURL);
    // window.open(fileURL);

    return fileURL;
  }

  // baseDato =
  //   'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
  //   'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
  //   'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
  //   'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
  //   'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
  //   'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
  //   'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
  //   'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
  //   'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
  //   'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
  //   'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
  //   'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
  //   'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';

  // src = this._base64ToArrayBuffer(
  //   'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
  //     'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
  //     'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
  //     'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
  //     'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
  //     'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
  //     'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
  //     'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
  //     'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
  //     'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
  //     'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
  //     'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
  //     'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G',
  // );
}
