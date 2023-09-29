## Background

This project emerged from my fascination with the subject of a book I stumbled upon: 'The Algorithmic Beauty of Plants.' The author, Aristid Lindenmayer, a botanist, developed a mathematical theory to describe plant topology, which later evolved into a framework for modeling the development of branching structures in general. The Lindenmayer Systems or L-Systems, as they became known, found applications far beyond the field of biology in diverse fields such as urbanism, computer graphics, and even programming languages.

I was inspired to attempt a simple and straightforward implementation in JavaScript. The mesmerizing and often beautiful patterns, structures, and shapes that emerged from simple and concise set of rules made me understand why the L system were widely adopted in many different fields.

Before I knew it, what started as curiosity evolved into something of a passion that led to two exploratory projects. 

This project, Arborator and FASS (here) are being developed not only to expand my knowledge in procedural generation but also as personal challenge to try and take my coding skills to a new level.

![L-Systems Moodboard](/docs/assets/lsystem-examples.png)

## L-Systems 101

L-Systems are a specialized subset of formal grammars. They are based on a set of symbols, alphabet, that undergo transformations through recursive and iterative processes. Governed by a specific set of production rules, these symbols are systematically replaced in each iteration, resulting in progressively complex strings.

In essence, an L-System consists of:

1. An Alphabet: A designated set of symbols.
2. Production Rules: The symbol and its respective sequence of symbols that will be added to the sequence.
3. An Axiom: The string used to initiate the iterative processes.

Let's consider the simplest model that can be generated using an L-System: the growth of algae.

For this, we need an alphabet with at least 2 symbols, designated as `A` and `B`.

Each symbol represents a stage in the organism's growth:

`A` signifies a directional segment of growth, such as a filament, stem, trunk, or branch.

`B` represents a branching node.

Next, we define production rules as follows:

> `A → AB`
> 
> `B → A`

These rules instruct us to replace `A` with `AB` and `B` with `A`.

The axiom serves as our starting point, initially consisting of a single `A`.

We initiate the process by applying these production rules to every symbol. The first 5 iterations would appear as follows:

> 1. `A`
> 2. `AB`
> 3. `ABA`
> 4. `ABAAB`
> 5. `ABAABABA`

Continuing this iterative process leads to the expansion of the string. With each iteration, new branches (represented by "B") emerge from existing ones, resulting in a natural, self-replicating pattern.

However, 'ABAABABA' remains an abstraction that provides limited insight into the actual configuration and shape of the growing algae. It serves as a topological representation, illustrating how elements are organized in terms of their relative positions but missing spatial relationships such as distance, angle, and length of growth.

While we understand that 'B' represents branching, it only indicates where branching occurs and what follows. We can discern that two 'A's follow, but we remain unaware of their degree of divergence, their directional orientation, or the extent of growth they represent.



## Objectives

The approach taken is not so much focused on discovering a novel solution to the graphical modeling problem as it is on extending the logic of L-Systems into a general purpose framework. A versatile generation engine and set of modular tool adaptable to various creative and design purposes.

This framework has in mind the practical realities of the creative process for whom mathematics and nature are not the goal in itself but rather the tools.

As such the whole rationale behind it prioritizes considerations such as how, when, where, and to what extent the user can decide how much of the generative process relies on the algorithm, as opposed to how much is left to his deliberation. Practical concerns like these take precedence over theoretical considerations related to formal grammars or scientific/academic practice.

In summary, this framework aims to offer the capabilities of nature-like procedural generation while remaining pliable to the creative vision and intent of the user, whatever that vision may be.



## Architecture Overview

![Sequence writing process diagram](/docs/assets/sequence-generation-diagram.png)

### Approach

The sequences produced by an L-System, in isolation, offer limited information about the visual attributes of the structures they model. As seen in the previous example, we know that 'A' represents a growth segment, and 'B' indicates a branching point. And that’s all. We are left wondering: What are the specifics of the growth, such as its length and direction? Is the unit of growth constant? How does the structure branch out? How do the branches diverge, and at what angle?

ABAABABA

So what do we make of this? Where do we go from here?

Algorithmic Beauty of Plants addresses covers this problem, and this framework does not depart significantly from what is proposed there. As with all previous graphical interpretations it also takes a post-processing approach to the problem as well as adopting many of the conventions outlined in the book.

A post-processing approach here means that we won’t attempt to reinvent or reengineer the string generation process. We’ll take it as it comes and focus on how to interpret it instead. 

### The Challenge

However, the introduction of new symbols into the alphabet seems unavoidable. We need symbols such as ‘+’ or ‘-’ for commands that instruct the drawing tool to turn left or right by a defined number of degrees. Other symbols, less obvious but equally fundamental, are the ‘[’ and ‘]’ which hold instructions to save and restore the state of drawing, making it possible to create branches.

The sequence would now resemble something like this:

A[B][+A][-A[B]][+A[B][-A]][+A[B][-A][+A[B]]]

As you can see, there's a lot more to be parsed here. And, apparently also a new skill to master: how to weave in different types of symbols in the production rules to achieve the results we expect. Making sure the drawing commands end up where we want them in the sequence may require a learning curve and considerable mental gymnastics. I want to spare us from this as much as possible.

For this reason, the mixing of writing-related symbols with drawing-related symbols seemed like opening Pandora's box. Given my debutant status in developing frameworks of this ambition, I had nothing but my intuition to tell me that compromising the separation between the writing and drawing phases would be... a bad idea. Something to be avoided, or at least mitigated as much as possible.

To ensure that writing and drawing symbols could coexist in the sequence without introducing any form of ambiguity, confusion, or errors, is the first guiding principle for this framework.

### Writing & Drawing: A Dual Phase System

In short, the two phases are:

1. The writing phase, where the sequence of symbols is generated based on defined production rules.
2. The drawing phase, where this sequence is interpreted and translated into drawing/rendering commands.

What we need to do in the writing phase is read the sequence, apply the production rules, generate a new sequence, and repeat. Iteration after iteration.

These operations must be as independent as possible from anything related to interpretation. The goal is to have a module that operates on a sequence (be it a string or an array of objects) as autonomously as possible. Its sole responsibility and output is the generation that will be passed to another module responsible for interpretation.

However, since the new sequence mixes different types of symbols, some degree of discernment logic needs to be implemented for reading the sequence in order to retrieve just what is relevant at this stage for the rewriting and replacement of symbols.

A way to abstract the symbol interpretation logic from the symbol sequencing logic is also necessary.

Drawing a parallel with language, the module doesn't necessarily have to 'read' the symbol. To construct syntactically correct sentences, it simply needs to know that 'this' is a verb and 'that' is a noun. In our specific case, that ‘this’ a drawing command and that ‘that’ is a production rule.

But first let's examine how this syntactic awareness is embedded in the system and introduce the building block of this system: the ubiquitous Glyph.

### The Glyphs

Glyphs offer an alternative to a lookup table, which would require frequent access and consultation across multiple modules, creating more dependencies than it would be sensible.

As lightweight wrapper objects, they carry their own type information and bind specific characters to production rules, commands, or instructions, for quick and adequate symbol identification.

By allowing only a single instance for each symbol and binding each symbol to a single function, they safeguard the system against overwriting and functional overlaps.

As objects there’s little to be said about them. They are plain and simple. Their primary utility lies in the syntactic classifications they embody.

Which, at the current time consists of:

| Type        | Description | Examples |
|-------------|-------------|----------|
| Rule        | Represents a production rule         | `Y` `B`     |  
| Instruction | Represents a drawing command or rendering operation         | `f`      |  
| Marker      | Serve as flow controllers and scope annotators during parsing, e.g., delimiter signs       | `(` `)`       | 


We’ll see each more in detail throughout the documentation where each type is the most relevant.

Glyphs also act as exchange tokens between components. They are the system’s currency in the sense that one component can exchange with another to obtain required data or objects. For example, a component needing a Production Rule object may pass a stream of Glyphs to an interfacing component and receive corresponding Production Rules in return, all without having to decode each Glyph to explicitly request the Production Rules. In this manner, Glyphs facilitate the seamless flow of symbols throughout the system.

### The Sequencer





