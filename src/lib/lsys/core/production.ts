import { IProduction, GlyphType, Glyph, Rule, Instruction, Marker, IModel, Prim, Imperative, Parameter, ISprite } from '../lsys';
import ImperativePrim from '../prims/imperativePrim';
import ParameterPrim from '../prims/parameterPrim';


abstract class Production implements IProduction {

	protected _head: Rule;
	protected dialect: Glyph[]; 
	protected _rule: Glyph[];
	protected _sequence: Map<Glyph, number>;
	protected _output: string;
	protected prims: Map<Prim, any> = new Map();
	protected sprites: Array<ISprite> = [];


	constructor(glyph: Rule, dialect?: Glyph[]) {

		this._head = glyph;
		this.dialect = dialect || [];
		this._sequence = new Map();

		this._rule = dialect ? [] : [glyph];
		this._output = dialect ? '' : this.encode([glyph]);

		return this;
	};


	get rule() {

		return this._rule;
	}

	get head() {

		return this._head;
	}

	get output() {

		return this._output;
	}


	decode(str: string): Glyph[] {

		const sequence = str.split('').map((char) => { 

			const glyph = this.dialect.find((g) => g.symbol === char);

			if (glyph) {

				return glyph

			} else {

				throw new Error(`${char} it's not part of this ${this._head.symbol} production dialect`);
			}
		});

		return sequence;
	};


	encode(sequence: Array<Glyph>): string {

		const series = sequence.map((g) => {

			if (g.type === 'Rule' && g.prims?.length) {

				const paramSeries = g.prims.map((p) => {

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

	abstract compose(...str: string[]): void;
	abstract process(params?: string, context?: any): void;

	
	protected cast(sequence: Array<Glyph>) {

		this._rule = sequence.map((glyph, i) => {

			return { ...glyph, id: i };
		});

	};


	public addPrim(input: Prim | string, symbols?: string | string[], save: boolean = true): Prim {

		let prim: Prim;

		// TODO: we could have a Sprite for this

		if (typeof input === 'string') {

			switch (input) {

				case '!': 
					prim = new ImperativePrim() as Imperative;
					break;

				case '=':
					prim = new ParameterPrim() as Parameter;
					break;
				// case '+':
				// 	// do nothing. We need to forego this logic here.
				// 	break

				default: throw new Error(`Failed to add Prim to Production. ${input} doesn't match the prefix of any valid Prim`);
			}

		} else {

			prim = input;

		}

		if (symbols) {

			prim.places = this._rule.map((g, i) => {

				if (Array.isArray(symbols)) {

					for (const s of symbols) {

						if (g.symbol === s) {

							return i;
						}
					}

				} else {

					if (g.symbol === symbols) {

						return i;
					}
				}

			}).filter(n => n !== undefined) as number[];
		}


		if (save) { 

			if ( !this.prims.has(prim) ) {

				this.head.prims.push(prim); 

			} else {

				throw new Error(`ERROR: Trying to re-add ${prim.type} Prim to ${this.head.symbol}`);
			}
		}

		return prim;	
	};


	public addSprite( sprite: ISprite ) {

		const prims = sprite.implant( this._rule, this.head );

		if ( prims ) {

			for ( const prim of prims ) {

				this.addPrim( prim );
			}
		};
		
		this.sprites.push( sprite );

	};


	// TODO remove this methods. The Sprites took over!

	protected processPrims(sequence: Array<Glyph>) {

		// if (sequence.length && this.prims.length) {

		// 	const updatedPrims = this.prims.map((prim) => {

		// 		let updatedPrim = prim;

		// 		// ------------------------------------------------------------

		// 		// try to see if at least there's some data to complete the configuration of the prim.
		// 		// the data it needs can be extracted from a Glyph and it's very likely that the right Glyph
		// 		// is part of the sequence array

		// 		if (updatedPrim.type === 'Imperative' && updatedPrim.getValue().symbol === '?') {

		// 			for (let i = 0; i < sequence.length; i++) {

		// 				if (updatedPrim.places.includes(i)) {

		// 					updatedPrim.set(sequence[i]);
		// 				}
		// 			}
		// 		} 
		

		// 		// -----------------------------------------------------------------

		// 		sequence.forEach((glyph, i) => {

		// 			// THERE MIGHT NOT BE NECESSARY TO DO ANTHING HERE. Mark for deletion;
		// 		});

		// 		return updatedPrim;
		// 	})

		// 	this.prims = updatedPrims;
		// }
	};


	public read(params?: string, context?: any) {

		if (params && context === 'parameter?') {

			if (params === '(') { return true }
			else { return false }

		} else {

			this.process(params);
		}
		
	};


	public write(context?: any): string {

		// console.log(`WRITING ${this._glyph.symbol} with: ${this._output}`);

		return this._output;
	};

}

export default Production;


