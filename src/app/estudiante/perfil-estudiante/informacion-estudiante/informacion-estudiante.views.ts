import { Component, Input, OnInit } from '@angular/core';
import { PersonaInstitucionDto } from 'src/app/models/informacion-general/perfil-estudiante';

@Component({
  selector: 'app-informacion-estudiante',
  templateUrl: './informacion-estudiante.views.html',
  styles: [],
})
export class InformacionEstudianteViews implements OnInit {
  @Input() data: PersonaInstitucionDto = {} as PersonaInstitucionDto;

  constructor() {}

  ngOnInit(): void {}
}
