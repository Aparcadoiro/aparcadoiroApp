import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BookingResponse } from '../maps/api/libre';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService{

    constructor(private firestore: AngularFirestore){}


    // Crear documentos en base de datos Firestore
    createDoc(data: any, path: string, id:string) {
        const collection = this.firestore.collection(path);
        return collection.doc(id).set(data)
    }

    // Crear nuevo documento con ID default
    createDocIdDefault( path: string, data: BookingResponse ){
        return this.firestore.collection(path).add(data);
    } 


    // Obtener documentos en base de datos Firestore
    getDoc<Tipo>(path: string, id: string){
        const colleccion = this.firestore.collection<Tipo>(path)
        return colleccion.doc(id).valueChanges()
    }

    getDocs<Tipo>(path){
        const colleccion = this.firestore.collection<Tipo>(path).valueChanges();
        return colleccion
    }

    updateDoc(path:string, id: string, data: any){
        return this.firestore.collection(path).doc(id).update(data)
    }
    // Obtener todos los documentos de una colección
    getAllDocs(document: string){
        return this.firestore.collection(document).snapshotChanges();
    }

    getCollection<Tipo>(path:string){
        const colleccion = this.firestore.collection<Tipo>(path);
        return colleccion.valueChanges();
    }

    deleteDoc(path:string, id:string){
        const colleccion = this.firestore.collection(path);
        return colleccion.doc(id).delete();
    }


    async createParqueadero(path,datosparqueadero){
        return await this.firestore.collection(path).add(datosparqueadero);
    }
}

