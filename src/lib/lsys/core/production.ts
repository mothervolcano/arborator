import { IProduction, GlyphType, Glyph, Rule, Instruction, Marker, IModel, Prim, Imperative } from '../lsys';
import ImperativePrim from '../prims/imperativePrim';
import ParameterPrim from '../prims/parameterPrim';


abstract class Production implements IProduction {

	protected _glyph: Glyph;
	protected dialect: Glyph[]; 
	protected _rule: Glyph[];
	protected _sequence: Glyph[];
	protected _output: string;
	protected prims: Array<Prim> = [];


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

				throw new Error(`${char} it's not part of this ${this._glyph.symbol} production dialect`);
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

	abstract compose( ...str: string[] ): void;
	abstract process( params?: string, context?:any ): void;


	addPrim( input: Prim | string, save: boolean = true ): Prim {

		let prim: Prim;

		if ( typeof input === 'string' ) {

			switch(input) {

			case '!': 
				prim = new ImperativePrim();
				break;

			case '=':
				prim = new ParameterPrim();
				break;

				default: throw new Error(`Failed to add Prim to Production. ${input} doesn't match the prefix of any valid Prim`);
			}

		} else {

			prim = input;

		}

		if ( save ) { this.prims.push(prim); }

		return prim;	
	}


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


