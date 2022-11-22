import { DemoMaterialModule } from './../demo-material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaFormViews } from './persona-form/persona-form.views';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalUbigeoViews } from './modal-ubigeo/modal-ubigeo.views';
import { GrillaUbigeoViews } from './modal-ubigeo/grilla-ubigeo/grilla-ubigeo.views';
import { FiltroUbigeoViews } from './modal-ubigeo/filtro-ubigeo/filtro-ubigeo.views';

@NgModule({
  declarations: [PersonaFormViews, ModalUbigeoViews, GrillaUbigeoViews, FiltroUbigeoViews],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [PersonaFormViews],
})
export class CommonsModule {}
