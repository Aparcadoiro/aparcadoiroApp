import { Component,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
//importacion del mapa de mpabox de marela local
import { Map,Popup,Marker } from 'mapbox-gl'
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

  //inyeccion del serivicio 
  constructor(
    //inyectar el servicio de mapService
    private mapService: MapService,
    //inyectar el servicio para mostrar la funcionalidad del mapa en PlacesService
    private placeService: PlacesService) { }

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
    
    setTimeout(() => {
      this.mapService.setMap(map);
    }, 3000);
  }

}
