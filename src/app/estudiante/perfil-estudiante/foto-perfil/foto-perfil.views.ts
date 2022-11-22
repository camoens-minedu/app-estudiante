import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/libs/services/session.service';

@Component({
  selector: 'app-foto-perfil',
  templateUrl: './foto-perfil.views.html',
  styles: [],
})
export class FotoPerfilViews implements OnInit {
  personasles: any;
  datosAcademicos: any;
  fotoBase64: any;
  @Input() nombrecarrera: any;

  constructor(private _sessionService: SessionService) {}

  ngOnInit(): void {
    this.personasles = this._sessionService.persona;
    this.datosAcademicos = this._sessionService.Instituciones;
    this.fotoBase64 = this._sessionService.objCarreraSelect.fotoBase64;
  }
}
