

export type GlyphType = 'Rule' | 'Instruction' | 'Marker';


/**
 * 
 * RULE
 * 
 * Represents a Rule glyph used for rewriting sequences.
 * - `type`: Identifies the glyph as a Rule.
 * - `symbol`: The character representing this Rule.
 * - `params`: The number of parameters expected by the Rule, used for parameterized productions.
 */

export interface Rule {

  type: 'Rule';
  symbol: string;
  params: number[];

}

/**
 * 
 * INSTRUCTION
 * 
 * Represents an Instruction glyph which has specific operational meaning but is not rewritten.
 * - `type`: Identifies the glyph as an Instruction.
 * - `symbol`: The character representing this Instruction.
 */

export interface Instruction {
  
  type: 'Instruction';
  symbol: string;

}

/**
 * 
 * MARKER
 * 
 * Represents a Marker glyph which is used for annotating or marking positions in the sequence.
 * - `type`: Identifies the glyph as a Marker.
 * - `symbol`: The character representing this Marker.
 */

export interface Marker {
  
  type: 'Marker';
  symbol: string;
}


export type Glyph = Rule | Instruction | Marker;


/**
 * 
 * ALPHABET
 * 
 * The Alphabet class serves as a centralized dictionary of allowable symbols,
 * mapped to their designated GlyphTypes ('Rule', 'Instruction', 'Marker').
 * It establishes a consistent vocabulary that all Models and the Composer can refer to,
 * ensuring that symbols are used consistently and as intended across different contexts.
 * 
 * 1. Avoids the risk of Models assigning Productions to symbols that are reserved for other GlyphTypes.
 * 2. Enables the Composer to correctly interpret and handle symbols during string sequence decoding.
 * 3. Prevents Models from re-defining or overwriting a Rule that has already been set.
 * 4. Allows project-level control over the domain of allowable Symbols for all Models, ensuring domain-specific constraints are honored.
 * 5. Optimizes Composer performance by predefining sets of characters for specific GlyphTypes, reducing the need for per-character evaluation.
 */

export interface IAlphabet {

  registerGlyph( type: GlyphType, entry: string ): void;
  glyph( symbol: string ): Glyph;
  rule( symbol: string ): Rule;
  sequence( symbols: string ): Glyph[]

}


/**
 * The IModel class serves as the specification layer between the alphabet and the Composer.
 * It houses both the rewriting rules (IProduction instances) and actionable commands (ICommand instances)
 * that are to be utilized during the L-system's growth process. 
 * The class is initialized with a predefined alphabet and an axiom, 
 * ensuring that all its productions and commands align with the established symbol set.
 * The IModel provides methods for adding, checking, and retrieving productions and commands,
 * optionally taking into account a contextual parameter.
 */


export interface IModel {

  readonly alphabet: IAlphabet;
  readonly axiom: string;
  hasProduction( symbol: string ): boolean;
  getProduction( symbol: string, context?: any ): IProduction | undefined;
  hasCommand( symbol: string ): boolean;
  getCommand( symbol: string, context?: any ): ICommand | undefined;
  read( symbol: string ): IProduction | string;

}


/**
 * 
 * COMPOSER
 * 
 * The Composer class is the core engine responsible for the L-system rewriting process.
 * Initialized with a given model, it iterates through a string sequence to apply rewriting rules.
 * It optionally accepts a context to allow for more complex, contextual rewriting operations. 
 * Note that error handling and thread management are intended to be handled by external mechanisms 
 * to keep this class focused solely on its core responsibilities.
 * 
 * 
 */

export interface IComposer {

  compose( iterations: number, context?: any ): string;
  plot(): Generator<ICommand, void, unknown>;
  reset(): void;

}

/**
 * The IProduction interface represents a single rewriting rule within the L-system architecture.
 * Initialized with a Rule glyph and an optional sequence of Glyphs, it serves as the blueprint for transforming
 * a given symbol into a new string sequence.
 * The interface exposes methods for writing and processing the production's output based on given parameters
 * and optional contextual information. It also provides methods for encoding a sequence into a string and
 * for reading the current output sequence.
 */

export interface IProduction {

  readonly glyph: Glyph;
  readonly output: string;
  read( params?: string | null, context?: any ): boolean | void;
  process( params: Array<number>, context?: any ): void;
  encode( sequence: Array<Glyph> ): string;
  write( context?: any ): string;

}


/**
 * The ICommand interface defines an executable action associated with a specific symbol in the L-system.
 * Created and defined within each model it takes a symbol and a corresponding callback function it translates
 * symbols/Glyphs to concrete operations, typically in the realm of drawing or modeling.
 * The 'run' method is designed to execute the action using a specified tool and can be further customized
 * with optional context parameters, enabling dynamic behavior based on different operating conditions.
 */

export interface ICommand {

  readonly symbol: string;
  run( tool: any, context?: any ): void;

}

