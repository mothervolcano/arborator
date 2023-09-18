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
	private disclosure: string = '?';

	
	constructor( incognito: Glyph, discloser: Imperative ) {

		super();

		this.incognito = incognito;
		this.discloser = discloser;

	};


	public implant(directory: Map<number, MetaGlyph>, dialect: Glyph[]): void {

		directory.forEach((metaGlyph) => {

			if (metaGlyph.glyph.symbol === this.incognito.symbol) {

				this.incognitoIDs.push(metaGlyph.id);
			}
		})
	};

	
	public sow(): void {

		// no targets
	};

	
	public update( params: string ): string {


		params.split(',').forEach((p: string) => {

			if (this.discloser && this.discloser.prefix === p.charAt(0)) {
				
				this.disclosure = p;
			}
		})


		return params;
	};
	

	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {


		const workingSequence = stream.map((metaGlyph)=>{

			if ( this.incognitoIDs.includes(metaGlyph.id) ) {

				const prim = this.discloser.recast(this.disclosure);

				metaGlyph.glyph = prim.getValue();
			}

			return metaGlyph;

		})

		return workingSequence;
	};


	public run(stream: MetaGlyph[]): MetaGlyph[] {

		let sequence: MetaGlyph[] | null = [];

		sequence = this.process(stream);

		if ( sequence ) {

			return sequence;

		} else {

			return stream;
		}  
	}
}


export default IncognitoDiscloser;

