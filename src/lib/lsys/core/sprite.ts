import { Glyph, ISprite, Prim } from "../lsys";





abstract class Sprite implements ISprite {


	constructor( ) {


	}

	abstract employ( rule: Glyph[], prims: Prim[] ): void
	abstract run( sequence: Glyph[], context?: any ): Glyph[];

	protected abstract process( sequence: Glyph[] ): Glyph[] | null;

}


export default Sprite;