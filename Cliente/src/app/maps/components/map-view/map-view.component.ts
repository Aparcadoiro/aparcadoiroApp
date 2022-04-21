import { Component,AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
//importacion del mapa de mpabox de marela local
import { Map,Popup,Marker } from 'mapbox-gl'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Parqueadero } from 'src/app/parqueaderos/parqueaderos.model';
import { ParqueaderosService } from 'src/app/service/parqueaderos.service';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

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
    ) { }

  ngAfterViewInit(): void {

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


    
    
    //nuevo marcador
    const pruebas = [];

    const prueba = new Marker()
      .setLngLat([-74.2178147, 4.695709])
      .addTo ( map );
      pruebas.push (prueba);
      
    this.markers = pruebas;

  }

    

}
