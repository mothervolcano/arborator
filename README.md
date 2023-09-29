## Background

This project emerged from my fascination with the subject of a book I stumbled upon: 'The Algorithmic Beauty of Plants.' The author, Aristid Lindenmayer, a botanist, developed a mathematical theory to describe plant topology, which later evolved into a framework for modeling the development of branching structures in general. L-Systems, as they became known, found applications far beyond the field of biology in diverse fields such as urbanism, computer graphics, and even programming languages.

I was inspired to attempt a simple and straightforward implementation in JavaScript. The mesmerizing and often beautiful patterns, structures, and shapes that emerged from simple and concise set of rules made me understand why the L system were widely adopted in many different fields.

Before I knew it, what started as curiosity evolved into something of a passion that led to two exploratory projects. 

This project, Arborator and FASS (here) are being developed not only to expand my knowledge in procedural generation but also as personal challenge to try and take my coding skills to a new level.

![L-Systems Moodboard](/docs/assets/lsystem-examples.png)

## L-Systems 101

L-Systems, or Lindenmayer Systems, are a specialized subset of formal grammars. They are based on an alphabet-a set of symbols that undergo transformations through recursive and iterative processes. Governed by a specific set of production rules, these symbols are systematically replaced in each iteration, resulting in progressively complex strings.

In essence, an L-System consists of:

1. An Alphabet: A designated set of symbols.
2. Production Rules: These dictate the manner in which symbols are substituted or expanded during each iteration.
3. An Axiom: The initial string from which the system initiates iterative processes

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

### A Challenge

The sequences produced by an L-System, in isolation, offer limited information about the visual attributes of the structures they model. As seen in the previous example, we know that 'A' represents a growth segment, and 'B' indicates a branching point. And that’s all. We are left wondering: What are the specifics of the growth, such as its length and direction? Is the unit of growth constant? How does the structure branch out? How do the branches diverge, and at what angle?

ABAABABA

So what do we make of this? Where do we go from here?

Algorithmic Beauty of Plants addresses precisely this problem, and this framework does not depart significantly from what is proposed there. As with all previous graphical interpretations this framework also takes a post-processing approach to the problem as well as adopting many of the conventions outlined in the book.

And a post-processing approach here means that we won’t attempt to reinvent or reengineer the string generation process. We’ll take it as it comes and focus on how to interpret it instead. 

### ... and Another

However, the introduction of new symbols into the alphabet seems unavoidable. We need drawing commands that can be woven into the production rules. For example symbols such as ‘+’ or ‘-’ that represent instructions for the drawing tool to turn left or right by a defined number of degrees. Other symbols, less obvious but equally fundamental, are the ‘[’ and ‘]’ which hold instructions to save and restore the state of drawing, making it possible to create branches.

The sequence would now resemble something like this:

A[B][+A][-A[B]][+A[B][-A]][+A[B][-A][+A[B]]]

As you can see, there's a lot more to be parsed here, and we also seem to have a new skill to learn: how to combine different types of symbols in the production rules to achieve the results we expect. Making sure the drawing commands end up where we want them in the sequence may require a learning curve and considerable mental gymnastics. I want to spare us from this as much as possible.

For this reason, the mixing of writing-related symbols with drawing-related symbols seemed like opening Pandora's box. Given my debutant status in developing frameworks of this ambition, I had nothing but my intuition to tell me that compromising the separation between the writing and drawing phases would be... a bad idea. It's something to be avoided, or at least mitigated as much as possible.

To ensure that writing and drawing symbols could coexist in the sequence without introducing any form of ambiguity, confusion, or errors, is the first guiding principle for this framework.

### Writing & Drawing: A Dual Phase System

The first and key component of the framework is the one responsible for reading and writing the sequence.

How to abstract away the symbol interpretation logic away from the symbol sequencing logic?

Why is it important?

* Clarity. Clear separation of concerns.
* Specialization. As the framework grows advanced caching and parsing functionality is expected. The implementation needs to leave room for it.
* Lightness. Holding the knowledge necessary for the interpretation of symbols would not only mean the burden of a hefty lookup table but also create too many dependencies as other components would need access to the same knowledge.

This would be the first step towards establishing a clear separation between to two phases:

The writing phase, where the sequence of symbols is generated based on defined production rules.

The drawing phase, where this sequence is interpreted and translated to drawing commands and operations.

For the purpose of sequencing it’s only necessary to know the role that each symbol performs. The symbols themselves provide this information. As their own type of object they also share the same base interface so that the Sequencer needs only hold the logic necessary to identify the types it needs to process and handle them appropriately.

### Syntactic Classification

The symbols in this framework are not treated as inert characters. They are lightweight objects that carry its own type information and bind a specific character to a production rule, command or instruction, ensuring that character serves only this purpose.

They conform to the same interface so they can be quickly identified without needing to consult an extensive lookup table and used all across the system. They play a role at almost every stage: 

1. **Sequence Generation**
2. **Sequence Processing**
3. **Sequence Manipulation**
4. **Syntax Integrity**

| Type        | Description | Examples |
|-------------|-------------|----------|
| Rule        | Represents a production rule         | `Y` `B`     |  
| Instruction | Represents a drawing command or rendering operation         | `f`      |  
| Marker      | Provide annotations for flow control and scope during parsing eg. delimiter signs        | `(` `)`       | 

