
import { IModel, ICommand, IComposer, Glyph } from '../lsys';

import { getParameterString, parseParameters } from '../tools/parserAssistant';

import { EmptyStringException, IncompleteParameterStringException, NoParametersFoundException } from './errorMessages';




class Composer implements IComposer {

	private commands: Array<string | string[]>;
	private thread: Array<string>;
	private strip: Array<string>;
	private window: number;
	private currentIndex: number;

	constructor(private model: IModel) {

		this.commands = [];
		this.thread = [];
		this.strip = [];
		this.window = 50;
		this.currentIndex = 0;

	};


	private shift(start: number | null = null, length: number | null = null) {

		const _start = start !== null ? start : this.currentIndex;
		const _length = length !== null ? length : this.window;

		const end = Math.min(_start + _length, this.thread.length);

		// this.strip = this.thread.substring(_start, end);
		this.strip = this.thread.slice(_start, end).flat();
	};


	private next(skip?: number) {

		if (!skip) {

			this.currentIndex++;

		} else {

			this.currentIndex = Math.min(this.currentIndex + skip, this.thread.length);
		}
	}


	private append(str: string) {

		// this.thread += str;
		this.thread.push(str);
	};

	
	private extractParameters(str: string) {

		try {

			const paramString = getParameterString(str);
			return paramString;

		} catch (error) {

			if (error instanceof IncompleteParameterStringException) {

				// Handle incomplete string, maybe allow for retries or log for debugging

				throw new Error(`Incomplete parameter string: ${str}`);

			} else if (error instanceof EmptyStringException) {

				// Handle empty string, maybe fail gracefully or log the error

				throw new Error(`Empty string: ${str}`);

			} else if (error instanceof NoParametersFoundException) {

				// Handle when no parameters are found

				throw new Error(`No parameters found: ${str}`);

			} else {

				// Unhandled error
				throw new Error(`! Failed to parse parameters in string: ${str}`);
			}

		}
	};


	public compose(iterations: number, context?: any): string {

		
		this.append(this.model.axiom);


		for (let i = 0; i < iterations; i++) {

			let nextThread: string[] = [];

			this.currentIndex = 0;

			while (this.currentIndex < this.thread.length) {

				this.shift();

				// const currChar = this.thread.charAt( this.currentIndex );
				// const nextChar = this.thread.charAt( this.currentIndex + 1 )				
				const currChar = this.thread[this.currentIndex];
				const nextChar = this.thread[this.currentIndex + 1];

				const symbol = this.model.read(currChar);

				if (typeof symbol === 'string') {
		
					if ( symbol === 'i' ) {

						const paramString = this.extractParameters(this.strip.join(''));

						if ( paramString ) {

							console.log(`!!!!!! ${paramString}`)

							nextThread.push(symbol);
							nextThread.push('(')
							nextThread.push(...paramString.split(''));
							nextThread.push(')')
							this.next(paramString.length + 2);
						}

					} else {

						nextThread.push(symbol);
					}

				} else { 

					if (symbol.read(nextChar, 'parameter?')) {
						
						const paramString = this.extractParameters(this.strip.join(''));

						// console.log(`COMPOSER: extracted parameters: ${paramString}`);

						if (paramString) {
							
							symbol.read(paramString);
							this.next(paramString.length + 2);

						} else {

							// TODO: think what to do here
						}

					} else {

						symbol.read();

					}

					// NOTE: handle parameter 'packing' here. 

					nextThread.push(...symbol.write().split(''));
				}

				this.next();

				if (this.currentIndex >= this.thread.length) {

					// TODO: think what to do here

					break;
				}
			}

			this.thread = nextThread;

			console.log(``)
			console.log(`......................................................`)
			console.log(`${i} -> ${nextThread.join('')}`)
			console.log(`......................................................`)
		}

		let openMarkerIdx: number = -1;
		let closeMarkerIdx: number = -1;

		this.commands = this.thread.slice();

		do {
			openMarkerIdx = this.commands.findIndex((c) => c === '(');
			closeMarkerIdx = this.commands.findIndex((c) => c === ')');

			if (openMarkerIdx !== -1 && closeMarkerIdx !== -1) {

				const params = this.commands.splice(openMarkerIdx, closeMarkerIdx - openMarkerIdx + 1).join('');
				this.commands.splice(openMarkerIdx, 0, params.substring(1).substring(0, params.length-2).split(','));

				console.log(`---> extracted params: ${params.substring(1).substring(0, params.length-2)}`);

			} else {
				// If we either don't find an opening or a closing parenthesis, break out of the loop.
				break;
			}

		} while (true);

		// console.log('----> ' + this.thread.join(''));
		
		return this.thread.join('');
	}


	// public *plot() {


	// 	for (let i = 0; i < this.thread.length; i++) {

	// 		// const currChar = this.thread.charAt(i);
	// 		const currChar = this.thread[i];
	// 		const glyph = this.model.alphabet.glyph(currChar);

	// 		let command: ICommand | undefined;

	// 		switch (glyph.type) {

	// 			case 'Rule':

	// 				command = this.model.hasCommand(glyph.symbol) ? this.model.getCommand(glyph.symbol) : undefined;
        			
	// 				if (command) {
	// 					yield command;
	// 				}

	// 				break;

	// 			case 'Instruction':

	// 				command = this.model.hasCommand(glyph.symbol) ? this.model.getCommand(glyph.symbol) : undefined;
       				
	// 				if (command) {
	// 					yield command;
	// 				}
        			
	// 				break;

	// 			case 'Marker':

	// 				// ignore

	// 				break;

	// 			default: throw new Error(`Failed to execute. Probably invalid Glyph ${currChar}`)
	// 		}
	// 	}
	// }

	public plot() {

		const sequence: Array<[ICommand,string[]|null]> = []

		for (let i = 0; i < this.commands.length; i++) {

			let glyph: Glyph;
			let command: ICommand | undefined;

			const currSymbol = this.commands[i];
			const nextSymbol = this.commands[ Math.min(i+1, this.commands.length) ];

			if (typeof currSymbol === 'string') {

				glyph = this.model.alphabet.glyph(currSymbol);

				switch (glyph.type) {

					case 'Rule':

						command = this.model.hasCommand(glyph.symbol) ? this.model.getCommand(glyph.symbol) : undefined;
        			
						if (command) {

							if ( Array.isArray(nextSymbol) ) {

								sequence.push( [ command, nextSymbol ] );

							} else {

								sequence.push( [ command, null ] );
							}
						}

						break;

					case 'Instruction':

						command = this.model.hasCommand(glyph.symbol) ? this.model.getCommand(glyph.symbol) : undefined;
       				
						if (command) {

							if ( Array.isArray(nextSymbol) ) {

								sequence.push( [ command, nextSymbol ] );

							} else {

								sequence.push( [ command, null ] );
							}
						}
        			
						break;

					case 'Marker':

						// ignore

						break;

					default: throw new Error(`Failed to execute. Probably invalid Glyph ${currSymbol}`)
				}

			}
		}

		return sequence;
	}

	public reset() {

		this.thread = [];
		this.currentIndex = 0;
	}
}


export default Composer;

