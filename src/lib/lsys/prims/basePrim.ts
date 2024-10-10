import { Glyph, IPrim, Prim, PrimType } from "../lsys";

abstract class BasePrim<T> implements IPrim<T> {
	private _prefix: string;
	protected abstract value: T;
	abstract stub: any;
	abstract places: number[];

	constructor(prefix: string) {
		this._prefix = prefix;

		return this;
	}

	abstract get type(): PrimType;

	get prefix() {
		return this._prefix;
	}

	public hasValue(): boolean {
		return this.value !== undefined && this.value !== null;
	}

	public setValue(value: T): T {
		this.value = value;

		return this.value;
	}

	public getValue() {
		if (this.value !== undefined && this.value !== null) {
			return this.value;
		} else {
			throw new Error(`This Prim has no value for ${this._prefix}`);
		}
	}

	abstract cast(val: T): this;
	abstract recast(str: string): this | null;
	abstract process(value: string): void;
	abstract read(str: string): T;
	abstract write(): string;

	// experimental

	// Generic clone method. The actual return type will be hardcoded in each subclass.
	public abstract clone(): any;
}

export default BasePrim;
