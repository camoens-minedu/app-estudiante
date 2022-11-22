import { Component, Input, OnInit } from '@angular/core';
import { PersonaInstitucionDto } from 'src/app/models/informacion-general/perfil-estudiante';

@Component({
  selector: 'app-acerca-estudiante',
  templateUrl: './acerca-estudiante.views.html',
  styles: [],
})
export class AcercaEstudianteViews implements OnInit {
  @Input() dataPersona!: PersonaInstitucionDto;

  constructor() {}

  ngOnInit(): void {}
}
