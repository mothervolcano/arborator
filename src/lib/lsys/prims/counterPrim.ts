import BasePrim from "./basePrim";

import { Counter } from "../lsys";


class CounterPrim extends BasePrim<number> implements Counter {

	private step: number;
 
	protected _type: 'Counter' = 'Counter';
	protected value: number;
	public stub: any;
	public places: number[];

	constructor( start: number = 0, step: number = 1 ) {

		super( '+' );

		this.value = start;
		this.step = step;

		this.places = [];
	}


	get type() {

		return this._type;
	}


	public cast( val: number ) {

		this.value = val;

		return this;
	}

	public recast( str: string ) {

		if ( !str.includes(this.prefix ) ) {

			return null;
		}

		const i = str.indexOf(this.prefix);


		this.value = Number.parseInt(str.substring(i+1));

		return this;
	}

	public process( inputValue?: number | string ): number {

		if ( inputValue !== undefined ) {

			const valueIn = typeof inputValue === 'string' ? Number.parseInt(inputValue) : inputValue;

			this.value += valueIn;

		} else {

			this.value += this.step;
		}


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

	public clone(): CounterPrim {
    	
    	const cloned = new CounterPrim(this.value);

    	return cloned;
	}
}


export default CounterPrim;

