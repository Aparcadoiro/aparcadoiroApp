//importacion de angular 
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
//importacion de parqueaderos TS
import { AddParqueaderoPage } from '../add-parqueadero/add-parqueadero.page';
//importacion del modelo de parqueaderos 
import { Parqueadero } from '../parqueaderos/parqueaderos.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailComponent implements OnInit {
  
  @Input() parqueadero: Parqueadero;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  //cerrar modal de parqueaderos
  closeModal() {
    this.modalCtrl.dismiss(this.parqueadero);
  }
  //abrir modal paqueaderos
  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: AddParqueaderoPage,
      componentProps: { parqueadero: this.parqueadero }, 
    });

    await modal.present();
    //constante parqueaderos, modal paqueaderos 
    const { data: updatedParqueadero } = await modal.onDidDismiss();
    if (updatedParqueadero) {
      this.parqueadero = updatedParqueadero;
    }
  }
}
