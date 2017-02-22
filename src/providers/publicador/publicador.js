var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//AngularFirebase2 Module
import { AngularFire } from 'angularfire2';
var PublicadorService = (function () {
    function PublicadorService(http, af) {
        this.af = af;
        this.publicadoresObservable = af.database.list('/publicadores');
    }
    PublicadorService.prototype.getPublicadores = function () {
        return this.publicadoresObservable;
    };
    PublicadorService.prototype.addPublicador = function (data) {
        this.publicadoresObservable.push({
            name: data.name,
            quote: data.quote,
            publications: data.publications
        });
    };
    PublicadorService.prototype.deletePublicador = function (id) {
        this.publicadoresObservable.remove(id);
    };
    PublicadorService.prototype.editPublicador = function (data) {
        this.publicadoresObservable.update(data.$key, {
            name: data.name,
            quote: data.quote,
            publications: data.publications
        });
    };
    return PublicadorService;
}());
PublicadorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AngularFire])
], PublicadorService);
export { PublicadorService };
//# sourceMappingURL=publicador.js.map