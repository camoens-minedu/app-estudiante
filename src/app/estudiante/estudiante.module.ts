import { CommonsModule } from './../commons/commons.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgModule } from '@angular/core';
import { EstudianteRoutes } from './estudiante.routing';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from './../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { InformacionGeneralViews } from './informacion-general/informacion-general.views';
import { PerfilEstudianteViews } from './perfil-estudiante/perfil-estudiante.views';
import { FotoPerfilViews } from './perfil-estudiante/foto-perfil/foto-perfil.views';
import { AcercaEstudianteViews } from './perfil-estudiante/acerca-estudiante/acerca-estudiante.views';
import { InformacionEstudianteViews } from './perfil-estudiante/informacion-estudiante/informacion-estudiante.views';
import { ComponentModule } from '../libs/components/component.module';

@NgModule({
  declarations: [
    InformacionGeneralViews,
    PerfilEstudianteViews,
    FotoPerfilViews,
    AcercaEstudianteViews,
    InformacionEstudianteViews,
  ],
  imports: [
    CommonsModule,
    ComponentModule,
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

    //Aplicación
    EstudianteRoutes,
  ],
})
export class EstudianteModule {}
