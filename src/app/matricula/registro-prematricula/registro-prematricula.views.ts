import { SessionService } from 'src/app/libs/services/session.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize, forkJoin, raceWith } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import {
  CreateOrUpdateMatriculaDto,
  GetCabeceraDto,
  GetMatriculaCursoDto,
  GetProgramacionClasePorMatriculaEstudianteDto,
  GetProgramacionCursoDto,
  ListCourcesNext,
} from 'src/app/models/matricula/matriculaDtos';
import { MatriculaService } from 'src/app/services/matricula.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { ModalPrematriculaViews } from './modal-prematricula/modal-prematricula.views';

@Component({
  selector: 'app-registro-prematricula',
  templateUrl: './registro-prematricula.views.html',
  styles: [],
})
export class RegistroPrematriculaViews implements OnInit {
  dataCabecera!: GetCabeceraDto;
  dataListCursoMatricula!: GetMatriculaCursoDto[];
  cursosSeleccionados: GetProgramacionCursoDto[] = [];

  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _servicioMatricula: MatriculaService,
    private _sesion: SessionService,
  ) {}

  ngOnInit(): void {
    this.inicializar();
  }
  inicializar() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    const request = {
      ID_INSTITUCION: this._sesion.objInstitucion.ID_INSTITUCION,
      ID_PERIODO_ACADEMICO: 0,
      ID_PLAN_ESTUDIO: this._sesion.objCarreraSelect.ID_PLAN_ESTUDIO,
      ID_SEMESTRE_ACADEMICO_ACTUAL: this._sesion.objCarreraSelect.ID_SEMESTRE_ACADEMICO,
      ID_ESTUDIANTE_INSTITUCION:
        this._sesion.sesionPersonaEstudianteInstitucion.idEstudianteInstitucion,
      ID_MATRICULA_ESTUDIANTE: 0,
      ES_UNIDAD_DIDACTICA_EF: false,
      ID_PERIODOS_LECTIVOS_POR_INSTITUCION:
        this._sesion.objInstitucion.ID_PERIODOS_LECTIVOS_POR_INSTITUCION_main,
      Pagina: 0,
      Registros: 0,
      ES_MATRICULA_CON_UD_PREVIAS: false,
    };

    this._servicioMatricula
      .GetListMatriculaCurso(request)
      .pipe(finalize(() => loading.close()))
      .subscribe(
        (resp) => {
          this.dataCabecera = resp.cabecera;
          this.dataListCursoMatricula = resp.listaCursos;
        },
        (err) => {
          console.log(err);
        },
      );

    // forkJoin({
    // cabecera: this._servicioMatricula.GetCabecera(
    //     this._sesion.objCarreraSelect.ID_PLAN_ESTUDIO,
    //     this._sesion.objCarreraSelect.ID_SEMESTRE_ACADEMICO,
    //     this._sesion.objCarreraSelect.ID_PERIODOS_LECTIVOS_POR_INSTITUCION,
    // ),
    // listCursosMatriculas: this._servicioMatricula.GetListMatriculaCurso(request),
    // })
    // .pipe(finalize(() => loading.close()))
    // .subscribe(
    //     ({ cabecera, listCursosMatriculas }) => {
    //       this.dataCabecera = cabecera;
    //       this.dataListCursoMatricula = listCursosMatriculas;
    //     },
    //     (err) => {
    //       console.log(err);
    //     },
    // );
  }

  getCursoSeleccionado(row: GetMatriculaCursoDto) {
    const dialogRef = this.dialog.open(ModalPrematriculaViews, { data: row });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this.cursosSeleccionados.push(resp.dataReturn);
        this.cursosSeleccionados.length;
        row.IdMatriculaEstudiante = 1;
      }
    });
  }

  onDeleteCursoSeleccionado(row: GetMatriculaCursoDto) {
    this.cursosSeleccionados = this.cursosSeleccionados.filter(
      ({ IdUnidadDidactica }) => IdUnidadDidactica !== row.IdUnidadDidactica,
    );
    row.IdMatriculaEstudiante = 0;
  }

  saveMatricula() {
    this._dialogService
      .confirm({
        message: '¿Desea grabar su PRE-MATRICULA?',
        buttonOk: {
          text: 'ACEPTAR',
        },
        buttonCancel: {
          text: 'CANCELAR',
        },
      })
      .subscribe((result: boolean | undefined) => {
        if (result) {
          const cursoMap = this.cursosSeleccionados.map((resp) => {
            return {
              iD_PROGRAMACION_CLASE_POR_MATRICULA_ESTUDIANTE: 0,
              iD_PROGRAMACION_CLASE: resp.IdProgramacionClase,
              iD_MATRICULA_ESTUDIANTE: 0,
              iD_ESTADO_UNIDAD_DIDACTICA: resp.IdUnidadDidactica,
              eS_ACTIVO: true,
              estado: 1,
            };
          });

          const requestMatricula: CreateOrUpdateMatriculaDto = {
            iD_MATRICULA_ESTUDIANTE: 0,
            iD_PROGRAMACION_MATRICULA:
              this.dataCabecera.ProgramacionMatricula.ID_PROGRAMACION_MATRICULA,
            iD_ESTUDIANTE_INSTITUCION:
              this._sesion.sesionPersonaEstudianteInstitucion.idEstudianteInstitucion,
            // iD_PERIODOS_LECTIVOS_POR_INSTITUCION: this._sesion.objCarreraSelect.ID_PERIODOS_LECTIVOS_POR_INSTITUCION,
            iD_PERIODOS_LECTIVOS_POR_INSTITUCION:
              this._sesion.objInstitucion.ID_PERIODOS_LECTIVOS_POR_INSTITUCION_main,
            iD_PERIODO_ACADEMICO: this._sesion.objInstitucion.ID_PERIODO_ACADEMICO,
            iD_SEMESTRE_ACADEMICO: this._sesion.objCarreraSelect.ID_SEMESTRE_ACADEMICO,
            eS_ACTIVO: true,
            USUARIO_CREACION: this._sesion.persona.NumeroDocumentoPersona,
            estado: 0,
            getProgramacionClasePorMatriculaEstudianteDtos: cursoMap as [],
          };

          // Grabando
          const loading = this.dialog.open(LoadingViews, { disableClose: true });
          this._servicioMatricula
            .CreateOrUpdatePreMatricula(requestMatricula)
            .pipe(finalize(() => loading.close()))
            .subscribe((resultado) => {
              if (resultado) {
                this._dialogService.info({
                  message: 'La información fue grabada correctamente.',
                  button: {
                    text: 'CERRAR',
                  },
                });
              }
            });
        }
      });
  }

  get getNroCursoMatriculados() {
    const count = this.cursosSeleccionados.length;
    return count > 0;
  }

  get getNroCreditosMatriculados() {
    const sum = this.cursosSeleccionados.reduce((accumulator, object) => {
      const filter = this.dataListCursoMatricula
        .filter((p) => p.IdUnidadDidactica === object.IdUnidadDidactica)
        .map((resp) => resp.Creditos);

      return accumulator + filter[0];
    }, 0);

    return sum;
  }
}
