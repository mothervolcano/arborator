import { ICommand } from "../lsys";



class Command implements ICommand {

	private _symbol: string;
	private _action: Function;

	constructor( symbol: string, action: Function ) {

		this._symbol = symbol;
		this._action = action;
	};


	get symbol() {

		return this._symbol;
	};


	public run( tool: any, context?: any ) {

		this._action( tool, context || undefined );
	};

};


export default Command;