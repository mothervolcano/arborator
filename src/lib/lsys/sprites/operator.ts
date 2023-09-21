import Sprite from "../core/sprite";
import { Glyph, MetaGlyph, Prim, Rule, Parameter, Counter } from "../lsys";
import OperationPrim from "../prims/operationPrim";
import BaseSprite from "./baseSprite";




class Operator extends BaseSprite {

	private targetGlyph: Glyph | undefined;

	private operand_A: Parameter | Counter;
	private operand_B: Parameter | Counter;

	private value_A: number = 0
	private value_B: number = 0;

	private result: number = 0;

	private operationPrim: Prim;


	constructor( operand_A: Parameter | Counter, operand_B: Parameter | Counter) {

		super();

		this.operand_A = operand_A;
		this.operand_B = operand_B;

		this.operationPrim = new OperationPrim();
	};

	implant(directory: Map<number, any>, dialect: Glyph[]): void {

		this.targetGlyph = directory.get(0).glyph as Rule;

		if ( this.targetGlyph ) {

			// TODO: validatation and preparation of prims
		}
	    
	};


	sow(targets?: string[] | undefined): void | { targets: Glyph[]; prim: Prim; }[] {

		return [{ targets: [ this.targetGlyph! ], prim: new OperationPrim() }]; 
	    
	};


	update(params: string): string {

		params.split(',').forEach( (p: string) => {

			if ( this.operand_A.prefix === p.charAt(0) ) {
				
				this.value_A = Number.parseInt(p.substring(1));
			}

			if ( this.operand_B.prefix === p.charAt(0) ) {
				
				this.value_B = Number.parseInt(p.substring(1));
			}
		});

		return params;
	    
	};


	protected process(stream: MetaGlyph[], context?: any): MetaGlyph[] | null {
	    
	    const workingSequence = stream.map((metaGlyph) => {

			if ( this.targetGlyph!.symbol === metaGlyph.glyph.symbol ) {

				this.result = this.value_A - this.value_B;

				console.log('')
				console.log(`OPERAND VALUES: ${this.value_A} - ${this.value_B}`)
				console.log(`!!!!! OPERATOR RESULT: ${this.result}`)
				console.log('')

				const prim = this.operationPrim.clone();
				prim.cast( this.result );

				if ( metaGlyph.data.prims ) {

					metaGlyph.data.prims.push(prim);

				} else { 

					metaGlyph.data.prims = [prim];
				}
			}

			return metaGlyph;

		});

		return workingSequence;
	};


	run(stream: MetaGlyph[], params?: any): MetaGlyph[] {
	 	
	 	let sequence: MetaGlyph[] | null = [];

		sequence = this.process(stream);
		
		if ( sequence && sequence.length ) {

			return sequence;

		} else {

			return stream;
		}   
	};


}

export default Operator;


