import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { OauthService } from 'src/app/authentication/services/oauth.service';
import { SessionService } from 'src/app/libs/services/session.service';

@Component({
  selector: 'app-vertical-header',
  templateUrl: './vertical-header.component.html',
  styleUrls: [],
})
export class VerticalAppHeaderComponent implements OnInit {
  public isUserAuthenticated: boolean = false;
  codigoPeriodo!: string;

  public config: PerfectScrollbarConfigInterface = {};

  // This is for Notifications
  // tslint:disable-next-line - Disables all
  notifications: Object[] = [
    {
      round: 'round-danger',
      icon: 'ti-link',
      title: 'Launch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM',
    },
    {
      round: 'round-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM',
    },
    {
      round: 'round-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM',
    },
    {
      round: 'round-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM',
    },
  ];

  // This is for Mymessages
  // tslint:disable-next-line - Disables all
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM',
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM',
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM',
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM',
    },
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us',
    },
    {
      language: 'Español',
      code: 'es',
      icon: 'es',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr',
    },
    {
      language: 'German',
      code: 'de',
      icon: 'de',
    },
  ];
  fotoBase64!: string;

  constructor(
    private translate: TranslateService,
    private _authService: OauthService,
    private _sessionService: SessionService,
  ) {
    translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this._authService.loginChanged.subscribe((res) => {
      this.isUserAuthenticated = res;
    });

    this.fotoBase64 = this._sessionService.objCarreraSelect.fotoBase64;
    this.codigoPeriodo = this._sessionService.objInstitucion.CODIGO_PERIODO_LECTIVO;
  }

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }

  public logout = () => {
    this._authService.logout();
  };
}
