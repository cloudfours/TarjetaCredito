import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/Tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent {
  forms: FormGroup
  loading = false;
  titular = "Crear Tarjeta"
  id: string | undefined
  constructor(private fb: FormBuilder, private _tarjetaService: TarjetaService, private toastr: ToastrService) {
    this.forms = this.fb.group({

      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }
  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data => {
      console.log(data)
      this.titular = "Editar Tarjeta"
      this.forms.patchValue({
        id: data.id,
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv
      })
    })
  }
  guardarTarjeta() {
    if (this.id === undefined) {
      //crear
      this.agregartarea()
    } else {
      //editar
      this.editarTarjeta(this.id)
    }

  }
  editarTarjeta(id: string) {
    const tarjeta: any = {
      titular: this.forms.value.titular,
      numeroTarjeta: this.forms.value.numeroTarjeta,
      fechaExpiracion: this.forms.value.fechaExpiracion,

      fechaDeActualizacion: new Date()
    }
    this.loading = true
    this._tarjetaService.editarTarjeta(id, tarjeta).then(() => {
      this.loading = false
      this.titular = "Crear tarjeta"
      this.forms.reset()
      this.id = undefined
      this.toastr.info('Se edito correctamente', 'se edito con exito')
    })
  }
  agregartarea() {
    const tarjeta: TarjetaCredito = {
      titular: this.forms.value.titular,
      numeroTarjeta: this.forms.value.numeroTarjeta,
      fechaExpiracion: this.forms.value.fechaExpiracion,
      cvv: this.forms.value.cvv,
      fechaCreacion: new Date(),
      fechaDeActualizacion: new Date()
    }
    this.loading = true
    this._tarjetaService.guardarTarjeta(tarjeta).then(() => {
      this.loading = false;
      this.toastr.success('Se guardo exitosamente', 'tarjeta registrada')
      this.forms.reset()
    }, error => {
      this.loading = false;
      this.toastr.error('Ops...', 'error')
    })

  }
}
