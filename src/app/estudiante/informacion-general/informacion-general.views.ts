import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/libs/services/session.service';
import { InformacionPersonalPresenter } from './informacion-general.presenter';

@Component({
  providers: [InformacionPersonalPresenter],
  selector: 'app-informacion-general',
  templateUrl: './informacion-general.views.html',
  styles: [],
})
export class InformacionGeneralViews implements OnInit {
  constructor(
    public _presenter: InformacionPersonalPresenter,
    private _sessionService: SessionService,
  ) {
    this._presenter.GetPersonaEstudianteForId(
      _sessionService.sesionPersonaEstudianteInstitucion.idPersonaInstitucion,
    );
  }

  ngOnInit(): void {}
}
