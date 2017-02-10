import { Component } from '@angular/core';
import { 
	Platform, 
	NavParams, 
	ViewController
} from 'ionic-angular';

import { PublicadorService } from '../../providers/publicador/publicador';

@Component({
	templateUrl: 'modal-detail.html',
	providers: [PublicadorService]
})
export class ModalDetailPage {
	
	publicador;

	constructor(
		public platform: Platform,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public publicadorSvc: PublicadorService
	) {

		this.publicador = this.navParams.get( 'publicador' );
	}

	closeModal() {

		this.viewCtrl.dismiss();
	}

	savePublicador( publicadorData ) {

		this.publicadorSvc.editPublicador( publicadorData );

		this.closeModal();
	}
}