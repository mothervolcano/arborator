import Sprite from "../core/sprite";
import { Glyph, Imperative, MetaGlyph, Prim, Rule } from "../lsys";

/**
 * 
 * The Incognito Discloser will replace the incognito Glyph ( * ) by
 * another Glyph that is determined by... ? 
 * 
 * 
 */ 

class IncognitoDiscloser extends Sprite {


	private incognito: Glyph;
	private incognitoIDs: number[] = [];
	private discloser: Imperative;

	
	constructor( incognito: Glyph, discloser: Imperative ) {

		super();

		this.incognito = incognito;
		this.discloser = discloser;

	};


	public implant(directory: Map<number, MetaGlyph>, head: Rule): void {

		directory.forEach((metaGlyph) => {

			if (metaGlyph.glyph.symbol === this.incognito.symbol) {

				this.incognitoIDs.push(metaGlyph.id);
			}
		})
	};

	
	public sow(): void {

		// no targets
	};

	
	public update( directory: Map<number, MetaGlyph> ): number[] {

		return [];
	};
	

	protected process(stream: MetaGlyph[], glyphString: string): MetaGlyph[] | null {


		const workingSequence = stream.map((metaGlyph)=>{

			if ( this.incognitoIDs.includes(metaGlyph.id) ) {

				const prim = this.discloser.recast(glyphString);

				metaGlyph.glyph = prim.getValue();
			}

			return metaGlyph;

		})

		return workingSequence;
	};


	public run(stream: MetaGlyph[], params?: any): MetaGlyph[] {

		let sequence: MetaGlyph[] | null = [];
		
		if ( params ) {

			params.split(',').forEach((p: string) => {

				if (this.discloser && this.discloser.prefix === p.charAt(0)) {
					
					sequence = this.process(stream, p );
				}
			})
		}


		if ( sequence ) {

			return sequence;

		} else {

			return stream;
		}  
	}
}


export default IncognitoDiscloser;

