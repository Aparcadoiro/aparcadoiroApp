import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { Reserva } from '../reservas/reservas.model';
import { AuthService } from '../service/auth.service';
import { ReservasService } from '../service/reservas.service';

@Component({
  selector: 'app-pagar-reserva',
  templateUrl: './pagar-reserva.page.html',
  styleUrls: ['./pagar-reserva.page.scss'],
})
export class PagarReservaPage implements OnInit {

  @Input() parqueadero: Parqueadero;
  @Input() reserva: Reserva;
  form: FormGroup;

  constructor(public authSvc: AuthService,
    private modalCtrl: ModalController,
    private reservasService: ReservasService,
    private loadingCtrl: LoadingController){}

  ngOnInit() {
    this.initAddReservaForm();
    this.setFormValues();
  }

  //funciona para crear el formulario de las reservas
  initAddReservaForm(){
    this.form = new FormGroup({
      uid: new FormControl(),
      pid: new FormControl(),
      placa: new FormControl(null, [Validators.required]),  
      dia_ingreso: new FormControl(null, [Validators.required]),
      hora_ingreso: new FormControl(null, [Validators.required]),
      hora_salida: new FormControl(null, [Validators.required]),
      confirmUser: new FormControl(null, [Validators.requiredTrue]),
      confirmParqueadero: new FormControl(),
      estado: new FormControl(),
    });
  }

  setFormValues(){
    this.form.setValue({
      placa: this.reserva.placa,
      dia_ingreso: this.reserva.dia_ingreso,
      hora_ingreso: this.reserva.hora_ingreso,
      hora_salida: this.reserva.hora_salida,
      confirmUser: this.reserva.confirmUser,
      confirmParqueadero: this.reserva.confirmParqueadero,
      uid: this.reserva.uid,
      pid: this.reserva.pid,
      estado: this.reserva.estado
    });

    this.form.updateValueAndValidity();
  }

  async submitReserva(){
    const loading = await this.loadingCtrl.create({ message: 'Cargando...' });
    loading.present();

    let response: Observable<Reserva>;

    response = this.reservasService.updateReservas(
      this.reserva.id, 
      this.form.value
    );

    response.pipe(take(1)).subscribe((reserva) => {
      this.form.reset();
      loading.dismiss();

      this.closeModal(reserva);

    });
  }

  //cerrar modal
  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

}
