var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from 'ionic-angular';
//Page
import { ModalDetailPage } from '../modal-detail/modal-detail';
import { ModalCreatePage } from '../modal-create/modal-create';
//Services
import { PublicadorService } from '../../providers/publicador/publicador';
import { PublicacionService } from '../../providers/publicacion/publicacion';
var HomePage = (function () {
    function HomePage(navCtrl, actionSheetCtrl, modalCtrl, publicadorSvc, publicacionSvc) {
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.publicadorSvc = publicadorSvc;
        this.publicacionSvc = publicacionSvc;
        this.publicadores = [];
        this.initializePublicadores();
    }
    HomePage.prototype.initializePublicadores = function () {
        var _this = this;
        this.publicadorSvc.getPublicadores().subscribe(function (items) {
            _this.publicadores = [];
            //ARRAY DE OBJECTS TIPO PUBLICADOR
            items.forEach(function (item) {
                //Array de publicaciones para un publicador
                item.publications.forEach(function (publication) {
                    //Get de todas las publicaciones
                    _this.publicacionSvc.getPublicaciones().subscribe(function (publicaciones) {
                        var publi;
                        //Get de la sigla de la publicacion por la key de cada publicacion que tiene el publicador
                        publi = publicaciones.filter(function (_publicacion) {
                            if (publication.key == _publicacion.$key) {
                                publication.code = _publicacion.code;
                            }
                        });
                    });
                });
                _this.publicadores.push(item);
            });
        });
    };
    HomePage.prototype.addPublicador = function () {
        var addModal = this.modalCtrl.create(ModalCreatePage);
        addModal.present();
    };
    HomePage.prototype.removePublicador = function (publicadorId) {
        this.publicadorSvc.deletePublicador(publicadorId);
    };
    HomePage.prototype.updatePublicador = function (publicadorData) {
        var editModal = this.modalCtrl.create(ModalDetailPage, { publicador: publicadorData });
        editModal.present();
    };
    HomePage.prototype.filterPublicadores = function (event) {
        var _this = this;
        var query = event.target.value;
        if (query == void 0) {
            query = '';
        }
        this.publicadorSvc.getPublicadores().subscribe(function (items) {
            _this.publicadores = [];
            items.forEach(function (item) {
                if (item.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                    _this.publicadores.push(item);
                }
            });
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [PublicadorService, PublicacionService]
    }),
    __metadata("design:paramtypes", [NavController,
        ActionSheetController,
        ModalController,
        PublicadorService,
        PublicacionService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map