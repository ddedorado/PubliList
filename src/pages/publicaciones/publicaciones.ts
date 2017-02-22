import { Component } from '@angular/core';
import { 
	NavController, 
	NavParams, 
	AlertController, 
	ActionSheetController 
} from 'ionic-angular';

//Providers
import { PublicacionService } from '../../providers/publicacion/publicacion';
import { PublicadorService } from '../../providers/publicador/publicador';

@Component( {
	selector: 'page-publicaciones',
	templateUrl: 'publicaciones.html',
	providers: [PublicacionService, PublicadorService],
} )
export class PublicacionesPage {

	publicaciones = [];
	publicadores  = [];
	existPublicacionAssociada: boolean = false;

	constructor( 
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public actionSheetCtrl: ActionSheetController,
  		public alertCtrl: AlertController,
  		public publicacionSvc: PublicacionService,
  		public publicadorSvc: PublicadorService 
	) {

		this.publicacionSvc.getPublicaciones().subscribe( ( items ) => {

			this.publicaciones = [];

			items.forEach( ( item ) => {

				this.publicaciones.push( item );
			} );

		} );

		this.publicadorSvc.getPublicadores().subscribe( ( items ) => {	
			
			this.publicadores = items;
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

	//TODO: Optimizar el codigo y comentarlo
	removePublicacion( publicacionId ) {

		this.existPublicacionAssociada = false;

		var publicadoresAssociados = [];

		this.publicadores.forEach( ( item ) => {
			
			let asssociatedPublication = false;
			var indexPublication = 0;

			if ( item.publications != void 0 ) {

				asssociatedPublication= item.publications.some( function( publication, index ) {
					
					indexPublication = index;
					
					return publication.key == publicacionId;

				} );

				if ( asssociatedPublication ) {

					this.existPublicacionAssociada = true;

					item.publications.splice( indexPublication, 1 );
					publicadoresAssociados.push( item );
				} 
			}

		} );

		if ( this.existPublicacionAssociada ) {

			let alert = this.alertCtrl.create( {
				title: "Alerta",
				message: "Esta publicación esta asociada a varios publicadores. ¿Estás seguro de querer borrarla?",
				buttons: [
					{
						text: 'Confirmar',
						handler: ( data => {

							publicadoresAssociados.forEach( ( publicador ) => {

								this.publicadorSvc.editPublicador( publicador );
							} );

							console.log(publicadoresAssociados);

							this.publicacionSvc.deletePublicacion( publicacionId );
						} )
					},
					{
						text: 'Cancelar',
						handler: ( data => {} )
					}
				]
			} );

			alert.present();

		} else {
			
			this.publicacionSvc.deletePublicacion( publicacionId );
		}
	}

	filterPublicaciones( event ) {

		let query = event.target.value;

		if ( query == void 0 ) {

			query = '';
		}

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
