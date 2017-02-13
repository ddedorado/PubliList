import { Component } from '@angular/core';
import { 
	NavController, 
	AlertController, 
	ActionSheetController,
	ModalController
} from 'ionic-angular';

import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup

//Page
import { ModalDetailPage } from '../modal-detail/modal-detail';
import { ModalCreatePage } from '../modal-create/modal-create';

//Services
import { PublicadorService } from '../../providers/publicador/publicador';

@Component( {
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [PublicadorService]
} )
export class HomePage {

	publicadores       = [];
	publicadoresFilter = [];
	searchQuery : string = "";

	constructor(
		public navCtrl: NavController, 
		public alertCtrl: AlertController, 
		public actionSheetCtrl: ActionSheetController,
		public modalCtrl: ModalController,
		public publicadorSvc: PublicadorService
	) {

		this.initializePublicadores();
	}

	initializePublicadores() {

    	this.publicadorSvc.getPublicadores().subscribe( ( items ) => {
			
			this.publicadores = [];

    		items.forEach( ( item ) => {
    			
				this.publicadores.push( item );
    		} ) ;	

    	} );
	}

	addPublicador() {

		let addModal = this.modalCtrl.create( ModalCreatePage );

		addModal.present();
	}

	removePublicador( publicadorId ) {

		this.publicadorSvc.deletePublicador( publicadorId );
	}

	updatePublicador( publicadorData ) {

		let editModal = this.modalCtrl.create( ModalDetailPage, { publicador: publicadorData } );

		editModal.present();
	}

	filterPublicadores( event, publi ) {
		
		let query = event.target.value;

		this.publicadorSvc.getPublicadores().subscribe( ( items ) => {
			
			this.publicadores = [];

    		items.forEach( ( item ) => {
    			
    			if ( item.name.toLowerCase().indexOf( query.toLowerCase() ) > -1 ) {

					this.publicadores.push( item );
				}
				
    		} ) ;	

    	} );
	}
}
