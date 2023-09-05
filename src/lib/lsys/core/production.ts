import { IProduction, GlyphType, Glyph, Rule, Instruction, Marker, IModel } from '../lsys';


abstract class Production implements IProduction {

	protected _glyph: Glyph;
	protected rule: Glyph[];
	protected _output: string;


	constructor( glyph: Glyph, rule: Glyph[] ) {

		this._glyph = glyph;
		this.rule = rule;

		this._output = this.encode( rule );
	};


	get glyph() {

		return this._glyph;
	}

	get output() {

		return this._output;
	}


	encode( sequence: Array<Glyph> ): string {

		const _str = sequence.map( (g) => {

			return g.symbol;

		}).join('');

		return _str;
	};


	abstract process( params?: Array<number>, context?:any ): void;


	read( params?: string, context?: any ) {

		if ( params && context === 'parameter?' ) {

			if ( params === '(') { return true }
			else { return false }

		} else if ( params ) {

			const _params = params.split(',').map( (p) => Number.parseFloat(p) );

			this.process( _params );
		}
	};


	write( context?: any ): string {

		return this._output;
	};

}

export default Production;


