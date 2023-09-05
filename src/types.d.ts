
export interface Param {
			
	id: string;
	name: string;
	value: number;
	range: [number,number];
	step: number;
	label: string;
}

export type ParamSet = Array<Param>;

export interface Model {

	option: string;
	icon: any;
	label: string;
	console: any;
	params: Param[];
	default: boolean;
	checked: boolean;
}
