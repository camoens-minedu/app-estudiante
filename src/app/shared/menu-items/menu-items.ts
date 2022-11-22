import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '',
    name: 'Opciones',
    type: 'saperator',
    icon: 'av_timer',
  },
  {
    state: 'home',
    name: 'Inicio',
    type: 'link',
    icon: 'home',
  },

  {
    state: 'estudiante',
    name: 'Estudiante',
    type: 'sub',
    icon: 'av_timer',
    children: [
      { state: 'informacion-general', name: 'Informacion General', type: 'link' },
      { state: 'perfil-estudiante', name: 'Perfil del Estudiante', type: 'link' },
    ],
  },
  {
    state: 'matricula',
    name: 'Matricula',
    type: 'sub',
    icon: 'insert_drive_file',
    badge: [{ type: 'warning', value: '=>' }],
    children: [
      { state: 'pre-matricula', name: 'Pre-Matricula', type: 'link' },
      { state: 'matricula-consolidacion', name: 'Consolidacion Matricula', type: 'link' },
      // { state: 'matricula-ficha', name: 'Ficha Matricula', type: 'link' },
    ],
  },
  {
    state: 'reporte',
    name: 'Reportes',
    type: 'sub',
    icon: 'insert_chart',
    badge: [{ type: 'red', value: ':)' }],
    children: [
      { state: 'reporte-historial', name: 'Historial Academico', type: 'link' },
      { state: 'button', name: 'Boleta de Notas', type: 'link' },
      { state: 'cards', name: 'Perfil Academico', type: 'link' },
    ],
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
