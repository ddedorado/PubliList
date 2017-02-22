import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


//AngularFirebase2 Module
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class PublicacionService {

	public publicacionesObservable: FirebaseListObservable<any>;

	constructor( http: Http, public af: AngularFire ) {

		this.publicacionesObservable = af.database.list( '/publicaciones' );
	}

  	getPublicaciones() {

		return this.publicacionesObservable;
	}

	addPublicacion( data ) {

		this.publicacionesObservable.push( 
			{
				title: data.title,
				code : data.code
			}
		);
	}
	
	deletePublicacion( id ) {

		this.publicacionesObservable.remove( id );  		
	}
}