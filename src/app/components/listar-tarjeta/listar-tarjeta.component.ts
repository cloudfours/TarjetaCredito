import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/Tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent {
  listaTarjetas:TarjetaCredito[]=[]
constructor(private _tarjetaServicio:TarjetaService,private toastr:ToastrService){

}
ngOnInit():void{
this.obtenerTarjetas()
}
obtenerTarjetas(){
  this._tarjetaServicio.obtenertarjetas().subscribe(doc=>{
    this.listaTarjetas=[]
    doc.forEach((data:any)=>{
console.log(data.payload.doc.id)
console.log(data.payload.doc.data())
this.listaTarjetas.push({
  id:data.payload.doc.id,
  ...data.payload.doc.data()
})
console.log(this.listaTarjetas)
    })
  })

}
eliminarTarjeta(id:any){
  this._tarjetaServicio.eliminarTarjeta(id).then(()=>{
this.toastr.error('se elimino con exito','funciono correctamente!')
  },error=>{
this.toastr.warning('Opss','hay ya se elimino')
  })
}
editarTarjeta(tarjeta:TarjetaCredito){
this._tarjetaServicio.addTarjetaEdit(tarjeta)
}
}
