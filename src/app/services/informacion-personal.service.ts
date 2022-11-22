import { Observable, catchError, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogService } from '../shared/dialog/dialog.service';
import { GenericRepositoryService } from './generic-repository.service';
import { GetPersonaEstudianteDto } from '../models/informacion-general/informacion-personal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InformacionPersonalService extends GenericRepositoryService {
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

  GetInformacionPersonalById(idPersona: number): Observable<GetPersonaEstudianteDto> {
    return this.get<GetPersonaEstudianteDto>(
      `${this.urlAddress}${this.controller}/${idPersona}`,
    ).pipe(
      catchError((error) => {
        this.dialogService.error(error);
        return of();
      }),
    );
  }

  AddOrUpdateInformacionPersonal(request: any) {
    return this.post<boolean>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateInformacionPersonal`,
      request,
    );
  }
}
