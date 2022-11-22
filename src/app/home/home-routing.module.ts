import { PortalAcademicoViews } from './portal-academico/portal-academico.views';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'portalacademico',
        component: PortalAcademicoViews,
        data: {
          title: 'Portal Academico del Estudiante',
          urls: [
            {
              title: 'Home',
              url: '/home',
            },
            {
              title: 'Portal Academico',
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
export class HomeRoutingModule {}
