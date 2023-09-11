import Sprite from "../core/sprite";
import { Glyph, Imperative, Prim } from "../lsys";
import ImperativePrim from "../prims/imperativePrim";




class IncognitoPerpetuator extends Sprite {


	private prim: Imperative;
	private incognito: Glyph;
	private target: Glyph;
	private spots: number[] = [];

	constructor( incognito: Glyph, target: Glyph) {

		super();

		this.incognito = incognito;
		this.target = target;
		this.prim = new ImperativePrim();
	}

	public employ(rule: Glyph[], prims: Prim[]): void {
	 	
		this.prim.places = rule.map((g, i) => {

			if (g.symbol === this.target.symbol) {

				return i;
			}

			if (g.symbol === this.incognito.symbol ) {

				this.spots.push(i);
			}

		}).filter(n => n !== undefined) as number[];

		prims.push(this.prim);
	}

	protected process(sequence: Glyph[]): Glyph[] | null {

		for ( const glyph of sequence ) {

			if ( this.spots.includes(glyph.id) ) {

				this.prim.set(glyph);
			}
		}

		return null;
	}

	public run(sequence: Glyph[], context?: any): Glyph[] {
	  	
		this.process(sequence)

		return sequence;
	}
}

export default IncognitoPerpetuator;