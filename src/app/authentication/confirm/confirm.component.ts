import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IPersonaValidateDto } from 'src/app/models/seguridad/IPersonaValidateDto.enum';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [],
})
export class ConfirmComponent implements OnInit {
  usuario!: IPersonaValidateDto;
  constructor(
    private _usuarioService: UsuarioService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idPersona'));

    this._usuarioService
      .GetPersonaConfirm(id)
      // .pipe(finalize(() => loading.close()))
      .subscribe((result) => (this.usuario = result));
  }
}
