import basePrim from "./basePrim";

import { Prim, PrimType } from "../lsys";


class Parameter extends basePrim {


	private _value: number | undefined;

	constructor( value?: number ) {

		super( 'Parameter', '=' );

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

			throw new Error(`! ${str} can't be read by ${this.type} type of Prims`);
		}
	}

	public write() {

		if ( this._value ) {

			return `${this.prefix}${this._value.toString()}`;

		} else {

			return `${this.prefix}?`;
		}
	}

	public clone(): Parameter {
    	
    	const cloned = new Parameter(this._value);

    	return cloned;
	}
}


export default Parameter;

