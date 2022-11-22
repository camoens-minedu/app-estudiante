import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { QuillModule } from 'ngx-quill';
import { FlexLayoutModule } from '@angular/flex-layout';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './../demo-material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatriculaRoutingModule } from './matricula-routing.module';
import { RegistroPrematriculaViews } from './registro-prematricula/registro-prematricula.views';
import { MatriculaSituacionViews } from './matricula-situacion/matricula-situacion.views';
import { MatriculaFichaViews } from './matricula-ficha/matricula-ficha.views';
import { MatriculaCabeceraViews } from './registro-prematricula/matricula-cabecera/matricula-cabecera.views';
import { GrillaPrematriculaViews } from './registro-prematricula/grilla-prematricula/grilla-prematricula.views';
import { ModalPrematriculaViews } from './registro-prematricula/modal-prematricula/modal-prematricula.views';
import { GrillaCursoProgramadoViews } from './registro-prematricula/modal-prematricula/grilla-curso-programado/grilla-curso-programado.views';
import { FiltroSemestreViews } from './matricula-situacion/filtro-semestre/filtro-semestre.views';
import { GrillaMatriculaSituacionViews } from './matricula-situacion/grilla-matricula-situacion/grilla-matricula-situacion.views';
import { ModalFichaMatriculaViews } from './matricula-situacion/modal-ficha-matricula/modal-ficha-matricula.views';
import { ReportFichaMatriculaViews } from './matricula-situacion/modal-ficha-matricula/report-ficha-matricula/report-ficha-matricula.views';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer'; // <-- Import PdfJsViewerModule module

@NgModule({
  exports: [ReportFichaMatriculaViews],
  declarations: [
    RegistroPrematriculaViews,
    MatriculaSituacionViews,
    MatriculaFichaViews,
    MatriculaCabeceraViews,
    GrillaPrematriculaViews,
    ModalPrematriculaViews,
    GrillaCursoProgramadoViews,
    FiltroSemestreViews,
    GrillaMatriculaSituacionViews,
    ModalFichaMatriculaViews,
    ReportFichaMatriculaViews,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    FlexLayoutModule,
    QuillModule.forRoot(),
    NgApexchartsModule,
    PerfectScrollbarModule,
    Ng2SearchPipeModule,
    DragDropModule,
    NgxPaginationModule,
    MatriculaRoutingModule,
    PdfViewerModule,
    PdfJsViewerModule,
  ],
})
export class MatriculaModule {}
