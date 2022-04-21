import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReservasService } from '../service/reservas.service';
import { Reserva } from './reservas.model';
import { User } from '../shared/user.interface';
import { AuthService } from '../service/auth.service';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { ParqueaderosService } from '../service/parqueaderos.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  public user$: Observable<User> = this.authSvc.afAuth.user;
  parqueaderos$: Observable<Parqueadero[]>;
  reservas$: Observable<Reserva[]>;

  constructor(
    public authSvc: AuthService,
    private parqueaderosService: ParqueaderosService, 
    private reservasService: ReservasService, 
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Cargando...'});
    loading.present();

    this.reservas$ = this.reservasService.getReservas().pipe(
      tap(reservas =>{
        loading.dismiss();
        return reservas;
      })
    );

    this.parqueaderos$ = this.parqueaderosService.getParqueaderos().pipe(
      tap((parqueaderos) => {
        loading.dismiss();
        return parqueaderos;
      })
    );
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
