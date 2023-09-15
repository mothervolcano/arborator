import { IProduction, Glyph, MetaGlyph, Rule, Prim, Imperative, Parameter, ISprite } from '../lsys';
import ImperativePrim from '../prims/imperativePrim';
import ParameterPrim from '../prims/parameterPrim';


abstract class Production implements IProduction {

	protected static primExchangeQueue: Map<Prim, Glyph[]> = new Map();
	
	private _head: Rule;
	private _rule: Glyph[];
	private _output: string;

	protected dialect: Glyph[]; 
	protected directory: Map<number, MetaGlyph>;
	protected sequence: MetaGlyph[];
	protected sprites: Array<ISprite> = [];
	protected prims: Map<Prim, any> = new Map();

	
	constructor(glyph: Rule, dialect?: Glyph[]) {

		this._head = glyph;
		
		this.dialect = dialect || [];
		this.directory = new Map();

		this._rule = dialect ? [] : [glyph];
		this.sequence = dialect ? [] : [ { glyph: glyph, id: 1, data: {} }  ]
		this._output = dialect ? '' : this.encodeSequence([glyph]);

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


	protected cast(sequence: Array<Glyph>) {


		sequence.forEach((glyph, i) => {

			this._rule[i] = glyph;
			const dirIndex = i+1; // the directory index starts at 1 to help not confuse with the sequence array.
			this.directory.set( dirIndex, { glyph: glyph, id: dirIndex, data: {} } ); 
			this.sequence.push( this.directory.get( dirIndex )! );

		});

		// this._rule = sequence.map((glyph, i) => {

		// 	if ( glyph.type==='Rule' ) {

		// 		return glyph;

		// 	} else {

		// 		return { ...glyph };
		// 	}

		// });
	};

	public plant(): void {

		console.log('')
		console.log(`,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,`)
		console.log(`ON THE WAITING LIST FOR PRIMS:`)

		console.log(`!!!!!! ${this.head.symbol}  -->  ${Production.primExchangeQueue.size}`)


		let log = 'GUESTS: ';

		for ( const guest of Production.primExchangeQueue ) {

			if ( guest[1].includes(this.head) ) {

				console.log(`${guest[0].prefix} --> this one is for me ( ${this.head.symbol} )`)

				this.addPrim( guest[0] );

				if ( guest[1].length <= 1 ) {

					Production.primExchangeQueue.delete(guest[0]);

				} else {

					Production.primExchangeQueue.set(guest[0], guest[1].filter( (glyph) => glyph.symbol!==this.head.symbol ) );
				}

			}

			// guest[1] = updatedGuests;


			log += `${guest[1].map((g)=>g.symbol)}( ${guest[0].prefix} ), `
		}

		console.log(log);
	}


	protected decode(str: string): Glyph[] {

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


	protected encodeGlyph( glyph: Glyph ): string {

		if ( glyph.type === 'Rule' && glyph.prims.length ) {

			const paramSeries = glyph.prims.map((p) => {

				return p.write();
			});

			return `${glyph.symbol}(${paramSeries.join(',')})`;

		} else {

			return glyph.symbol;
		}
	};


	protected encodeSequence(sequence: Array<Glyph>): string {

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

	
	protected printSequence( sequence: string[] ) {

		this._output = sequence.join('');
	};


	abstract compose(...str: string[]): void;
	abstract process(params?: string, context?: any): void;


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

				this.prims.set(prim, prim.prefix);

				this.head.prims.push(prim); 

			} else {

				throw new Error(`ERROR: Trying to re-add ${prim.type} Prim to ${this.head.symbol}`);
			}
		}

		return prim;	
	};


	public addSprite( sprite: ISprite ) {

		
		//-------------------------------------------------
		// STEP 1

		const prims = sprite.implant( this.directory, this.head );

		if ( prims ) {

			for ( const prim of prims ) {

				this.addPrim( prim );
			}
		};
		
		this.sprites.push( sprite );


		//-------------------------------------------------
		// STEP 2
		

		const primSeeds = sprite.sow();	

		if ( primSeeds ) {

			for ( const seed of primSeeds ) {
		
				// for ( const glyph of seed.targets ) {

				// 	if ( glyph.type==='Rule') { glyph.prims.push(seed.prim) } 
				// }
				
				Production.primExchangeQueue.set( seed.prim, seed.targets );
			}
		}
		

	};


	protected processPrims( stream: Glyph[], params?: string ): Glyph[] {

		console.log('')
		console.log(`,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,`)
		console.log(`ON THE WAITING LIST FOR PRIMS:`)

		console.log(`!!!!!! ${this.head.symbol}  -->  ${Production.primExchangeQueue.size}`)


		let log = 'GUESTS: ';

		for ( const guest of Production.primExchangeQueue ) {

			if ( guest[1].includes(this.head) ) {

				console.log(`${guest[0].prefix} --> this one is for me ( ${this.head.symbol} )`)

				this.addPrim( guest[0] );

				if ( guest[1].length <= 1 ) {

					Production.primExchangeQueue.delete(guest[0]);

				} else {

					Production.primExchangeQueue.set(guest[0], guest[1].filter( (glyph) => glyph.symbol!==this.head.symbol ) );
				}

			}

			// guest[1] = updatedGuests;


			log += `${guest[1].map((g)=>g.symbol)}( ${guest[0].prefix} ), `
		}

		console.log(log);

		// ----------------------------------------------------------------

		const workingSequence: Glyph[] = stream.map((glyph) => {


			

			return glyph;

		});

		// -----------------------------------------------------------------

		console.log('')

		if ( params ) {

			const parsedParams = params.split(',').map((s, i) => { 

				return s.charAt(0);
			});


			console.log('')
			console.log(`....................................`)
			console.log(`${this.head.symbol} PRIM SIGNATURE:`)

			let log: string = '';

			for ( const prim of this.prims ) {

				log += `${prim[1]} / `
			}

			console.log(`___ADDED:  ${log}`);
			console.log(`RECEIVED:  ${parsedParams.join(' / ')} /`)

		} else {

		}


		if ( workingSequence ) {

			return workingSequence;

		} else {

			return stream;
		} 

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


