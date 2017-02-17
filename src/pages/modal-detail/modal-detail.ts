import { Component } from '@angular/core';
import { 
	Platform, 
	NavParams, 
	ViewController
} from 'ionic-angular';

import { PublicadorService } from '../../providers/publicador/publicador';
import { PublicacionService } from '../../providers/publicacion/publicacion';

@Component({
	templateUrl: 'modal-detail.html',
	providers: [PublicadorService, PublicacionService]
})
export class ModalDetailPage {
	
	publicador;
	publicaciones = [];

	constructor(
		public platform: Platform,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public publicadorSvc: PublicadorService,
		public publicacionSvc: PublicacionService
	) {

		this.publicador = this.navParams.get( 'publicador' );

		this.publicacionSvc.getPublicaciones().subscribe( ( items ) => {

			this.publicaciones = [];

			items.forEach( ( item ) => {

				this.publicaciones.push( item );
			} );

		} );
	}

	closeModal() {

		this.viewCtrl.dismiss();
	}

	savePublicador( publicadorData ) {

		this.publicadorSvc.editPublicador( publicadorData );

		this.closeModal();
	}

	addRow() {

		let publication = { key: '', quantity: 0 };

		if( ! this.publicador.hasOwnProperty( "publications" ) ) {
			this.publicador.publications = [];
		}

		this.publicador.publications.push( publication );
	}

	deleteRow( index ) {

		this.publicador.publications.splice( index, 1 );
	}
}