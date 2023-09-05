
import { IAlphabet, GlyphType, Glyph, Rule, Instruction, Marker } from '../lsys';


/**
 * The Alphabet class manages all the symbols used in the L-system.
 * It ensures that the symbols are uniquely registered and validates them upon retrieval.
 */

class Alphabet implements IAlphabet {

		
	// Holds the mapping of symbols to their respective Glyph objects.
	private dictionary: Map<string, Glyph>;

	
	/**
	 * Initializes an empty dictionary for Glyph storage.
	 */

	constructor() {

		this.dictionary = new Map();
	}

	/**
	 * Validates if a symbol can be safely retrieved from the dictionary.
	 */

	private validateRetrieval( symbol: string ): string {

		if ( !this.dictionary.has(symbol) ) {

			throw new Error(`${symbol} not found in alphabet`);

		} else {

			return symbol;
		}
	};

	/**
	 * Validates if a symbol can be safely added to the dictionary.
	 */

	private validateEntry( symbol: string ): string {

		if ( this.dictionary.has(symbol) ) {

			throw new Error(`${symbol} already registered in alphabet`);

		} else {

			return symbol;
		}
	};


	/**
	 * Registers a new Glyph in the dictionary.
	 * The 'entry' argument can either be a single symbol or a string of symbols.
	 */

	public registerGlyph( type: GlyphType, entry: string ) { // entry can be a single character eg. 'A' or a series of characters to be split into separate entries 'A+FB'

		
		let glyph: Glyph;

		for ( const char of entry ) {

			const symbol: string = char;

			switch( type ) {

				case 'Rule' :

					glyph = { type: type, symbol: symbol, params: [] };

					break;

				case 'Instruction':

					glyph = { type: type, symbol: symbol };

					break;

				case 'Marker':

					glyph = { type: type, symbol: symbol };

					break;

				default : throw new Error(`${type} is an invalide Glyph Type`);

			}

			this.dictionary.set( symbol, glyph );

		}
	};

	/**
	 * Retrieves a single Glyph object associated with the provided symbol.
	 */

	public glyph( symbol: string ): Glyph {

		if ( symbol.length === 1 ) {

			const _glyph = this.dictionary.get( this.validateRetrieval(symbol.charAt(0)) )!;

			return _glyph;

		} else if ( symbol.length > 1) {

			throw new Error(`Invalid input ${symbol}. If you meant to retrieve a series of Glyphs use composePhrase instead`);

		} else {

			throw new Error(`Invalid input ${symbol}`);
		}
	};

	/**
	 * Retrieves a single Rule object associated with the provided symbol.
	 * Throws an error if the symbol does not represent a Rule.
	 */

	public rule( symbol: string ): Rule {

		if ( symbol.length === 1 ) {

			const _glyph = this.dictionary.get( this.validateRetrieval(symbol.charAt(0)) )!;

			if ( _glyph.type === 'Rule' ) {

				return _glyph;

			} else {

				throw new Error(`Requested symbol ${symbol} is not a Glyph Rule`);
			}

		} else if ( symbol.length > 1) {

			throw new Error(`Invalid input ${symbol}. If you meant to retrieve a series of Glyphs use composePhrase instead`);

		} else {

			throw new Error(`Invalid input ${symbol}`);
		}
	};


	/**
	 * Retrieves a sequence of Glyph objects associated with the provided string of symbols.
	 */

	public collect( symbols: string ): Glyph[] {

		if ( symbols.length > 1 ) {

			const sequence: Glyph[] = [];

			for ( const char of symbols ) {

				const _glyph = this.dictionary.get( this.validateRetrieval(char) )!;

				sequence.push( _glyph );
			}

			if ( sequence.length > 0 ) { return sequence }
			else { throw new Error(`Failed to retrieve entry(ies) for ${symbols}`) };

		} else if ( symbols.length === 1 ) {

			throw new Error(`Invalid input ${symbols}. If you mean to retrieve a single Glyph use retrieveGlyph instead`);

		} else {

			throw new Error(`Invalid input ${symbols}`);
		}
	}

}


export default Alphabet;


