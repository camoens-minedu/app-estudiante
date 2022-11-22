import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { MatDialog } from '@angular/material/dialog';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { UsuarioService } from 'src/app/services/usuario.service';
import { OauthService } from '../services/oauth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  public form: UntypedFormGroup = Object.create(null);
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private _usuarioService: UsuarioService,
    private dialog: MatDialog,
    private _authService: OauthService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      codigo: [null, Validators.compose([Validators.required])],
    });
  }

  onSubmit(): void {
    this.forgotPassword();
  }

  async forgotPassword() {
    const { email, codigo } = this.form.value;
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    await this._usuarioService
      .GetForgotPassword(email, codigo)
      .then((resp: any) => {
        this.router.navigate(['/authentication/confirm', resp?.ID_PERSONA]);
      })
      .catch((err) => {
        console.log('Error capturado', err);
      });
    loading.close();
  }
}
