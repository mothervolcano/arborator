import Sprite from "../core/sprite";
import { Glyph, Prim, Rule } from "../lsys";





class IncognitoDiscloser extends Sprite {


	private incognito: Glyph;
	private prim: Prim | null | undefined;
	private prims: Prim[] = [];
	private spots: number[] = [];

	constructor(incognito: Glyph ) {

		super();

		this.incognito = incognito;
		this.prim = null;

	}


	public implant(rule: Glyph[], head: Rule): void {

		rule.forEach((glyph, i) => {

			if (glyph.symbol === this.incognito.symbol) {

				this.spots.push(i);
			}
		})

		this.prims = head.prims;
	}
	

	public sow(): void {

		// no targets
	}


	protected process(stream: Glyph[]): Glyph[] | null {


		const workingSequence = stream.map((glyph)=>{

			if (this.spots.includes(glyph.id)) {

				if ( this.prim != undefined && this.prim.type==='Imperative') {

					// console.log(`DISCLOSED: ${this.prim.getValue().symbol}`)

					return this.prim.getValue();

				} else {

					return glyph;
				}

			}

			return glyph

		})


		return workingSequence;
	}


	public run(stream: Glyph[], params?: any): Glyph[] {

		// this.prim = this.prims.find((prim) => prim.type==='Imperative')
		
		if ( params ) {

			params.split(',').forEach((p: string) => {

				if (this.prim && this.prim.prefix === p.charAt(0)) {
					
					this.prim.process(p);
				}
			})
		}

		const processedSequence = this.process(stream)

		if ( processedSequence ) {

			// console.log(`FULL DISCLOSURE: ${processedSequence}`);

			return processedSequence;

		} else {

			return stream;
		}  
	}
}



export default IncognitoDiscloser;