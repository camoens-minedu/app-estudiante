import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-ficha-matricula',
  templateUrl: './report-ficha-matricula.views.html',
  styleUrls: ['./report.scss'],
})
export class ReportFichaMatriculaViews implements OnInit {
  pdfSrc: any;
  base64: any;

  @Input() set setPdf(value: any) {
    this.pdfSrc = value;
    // this.base64 = value;

    // // var binary_string = this.base64.replace(/\\n/g, '');
    // // var binary_string = window.atob(this.base64);
    // // var len = binary_string.length;
    // // var bytes = new Uint8Array(len);
    // // for (var i = 0; i < len; i++) {
    // //   bytes[i] = binary_string.charCodeAt(i);
    // // }
    // // this.pdfSrc = bytes.buffer;

    // const byteArray = new Uint8Array(
    //   atob(this.base64)
    //     .split('')
    //     .map((char) => char.charCodeAt(0)),
    // );

    // const file = new Blob([byteArray], { type: 'application/pdf' });
    // // const fileURL = URL.createObjectURL(file);
    // const fileURL = window.URL.createObjectURL(file);
    // console.log('url', fileURL);
    // // window.open(fileURL);

    // this.pdfSrc = fileURL;
  }

  constructor() {}

  ngOnInit(): void {}
}
