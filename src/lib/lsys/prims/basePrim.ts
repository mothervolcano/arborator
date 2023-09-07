import { Glyph, Prim, PrimType } from "../lsys";



abstract class basePrim implements Prim {

	private _type: PrimType;
	private _prefix: string;
	abstract value: number | string | Glyph | undefined;

	constructor ( type: PrimType, prefix: string ) {

		this._type = type;
		this._prefix = prefix;

		return this;
	}

	get type() {

		return this._type;
	}

	get prefix() {

		return this._prefix;
	}

	abstract set(val: number | string | Glyph | undefined ): this;
	abstract recast(str: string): this;
	abstract read( str: string ): number | string | Glyph;
	abstract write(): string;
	abstract clone(): any;

}

export default basePrim;