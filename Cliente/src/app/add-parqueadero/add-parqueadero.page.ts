//importacion del nucleo de angular 
import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//importacion para le formulario, el controlador y los validadores de formularios angular 
import { FormControl, FormGroup, Validators } from '@angular/forms';
//carga de controladores y modales para ionuc angular
import { LoadingController, ModalController } from '@ionic/angular';
//Importacion de los observables para el manejo de opreaciones asincronas
import { Observable } from 'rxjs';
//Importacion de los operadores para observables para la operacion 
import { take } from 'rxjs/operators';
import { markerparqueadero } from '../models/parqueadero';

//improtacion de los models de parqueaderos 
import { Parqueadero } from '../parqueaderos/parqueaderos.model';
import { AuthService } from '../service/auth.service';
import { FirestoreService } from '../service/firestoreservice.service';
import { Marquermap } from '../service/marker.service';
//importacion de los servicios de parqueaderos 
import { ParqueaderosService } from '../service/parqueaderos.service';
//importacion para el uso de la interfaz de usuario
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-add-parqueadero',
  templateUrl: './add-parqueadero.page.html',
  styleUrls: ['./add-parqueadero.page.scss'],
})
export class AddParqueaderoPage implements OnInit {
  parqueaderosmarkers:markerparqueadero = {latitud:null, longitud:null}
  //Variable de parqueadero
  @Input() parqueadero: Parqueadero;


  public user$: Observable<User> = this.authSvc.afAuth.user;
  isEditMode = false;
  form:FormGroup;

  constructor(

    private _MarkerService : Marquermap,

    public afs: AngularFirestore,
    
    public authSvc: AuthService,
    //variable privada de parqueaderos Service 
    private parqueaderosService:ParqueaderosService, 
    //carga de controlladores 
    private loadingCtrl: LoadingController,
    // controlador de los modales 
    private modalCtrl: ModalController,

    private firestore: FirestoreService
    ) {}

  ngOnInit() {
    //iniciacion de los formularios de parqueadero
    this.initAddParqueaderoForm();
    //si parqueadero esta creado, se puede editar su contenido
    if (this.parqueadero){
      this.isEditMode = true;
      this.setFormValues();
    }
  }

  //iniciacion para crear parqueaderos con formularios reactivos
  initAddParqueaderoForm(){
    //creacion de los bloques para formularios reactivos 
    this.form = new FormGroup({
      direccion: new FormControl(null, [Validators.required]),
      tarifa: new FormControl(null, [Validators.required]),
      latitud: new FormControl(null, [Validators.required]),
      longitud: new FormControl(null, [Validators.required]),
      vehiculos: new FormControl(null, [Validators.required]),
      imagenUrl: new FormControl(null, [Validators.required]),
      cupos: new FormControl(null, [Validators.required]),
      activo: new FormControl(true),
      uid: new FormControl(null, [Validators.required]),
    });
  }

  //creacion de formulario reactivo sobre pormulario estandar en HTLM
  setFormValues(){
    this.form.setValue({
      direccion: this.parqueadero.direccion,
      tarifa: this.parqueadero.tarifa,
      latitud : this.form.value.latitud,
      longitud : this.form.value.longitud,
      vehiculos: this.parqueadero.vehiculos,
      imagenUrl: this.parqueadero.imagenUrl,
      cupos: this.parqueadero.cupos,
      activo: this.parqueadero.activo,
      uid: this.parqueadero.uid,
    });

    this.form.updateValueAndValidity();
  }

  
  

  //cerrar modal
  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

  //antes de mostrar el parqueadero aparecera el estado de cargando
  async submitParqueadero() {
    this.closeModal();
    const loading = await this.loadingCtrl.create({ message: 'Cargando...' });
    loading.present();

    //limitacion de las variables que puede analizar el Observable 
    let response: Observable<Parqueadero>;

    if (this.isEditMode) {
      response = 
      this.parqueaderosService.updateParqueadero(
        this.parqueadero.id, 
        this.form.value);
    } else {
      response =  this.parqueaderosService
      .addParqueadero(this.form.value);
    }

    //creacion de canales que permiten expresar secuencias multiples con pipe 
    response.pipe(take(1)).subscribe((parqueadero) => {
      this.form.reset();
      console.log(parqueadero);
      loading.dismiss();

      if (this.isEditMode) {
        this.closeModal(parqueadero);
      }
    });

  }

  Creparqueadero(){
    this.firestore.createParqueadero('Parqueaderos',this.parqueaderosmarkers);
    console.log('se creo con exito');
  }

}
