import BasePrim from "./basePrim";

import { Glyph, Imperative, PrimType } from "../lsys";


class ImperativePrim extends BasePrim<Glyph> implements Imperative {

	public type: 'Imperative' = 'Imperative';

	private _value: Glyph | undefined;

	constructor( value?: Glyph ) {

		super( '!' );

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
				symbol: str.substring(1)
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

	public clone(): ImperativePrim {
    	
    	const cloned = new ImperativePrim(this._value);

    	return cloned;
	}
}


export default ImperativePrim;

