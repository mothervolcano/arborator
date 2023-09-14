import Sprite from "../core/sprite";
import { Glyph, Imperative, Prim, Rule } from "../lsys";
import ImperativePrim from "../prims/imperativePrim";


class IncognitoPerpetuator extends Sprite {

	private primIndex: number = 0;

	private prims: Imperative[] = [];
	private incognito: Glyph;
	// private targetSymbol: string;
	private targetGlyph: Glyph;
	private spots: number[] = [];

	
	constructor( incognito: Glyph, targetGlyph: Glyph ) {

		super();

		this.incognito = incognito;
		this.targetGlyph = targetGlyph;
	};

	
	public implant(rule: Glyph[], head: Rule): Prim[] {


		rule.forEach((glyph,i)=>{

			// Track all the target Glyph places inside the Prim

			if (glyph.symbol === this.targetGlyph.symbol ) {

				// this.targetGlyph = glyph;

				console.log(`-----------------------------------------`)
				console.log(`IMPLANTING INCOGNITO PERPETUATOR IN:`)
				console.log(`--> ${rule.map((g)=>g.symbol).join('')}`)
				console.log(``)
				console.log(`TARGET: ${glyph.symbol}`)
				console.log(`ID: ${glyph.id}`)
				console.log(``)

				const prim = new ImperativePrim();
				prim.places = [glyph.id];

				this.prims.push(prim);
			}

			// Track all the Incognito Glyph places

			if ( glyph.symbol === this.incognito.symbol ) {

				this.spots.push(i);
			}

		})
	 	
		return this.prims;
	};


	public sow() {

		return [{ targets: [ this.targetGlyph ], prim: new ImperativePrim() }] ;
	}


	protected process(stream: Glyph[]): Glyph[] | null {

		console.log(`... stream: ${ stream.map((g)=>g.symbol).join('') }`)

		const workingSequence = stream.map((glyph)=>{

			if ( this.spots.includes(glyph.id) ) {

				console.log(`incognito: ${glyph.symbol}`)
				if ( this.targetGlyph ) console.log(`target: ${glyph.symbol} @ ${glyph.id}`)
				else console.log(`Missing Target Glyph`)

				const prim = this.prims[this.primIndex];

				console.log(`Prim value: ${prim.getValue().symbol}`)

				// if ( prim.getValue().symbol === '?' ) { prim.cast(glyph); } // If the prim has a glyph then the incognito has been disclosed
				// else { return prim.getValue() }

				prim.cast(glyph);

				console.log(`cast prim with: ${glyph.symbol}`)
				console.log(`places to add prim: ${prim.places}`)

				if ( this.primIndex + 1 >= this.prims.length ) {

					this.primIndex = 0;

				} else {

					this.primIndex++
				}

				return prim.getValue();
			}

			return glyph;

		});

		return workingSequence;
	}


	public run(stream: Glyph[], params?: any, context?: any): Glyph[] {
	  		
		console.log(``)
		console.log(`RUNNING INCOGNITO PERPETUATOR FOR: ${context}`)

		const sequence = this.process(stream)

		if ( sequence ) {

			return sequence;

		} else {

			return stream;
		} 
	}
}

export default IncognitoPerpetuator;


