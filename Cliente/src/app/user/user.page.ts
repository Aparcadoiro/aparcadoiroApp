//Importaciones de Angular y Ionic para el uso de interfaces, rutas y funciones
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { error } from 'console';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DetailComponentUser } from '../detail-user/detail-user.page';
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { ParqueaderosPage } from '../parqueaderos/parqueaderos.page';
import { AuthService } from '../service/auth.service';
import { ParqueaderosService } from '../service/parqueaderos.service';
import { User } from '../shared/user.interface';
import { environment } from 'src/environments/environment';
import { PopoverComponent } from '../components/popover/popover.component';
//importacion para el uso del mapa
import * as Mapboxgl from 'mapbox-gl'
import { ReservasPage } from '../reservas/reservas.page';


mapa: Mapboxgl.Map;

//Componentes para usar los archivos de user
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

//Funcion para exportar la clase VerifyEmailPage
export class UserPage implements OnInit {

  //Funcion para definir la variable user como una variable publica y enlazarla con el modelo User
  public user$: Observable<User> = this.authSvc.afAuth.user;

  //Funcion para definir la variable parqueaderos y enlazarla con el modelo Parqueadero
  parqueaderos$: Observable<Parqueadero[]>;

  //Funcion para definir la variable mapa y usar el componenete
  mapa: Mapboxgl.Map;

  //Funcion constructor para definir variables de autenticacion, servicios y rutas
  constructor(public authSvc: AuthService, private router: Router,
    private parqueaderosService: ParqueaderosService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) { }

  //Funcion para cuando inicia la página
  async ngOnInit(): Promise<void> {

    //Constante para que aparezca un modal mientras cargan los datos de la pagina
    const loading = await this.loadingCtrl.create({ message: 'Cargando...' })
    loading.present();

    //Funcion para traer la informacion de parqueaderos
    this.parqueaderos$ = this.parqueaderosService.getParqueaderos().pipe(
      tap((parqueaderos) => {
        loading.dismiss();
        return parqueaderos;
      })
    );

    //Funcion para el acceso al mapa de mapbox
    Mapboxgl.accessToken = environment.mapboxkey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa', // Id de la etiqueda para el mapa
      style: 'mapbox://styles/mapbox/streets-v11', // URL para los estilos del mapa
      center: [-74.222580, 4.711627], // Posicion inicial del mapa
      zoom: 14 // Zoom inicial del mapa
    });

    // Añadir zoom al mapa
    this.mapa.addControl(new Mapboxgl.NavigationControl());

  }

  //Funcion para abrir el modal de detalles de parqueadero
  async openDetailModal(parqueadero: Parqueadero) {
    const modal = await this.modalCtrl.create({
      component: DetailComponentUser,
      componentProps: { parqueadero },
    });
    await modal.present();
  }

  // Funcion para abrir el modal con los parqueaderos del usuario
  async openParqueaderosModal() {
    const modalLogin = await this.modalCtrl.create({
      component: ParqueaderosPage,
    });
    await modalLogin.present();
  }

  // Funcion para abrir el modal con las reservas del usuario
  async openReservasModal() {
    const modalLogin = await this.modalCtrl.create({
      component: ReservasPage,
    });
    await modalLogin.present();
  }

  //salir de la sesion 
  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['']);
    } catch (error) {
      console.log(error);
    }
  }
  //desplegar menu
  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();
  
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}

