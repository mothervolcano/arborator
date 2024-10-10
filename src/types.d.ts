export interface Param {
  id: string;
  name: string;
  label: string;
  group: number;
  type?: "SLIDER" | "VALUE" | "OPTIONS" | "TEXT" | "CHIPS" | "DROPDOWN" | "SWATCHES" | "SWITCH";
  value?: number | string | number[] | string[] | boolean;
  range?: [number, number];
  step?: number;
  options?: {label: string, value: string}[];
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
