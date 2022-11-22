import { SessionService } from 'src/app/libs/services/session.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { UsuarioService } from 'src/app/services/usuario.service';
import { OauthService } from '../services/oauth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.views.html',
  styles: [],
})
export class ChangePasswordViews implements OnInit {
  public form: UntypedFormGroup = Object.create(null);
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private _usuarioService: UsuarioService,
    private dialog: MatDialog,
    private _authService: OauthService,
    private _sesion: SessionService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        oldClave: [null, Validators.compose([Validators.required])],
        newClave: [null, Validators.compose([Validators.required])],
        newClave2: [null, Validators.compose([Validators.required])],
      },
      {
        validators: this.passwordsIguales('newClave', 'newClave2'),
      },
    );
  }

  onSubmit(): void {
    this.forgotPassword();
  }

  async forgotPassword() {
    const { oldClave, newClave } = this.form.value;
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    await this._usuarioService
      .ChangePassword(this._sesion.persona.IdPersona, oldClave, newClave)
      .then((resp: any) => {
        this.router.navigate(['/authentication/confirm', this._sesion.persona.IdPersona]);
      })
      .catch((err) => {
        console.log('Error capturado', err);
      });
    loading.close();
  }

  contrasenasNoValidas() {
    const pass1 = this.form.get('newClave')?.value;
    const pass2 = this.form.get('newClave2')?.value;
    if (pass1 !== pass2) {
      return true;
    }
    return false;
  }

  passwordsIguales(p1: string, p2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(p1);
      const pass2Control = formGroup.get(p2);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}
