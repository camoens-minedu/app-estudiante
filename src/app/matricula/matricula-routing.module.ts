import { MatriculaFichaViews } from './matricula-ficha/matricula-ficha.views';
import { MatriculaSituacionViews } from './matricula-situacion/matricula-situacion.views';
import { RegistroPrematriculaViews } from './registro-prematricula/registro-prematricula.views';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pre-matricula',
        component: RegistroPrematriculaViews,
        data: {
          title: 'Registro Pre-Matricula',
          urls: [
            { title: 'Inicio', url: '/home' },
            {
              title: 'Pre-Matricula',
            },
          ],
        },
      },
      {
        path: 'matricula-consolidacion',
        component: MatriculaSituacionViews,
        data: {
          title: 'Consolidación de Matricula',
          urls: [
            { title: 'Inicio', url: '/home' },
            {
              title: 'Consolidación de Matricula',
            },
          ],
        },
      },
      {
        path: 'matricula-ficha',
        component: MatriculaFichaViews,
        data: {
          title: 'Ficha de Matrícula',
          urls: [
            { title: 'Inicio', url: '/home' },
            {
              title: 'Ficha de Matricula',
            },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatriculaRoutingModule {}
