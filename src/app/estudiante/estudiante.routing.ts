import { PerfilEstudianteViews } from './perfil-estudiante/perfil-estudiante.views';
import { InformacionGeneralViews } from './informacion-general/informacion-general.views';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'informacion-general',
        component: InformacionGeneralViews,
        data: {
          title: 'Información General',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Información General' }],
        },
      },
      {
        path: 'perfil-estudiante',
        component: PerfilEstudianteViews,
        data: {
          title: 'Perfil del Estudiante',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Perfil del Estudiante' }],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteRoutes {}
