import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/placesApiClient';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';
;

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  //recopilar informacion del dispositivo para Latitud y longitud
  public useLocation?: [number,number];
  //carga tipo buleano verdadero, falso 
  public isLoadingPlaces: boolean = false;
  //arreglo que se inicializa de forma basia(carga de lugares)
  public place: Feature[]=[];  
  //metodo get boolean para retornar si o no se puede usar la localizacion 
  get isUserLocationReady():boolean{
    return !!this.useLocation;
  }

  //peticion http Client
  constructor( 
    //peticion Http personalizado
    private placesApi: PlacesApiClient,
    //peticion para llamar los markes que se mostraran a el usuario 
    private mapService: MapService
    ) { 
    this.getUserLocation();
  }

  //conversor de datos para que se puedan usar como promesas 
  public async getUserLocation(): Promise<[number,number]>{
    return new Promise ( (resolve, reject ) =>{
      //emitir valores a medida que el usuario de desplaza por el mapa 
      //navigator.geolocation.watchPosition
      
      //conversion para saber donde esta el usuario poscisionado en el mapa 
      navigator.geolocation.getCurrentPosition(
        //Mapbox lee las coordenadas de forma invertida, longitude y luego latitude
        ( {coords} )=>{ 
          this.useLocation = [coords.longitude, coords.latitude]
          resolve( this.useLocation);
        },
        //error donde se le muestre al usuario que no lo logro obtener la localizacion del navegador 
        ( error )=>{
          alert( 'No se logro obtener tu ubicacion' )
          console.log(error);
          reject();
        }
      );

    });
  }

  //metodo query  atributo ProductModelID se recupera a partir de la base de datos
  getPlacesByQuery(query: string = ''){

    if( query.length === 0){
      this.isLoadingPlaces = false;
      this.place = [];
      return;
    }
    //verificacion si existe el user location por medio de un if
    if( !this.useLocation ) throw Error('No hay userLocation');

    //si se encuentra cargando no muestre resultados, si ya se cargo que miestre los resultados 
    this.isLoadingPlaces = true;

    // todo para vealuar cuando el query sea null
    this.placesApi.get<PlacesResponse>(`/${query}.json`,{
      params:{
        proximity: this.useLocation.join(',')
      }
    })

    //traer datos para ser mostradas al usuario
    .subscribe(resp =>{
        this.isLoadingPlaces = false;
        this.place = resp.features;
        this.mapService.createMarkersFromPlaces(this.place, this.useLocation!);
    });
  }

  deletPlaces(){
    this.place = [];
  }
}
