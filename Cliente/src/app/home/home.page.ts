//importaciones de angular
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
//importacion del servicio de parqueaderos
import { ParqueaderosService } from '../service/parqueaderos.service';
//importacion parqueaderos ts
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
//importacion del componente de login en login ts
import { LoginPage } from '../login/login.page';
//importacion del componente del register ts 
import { RegisterPage } from '../register/register.page';

//importacion del MAPBOXLG 
import * as Mapboxgl from 'mapbox-gl'
import { DetailhomeComponent } from '../detailhome/detailhome.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  //llamado de la importacion del mapa 
  mapa: Mapboxgl.Map;
  //observable de parqueaderos 
  parqueaderos$: Observable<Parqueadero[]>; 

  constructor(
    //funciones privadas de parqueaderosService 
    private parqueaderosService: ParqueaderosService, 
    //funcion priavada para el controlador de la carga 
    private loadingCtrl: LoadingController,
    //funcion privada del modelo controller
    private modalCtrl: ModalController
    ){}


  //incializacion del ngOnInit
  async ngOnInit() {
    //constante de carga de home 
    const loading = await this.loadingCtrl.create({message: 'Cargando...'})
    loading.present();
    //contante de parqueaderos services 
    this.parqueaderos$ = this.parqueaderosService.getParqueaderos().pipe(
      tap((parqueaderos) => {
        loading.dismiss();
        return parqueaderos;
      })
    ); 
  }
  //abrir modal 
  async openDetailModal(parqueadero: Parqueadero) {
    const modal = await this.modalCtrl.create({
      component: DetailhomeComponent,
      componentProps: { parqueadero },
    });
    
    await modal.present();

  }
  
  //opne login modal
  async openLoginModal(){
    const modalLogin = await this.modalCtrl.create({
      component: LoginPage,
      
    });
    
    await modalLogin.present();

    }
    //abrir el registro modal
  async openRegisterModal(){
    const modalRegister = await this.modalCtrl.create({
      component: RegisterPage,
    });
    
    await modalRegister.present();

    }

    //funcionalidad del mapa 
    

}
