import Sprite from "../core/sprite";
import { Glyph, MetaGlyph, Prim, Rule } from "../lsys";





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


	public implant(directory: Map<number, MetaGlyph>, head: Rule): void {

		directory.forEach((metaGlyph, i) => {

			if (metaGlyph.glyph.symbol === this.incognito.symbol) {

				this.spots.push(i);
			}
		})

		this.prims = head.prims;
	}

	public sow(): void {

		// no targets
	}

	public update( directory: Map<number, MetaGlyph> ): number[] {

		directory.forEach( (glyphData, i) => {

			const glyph = glyphData.glyph;
			
		});

		return [];
	}
	

	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {


		const workingSequence = stream.map((metaGlyph)=>{

			// if (this.spots.includes(metaGlyph.glyph.id)) {

			// 	if ( this.prim != undefined && this.prim.type==='Imperative') {

			// 		// console.log(`DISCLOSED: ${this.prim.getValue().symbol}`)

			// 		return this.prim.getValue();

			// 	} else {

			// 		return metaGlyph;
			// 	}
			// }

			return metaGlyph;

		})


		return workingSequence;
	}


	public run(stream: MetaGlyph[], params?: any): MetaGlyph[] {

		// this.prim = this.prims.find((prim) => prim.type==='Imperative')
		
		if ( params ) {

			params.split(',').forEach((p: string) => {

				if (this.prim && this.prim.prefix === p.charAt(0)) {
					
					this.prim.process(p);
				}
			})
		}

		const sequence = this.process(stream)

		if ( sequence ) {

			// console.log(`FULL DISCLOSURE: ${sequence}`);

			return sequence;

		} else {

			return stream;
		}  
	}
}


export default IncognitoDiscloser;

