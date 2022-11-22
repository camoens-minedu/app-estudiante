import { IAddInformacionPersonalDto } from './../../models/informacion-general/IAddInformacionPersonalDto';
import { LoadingViews } from './../../libs/components/loading/loading.views';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InformacionPersonalService } from 'src/app/services/informacion-personal.service';
import { finalize } from 'rxjs';
import { GetPersonaEstudianteDto } from 'src/app/models/informacion-general/informacion-personal';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { SessionService } from 'src/app/libs/services/session.service';

@Injectable()
export class InformacionPersonalPresenter {
  personaDto: GetPersonaEstudianteDto = {} as GetPersonaEstudianteDto;
  constructor(
    private dialog: MatDialog,
    private _servicioInformacionPersona: InformacionPersonalService,
    private _dialogService: DialogService,
    private _sesion: SessionService,
  ) {}

  GetPersonaEstudianteForId(idPersona: number) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    this._servicioInformacionPersona
      .GetInformacionPersonalById(idPersona)
      .pipe(finalize(() => loading.close()))
      .subscribe((result) => (this.personaDto = result));
  }

  createOrUpdatePersona(dato: any) {
    this._dialogService
      .confirm({
        title: 'Confirmación',
        message: '¿Desea grabar la información del Estudiante?',
        buttonOk: { text: 'ACEPTAR' },
        buttonCancel: { text: 'CANCELAR' },
      })
      .subscribe((result: boolean | undefined) => {
        if (result) {
          //Grabando
          const request: IAddInformacionPersonalDto = {
            ID_PERSONA: this._sesion.persona.IdPersona,
            ID_LENGUA_MATERNA: dato.lengua,
            ES_DISCAPACITADO: dato.discapacidad == 'SI' ? true : false,
            CORREO: dato.email,
            CELULAR: dato.celular,
            PAIS_NACIMIENTO: dato.pais,
            DIRECCION_PERSONA: dato.direccion,
            UBIGEO_NACIMIENTO: dato.idUbigeo,
          };

          const loading = this.dialog.open(LoadingViews, { disableClose: true });
          this._servicioInformacionPersona
            .AddOrUpdateInformacionPersonal(request)
            .pipe(finalize(() => loading.close()))
            .subscribe((result) => {
              if (result) {
                this._dialogService.info({
                  title: 'Aviso',
                  message: 'La información fue grabada correctamente.',
                  button: { text: 'CERRAR' },
                });
              }
            });
          // .pipe(
          //   finalize(() => {
          //     loading.close();
          //     if (result) {
          //       this._dialogService.info({
          //         message: 'La información fue grabada correctamente.',
          //         button: { text: 'CERRAR' },
          //       });
          //     }
          //   }),
          // );
        }
      });
  }
}
