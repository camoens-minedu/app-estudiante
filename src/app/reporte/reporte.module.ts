import { MatriculaModule } from './../matricula/matricula.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteHistorialViews } from './reporte-historial/reporte-historial.views';
import { DemoMaterialModule } from '../demo-material-module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltroSemestreMainViews } from './filtro-semestre-main/filtro-semestre-main.views';
import { BoletaNotasViews } from './boleta-notas/boleta-notas.views';

@NgModule({
  declarations: [ReporteHistorialViews, FiltroSemestreMainViews, BoletaNotasViews],
  imports: [
    MatriculaModule,
    ReporteRoutingModule,
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
    CommonModule,
  ],
})
export class ReporteModule {}
