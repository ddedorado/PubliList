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
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { PublicadorService } from '../../providers/publicador/publicador';
import { PublicacionService } from '../../providers/publicacion/publicacion';
var ModalCreatePage = (function () {
    function ModalCreatePage(platform, navParams, viewCtrl, publicadorSvc, publicacionSvc) {
        var _this = this;
        this.platform = platform;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.publicadorSvc = publicadorSvc;
        this.publicacionSvc = publicacionSvc;
        this.publicador = {
            name: "",
            quote: "",
            publications: []
        };
        this.publicaciones = [];
        this.publicacionSvc.getPublicaciones().subscribe(function (items) {
            _this.publicaciones = [];
            items.forEach(function (item) {
                _this.publicaciones.push(item);
            });
        });
    }
    ModalCreatePage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    ModalCreatePage.prototype.addPublicador = function (publicadorData) {
        this.publicadorSvc.addPublicador(publicadorData);
        this.closeModal();
    };
    ModalCreatePage.prototype.addRow = function () {
        var publication = { key: '', quantity: 0 };
        this.publicador.publications.push(publication);
    };
    ModalCreatePage.prototype.deleteRow = function (index) {
        this.publicador.publications.splice(index, 1);
    };
    return ModalCreatePage;
}());
ModalCreatePage = __decorate([
    Component({
        templateUrl: 'modal-create.html',
        providers: [PublicadorService, PublicacionService]
    }),
    __metadata("design:paramtypes", [Platform,
        NavParams,
        ViewController,
        PublicadorService,
        PublicacionService])
], ModalCreatePage);
export { ModalCreatePage };
//# sourceMappingURL=modal-create.js.map