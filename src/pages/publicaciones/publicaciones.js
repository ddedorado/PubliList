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
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
//Providers
import { PublicacionService } from '../../providers/publicacion/publicacion';
import { PublicadorService } from '../../providers/publicador/publicador';
var PublicacionesPage = (function () {
    function PublicacionesPage(navCtrl, navParams, actionSheetCtrl, alertCtrl, publicacionSvc, publicadorSvc) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.publicacionSvc = publicacionSvc;
        this.publicadorSvc = publicadorSvc;
        this.publicaciones = [];
        this.existPublicacionAssociada = O;
        this.publicacionSvc.getPublicaciones().subscribe(function (items) {
            _this.publicaciones = [];
            items.forEach(function (item) {
                _this.publicaciones.push(item);
            });
        });
    }
    PublicacionesPage.prototype.addPublicacion = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Publicación",
            message: "Introduce la información para crear una nueva publicación.",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Nombre de la publicacion'
                },
                {
                    name: 'code',
                    placeholder: 'Código de la publicación'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: (function (data) {
                        console.log("Cierro modal");
                    })
                },
                {
                    text: 'Crear',
                    handler: (function (data) {
                        _this.publicacionSvc.addPublicacion({
                            title: data.title,
                            code: data.code
                        });
                    })
                }
            ]
        });
        alert.present();
    };
    PublicacionesPage.prototype.removePublicacion = function (publicacionId) {
        await;
        this.existsPublicacionInPublicador(publicacionId);
        console.log(this.existPublicacionAssociada);
        //esta asociada a un publicador
        //if () {
        /*let alert = this.alertCtrl.create( {
            title: "Alerta",
            message: "Esta publicación esta asociada a varios publicadores. ¿Estás seguro de querer borrarla?",
            buttons: [
                {
                    text: 'Confirmar',
                    handler: ( data => {
                        
                        this.publicacionSvc.deletePublicacionInPublicador( publicacionId );
                    } );
                },
                {
                    text: 'Cancelar',
                    handler: ( data => {} );
                }
            ]
        } );*/
        //} else {
        //this.publicacionSvc.deletePublicacion( publicacionId );
        //}
    };
    PublicacionesPage.prototype.existsPublicacionInPublicador = function (key) {
        var _this = this;
        this.publicadorSvc.getPublicadores().subscribe(function (items) {
            items.forEach(function (item) {
                _this.existPublicacionAssociada = item.publications.some(function (publication) {
                    return publication.key == key;
                });
            });
        });
    };
    PublicacionesPage.prototype.filterPublicaciones = function (event) {
        var _this = this;
        var query = event.target.value;
        if (query == void 0) {
            query = '';
        }
        this.publicacionSvc.getPublicaciones().subscribe(function (items) {
            _this.publicaciones = [];
            items.forEach(function (item) {
                if (item.title.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                    _this.publicaciones.push(item);
                }
            });
        });
    };
    return PublicacionesPage;
}());
PublicacionesPage = __decorate([
    Component({
        selector: 'page-publicaciones',
        templateUrl: 'publicaciones.html',
        providers: [PublicacionService, PublicadorService],
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ActionSheetController,
        AlertController,
        PublicacionService,
        PublicadorService])
], PublicacionesPage);
export { PublicacionesPage };
//# sourceMappingURL=publicaciones.js.map