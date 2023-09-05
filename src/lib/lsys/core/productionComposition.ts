
import Production from './production'

import { ProductionType, RuleSetType } from '../types'


class ProductionComposition extends Production {

	private productions: Map<string, any>
	private _preSequence: string
	private _postSequence: string
	

	constructor( LABEL: string, defaultValue: number, iterations: number ) {

    	super( LABEL, iterations );

    	this.productions = new Map();
    	this._preSequence = ''
    	this._postSequence = ''

	}

	public addSequence( ...args: any[] ) {

		const arrayArgIndex = args.findIndex( (arg: any) => Array.isArray(arg) );

    const productions: Array<ProductionType> = arrayArgIndex !== -1 ? args[arrayArgIndex] : [];

    this._preSequence = arrayArgIndex > 0 ? args.slice(0, arrayArgIndex).join('') : '';
    this._postSequence = args.slice(arrayArgIndex + 1).join('');

    for ( const p of productions ) {

      this.productions.set( p.label, { production: p, sequence: '' } );
    }

    return this;
	}

	protected getProduction( LABEL: string ): any {

		return this.productions.get(LABEL);
	}


	protected sequence(): string {

		// let _sequence: string = this._preSequence;

		let _sequence = '';

	  this.productions.forEach( ( production, label ) => {
	   
	    _sequence += production.sequence;
	    production.sequence = '';

	  });

	  // _sequence += this._postSequence;

	  // this._sequence = _sequence;

	  return _sequence;

	}

}


export default ProductionComposition