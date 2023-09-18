import Sprite from "../core/sprite";
import { Counter, Glyph, Id, MetaGlyph, Parameter, Prim, Rule } from "../lsys";
import ParameterPrim from "../prims/parameterPrim";




class Replicator extends Sprite {

	private count: number = 0;

	private readerPrim: Counter | Parameter | Id;
	private writerPrim: Counter | Parameter | Id | null;

	private place: number | undefined;
	private targetGlyph: Glyph;
	private targetGlyphIDs: number[] = [];


	constructor( targetGlyph: Glyph, readerPrim: Counter | Parameter | Id, writerPrim: Counter | Parameter | Id | null = null, place?: number ) {

		super();

		this.targetGlyph = targetGlyph;
		this.place = place;

		this.readerPrim = readerPrim;
		this.writerPrim = writerPrim || readerPrim;

	};


	public implant(directory: Map<number, MetaGlyph>, dialect: Glyph[]): void {

		const eligibles: MetaGlyph[] = [];

		directory.forEach((metaGlyph)=> {

			if ( metaGlyph.glyph.symbol === this.targetGlyph.symbol ) {

				eligibles.push( metaGlyph );

				this.targetGlyphIDs.push(metaGlyph.id);
			}
		});


		this.targetGlyphIDs = eligibles.filter( (metaGlyph, i) => { 

			return this.place ? i === this.place-1 : true;

		}).map( metaGlyph => metaGlyph.id );

	};


	public sow(): void {

		// no Prims to sow here
	};


	public update( params: string ): string {

		if ( params ) {

			params.split(',').forEach( (p: string) => {

				if ( p.charAt(0) === this.readerPrim.prefix ) {
					
					this.count = Number.parseInt(p.substring(1));
				}
			})
		}

		return params;
	}


	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {

		const workingSequence = stream.map((metaGlyph) => {

			if ( this.targetGlyphIDs.includes( metaGlyph.id) ) {

				const sequence: MetaGlyph[] = [];

				// ---------------------------------------
				
				for ( let i=this.count; i>=0; i-- ) {
				// for ( let i=0; i<=count; i++ ) {

					const newMetaGlyph = {

						glyph: metaGlyph.glyph,
						id: 900,
						data: {}
					}

					if (metaGlyph.glyph.type==='Rule') {

						const prim = this.writerPrim!.clone();
						prim.cast(i+1);

						newMetaGlyph.data = { prims: [ prim ] }
					}

					sequence.push( newMetaGlyph );
				}

				// ---------------------------------------

				if ( sequence.length ) { return sequence }
		
			}

			return metaGlyph;

		});	
		
		return workingSequence.flat();
	};


	public run(stream: MetaGlyph[]): MetaGlyph[] {

		let sequence: MetaGlyph[] | null = [];

		sequence = this.process(stream);

		if ( sequence && sequence.length ) {

			return sequence;

		} else {

			return stream;
		}     
	};

}

export default Replicator

