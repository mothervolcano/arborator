import BasePrim from "./basePrim";

import { Glyph, Imperative, PrimType } from "../lsys";

class ImperativePrim extends BasePrim<Glyph> implements Imperative {
	protected _type: "Imperative" = "Imperative";
	protected value: Glyph;
	public stub: any;
	public places: number[];

	// private _value: Glyph | undefined;

	constructor(value: Glyph = { type: "Marker", id: 0, symbol: "?" }) {
		super("!");

		this.value = value;
		this.places = [];
	}

	get type() {
		return this._type;
	}

	public cast(glyph: Glyph) {
		this.value = glyph;

		return this;
	}

	public recast(str: string) {
		if (!str.includes(this.prefix)) {
			return null;
		}

		const i = str.indexOf(this.prefix);

		if (this.value) {
			this.value.symbol = str.substring(i + 1);
		} else {
			this.value = {
				type: "Marker",
				id: 0,
				symbol: str.substring(i + 1),
			};
		}

		return this;
	}

	public process(value: string) {
		this.recast(value);
	}

	public read(str: string) {
		if (this.prefix === str.charAt(0) && this.value) {
			return this.value;
		} else {
			throw new Error(`Imperative has no Glyph set`);
		}
	}

	public write() {
		if (this.value) {
			return `${this.prefix}${this.value.symbol}`;
		} else {
			return `${this.prefix}?`;
		}
	}

	public clone(): ImperativePrim {
		const cloned = new ImperativePrim(this.value);

		return cloned;
	}
}

export default ImperativePrim;
