import BasePrim from "./basePrim";

import { Accumulator } from "../lsys";


class AccumulatorPrim extends BasePrim<number> implements Accumulator {

	private accValue: number = 0;
 
	protected _type: 'Accumulator' = 'Accumulator';
	protected value: number;
	public stub: any;
	public places: number[];

	constructor( value: number = 0) {

		super( '+' );

		this.value = value;

		this.places = [];
	}


	get type() {

		return this._type;
	}


	public cast( val: number ) {

		this.value = val;
		this.accValue = val;

		return this;
	}

	public recast( str: string ) {

		this.value = Number.parseInt(str.substring(1));
		this.accValue = this.value;

		return this;
	}

	public process( value: string = '1' ): number {

		this.accValue += Number.parseInt(value);
		this.value = this.accValue;

		return this.value;
	}

	public read( str: string ) {

		if ( str.charAt(0) === this.prefix ) {

			return Number.parseInt(str.substring(1));

		} else {

			throw new Error(`${str} can't be read by ${this.type} type of Prims`);
		}
	}

	public write() {

		if ( this.value !== undefined && this.value !== null ) {

			return `${this.prefix}${this.value.toString()}`;

		} else {

			return `${this.prefix}?`;
		}
	}

	public clone(): AccumulatorPrim {
    	
    	const cloned = new AccumulatorPrim(this.value);

    	return cloned;
	}
}


export default AccumulatorPrim;

