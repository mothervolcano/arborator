import BasePrim from "./basePrim";

import { Parameter, Prim, PrimType } from "../lsys";


class ParameterPrim extends BasePrim<number> implements Parameter {

	public type: 'Parameter' = 'Parameter';

	private _value;

	constructor( value: number = 0) {

		super( '=' );

		this._value = value;
	}

	set value( val ) {

		this._value = val;
	}

	get value() {

		return this._value;
	}

	public set( val: number ) {

		this._value = val;

		return this;
	}

	public recast( str: string ) {

		this._value = Number.parseInt(str.substring(1));

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

		if ( this._value ) {

			return `${this.prefix}${this._value.toString()}`;

		} else {

			return `${this.prefix}?`;
		}
	}

	public clone(): ParameterPrim {
    	
    	const cloned = new ParameterPrim(this._value);

    	return cloned;
	}
}


export default ParameterPrim;

