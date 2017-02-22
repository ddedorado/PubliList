import { Component } from '@angular/core';
import { 
	NavController, 
	ActionSheetController,
	ModalController
} from 'ionic-angular';

//Page
import { ModalDetailPage } from '../modal-detail/modal-detail';
import { ModalCreatePage } from '../modal-create/modal-create';

//Services
import { PublicadorService } from '../../providers/publicador/publicador';
import { PublicacionService } from '../../providers/publicacion/publicacion';

@Component( {
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [PublicadorService, PublicacionService]
} )
export class HomePage {

	publicadores = [];

	constructor(
		public navCtrl: NavController,  
		public actionSheetCtrl: ActionSheetController,
		public modalCtrl: ModalController,
		public publicadorSvc: PublicadorService, 
		public publicacionSvc: PublicacionService, 
	) {

		this.initializePublicadores();
	}

	initializePublicadores() {

    	this.publicadorSvc.getPublicadores().subscribe( ( items ) => {
			
			this.publicadores = [];

			//ARRAY DE OBJECTS TIPO PUBLICADOR
    		items.forEach( ( item ) => {

    			if (item.publications != void 0) {

    				//Array de publicaciones para un publicador
					item.publications.forEach( ( publication ) => {
						
						//Get de todas las publicaciones
						this.publicacionSvc.getPublicaciones().subscribe( ( publicaciones ) => {

							let publi;

							//Get de la sigla de la publicacion por la key de cada publicacion que tiene el publicador
							publi = publicaciones.filter( function( _publicacion ) {
								
								if ( publication.key == _publicacion.$key ) {

									publication.code = _publicacion.code;
								}

							} );
						} ) ;
					} );
    			}

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

	filterPublicadores( event ) {
		
		let query = event.target.value;

		if ( query == void 0 ) {

			query = '';
		}

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
