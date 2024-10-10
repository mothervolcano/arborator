import BasePrim from "./basePrim";

import { Id } from "../lsys";

class IdPrim extends BasePrim<number> implements Id {
	protected _type: "Id" = "Id";
	protected value: number;
	public stub: any;
	public places: number[];

	constructor(value: number = 0) {
		super("@");

		this.value = value;

		this.places = [];
	}

	get type() {
		return this._type;
	}

	public cast(val: number) {
		this.value = val;

		return this;
	}

	public recast(str: string) {
		if (!str.includes(this.prefix)) {
			return null;
		}

		const i = str.indexOf(this.prefix);

		this.value = Number.parseInt(str.substring(i + 1));

		return this;
	}

	public process(inputValue: number | string = 1): number {
		const valueIn =
			typeof inputValue === "string"
				? Number.parseInt(inputValue)
				: inputValue;

		this.value += valueIn;

		return this.value;
	}

	public read(str: string) {
		if (str.charAt(0) === this.prefix) {
			return Number.parseInt(str.substring(1));
		} else {
			throw new Error(
				`${str} can't be read by ${this.type} type of Prims`,
			);
		}
	}

	public write() {
		if (this.value) {
			return `${this.prefix}${this.value.toString()}`;
		} else {
			return `${this.prefix}?`;
		}
	}

	public clone(): IdPrim {
		const cloned = new IdPrim(this.value);

		return cloned;
	}
}

export default IdPrim;
