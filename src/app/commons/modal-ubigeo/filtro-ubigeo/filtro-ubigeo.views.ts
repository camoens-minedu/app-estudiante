import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filtro-ubigeo',
  templateUrl: './filtro-ubigeo.views.html',
  styles: [],
})
export class FiltroUbigeoViews implements OnInit {
  myForm!: FormGroup;

  @Output() buscar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      // idTipoBusqueda: [{ value: "1" }],
      textoBusqueda: ['', Validators.required],
    });
  }

  onSubmit() {
    this.buscar.emit(this.myForm.value);
  }
}
