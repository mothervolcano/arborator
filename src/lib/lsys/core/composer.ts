
import { IModel, ICommand, IComposer } from '../lsys';

import { getParameterString, parseParameters } from '../tools/parserAssistant';

import { EmptyStringException, IncompleteParameterStringException, NoParametersFoundException } from './errorMessages';




class Composer implements IComposer {

	private thread: Array<string>;
	private strip: Array<string>;
	private window: number;
	private currentIndex: number;

	constructor(private model: IModel) {

		this.thread = [];
		this.strip = [];
		this.window = 10;
		this.currentIndex = 0;

	};


	private shift(start: number | null = null, length: number | null = null) {

		const _start = start !== null ? start : this.currentIndex;
		const _length = length !== null ? length : this.window;

		const end = Math.min(_start + _length, this.thread.length);

		// this.strip = this.thread.substring(_start, end);
		this.strip = this.thread.slice(_start, end);
	};


	private next( skip?: number ) {

		if ( !skip ) {

			this.currentIndex++;

		} else {

			this.currentIndex = Math.min( this.currentIndex + skip, this.thread.length );
		}
	}


	private append(str: string) {

		// this.thread += str;
		this.thread.push(str);
	};

	
	private extractParameters( str: string ) {

		try {

			const paramString = getParameterString( str );
			return paramString;

		} catch ( error ) {

			if (error instanceof IncompleteParameterStringException) {

		      // Handle incomplete string, maybe allow for retries or log for debugging

				return '';

		    } else if (error instanceof EmptyStringException) {

		      // Handle empty string, maybe fail gracefully or log the error

		    	return '';

		    } else if (error instanceof NoParametersFoundException) {

		      // Handle when no parameters are found

		    	return '';

		    } else {

		      // Unhandled error
		      throw new Error(`Failed to parse parameters in string: ${str}`);
    		}

		}
	};


	public compose( iterations: number, context?: any ): string {

		
		this.append( this.model.axiom );


		for (let i = 0; i < iterations; i++) {

			let nextThread: string[] = [];

			this.currentIndex = 0;

			while (this.currentIndex < this.thread.length) {

				this.shift();

				// const currChar = this.thread.charAt( this.currentIndex );
				// const nextChar = this.thread.charAt( this.currentIndex + 1 )				
				const currChar = this.thread[ this.currentIndex ];
				const nextChar = this.thread[ this.currentIndex + 1];

				const product = this.model.read( currChar );

				if ( typeof product === 'string' ) {

					nextThread.push(product);

				} else { 

					if ( product.read( nextChar, 'parameter?' ) ) {
						
						const paramString = this.extractParameters( '' );
						// const paramString = this.extractParameters( this.strip.join('') );

						if ( paramString ) {
							
							product.read( paramString );
							this.next( paramString.length );
						}
					}

					nextThread.push(...product.write().split(''));
				}

				this.next();

				if (this.currentIndex >= this.thread.length) {

					// TODO: think what to do here

					break;
				}
			}

			this.thread = nextThread;


			// console.log(`---> ${ _thread }`)
			// console.log(`.............................`)

		}

		return this.thread.join('');
	}


	public *plot() {


		for (let i = 0; i < this.thread.length; i++) {

			// const currChar = this.thread.charAt(i);
			const currChar = this.thread[i];
			const glyph = this.model.alphabet.glyph(currChar);

			let command: ICommand | undefined;

			switch( glyph.type ) {

				case 'Rule':

					command = this.model.hasCommand(glyph.symbol) ? this.model.getCommand(glyph.symbol) : undefined;
        			
        			if (command) {
          				yield command;
       				 }

					break;

				case 'Instruction':

					command = this.model.hasCommand(glyph.symbol) ? this.model.getCommand(glyph.symbol) : undefined;
       				
       				if (command) {
          				yield command;
       				}
        			
					break;

				case 'Marker':

					// ignore

					break;

				default : throw new Error(`Failed to execute. Probably invalid Glyph ${ currChar }`)
			}
		}
	}

	public reset() {

		this.thread = [];
		this.currentIndex = 0;
	}
}


export default Composer;

