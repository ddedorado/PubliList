import { Component } from '@angular/core';
import { 
	NavController, 
	NavParams, 
	AlertController, 
	ActionSheetController 
} from 'ionic-angular';

//Providers
import { PublicacionService } from '../../providers/publicacion/publicacion';

@Component( {
	selector: 'page-publicaciones',
	templateUrl: 'publicaciones.html',
	providers: [PublicacionService],
} )
export class PublicacionesPage {

	publicaciones = [];

	constructor( 
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public actionSheetCtrl: ActionSheetController,
  		public alertCtrl: AlertController,
  		public publicacionSvc: PublicacionService
	) {

		this.publicacionSvc.getPublicaciones().subscribe( ( items ) => {

			this.publicaciones = [];

			items.forEach( ( item ) => {

				this.publicaciones.push( item );
			} );

		} );
	}

	addPublicacion() {
		let alert = this.alertCtrl.create( {
			title   : "Publicación",
			message : "Introduce la información para crear una nueva publicación.",
			inputs  : [
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
					handler: ( data=> {
						console.log("Cierro modal");
					} )
				},
				{
					text: 'Crear',
					handler: ( data => {
						this.publicacionSvc.addPublicacion( 
							{ 
								title : data.title,
								code  : data.code
							} 
						);
					} )
				}
			]
		} );

		alert.present();
	}

	removePublicacion( publicacionId ) {

		this.publicacionSvc.deletePublicacion( publicacionId );
	}

	filterPublicaciones( event ) {

		let query = event.target.value;

		this.publicacionSvc.getPublicaciones().subscribe( ( items ) => {

			this.publicaciones = [];

			items.forEach( ( item ) => {

				if ( item.title.toLowerCase().indexOf( query.toLowerCase() ) > -1 ) {

					this.publicaciones.push( item );
				}

			} );
		} );
	}
}
