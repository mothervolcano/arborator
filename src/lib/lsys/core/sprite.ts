import { Glyph, ISprite, Prim, Rule } from "../lsys";





abstract class Sprite implements ISprite {


	constructor( ) {


	}

	abstract implant( rule: Glyph[], head: Rule ): void
	abstract run( stream: Glyph[], params?: any ): Glyph[];

	protected abstract process( stream: Glyph[], context?: any ): Glyph[] | null;

}


export default Sprite;