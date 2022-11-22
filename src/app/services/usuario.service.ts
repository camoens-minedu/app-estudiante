import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../libs/services/session.service';
import { enumerado } from '../models/informacion-general/informacion-personal';
import { IPersonaValidateDto } from '../models/seguridad/IPersonaValidateDto.enum';
import { DialogService } from '../shared/dialog/dialog.service';
import { GetDataUserDto } from '../shared/menu-items/GetDtoUser';
import { GenericRepositoryService } from './generic-repository.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends GenericRepositoryService {
  public usuario: GetDataUserDto = {} as GetDataUserDto;
  private urlAddressSeguridad?: string;
  private controller: string = '';

  constructor(
    http: HttpClient,
    private dialogService: DialogService,
    private _sessionService: SessionService,
  ) {
    super(http);
    const {
      urlAddressSeguridad,
      controllers: { seguridad },
    } = environment.api;
    this.urlAddressSeguridad = urlAddressSeguridad ? urlAddressSeguridad : '';
    this.controller = seguridad;
  }

  GetUserByUserName(): Observable<GetDataUserDto> {
    return this.get<GetDataUserDto>(`${this.urlAddressSeguridad}${this.controller}/getaccess`).pipe(
      map((resp: any) => {
        const dataUser = JSON.stringify(resp);
        this._sessionService.create(dataUser);
        return resp;
      }),
      catchError((error) => {
        this.dialogService.error(error);
        return of();
      }),
    );
  }

  /**
   * ? Solo para metodo publicos
   * @description Metodo publico
   * @author Israel Daniel Lozano del Castillo
   * @date 23/09/2022
   * @return {*}  {Observable<enumerado>}
   * @memberof UsuarioService
   */
  GetTipoDocValidate(): Observable<enumerado[]> {
    return this.get<enumerado[]>(`${this.urlAddressSeguridad}${this.controller}/getdocumento`).pipe(
      catchError((error) => {
        this.dialogService.error(error);
        return of();
      }),
    );
  }

  GetPersonaConfirm(id: number) {
    return this.get<IPersonaValidateDto>(`${this.urlAddressSeguridad}${this.controller}/${id}`);
  }

  async GetPersonaInstitucionValidate(tipoDoc: number, nroDoc: string, email: string) {
    return await this.get<IPersonaValidateDto>(
      `${this.urlAddressSeguridad}${this.controller}/${tipoDoc}/${nroDoc}/${email}`,
    ).toPromise();
  }

  //{idPersona}/{oldClave}/{newClave}
  async ChangePassword(idPersona: number, oldClave: string, newClave: string) {
    return await this.get<boolean>(
      `${this.urlAddressSeguridad}${this.controller}/change-password/${idPersona}/${oldClave}/${newClave}`,
    ).toPromise();
  }

  async GetForgotPassword(email: string, codigo: string) {
    return await this.get<IPersonaValidateDto>(
      `${this.urlAddressSeguridad}${this.controller}/${email}/${codigo}`,
    ).toPromise();
  }
}
