import { CursoDto } from './../models/portal/cursoDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  constructor() {}
  public getCourse(): CursoDto[] {
    return this.cursos;
  }

  cursos: CursoDto[] = [
    {
      Id: 1,
      courseType: 'Web',
      courseName: 'ALGORITMO Y ESTRUCTURA DE DATOS',
      Time: '1.5 hrs',
      Update: '',
      docente: 'LOZANO DEL CASTILLO,ISRAEL DANIEL',
      correo: 'ilozano@iest@gob.pe',
    },
    {
      Id: 2,
      courseType: 'Angular',
      courseName: 'FUNDAMENTO DE ELECTRICIDAD',
      Time: '1.5 hrs',
      Update: '',
      docente: 'MACEDO ROJAS, WALTER',
      correo: 'wama@iest@gob.pe',
    },
    {
      Id: 3,
      courseType: 'Design',
      courseName: 'ENERGIA TERMINA I',
      Time: '1.5 hrs',
      Update: '',
      docente: 'VASQUEZ RAMIREZ, BRANCO ORLANDO',
      correo: 'ssandoval@iest@gob.pe',
    },
  ];
}
