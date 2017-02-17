import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//AngularFirebase2 Module
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class PublicadorService {

	public publicadoresObservable: FirebaseListObservable<any>;

	constructor( http: Http, public af: AngularFire ) {

		this.publicadoresObservable = af.database.list( '/publicadores' );
	}

  	getPublicadores() {

		return this.publicadoresObservable;
	}

	addPublicador( data ) {

		this.publicadoresObservable.push( 
			{
				name: data.name,
				quote: data.quote,
				publications: data.publications
			}
		);
	}

	deletePublicador( id ) {

		this.publicadoresObservable.remove( id );  		
	}

	editPublicador( data ) {
		this.publicadoresObservable.update(
			data.$key, 
			{
	  			name: data.name,
	  			quote: data.quote,
	  			publications: data.publications
			}
		);
	}
}
