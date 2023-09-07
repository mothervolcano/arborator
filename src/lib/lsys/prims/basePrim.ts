import { Glyph, IPrim, Prim, PrimType } from "../lsys";



abstract class BasePrim<T> implements IPrim<T> {

	private _prefix: string;
	// abstract type: PrimType;
	abstract value: T;

	constructor ( prefix: string ) {

		this._prefix = prefix;

		return this;
	}

	get prefix() {

		return this._prefix;
	}

	abstract set(val: T ): this;
	abstract recast(str: string): this;
	abstract read( str: string ): T;
	abstract write(): string;
	
	// Generic clone method. The actual return type will be hardcoded in each subclass.
  	public abstract clone(): any;

}

export default BasePrim;