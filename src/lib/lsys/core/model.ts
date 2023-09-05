
import { IModel, Glyph, Rule, IProduction, ICommand, IAlphabet } from '../lsys';

/**
 * @class Model
 * 
 * Abstract class that serves as the base for all L-System model implementations. Implements the IModel interface.
 * 
 * This class serves as the core logic that ties together an alphabet, a set of productions,
 * and commands to generate a sequence and process it.
 * 
 * @property {IAlphabet} _alphabet - An instance of an alphabet class that defines the set of available symbols and their corresponding glyphs.
 * @property {string} _axiom - The axiom or initial string.
 * @property {Map<string, IProduction>} productions - A collection of production rules that each model defines and implements.
 * @property {Map<string, ICommand>} commands - A collection of commands that each model defines and implements.
 * 
 */


abstract class Model implements IModel {


	private _alphabet: IAlphabet;
	private _axiom: string;

	protected productions: Map<string, IProduction>;
	protected commands: Map<string, ICommand>;

	constructor(alphabet: IAlphabet, axiom: string) {

		this._alphabet = alphabet;
		this._axiom = axiom;

		this.productions = new Map();
		this.commands = new Map();

	}

	/**
   * @getter
   * 
   * Returns the alphabet in use by the model.
   * 
   */


	get alphabet() {

		return this._alphabet;
	}

	/**
  * @getter
  * 
  * Returns the axiom or initial string.
  * 
  */

	get axiom() {

		return this._axiom;
	}


	protected addCommand(command: ICommand) {

		if (!this.commands.has(command.symbol)) {

			this.commands.set(command.symbol, command);
		}
	}
	

	public hasCommand(symbol: string) {

		if (this.commands.has(symbol)) {

			return true;

		} else {

			return false;
		}

	}


	public getCommand(symbol: string, context?: any) {

		if (this.commands.has(symbol)) {

			return this.commands.get(symbol)!;
		}
	}


	protected addProduction(production: IProduction) {

		if (production.glyph.type === 'Rule' && !this.productions.has(production.glyph.symbol)) {

			this.productions.set(production.glyph.symbol, production);
		}

	}


	public hasProduction(symbol: string) {

		if (this.productions.has(symbol)) {

			return true;

		} else {
			
			return false;
		}
	}


	public getProduction(symbol: string, context?: any): IProduction | undefined {

		if (this.productions.has(symbol)) {

			return this.productions.get(symbol)!;
		}
	}

	public read( symbol: string ) {

		const glyph = this.alphabet.glyph(symbol);

		if ( glyph.type === 'Rule' && this.hasProduction( symbol ) ) {

			return this.getProduction( symbol )!;

		} else {

			return symbol;
		}
	}

}

export default Model;


