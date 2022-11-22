import { CursoDto } from './../../models/portal/cursoDto';
import { PortalService } from './../../services/portal.service';
import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/authentication/services/oauth.service';

@Component({
  selector: 'app-portal-academico',
  templateUrl: './portal-academico.views.html',
  styleUrls: ['./portal-academico.views.scss'],
})
export class PortalAcademicoViews implements OnInit {
  public isUserAuthenticated: boolean = false;

  courseList: CursoDto[] = [];

  constructor(private portalService: PortalService, private _authService: OauthService) {
    this.courseList = portalService.getCourse();
  }

  ngOnInit(): void {
    this._authService.loginChanged.subscribe((res) => {
      this.isUserAuthenticated = res;
    });

    // if (!this.isUserAuthenticated) {
    //   this._authService.login();
    //   this._authService.loginChanged.subscribe((res) => {
    //     this.isUserAuthenticated = res;
    //   });
    // }
  }
}
