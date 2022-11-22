import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { IUbigeoDto } from 'src/app/models/maestra/IUbigeoDto';
import { MaestraService } from 'src/app/services/maestra.service';

@Component({
  selector: 'app-modal-ubigeo',
  templateUrl: './modal-ubigeo.views.html',
  styles: [],
})
export class ModalUbigeoViews implements OnInit {
  EsActivo: boolean = true;
  dataRetorno!: any;
  listUbigeo!: IUbigeoDto[];
  constructor(
    public dialogRef: MatDialogRef<ModalUbigeoViews>,
    private _maestraService: MaestraService,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: number,
  ) {}

  ngOnInit(): void {}

  doAction() {
    this.dialogRef.close({ event: 'Agregar', dataReturn: this.dataRetorno });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onBuscarUbigeo(value: any) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    this._maestraService
      .GetUbigeoFiltro(value.textoBusqueda)
      .pipe(finalize(() => loading.close()))
      .subscribe((result) => (this.listUbigeo = result));
  }

  onSelectUbigeo(value: IUbigeoDto) {
    this.dataRetorno = value;
  }
}
