import Sprite from "../core/sprite";
import { Glyph, Prim } from "../lsys";





class IncognitoDiscloser extends Sprite {


	private incognito: Glyph;
	private prim: Prim;
	private spots: number[] = [];

	constructor(incognito: Glyph, prim: Prim) {

		super();

		this.incognito = incognito;
		this.prim = prim;

	}


	public implant(rule: Glyph[], prims: Prim[]): void {

		rule.forEach((glyph, i) => {

			if (glyph.symbol === this.incognito.symbol) {

				this.spots.push(i);
			}

		})

		prims.push(this.prim);
	     
	}


	protected process(stream: Glyph[]): Glyph[] | null {
	      
		
		const workingSequence = stream.map((glyph)=>{

			if (this.spots.includes(glyph.id)) {

				if (this.prim.type === 'Imperative') {

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

		if ( params ) {

			params.split(',').forEach((p: string) => {


				if (this.prim.prefix === p.charAt(0)) {

					// console.log(`INCOGNITO: ${p}`)
					
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