//importaciones de angular 
import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { latlong } from '../shared/latlong.interface';
//importaciones de firebase compat auth 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
//importaciones y observable 
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$:Observable<User>;


  constructor(public afAuth:AngularFireAuth, private afs:AngularFirestore) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user:any)=>{
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null)
      })
    )
  }

 
  async resetPassword(email:string): Promise<void>{
    try{
      return this.afAuth.sendPasswordResetEmail(email);
    }
    catch(error){
      console.log('Error ->',error)
    }
  }


  //logueo con Google
  async LoginGoogle(): Promise<User>{
    try{
      const { user } = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    }
    catch(error){
      console.log('Error ->', error)
    }
  }



  //registrar usuarios 
  async register(email:string, password:string, displayName:string): Promise<User>{
    try{
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email,password);
      await this.sendVerificationEmail();
      return user;
    }
    catch(error){
      console.log('Error->',error)
    }
  }

  //sistema de logueo
  async login(email:string,password:string): Promise<User>{
    try{
      const { user } = await this.afAuth.signInWithEmailAndPassword(email,password);
      this.updateUserData(user);
      return user;
    }
    catch(error){
      console.log('Error->',error)
    }
  }

  //verificacion de email
  async sendVerificationEmail(): Promise<void>{
    try{
      return ( await this.afAuth.currentUser).sendEmailVerification();
    }
    catch(error){
      console.log('Error ->', error)
    }
  }

  isEmailVerified(user: User): boolean{
    return user.emailVerified ===true ? true: false;
  }

  //cerrar sesion 
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user:User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data:User ={
      uid:user.uid,
      email:user.email,
      emailVerified: user.emailVerified,
      displayName:user.displayName,
    };

    return userRef.set(data, {merge:true});

  }

 

  
}


