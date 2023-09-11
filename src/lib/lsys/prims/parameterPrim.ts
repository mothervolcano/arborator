import BasePrim from "./basePrim";

import { Parameter, Prim, PrimType } from "../lsys";


class ParameterPrim extends BasePrim<number> implements Parameter {

	protected _type: 'Parameter' = 'Parameter';
	protected value: number;
	public stub: any;
	public places: number[];

	constructor( value: number = 0) {

		super( '=' );

		this.value = value;

		this.places = [];
	}


	get type() {

		return this._type;
	}


	public set( val: number ) {

		this.value = val;

		return this;
	}

	public recast( str: string ) {

		this.value = Number.parseInt(str.substring(1));

		return this;
	}

	public read( str: string ) {

		if ( str.charAt(0) === this.prefix ) {

			return Number.parseInt(str.substring(1));

		} else {

			throw new Error(`${str} can't be read by ${this.type} type of Prims`);
		}
	}

	public write() {

		if ( this.value ) {

			return `${this.prefix}${this.value.toString()}`;

		} else {

			return `${this.prefix}?`;
		}
	}

	public clone(): ParameterPrim {
    	
    	const cloned = new ParameterPrim(this.value);

    	return cloned;
	}
}


export default ParameterPrim;

