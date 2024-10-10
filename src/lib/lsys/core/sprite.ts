import { Glyph, ISprite, MetaGlyph, Prim, Rule } from "../lsys";

/**
 *
 * Called by a Production Rule each time an instance of this Sprite is added via Production.addSprite()
 *
 * As the name suggests it 'implants' itself into the Production Rule processing flow.
 * It's public methods are called by the Production Rule every time the Production Rule is being processed by the composer.
 *
 * The way it inserts itself into the Production Flow is by having its relevant public methods called within the Production.process() method.
 * This sequence while it is being generated and manipulated there, in the Production Rule is referred to as 'stream'.
 *
 * By default the stream goes through each Sprite in the Production Rule stack.
 * Depending on the job of each different Sprite some might want/need to intercept the stream to operate on it.
 * Otherwise the stream goes through unmodified.
 *
 * Depending on their job each Sprite will operate either on the Production's stream, directory or both.
 *
 * Operations done on the stream often involve the direct manipulation of the Glyphs eg.: adding, removing, repeating, scrambling, replacing, etc.
 *
 * Operations done on the directory are often related to passing data or instructions to other Production Rules, usually — but not always the case -
 * part of their Rule. When it's not that case will at least be part of the Production Rule's Dialect.
 *
 * A Rule is the original sequence of Glyphs that defines the Production Rule. It's the sequence that is serialized as the output to be written into
 * larger sequence composed by the Composer. It can also be used as the base for the generation of a modified sequence.
 * However, its canonic form is immutable and accessible in its original form at any time regardless of how many transformations it has.
 * If a Production Rule's sequence is transformed to a point of no resemblance to its Rule it should be reconsidered the while purpose of the
 * Production Rule. When manipulated, the resulting sequence should be perceivable as an augmentation, variation or replication of the original Rule.
 * Although the Rule and the sequence are both, a sequence of Glyphs, they should not be confused.
 *
 * A Dialect is a subset of the Alphabet and is, so to speak, the reportoire of symbols a given Production Rule can use in all the transformations
 * that it is subject accross all the iterative stages of the generative process.
 *
 * The Directory is an indexed list of all the glyph occurences in a Production Rule's sequence at a given time. Because a Glyph can, and often is,
 * used more than once in a sequence the directory contains, not a list of the Glyphs that are in the sequence, but a list of the Glyphs and all its
 * occurences. They are indexed numerically by the order that they are added.
 *
 * The Directory enables the system to keep a single universal instance for each Glyph while allowing each Production Rule and its Sprites to
 * differentiate and act on each.
 *
 * Since it's a Map object, the Directory, allows the Production Rules and its Sprites to store and associate temporary data with specific Glyphs
 * in order to facilitate their operations.
 *
 */

abstract class Sprite implements ISprite {
	constructor() {}

	/**
	 * The implant() method is responsible for passing crucial information to the Sprite
	 * about the Glyphs that make up the Production.
	 * This is how the Sprite gets the 'knowledge' it needs to operate.
	 *
	 * Each Sprite has built-in logic to check if the required Prims are present
	 * in the Production's Glyphs. If not, the operation won't proceed.
	 *
	 * These Prims are essential for the Sprite's subsequent operations.
	 *
	 */

	// The Production calls the Sprite's `implant()` method.
	// This method takes two arguments:
	// - A directory, which is a map of the Production's rules (sequence of Glyphs).
	// - A dialect, which consists of all the Glyphs that the Production allows.

	// Inside `implant()`, the Sprite will look for specific Prims
	// that it needs in order to carry out its operations.
	// It uses both the prefix and the type of the Prim for this check.

	abstract implant(directory: Map<number, any>, dialect: Glyph[]): void;

	// Prims that are required for other Productions are stored
	// in a 'dropbox', which is a static Map object shared among all Productions

	/**
	 * Comment: The sow() method identifies which Prims need to be passed to
	 * other Productions and places them in the primDropbox.
	 *
	 */

	abstract sow(targets?: string[]): { targets: Glyph[]; prim: Prim }[] | void;
	abstract update(params: string): string;
	abstract run(stream: MetaGlyph[], params?: any): MetaGlyph[];

	protected abstract process(
		stream: MetaGlyph[],
		context?: any,
	): MetaGlyph[] | null;
}

export default Sprite;
