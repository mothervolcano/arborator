import basePrim from "./basePrim";

import { Glyph, PrimType } from "../lsys";


class Imperative extends basePrim {


	private _value: Glyph | undefined;

	constructor( value?: Glyph ) {

		super( 'Imperative', '!' );

		this._value = value;
	}

	set value( glyph ) {

		this._value = glyph;
	}

	get value() {

		if ( this._value ) {

			return this._value;

		} else {

			throw new Error(`Imperative has no glyph`)
		}
	}


	public set( glyph: Glyph ) {

		this._value = glyph;

		return this;
	}


	public recast( str: string ) {

		if ( this._value ) {

			this._value.symbol = str.substring(1);

		} else {

			this._value = {

				type: 'Marker',
				symbol: str
			}
		}

		return this;
	};


	public read( str: string ) {

		if ( this.prefix === str.charAt(0) ) {

			return this.value;

		} else {

			throw new Error(`Imperative has no Glyph set`);
		}
	}

	public write() {

		if ( this._value ) {

			return `${this.prefix}${this._value.symbol}`;

		} else {

			return `${this.prefix}?`;
		}

	}

	public clone(): Imperative {
    	
    	const cloned = new Imperative(this._value);

    	return cloned;
	}
}


export default Imperative;

