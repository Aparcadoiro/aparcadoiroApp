import { Component} from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent  {

  /*funcion de js para  especificar el período de tiempo que se debe 
  *esperar una respuesta de servicio web al invocar una solicitud de salida
  */
  private debounceTimer?: NodeJS.Timeout;

  constructor(private placeService: PlacesService) { }

  //envio de peticiones de busqueda a mapbox
  onQueryChanged(query: string =''){

    //limpiar el cuadro de texto 
    if( this.debounceTimer )clearTimeout(this.debounceTimer);

    //enviar a consola el cuadro de texto
    this.debounceTimer = setTimeout(()=>{
      //utilizacion de es search de mapbox
      this.placeService.getPlacesByQuery( query );
    },500)
  }

}
