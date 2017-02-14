import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

//Pages
import { HomePage } from '../pages/home/home';
import { PublicacionesPage } from '../pages/publicaciones/publicaciones';
import { ModalCreatePage } from '../pages/modal-create/modal-create';
import { ModalDetailPage } from '../pages/modal-detail/modal-detail';

//Providers
import { PublicadorService } from '../providers/publicador/publicador';
import { PublicacionService } from '../providers/publicacion/publicacion';

//Modules
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyC-xKphhsmc5bFUuJsO0i6o7g3sPBLhVCw",
  authDomain: "ionic-test-b4610.firebaseapp.com",
  databaseURL: "https://ionic-test-b4610.firebaseio.com",
  storageBucket: "ionic-test-b4610.appspot.com",
  messagingSenderId: "593471445549"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PublicacionesPage,
    ModalCreatePage,
    ModalDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp( firebaseConfig )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PublicacionesPage,
    ModalCreatePage,
    ModalDetailPage
  ],
  providers: [
    PublicadorService,
    PublicacionService
  ]
})
export class AppModule {}
