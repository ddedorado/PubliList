var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
export var firebaseConfig = {
    apiKey: "AIzaSyC-xKphhsmc5bFUuJsO0i6o7g3sPBLhVCw",
    authDomain: "ionic-test-b4610.firebaseapp.com",
    databaseURL: "https://ionic-test-b4610.firebaseio.com",
    storageBucket: "ionic-test-b4610.appspot.com",
    messagingSenderId: "593471445549"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            PublicacionesPage,
            ModalCreatePage,
            ModalDetailPage
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            AngularFireModule.initializeApp(firebaseConfig)
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map