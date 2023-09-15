

// The base interface for all Prims
export interface IPrim<T> {
  readonly prefix: string;  
  places: number[];
  stub: any;
  hasValue(): boolean;
  setValue( value: T ): T;
  getValue(): T;
  cast(value: T): this;
  recast(str: string): this;
  process(value:string): void;
  read(str: string): T;
  write(): string;
  clone(): T;
}


export type PrimType = 'Parameter' | 'Flag' | 'Imperative' | 'Counter' | 'Id';


// The interface for Parameters specifically
export interface Parameter extends IPrim<number> {
  type: 'Parameter';
  cast(value: number): this;
  recast(str: string): this;
  process(value?: string): void;
  read(str: string): number;
  write(): string;
  clone(): any;
}

// The interface for Parameters specifically
export interface Id extends IPrim<number> {
  type: 'Id';
  cast(value: number): this;
  recast(str: string): this;
  process(value?: number | string): void;
  read(str: string): number;
  write(): string;
  clone(): any;
}


// The interface for Accumulators specifically
export interface Counter extends IPrim<number> {
  type: 'Counter';
  cast(value: number): this;
  recast(str: string): this;
  process(value?: number | string ): number;
  read(str: string): number;
  write(): string;
  clone(): any;
}


// The interface for Parameters specifically
export interface Flag extends IPrim<number> {
  type: 'Flag';
  cast(value: number): this;
  recast(str: string): this;
  process(value?: string): void;
  read(str: string): number;
  write(): string;
  clone(): any;
}


// The interface for Parameters specifically
export interface Imperative extends IPrim<Glyph> {
  type: 'Imperative';
  cast(value: Glyph): this;
  recast(str: string): this;
  process(value?: string): void;
  read(str: string): Glyph;
  write(): string;
  clone(): any;
}


export type Prim = Parameter | Flag | Imperative | Counter | Id


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
  id: number;
  symbol: string;
  prims: Prim[];

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
  id: number;
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
  id: number;
  symbol: string;
}


export type Glyph = Rule | Instruction | Marker;


export type MetaGlyph = {

  glyph: Glyph;
  id: number;
  data: { [key:string]:any };
}


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
  collect( symbols: string ): Glyph[]

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
  plot(): Array<[ICommand, string[]|null]>;
  // plot(): Generator<ICommand, void, unknown>;
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

  readonly head: Glyph;
  readonly output: string;
  plant(): void;
  read( params?: string | null, context?: any ): boolean | void;
  compose( ...str: string[] ): void;
  addSprite( sprite: ISprite ): void;
  addPrim( prim: Prim | string, symbols?: string | string[], save?: boolean ): Prim;
  process( params?: string, context?: any ): void;
  // encodeSequence( sequence: Array<Glyph> ): string;
  write( context?: any ): string;

}


interface ISprite {

  implant( directory: Map<number, any>, head: Rule ): Prim[] | void;
  sow( targes?: string[] ): { targets: Glyph[], prim: Prim }[] | void;
  update( directory: Map<number, MetaGlyph> ): number[];
  run( stream: MetaGlyph[], params?: any, context?: any ): MetaGlyph[];
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

