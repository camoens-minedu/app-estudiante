import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { OauthService } from 'src/app/authentication/services/oauth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { InstitucionCarrereSelec } from 'src/app/shared/menu-items/GetDtoUser';
import { SessionService } from '../../services/session.service';
import { LoadingViews } from '../loading/loading.views';

@Component({
  selector: 'app-signin-redirect-callback',
  template: `<div></div>`,
})
export class SigninRedirectCallbackComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private _authService: OauthService,
    private _router: Router,
    private usuarioService: UsuarioService,
    private _sessionService: SessionService,
  ) {}
  ngOnInit(): void {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._authService.finishLogin().then((data) => {
      //console.log(data);
      this.usuarioService
        .GetUserByUserName()
        .pipe(
          finalize(() => {
            loading.close();
          }),
        )
        .subscribe((res) => {
          if (!res.tieneInstituciones) {
            const instituto: InstitucionCarrereSelec = {
              idPersonaInstitucion: res.instituciones[0].ID_PERSONA_INSTITUCION,
              idEstudianteInstitucion: res.instituciones[0].carreras[0].ID_ESTUDIANTE_INSTITUCION,
              ID_CARRERAS_POR_INSTITUCION_DETALLE:
                res.instituciones[0].carreras[0].ID_CARRERAS_POR_INSTITUCION_DETALLE,
            };

            this._sessionService.createKeyPeis(JSON.stringify(instituto));

            this._router.navigate(['/home'], { replaceUrl: true });
          } else {
            this._router.navigate(['/authentication/validate-iest'], { replaceUrl: true });
          }
          console.info('---App Iniciado---');
        });
    });
    // this._authService.finishLogin().then((_) => {
    //   this._router.navigate(['/home'], { replaceUrl: true });
    // });
  }
}
