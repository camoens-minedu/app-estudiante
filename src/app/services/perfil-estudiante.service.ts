import { AlertOptions } from './../shared/dialog/dialog-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetPersonaInstitutoDto } from '../models/informacion-general/perfil-estudiante';
import { DialogService } from '../shared/dialog/dialog.service';
import { GenericRepositoryService } from './generic-repository.service';

@Injectable({
  providedIn: 'root',
})
export class PerfilEstudianteService extends GenericRepositoryService {
  private urlAddress?: string;
  private controller: string = '';

  constructor(http: HttpClient, private dialogService: DialogService) {
    super(http);

    const {
      urlAddress,
      controllers: { informacionPersonal },
    } = environment.api;
    this.urlAddress = urlAddress ? urlAddress : '';
    this.controller = informacionPersonal;
  }

  async GetPerfilPersonaInstitucion(idPersonaInstitucion: number, idCarreraInstitucion: number) {
    return await this.get<GetPersonaInstitutoDto>(
      `${this.urlAddress}${this.controller}/perfil/${idPersonaInstitucion}/${idCarreraInstitucion}`,
    ).toPromise();
  }
}
