export class TarjetaCredito {
    id?: string;
    titular?: string
    numeroTarjeta?: number
    fechaExpiracion?: string
    cvv?: number
    fechaCreacion?: Date
    fechaDeActualizacion?: Date
    constructor(titular: string, numeroTarjeta: number, fechaExpiracion: string, cvv: number) {

        this.titular = titular
        this.numeroTarjeta = numeroTarjeta
        this.cvv = cvv
        this.fechaExpiracion = fechaExpiracion
        this.fechaCreacion=new Date()
        this.fechaDeActualizacion=new Date()
    }
}