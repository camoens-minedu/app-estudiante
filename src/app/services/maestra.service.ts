import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUbigeoDto } from '../models/maestra/IUbigeoDto';
import { DialogService } from '../shared/dialog/dialog.service';
import { GenericRepositoryService } from './generic-repository.service';

@Injectable({
  providedIn: 'root',
})
export class MaestraService extends GenericRepositoryService {
  private urlAddress?: string;
  private controller: string = '';

  constructor(http: HttpClient, private dialogService: DialogService) {
    super(http);
    const {
      urlAddress,
      controllers: { maestra },
    } = environment.api;
    this.urlAddress = urlAddress ? urlAddress : '';
    this.controller = maestra;
  }

  GetUbigeoFiltro(filtro: string) {
    return this.get<IUbigeoDto[]>(`${this.urlAddress}${this.controller}/getubigeofiltro/${filtro}`);
  }
}
