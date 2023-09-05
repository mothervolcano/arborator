import { ProductionType, RuleSetType } from '../types'
import Production from './production'
import RuleSet from './ruleSet'

import { genRandomDec } from '../tools/randomGenerators'

const S = require('string')

class Sequencer {

	// private pen: any
	// private alphabet: string
	protected axiom: string
	protected sequence: string
	private rules: Map<any, any>
	private actions: Map<any, any>
	// private states: Array<any>

	// protected distance: number
	// protected angle: number
	// private scale: number
	// private scaleReduction: number
	// private angleCtrl: number


	private static genRandomDec( min: number, max: number ) 
	{
	    return min + ( max - min ) * Math.random();
	}


	constructor( rules: Map<any, any>, actions: Map<any, any>, axiom: string ) {

		this.axiom = axiom || ''
		this.sequence = this.axiom

		this.rules = rules
		this.actions = actions

	}

	public setAxiom( SEQUENCE: string ) {

		this.axiom = this.sequence = SEQUENCE
	}


	private drawRuleFromSet( ruleSet: RuleSetType ): ProductionType {

		const n: number = genRandomDec(0,1)
        let t: number = 0

        for ( let i=0; i<ruleSet.collection.length; i++ ) {

            t += ruleSet.collection[i].probability

            if (t>n) {

                return ruleSet.collection[i]
            }
        }

        throw new Error('No matching rule found.');
	}


	private extractProduction( char: string ): ProductionType | RuleSetType | string {

		if ( this.rules.has( char ) ) {

			const _rule = this.rules.get( char )

			if ( _rule instanceof RuleSet ) {

				// return //this.drawRuleFromSet( _rule )

			} else if ( _rule instanceof Production ) {

				return _rule
			}

			throw new Error(`No matching rule found for ${char}`);

		} else {

			return char
		}
	}


	private retrieveParameters( i: number ): Array<any> {

    	let params: Array<string> = []

    	const productionLabel = this.extractProductionLabel(i);
  		const endIndex = this.sequence.indexOf(')', i);

  		// Check if the production label is followed by an opening parenthesis
  		if (this.sequence.charAt(i + productionLabel.length) === '(' && endIndex !== -1) {

    		const paramsString = this.sequence.substring(i + productionLabel.length + 1, endIndex);
    		params = paramsString.split(',');
  		}

  		return params;
	}


	private retrievePredecessor(i: number): string {
  			
  		const alphabeticRegex = /[A-Z]/; // Regular expression to match alphabetic characters

		// Iterate from the current index (i) towards the beginning of the string
  		for (let j = i - 1; j >= 0; j--) {
    		const char = this.sequence[j];

    		if (alphabeticRegex.test(char)) {
    			
      			// Check if the previous character is a digit (part of a combined letter and number production)
      			if ( /\d/.test(this.sequence.charAt(j + 1))) {

        			return char + this.sequence.charAt(j + 1);

      			} else {

        			return char;
      			}
    		}
  		}

  		return ''; // Return an empty string if no previous alphabetic character is found
	};


	private retrievePredecessors(i: number): string {
	  
	  // const alphabeticRegex = /[A-Za-z]/; // Regular expression to match alphabetic characters
	  const alphabeticRegex = /[A-Z]/; // Regular expression to match alphabetic characters
	  
	  let count = 0; // Counter to keep track of the number of previous alphabetic characters found
	  let previousChars = ''; // Variable to store the previous alphabetic characters

	  // Iterate from the current index (i) towards the beginning of the string
	  for (let j = i - 1; j >= 0; j--) {
	    
	    const char = this.sequence[j];
	    
	    if ( alphabeticRegex.test(char) ) {
	      
	      previousChars = char + previousChars; // Append the previous alphabetic character
	      count++;
	      
	      if (count === 2) {

	        return previousChars; // Return the two previous alphabetic characters
	      }
	    }
	  }

	  return previousChars; // Return the first previous alphabetic character (even if there's only one)
	};


	private retrieveSucessor( i: number ): string {

		const alphabeticRegex = /[A-Z]/; // Regular expression to match alphabetic characters

	  	// Iterate from the current index (i) towards the end of the string
  		for (let j = i + 1; j < this.sequence.length; j++) {
    		const char = this.sequence[j];

    		if (alphabeticRegex.test(char)) {
      			// Check if the next character is a digit (part of a combined letter and number production)
     			if (j + 1 < this.sequence.length && /\d/.test(this.sequence.charAt(j + 1))) {

        			return char + this.sequence.charAt(j + 1);

      			} else {

        			return char;
      			}
    		}
  		}

  		return '';
	};

	private extractProductionLabel(i: number): string {
  		
  		const symbol = this.sequence.charAt(i);

		// Check if the first character is an uppercase alphabetic character
		if (/^[A-Z]/.test(symbol)) {

		    // Check if the next character is a digit (part of a combined letter and number production)
		    if (i + 1 < this.sequence.length && /\d/.test(this.sequence.charAt(i + 1))) {

		      // Extract the combined production (e.g., B3, K1, etc.)
		      return symbol + this.sequence.charAt(i + 1);

		    } else {
		    	
		      // Single letter production
		      return symbol;
		    }
		}

		return symbol;
	}
		 

	private rewriteSequence( iteration: number ): string {

		let _sequence: string = ''

		for ( let i=0; i<this.sequence.length; i++ ) {

			const productionLabel = this.extractProductionLabel( i );
			const extractedProduction = this.extractProduction( productionLabel )

			// Update i based on the length of the production label
    		i += productionLabel.length - 1;
	
			// It's a PRODUCTION? 

			if ( extractedProduction instanceof Production ) {
				
				// production.count()

				extractedProduction.predecessor =  this.extractProduction( this.retrievePredecessor(i) );
				extractedProduction.sucessor = this.extractProduction( this.retrieveSucessor(i) );
				
				extractedProduction.process( this.retrieveParameters(i), iteration );

				_sequence += extractedProduction.output();

				// console.log(`!!!! ${extractedProduction.output()}`)


			// Or an ACTION?

			} else if ( !S('().,0123456789').contains( extractedProduction ) ) {

				let params: string = ''
				const _params = this.retrieveParameters( i );


				if ( _params.length > 0 ) {

					params = '(' + _params.join(',') + ')';

				} else {

					params = '';
				}

				_sequence += extractedProduction + params;
			}
		}

		return _sequence
	};


	protected runAction( LABEL: string, params: Array<string> ) {
	  
	  if ( this.actions.has(LABEL) ) {
	    
	    if ( params.length === 1 ) {

	      this.actions.get( LABEL)(params[0] );

	    } else {
	    	
	      this.actions.get(LABEL)(params);
	    }
	  }
	};



	private readSequence( iterations: number ): void {
	  
	  let i = 0;
	  let LABEL: string = ''
	  
	  while (i < this.sequence.length) {

	    const currentChar = this.sequence.charAt(i);
	    const nextChar = this.sequence.charAt(i + 1);

	    if ( !S('().,0123456789').contains( currentChar ) ) {

	    	LABEL = currentChar

	    	let params: Array<string> = [];

	    	if ( nextChar === '(') {

	    		const _i = this.sequence.indexOf( ')', i );
	    		const _paramsString = this.sequence.substring( i+2, _i );
	    		params = _paramsString.split(',');

	    		i = _i;

	    	} else {

	    		i++;
	    	}
	    	
	    	// console.log(`--> ${params}`)

	    	this.runAction( currentChar, params )

	    } else {

	    	i++
	    }
	  }

	  console.log(`SEQUENCE i${iterations} ----> ${this.sequence}`)

	};


	public write( iterations: number ) {

		let iCount = 0

		for ( let i=0; i<iterations; i++ ) {

			this.sequence = this.rewriteSequence( i )

			iCount++;	
		}

		// console.log(`---> ${ this.sequence }`)

		// this.readSequence( iCount )

	};


	public run() {

		if ( this.sequence && this.sequence.length > 0 ) {

			this.readSequence(0)

		} else {

			console.log(`ERROR! no sequence found`)
		}
	};


	public runSequence( sequence: string ) {

		this.sequence = sequence

		this.readSequence( 1 );
	};

	// private insertCharactersAtPositions(string, positions, character) {
	  
	//   let modifiedString = string;

	//   positions.forEach( position => {
	    
	//     	modifiedString = modifiedString.slice(0, position) + '/' + modifiedString.slice(position);
	//   });

	//   return modifiedString;
	// }


	// public getArtwork(): any {

	// 	return this.pen.path()
	// }
}


export default Sequencer;



