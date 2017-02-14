import { Component } from '@angular/core';
import { 
	Platform, 
	NavParams, 
	ViewController
} from 'ionic-angular';

import { PublicadorService } from '../../providers/publicador/publicador';

@Component({
	templateUrl: 'modal-create.html',
	providers: [PublicadorService]
})
export class ModalCreatePage {
	
	publicador = {
		name : "",
		quote: ""
	};

	constructor(
		public platform: Platform,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public publicadorSvc: PublicadorService
	) {}

	closeModal() {

		this.viewCtrl.dismiss();
	}

	addPublicador( publicadorData ) {

		this.publicadorSvc.addPublicador( publicadorData );
		
		this.closeModal();
	}
}