import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { TarjetaCredito } from '../models/Tarjeta';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private tarjeta$ = new Subject<any>()
  constructor(private firebase: AngularFirestore) { }
  guardarTarjeta(tarjeta: TarjetaCredito): Promise<any> {
    return this.firebase.collection('tarjeta').add(tarjeta)

  }
  obtenertarjetas(): Observable<any> {
    return this.firebase.collection('tarjeta', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
  eliminarTarjeta(id: string): Promise<any> {
    return this.firebase.collection('tarjeta').doc(id).delete()
  }
editarTarjeta(id:string,tarjeta:any):Promise<any>{
  return this.firebase.collection('tarjeta').doc(id).update(tarjeta)
}
  addTarjetaEdit(tarjeta: TarjetaCredito) {
    this.tarjeta$.next(tarjeta)
  }
  getTarjetaEdit(): Observable<TarjetaCredito> {
    return this.tarjeta$.asObservable();
  }
}
