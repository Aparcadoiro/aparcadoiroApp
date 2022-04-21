import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent  {

  //propiedad para dejar marcado la ubicacion que seleccione el usuario
  public selectedId: string ='';

  constructor( 
    //importacion del PlaceService para ejecutar metodos get
    private placeService: PlacesService,
    //Importacion del MapService para el manejo de latitud y longitude de las busquedas
    private mapService: MapService,
    ) { }

  //carga de resultados, si ya se cargo es tru si no es fals
  get isLoadingPlaces():boolean{
    //retornar la carga de objetos
    return this.placeService.isLoadingPlaces
  }

  //metodo get para enviar la informacion que traer los datos de la api
  get places():Feature[]{
    //mostrar a el usuario la informacion 
    return this.placeService.place;
  }
  //elementos que se disparan de forma auntomatica para mostrar la posicion en tiempo real de esa ubicacion
  flyTo(place: Feature){
    this.selectedId = place.id
    const [ lng, lat]= place.center;
    this.mapService.flyTo([ lng, lat]);
  }

  //implementar get direccion desde el html
  getDirection( place:Feature ){
    //activacion del error si el place service userLocation no existe
    if (!this.placeService.useLocation) throw Error('no hay userLocation')

    //borrar y ocultar lugares
    this.placeService.deletPlaces();
    
    //contante de incio para el trasado de rutas
    const start = this.placeService.useLocation;
    //contante de fin de la ubicacion por latitud y longitud
    const end = place.center as [number,number];

    //llamado de las contantes star and end
    this.mapService.getRouteBetweenPoints( start, end)
  }
}
