import { IProduction, GlyphType, Glyph, Rule, Instruction, Marker, IModel } from '../lsys';


abstract class Production implements IProduction {

	protected _glyph: Glyph;
	protected dialect: Glyph[]; 
	protected _rule: Glyph[];
	protected _sequence: Glyph[];
	protected _output: string;


	constructor( glyph: Glyph, dialect?: Glyph[] ) {

		this._glyph = glyph;
		this.dialect = dialect || [];
		this._sequence = [];

		this._rule = dialect ? [] : [ glyph ];
		this._output = dialect ? '' : this.encode( [ glyph ] );

		return this;
	};


	get rule() {

		return this._rule;
	}

	get glyph() {

		return this._glyph;
	}

	get output() {

		return this._output;
	}


	decode( str: string ): Glyph[] {

		const sequence = str.split('').map( (char) => { 

			const glyph = this.dialect.find( (g) => g.symbol === char );

			if ( glyph ) {

				return glyph

			} else {

				throw new Error(`${char} it's not part of this production dialect`);
			}
		});

		return sequence;
	};


	encode( sequence: Array<Glyph> ): string {

		const series = sequence.map( (g) => {

			if ( g.type==='Rule' && g.params?.length ) {

				const paramSeries = g.params.map( (p) => {

					return p.write();

				});

				return `${g.symbol}(${paramSeries.join(',')})`;

			} else {
				
				return g.symbol;
			}	

		}).join('');

		// console.log(`ENCODED ${this._glyph.symbol} with: ${_str}`);

		return series;
	};

	abstract compose( str: string ): void;
	abstract process( params?: string, context?:any ): void;


	read( params?: string, context?: any ) {

		if ( params && context === 'parameter?' ) {

			if ( params === '(') { return true }
			else { return false }

		} else {

			this.process( params );
		}
		
	};


	write( context?: any ): string {

		// console.log(`WRITING ${this._glyph.symbol} with: ${this._output}`);

		return this._output;
	};

}

export default Production;


