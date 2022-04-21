import { Component,AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
//importacion del mapa de mpabox de marela local
import { Map,Popup,Marker } from 'mapbox-gl'
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Parqueadero } from 'src/app/parqueaderos/parqueaderos.model';
import { ParqueaderosService } from 'src/app/service/parqueaderos.service';
import { MapService, PlacesService } from '../../services';
import { FirestoreService } from 'src/app/service/firestoreservice.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  public parqueaderosDisponibles: any[] = [];
  //llamar el div para renderizar el mapa en tiempo real
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  @Input() parqueadero: Parqueadero;

  private markers: Marker [] = [];

  //inyeccion del serivicio 
  constructor(
    //inyectar el servicio de mapService
    private mapService: MapService,
    //inyectar el servicio para mostrar la funcionalidad del mapa en PlacesService
    private placeService: PlacesService,

    public modalController: ModalController,

    private firestoreService: FirestoreService, 
    ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      //no mostrar el mapa si no se tiene un user Location
      if ( !this.placeService.useLocation) throw Error('No hay un placesService.userLocation');

      const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placeService.useLocation,
      zoom: 14 // starting zoom
      });

      const popup = new Popup()
        .setHTML(`
          <h6>Aqui estoy</h6>
          <span>Te encuentras aqui</span>
        `);

      new Marker({color:'red'})
        .setLngLat(this.placeService.useLocation)
        .setPopup( popup )
        .addTo( map )

      //mandar a llamar 
      this.mapService.setMap(map);

      this.getParkings('Parqueaderos');
    }, 2000);
  }

   // Obtener los parqueaderos disponibles
   getParkings(document: string){
    this.firestoreService.getAllDocs(document).subscribe( parqueaderos => {
      parqueaderos.forEach( (parkData: any) => {
        this.parqueaderosDisponibles.push(parkData.payload.doc.data());
      });
      console.log(this.parqueaderosDisponibles);
      this.createMarkersFromParkings()
    });
  }

  // Crear marcadores de parqueaderos disponibles
  createMarkersFromParkings(){

    const markersParkings = [];
    
    for (const parking of this.parqueaderosDisponibles) {
      let { latitud, longitud  } = parking
      // Crear popup
      const popup = new Popup()
        .setHTML(`
          <h1>${parking.nameParqueadero}</h1>
          <button class="btn btn-sm btn-primary mt-3" id="btn-ruta">Información</button>
        `)

      // Crear marcador 
      const newMarker = new Marker({color: ''})
        .setLngLat([parking.longitud, parking.latitud])
        .setPopup( popup )
        .addTo( this.mapService.map );

      markersParkings.push( newMarker );
    }

    for (let i = 0; i < this.parqueaderosDisponibles.length; i++) {
      this.markers.push(markersParkings[i]);
    }
  }


    

}
