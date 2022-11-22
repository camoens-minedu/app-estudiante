import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OauthService } from '../services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isUserAuthenticated: boolean = false;

  public form: UntypedFormGroup = Object.create(null);
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private _authService: OauthService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });

    this._authService.loginChanged.subscribe((res) => {
      this.isUserAuthenticated = res;
    });

    if (!this.isUserAuthenticated) {
      this._authService.login();
    }
  }

  onSubmit(): void {
    this.router.navigate(['/home/portalacademico']);
  }
}
