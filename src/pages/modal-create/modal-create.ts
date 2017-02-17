import { Component } from '@angular/core';
import { 
	Platform, 
	NavParams, 
	ViewController
} from 'ionic-angular';

import { PublicadorService } from '../../providers/publicador/publicador';
import { PublicacionService } from '../../providers/publicacion/publicacion';

@Component({
	templateUrl: 'modal-create.html',
	providers: [PublicadorService, PublicacionService]
})
export class ModalCreatePage {
	
	publicador = {
		name : "",
		quote: "",
		publications: []
	};

	publicaciones = [];

	constructor(
		public platform: Platform,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public publicadorSvc: PublicadorService,
		public publicacionSvc: PublicacionService
	) {

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

	addPublicador( publicadorData ) {

		this.publicadorSvc.addPublicador( publicadorData );
		
		this.closeModal();
	}

	addRow() {

		let publication = { key: '', quantity: 0 };

		this.publicador.publications.push( publication );
	}

	deleteRow( index ) {

		this.publicador.publications.splice( index, 1 );
	}
}