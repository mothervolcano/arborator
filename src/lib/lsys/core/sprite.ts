import { Glyph, ISprite, Prim } from "../lsys";





abstract class Sprite implements ISprite {


	constructor( ) {


	}

	abstract implant( rule: Glyph[], prims: Prim[] ): void
	abstract run( sequence: Glyph[], params?: any ): Glyph[];

	protected abstract process( stream: Glyph[] ): Glyph[] | null;

}


export default Sprite;