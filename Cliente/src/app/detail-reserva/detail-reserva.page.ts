import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AddReservaPage } from '../add-reserva/add-reserva.page';
import { PagarReservaPage } from '../pagar-reserva/pagar-reserva.page';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { Reserva } from '../reservas/reservas.model';
import { ReservasService } from '../service/reservas.service';

@Component({
  selector: 'app-detail-reserva',
  templateUrl: './detail-reserva.page.html',
  styleUrls: ['./detail-reserva.page.scss'],
})
export class DetailReservaPage implements OnInit {

  reservas$: Observable<Reserva[]>;
  parqueaderos$: Observable<Parqueadero[]>;
  @Input() reserva: Reserva;

  constructor(
    private modalCtrl: ModalController,
    private reservasService: ReservasService,
    private loadingCtrl: LoadingController) { }

  ngOnInit(){
  }

  //cerrar modal
  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.reserva, role);
  }

  async onDeleteReserva(){
    const loading = await this.loadingCtrl.create({message: 'Cancelando reserva'})
    loading.present();

    this.reservasService
      .deleteReservas(this.reserva.id)
      .pipe(take(1))
      .subscribe(() => {
        loading.dismiss();
        this.closeModal('delete');
      });
  }

  async openPagoModal(){
    const modal = await this.modalCtrl.create({
      component: PagarReservaPage,
      componentProps: { reserva: this.reserva },
    });

    await modal.present();

    const { data: updatedReserva } = await modal.onDidDismiss();
    if (updatedReserva) {
      this.reserva = updatedReserva;
    }
  }

}
