import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GetPersonaEstudianteDto } from 'src/app/models/informacion-general/informacion-personal';
import { IUbigeoDto } from 'src/app/models/maestra/IUbigeoDto';
import { ModalUbigeoViews } from '../modal-ubigeo/modal-ubigeo.views';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.views.html',
  styleUrls: ['./persona-form.views.scss'],
})
export class PersonaFormViews implements OnInit, OnChanges {
  @Input() personaEstudiante: GetPersonaEstudianteDto = {} as GetPersonaEstudianteDto;

  idPaisSelect: number = 0;
  idLenguaSelect: number = 0;

  @Output() save: EventEmitter<GetPersonaEstudianteDto> =
    new EventEmitter<GetPersonaEstudianteDto>();

  public form: FormGroup;

  constructor(private fb: FormBuilder, public datepipe: DatePipe, private dialog: MatDialog) {
    this.form = this.fb.group({
      idTipoDocumento: ['', Validators.required],
      nroDocumento: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nombre: ['', Validators.required],
      idSexo: ['', Validators.required],
      fechaNac: ['', Validators.required],
      lengua: ['', [Validators.required, Validators.minLength(10)]],
      discapacidad: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      celular: ['', Validators.required],
      pais: ['', Validators.required],
      ubicacion: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.idPaisSelect = this.personaEstudiante.Persona?.PAIS_NACIMIENTO;
    this.idLenguaSelect = this.personaEstudiante.Persona?.ID_LENGUA_MATERNA;
  }

  onSelecion(value: any) {
    this.idPaisSelect = value.value;
  }

  GetValor() {
    return this.idPaisSelect == 92330;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.personaEstudiante?.currentValue) {
      this.updateFormValues(changes.personaEstudiante?.currentValue);
    }
  }

  send() {
    if (this.form.valid) {
      this.save.emit({
        ...this.form.value,
        idUbigeo: this.personaEstudiante.Persona.UBIGEO_NACIMIENTO,
      });
    }
  }

  updateFormValues(data: GetPersonaEstudianteDto) {
    this.form.patchValue({
      idTipoDocumento: data?.Persona?.ID_TIPO_DOCUMENTO,
      nroDocumento: data?.Persona?.NUMERO_DOCUMENTO_PERSONA,
      apellidoPaterno: data?.Persona?.APELLIDO_PATERNO_PERSONA,
      apellidoMaterno: data?.Persona?.APELLIDO_MATERNO_PERSONA,
      nombre: data?.Persona?.NOMBRE_PERSONA,
      idSexo: data?.Persona?.SEXO_PERSONA,
      fechaNac: data?.Persona?.FECHA_NACIMIENTO_PERSONA,
      lengua: data?.Persona?.ID_LENGUA_MATERNA,
      discapacidad: data?.Persona?.ES_DISCAPACITADO == null ? 'NO' : 'SI',
      email: data?.Persona?.ListPersonaInstitucion[0]?.CORREO,
      celular: data?.Persona?.ListPersonaInstitucion[0]?.CELULAR,
      pais: data?.Persona?.PAIS_NACIMIENTO,
      ubicacion: data?.Persona?.UbigeoNacimientoFull,
      direccion: data?.Persona?.ListPersonaInstitucion[0]?.DIRECCION_PERSONA,
    });

    this.idPaisSelect = data?.Persona?.PAIS_NACIMIENTO;
  }

  onGetUbigeo() {
    const dialogRef = this.dialog.open(ModalUbigeoViews, { data: 0, width: '700px' });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        const ubigeo = resp?.dataReturn as IUbigeoDto;
        this.form.controls['ubicacion'].setValue(ubigeo.nombreFull);
        this.personaEstudiante.Persona.UBIGEO_NACIMIENTO = ubigeo.CodigoUbigeo;
      }
    });
  }
  //validaciones

  get nameField() {
    return this.form.get('nroDocumento') as FormControl;
  }

  get nameErrors() {
    if (this.nameField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get nameErrorLengua() {
    const fieldLengua = this.form.get('lengua') as FormControl;

    if (fieldLengua.hasError('required')) {
      return 'El campo lengua es obligarotio';
    }
    return '';
  }
}
