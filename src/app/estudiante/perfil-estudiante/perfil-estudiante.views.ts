import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { PerfilEstudianteService } from 'src/app/services/perfil-estudiante.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { GetPersonaInstitutoDto } from 'src/app/models/informacion-general/perfil-estudiante';
import { SessionService } from 'src/app/libs/services/session.service';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.views.html',
  styleUrls: ['./perfil-estudiante.views.scss'],
})
export class PerfilEstudianteViews implements OnInit {
  data: GetPersonaInstitutoDto = {} as GetPersonaInstitutoDto;

  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _perfilEstudianteService: PerfilEstudianteService,
    private _sessionService: SessionService,
  ) {}
  ngOnInit(): void {
    this.GetPersonaInstitucionByIdPersonaInstitucion(
      this._sessionService.sesionPersonaEstudianteInstitucion.idPersonaInstitucion,
      this._sessionService.sesionPersonaEstudianteInstitucion.ID_CARRERAS_POR_INSTITUCION_DETALLE,
    );
  }

  async GetPersonaInstitucionByIdPersonaInstitucion(
    idPersonaInstitucion: number,
    idCarreraInstitucion: number,
  ) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    await this._perfilEstudianteService
      .GetPerfilPersonaInstitucion(idPersonaInstitucion, idCarreraInstitucion)
      .then((resp) => (this.data = resp as GetPersonaInstitutoDto));

    // .pipe(finalize(() => ))
    // .subscribe((resp) => {
    //   this.data = resp;
    // });

    loading.close();
  }
}
